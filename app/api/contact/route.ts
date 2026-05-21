import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // Env var is named "Resend" in Vercel; accept the conventional name too.
    const resend = new Resend(process.env.RESEND_API_KEY || process.env.Resend)
    const { error } = await resend.emails.send({
      from: 'Movena Contact <noreply@movena.io>', // verified Resend domain
      to: 'support@movena.io',
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      console.error('[contact] resend error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] send failed:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
