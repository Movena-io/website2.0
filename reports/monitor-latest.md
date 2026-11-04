# Movena Website Monitor Report

**Run Timestamp**: 2026-11-04T20:15:23Z  
**Status**: ❌ **CRITICAL**

---

## Summary

The website build completed successfully, but critical security vulnerabilities and linting errors require immediate attention. The codebase has 78 lint errors in auto-generated components and 25 dependency vulnerabilities including 1 critical (Next.js) and 6 high-severity issues.

---

## Build Status

**Result**: ✅ **PASS**

The Next.js build completed successfully with no build errors. All 65 routes were generated:
- 42 static routes (SSG)
- 3 API routes (lambda)
- 10+ blog post variations across locales

Build output shows proper resource optimization with appropriate chunk splitting and middleware generation.

---

## Lint Status

**Result**: ❌ **FAIL** (78 Errors, 2 Warnings)

### Warnings (2)
- `components/SplitSection.tsx`: Using `<img>` instead of Next.js `<Image />` component
  - Lines 93, 96
  - Impact: May result in slower LCP and higher bandwidth usage

### Errors (78)
**Pattern**: Unescaped HTML entities in generated components

Multiple generated components contain unescaped apostrophes that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`:
- `BeregnerEn.tsx`: 2 errors
- `BlogIndexDa.tsx`: 1 error
- `BlogIndexEn.tsx`: 1 error
- `BlogPostEn.tsx`: 7 errors
- `BookDemoEn.tsx`: 3 errors
- `ErrorEn.tsx`: 2 errors
- `FaaAllePengeneHjemEn.tsx`: 5 errors
- `ForsideDa.tsx`: 1 error
- `ForsideEn.tsx`: 21 errors
- `HavStyrPaaDagenEn.tsx`: 8 errors
- `NotFoundEn.tsx`: 1 error
- `OmOsEn.tsx`: 2 errors
- `PrivatlivspolitikEn.tsx`: 3 errors
- `VindFlereFlytningerEn.tsx`: 8 errors

**Root Cause**: Generated files (under `components/generated/`) from an automated generation tool not escaping entities properly.

**Impact**: Lint check prevents deployment in strict CI/CD pipelines; build still completes but lint must be fixed for production deployment.

---

## Security Status

**Result**: ❌ **CRITICAL** (25 Vulnerabilities)

### Breakdown
- **Critical**: 1 (Next.js)
- **High**: 6
- **Moderate**: 15
- **Low**: 3

### Critical Finding: Next.js

**Package**: `next` (version 13.x, needs 16.x)  
**Vulnerabilities**: 34 CVEs including:
- Server-Side Request Forgery (SSRF) in Server Actions
- Remote Code Execution vulnerabilities (RCE)
- Unauthenticated RCE on Windows-hosted servers
- Unauthenticated RCE in Image Optimization API (AVIF/SVG)
- Cache poisoning attacks
- Image optimization DoS
- Authorization bypass
- HTTP request smuggling
- Cross-site scripting (XSS) via CSP nonces
- Denial of Service with Server Components (multiple variants)

**Fix Available**: Yes, requires major version upgrade (13 → 16)
  - Blocked per CLAUDE.md: "intentionally left on current versions" (product decision)
  - Cannot run `npm audit fix --force` per project guidelines

### High Severity Dependencies

1. **brace-expansion**: CPU denial of service (3 vulnerabilities)
   - Transitive: via `@typescript-eslint/typescript-estree`
   - Fix: Available via `npm audit fix`

2. **minimatch**: ReDoS vulnerabilities (4 variants)
   - Transitive: via ESLint toolchain
   - Fix: Requires ESLint major version upgrade (breaking)

3. **postcss**: XSS and path traversal (4 vulnerabilities)
   - Nested in `next`
   - Fix: Tied to Next.js upgrade

4. **source-map-js**: Event-loop DoS
   - Transitive: via build tools
   - Fix: Available via `npm audit fix`

### Moderate Severity

- **deepmerge**: Prototype poisoning in `mergeObject()`
  - Transitive: `@react-email/render` → `html-to-text` → `deepmerge`
  - Fix: Requires major version bump to `@react-email/render` 2.2.0

- **postcss-selector-parser**: Quadratic complexity
  - Transitive: via Tailwind CSS
  - Fix: Requires `@tailwindcss/typography` 0.5.4+

---

## Recommendations

### 🔴 Immediate (Critical)

1. **Escalate Next.js Security**: 34 CVEs in Next.js are critical (especially RCE).
   - Requires product decision to upgrade 13 → 16
   - Create tracking issue for major version upgrade
   - Security review needed for deployment delay implications

2. **Fix Lint Errors**: 78 lint errors block deployment.
   - Investigate code generation tool producing these files
   - Fix entity escaping in the generator
   - OR: Add lint exceptions if generator cannot be updated

### 🟠 High Priority

3. **Apply Safe Audit Fixes**: Run `npm audit fix` (non-breaking)
   - Fixes `brace-expansion` and `source-map-js`
   - Reduces vulnerability count from 25 to ~20

4. **Address High-Severity Deps**: Plan fixes for `minimatch` and `postcss`
   - `minimatch`: Requires ESLint 4.0 upgrade
   - `postcss`: Tied to Next.js upgrade

### 🟡 Medium Priority

5. **Fix Image Components**: Replace `<img>` with Next.js `<Image />` in `SplitSection.tsx`
   - Lines 93, 96
   - Improves LCP and bandwidth optimization

### Constraints

Per CLAUDE.md:
- Next.js and nested postcss are intentionally pinned (product decision)
- `npm audit fix --force` is prohibited
- Do not upgrade Next.js without explicit product approval

---

## Checks Performed

- `npm install` - Dependencies installed, 25 vulnerabilities found
- `npm run build` - Production build successful
- `npm run lint` - 78 errors, 2 warnings
- `npm audit` - Security vulnerability assessment

**Run Date**: 2026-11-04 20:15:23 UTC
