# Website Monitor Report

**Run Timestamp:** 2026-10-14 00:00 UTC  
**Overall Status:** ⚠️ **WARNING** - Lint errors block CI/validation, critical security vulnerabilities present

---

## Summary

The Movena website build completes successfully, but ESLint validation fails on auto-generated components with 71 errors, and security audit reports 20 vulnerabilities (1 critical, 12 high, 7 moderate). Two Next.js critical RCE vulnerabilities require escalation.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | Next.js successfully compiled all 61 static pages |
| **Lint** | ❌ FAIL | 71 ESLint errors in generated components (unescaped entities) |
| **Security** | 🔴 CRITICAL | 20 vulnerabilities (1-2 critical RCE, 12 high) |

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

❌ **FAILED** - 71 ESLint errors + 2 warnings blocking deployment

**Primary Issue:** Unescaped apostrophes in generated React components  
**Rule:** `react/no-unescaped-entities`  
**Required Fix:** Escape apostrophes as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Error Distribution (all in `components/generated/`):**
- ForsideEn.tsx - 19 errors
- HavStyrPaaDagenEn.tsx - 8 errors  
- VindFlereFlytningerEn.tsx - 8 errors
- BlogPostEn.tsx - 7 errors
- FaaAllePengeneHjemEn.tsx - 5 errors
- BookDemoEn.tsx - 3 errors
- PrivatlivspolitikEn.tsx - 3 errors
- ErrorEn.tsx - 2 errors
- BeregnerEn.tsx - 2 errors
- OmOsEn.tsx - 2 errors
- BlogIndexDa.tsx - 1 error
- BlogIndexEn.tsx - 1 error
- NotFoundEn.tsx - 1 error
- ForsideDa.tsx - 1 error

**Warnings (2 total, non-blocking):**
- 2 in `SplitSection.tsx`: Using `<img>` instead of `<Image />` from next/image (performance recommendation)

**Root Cause:** Auto-generated components contain unescaped apostrophes in text content. The generation process needs to HTML-escape string literals.

---

## Security Audit

🔴 **CRITICAL** - 20 Vulnerabilities detected (1 critical, 12 high, 7 moderate)

### Critical Severity (1)

**Next.js: Unauthenticated Remote Code Execution on Windows Servers**
- **Advisory:** GHSA-p293-qw3h-jr36
- **Affected Versions:** 13.4.0 - 15.5.23
- **Current Version:** 13.x (VULNERABLE)
- **CVSS Score:** 9.0
- **Impact:** Arbitrary code execution via path traversal on Windows deployments
- **CWE:** CWE-22 (Improper Limitation of a Pathname to a Restricted Directory)
- **Fix:** Requires Next.js 15.5.24+ or 16.4.0+

*Note: Additional critical Next.js RCE in Image Optimization API (GHSA-2xp9-vwfh-vxw4) also affects 13.x*

### High Severity (12)

**Next.js (Multiple High-Severity Issues):**
- SSRF via rewrites with attacker-controlled hostname (GHSA-p9j2-gv94-2wf4)
- Unauthenticated disclosure of Server Function endpoints (GHSA-955p-x3mx-jcvp)
- Image optimization RCE via AVIF (GHSA-2xp9-vwfh-vxw4)
- Multiple others affecting versions 13.x

**PostCSS (4 vulnerabilities):**
- Arbitrary file read via unescaped sourceMappingURL (GHSA-6g55-p6wh-862q) — CVSS 7.5
- Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849) — CVSS 7.5
- XSS via unescaped </style> in stringify (GHSA-qx2v-qp2m-jg93)
- Incomplete fixes causing re-exposure (GHSA-fxqj-rqcc-2cmp)

**brace-expansion (3 high-severity DoS):**
- Stack exhaustion via nested braces (GHSA-qhr7-859c-m2p7) — CVSS 7.5
- DoS via parseCommaParts recursion (GHSA-6j4f-fj2g-mc7p)
- Quadratic-time pattern expansion (GHSA-q2hr-2g5m-vwhr)

**Other High-Severity:**
- @typescript-eslint/typescript-estree (dependency chain through globby, minimatch)
- minimatch (ReDoS attacks in glob patterns)

### Moderate Severity (7)

- `@tailwindcss/typography` (postcss-selector-parser transitive chain)
- `argparse` (sprintf-js RCE vulnerability via gray-matter)
- `globby`, `glob`, `minimatch`, other pattern-matching DoS issues
- Additional Next.js moderate-severity SSRF/disclosure issues

**Status per CLAUDE.md:** Next.js 13→16 upgrade is acknowledged as a *product decision*, not an automated fix target. The advisory explicitly states not to run `npm audit fix` as it would require major version changes.

---

## Recommendations

### Blocking Issues (Must Resolve)

1. **🔴 Critical Priority:** Lint validation must pass for CI/deployment
   - **Issue:** 71 ESLint errors in generated components block build validation
   - **Solution Options:**
     - Fix generation tool to escape apostrophes as `&apos;` or `&#39;` in output
     - Add ESLint disable rule to generated component file headers  
     - Exclude `components/generated/**` from linting in `.eslintignore`
   - **Status:** Blocks any deployment that enforces linting

### Escalation Required

2. **🔴 Critical Security:** Two Next.js RCE vulnerabilities require product decision
   - **Vulnerabilities:** 
     - Windows server RCE (GHSA-p293-qw3h-jr36, CVSS 9.0)
     - Image optimization RCE (GHSA-2xp9-vwfh-vxw4)
   - **Impact:** Unauthenticated remote code execution on vulnerable deployments
   - **Action:** Escalate to product team for Next.js 13→16 major upgrade evaluation
   - **Context:** Per CLAUDE.md, this is a product decision requiring architectural review, not a monitor-driven fix

### Secondary (Non-Blocking)

3. Update `SplitSection.tsx` to use `<Image />` component instead of `<img>` (performance improvement, 2 warnings)
4. Monitor for patches to high-severity PostCSS and dependency chain vulnerabilities
5. Consider pinning `next` dependencies to a known-secure version if 13→16 upgrade is deferred

---

**Metadata:**
- **Run Environment:** Linux remote execution  
- **Packages Installed:** 417 active, 418 scanned
- **Dependencies Awaiting Funding:** 154 packages
- **npm Latest:** 12.2.0 available (currently 10.x)
- **Last Updated:** 2026-10-14 (automated run)
- **Next Run:** Scheduled per monitor configuration
