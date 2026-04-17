import { NextResponse } from 'next/server'

const GA_MEASUREMENT_ID = 'G-S0J0F29PP9'
const GA_API_SECRET = process.env.GA_API_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Extract email from Typeform webhook payload
    const answers = body?.form_response?.answers ?? []
    const emailAnswer = answers.find(
      (a: { type: string }) => a.type === 'email'
    )
    const email = emailAnswer?.email ?? 'unknown'

    // Send server-side event to GA4 via Measurement Protocol
    if (!GA_API_SECRET) {
      console.error('[typeform webhook] GA_API_SECRET not set')
      return NextResponse.json({ ok: true, warning: 'GA_API_SECRET not configured' })
    }

    {
      const gaRes = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: 'POST',
          body: JSON.stringify({
            client_id: `typeform.${Date.now()}`,
            events: [
              {
                name: 'sign_up',
                params: {
                  method: 'waitlist',
                  source: 'typeform_webhook',
                },
              },
            ],
          }),
        }
      )
      console.log('[typeform webhook] GA4 response:', gaRes.status)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[typeform webhook] error:', err)
    return NextResponse.json({ error: 'webhook failed' }, { status: 500 })
  }
}
