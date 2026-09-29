// A minimal iCalendar builder, just enough for the call we book off the demo
// form. Written by hand rather than pulled from a package: one VEVENT with a
// single attendee is a small enough target that a dependency is not worth it.

export type CalendarInvite = {
  uid: string
  start: Date
  minutes: number
  summary: string
  description: string
  organizerEmail: string
  organizerName: string
  attendeeEmail: string
}

/** 20261006T130000Z */
function stamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

// Commas, semicolons and backslashes are field separators in iCalendar, and a
// literal newline ends a property, so all four have to be escaped.
function escapeText(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

// RFC 5545 caps a content line at 75 octets, continuing with a leading space.
// Folding is done on bytes, not characters, so a multi-byte character is never
// split down the middle.
function fold(line: string): string {
  const bytes = Buffer.from(line, 'utf8')
  if (bytes.length <= 75) return line

  const out: string[] = []
  let start = 0
  let limit = 75
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length)
    // Back off until the slice ends on a character boundary.
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--
    out.push(bytes.subarray(start, end).toString('utf8'))
    start = end
    limit = 74 // continuation lines carry a leading space
  }
  return out.join('\r\n ')
}

export function buildInvite(invite: CalendarInvite): string {
  const end = new Date(invite.start.getTime() + invite.minutes * 60000)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Movena//Demo call//DA',
    'CALSCALE:GREGORIAN',
    // REQUEST is what makes a mail client offer to put this in a calendar
    // rather than treating it as a file to download.
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${invite.uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(invite.start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeText(invite.summary)}`,
    `DESCRIPTION:${escapeText(invite.description)}`,
    `ORGANIZER;CN=${escapeText(invite.organizerName)}:mailto:${invite.organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${invite.attendeeEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.map(fold).join('\r\n') + '\r\n'
}
