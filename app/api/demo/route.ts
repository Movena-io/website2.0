import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, TEAM_TO, TEAM_REPLY_TO } from '@/lib/email'
import { pushLeadToAttio } from '@/lib/calculator/attio'
import { buildInvite } from '@/lib/ics'
import { CALL_MINUTES, copenhagenToUtc, formatCallDay, isCallDay, isCallTime } from '@/lib/call-slots'

// Demo requests land exactly where the savings-calculator leads land: an email
// to the three of us, plus a Deal in Attio's "New lead" stage when a key is
// configured. The email is what counts — see app/api/calculator/submit.
export const runtime = 'nodejs'

// The segmented control posts an index; these are its labels, in order.
const SIZE_LABELS = ['1-5', '6-15', '16-30', 'Over 30']

function maskPhone(phone: string): string {
  const d = phone.replace(/\D/g, '')
  return d.length < 4 ? '***' : `***${d.slice(-4)}`
}

const clean = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max)

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = clean(body.name)
  const company = clean(body.company)
  const phone = clean(body.phone, 40)
  const email = clean(body.email)
  const usesToday = clean(body.usesToday, 500)
  const callDay = clean(body.callDay, 10)
  const callTime = clean(body.callTime, 5)
  const locale = clean(body.locale, 5) || 'da'

  const sizeIndex = Number(body.sizeIndex)
  const size = Number.isInteger(sizeIndex) && SIZE_LABELS[sizeIndex] ? SIZE_LABELS[sizeIndex] : ''

  // The form enforces these; re-check rather than trust the client. The slot is
  // validated too, because it goes straight into a calendar invite.
  if (!name || !company || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
  }
  if (!isCallDay(callDay) || !isCallTime(callTime)) {
    return NextResponse.json({ error: 'Missing or invalid call slot.' }, { status: 400 })
  }

  const dayLabel = formatCallDay(callDay, locale).label
  const callStart = copenhagenToUtc(callDay, callTime)

  const lines = [
    `Navn: ${name}`,
    `Flyttefirma: ${company}`,
    `Telefon: ${phone}`,
    `E-mail: ${email || '-'}`,
    `Antal medarbejdere: ${size || '-'}`,
    `Bruger i dag: ${usesToday || '-'}`,
    `Ringes op: ${dayLabel} kl. ${callTime} (dansk tid)`,
    `Sprog: ${locale}`,
  ]
  const text = lines.join('\n')

  // Attio is best effort, but the team email is not: it is the only thing that
  // actually puts the lead in front of a human. If it does not send, the caller
  // must find out, so the visitor is told to phone us instead of being thanked
  // for a lead that went nowhere.
  const status: Record<string, string> = {}

  try {
    const attio = await pushLeadToAttio({
      name,
      // Attio requires an email on the deal; fall back to a readable marker.
      email: email || 'ukendt@movena.io',
      company,
      dealLabel: 'Book en demo',
      noteTitle: `Demoforespørgsel fra ${company}`,
      noteBody: text,
    })
    status.attio = attio.ok ? 'ok' : `skipped:${attio.reason ?? 'unknown'}`
  } catch (err) {
    status.attio = `error:${err instanceof Error ? err.message : 'unknown'}`
  }

  // The invite is addressed to vl@: the call is theirs to make. It rides along
  // on the team mail so everyone sees the lead and one person gets the booking.
  const invite = buildInvite({
    uid: `demo-${callDay}-${callTime.replace(':', '')}-${Date.now()}@movena.io`,
    start: callStart,
    minutes: CALL_MINUTES,
    summary: `Ring til ${name}, ${company}`,
    description: `${text}\n\nRing til ${phone}`,
    organizerEmail: 'noreply@movena.io',
    organizerName: 'Movena',
    attendeeEmail: 'vl@movena.io',
  })

  status.teamEmail = await sendEmail({
    to: TEAM_TO,
    replyTo: email || TEAM_REPLY_TO,
    subject: `[Demo] ${company} — ${name}, ${dayLabel} kl. ${callTime}`,
    text,
    attachments: [
      {
        name: 'ring-til-kunde.ics',
        content: invite,
        contentType: 'text/calendar; charset=utf-8; method=REQUEST',
      },
    ],
  })

  const delivered = status.teamEmail === 'ok'
  const line = JSON.stringify({ company, phone: maskPhone(phone), status })

  if (!delivered) {
    // Loud on purpose: a lead has just been lost, and the only record of it is
    // this line. Includes the fields so it can be recovered from the log.
    console.error('[demo] LEAD NOT DELIVERED', line, JSON.stringify({ name, company, phone, email }))
    return NextResponse.json({ success: false, status }, { status: 502 })
  }

  console.log('[demo]', line)
  return NextResponse.json({ success: true, status })
}
