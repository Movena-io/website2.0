#!/usr/bin/env node
// Converts a Claude Design .dc.html export into a TSX component.
//
// The export is inline-styled HTML that is already close to JSX. This script
// does the mechanical part so no style or number is retyped by hand:
//   style="a: b"            -> style={{ a: 'b' }}
//   {{hole}}                -> {hole}          (text, attributes and styles)
//   <sc-if value="{{x}}">   -> {x && (<>...</>)}
//   onClick="{{fn}}"        -> onClick={fn}
//   class/for/stroke-width  -> className/htmlFor/strokeWidth
//   renderVals()            -> kept verbatim inside the component
//
// The design's own header, footer, demo CTA and cookie banner are dropped:
// those are shared components in the app.

import fs from 'node:fs'
import path from 'node:path'

// ---------------------------------------------------------------- attributes
const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'vector-effect': 'vectorEffect',
  'gradientUnits': 'gradientUnits',
  'patternUnits': 'patternUnits',
  'preserveAspectRatio': 'preserveAspectRatio',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  maxlength: 'maxLength',
  minlength: 'minLength',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  enterkeyhint: 'enterKeyHint',
  inputmode: 'inputMode',
  novalidate: 'noValidate',
  srcset: 'srcSet',
  'accept-charset': 'acceptCharset',
}

// Design pages link each other by export filename; rewrite to real routes.
const HREF_MAP = {
  da: {
    'Forside-v6.dc.html': '/da',
    'Vind-flere-flytninger-v5.dc.html': '/da/vind-flere-flytninger',
    'Hav-styr-paa-dagen-v5.dc.html': '/da/hav-styr-paa-dagen',
    'Faa-alle-pengene-hjem-v5.dc.html': '/da/faa-alle-pengene-hjem',
    'Om-os-v5.dc.html': '/da/om-os',
    'Book-demo-v5.dc.html': '/da/book-demo',
    'Blog-v5.dc.html': '/da/blog',
    'Blog-post-v5.dc.html': '/da/blog',
    'Privatlivspolitik-v5.dc.html': '/da/privatlivspolitik',
  },
  en: {
    'EN-Home.dc.html': '/en',
    'EN-Win-more-moves.dc.html': '/en/win-more-moves',
    'EN-Run-the-day.dc.html': '/en/run-the-day',
    'EN-Get-paid.dc.html': '/en/get-paid',
    'EN-About.dc.html': '/en/about',
    'EN-Book-demo.dc.html': '/en/book-demo',
    'EN-Blog.dc.html': '/en/blog',
    'EN-Blog-post.dc.html': '/en/blog',
    'EN-Privacy.dc.html': '/en/privacy',
  },
}
let LOCALE = 'da'

// The privacy page ships with three bracketed placeholders. They are filled
// from the live policy at app.movena.io/privatlivspolitik (Postmark for email,
// Supabase for the database, 12 months' retention) so no bracket reaches
// production. The date is the day the page was rebuilt.
// Copy changes applied to every converted page, so a regeneration cannot
// quietly restore the design's original wording.
const TEXT_REPLACEMENTS = [
  // --- Phone number ------------------------------------------------------
  ['tel:+4528708402', 'tel:+4550282856'],
  ['+45 28 70 84 02', '+45 50 28 28 56'],
  ['28 70 84 02', '50 28 28 56'],

  // --- No more scheduling: we call, we do not agree a slot ---------------
  ['Udfyld formularen, så ringer vi jer op og aftaler en tid.',
   'Udfyld formularen, så ringer vi jer op.'],
  ["Fill in the form and we'll call you to find a time.",
   "Fill in the form and we'll call you."],

  ['En af os tre ringer og aftaler et tidspunkt, der passer jer.',
   'En af os tre ringer jer op.'],
  ['One of the three of us calls to find a time that suits you.',
   'One of the three of us calls you.'],

  ['Så ringer vi jer op og finder en tid, der passer jer.',
   'Så ringer vi jer op.'],
  ["Then we'll call you and find a time that suits you.",
   "Then we'll call you."],

  // Confirmation now names the number we will ring.
  ['Tak, {{dFirstName}}. Vi ringer til dig.',
   'Tak, {{dFirstName}}. Vi ringer til dig på {{dPhone}}.'],
  ["Thanks, {{dFirstName}}. We'll call you.",
   "Thanks, {{dFirstName}}. We'll call you on {{dPhone}}."],

  ['En af os tre ringer på {{dPhone}} og aftaler et tidspunkt for demoen. ', ''],
  ['One of the three of us will call {{dPhone}} to set up a time for the demo. ', ''],

  // --- The form must never look sent when the lead did not go out ---------
  ['<sc-if value="{{dErr}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">Tjek de markerede felter, så vi kan ringe til jer.</p></sc-if>', '<sc-if value="{{dErr}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">Tjek de markerede felter, så vi kan ringe til jer.</p></sc-if><sc-if value="{{dFailed}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">Beskeden kunne ikke sendes. Ring til os på <a href="tel:+4550282856" style="color: #B42318">+45 50 28 28 56</a>, så tager vi den med det samme.</p></sc-if>'],
  ['<sc-if value="{{dErr}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">Check the marked fields so we can call you.</p></sc-if>', '<sc-if value="{{dErr}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">Check the marked fields so we can call you.</p></sc-if><sc-if value="{{dFailed}}" hint-placeholder-val="{{ false }}"><p role="alert" style="margin: 0; font-size: 14px; font-weight: 600; color: #B42318">We could not send your message. Call us on <a href="tel:+4550282856" style="color: #B42318">+45 50 28 28 56</a> and we will take it straight away.</p></sc-if>'],

  // --- Headline must name the same three things as the tabs below it -----
  // The third tab is "Folkene" / "Crew", so the heading says people, not
  // vehicles. The design export still says "vognene" / "the trucks".
  ['Kunden, kontoret og vognene', 'Kunden, kontoret og folkene'],
  ['The customer, the office and the trucks', 'The customer, the office and the crew'],
]

