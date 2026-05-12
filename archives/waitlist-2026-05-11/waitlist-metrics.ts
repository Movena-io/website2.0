/**
 * Waitlist metrics — read-only snapshot of the current waitlist state.
 *
 * Run from projects/website/:
 *   npx tsx scripts/waitlist-metrics.ts
 *
 * Reads data/waitlist.json directly (same source as lib/waitlist.ts).
 * Prints a human-readable summary to stdout. Paste the output into
 * reports/weekly-metrics.md for the weekly cadence.
 *
 * Zero new dependencies. No side effects. Safe to run any time.
 */

import fs from 'fs'
import path from 'path'
import type { WaitlistEntry, WaitlistData } from '../lib/waitlist'
import { REFERRAL_TIERS, getCurrentTier } from '../lib/waitlist'

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

function readData(): WaitlistData {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`[metrics] No waitlist file at ${DATA_FILE}`)
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  d.setUTCDate(d.getUTCDate() - n)
  return d
}

function countSince(entries: WaitlistEntry[], date: Date): number {
  return entries.filter((e) => new Date(e.createdAt) >= date).length
}

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

function padLeft(s: string, n: number): string {
  return s.length >= n ? s : ' '.repeat(n - s.length) + s
}

function bar(count: number, max: number, width = 20): string {
  if (max === 0) return ''
  const filled = Math.round((count / max) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

// Simple ASCII sparkline for a fixed-length number series.
function sparkline(values: number[]): string {
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
  const max = Math.max(...values)
  if (max === 0) return values.map(() => '▁').join('')
  return values
    .map((v) => {
      const idx = Math.min(chars.length - 1, Math.floor((v / max) * (chars.length - 1)))
      return chars[idx]
    })
    .join('')
}

function formatTierLabel(t: (typeof REFERRAL_TIERS)[number] | null): string {
  if (!t) return 'Tier 0 (no referrals)'
  return `Tier ${t.referrals}+ (${t.reward})`
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

function run() {
  const { entries } = readData()
  const total = entries.length

  // Time windows
  const today = daysAgo(0)
  const week = daysAgo(7)
  const month = daysAgo(30)
  const thisWeek = countSince(entries, week)
  const thisMonth = countSince(entries, month)
  const todayCount = countSince(entries, today)

  // Referrals
  const totalReferrals = entries.reduce((sum, e) => sum + e.referralCount, 0)
  const referredEntries = entries.filter((e) => e.referredBy !== null).length
  const topReferrers = [...entries]
    .filter((e) => e.referralCount > 0)
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, 5)

  // Tier distribution
  const tierCounts = new Map<string, number>()
  tierCounts.set('Tier 0', 0)
  REFERRAL_TIERS.forEach((t) => tierCounts.set(`Tier ${t.referrals}+`, 0))
  for (const e of entries) {
    const tier = getCurrentTier(e.referralCount)
    const key = tier ? `Tier ${tier.referrals}+` : 'Tier 0'
    tierCounts.set(key, (tierCounts.get(key) ?? 0) + 1)
  }

  // Signup velocity — last 14 days
  const velocity: { date: string; count: number }[] = []
  for (let i = 13; i >= 0; i--) {
    const dayStart = daysAgo(i)
    const dayEnd = daysAgo(i - 1)
    const count = entries.filter((e) => {
      const t = new Date(e.createdAt)
      return t >= dayStart && t < dayEnd
    }).length
    velocity.push({
      date: dayStart.toISOString().slice(5, 10),
      count,
    })
  }

  // Email domain breakdown
  const domains = new Map<string, number>()
  for (const e of entries) {
    const domain = e.email.split('@')[1] ?? '(invalid)'
    domains.set(domain, (domains.get(domain) ?? 0) + 1)
  }
  const topDomains = Array.from(domains.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)

  // ─── Output ────────────────────────────────────────────────────────────────

  const now = new Date()
  const stamp = now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

  console.log('')
  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`  Movena waitlist — ${stamp}`)
  console.log('═══════════════════════════════════════════════════════════════')
  console.log('')

  console.log('  Headline')
  console.log('  ────────')
  console.log(`    Total signups ............ ${total}`)
  console.log(`    Today .................... ${todayCount}`)
  console.log(`    This week (7d) ........... ${thisWeek}`)
  console.log(`    This month (30d) ......... ${thisMonth}`)
  console.log('')

  console.log('  Referrals')
  console.log('  ─────────')
  console.log(`    Total referrals earned ... ${totalReferrals}`)
  console.log(`    Entries from a referral .. ${referredEntries} (${total > 0 ? Math.round((referredEntries / total) * 100) : 0}%)`)
  console.log('')
  if (topReferrers.length === 0) {
    console.log('    No referrals yet.')
  } else {
    console.log('    Top referrers:')
    topReferrers.forEach((e, i) => {
      console.log(`      ${i + 1}. ${pad(e.name, 24)} ${padLeft(String(e.referralCount), 3)} referrals`)
    })
  }
  console.log('')

  console.log('  Tier distribution')
  console.log('  ─────────────────')
  const maxTierCount = Math.max(...Array.from(tierCounts.values()), 1)
  Array.from(tierCounts.entries()).forEach(([label, count]) => {
    console.log(`    ${pad(label, 10)} ${padLeft(String(count), 4)}  ${bar(count, maxTierCount, 20)}`)
  })
  console.log('')

  console.log('  Signup velocity — last 14 days')
  console.log('  ──────────────────────────────')
  console.log(`    ${sparkline(velocity.map((v) => v.count))}`)
  console.log(`    ${velocity[0].date}${' '.repeat(Math.max(0, 14 - 10))}${velocity[velocity.length - 1].date}`)
  const peak = velocity.reduce((m, v) => (v.count > m.count ? v : m), velocity[0])
  console.log(`    peak: ${peak.count} on ${peak.date}`)
  console.log('')

  console.log('  Top email domains')
  console.log('  ─────────────────')
  if (topDomains.length === 0) {
    console.log('    (none)')
  } else {
    for (const [domain, count] of topDomains) {
      console.log(`    ${pad(domain, 28)} ${padLeft(String(count), 4)}`)
    }
  }
  console.log('')

  console.log('═══════════════════════════════════════════════════════════════')
  console.log('')
}

run()
