# Website Monitor Report

**Timestamp**: 2026-10-13T16:32:00Z  
**Overall Status**: ⚠️ **Warning** — Build passing, lint errors improved to 60 total (↓3 from 63), security vulnerabilities unchanged (20 total)

---

## Results Summary

| Check    | Status | Details |
|----------|--------|---------|
| Build    | ✅ Pass | `npm run build` successful, all 61 pages generated |
| Lint     | ❌ Fail | 60 `react/no-unescaped-entities` errors; 2 `no-img-element` warnings (↓3 errors) |
| Security | ⚠️ Alert | 20 vulnerabilities (1 critical, 12 high, 7 moderate) — unchanged from previous run |

---

## Build Check ✅

`npm run build` completed successfully. All pages prerendered without compilation errors.

**Build Summary:**
- Static pages: 61 prerendered
- Server-side routes: 3 API endpoints
- First Load JS: 80.6 kB shared
- Largest page: 58.9 kB (savings-calculator)
- No build-time errors detected

---

## Lint Check ❌ — PERSISTENT ERRORS

`npm run lint` exited with **60 errors** and **2 warnings**.

**Status**: ✓ Progress — Lint errors improved from 63 to 60 (↓3). Generation pipeline continues to produce unescaped apostrophes but issue is trending better.

**Error Summary:** All 60 errors are `react/no-unescaped-entities` — unescaped single quotes (`'`) in generated components that must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Generated Components (14 files, 60 total errors):**
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (9 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemDa.tsx (1 error)
- FaaAllePengeneHjemEn.tsx (3 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (24 errors)
- HavStyrPaaDagenEn.tsx (4 errors)
- NotFoundEn.tsx (1 error)
- OmOsEn.tsx (2 errors)
- PrivatlivspolitikEn.tsx (3 errors)
- VindFlereFlytningerEn.tsx (8 errors)

**Warnings (2):**
- `components/SplitSection.tsx:93,96` — Using `<img>` instead of `<Image />` (performance recommendation)

**Root Cause:** Auto-generated components in `components/generated/` are emitted with unescaped apostrophes. The content generation pipeline needs to escape HTML entities (or use JSX text properly) before component emission.

---

## Security Audit ⚠️

`npm audit` detected **20 vulnerabilities: 1 critical, 12 high, 7 moderate**. Unchanged from previous run.

**Critical (1):**
- **Next.js 0.9.9–16.3.0-preview.10** — 35+ CVEs including:
  - Unauthenticated Remote Code Execution on Windows (CVSS 9.0+)
  - Server-Side Request Forgery in Server Actions & rewrites
  - Denial of Service (Image Optimizer, Server Components, App Router)
  - Cache poisoning (collision-based, response body confusion)
  - XSS (CSP nonces, beforeInteractive scripts)
  - Authorization bypass & Middleware/Proxy bypass
  - Unbounded disk cache growth & WebSocket SSRF
  - HTTP request deserialization & smuggling vulnerabilities

**High (12):**
- brace-expansion — 3 DoS CVEs (quadratic expansion, nested recursion)
- braces — Stack-exhaustion DoS via nested patterns
- minimatch — 3 ReDoS via wildcard/GLOBSTAR combinations
- postcss — 4 CVEs (XSS in CSS stringify, arbitrary file read via sourceMappingURL, path traversal)
- postcss-selector-parser — Quadratic complexity parsing (CPU DoS)
- source-map-js — Event-loop DoS

**Moderate (7):**
- sprintf-js — DoS via unbounded precision
- postcss-selector-parser transitive dependencies
- Other nested dependencies

**Policy Note:** Per CLAUDE.md, Next.js is intentionally pinned to current version. Upgrading requires Next.js 13→16 major bump (product decision). However, critical RCE on Windows merits urgent review. Other high-severity issues could be addressed via `npm audit fix` for non-breaking changes or `overrides` for transitive deps.

---

## Recommendations

### URGENT (Blocking)

1. **Address lint errors** — 63 errors prevent clean CI/CD. These are all in `components/generated/` — the source content generation pipeline must escape HTML entities before component emission. Check the content source (likely frontmatter, markdown parser, or a content script).

### High Priority

2. **Security review** — Next.js RCE on Windows (CVSS 9.0+) and SSRF/DoS issues warrant product team discussion on upgrade timing.

### Medium Priority

3. **Transitive dependency hardening** — Consider `overrides` in package.json for brace-expansion, minimatch, source-map-js (per CLAUDE.md patterns).
4. **Build warnings** — Replace `<img>` with `<Image />` in SplitSection.tsx (LCP optimization, non-blocking).

---

## Trend Analysis

- **Build**: Consistently passing ✅
- **Lint**: ✓ **IMPROVING** — Down from 63 → 60 errors (↓3). Generation pipeline is producing fewer unescaped apostrophes over time.
- **Security**: 20 vulnerabilities stable; Next.js critical RCE unpatched pending major version decision

---

## Action Items

- [ ] Fix lint errors in generated components (60 remaining) — generation pipeline is improving but still needs attention
- [ ] Complete Next.js upgrade discussion with product team if needed (Windows RCE CVSS 9.0+)
- [ ] Monitor next run for continued error reduction

---

**Generated with Claude Code monitoring agent — Scheduled Run**