const PLACEHOLDERS = {
  '[dato]': '28. september 2026',
  '[date]': '28 September 2026',
  '[Udbyder af e-mail og kundesystem]': 'Postmark (e-mail) og Supabase (database)',
  '[Email and CRM provider]': 'Postmark (email) and Supabase (database)',
  '[antal]': '12',
  '[number]': '12',
}

const BOOLEAN_ATTRS = new Set(['checked', 'disabled', 'required', 'readonly', 'selected', 'autofocus', 'multiple', 'novalidate'])
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

const cssProp = (p) => {
  const t = p.trim()
  if (t.startsWith('--')) return `'${t}'`
  if (t.startsWith('-webkit-')) return 'Webkit' + t.slice(8).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase())
  if (t.startsWith('-moz-')) return 'Moz' + t.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase())
  if (t.startsWith('-ms-')) return 'ms' + t.slice(4).replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase())
  return t.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g
// A hole naming a value from renderVals() reads off V; anything else (a
// literal like `false`) is emitted as written.
const IDENT = /^[A-Za-z_$][\w$]*$/
const holeExpr = (e) => (IDENT.test(e.trim()) ? 'V.' + e.trim() : e.trim())
const hasHole = (s) => { HOLE.lastIndex = 0; return HOLE.test(s) }

// A value that is exactly one hole becomes the bare expression; a value with a
// hole embedded in text becomes a template literal; otherwise a plain string.
function valueExpr(raw) {
  const only = raw.match(/^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/)
  if (only) return holeExpr(only[1])
  if (!hasHole(raw)) return JSON.stringify(raw)
  const tpl = raw
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
    .replace(HOLE, (_, e) => '${' + holeExpr(e) + '}')
  return '`' + tpl + '`'
}

function styleToObject(css) {
  const parts = []
  let depth = 0, cur = ''
  for (const ch of css) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ';' && depth === 0) { parts.push(cur); cur = '' } else cur += ch
  }
  if (cur.trim()) parts.push(cur)
  const entries = []
  for (const part of parts) {
    const i = part.indexOf(':')
    if (i < 0) continue
    const prop = part.slice(0, i)
    const val = part.slice(i + 1).trim()
    if (!prop.trim() || !val) continue
    entries.push(`${cssProp(prop)}: ${valueExpr(val)}`)
  }
  return `{{ ${entries.join(', ')} }}`
}

// --------------------------------------------------------------------- tags
const decodeEntities = (v) =>
  v
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&amp;/g, '&')

