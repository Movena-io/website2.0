import { NextRequest, NextResponse } from 'next/server'
import { lookupByCode } from '@/lib/waitlist'

export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const result = lookupByCode(params.code)

  if (!result.success) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json(result)
}
