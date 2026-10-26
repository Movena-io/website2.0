# Website Monitor Report

**Run Time:** 2026-10-26 09:04:21 UTC  
**Overall Status:** ❌ **CRITICAL** — Build passes, linting fails, critical security vulnerabilities present

---

## Summary

| Check | Status | Finding |
|-------|--------|---------|
| **Build** | ✅ Pass | All pages compiled successfully |
| **Lint** | ❌ Fail | 60 errors (unescaped entities in generated components) |
| **Security** | ❌ Critical | 11 vulnerabilities: 1 critical, 6 high, 4 moderate |

---

## Build Status: ✅ Pass

**Next.js compilation successful** — all 61 pages built without errors.

- **Output**: Generated routes across 2 locales (en, da)
- **Compilation time**: ~30 seconds
- **First Load JS**: 80.6 kB shared chunks
- **Largest page**: Savings calculator (24.6 kB)

---

## Linting Status: ❌ FAIL (60 errors, 2 warnings)

**Blocking issue**: Unescaped HTML entities in generated React components.

### Error Breakdown

- **Type**: `react/no-unescaped-entities` rule violations (60 errors)
- **Root cause**: Raw apostrophes in JSX should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- **Affected**: 14 auto-generated components in `components/generated/`

### Files with Errors
- `ForsideEn.tsx`: 16 errors
- `HavStyrPaaDagenEn.tsx`: 8 errors
- `VindFlereFlytningerEn.tsx`: 8 errors
- `FaaAllePengeneHjemEn.tsx`: 5 errors
- `BlogPostEn.tsx`: 7 errors
- `BookDemoEn.tsx`: 3 errors
- `PrivatlivspolitikEn.tsx`: 3 errors
- `BeregnerEn.tsx`: 2 errors
- `ErrorEn.tsx`: 2 errors
- `OmOsEn.tsx`: 2 errors
- `ForsideDa.tsx`: 1 error
- `BlogIndexDa.tsx`: 1 error
- `BlogIndexEn.tsx`: 1 error
- `NotFoundEn.tsx`: 1 error

### Minor Issues (2 warnings)
- `SplitSection.tsx` lines 93, 96: Using `<img>` instead of Next.js `<Image/>` component
  - **Impact**: Performance (slower LCP, higher bandwidth)

### Root Cause Analysis

These are **auto-generated components**. The lint errors suggest the generation pipeline doesn't properly escape HTML entities. This requires fixing the generator source or its configuration, not manual component fixes.

---

## Security Status: ❌ CRITICAL (11 vulnerabilities)

### Critical Severity (1)

**Next.js** (versions 0.9.9–16.3.0-preview.10, includes 13.x)
- **40+ critical/high severity advisories** including:
  - Remote Code Execution (RCE) on Windows-hosted servers
  - RCE in Image Optimization API with AVIF/SVG files
  - Server-Side Request Forgery (SSRF) in Server Actions and rewrites
  - Unauthenticated disclosure of internal Server Function endpoints
  - Cache poisoning via response body confusion
  - HTTP request smuggling in rewrites
  - Denial of Service (DoS) with Server Components
  - Cross-site scripting (XSS) in App Router with CSP nonces
  - Authorization bypass vulnerability
  - Middleware redirect cache poisoning
  - Unbounded Server Action payload in Edge runtime
- **Fix required**: Upgrade to Next.js 16.4.3+ (breaking change from 13.x)
- **Status**: Known constraint per CLAUDE.md — upgrade requires product decision

### High Severity (6)

1. **brace-expansion** (nested in @typescript-eslint/typescript-estree)
   - Multiple DoS vulnerabilities: quadratic-time expansion, uncontrolled recursion
   
2. **minimatch** (nested in @typescript-eslint/parser chain)
   - Multiple ReDoS vulnerabilities via regex backtracking
   
3. **postcss** (bundled in Next.js)
   - Path traversal via sourceMappingURL reads arbitrary .map files
   - XSS via unescaped `</style>` in CSS stringify output
   
4. **source-map-js**
   - Event-loop denial of service via source map offsets

5. **@typescript-eslint/typescript-estree** (depends on minimatch)

6. **@typescript-eslint/parser** (depends on @typescript-eslint/typescript-estree)

### Moderate Severity (4)

- **postcss-selector-parser**
  - Quadratic complexity in flat selector parsing (CPU exhaustion)
- **@tailwindcss/typography, postcss-nested, tailwindcss** (depend on postcss-selector-parser)

### Known Constraint (from CLAUDE.md)

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."

---

## Recommendations

### 🔴 Critical (Security-Critical)

**Next.js upgrade required** (product decision)
- Current version 13.x has 40+ CVEs affecting security, stability, and performance
- Upgrade to 16.4.3+ is a major breaking change but resolves all Next.js vulnerabilities
- Recommend scheduling with product team urgently

### 🟠 High Priority

**Fix linting errors** (60 errors in generated components)
- Root cause is in the component generation pipeline
- Fix generator to escape HTML entities automatically, or regenerate with proper escaping
- **Blockers**: Linting must pass for CI/CD to succeed

**Image optimization** (2 warnings in SplitSection.tsx)
- Replace `<img>` with `<Image/>` from `next/image`
- Low effort, improves performance

### 🟡 Monitor

**Dependency vulnerabilities** — Will resolve once Next.js is upgraded

---

## Environment Details

- **npm**: 10.9.4
- **node**: v22.22.0
- **Dependencies**: Fresh install successful

---

**Report Generated:** Website Monitor (Claude Haiku 4.5)  
**Tools Run:** npm install, npm run build, npm run lint, npm audit
