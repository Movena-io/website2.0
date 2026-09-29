// Transactional email for the three lead forms (demo, savings calculator,
// contact). Postmark's REST API is a single POST, so this talks to it directly
// rather than pulling in a client library.
//
// The token is read at call time, not at module load, so a missing key is a
// reportable status rather than a crash at import.

const POSTMARK_URL = 'https://api.postmarkapp.com/email'

/** Sender. The domain must be verified in Postmark or every send is rejected. */
export const FROM = 'Movena <noreply@movena.io>'

/** Everyone who should see a new lead. */
export const TEAM_TO = ['vl@movena.io', 'vcl@movena.io', 'sto@movena.io']

/** Reply-to when the lead left no address of their own. */
export const TEAM_REPLY_TO = 'sto@movena.io'

export type SendResult =
  /** Delivered to Postmark. Only this counts as sent. */
  | 'ok'
  /** No token configured, so nothing was attempted. */
  | `skipped:${string}`
  /** Postmark accepted the request but rejected the message. */
  | `error:${string}`
  /** The request itself failed (network, DNS, timeout). */
  | `throw:${string}`

export function postmarkToken(): string | undefined {
  return process.env.POSTMARK_SERVER_TOKEN
}

/**
 * Sends one message. Never throws: the caller gets a status string it can log
 * and return, because a lead form must not 500 on a mail provider hiccup.
 */
export async function sendEmail(mail: {
  to: string | string[]
  replyTo?: string
  subject: string
  text: string
  html?: string
}): Promise<SendResult> {
  const token = postmarkToken()
  if (!token) return 'skipped:no_postmark_token'

  try {
    const res = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: FROM,
        To: Array.isArray(mail.to) ? mail.to.join(', ') : mail.to,
        ReplyTo: mail.replyTo,
        Subject: mail.subject,
        TextBody: mail.text,
        HtmlBody: mail.html,
        MessageStream: 'outbound',
      }),
    })

    // Postmark returns 200 with ErrorCode 0 on success, and a non-2xx with an
    // ErrorCode and Message on rejection. Both shapes are JSON.
    const body = (await res.json().catch(() => null)) as
      | { ErrorCode?: number; Message?: string }
      | null

    if (res.ok && (body?.ErrorCode ?? 0) === 0) return 'ok'
    return `error:${body?.ErrorCode ?? res.status} ${body?.Message ?? 'unknown'}`.trim() as SendResult
  } catch (err) {
    return `throw:${err instanceof Error ? err.message : 'unknown'}` as SendResult
  }
}
