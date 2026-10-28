# Website Monitor Report

**Timestamp**: 2026-10-28T00:00:00Z  
**Overall Status**: ⚠️ **Warning**

## Summary

The Movena marketing site has successfully built but has multiple security vulnerabilities requiring attention. The lint check failed due to ESLint errors in generated components (unescaped entities), and npm audit detected 12 vulnerabilities including 1 critical issue in Next.js.

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
- **Errors Found**: 65 ESLint violations
  - **Type**: Primarily unescaped entities (`'` characters not escaped as `&apos;`, etc.)
  - **Affected Files** (generated components):
    - `BeregnerEn.tsx` (2 errors)
    - `BlogIndexDa.tsx` (1 error)
    - `BlogIndexEn.tsx` (1 error)
    - `BlogPostEn.tsx` (7 errors)
    - `BookDemoEn.tsx` (3 errors)
    - `ErrorEn.tsx` (2 errors)
    - `FaaAllePengeneHjemEn.tsx` (5 errors)
    - `ForsideDa.tsx` (1 error)
    - `ForsideEn.tsx` (24 errors)
    - `HavStyrPaaDagenEn.tsx` (8 errors)
    - `NotFoundEn.tsx` (1 error)
    - `OmOsEn.tsx` (2 errors)
    - `PrivatlivspolitikEn.tsx` (3 errors)
    - `VindFlereFlytningerEn.tsx` (8 errors)
  - **Warnings Found**: 2
    - `SplitSection.tsx` (2 warnings about `<img>` usage - should use Next.js `<Image />` component)

**Note**: Most errors are in files under `components/generated/`, suggesting these are auto-generated files that need code generation fixes at the source.

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
- 35 reported security advisories across versions 0.9.9 - 16.3.0-preview.10
- **Impact Areas**:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Denial of Service conditions (multiple instances)
  - Information exposure in dev server
  - Cache key confusion and cache poisoning attacks
  - Authorization bypass vulnerability
  - Content injection in image optimization
  - Remote Code Execution vulnerabilities (Windows servers, AVIF/SVG files)
  - HTTP request smuggling in rewrites
  - Cross-site scripting in App Router with CSP nonces
- **Fix Available**: `npm audit fix --force` will upgrade to next@16.4.3 (breaking change)
- **Current Version**: 13.x (from package.json)
- **Note**: As documented in CLAUDE.md, Next.js 13→16 upgrade is a product decision requiring approval

#### High Severity Issues (6)

1. **brace-expansion** (node_modules/brace-expansion)
   - Quadratic-time expansion DoS (GHSA-q2hr-2g5m-vwwr, GHSA-qhr7-859c-m2p7)
   - Uncontrolled recursion DoS causing stack exhaustion (GHSA-6j4f-fj2g-mc7p)
   - Fix Available: `npm audit fix`

2. **minimatch** (node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch)
   - ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
   - Combinatorial backtracking in matchOne() (GHSA-7r86-cg39-jmmj)
   - Catastrophic backtracking in nested extglobs (GHSA-23c5-xmqv-rm74)
   - Fix Available: `npm audit fix`

3. **postcss** (node_modules/next/node_modules/postcss)
   - XSS via unescaped </style> in CSS (GHSA-qx2v-qp2m-jg93)
   - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q)
   - Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
   - Fix Available: `npm audit fix --force` (will upgrade Next.js)

4. **source-map-js** (node_modules/source-map-js)
   - Event-loop denial of service (GHSA-68fv-2mgg-jv7q)
   - Fix Available: `npm audit fix`

#### Moderate Severity Issues (2)

1. **deepmerge** (node_modules/deepmerge)
   - Prototype poisoning of returned objects (GHSA-gcqx-w48m-w2h4)
   - Dependency chain: deepmerge ← html-to-text ← @react-email/render
   - Fix Available: `npm audit fix --force` (will break @react-email/render to 2.2.0)

2. **postcss-selector-parser** (node_modules/postcss-selector-parser)
   - Quadratic complexity in flat selector parsing (GHSA-rj75-hqrm-r3gf)
   - Allows CPU exhaustion attacks
   - Fix Available: `npm audit fix --force` (will upgrade @tailwindcss/typography to 0.5.4)

#### Low Severity Issues (3)

- rimraf@3.0.2 (deprecated, no longer supported)
- inflight@1.0.6 (memory leak issue, deprecated)
- glob@7.1.7 (old version with known security issues, deprecated)

---

## Recommendations

### Priority 1: Address Next.js Vulnerabilities
The critical Next.js vulnerabilities require evaluation:
- The project is on v13; current advisories span through v16
- Upgrading requires `npm audit fix --force` which bumps Next to v16.4.3 (breaking change)
- **Product decision needed**: Assess if upgrade to Next 16 is feasible for the application

### Priority 2: Fix Generated Component Linting Issues
- The 65 ESLint errors are concentrated in `components/generated/` files
- These appear to be code-generated files (check generation source)
- Options:
  1. Update the code generator to emit properly escaped entities
  2. Add ESLint suppressions for generated files (`.eslintignore`)
  3. Implement a post-generation linting fix step

### Priority 3: Upgrade Other Dependencies
- Run `npm audit fix` to patch brace-expansion, minimatch, and source-map-js (high severity, non-breaking)
- Evaluate deepmerge and postcss-selector-parser fixes for breaking changes

### Priority 4: Convert `<img>` to `<Image />`
- Update `SplitSection.tsx` to use Next.js `<Image />` component for better performance optimization

---

## Severity Classification

- **❌ Critical**: 1 critical Next.js vulnerability with 35 advisories (requires product approval to fix)
- **⚠️ Warning**: 6 high-severity vulnerabilities in dependencies, 2 moderate vulnerabilities, lint failures in generated files, deprecated npm packages
- **✅ Healthy**: Build succeeds, 65/65 pages generated successfully, no runtime errors

**Overall Assessment**: Site builds and deploys successfully, but has unresolved security vulnerabilities and linting issues that should be addressed before production deployment.
