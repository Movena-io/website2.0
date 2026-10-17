# Website Monitor Report

**Run Time:** 2026-10-17 02:35 UTC  
**Status:** ❌ **FAILED** — Lint errors in generated components + Critical security vulnerabilities

---

## Summary

The website monitor run identified critical issues requiring immediate attention:

- **Build:** ✅ **PASS** — Next.js compiles successfully
- **Lint:** ❌ **FAIL** — 88+ unescaped entity errors in generated components
- **Security:** ❌ **CRITICAL** — 20 vulnerabilities (1 critical, 12 high, 7 moderate)

---

## Build Status: ✅ PASSING

The Next.js application compiled successfully without build errors.

**Details:**
- 61 static pages generated across 2 locales (en/da)
- Largest page: 42.7 kB (homepage)
- First Load JS: 80.6 kB (shared chunks)
- Build time: ~30 seconds

**Action:** None required for build.

---

## Lint Status: ❌ FAILING

**Error Count:** 88+ errors across generated components, 2 warnings

### Primary Issue: Unescaped HTML Entities

Rule: `react/no-unescaped-entities`  
Issue: Apostrophes in text need to be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Affected Generated Component Files:**
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (21 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

### Secondary Issue: Unoptimized Images

**File:** `components/SplitSection.tsx` (lines 93, 96)
- 2 warnings: Using `<img>` instead of optimized `next/image` component

**Recommendation:**
- Since `components/generated/` are auto-generated, disable the ESLint rule for that directory
- Fix `SplitSection.tsx` by importing `Image` from `next/image`

---

## Security Status: ❌ CRITICAL

**Total Vulnerabilities:** 20 (1 critical, 12 high, 7 moderate)

### CRITICAL Issue

**Package:** Next.js v13.5.7  
**Severity:** CRITICAL (35+ associated CVEs)

Next.js contains multiple severe vulnerabilities:

1. **GHSA-fr5h-rqp8-mj6g** — Server-Side Request Forgery (SSRF) in Server Actions
2. **GHSA-p293-qw3h-jr36** — Unauthenticated Remote Code Execution on Windows servers
3. **GHSA-2xp9-vwfh-vxw4** — RCE in Image Optimization API (AVIF files)
4. **GHSA-955p-x3mx-jcvp** — Unauthenticated disclosure of Server Function endpoints
5. **GHSA-3x4c-7xq6-9pq8** — Unbounded image cache growth → storage exhaustion
6. **GHSA-ffhc-5mcf-pf4q** — XSS in App Router with CSP nonces
7. **GHSA-g77x-44xx-532m** — DoS in image optimization
8. And 26 more CVEs...

**Impact Assessment:** Marketing site with contact forms and demo booking features. SSRF and RCE vulnerabilities could be exploitable depending on Server Actions usage and deployment environment.

### HIGH Severity (12 vulnerabilities)

1. **brace-expansion** — CPU DoS via quadratic-time expansion (3 CVEs)
2. **braces** — Stack exhaustion via nested patterns (1 CVE)
3. **minimatch** — ReDoS via repeated wildcards (3 CVEs)
4. **postcss@8.5.22** — XSS via unescaped `</style>` + arbitrary file read (4 CVEs)
5. **source-map-js** — Event-loop DoS (1 CVE)

### MODERATE Severity (7 vulnerabilities)

1. **postcss-selector-parser** — CPU exhaustion via quadratic complexity
2. **sprintf-js** — DoS via unbounded precision specifiers

### Root Cause

Next.js 13.5.7 is 3 major versions behind latest stable (16.4.2). Per `CLAUDE.md`:
- "Next and its nested postcss are knowingly left on their current versions"
- "Fixing them requires Next 13 to 16, a major upgrade that is a product decision"
- "Do not run `npm audit fix --force`"

---

## Recommendations

### Immediate Actions Required

1. **Lint Errors (Short-term fix):**
   - Add override rule in `.eslintrc.json` to disable `react/no-unescaped-entities` for `components/generated/`
   - Or regenerate those components with proper HTML entity escaping

2. **Security Assessment (High Priority):**
   - Review if Server Actions are used in production
   - Check Image Optimization API usage and `remotePatterns` configuration
   - Assess Windows/Linux deployment environment risk for RCE CVE
   - Consider Content Security Policy headers as defense-in-depth

### Medium-Term Actions

3. **Schedule Next.js Upgrade (Product Decision):**
   - Next.js 13 → 16 migration is a breaking change requiring testing
   - All CRITICAL CVEs would be resolved by upgrading to 16.4.2
   - Timeline: Q4 2026 planning recommended

4. **Dependency Management:**
   - Per CLAUDE.md: Use targeted `overrides` entries for transitive vulnerabilities
   - Example: Can pin brace-expansion, minimatch, source-map-js without breaking Next.js

---

## Vulnerabilities Requiring Fixes

| Package | Severity | Current | Recommended | Action |
|---------|----------|---------|-------------|--------|
| next | CRITICAL | 13.5.7 | 16.4.2 | Requires major upgrade |
| postcss | HIGH | 8.5.22 | 8.5.23+ | Blocked by next upgrade |
| brace-expansion | HIGH | (transitive) | 1.1.12 | Can be patched via overrides |
| minimatch | HIGH | (transitive) | 9.0.7+ | Can be patched via overrides |
| source-map-js | HIGH | (transitive) | 1.2.2+ | Can be patched via overrides |

---

## Next Steps

1. **This week:** Fix lint errors (disable rule or regenerate components)
2. **This month:** Run `npm audit` again to verify no new vulnerabilities
3. **Q4 planning:** Schedule Next.js 13→16 migration with product team
4. **Until upgrade:** Document security posture and any compensating controls

---

**Report generated by automated website monitor**