function convertAttrs(attrStr) {
  // A handful of attributes in the export are entity-escaped whole, e.g.
  //   <div style=&quot;font-size: 9px; ...&quot;>
  // The browser cannot parse those either, so the element renders unstyled.
  // Strip the mangled run rather than emit its fragments as bogus attributes.
  // Note the `=&quot;` test: a data-URI containing &quot; inside a properly
  // quoted value is legitimate and must survive.
  attrStr = attrStr.replace(/[a-zA-Z-]+=&quot;[\s\S]*?&quot;/g, ' ')
  // Same defect, but as the HTML parser normalised it:
  //   style="&quot;font-size:" 9px;="" color:="" #8a97aa;="" ...
  // A real value never *starts* with the entity (the data-URI case has it
  // mid-value), so this only catches the broken ones. The element renders
  // unstyled in the design too, so dropping every fragment matches it.
  if (/=\s*"&quot;/.test(attrStr)) return ''
  const out = []
  const re = /([:@a-zA-Z_][-:.\w]*)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let m
  while ((m = re.exec(attrStr))) {
    const name = m[1]
    const raw = m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : m[5]
    if (name === 'hint-placeholder-val') continue
    // The export contains a few double-escaped style attributes, e.g.
    // style="&quot;font-size:" 9px;="" color:="" #8a97aa;="" ...
    // The browser cannot parse those either and drops the styling, so the
    // fragments are skipped here rather than emitted as invalid JSX.
    if (!/^[A-Za-z_][\w.:-]*$/.test(name)) continue

    if (raw === undefined) {
      // Bare boolean attribute.
      const jsx = ATTR_MAP[name] || name
      out.push(BOOLEAN_ATTRS.has(name) ? `${jsx}` : `${jsx}=""`)
      continue
    }

    if (name === 'style') {
      const obj = styleToObject(decodeEntities(raw))
      if (obj !== '{{  }}') out.push(`style=${obj}`)
      continue
    }

    const jsx = ATTR_MAP[name] || name
    if (name === 'href' && HREF_MAP[LOCALE][raw]) {
      out.push(`href=${JSON.stringify(HREF_MAP[LOCALE][raw])}`)
      continue
    }
    const dec = decodeEntities(raw)
    if (hasHole(dec)) {
      out.push(`${jsx}={${valueExpr(dec)}}`)
    } else if (BOOLEAN_ATTRS.has(name)) {
      out.push(dec === '' || dec === name || dec === 'true' ? `${jsx}` : `${jsx}={${JSON.stringify(dec)}}`)
    } else {
      out.push(`${jsx}=${JSON.stringify(dec)}`)
    }
  }
  return out.length ? ' ' + out.join(' ') : ''
}

// Escape braces that are not holes so JSX text stays valid.
function textToJsx(text) {
  // Holes are pulled out first, then any brace still left in the prose is
  // escaped, then the holes go back as JSX expressions. Doing it in the other
  // order mangles the inner brace of {{name}}.
  const held = []
  let s2 = text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => {
    held.push(holeExpr(e))
    return '\u0000HOLE' + (held.length - 1) + '\u0000'
  })
  s2 = s2.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
  return s2.replace(/\u0000HOLE(\d+)\u0000/g, (_, i) => '{' + held[+i] + '}')
}

function convertMarkup(html) {
  let out = ''
  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt < 0) { out += textToJsx(html.slice(i)); break }
    out += textToJsx(html.slice(i, lt))

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt)
      i = end < 0 ? html.length : end + 3
      continue
    }

    const gt = findTagEnd(html, lt)
    const tag = html.slice(lt, gt + 1)
    const m = tag.match(/^<\s*\/?\s*([a-zA-Z][-\w]*)/)
    if (!m) { out += textToJsx(tag); i = gt + 1; continue }

    const name = m[1]
    const closing = /^<\s*\//.test(tag)
    if (closing) { out += `</${name}>`; i = gt + 1; continue }

    const attrStr = tag.replace(/^<\s*[a-zA-Z][-\w]*/, '').replace(/\/?>$/, '')
    const attrs = convertAttrs(attrStr)
    const selfClosed = /\/>$/.test(tag) || VOID.has(name.toLowerCase())
    out += selfClosed ? `<${name}${attrs} />` : `<${name}${attrs}>`
    i = gt + 1
  }
  return out
}

// Respects quotes so a ">" inside an attribute does not end the tag.
function findTagEnd(s, start) {
  let q = null
  for (let i = start; i < s.length; i++) {
    const c = s[i]
    if (q) { if (c === q) q = null; continue }
    if (c === '"' || c === "'") { q = c; continue }
    if (c === '>') return i
  }
  return s.length - 1
}

