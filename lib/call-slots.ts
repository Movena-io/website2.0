// The day and time choices on the "book a demo" form, and the conversion from
// a chosen slot back to a real instant.
//
// Everything is computed in Europe/Copenhagen rather than in the visitor's own
// zone: the call is made by us, from Denmark, so "Tuesday at 10:00" has to mean
// 10:00 here. Computing in a fixed zone also keeps the server render and the
// client render identical, which a `new Date()` in local time would not.

export const CALL_TZ = 'Europe/Copenhagen'

/** Length of the call we put in the calendar, in minutes. */
export const CALL_MINUTES = 15

export type CallDay = {
  /** ISO date, the select's value. */
  value: string
  /** "Tirsdag 6. okt." — how the option reads. */
  label: string
  /** Same, but fit for the middle of a sentence (lowercase in Danish). */
  sentenceLabel: string
}

const DA_WEEKDAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
const DA_MONTHS = ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.']
const EN_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Today's date in Copenhagen, as YYYY-MM-DD. */
function todayInCopenhagen(now: Date): string {
  // en-CA formats as YYYY-MM-DD, which is the shape we want to do maths on.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CALL_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

// Date maths is done at noon UTC so a daylight-saving shift can never move the
// calendar day underneath us.
function atNoon(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12))
}

function addDays(ymd: string, n: number): string {
  const d = atNoon(ymd)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** 0 = Sunday … 6 = Saturday. */
function weekday(ymd: string): number {
  return atNoon(ymd).getUTCDay()
}

export function formatCallDay(ymd: string, locale: string): { label: string; sentenceLabel: string } {
  const d = atNoon(ymd)
  const wd = d.getUTCDay()
  const day = d.getUTCDate()
  const month = d.getUTCMonth()

  if (locale === 'da') {
    const plain = `${DA_WEEKDAYS[wd]} ${day}. ${DA_MONTHS[month]}`
    // Danish lowercases weekdays inside a sentence, so the option label and the
    // confirmation line are not the same string.
    return { label: capitalise(plain), sentenceLabel: plain }
  }
  const plain = `${EN_WEEKDAYS[wd]} ${day} ${EN_MONTHS[month]}`
  return { label: plain, sentenceLabel: plain }
}

/**
 * The next `count` weekdays, starting tomorrow. Today is never offered: the
 * form is a request for a call back, not a booking for the next few minutes.
 */
export function nextWeekdays(now: Date, locale: string, count = 10): CallDay[] {
  const out: CallDay[] = []
  let ymd = todayInCopenhagen(now)
  while (out.length < count) {
    ymd = addDays(ymd, 1)
    const wd = weekday(ymd)
    if (wd === 0 || wd === 6) continue
    out.push({ value: ymd, ...formatCallDay(ymd, locale) })
  }
  return out
}

/** 09:00 to 16:00 in half-hour steps. */
export function callTimes(): string[] {
  const out: string[] = []
  for (let m = 9 * 60; m <= 16 * 60; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  }
  return out
}

export function isCallTime(t: string): boolean {
  return callTimes().includes(t)
}

export function isCallDay(ymd: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return false
  const wd = weekday(ymd)
  return wd !== 0 && wd !== 6
}

// How far Copenhagen is from UTC at a given instant, in minutes.
function offsetMinutes(instant: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CALL_TZ,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(instant)
  const p: Record<string, string> = {}
  for (const part of parts) p[part.type] = part.value
  // Intl renders midnight as hour 24 in some engines; normalise it.
  const hour = p.hour === '24' ? 0 : Number(p.hour)
  const asIfUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), hour, Number(p.minute), Number(p.second))
  return (asIfUtc - instant.getTime()) / 60000
}

/**
 * The instant at which it is `time` on `ymd` in Copenhagen. Iterated because
 * the offset itself depends on the instant, which matters on the two days a
 * year when the clocks move.
 */
export function copenhagenToUtc(ymd: string, time: string): Date {
  const [y, m, d] = ymd.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const wall = Date.UTC(y, m - 1, d, hh, mm)
  let instant = new Date(wall)
  for (let i = 0; i < 3; i++) instant = new Date(wall - offsetMinutes(instant) * 60000)
  return instant
}
