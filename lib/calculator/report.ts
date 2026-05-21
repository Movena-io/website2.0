// Builds the visitor report email (in their locale), the internal team summary
// email (English), and the Attio note body, from an authoritative server-side
// result. Kept separate from the route so the route stays about orchestration.

import type { Locale } from '@/lib/locales'
import { DEMO_URL } from '@/lib/constants'
import { getCalculatorCopy, fill } from './copy'
import { roundNice, type CalculatorInputs, type CalculatorResult } from './engine'

export interface LeadPayload {
  name: string
  email: string
  company: string
  locale: Locale
  inputs: CalculatorInputs
  result: CalculatorResult
}

function nf(locale: Locale, n: number): string {
  return new Intl.NumberFormat(locale === 'da' ? 'da-DK' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(n)
}

const money = (locale: Locale, n: number) => nf(locale, roundNice(n))
const hours = (locale: Locale, n: number) => nf(locale, Math.round(n))

// ── Visitor report (their locale) ────────────────────────────────────────────

export function buildVisitorEmail({ locale, inputs, result }: LeadPayload) {
  const c = getCalculatorCopy(locale)
  const cur = inputs.currency
  const subject = c.meta.title
  const perMonth = fill(c.units.moneyPerMonth, { cur })

  const rowsHtml = result.rows
    .map((r) => {
      const value =
        r.moneySavedPerMonth > 0
          ? `${money(locale, r.moneySavedPerMonth)} ${perMonth}`
          : `${hours(locale, r.hoursSavedPerMonth)} ${c.units.hoursPerMonth}`
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;color:#0B1F3B;font-weight:600;font-size:14px;">${c.result.rowLabels[r.key]}<br><span style="color:#94A3B8;font-weight:400;font-size:12px;font-family:monospace;">${r.formula}</span></td>
        <td style="padding:10px 0;border-bottom:1px solid #E2E8F0;text-align:right;color:#0B1F3B;font-weight:700;font-size:14px;white-space:nowrap;">${value}</td>
      </tr>`
    })
    .join('')

  const upsideHtml = [
    result.upside.revenuePct != null
      ? `<p style="margin:6px 0;color:#1D4ED8;font-weight:700;font-size:15px;">${fill(c.result.revenueUpside, { pct: result.upside.revenuePct })}</p>`
      : '',
    result.upside.extraReviewsPerMonth != null
      ? `<p style="margin:6px 0;color:#1D4ED8;font-weight:700;font-size:15px;">${fill(c.result.reviewUpside, { count: result.upside.extraReviewsPerMonth })}</p>`
      : '',
  ].join('')

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0F172A;">
    <p style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#1D4ED8;font-weight:700;">${c.result.eyebrow}</p>
    <h1 style="font-size:40px;margin:8px 0;color:#0B1F3B;">${money(locale, result.headlineMonthly)} <span style="font-size:20px;color:#475569;">${perMonth}</span></h1>
    <p style="font-size:15px;color:#475569;margin:0 0 4px;">${fill(c.result.perYear, { value: money(locale, result.headlineAnnual), cur })}</p>
    ${result.totalHoursPerMonth > 0 ? `<p style="font-size:15px;color:#0B1F3B;font-weight:600;">${fill(c.result.hoursLine, { hours: hours(locale, result.totalHoursPerMonth) })}</p>` : ''}
    ${upsideHtml ? `<div style="margin:20px 0;padding:16px;background:#EFF6FF;border-radius:12px;">${upsideHtml}</div>` : ''}
    <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#475569;margin-top:28px;">${c.result.breakdownTitle}</h2>
    <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
    ${result.inventoryExposureMonthly != null ? `<p style="font-size:13px;color:#991B1B;background:#FEF2F2;padding:12px;border-radius:8px;margin-top:12px;">${fill(c.result.exposureNote, { value: money(locale, result.inventoryExposureMonthly), cur })}</p>` : ''}
    <p style="font-size:12px;color:#475569;margin-top:16px;line-height:1.6;">${c.result.assumptions}</p>
    <div style="margin-top:28px;padding:24px;background:#0B1F3B;border-radius:12px;text-align:center;">
      <p style="color:#fff;font-size:18px;font-weight:700;margin:0 0 8px;">${c.result.ctaTitle}</p>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 16px;">${c.result.ctaSubtitle}</p>
      <a href="${DEMO_URL}" style="display:inline-block;background:#fff;color:#0B1F3B;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:10px;">${c.result.ctaButton}</a>
    </div>
    <p style="font-size:12px;color:#94A3B8;margin-top:20px;">Movena</p>
  </div>`

  const text = [
    `${c.result.eyebrow}: ${money(locale, result.headlineMonthly)} ${perMonth}`,
    fill(c.result.perYear, { value: money(locale, result.headlineAnnual), cur }),
    result.totalHoursPerMonth > 0 ? fill(c.result.hoursLine, { hours: hours(locale, result.totalHoursPerMonth) }) : '',
    '',
    c.result.breakdownTitle,
    ...result.rows.map((r) => {
      const value =
        r.moneySavedPerMonth > 0
          ? `${money(locale, r.moneySavedPerMonth)} ${perMonth}`
          : `${hours(locale, r.hoursSavedPerMonth)} ${c.units.hoursPerMonth}`
      return `- ${c.result.rowLabels[r.key]}: ${value}  (${r.formula})`
    }),
    '',
    `${c.result.ctaButton}: ${DEMO_URL}`,
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, html, text }
}

// ── Team summary (English, internal) ─────────────────────────────────────────

export function buildTeamEmail({ name, email, company, locale, inputs, result }: LeadPayload) {
  const cur = inputs.currency
  const subject = `[Calculator] ${company} — ${money('en', result.headlineMonthly)} ${cur}/mo`

  const upside: string[] = []
  if (result.upside.revenuePct != null) upside.push(`+${result.upside.revenuePct}% revenue (lead follow-up)`)
  if (result.upside.extraReviewsPerMonth != null) upside.push(`+${result.upside.extraReviewsPerMonth} reviews/mo`)

  const lines = [
    `New savings-calculator lead`,
    ``,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company}`,
    `Locale:   ${locale}`,
    `Currency: ${cur}`,
    ``,
    `Headline: ${money('en', result.headlineMonthly)} ${cur}/month  (~${money('en', result.headlineAnnual)} ${cur}/year)`,
    `Hours saved: ~${hours('en', result.totalHoursPerMonth)} hours/month`,
    upside.length ? `Upside: ${upside.join(', ')}` : `Upside: none flagged`,
    ``,
    `Inputs:`,
    `  Moves/mo: ${inputs.movesPerMonth}, hourly: ${inputs.hourlyCost} ${cur}`,
    `  Planning min/move: ${inputs.planningMinutesPerMove}`,
    `  Quoting: ${inputs.doesQuoting ? `${inputs.quotesPerMonth}/mo @ ${inputs.minutesPerQuote}min` : 'no'}`,
    `  Follow-up: ${inputs.doesFollowup ? `${inputs.leadsPerMonth}/mo @ ${inputs.minutesPerFollowup}min` : `no (uplift ${inputs.followupUpliftPct}%)`}`,
    `  Reviews: ${inputs.reviewsPerMonth}/mo, sends request: ${inputs.sendsReviewRequest ? 'yes' : `no (+${inputs.extraReviewsPerMonth})`}`,
    `  Messaging: ${inputs.doesMessaging ? `${inputs.messagingHoursPerWeek} hrs/wk` : 'no'}`,
    `  Boxes: tracks=${inputs.tracksInventory ? 'yes' : 'no'}, ${inputs.itemsLostPerMonth} lost/mo @ ${inputs.minutesChasingPerItem}min, ${inputs.costPerItem} ${cur} each`,
  ]

  const text = lines.join('\n')
  const html = `<pre style="font-family:monospace;font-size:13px;color:#0F172A;white-space:pre-wrap;">${text.replace(/</g, '&lt;')}</pre>`
  return { subject, html, text }
}

// ── Attio note ────────────────────────────────────────────────────────────────

export function buildAttioNote(payload: LeadPayload): { title: string; body: string } {
  const team = buildTeamEmail(payload)
  return {
    title: `Savings calculator — ${money('en', payload.result.headlineMonthly)} ${payload.inputs.currency}/mo`,
    body: team.text,
  }
}
