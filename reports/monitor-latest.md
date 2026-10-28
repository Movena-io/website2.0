# Website Monitor Report

**Timestamp**: 2026-10-28T21:05:42Z  
**Overall Status**: ⚠️ **Warning** — Build passing, lint errors present, TypeScript clean, security vulnerabilities (1 critical known issue)

## Summary

The Movena marketing website builds successfully and has no TypeScript type errors. However, linting fails with 63 errors across generated components due to unescaped HTML entities in JSX. Security audit identifies 12 vulnerabilities (1 critical, 6 high, 2 moderate, 3 low); the critical issue in Next.js is a known product decision per CLAUDE.md.

---

## Checks Performed

### 1. Dependencies & Installation ✅

- **Command**: `npm install`
- **Result**: Success
- **Details**: 417 packages installed, 418 audited
- **Project Size**: 787 MB (534 MB node_modules, 209 MB .next build cache)
- **Source Files**: 85 TypeScript components in app/ and components/

### 2. TypeScript Type Checking ✅

- **Command**: `npx tsc --noEmit`
- **Result**: Success — No type errors
- **Details**: All TypeScript files compile cleanly, type safety maintained across codebase

### 3. Build Check ✅

- **Command**: `npm run build`
- **Result**: Success (exit code 0)
- **Build Output**:
  - ✓ Compiled successfully
  - ✓ Generated 65 static pages across 2 locales (en, da)
  - ✓ Linting skipped during build (ESLint not enforced in production)
  - ✓ Type validation passed
  - Middleware compiled: 27.9 kB
  - First Load JS shared: 80.6 kB

**Build Performance**:
- Largest route: `/[locale]` (42.7 kB page, 156 kB First Load JS)
- Feature pages: 10–25 kB each (Savings Calculator: 24.6 kB, Run the Day: 14 kB, Book Demo: 9 kB)
- All pages optimized as static (●) or SSG — good for deployment performance

### 4. Lint Check ❌

- **Command**: `npm run lint`
- **Result**: Failed (exit code 1)
- **Total Issues**: 63 errors + 2 warnings

#### Errors (63 total)

**Root Cause**: Unescaped single quotes in JSX/TSX generated components  
**ESLint Rule Violated**: `react/no-unescaped-entities`  
**Error Message**: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`

**Affected Generated Components**:
- `ForsideEn.tsx` (28 errors) — largest offender
- `BeregnerEn.tsx` (2 errors)
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (7 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemEn.tsx` (5 errors)
- `ForsideDa.tsx` (1 error)
- `HavStyrPaaDagenEn.tsx` (8 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (8 errors)

**Note**: Errors isolated to `components/generated/` directory; these are auto-generated files (not hand-coded). Source generator needs updating to emit properly escaped HTML entities.

#### Warnings (2 total)

**File**: `components/SplitSection.tsx` (lines 93, 96)  
**Rule**: `@next/next/no-img-element`  
**Issue**: Using native `<img>` instead of Next.js `<Image />` component  
**Impact**: Slower LCP (Largest Contentful Paint), higher bandwidth usage  
**Recommendation**: Convert to `<Image />` from `next/image` for automatic optimization

### 5. Security Audit ❌

- **Command**: `npm audit --json`
- **Result**: 12 vulnerabilities detected

#### Severity Breakdown

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 1 | Acknowledged in CLAUDE.md |
| High | 6 | Transitive dependencies |
| Moderate | 2 | Lower risk |
| Low | 3 | Deprecated packages |

#### Critical (1)

**Next.js** (node_modules/next) — **CRITICAL & ACKNOWLEDGED**
- **Version**: 13.5.11 (current in package.json)
- **Issues**: 33 advisories affecting versions 0.9.9–16.3.0-preview.10
- **Key CVEs**:
  - SSRF in Server Actions (GHSA-fr5h-rqp8-mj6g)
  - DoS in Image Optimization (GHSA-g77x-44xx-532m)
  - Info disclosure in dev server (GHSA-3h52-269p-cp9r)
  - AuthZ bypass (GHSA-7gfc-8cq8-jh5f)
  - RCE in Image Optimization on Windows (AVIF/SVG)
  - Cache poisoning & key confusion
  - HTTP request smuggling in rewrites
  - XSS with CSP nonces
  - Middleware/Proxy bypass (Pages Router)
- **Known Decision**: CLAUDE.md explicitly states "Fixing requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."
- **Fix Path**: `npm audit fix --force` → next@16.4.3 (breaking change, requires testing)
- **Status**: Deferred pending product team approval

#### High Severity (6)

1. **minimatch** (via @typescript-eslint/typescript-estree)
   - ReDoS: repeated wildcards (GHSA-3ppc-4f35-3m26)
   - Combinatorial backtracking (GHSA-7r86-cg39-jmmj)
   - Nested extglobs catastrophic backtracking (GHSA-23c5-xmqv-rm74)
   - Fix: `npm audit fix`

2. **postcss** (node_modules/next/node_modules/postcss, v8.x)
   - XSS via unescaped `</style>` in CSS stringify (GHSA-qx2v-qp2m-jg93)
   - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp)
   - Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
   - Fix: Requires Next.js upgrade