// ------------------------------------------------------------------- sc-if
// Innermost first, so nesting resolves correctly.
function expandScIf(html) {
  const open = /<sc-if\b([^>]*)>/g
  for (let guard = 0; guard < 500; guard++) {
    let found = null
    open.lastIndex = 0
    let m
    while ((m = open.exec(html))) {
      const bodyStart = m.index + m[0].length
      const close = html.indexOf('</sc-if>', bodyStart)
      if (close < 0) continue
      const body = html.slice(bodyStart, close)
      if (body.includes('<sc-if')) continue // not innermost
      found = { start: m.index, attrs: m[1], bodyStart, close }
      break
    }
    if (!found) break
    const val = found.attrs.match(/value\s*=\s*"([^"]*)"/)
    const cond = val ? valueExprRawCond(val[1]) : 'false'
    const body = html.slice(found.bodyStart, found.close)
    html =
      html.slice(0, found.start) +
      ` IF(${cond})` + body + ` ENDIF` +
      html.slice(found.close + '</sc-if>'.length)
  }
  return html
}
function valueExprRawCond(raw) {
  const only = raw.match(/^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/)
  return only ? holeExpr(only[1]) : JSON.stringify(raw)
}

// ------------------------------------------------------------------ script
// Applied to the design's renderVals() body. The export ships a fake submit
// that just waits 700ms and flips to "sent"; this wires it to the real lead
// endpoint instead, and renames the submit button.
const SCRIPT_REPLACEMENTS = [
  [
    "dSubmit: () => { if (!(dName.trim() && dFirm.trim() && dPhoneOk)) { set({ dErr: true }); return; } set({ dSending: true, dErr: false }); setTimeout(() => setState({ dSending: false, dSent: true }), 700); },",
    "dSubmit: () => { if (!(dName.trim() && dFirm.trim() && dPhoneOk)) { set({ dErr: true }); return; } set({ dSending: true, dErr: false, dFailed: false }); submitDemoLead({ name: dName, company: dFirm, phone: dPhone, email: dMail, sizeIndex: st.dSize, usesToday: st.dNowText, callWindow: st.dWhenStr, locale: DEMO_LOCALE }).then((ok) => set({ dSending: false, dSent: ok, dFailed: !ok })).catch(() => set({ dSending: false, dFailed: true })); },",
  ],
  ["dBtnLabel: s.dSending ? 'Sender…' : 'Ring mig op',", "dBtnLabel: s.dSending ? 'Sender…' : 'Bliv ringet op',"],
  ["dBtnLabel: s.dSending ? 'Sending…' : 'Call me',", "dBtnLabel: s.dSending ? 'Sending…' : 'Request a call',"],

  // The design has no failure state, so dFailed never reaches the markup.
  // Without this the form silently does nothing when the lead cannot be sent.
  ['dShowForm: !dSent, dSent: dSent, dErr: dErr,',
   'dShowForm: !dSent, dSent: dSent, dErr: dErr, dFailed: s.dFailed === true,'],
]

function extractRenderVals(src) {
  const i = src.indexOf('renderVals()')
  if (i < 0) return { body: '', ret: '{}' }
  const braceStart = src.indexOf('{', i)
  let depth = 0, end = braceStart
  for (let k = braceStart; k < src.length; k++) {
    if (src[k] === '{') depth++
    else if (src[k] === '}') { depth--; if (depth === 0) { end = k; break } }
  }
  let body = src.slice(braceStart + 1, end).trim()
  body = body.replace(/this\.setState/g, 'setState').replace(/this\.state/g, 'st')
  for (const [k, v] of SCRIPT_REPLACEMENTS) body = body.split(k).join(v)
  return { body }
}

// ------------------------------------------------------------------- strip
// Remove the design's own chrome; the app supplies shared components.
function stripChrome(html) {
  const notes = []
  const swapBlock = (startRe, endTag, marker, label) => {
    const m = html.match(startRe)
    if (!m) return
    const start = m.index
    const end = html.indexOf(endTag, start)
    if (end < 0) return
    html = html.slice(0, start) + ' ' + marker + '' + html.slice(end + endTag.length)
    notes.push(label)
  }
  swapBlock(/<header\b/, '</header>', 'SITEHEADER', 'header')
  swapBlock(/<footer\b/, '</footer>', 'SITEFOOTER', 'footer')
  return { html, notes }
}

