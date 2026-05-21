// Attio REST client — server only. Pushes a savings-calculator lead into Attio.
//
// Strategy: upsert a Person record matched on email (the unique key), then attach
// a Note holding the full calculator result. Company is recorded in the person's
// description and the note (we don't create a linked Company record in v1, since
// company name isn't a unique match key in Attio).
//
// If ATTIO_API_KEY is missing the call returns { ok: false, reason: 'no_key' } and
// the caller falls back to the team email + local store, so a lead is never lost.

const ATTIO_BASE = 'https://api.attio.com/v2'

export interface AttioLead {
  name: string
  email: string
  company: string
  noteTitle: string
  noteBody: string
}

export interface AttioPushResult {
  ok: boolean
  recordId?: string
  reason?: string
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/)
  if (parts.length <= 1) return { first: full.trim(), last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

async function attioFetch(path: string, init: RequestInit, key: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    return await fetch(`${ATTIO_BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

export async function pushLeadToAttio(lead: AttioLead): Promise<AttioPushResult> {
  const key = process.env.ATTIO_API_KEY
  if (!key) return { ok: false, reason: 'no_key' }

  try {
    const { first, last } = splitName(lead.name)

    // Upsert the Person, matched on email_addresses (unique).
    const assertRes = await attioFetch(
      '/objects/people/records?matching_attribute=email_addresses',
      {
        method: 'PUT',
        body: JSON.stringify({
          data: {
            values: {
              email_addresses: [{ email_address: lead.email }],
              name: [{ first_name: first, last_name: last, full_name: lead.name }],
              description: [{ value: `Savings-calculator lead. Company: ${lead.company}` }],
            },
          },
        }),
      },
      key,
    )

    if (!assertRes.ok) {
      const body = await assertRes.text()
      return { ok: false, reason: `person_assert_${assertRes.status}: ${body.slice(0, 300)}` }
    }

    const assertJson = (await assertRes.json()) as { data?: { id?: { record_id?: string } } }
    const recordId = assertJson.data?.id?.record_id
    if (!recordId) return { ok: false, reason: 'no_record_id' }

    // Attach the result as a Note. Non-fatal if it fails — the record still exists.
    try {
      await attioFetch(
        '/notes',
        {
          method: 'POST',
          body: JSON.stringify({
            data: {
              parent_object: 'people',
              parent_record_id: recordId,
              title: lead.noteTitle,
              format: 'plaintext',
              content: lead.noteBody,
            },
          }),
        },
        key,
      )
    } catch {
      // ignore note failure
    }

    return { ok: true, recordId }
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : 'unknown' }
  }
}
