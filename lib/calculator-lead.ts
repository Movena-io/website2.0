// Client-side sender for the savings calculator's unlock form. The calculator
// itself lives in the generated page components; this posts its answers to
// /api/calculator/submit, which recomputes the numbers with lib/calculator/engine
// and sends the lead to Attio and both emails. The field names are the ones
// sanitizeInputs() in that route reads.

import type { CalculatorInputs } from '@/lib/calculator/engine'

export interface CalculatorLeadInput {
  name: string
  email: string
  company: string
  locale: string
  inputs: CalculatorInputs
}

export async function submitCalculatorLead(input: CalculatorLeadInput): Promise<boolean> {
  try {
    const res = await fetch('/api/calculator/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    return res.ok
  } catch {
    return false
  }
}
