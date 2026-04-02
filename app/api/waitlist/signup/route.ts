import { NextRequest, NextResponse } from 'next/server'
import { signup } from '@/lib/waitlist'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, company, referredBy } = body as Record<string, string>

  if (!name?.trim() || !email?.trim() || !company?.trim()) {
    return NextResponse.json({ error: 'name, email, and company are required' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const result = signup({
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    referredBy: referredBy?.trim() || undefined,
  })

  if (!result.success) {
    if (result.error === 'server_error') {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({
    code: result.entry.referralCode,
    position: result.position,
    totalSignups: result.totalSignups,
  })
}
