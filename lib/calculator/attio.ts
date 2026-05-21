// Attio REST client — server only. Pushes a savings-calculator lead into Attio
// as a Deal in the "New lead" stage, with the full calculator result attached
// as a Note. A fresh Deal is created per submission.
//
// If ATTIO_API_KEY is missing the call returns { ok: false, reason: 'no_key' }
// and the caller falls back to the team email + local store, so a lead is never
// lost.

const ATTIO_BASE = 'https://api.attio.com/v2'

// Deals object config (resolved from the workspace schema).
const STAGE_NEW_LEAD = '39dabd60-bebc-4f02-9c9f-d69516832b83' // "New lead"
const SOURCE_INBOUND = 'a87c9b17-c3a6-41be-9f8d-7577c62e6d43' // "Inbound"
const DEFAULT_OWNER_MEMBER_ID = 'a0f04bba-8184-41e7-8ae2-dea8d1222447' // Samuel (deal owner is required)

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
    // Create a Deal in the "New lead" stage.
    const createRes = await attioFetch(
      '/objects/deals/records',
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            values: {
              name: [{ value: `${lead.company} — Savings calculator` }],
              stage: [{ status: STAGE_NEW_LEAD }],
              owner: [{ referenced_actor_type: 'workspace-member', referenced_actor_id: DEFAULT_OWNER_MEMBER_ID }],
              contact_name: [{ value: lead.name }],
              email: [{ value: lead.email }],
              source: [{ option: SOURCE_INBOUND }],
            },
          },
        }),
      },
      key,
    )

    if (!createRes.ok) {
      const body = await createRes.text()
      return { ok: false, reason: `deal_create_${createRes.status}: ${body.slice(0, 400)}` }
    }

    const createJson = (await createRes.json()) as { data?: { id?: { record_id?: string } } }
    const recordId = createJson.data?.id?.record_id
    if (!recordId) return { ok: false, reason: 'no_record_id' }

    // Attach the result as a Note on the Deal. Non-fatal if it fails.
    try {
      await attioFetch(
        '/notes',
        {
          method: 'POST',
          body: JSON.stringify({
            data: {
              parent_object: 'deals',
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
