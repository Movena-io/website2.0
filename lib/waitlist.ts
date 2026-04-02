/**
 * Waitlist data layer.
 *
 * Default adapter: JSON file at data/waitlist.json.
 * Works on any persistent server (Railway, Render, VPS, local dev).
 *
 * For Vercel serverless: swap the read/write helpers below with
 * Supabase, PlanetScale, or Vercel KV — the rest of the code stays the same.
 *
 * Supabase swap (quick):
 *   npm install @supabase/supabase-js
 *   Add SUPABASE_URL and SUPABASE_ANON_KEY to .env.local
 *   Replace the file helpers with supabase.from('waitlist').select/insert/update calls
 */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WaitlistEntry {
  id: string
  name: string
  email: string
  company: string
  referralCode: string
  referredBy: string | null
  referralCount: number
  createdAt: string
}

export interface WaitlistData {
  entries: WaitlistEntry[]
}

// ─── Referral incentive tiers ─────────────────────────────────────────────────

export const REFERRAL_TIERS = [
  { referrals: 1,  reward: 'Jump 50 spots on the waitlist',     spotsJumped: 50  },
  { referrals: 3,  reward: 'Early access — first wave at launch', spotsJumped: 150 },
  { referrals: 5,  reward: '3 months free at launch',            spotsJumped: 250 },
  { referrals: 10, reward: '20% lifetime discount',              spotsJumped: 500 },
] as const

export function getNextTier(referralCount: number) {
  return REFERRAL_TIERS.find((t) => t.referrals > referralCount) ?? null
}

export function getCurrentTier(referralCount: number) {
  return [...REFERRAL_TIERS].reverse().find((t) => t.referrals <= referralCount) ?? null
}

// ─── File adapter ─────────────────────────────────────────────────────────────

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readData(): WaitlistData {
  ensureDataDir()
  if (!fs.existsSync(DATA_FILE)) return { entries: [] }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch {
    return { entries: [] }
  }
}

function writeData(data: WaitlistData): void {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

// ─── Position calculation ─────────────────────────────────────────────────────

/**
 * Effective waitlist position.
 * Base position = order of signup (1-indexed).
 * Spot jumps: each referral = 50 spots forward.
 * Min position = 1.
 */
export function calculatePosition(entry: WaitlistEntry, allEntries: WaitlistEntry[]): number {
  const sorted = [...allEntries].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  const basePosition = sorted.findIndex((e) => e.id === entry.id) + 1
  const spotsJumped = entry.referralCount * 50
  return Math.max(1, basePosition - spotsJumped)
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function generateReferralCode(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 12)
  const suffix = crypto.randomBytes(3).toString('hex')
  return `${slug}-${suffix}`
}

export type SignupResult =
  | { success: true; entry: WaitlistEntry; position: number; totalSignups: number }
  | { success: false; error: 'duplicate_email' | 'invalid_referral' | 'server_error' }

export function signup(input: {
  name: string
  email: string
  company: string
  referredBy?: string
}): SignupResult {
  try {
    const data = readData()

    // Dedup by email
    const existing = data.entries.find(
      (e) => e.email.toLowerCase() === input.email.toLowerCase()
    )
    if (existing) {
      // Return their existing entry rather than an error — idempotent
      const position = calculatePosition(existing, data.entries)
      return { success: true, entry: existing, position, totalSignups: data.entries.length }
    }

    // Validate referral code if provided
    let referredByCode: string | null = null
    if (input.referredBy) {
      const referrer = data.entries.find((e) => e.referralCode === input.referredBy)
      if (!referrer) {
        // Ignore unknown referral codes silently — don't block signup
      } else {
        referredByCode = input.referredBy
        // Credit the referrer
        referrer.referralCount += 1
      }
    }

    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      company: input.company.trim(),
      referralCode: generateReferralCode(input.name),
      referredBy: referredByCode,
      referralCount: 0,
      createdAt: new Date().toISOString(),
    }

    data.entries.push(entry)
    writeData(data)

    const position = calculatePosition(entry, data.entries)
    return { success: true, entry, position, totalSignups: data.entries.length }
  } catch (err) {
    console.error('[waitlist] signup error:', err)
    return { success: false, error: 'server_error' }
  }
}

export type LookupResult =
  | {
      success: true
      name: string
      position: number
      referralCount: number
      totalSignups: number
      referralCode: string
      currentTier: (typeof REFERRAL_TIERS)[number] | null
      nextTier: (typeof REFERRAL_TIERS)[number] | null
    }
  | { success: false; error: 'not_found' }

export function lookupByCode(code: string): LookupResult {
  const data = readData()
  const entry = data.entries.find((e) => e.referralCode === code)
  if (!entry) return { success: false, error: 'not_found' }

  const position = calculatePosition(entry, data.entries)
  return {
    success: true,
    name: entry.name,
    position,
    referralCount: entry.referralCount,
    totalSignups: data.entries.length,
    referralCode: entry.referralCode,
    currentTier: getCurrentTier(entry.referralCount),
    nextTier: getNextTier(entry.referralCount),
  }
}

export function getTotalSignups(): number {
  return readData().entries.length
}
