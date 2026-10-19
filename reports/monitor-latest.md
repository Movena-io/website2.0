# Website Monitor Report

**Timestamp**: 2026-10-19T16:45:00Z  
**Overall Status**: ❌ **Failed** — Build passing, lint errors increased to 69, security vulnerabilities unchanged (20 total, 1 critical)

---

## Results Summary

| Check    | Status | Details |
|----------|--------|---------|
| Build    | ✅ Pass | `npm run build` successful, all 61 pages generated |
| Lint     | ❌ Fail | 69 `react/no-unescaped-entities` errors; 2 `no-img-element` warnings (↑ from 57) |
| Security | ❌ Critical | 20 vulnerabilities (1 critical RCE, 12 high, 7 moderate) — unchanged count |

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

## Lint Check ❌ — ERROR COUNT INCREASED

`npm run lint` exited with **69 errors** and **2 warnings**.

**Status**: Error count **INCREASED from 57 to 69** (12 new errors detected). Generation pipeline continues to produce unescaped apostrophes, potentially accelerating.

**Error Summary:** All 69 errors are `react/no-unescaped-entities` — unescaped single quotes (`'`) in generated components that must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Generated Components (14 files, 69 total errors):**
- BeregnerEn.tsx (2 errors) — newly detected
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (7 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemEn.tsx (5 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (22 errors) — ↑ from 29 previous reports
- HavStyrPaaDagenEn.tsx (8 errors)
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

1. **Address lint errors IMMEDIATELY** — **69 errors prevent clean CI/CD, count increasing**. These are all in `components/generated/` — the source content generation pipeline must escape HTML entities before component emission. The 12-error increase in 7 days suggests regeneration is occurring. Check:
   - Content source (frontmatter, markdown parser, or content script)
   - Whether auto-regeneration is triggered on each run
   - Git history of `components/generated/` files for recent changes

### High Priority

2. **Security review** — Next.js RCE on Windows (CVSS 9.0+) and SSRF/DoS issues warrant product team discussion on upgrade timing.

### Medium Priority

3. **Transitive dependency hardening** — Consider `overrides` in package.json for brace-expansion, minimatch, source-map-js (per CLAUDE.md patterns).
4. **Build warnings** — Replace `<img>` with `<Image />` in SplitSection.tsx (LCP optimization, non-blocking).

---

## Trend Analysis

- **Build**: Consistently passing ✅
- **Lint**: **WORSENING** — 57 errors (2026-10-12) → 69 errors (2026-10-19); +12 errors in 7 days. Generation pipeline accelerating unescaped apostrophe output.
- **Security**: 20 vulnerabilities stable; Next.js critical RCE unpatched pending major version decision

---

## Action Items

- [ ] **URGENT**: Fix lint errors in generated components (69 remaining, increasing) — investigate generation pipeline
- [ ] Determine why lint errors increased from 57 to 69 in past 7 days
- [ ] Check if content regeneration is being triggered automatically
- [ ] Complete Next.js upgrade discussion with product team if needed (1 critical RCE)
- [ ] Monitor next run closely for continued error count changes

---

**Generated with Claude Code monitoring agent**
