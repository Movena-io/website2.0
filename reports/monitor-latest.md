# Movena Website Monitor Report

**Run Timestamp:** 2026-11-03 at 23:45 UTC  
**Overall Status:** ⚠️ **ATTENTION REQUIRED** (Build OK, Lint Issues, Security Vulnerabilities)

---

## Summary

The Movena website build completes successfully, but linting errors and critical security vulnerabilities require attention. The codebase has 66 linting errors in auto-generated components and 25 known dependency vulnerabilities including one critical Next.js issue.

---

## 1. Build Status: ✅ PASSED

**Result**: Build completed successfully with no compilation errors.

- Routes: 65 static pages generated successfully
- Compilation time: Normal
- Type checking: Passed
- Static generation: All 65 routes generated without errors

**Note**: The `next build` command executed cleanly and produced the expected optimized production build.

---

## 2. Lint Status: ⚠️ WARNINGS & ERRORS

**Result**: 66 linting errors and 2 warnings detected.

### Error Summary:
- **Total Errors**: 66
- **Total Warnings**: 2

### Error Details:

#### Unescaped Entities (66 errors in generated components):
These errors appear in auto-generated React components and involve unescaped HTML entities (single quotes that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`).

**Affected Files**:
- `./components/generated/BeregnerEn.tsx` (2 errors)
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (17 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Issue**: These are in auto-generated components (code generation artifact). The generation tool should escape entities properly in future generation runs.

#### Image Optimization Warnings (2 warnings in `SplitSection.tsx`):
- Using `<img>` tag instead of Next.js `<Image />` component
- **Impact**: Potential LCP performance impact and higher bandwidth usage
- **File**: `./components/SplitSection.tsx` (lines 93, 96)
- **Recommendation**: Consider migrating to `next/image` Image component

---

## 3. Security Audit Status: ❌ CRITICAL VULNERABILITIES

**Result**: 25 vulnerabilities detected (3 low, 15 moderate, 6 high, 1 critical).

### Vulnerability Breakdown:

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 1 | ⛔ Requires action |
| High | 6 | ⚠️ Important |
| Moderate | 15 | ⚠️ Review needed |
| Low | 3 | ✓ Monitor |

### Critical Vulnerabilities:

**Next.js (0.9.9 - 16.3.0-preview.10)**
- **Severity**: CRITICAL
- **Issue Count**: 34 vulnerabilities listed
- **Key Issues**:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Denial of Service conditions in image optimization
  - Authorization bypass vulnerabilities
  - Cache poisoning vulnerabilities
  - Cross-site scripting (XSS) vulnerabilities
  - Unauthenticated Remote Code Execution on Windows-hosted servers
  - Unauthenticated RCE in Image Optimization API with AVIF/SVG files

**Why Present**: The project is using Next.js 13 which is several major versions behind the latest. According to CLAUDE.md, Next.js is "knowingly left on current versions" because fixing requires upgrading to Next.js 13+ to 16, which is a major product decision.

### High-Severity Vulnerabilities:

1. **brace-expansion** - DoS via uncontrolled recursion and quadratic-time expansion
2. **minimatch** - ReDoS (Regular Expression Denial of Service) vulnerabilities
3. **postcss** ≤8.5.22 - XSS and arbitrary file read vulnerabilities
4. **source-map-js** - Event-loop denial of service via source-map parsing

### Moderate Vulnerabilities:
- **deepmerge** - Prototype poisoning
- **postcss-selector-parser** - Quadratic complexity in selector parsing

### Fix Recommendations:

**Available Fixes**:
- `npm audit fix` can address some moderate issues
- `npm audit fix --force` can address all vulnerabilities but requires breaking changes to multiple packages

**Breaking Changes with Force Fix**:
- Next.js would upgrade to 16.4.5 (major version jump)
- ESLint would upgrade to 4.0.0 (major version jump)
- Tailwind Typography would update (breaking)
- React Email Render would update to 2.2.0 (breaking)

**Recommendation**: Per CLAUDE.md guidance, Next.js upgrade is a product-level decision and should not be forced through audit fixes. Consider:
1. Evaluate business impact of Next.js 13 → 16 upgrade
2. For transitive dependencies, use `overrides` in `package.json` (as documented in CLAUDE.md)
3. Monitor for patches that don't require major version jumps

---

## Recommendations

### Immediate Actions:
1. ✅ **Build**: No action needed - build is healthy
2. ⚠️ **Lint**: Review auto-generated components - fix entity escaping in the code generation tool
3. ⚠️ **Security**: Document Next.js vulnerability awareness and plan upgrade timeline

### Medium-term Actions:
1. Fix the 2 image warnings in `SplitSection.tsx` to optimize LCP
2. Evaluate Next.js 13 → 16 migration path and timeline
3. Update `npm` and audit transitive dependencies using `overrides` pattern

### Important Note:
Per project documentation (CLAUDE.md), Next.js and its nested postcss are intentionally pinned to current versions. Major upgrades require product-level decisions, not automated audit fixes.

---

## Files Run

- `npm run build` - Next.js production build
- `npm run lint` - ESLint linting via Next.js
- `npm audit` - Dependency security audit

**Last Run**: 2026-11-03 23:45 UTC
