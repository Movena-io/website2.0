import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isLocale, type Locale } from '@/lib/locales'
import { computeSavings, EMPTY_INPUTS, type CalculatorInputs } from '@/lib/calculator/engine'
import { getCurrency } from '@/lib/calculator/currency'
import { buildVisitorEmail, buildTeamEmail, buildAttioNote, type LeadPayload } from '@/lib/calculator/report'
import { pushLeadToAttio } from '@/lib/calculator/attio'
import { appendLead } from '@/lib/calculator/store'

export const runtime = 'nodejs'

const FROM = 'Movena <support@mail.movena.io>'
const TEAM_TO = 'support@movena.io'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  const result = computeSavings(inputs)
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

  // 2 + 3. Emails (visitor report + team summary). NOTE: resend.emails.send does
  // NOT throw on API errors (bad key, unverified domain, rejected recipient) — it
  // returns { error }. So we must inspect the response, not just catch throws.
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const send = async (
      to: string,
      replyTo: string,
      mail: { subject: string; html: string; text: string },
    ): Promise<string> => {
      try {
        const { error } = await resend.emails.send({
          from: FROM,
          to,
          replyTo,
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
        })
        if (error) return `error:${error.name ?? ''} ${error.message ?? JSON.stringify(error)}`.trim()
        return 'ok'
      } catch (err) {
        return `throw:${err instanceof Error ? err.message : 'unknown'}`
      }
    }

    status.visitorEmail = await send(email, TEAM_TO, buildVisitorEmail(payload))
    status.teamEmail = await send(TEAM_TO, email, buildTeamEmail(payload))
  } else {
    status.visitorEmail = status.teamEmail = 'skipped:no_resend_key'
  }

  // 4. Local store (best-effort safety net)
  await appendLead(payload)

  // Always log the outcome so a submission is diagnosable from the runtime logs,
  // not just on failure. (No PII beyond company + the email we were given.)
  console.log('[calculator/submit]', JSON.stringify({ company, email, status }))

  return NextResponse.json({ success: true, status })
}
