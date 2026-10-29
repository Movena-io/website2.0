# Website Monitor Report

**Run Timestamp**: 2026-10-29T03:15:00Z  
**Overall Status**: ⚠️ **Warning** — Build passing, lint errors present, 12 security vulnerabilities (1 critical)

## Summary

The Movena marketing website builds successfully. However, **linting fails with 67 errors** across generated components due to unescaped HTML entities in JSX, and **security audit identifies 12 vulnerabilities** (1 critical in Next.js, 6 high-severity transitive dependencies). The critical Next.js issue is a known product decision per CLAUDE.md.

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
- **Total Issues**: 67 errors + 2 warnings

#### Errors (67 total)

**Root Cause**: Unescaped single quotes in JSX/TSX generated components  
**ESLint Rule Violated**: `react/no-unescaped-entities`  
**Error Message**: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`

**Affected Generated Components** (in `components/generated/`):
- `BeregnerEn.tsx` (2 errors)
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (7 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemEn.tsx` (5 errors)
- `ForsideDa.tsx` (1 error)
- `ForsideEn.tsx` (26 errors) — largest offender
- `HavStyrPaaDagenEn.tsx` (8 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (8 errors)

**Note**: Errors isolated to `components/generated/` directory; these are auto-generated files. Source generator needs updating to emit properly escaped HTML entities.

#### Warnings (2 total)

**File**: `components/SplitSection.tsx` (lines 93, 96)  
**Rule**: `@next/next/no-img-element`  
**Issue**: Using native `<img>` instead of Next.js `<Image />` component  
**Impact**: Slower LCP (Largest Contentful Paint), higher bandwidth usage

### 4. Security Audit ❌

- **Command**: `npm audit`
- **Result**: 12 vulnerabilities detected

#### Severity Breakdown

| Severity | Count | Notes |
|----------|-------|-------|
| Critical | 1 | Next.js (acknowledged in CLAUDE.md) |
| High | 6 | Transitive dependencies |
| Moderate | 2 | Lower priority |
| Low | 3 | Deprecated packages |

#### Critical (1)

**Next.js** (v13.5.11) — **CRITICAL & ACKNOWLEDGED**
- **Issues**: 33 advisories affecting versions 0.9.9–16.3.0-preview.10
- **Key CVEs**:
  - SSRF in Server Actions (GHSA-fr5h-rqp8-mj6g)
  - DoS in Image Optimization (GHSA-g77x-44xx-532m)
  - Authorization bypass (GHSA-7gfc-8cq8-jh5f)
  - RCE in Image Optimization on Windows (GHSA-2xp9-vwfh-vxw4)
  - Cache poisoning & key confusion
  - HTTP request smuggling in rewrites
  - XSS with CSP nonces
  - Middleware bypass (Pages Router)
- **Known Decision**: CLAUDE.md states "Fixing requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."
- **Status**: Deferred pending product team approval

#### High Severity (6)

1. **minimatch** (via @typescript-eslint/typescript-estree)
   - ReDoS vulnerabilities via repeated wildcards and nested extglobs
   - Fix: `npm audit fix`

2. **postcss** (nested in node_modules/next/node_modules/postcss)
   - XSS via unescaped `</style>` in CSS stringify
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source map auto-loading
   - Fix: Requires Next.js upgrade

3. **source-map-js**
   - Event-loop DoS via indexed source-map offsets
   - Fix: `npm audit fix`

4. **deepmerge** (html-to-text ← @react-email/render)
   - Prototype poisoning in mergeObject()
   - Fix: `npm audit fix --force` (@react-email/render breaking change)

5. **postcss-selector-parser** (@tailwindcss/typography)
   - Quadratic complexity in flat selector parsing
   - CPU exhaustion attack vector
   - Fix: `npm audit fix --force` (@tailwindcss/typography breaking change)

6. **brace-expansion**
   - DoS via quadratic-time expansion and uncontrolled recursion
   - Fix: `npm audit fix`

#### Moderate Severity (2)

- Transitive dependencies from above vulnerability chains

#### Low Severity (3)

- Deprecated packages: rimraf, inflight, glob (old versions)

**Note**: Per CLAUDE.md: "npm audit fix and npm update both rewrite ~87 packages. Patch transitive dependencies with a scoped entry in `overrides` in `package.json` instead."

---

## Metrics Summary

| Category | Metric | Value | Status |
|----------|--------|-------|--------|
| **Build** | Success | Yes | ✅ |
| **Pages Generated** | Static + SSG | 65 total (2 locales) | ✅ |
| **Lint Errors** | Count | 67 | ❌ |
| **Lint Warnings** | Count | 2 | ⚠️ |
| **Security Vulns** | Total | 12 | ❌ |
| **—** | Critical | 1 (acknowledged) | ⚠️ |
| **—** | High | 6 (transitive) | ❌ |

---

## Blocking Issues

### High Priority: Lint Errors (67 errors)

**Status**: Blocking code quality gates

**Root Cause**: Auto-generated components contain unescaped HTML entities in JSX strings.

**Options to Fix**:
1. **Update the source generator** (recommended): Ensure generator emits properly escaped entities
2. **Suppress in ESLint**: Add `components/generated/` to `.eslintignore`
3. **Fix manually**: Edit files, but fragile if regenerated
4. **Post-generation script**: Auto-escape entities after generation

---

## Recommendations

| Priority | Item | Action |
|----------|------|--------|
| **P1** | Fix lint errors (67) | Update code generator or suppress ESLint for generated files |
| **P2** | Convert `<img>` to `<Image />` | Update 2 tags in SplitSection.tsx for LCP optimization |
| **P3** | Evaluate Next.js 13→16 upgrade | Product decision required for 33 CVEs |
| **P4** | Apply available audit patches | Fix minimatch, source-map-js, brace-expansion (non-breaking) |

---

## Site Readiness

| Dimension | Status | Notes |
|-----------|--------|-------|
| **Builds Successfully** | ✅ Yes | All 65 pages generated cleanly |
| **Deploys Without Errors** | ✅ Yes | Production build complete |
| **Linting Standards** | ❌ No | 67 errors prevent clean merges |
| **Security Posture** | ⚠️ Fair | 1 critical (known), 6 high (transitive) — Next.js decision pending |
| **Performance** | ✅ Mostly | Pages lean; 2 img tags could use Image component |

**Overall**: The site is **functionally sound and deployable**, but **linting issues block merges** and **security decisions on Next.js pending product approval**.

---

## Environment

- **Next.js**: 13.5.11
- **Node Packages**: 417 installed, 418 audited
- **Locales**: English (en), Danish (da)
- **Run Environment**: Automated scheduled monitor

