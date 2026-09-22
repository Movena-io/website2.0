# Website Monitor Report

**Run Timestamp:** 2026-09-22T00:00:00Z  
**Overall Status:** ⚠️ **WARNING**

---

## Summary

The Movena marketing website build and type checking passed successfully, but lint warnings and known security vulnerabilities require attention. The security vulnerabilities are documented as expected pending a major Next.js upgrade.

---

## Build Check: ✅ **HEALTHY**

**Status:** Compiled successfully

The Next.js application compiled without errors. All 38 static pages were generated successfully, including:
- Home pages for English and Danish locales
- Blog pages (21 articles total)
- Contact page
- Savings calculator
- Data portability page
- API routes and middleware

**Build Output:** Production-optimized build with 80.6 kB shared First Load JS.

---

## Lint Check: ⚠️ **WARNING**

**Status:** 2 warnings found

**Location:** `./components/SplitSection.tsx`

| Line | Issue | Rule |
|------|-------|------|
| 93 | Using `<img>` instead of `<Image />` | @next/next/no-img-element |
| 96 | Using `<img>` instead of `<Image />` | @next/next/no-img-element |

**Impact:** Non-critical. These warnings relate to image optimization and LCP performance. The component should be updated to use Next.js's `Image` component for better performance.

---

## Security Check: ❌ **CRITICAL**

**Status:** 5 vulnerabilities detected (4 high, 1 critical)

### Vulnerability Summary

#### Critical Severity (1)
- **Next.js (versions 0.9.9 - 16.3.0-preview.10)**
  - Multiple server-side vulnerabilities including SSRF, DoS, cache poisoning, XSS, and RCE
  - Requires upgrade to Next.js v16.3.6 or later
  - Note: This is a breaking change requiring major version upgrade

#### High Severity (4)
- **minimatch** (via @typescript-eslint/typescript-estree)
  - ReDoS (Regular Expression Denial of Service) vulnerabilities
  - 3 distinct CVEs with repeated wildcards and nested glob patterns
  
- **PostCSS** (nested in Next.js)
  - XSS via unescaped `</style>` in CSS output
  - Arbitrary file read via sourceMappingURL in CSS comments
  - Path traversal in source map auto-loading

### Known Issue (Per CLAUDE.md)

The Next.js and PostCSS vulnerabilities are **knowingly left on current versions**. Per project documentation, fixing them requires upgrading from Next 13 to Next 16, which is a product decision and not a monitor action. This upgrade has been deferred pending architectural review.

**Note:** `npm audit fix --force` should NOT be run unless the major version upgrade is approved.

---

## Recommendations

1. **High Priority:** Update `SplitSection.tsx` to use `next/image` Image component (lines 93, 96)
2. **Major Decision:** Plan Next.js upgrade from v13 to v16+ to resolve known security vulnerabilities
3. **Defer:** Don't run `npm audit fix` or `npm audit fix --force` until Next.js upgrade strategy is determined

---

## Check Details

| Check | Result | Count |
|-------|--------|-------|
| Build | ✅ Pass | 38 routes compiled |
| Lint | ⚠️ Warning | 2 issues |
| Audit | ❌ Critical | 5 vulnerabilities |

**Runtime:** npm dependencies installed successfully (422 packages)  
**Node Warnings:** 5 deprecation warnings noted (rimraf, inflight, glob, @humanwhocodes packages)
