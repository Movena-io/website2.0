import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, TEAM_TO } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = body
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const status = await sendEmail({
    to: TEAM_TO,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (status !== 'ok') {
    // The sender is about to be told this failed, so the message itself goes to
    // the log: it is the only remaining copy.
    console.error('[contact] MESSAGE NOT DELIVERED', status, JSON.stringify({ name, email, subject }))
    return NextResponse.json({ error: 'Failed to send message.', status }, { status: 502 })
  }

  console.log('[contact]', JSON.stringify({ subject, status }))
  return NextResponse.json({ success: true, status })
}