// Drop the section whose heading matches, used for the shared demo CTA.
function dropSectionContaining(html, needle) {
  const idx = html.indexOf(needle)
  if (idx < 0) return { html, dropped: false }
  const start = html.lastIndexOf('<section', idx)
  if (start < 0) return { html, dropped: false }
  // Walk to the matching </section>.
  let depth = 0, i = start
  while (i < html.length) {
    const nextOpen = html.indexOf('<section', i + 1)
    const nextClose = html.indexOf('</section>', i + 1)
    if (nextClose < 0) break
    if (nextOpen >= 0 && nextOpen < nextClose) { depth++; i = nextOpen }
    else {
      if (depth === 0) return { html: html.slice(0, start) + ' DEMOCTA' + html.slice(nextClose + '</section>'.length), dropped: true }
      depth--; i = nextClose
    }
  }
  return { html, dropped: false }
}

// Drop the cookie banner block (sc-if on ckShow) — the app has its own.
function dropCookieBanner(html) {
  const m = html.match(/<sc-if value="\{\{ckShow\}\}"[^>]*>/)
  if (!m) return { html, dropped: false }
  const start = m.index
  const bodyStart = start + m[0].length
  let depth = 1, i = bodyStart
  while (i < html.length && depth > 0) {
    const nOpen = html.indexOf('<sc-if', i)
    const nClose = html.indexOf('</sc-if>', i)
    if (nClose < 0) break
    if (nOpen >= 0 && nOpen < nClose) { depth++; i = nOpen + 6 }
    else { depth--; i = nClose + 8; if (depth === 0) return { html: html.slice(0, start) + html.slice(i), dropped: true } }
  }
  return { html, dropped: false }
}

// -------------------------------------------------------------------- main
function convert(file, componentName, demoNeedle) {
  const src = fs.readFileSync(file, 'utf8')
  const xs = src.indexOf('<x-dc>')
  const xe = src.indexOf('</x-dc>')
  let body = src.slice(xs + '<x-dc>'.length, xe)
  body = body.replace(/<helmet>[\s\S]*?<\/helmet>/, '')
  for (const [k, v] of Object.entries(PLACEHOLDERS)) body = body.split(k).join(v)
  for (const [k, v] of TEXT_REPLACEMENTS) body = body.split(k).join(v)

  const notes = []
  let r = stripChrome(body); body = r.html; notes.push(...r.notes)
  // "-" means the page owns that section rather than sharing it. Book-demo's
  // hero uses the same heading as the shared CTA, so it must not be stripped.
  if (demoNeedle !== '-') {
    const d = dropSectionContaining(body, demoNeedle)
    body = d.html
    if (d.dropped) notes.push('demoCTA')
  }
  let c = dropCookieBanner(body); body = c.html
  if (c.dropped) notes.push('cookieBanner')

  body = expandScIf(body)
  let jsx = convertMarkup(body)

  // Re-inflate the sc-if and shared-component markers.
  jsx = jsx
    .replace(/ IF\(([\s\S]*?)\)/g, (_, cond) => `{${cond} ? (<>`)
    .replace(/ ENDIF/g, `</>) : null}`)
    .replace(/ DEMOCTA/g, `<DemoCTA />`)
    .replace(/ SITEHEADER/g, `<SiteHeader />`)
    .replace(/ SITEFOOTER/g, `<SiteFooter />`)

  const { body: vals } = extractRenderVals(src)

  // Mark the design root so globals.css can undo Tailwind's preflight inside
  // converted markup only (see the [data-dc] rule).
  jsx = jsx.replace('<div ', '<div data-dc="" ')

  return { jsx: jsx.trim(), vals, notes }
}

// ------------------------------------------------------------------- emit
const [, , inFile, outFile, componentName, demoNeedle, localeArg] = process.argv
LOCALE = localeArg === 'en' ? 'en' : 'da'
if (!inFile) {
  console.error('usage: dc-to-tsx.mjs <in.dc.html> <out.tsx> <ComponentName> [demoHeadingNeedle]')
  process.exit(1)
}
const { jsx, vals, notes } = convert(inFile, componentName, demoNeedle || 'Se Movena med')

const out = `// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/${path.basename(inFile)} by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'
import { submitDemoLead } from '@/lib/demo-lead'

const DEMO_LOCALE = '${LOCALE}'

export default function ${componentName}() {
  const [st, setSt] = useState<Record<string, any>>({})
  const setState = (patch: Record<string, any>) => setSt((p) => ({ ...p, ...patch }))

  useEffect(() => {
    const onResize = () => setSt((p) => (p.vw === window.innerWidth ? p : { ...p, vw: window.innerWidth }))
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const vals: Record<string, any> = (() => {
${vals}
  })()
  const V = vals as any

  return (
${jsx}
  )
}
`
fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, out)
console.error(`${path.basename(inFile)} -> ${path.basename(outFile)}  (dropped: ${notes.join(', ') || 'none'})`)
