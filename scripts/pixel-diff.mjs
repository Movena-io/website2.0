#!/usr/bin/env node
// Pixel-diffs the design export (:8001) against the rebuilt site (:3000) at
// 1440 / 820 / 390 and writes a diff PNG plus a mismatch percentage per page.
//
//   node scripts/pixel-diff.mjs <designUrl> <siteUrl> <label> [widths]

import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const CDP = 'http://127.0.0.1:9333'
const OUT = process.env.DIFF_OUT || '/tmp/pixeldiff'

async function connect() {
  const list = await (await fetch(`${CDP}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? m.error); pending.delete(m.id) }
  }
  const send = (method, params = {}) =>
    new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
  return { send, close: () => ws.close() }
}

async function shoot(send, url, width, mobile) {
  await send('Emulation.setDeviceMetricsOverride', {
    width, height: 900, deviceScaleFactor: 1, mobile,
  })
  await send('Page.navigate', { url })
  await new Promise((r) => setTimeout(r, 3800))
  const ev = async (x) => (await send('Runtime.evaluate', { expression: x, returnByValue: true })).result?.value
  // globals.css sets scroll-behavior: smooth, so scrollTo animates and the
  // capture can start while the page is still gliding back up. Force instant
  // scrolling, then wait until the page really is at the top.
  await ev("document.documentElement.style.scrollBehavior='auto'")
  // Walk down the page rather than jumping. The design reveals sections with an
  // IntersectionObserver, and a single jump to the bottom skips the middle, so
  // those sections stay unrevealed and the capture comes back blank.
  const total = await ev('document.body.scrollHeight')
  for (let y = 0; y < total; y += 600) {
    await ev(`window.scrollTo(0, ${y})`)
    await new Promise((r) => setTimeout(r, 120))
  }
  await ev('window.scrollTo(0, document.body.scrollHeight)')
  await new Promise((r) => setTimeout(r, 1600))
  await ev('window.scrollTo(0, 0)')
  for (let i = 0; i < 40; i++) {
    if ((await ev('window.scrollY')) === 0) break
    await ev('window.scrollTo(0, 0)')
    await new Promise((r) => setTimeout(r, 100))
  }
  await new Promise((r) => setTimeout(r, 600))
  const h = await ev('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)')
  const shot = await send('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height: Math.min(h, 30000), scale: 1 },
  })
  return { buf: Buffer.from(shot.data, 'base64'), height: Math.min(h, 30000) }
}

function pad(png, width, height) {
  if (png.width === width && png.height === height) return png
  const out = new PNG({ width, height })
  // Pad with white so height differences show up as a block of diff rather
  // than shifting every row.
  out.data.fill(0xff)
  PNG.bitblt(png, out, 0, 0, Math.min(png.width, width), Math.min(png.height, height), 0, 0)
  return out
}

const [, , designUrl, siteUrl, label, widthsArg] = process.argv
// Desktop emulation at every width on purpose. The design export has no
// viewport meta, so mobile emulation would give it a 980px layout viewport
// while the Next site (which does have one) uses the real width, and the two
// would not be comparable.
const widths = (widthsArg || '1440,820,390').split(',').map((w) => ({ w: +w, mobile: false }))

fs.mkdirSync(OUT, { recursive: true })
const { send, close } = await connect()
await send('Page.enable')
await send('Runtime.enable')

const results = []
for (const { w, mobile } of widths) {
  const a = await shoot(send, designUrl, w, mobile)
  const b = await shoot(send, siteUrl, w, mobile)
  const pa = PNG.sync.read(a.buf)
  const pb = PNG.sync.read(b.buf)
  const H = Math.max(pa.height, pb.height)
  const A = pad(pa, w, H)
  const B = pad(pb, w, H)
  const diff = new PNG({ width: w, height: H })
  const n = pixelmatch(A.data, B.data, diff.data, w, H, { threshold: 0.12, includeAA: false })
  const pct = (100 * n) / (w * H)
  fs.writeFileSync(path.join(OUT, `${label}-${w}-diff.png`), PNG.sync.write(diff))
  fs.writeFileSync(path.join(OUT, `${label}-${w}-design.png`), a.buf)
  fs.writeFileSync(path.join(OUT, `${label}-${w}-site.png`), b.buf)
  results.push({ w, pct, n, designH: pa.height, siteH: pb.height })
  console.log(
    `${label} @${w}  diff ${pct.toFixed(2)}%  (${n} px)  design ${pa.height}px / site ${pb.height}px`,
  )
}
close()
fs.writeFileSync(path.join(OUT, `${label}.json`), JSON.stringify(results, null, 2))
