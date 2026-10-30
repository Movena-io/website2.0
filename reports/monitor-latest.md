# Website Monitor Report

**Run Timestamp**: 2026-10-30 16:10:00 UTC  
**Overall Status**: ❌ **CRITICAL** — Build passing, lint failures block merge, critical Next.js vulnerabilities

## Summary

The Movena marketing website builds successfully but has significant linting and security issues:

- **Build**: ✅ PASSED (65 pages generated)
- **Lint**: ❌ FAILED (89 errors across generated components and 2 warnings)
- **Security**: ⚠️ WARNING (12 vulnerabilities: 3 low, 2 moderate, 6 high, 1 critical — known and acknowledged per CLAUDE.md)

---

## Checks Performed

### 1. Dependencies & Installation ✅

- **Command**: `npm install`
- **Result**: Success
- **Details**: 417 packages installed, 418 audited
- **Warnings**: 12 security vulnerabilities detected (3 low, 2 moderate, 6 high, 1 critical)

### 2. Build Check ✅

- **Command**: `npm run build`
- **Result**: Success (exit code 0)
- **Build Output**:
  - ✓ Compiled successfully
  - ✓ Generated 65 static pages across 2 locales (en, da)
  - ✓ Type validation passed
  - Middleware compiled: 27.9 kB
  - First Load JS shared: 80.6 kB

**Build Performance**:
- Largest route: `/[locale]` (42.7 kB page, 156 kB First Load JS)
- All pages optimized as static (●) or SSG — good for deployment performance

### 3. Lint Check ❌

- **Command**: `npm run lint`
- **Result**: Failed (exit code 1)
- **Total Issues**: 89 errors + 2 warnings

#### Errors (89 total)

**Root Cause**: Unescaped single quotes in JSX strings in auto-generated components  
**ESLint Rule**: `react/no-unescaped-entities`  
**Error Message**: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`

**Affected Files** (components/generated/):
- `BeregnerEn.tsx` - 2 errors
- `BlogIndexDa.tsx` - 1 error
- `BlogIndexEn.tsx` - 1 error
- `BlogPostEn.tsx` - 7 errors
- `BookDemoEn.tsx` - 3 errors
- `ErrorEn.tsx` - 2 errors
- `FaaAllePengeneHjemEn.tsx` - 5 errors
- `ForsideDa.tsx` - 1 error
- `ForsideEn.tsx` - 30 errors
- `HavStyrPaaDagenEn.tsx` - 8 errors
- `NotFoundEn.tsx` - 1 error
- `OmOsEn.tsx` - 2 errors
- `PrivatlivspolitikEn.tsx` - 3 errors
- `VindFlereFlytningerEn.tsx` - 8 errors

**Solution**: Update the component generator to properly escape HTML entities in output.

#### Warnings (2 total)

**File**: `components/SplitSection.tsx` (lines 93, 96)  
**Rule**: `@next/next/no-img-element`  
**Issue**: Using `<img>` instead of `<Image />` component  
**Impact**: Slower LCP, higher bandwidth

### 4. Security Audit ❌

- **Command**: `npm audit`
- **Result**: 12 vulnerabilities detected

#### Severity Breakdown

| Severity | Count | Notes |
|----------|-------|-------|
| Critical | 1 | Next.js RCE (acknowledged in CLAUDE.md) |
| High | 6 | Transitive dependencies |
| Moderate | 2 | Lower priority |
| Low | 3 | Deprecated packages |

#### Critical Severity (1)

**Next.js** (v13.5.11)
- **Vulnerability**: Unauthenticated RCE in Image Optimization API when SVG files are used
- **CVSS**: Critical severity
- **Advisory**: GHSA-2464-fhr4-w9xw
- **Affected Range**: >=10.0.0 <=15.5.27
- **Additional Issues**:
  - DoS in App Router (Server Actions)
  - SSRF in Server Actions
  - Authorization bypass
  - Cache poisoning
- **Status**: Per CLAUDE.md, this is a known product decision. Fixing requires upgrading from Next.js 13 to 16+.

#### High Severity (6)

1. **@typescript-eslint/typescript-estree** → **minimatch**
   - ReDoS via repeated wildcards and nested extglobs
   - Affects: TypeScript parsing

2. **brace-expansion**
   - Multiple DoS vectors: quadratic expansion, uncontrolled recursion
   - CVSS: 7.5 (stack exhaustion)
   - Affects: Shell glob pattern expansion

3. **postcss** (nested in next/node_modules/)
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source map auto-loading
   - XSS via unescaped `</style>`
   - CVSS: 7.5
   - Affects: CSS processing (requires Next.js upgrade)

#### Moderate Severity (2)

- **@tailwindcss/typography** → postcss-selector-parser (quadratic complexity)
- Transitive from high-severity chains

#### Low Severity (3)

- rimraf@3, inflight, glob@7 (deprecated, non-critical)

**Analysis**: Per CLAUDE.md, "Next and postcss are knowingly left on current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision."

---

## Metrics Summary

| Category | Metric | Value | Status |
|----------|--------|-------|--------|
| **Build** | Success | Yes | ✅ |
| **Pages Generated** | Static + SSG | 65 total (2 locales) | ✅ |
| **Lint Errors** | Count | 89 | ❌ |
| **Lint Warnings** | Count | 2 | ⚠️ |
| **Security Vulnerabilities** | Total | 12 | ⚠️ |
| **—** | Critical | 1 (Next.js — known) | ⚠️ |
| **—** | High | 6 (transitive) | ⚠️ |

---

## Blocking Issues

### 1. Linting Errors (89 errors) - P1

**Impact**: Prevents clean merges in many CI/CD pipelines  
**Root Cause**: Auto-generated components not escaping JSX entities  
**Options**:
- Update source generator to escape `'` → `&apos;`
- Suppress errors in `.eslintignore` for `components/generated/`
- Post-generation script to auto-escape

