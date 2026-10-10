# Website Monitor Report

**Run:** 2026-10-10T00:00:00Z  
**Overall status:** ❌ **CRITICAL** — Lint errors regressed (54→91), 1 critical + 12 high-severity vulnerabilities

---

## Results Summary

| Check    | Status | Details |
|----------|--------|---------|
| Build    | ✅ Pass | `npm run build` successful, all 61 pages generated |
| Lint     | ❌ Fail | 91 `react/no-unescaped-entities` errors; 2 `no-img-element` warnings (regression: +37 errors from previous run) |
| Security | ❌ Critical | 20 vulnerabilities (1 critical, 12 high, 7 moderate) — unchanged |

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

## Lint Check ❌ — REGRESSION ALERT

`npm run lint` exited with **91 errors** and **2 warnings**.

⚠️ **REGRESSION:** Error count increased from 54 (previous run) to 91 (+37 errors). This indicates generated components were recently updated with unescaped entities.

**Error Summary:** All errors are `react/no-unescaped-entities` — unescaped single quotes (`'`) in generated components that must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Generated Components (14 files, 91 total errors):**
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (9 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemDa.tsx (1 error)
- FaaAllePengeneHjemEn.tsx (3 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (31 errors)
- HavStyrPaaDagenEn.tsx (4 errors)
- NotFoundEn.tsx (1 error)
- OmOsEn.tsx (2 errors)
- PrivatlivspolitikEn.tsx (3 errors)
- VindFlereFlytningerEn.tsx (10 errors)

**Warnings (2):**
- `components/SplitSection.tsx:93,96` — Using `<img>` instead of `<Image />`

**Root Cause:** Auto-generated components contain unescaped apostrophes. The generation process must escape HTML entities in source content before component emission.

---

## Security Audit ❌

`npm audit` detected **20 vulnerabilities: 1 critical, 12 high, 7 moderate**.

**Critical (1):**
- **Next.js 0.9.9–16.3.0-preview.10** — 35+ CVEs including:
  - Unauthenticated Remote Code Execution on Windows (CVSS 9.0+)
  - Server-Side Request Forgery in Server Actions & rewrites
  - Denial of Service (Image Optimizer, Server Components, App Router)
  - Cache poisoning (collision-based, response body confusion)
  - XSS (CSP nonces, beforeInteractive scripts)
  - Authorization bypass & Middleware/Proxy bypass
  - Unbounded disk cache growth & server-side request forgery via WebSocket
  - HTTP request deserialization & smuggling vulnerabilities

**High (12):**
- brace-expansion — 3 DoS CVEs (quadratic expansion, nested recursion)
- braces — Stack-exhaustion DoS
- minimatch — 3 ReDoS via wildcard/GLOBSTAR combinations
- postcss — 4 CVEs (XSS in CSS stringify, arbitrary file read via sourceMappingURL, path traversal)
- postcss-selector-parser — Quadratic complexity parsing (CPU DoS)
- source-map-js — Event-loop DoS

**Moderate (7):**
- sprintf-js — DoS via unbounded precision
- postcss-selector-parser transitive chains
- Other nested dependencies

**Policy Note:** Per CLAUDE.md, Next.js and nested postcss are intentionally at current versions. Upgrading requires Next.js 13→16 major bump (product decision). However, Windows RCE (CVSS 9.0) merits urgent product review.

---

## Recommendations

### URGENT (Blocking)

1. **Fix lint regression** — Regenerate or manually escape apostrophes in 14 generated components. Lint failure blocks CI/CD deployment. Error count increased 54→91, indicating recent content changes introduced unescaped entities.

### High Priority

2. **Security review** — Next.js RCE on Windows and SSRF/DoS issues warrant product team discussion on upgrade timing.

### Medium Priority

3. **Transitive dependency pinning** — Consider `overrides` in package.json for brace-expansion, minimatch, source-map-js (per CLAUDE.md patterns).
4. **Build warnings** — Replace `<img>` with `<Image />` in SplitSection.tsx (LCP optimization, non-blocking).

---

## Trend Analysis

- **Build**: Consistently passing ✅
- **Lint**: REGRESSION — Was 54 errors, now 91 errors (+37). Trend shows generated components worsening.
- **Security**: 20 vulnerabilities stable; Next.js critical RCE unpatched pending major version decision

---

## Action Items

- [ ] Investigate source of lint regression (what generated content changed?)
- [ ] Regenerate affected components with proper HTML entity escaping
- [ ] Schedule Next.js upgrade discussion with product team (13→16 requires evaluation)
