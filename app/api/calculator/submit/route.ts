import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, TEAM_TO, TEAM_REPLY_TO } from '@/lib/email'
import { isLocale, type Locale } from '@/lib/locales'
import { computeSavings, EMPTY_INPUTS, type CalculatorInputs } from '@/lib/calculator/engine'
import { getCurrency } from '@/lib/calculator/currency'
import { getCalculatorCopy } from '@/lib/calculator/copy'
import { buildVisitorEmail, buildTeamEmail, buildAttioNote, type LeadPayload } from '@/lib/calculator/report'
import { pushLeadToAttio } from '@/lib/calculator/attio'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Leaves enough to match a log line against the Attio or Postmark record without
// putting a lead's address into the runtime logs.
function maskEmail(email: string): string {
  const at = email.lastIndexOf('@')
  if (at < 0) return '***'
  return `${email.slice(0, 1)}***${email.slice(at)}`
}

// Trust nothing from the client for the math. Coerce inputs into a clean shape
// and recompute the result server-side so emailed/stored numbers are authoritative.
function sanitizeInputs(raw: unknown): CalculatorInputs {
  const r = (raw ?? {}) as Record<string, unknown>
  const num = (v: unknown, fallback = 0) => {
    const n = Number(v)
    return Number.isFinite(n) && n >= 0 ? n : fallback
  }
  const bool = (v: unknown) => v === true

  return {
    currency: getCurrency(String(r.currency)).code,
    movesPerMonth: num(r.movesPerMonth),
    hourlyCost: num(r.hourlyCost, EMPTY_INPUTS.hourlyCost),
    planningMinutesPerMove: num(r.planningMinutesPerMove),
    doesQuoting: bool(r.doesQuoting),
    quotesPerMonth: num(r.quotesPerMonth),
    minutesPerQuote: num(r.minutesPerQuote),
    doesFollowup: bool(r.doesFollowup),
    leadsPerMonth: num(r.leadsPerMonth),
    minutesPerFollowup: num(r.minutesPerFollowup),
    followupUpliftPct: num(r.followupUpliftPct),
    reviewsPerMonth: num(r.reviewsPerMonth),
    sendsReviewRequest: bool(r.sendsReviewRequest),
    extraReviewsPerMonth: num(r.extraReviewsPerMonth),
    reviewMinutesPerMonth: num(r.reviewMinutesPerMonth),
    doesMessaging: bool(r.doesMessaging),
    messagingHoursPerWeek: num(r.messagingHoursPerWeek),
    tracksInventory: bool(r.tracksInventory),
    itemsLostPerMonth: num(r.itemsLostPerMonth),
    minutesChasingPerItem: num(r.minutesChasingPerItem),
    costPerItem: num(r.costPerItem),
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const company = String(body.company ?? '').trim()
  const locale: Locale = isLocale(String(body.locale)) ? (body.locale as Locale) : 'en'

  if (!name || !company || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
  }

  const inputs = sanitizeInputs(body.inputs)
  // Compute with the visitor's own locale copy, so the formulas and the
  // plain-language explanations in their emailed report read in their
  // language rather than falling back to the English defaults.
  const copy = getCalculatorCopy(locale)
  const result = computeSavings(inputs, copy.formulaUnits, {
    templates: copy.result.rowExplanations,
    formatNumber: (n: number) =>
      new Intl.NumberFormat(locale === 'da' ? 'da-DK' : 'en-US', { maximumFractionDigits: 1 }).format(n),
  })
  const payload: LeadPayload = { name, email, company, locale, inputs, result }

  // Side effects are best-effort. The visitor must get their unlock, so we never
  // fail the request because a downstream (Attio/email) hiccuped — we log it.
  const status: Record<string, string> = {}

  // 1. Attio record
  try {
    const note = buildAttioNote(payload)
    const attio = await pushLeadToAttio({ name, email, company, noteTitle: note.title, noteBody: note.body })
    status.attio = attio.ok ? 'ok' : `skipped:${attio.reason ?? 'unknown'}`
  } catch (err) {
    status.attio = `error:${err instanceof Error ? err.message : 'unknown'}`
  }

  // 2 + 3. Emails: the visitor's own report, and the summary that reaches us.
  const visitor = buildVisitorEmail(payload)
  const team = buildTeamEmail(payload)
  status.visitorEmail = await sendEmail({
    to: email,
    replyTo: TEAM_REPLY_TO,
    subject: visitor.subject,
    text: visitor.text,
    html: visitor.html,
  })
  status.teamEmail = await sendEmail({
    to: TEAM_TO,
    replyTo: email,
    subject: team.subject,
    text: team.text,
    html: team.html,
  })

  // The team email is the only thing that puts the lead in front of a human, so
  // it alone decides success. Attio is best effort and never blocks: a missing
  // key is a skip, not a failure.
  const delivered = status.teamEmail === 'ok'
  const line = JSON.stringify({ company, email: maskEmail(email), status })

  if (!delivered) {
    // Loud on purpose: a lead has just been lost, and this line is the only
    // record of it. Carries the fields so it can be recovered from the log.
    console.error('[calculator/submit] LEAD NOT DELIVERED', line, JSON.stringify({ name, company, email }))
    return NextResponse.json({ success: false, status }, { status: 502 })
  }

  // Always log the outcome so a submission is diagnosable from the runtime logs,
  // not just on failure. The address is masked: Attio and the team email are
  // where a lead is meant to live, not the log stream.
  console.log('[calculator/submit]', line)
  return NextResponse.json({ success: true, status })
}
