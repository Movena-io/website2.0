import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { pushLeadToAttio } from '@/lib/calculator/attio'

// Demo requests land exactly where the savings-calculator leads land: a Deal in
// Attio's "New lead" stage plus an email to the three of us. Same env vars,
// same recipients, same best-effort handling — see app/api/calculator/submit.
export const runtime = 'nodejs'

const FROM = 'Movena <noreply@movena.io>'
const TEAM_TO = ['vcl@movena.io', 'vl@movena.io', 'sto@movena.io']
const TEAM_REPLY_TO = 'sto@movena.io'

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
  const callWindow = clean(body.callWindow, 40)
  const locale = clean(body.locale, 5) || 'da'

  const sizeIndex = Number(body.sizeIndex)
  const size = Number.isInteger(sizeIndex) && SIZE_LABELS[sizeIndex] ? SIZE_LABELS[sizeIndex] : ''

  // The form enforces these three; re-check rather than trust the client.
  if (!name || !company || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
  }

  const lines = [
    `Navn: ${name}`,
    `Flyttefirma: ${company}`,
    `Telefon: ${phone}`,
    `E-mail: ${email || '-'}`,
    `Antal medarbejdere: ${size || '-'}`,
    `Bruger i dag: ${usesToday || '-'}`,
    `Ringes op: ${callWindow || '-'}`,
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

  const resendKey = process.env.RESEND_API_KEY || process.env.Resend
  if (resendKey) {
    try {
      // resend.emails.send does not throw on API errors, it returns { error }.
      const { error } = await new Resend(resendKey).emails.send({
        from: FROM,
        to: TEAM_TO,
        replyTo: email || TEAM_REPLY_TO,
        subject: `[Demo] ${company} — ${name}`,
        text,
      })
      status.teamEmail = error ? `error:${error.message ?? JSON.stringify(error)}` : 'ok'
    } catch (err) {
      status.teamEmail = `throw:${err instanceof Error ? err.message : 'unknown'}`
    }
  } else {
    status.teamEmail = 'skipped:no_resend_key'
  }

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