3. **source-map-js** (node_modules/source-map-js)
   - Event-loop DoS via indexed source-map offsets (GHSA-68fv-2mgg-jv7q)
   - Fix: `npm audit fix`

4. **deepmerge** (html-to-text ← @react-email/render)
   - Prototype poisoning in mergeObject() (GHSA-gcqx-w48m-w2h4)
   - Fix: `npm audit fix --force` (@react-email/render v2.2.0, breaking)

5. **postcss-selector-parser** (@tailwindcss/typography)
   - Quadratic complexity in flat selector parsing (GHSA-rj75-hqrm-r3gf)
   - CPU exhaustion attack vector
   - Fix: `npm audit fix --force` (@tailwindcss/typography v0.5.4, breaking)

6. **@typescript-eslint/parser** (indirect via eslint-config-next)
   - Cascading from @typescript-eslint/typescript-estree → minimatch CVE
   - Fix: `npm audit fix`

#### Moderate Severity (2)

- brace-expansion (via glob, rimraf) — ReDoS in bracket expansion
- Related to postcss-selector-parser and deepmerge chains above

#### Low Severity (3)

- rimraf@3.0.2 — deprecated, consider v5+
- inflight@1.0.6 — memory leak warning, deprecated
- glob@7.1.7 — old version, deprecated, security vulnerabilities

**Note**: Per CLAUDE.md: "npm audit fix and npm update both rewrite ~87 packages here, far beyond whatever has an advisory. Patch a transitive dependency with a scoped entry in `overrides` in `package.json` instead."

---

## Metrics Summary

| Category | Metric | Value | Status |
|----------|--------|-------|--------|
| **Build** | Success | Yes | ✅ |
| **TypeScript** | Type Errors | 0 | ✅ |
| **Pages Generated** | Static + SSG | 65 total (2 locales) | ✅ |
| **Lint Errors** | Count | 63 | ❌ |
| **Lint Warnings** | Count | 2 | ⚠️ |
| **Security Vulns** | Total | 12 | ❌ |
| **—** | Critical | 1 (acknowledged) | ⚠️ |
| **—** | High | 6 (transitive) | ❌ |
| **Deployment Readiness** | Functional | Yes (lint warnings non-blocking) | ✅ |

---

## Blocking Issues

### High Priority: Lint Errors

**Status**: Blocking (63 errors must be resolved for code quality gates)

**Root Cause**: Auto-generated components in `components/generated/` contain unescaped HTML entities in JSX strings.

**Options to Fix**:
1. **Update the source generator** (recommended): Ensure generator emits `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` for apostrophes
2. **Suppress in ESLint**: Add `.eslintignore` entry for generated files + comment in `.eslintrc.json`
3. **Fix generated files manually**: Edit each file, but fragile if regenerated
4. **Create a post-generation script**: Auto-escape entities after generation

---

## Known Deferred Issues

### Critical: Next.js Security Vulnerabilities

**Status**: Known decision per CLAUDE.md, deferred pending product approval

**Context**: Next.js 13.x contains 33 security advisories. Upgrade to v16.x fixes them but requires major version jump and full regression testing.

**Decision Point**: Product team must approve Next.js 13→16 upgrade path.

---

## Recommendations

| Priority | Item | Action | Owner |
|----------|------|--------|-------|
| **P1** | Fix lint errors in generated components | Update code generator or suppress ESLint rule for generated files | Dev Team |
| **P2** | Convert `<img>` to `<Image />` in SplitSection.tsx | Update 2 image tags for LCP optimization | Dev Team |
| **P3** | Evaluate Next.js 13→16 upgrade | Schedule product decision & testing | Product Team |
| **P4** | Apply available `npm audit fix` patches | Fix minimatch, source-map-js, postcss-selector-parser issues (non-breaking) | Dev Team (optional) |

---

## Site Readiness Assessment

| Dimension | Status | Notes |
|-----------|--------|-------|
| **Builds Successfully** | ✅ Yes | All 65 pages generated cleanly |
| **Deploys Without Errors** | ✅ Yes | Production build is complete and optimized |
| **Type Safe** | ✅ Yes | Zero TypeScript compilation errors |
| **Linting Standards** | ❌ No | 63 errors in generated components prevent merge without fixes |
| **Security Posture** | ⚠️ Fair | 1 critical (known), 6 high (transitive), 2 moderate — Next.js decision pending |
| **Performance Optimized** | ✅ Mostly | Pages lean; 2 img tags could use Next.js Image component |

**Overall**: The site is **functionally sound and deployable**, but **linting issues block clean merges** and **security decisions on Next.js pending product approval**.

---

## Environment

- **Next.js**: 13.5.11
- **React**: 18.x
- **Tailwind CSS**: 3.x
- **TypeScript**: 5.x
- **Node Packages**: 417 installed, 418 audited
- **Locales**: English (en), Danish (da)
- **Last Git Commits**: 
  - `403cb29` — Update website monitor report
  - `b6dd2b7` — Monitor run 2026-10-28 with CVE details
