// Client-side sender for the "book a demo" form. The form itself lives in the
// generated page components, so this stays small and serialisable: it takes the
// raw field values and posts them to /api/demo, which does the real work.

export interface DemoLeadInput {
  name: string
  company: string
  phone: string
  email?: string
  /** Index into the "how many are you" segmented control, or undefined. */
  sizeIndex?: number
  /** Free text: what they run today. */
  usesToday?: string
  /** Preferred time of day for the call, as the select's own value. */
  callWindow?: string
  locale: string
}

export async function submitDemoLead(input: DemoLeadInput): Promise<boolean> {
  try {
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    return res.ok
  } catch {
    return false
  }
}
