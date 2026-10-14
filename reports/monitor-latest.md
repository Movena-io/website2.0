# Website Monitor Report

**Run Timestamp:** 2026-10-14 04:52 UTC  
**Overall Status:** ⚠️ **WARNING** - Build passes, lint failures persist, known security vulnerabilities

---

## Summary

The Movena website build completes successfully, but ESLint validation continues to fail on auto-generated components. Security audit reports 20 vulnerabilities (1 critical, 12 high, 7 moderate)—these are acknowledged in CLAUDE.md as requiring a major Next.js version upgrade that is a product decision.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | Next.js successfully compiled all 61 static pages |
| **Lint** | ❌ FAIL | ~51 ESLint errors in generated components |
| **Security** | ⚠️ WARNING | 20 vulnerabilities (no change from previous run) |

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

❌ **FAILED** - Multiple ESLint violations

**Primary Issue:** Unescaped entities in generated React components  
**Rule:** `react/no-unescaped-entities`  
**Fix Required:** Escape apostrophes as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Affected Files (14 total, all in `components/generated/`):**
- BeregnerEn.tsx - 2 errors
- BlogIndexDa.tsx - 1 error
- BlogIndexEn.tsx - 1 error
- BlogPostEn.tsx - 7 errors
- BookDemoEn.tsx - 3 errors
- ErrorEn.tsx - 2 errors
- FaaAllePengeneHjemEn.tsx - 5 errors
- ForsideDa.tsx - 1 error
- ForsideEn.tsx - ~26 errors
- HavStyrPaaDagenEn.tsx - 8 errors
- NotFoundEn.tsx - 1 error
- OmOsEn.tsx - 2 errors
- PrivatlivspolitikEn.tsx - 3 errors
- VindFlereFlytningerEn.tsx - 8 errors

**Additional Warnings:**
- 2 warnings in `SplitSection.tsx` about using `<img>` instead of `<Image />` from next/image

**Note:** All errors are in auto-generated components. The component generation process needs to escape HTML entities in output.

---

## Security Audit

⚠️ **WARNING** - 20 Vulnerabilities (unchanged from previous run)

### Critical (1)
- **Next.js** (0.9.9 - 16.3.0-preview.10): 34+ CVEs including SSRF, RCE, cache poisoning, XSS, DoS
  - **Status:** Acknowledged in CLAUDE.md; Next.js 13→16 upgrade is a product decision

### High (12)
- brace-expansion, braces, minimatch: DoS/ReDoS vulnerabilities
- postcss (nested in Next): XSS, arbitrary file read, path traversal
- postcss-selector-parser: Quadratic complexity parsing
- source-map-js: Event-loop DoS

### Moderate (7)
- sprintf-js: DoS via unbounded precision
- Various transitive dependencies

**Remediation:** Per CLAUDE.md, `npm audit fix --force` requires Next.js 16 upgrade. Current versions are intentionally pinned; use scoped overrides for transitive dependencies as needed.

---

## Recommendations

1. **High Priority:** Fix component generation to properly escape HTML entities. This is blocking lint validation.
2. **Medium Priority:** Update `SplitSection.tsx` to use `<Image />` component instead of `<img>` tags.
3. **Product Decision:** Schedule Next.js 13→16 major version upgrade to address security vulnerabilities.

---

**Environment:** Linux remote execution, 418 packages installed, npm audit found 20 vulnerabilities  
**Last Updated:** 2026-10-14 04:52 UTC
