# Website Monitor Report

**Timestamp**: 2026-10-28T14:32:00Z  
**Overall Status**: ⚠️ **Warning** — Build passing, lint errors present, known security vulnerabilities

## Summary

The Movena website build completes successfully. Linting fails with 71 errors across generated components due to unescaped entities. Security audit identifies 12 vulnerabilities (1 critical, 6 high, 2 moderate, 3 low); the critical issue is in Next.js itself, which the project acknowledges as a known decision per CLAUDE.md.

---

## Checks Performed

### 1. Dependencies Installation ✅

- **Command**: `npm install`
- **Result**: Success
- **Details**: 417 packages installed, 418 audited
- **Issues**: 12 vulnerabilities detected during install (see Security Audit section)

### 2. Lint Check ❌

- **Command**: `npm run lint`
- **Result**: Failed (exit code 1)
- **Errors Found**: 71 ESLint violations
  - **Type**: Unescaped entities (`'` characters not escaped as `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`)
  - **Affected Files** (generated components):
    - `BeregnerEn.tsx` (2 errors)
    - `BlogIndexDa.tsx` (1 error)
    - `BlogIndexEn.tsx` (1 error)
    - `BlogPostEn.tsx` (7 errors)
    - `BookDemoEn.tsx` (3 errors)
    - `ErrorEn.tsx` (2 errors)
    - `FaaAllePengeneHjemEn.tsx` (5 errors)
    - `ForsideDa.tsx` (1 error)
    - `ForsideEn.tsx` (30 errors)
    - `HavStyrPaaDagenEn.tsx` (8 errors)
    - `NotFoundEn.tsx` (1 error)
    - `OmOsEn.tsx` (2 errors)
    - `PrivatlivspolitikEn.tsx` (3 errors)
    - `VindFlereFlytningerEn.tsx` (8 errors)
  - **Warnings Found**: 2
    - `SplitSection.tsx` (2 warnings about `<img>` usage - should use Next.js `<Image />` component)
  - **ESLint Rule**: `react/no-unescaped-entities`

**Note**: Errors are concentrated in `components/generated/`, suggesting auto-generated files that need source-level fixes.

### 3. Build Check ✅

- **Command**: `npm run build`
- **Result**: Success
- **Details**:
  - ✓ Compiled successfully
  - ✓ Generated 65 static pages
  - ✓ Build completed without errors
  - Production build optimized for deployment
  - Middleware compiled: 27.9 kB
  - First Load JS shared by all: 80.6 kB

**Build Output Highlights**:
- Largest page: `/[locale]` (42.7 kB page size, 156 kB First Load JS)
- Savings Calculator page: 24.6 kB (largest feature page)
- All routes rendered as static (●) or SSG, indicating good performance optimization

### 4. Security Audit ❌

- **Command**: `npm audit`
- **Result**: 12 vulnerabilities found (exit code 1)

#### Critical Issues (1)

**Next.js** (node_modules/next) - **CRITICAL SEVERITY**
- 33 reported security advisories across versions 0.9.9 - 16.3.0-preview.10
- **Key Vulnerabilities**:
  - Server-Side Request Forgery (SSRF) in Server Actions (GHSA-fr5h-rqp8-mj6g)
  - Denial of Service in Image Optimization (GHSA-g77x-44xx-532m)
  - Information exposure in dev server (GHSA-3h52-269p-cp9r)
  - Authorization bypass (GHSA-7gfc-8cq8-jh5f)
  - Remote Code Execution in Image Optimization (Windows, AVIF/SVG)
  - Cache poisoning and cache key confusion
  - HTTP request smuggling in rewrites
  - Cross-site scripting with CSP nonces
  - Middleware/Proxy bypass in Pages Router
- **Fix Available**: `npm audit fix --force` upgrades to next@16.4.3 (breaking change)
- **Current Version**: 13.x (from package.json)
- **Note**: As documented in CLAUDE.md, Next.js 13→16 upgrade is a product decision requiring approval

#### High Severity Issues (6)

1. **minimatch** (via @typescript-eslint/typescript-estree)
   - ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
   - Combinatorial backtracking in matchOne() (GHSA-7r86-cg39-jmmj)
   - Nested extglobs causing catastrophic backtracking (GHSA-23c5-xmqv-rm74)
   - Fix: `npm audit fix`

2. **postcss** (node_modules/next/node_modules/postcss)
   - XSS via unescaped </style> in CSS stringify (GHSA-qx2v-qp2m-jg93)
   - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp)
   - Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
   - Fix: `npm audit fix --force` (upgrades Next.js)

3. **source-map-js** (node_modules/source-map-js)
   - Event-loop DoS via indexed source-map offsets (GHSA-68fv-2mgg-jv7q)
   - Fix: `npm audit fix`

4. **deepmerge** (via html-to-text ← @react-email/render)
   - Prototype poisoning in mergeObject() (GHSA-gcqx-w48m-w2h4)
   - Fix: `npm audit fix --force` (@react-email/render → 2.2.0, breaking)

5. **postcss-selector-parser** (via @tailwindcss/typography)
   - Quadratic complexity in flat selector parsing (GHSA-rj75-hqrm-r3gf)
   - CPU exhaustion attack vector
   - Fix: `npm audit fix --force` (@tailwindcss/typography → 0.5.4, breaking)

#### Moderate Severity Issues (2)

- (Included in postcss-selector-parser and deepmerge chains above)

#### Low Severity Issues (3)

- rimraf@3.0.2 (deprecated)
- inflight@1.0.6 (memory leak, deprecated)
- glob@7.1.7 (old version, deprecated)

---

## Recommendations

### Priority 1: Fix Generated Component Linting Issues (Blocking Build)
- **71 ESLint errors** concentrated in `components/generated/` files
- All errors are unescaped entity violations: `'` should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- **Action**: 
  1. Identify the code generator producing these components
  2. Update generator to emit properly escaped HTML entities
  3. Alternatively: Update generated files directly or suppress in ESLint config

### Priority 2: Address Next.js Security Vulnerabilities (Known Issue)
- Critical Next.js vulnerabilities require product-level decision
- Upgrading to v16 (`npm audit fix --force`) is a major version change
- Per CLAUDE.md: "Fixing requires Next 13 to 16, a major upgrade that is a product decision"
- **Action**: Product team to evaluate feasibility of Next.js 13→16 upgrade

### Priority 3: Convert `<img>` to `<Image />` (Performance)
- Update `SplitSection.tsx` lines 93, 96 to use Next.js `<Image />` component
- Improves LCP and bandwidth optimization

### Priority 4: Defer Other Dependency Fixes (Non-Critical)
- source-map-js, minimatch, postcss fixes available via `npm audit fix` but low risk in current usage
- Per CLAUDE.md: "npm audit fix and npm update" rewrite many packages; defer unless targeted security incident

---

## Classification & Next Steps

| Check | Status | Impact |
|-------|--------|--------|
| **Build** | ✅ Passing | Deploys without errors, 65/65 pages generated |
| **Lint** | ❌ Failing | 71 errors block merge without fixes; warnings are non-critical |
| **Security** | ⚠️ Warning | 1 critical (Next.js, known), 6 high (transitive deps), 2 moderate, 3 low |

**Blocking Issue**: Lint errors must be resolved before merging.  
**Known Deferred**: Next.js vulnerabilities acknowledged in CLAUDE.md as product decision.  
**Overall**: Site is functional and deployable, but requires linting fixes and security decision on Next.js upgrade path.