### 2. Critical Next.js RCE - P2

**Impact**: Security risk for SVG image optimization  
**Options**:
- Disable SVG handling in Image Optimization component if not needed
- Upgrade to Next.js 16.4.3 (requires product team decision)
- Monitor for active exploits and patch urgently if detected

### 3. Transitive Dependency DoS Issues - P3

**Impact**: Potential availability risk from glob/pattern expansion attacks  
**Options**:
- Apply selective `npm audit fix` for non-breaking patches
- Use `overrides` in package.json for safe transitive pins (per CLAUDE.md)
- Await fixes from upstream (minimatch, brace-expansion maintainers)

---

## Recommendations

| Priority | Item | Effort | Action |
|----------|------|--------|--------|
| **P1** | Fix 89 lint errors | Low | Update component generator to escape HTML entities |
| **P2** | Replace `<img>` tags | Low | Convert 2 instances in SplitSection.tsx to `<Image />` |
| **P3** | Evaluate Next.js 13→16 upgrade | High | Product team decision; roadmap planning required |
| **P4** | Patch safe vulnerabilities | Medium | Apply `npm audit fix` for minimatch, source-map-js, brace-expansion |

---

## Site Readiness

| Dimension | Status | Notes |
|-----------|--------|-------|
| **Builds Successfully** | ✅ Yes | All 65 pages generated cleanly |
| **Deploys Without Errors** | ✅ Yes | Production build complete |
| **Linting Standards** | ❌ No | 89 errors prevent clean merges |
| **Security Posture** | ⚠️ Fair | 1 critical (known), 6 high (transitive) — Next.js decision pending |
| **Performance** | ✅ Mostly | Pages lean; 2 img tags could use Image component |

**Verdict**: The site **builds and functions correctly** but **fails linting with 89 errors**. Linting must be fixed before merging. Security vulnerabilities are known per CLAUDE.md and require product decision on Next.js upgrade timeline.

---

## Environment

- **Node Packages**: 417 installed, 418 audited
- **Next.js**: 13.5.11 (known vulnerabilities acknowledged)
- **Locales**: en, da
- **Run**: Automated scheduled monitor

