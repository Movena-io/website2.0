# Website Monitor Report

**Run Timestamp:** 2026-09-29T15:06:35Z (Automated Scheduled Check)  
**Overall Status:** ⚠️ **WARNINGS** - Build succeeds; lint errors detected (generated components); known security vulnerabilities in Next.js (product decision)

---

## Executive Summary

The Movena marketing website built successfully with all 61 static pages compiled without errors. The Next.js 13 application compiled successfully and generates routes for both English and Danish locales. **Linting identified 41 errors in auto-generated components** (unescaped HTML entities) and 2 warnings about image optimization. Security audit detected 5 known vulnerabilities (1 critical, 4 high) in Next.js, PostCSS, and minimatch. **Per CLAUDE.md, Next.js and PostCSS versions are acknowledged as product decisions requiring evaluation.** The lint errors in generated components require investigation of the content generation process.

---

## Build Check: ✅ **PASSED**

**Status:** Compiled successfully, 61 static routes generated

The Next.js 13 application compiled without errors. All static pages were generated successfully.

**Pages Generated:**
- Home pages: `/en`, `/da` (primary routes)
- Blog index: `/en/blog`, `/da/blog`
- Blog articles: 21 posts across both locales
- Feature pages: 12+ landing pages (about, contact, calculator, get-paid, run-the-day, etc.)
- Contact and demo pages: `/en/contact`, `/en/book-demo`, `/da/book-demo`
- API routes: `/api/calculator/submit`, `/api/contact`, `/api/demo`
- Static files: `/robots.txt`, `/sitemap.xml`

**Build Metrics:**
- Routes compiled: 61 (primary + locales + API routes + feature pages)
- First Load JS (shared): 80.6 kB
- Middleware: 27.8 kB
- Largest page: `/savings-calculator` (169 kB First Load)

**TypeScript Compilation:** ✅ No errors  
**Locale Configuration:** ✅ Both `en` and `da` locales properly configured  
**Static Page Generation:** ✅ All 61 routes generated

---

## Lint Check: ❌ **ERRORS DETECTED**

**Status:** 41 errors, 2 warnings

### Errors: 41 (Non-blocking but requiring fixes)

**Root Cause:** Auto-generated components contain unescaped HTML entities (single quotes `'`)

**Issue:** ESLint rule `react/no-unescaped-entities` requires HTML entities be escaped in JSX.

**Affected Files (13 generated components):**
1. `BlogIndexDa.tsx` - 1 error
2. `BlogIndexEn.tsx` - 1 error
3. `BlogPostEn.tsx` - 8 errors
4. `BookDemoEn.tsx` - 3 errors
5. `ErrorEn.tsx` - 2 errors
6. `FaaAllePengeneHjemDa.tsx` - 1 error
7. `FaaAllePengeneHjemEn.tsx` - 3 errors
8. `ForsideDa.tsx` - 1 error
9. `ForsideEn.tsx` - 18 errors (largest issue)
10. `HavStyrPaaDagenEn.tsx` - 4 errors
11. `NotFoundEn.tsx` - 1 error
12. `OmOsEn.tsx` - 2 errors
13. `PrivatlivspolitikEn.tsx` - 3 errors
14. `VindFlereFlytningerEn.tsx` - 9 errors

**Error Pattern:** Unescaped single quotes in content that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Impact:** Lint job fails; blocks CI/CD pipelines; affects code quality checks

### Warnings: 2 (Non-critical)

**Location:** `./components/SplitSection.tsx`

| Line | Issue | Severity |
|------|-------|----------|
| 93 | Using `<img>` instead of `<Image />` from `next/image` | Warning |
| 96 | Using `<img>` instead of `<Image />` from `next/image` | Warning |

**Recommendation:** Convert plain HTML `<img>` to Next.js `Image` component for automatic optimization.

---

## Security Check: ❌ **CRITICAL VULNERABILITIES**

**Status:** 5 vulnerabilities detected (1 critical, 4 high) — Same as previous run; no new vulnerabilities

### Critical Severity (1)

