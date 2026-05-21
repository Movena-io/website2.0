// Best-effort local store for calculator leads. Attio is the system of record;
// this is a dev/local safety net so a lead is visible even without Attio. On
// Vercel's read-only serverless filesystem the write quietly no-ops.

import { promises as fs } from 'fs'
import path from 'path'
import type { LeadPayload } from './report'

const STORE_PATH = path.join(process.cwd(), 'data', 'calculator-leads.json')

export async function appendLead(payload: LeadPayload): Promise<void> {
  try {
    let existing: unknown[] = []
    try {
      const raw = await fs.readFile(STORE_PATH, 'utf8')
      existing = JSON.parse(raw)
      if (!Array.isArray(existing)) existing = []
    } catch {
      // file doesn't exist yet
    }
    existing.push({
      at: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      company: payload.company,
      locale: payload.locale,
      headlineMonthly: payload.result.headlineMonthly,
      headlineAnnual: payload.result.headlineAnnual,
      totalHoursPerMonth: payload.result.totalHoursPerMonth,
      upside: payload.result.upside,
      inputs: payload.inputs,
    })
    await fs.writeFile(STORE_PATH, JSON.stringify(existing, null, 2), 'utf8')
  } catch {
    // read-only FS (Vercel) or other error — non-fatal, Attio + email carry the lead
  }
}
