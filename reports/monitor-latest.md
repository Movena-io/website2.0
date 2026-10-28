# Website Monitor Report
**Run:** 2026-10-28 03:20:00 UTC  
**Status:** ⚠️ **WARNING** — Build successful, lint errors in generated files, security vulnerabilities present

---

## Summary

The Movena website build completes successfully with all 65 static pages generated. However, the project has lint failures in auto-generated files and known security vulnerabilities that require attention. The lint errors are all in the `components/generated/` directory and do not affect the build output. Security issues are predominantly in Next.js (per CLAUDE.md, knowingly deferred) and transitive dependencies.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASSED | Next.js build completed; 65 pages generated successfully |
| **Lint** | ❌ FAILED | 71 errors in generated components; 2 warnings |
| **Security Audit** | ⚠️ WARNING | 12 vulnerabilities: 1 critical, 6 high, 2 moderate, 3 low |
| **Dependencies** | ✅ OK | 418 packages installed successfully |

---

## Build Check ✅

**Result**: PASSED

Next.js application compiled and generated successfully. All 65 routes built with mixed rendering strategies (static, SSG, and middleware).

**Build Details**:
- Compilation: ✅ No errors
- Pages generated: 65 static + 3 API routes
- Middleware: 27.9 kB
- First Load JS (shared): 80.6 kB
- All locale variants (en, da): ✅ Generated

---

## Lint Check ❌

**Result**: FAILED with 71 errors + 2 warnings

### Errors (71): Unescaped HTML Entities in Generated Components

All errors are the same rule violation: `react/no-unescaped-entities` — apostrophes (') not escaped in JSX output.

**Affected generated files** (14 files in `components/generated/`):
- BeregnerEn.tsx: 2
- BlogIndexDa.tsx: 1
- BlogIndexEn.tsx: 1
- BlogPostEn.tsx: 7
- BookDemoEn.tsx: 3
- ErrorEn.tsx: 2
- FaaAllePengeneHjemEn.tsx: 5
- ForsideDa.tsx: 1
- ForsideEn.tsx: 18
- HavStyrPaaDagenEn.tsx: 8
- NotFoundEn.tsx: 1
- OmOsEn.tsx: 2
- PrivatlivspolitikEn.tsx: 3
- VindFlereFlytningerEn.tsx: 8

**Root cause**: These are auto-generated files from a source generator. The quote character needs escaping to `&apos;`, `&#39;`, `&lsquo;`, or `&rsquo;` in the generation output.

**Solution**: Fix the component generation source (not the generated files directly) to properly escape quotes.

### Warnings (2): Image Optimization

**File**: `components/SplitSection.tsx` (lines 93, 96)  
**Issue**: Using `<img>` tag instead of Next.js `<Image />` component  
**Impact**: May affect LCP (Largest Contentful Paint) performance  
**Recommendation**: Replace with `next/image` for automatic optimization

---

## Security Audit ❌

**Result**: FAILED with 12 vulnerabilities  
**Exit code**: 1 (audit failed at moderate+ level)

### 🔴 Critical (1)

**Next.js** versions 0.9.9–16.3.0-preview.10 (project uses v13)

31+ distinct CVEs affecting:
- Server-Side Request Forgery (SSRF) in Server Actions, rewrites, WebSocket upgrades
- Remote Code Execution (RCE) on Windows-hosted servers and in Image Optimization (AVIF/SVG)
- Denial of Service (DoS) in App Router, Server Components, Image Optimizer
- Cache poisoning, authorization bypass, XSS vulnerabilities
- HTTP request smuggling, request deserialization attacks
- Unauthenticated Server Function endpoint disclosure
- Middleware/Proxy bypass in Pages Router with i18n

**Status per CLAUDE.md**: Intentionally held on Next.js v13 pending product decision. Fixing requires major version upgrade to v16 (breaking changes).

### 🟠 High (6)

1. **brace-expansion** ≤1.1.20 || 2.0.0–2.1.6
   - Quadratic-time expansion causes CPU DoS
   - Uncontrolled recursion on nested brace groups
   - Location: `@typescript-eslint/typescript-estree` transitive
   - Fix available via `npm audit fix`

2. **minimatch** 9.0.0–9.0.6
   - ReDoS via repeated wildcards with non-matching literals
   - ReDoS via nested GLOBSTAR segments
   - ReDoS via nested *() extglobs
   - Location: `@typescript-eslint/typescript-estree` transitive
   - Fix available via `npm audit fix`

3. **postcss** ≤8.5.22
   - XSS via unescaped `</style>` in CSS stringify output
   - Arbitrary file read via sourceMappingURL in CSS comments
   - Path traversal in source map auto-loading
   - Location: `node_modules/next/node_modules/postcss`
   - Fix available via `npm audit fix --force` (breaking; requires Next.js upgrade)

4. **source-map-js** 1.0.0–1.2.1
   - Event-loop Denial of Service via indexed source-map offsets
   - Fix available via `npm audit fix`

### 🟡 Moderate (2)

1. **deepmerge** ≥4.2.0
   - Prototype poisoning of returned objects
   - Fix available via `npm audit fix --force` (breaking)

2. **postcss-selector-parser** <6.1.5
   - Quadratic complexity in flat selector parsing allows CPU exhaustion
   - Affects: `@tailwindcss/typography`, `tailwindcss`, `postcss-nested`
   - Fix available via `npm audit fix --force` (breaking)

### 🟢 Low (3)

- Additional transitive dependencies with low-severity security impact

### Dependency Guidance

Per CLAUDE.md project instructions:
- ⚠️ **DO NOT run `npm audit fix --force`** — rewrites ~87 packages, far beyond advisory scope
- **Next.js and nested PostCSS**: Knowingly pinned pending product-level upgrade decision
- **Transitive ESLint deps** (brace-expansion, minimatch): May be patchable with `npm audit fix` if safe to update ESLint
- **For other transitive vulnerabilities**: Use `overrides` in `package.json` (see `js-yaml@3`, `nanoid@3` examples already in file)

---

## Details

### Environment
- **Node.js project**: Next.js 13 (App Router)
- **Locales**: English (en), Danish (da)
- **Dependencies**: 418 total packages audited
- **npm**: 10.9.4 (upgrade to 12.2.1 available)

### Build Output Summary
- Routes by type:
  - Static (●): 39 pages
  - SSG (●): 27 pages  
  - Dynamic (λ): 3 API routes
  - Middleware (ƒ): 1 middleware

---

## Recommendations

### 🔴 Blocking
1. **Fix lint errors in generated components**
   - Update the source generator to escape apostrophes in output
   - Verify generated files pass linting before committing

### 🟡 Non-blocking
1. **Evaluate `brace-expansion` and `minimatch` patches**
   - Check if ESLint can be safely updated to pull in fixed transitive versions
   - Consider `npm audit fix` for these if feasible

2. **Optimize images in SplitSection.tsx**
   - Replace `<img>` with Next.js `<Image />` component (lines 93, 96)
   - May improve LCP and reduce bandwidth

### 🟢 Deferred (Product Decision)
1. **Next.js major version upgrade**
   - v13 → v16 required to resolve critical/high vulnerabilities in Next.js itself
   - Requires full migration testing and verification
   - Tracked as product-level decision per CLAUDE.md

---

## Report History

This file (`reports/monitor-latest.md`) is overwritten on each monitor run. History is preserved in git:
```
git log reports/monitor-latest.md    # View run history
git diff reports/monitor-latest.md   # See changes since last run
```

---

*Automated monitor run | 2026-10-28 03:20:00 UTC*