**Next.js** (installed: v13.5.6, affected: v0.9.9 - v16.3.0-preview.10)

- **28 documented CVEs** including SSRF, DoS, XSS, cache poisoning, and others
- **Impact:** Affects production deployments
- **Location:** `node_modules/next`

**Known Issues:**
- Server-Side Request Forgery (SSRF) in Server Actions
- Multiple Denial of Service (DoS) conditions in Image Optimization and Server Components
- Cross-Site Scripting (XSS) vulnerabilities (CSP nonces, beforeInteractive scripts)
- Cache poisoning and cache confusion attacks
- Information disclosure in dev server
- Middleware/Proxy bypass vulnerabilities
- Authorization bypass in certain configurations
- Unbounded disk cache growth (image optimization)
- HTTP request smuggling in rewrites
- And 19+ additional security advisories

**Fix Available:** `npm audit fix --force` (upgrades to v16.3.7) — **Breaking change requiring major version upgrade**

### High Severity (4)

**minimatch** (9.0.0 - 9.0.6) via `@typescript-eslint/typescript-estree`

- **3 ReDoS (Regular Expression Denial of Service) vulnerabilities:**
  - ReDoS via repeated wildcards with non-matching literal in pattern
  - ReDoS via combinatorial backtracking with multiple non-adjacent GLOBSTAR segments
  - ReDoS via nested `*()` extglobs
- **Impact:** Lower risk in this build context (dev dependency chain for linting)
- **Fix Available:** `npm audit fix` (independent of Next.js)
- **Location:** `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`

**PostCSS** (≤8.5.22) bundled with Next.js

- **4 Vulnerabilities:**
  - XSS via unescaped `</style>` in CSS output
  - Arbitrary file read via attacker-controlled sourceMappingURL
  - Incomplete fix of GHSA-6g55-p6wh-862q (source map disclosure)
  - Path traversal in source map auto-loading
- **Impact:** Bundled with Next.js v13; fixed in v16+
- **Location:** `node_modules/next/node_modules/postcss`

### Policy Notes

Per CLAUDE.md: **"next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."**

---

## Status Summary

| Component | Status | Details |
|-----------|--------|---------|
| **Compilation** | ✅ Pass | All 61 routes generated successfully |
| **TypeScript** | ✅ Pass | No type errors detected |
| **Linting** | ❌ 41 Errors | Generated components have unescaped entities; 2 img warnings |
| **Security** | ❌ Critical | 5 vulnerabilities (1 critical, 4 high) - acknowledged in policy |

---

## Recommendations

### Priority 1: Fix Lint Errors (Blocks CI/CD)

The 41 lint errors in generated components must be fixed:

**Actions:**
1. Identify the content generation script that creates these components
2. Update the generator to escape HTML entities (single quotes, etc.)
3. Test that generated components pass linting
4. Consider adding the generation script to the build/CI pipeline if not already included

**Example fix:** Replace bare `'` with appropriate HTML entities:
- `&apos;` for apostrophes in attributes
- `&rsquo;` or `&lsquo;` for curly quotes in content
- `&#39;` as fallback

### Priority 2: Address Image Component Warnings (Low)

- Convert 2 `<img>` tags in `SplitSection.tsx` to Next.js `Image` component
- Low priority; these are optimization suggestions

### Priority 3: Security Vulnerabilities (Product Decision)

Per policy, these require product team evaluation:
- **Evaluate Next.js v13 → v16+ upgrade timeline** — Would resolve all 5 vulnerabilities
- Requires architectural review due to breaking changes
- Plan for extensive regression testing
- Consider staging a test environment with v16 for compatibility assessment

---

## Monitor Run Details

- **Run Date:** 2026-09-29
- **Run Time:** 15:06:35 UTC (automated scheduler)
- **Build Command:** `npm run build`
- **Lint Command:** `npm run lint` (exit code 1)
- **Audit Command:** `npm audit` (5 vulnerabilities)
- **Dependencies:** 423 packages installed
- **Environment:** Linux (remote execution)

*Report generated by website-monitor agent. History: `git log reports/monitor-latest.md`*
