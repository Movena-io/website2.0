# Website Monitor Report

**Run Timestamp:** 2026-10-14 04:23 UTC  
**Overall Status:** ❌ **FAILED** - Lint errors block deployment, critical security vulnerabilities present

---

## Summary

The Movena website build completes successfully, but ESLint validation fails on auto-generated components and security audit reports 20 vulnerabilities (1 critical, 12 high, 7 moderate). Critical Next.js RCE vulnerabilities require attention.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | Next.js successfully compiled all 61 static pages |
| **Lint** | ❌ FAIL | 54 ESLint errors in generated components |
| **Security** | 🔴 CRITICAL | 20 vulnerabilities (1 critical RCE, 12 high) |

---

## Build Check

✅ **PASSED**

The Next.js application built successfully:
- All 61 static pages generated without errors
- Middleware compiled at 27.9 kB
- Route sizes within normal ranges
- No compilation errors or blocking warnings

---

## Lint Check

❌ **FAILED** - 54 ESLint violations blocking deployment

**Primary Issue:** Unescaped apostrophes in generated React components  
**Rule:** `react/no-unescaped-entities`  
**Required Fix:** Escape apostrophes as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Error Distribution (all in `components/generated/`):**
- ForsideEn.tsx - 20 errors (largest source)
- VindFlereFlytningerEn.tsx - 8 errors
- HavStyrPaaDagenEn.tsx - 8 errors
- BlogPostEn.tsx - 7 errors
- FaaAllePengeneHjemEn.tsx - 5 errors
- BookDemoEn.tsx - 3 errors
- PrivatlivspolitikEn.tsx - 3 errors
- ErrorEn.tsx - 2 errors
- BeregnerEn.tsx - 2 errors
- OmOsEn.tsx - 2 errors
- Plus 3 more files with 1 error each

**Additional Warnings (Non-blocking):**
- 2 warnings in `SplitSection.tsx` about using `<img>` instead of `<Image />` from next/image

**Root Cause:** Auto-generated components don't escape HTML entities. The generation process or source data contains unescaped apostrophes.

---

## Security Audit

🔴 **CRITICAL** - 20 Vulnerabilities detected

### Critical Severity (1)

**Next.js Image Optimization RCE**
- **Vulnerability:** Unauthenticated Remote Code Execution in Image Optimization API with AVIF files
- **Advisory:** GHSA-2xp9-vwfh-vxw4
- **Affected Versions:** 10.0.0 - 15.5.24
- **Current Version:** 13.x (VULNERABLE)
- **Impact:** Critical - allows arbitrary code execution
- **Fix:** Requires Next.js 16.4.0+

**Next.js Windows RCE**
- **Vulnerability:** Unauthenticated Remote Code Execution on Windows servers
- **Advisory:** GHSA-p293-qw3h-jr36
- **CVSS Score:** 9.0 (Critical)
- **Affected Versions:** 13.4.0 - 15.5.24
- **Current Version:** 13.x (VULNERABLE)
- **Fix:** Requires Next.js 15.5.24+ or 16.4.0+

### High Severity (12)

**Primary High-Risk Areas:**
- **brace-expansion**: 4 vulnerabilities (DoS via uncontrolled recursion, CVSS 7.5)
- **postcss**: 4 vulnerabilities (path traversal, arbitrary file read, XSS, CVSS 7.5)
- **minimatch**: 3 vulnerabilities (ReDoS attacks)
- **next**: Additional SSRF and authentication bypass issues
- **@typescript-eslint/typescript-estree**: Dependency chain issues

### Moderate Severity (7)

- `@tailwindcss/typography` (postcss-selector-parser chain)
- `argparse` (sprintf-js via gray-matter)
- Additional Next.js moderate-severity issues

**Status per CLAUDE.md:** Next.js 13→16 upgrade is acknowledged as a product decision, not an automated fix target.

---

## Recommendations

### Blocking Issues (Must Resolve)

1. **🔴 Critical Priority:** Lint errors block validation
   - Fix component generation to escape HTML entities
   - Options:
     a. Modify generation tool to output `&apos;` instead of `'`
     b. Add ESLint disable directive to generated file headers
     c. Add `components/generated/**` to `.eslintignore`

### Escalation Required

2. **⚠️ Security Escalation:** Two critical RCE vulnerabilities in Next.js
   - **Impact:** Unauthenticated remote code execution
   - **Action:** Escalate to product team for Next.js 13→16 upgrade decision
   - **Context:** CLAUDE.md acknowledges this requires major version evaluation

### Secondary Actions

3. Update `SplitSection.tsx` to use `<Image />` component (non-blocking improvement)
4. Monitor for patches to high-severity dependencies

---

**Environment:** Linux remote execution, 418 packages, Node.js standard setup  
**Last Updated:** 2026-10-14 04:23 UTC
