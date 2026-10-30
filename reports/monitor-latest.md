# Website Monitor Report

**Run Time:** 2026-10-30 at 11:42 UTC  
**Overall Status:** ⚠️ **WARNING** — Build succeeds, lint errors in generated files, security vulnerabilities (known deferral)

---

## Build Check: ✅ **PASS**

The Next.js build completed successfully without errors.

- ✅ 65 pages generated
- ✅ All routes compiled
- ✅ Static generation successful
- ✅ Build traces collected

**Size Summary:**
- First Load JS (shared): 80.6 kB
- Middleware: 27.9 kB

---

## Lint Check: ❌ **FAILURE** (68 errors, 2 warnings)

### Warnings (2)
- `./components/SplitSection.tsx` (2 warnings)
  - Lines 93, 96: Using `<img>` instead of Next.js `<Image />`

### Errors (68+)
All errors are **unescaped single quotes** (`'`) in generated React components that should use HTML entity equivalents:
- `./components/generated/BeregnerEn.tsx` (2 errors)
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (19 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Note:** These errors are in auto-generated files. The linting rules require `'` to be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` in React/JSX content.

---

## Security Audit: ⚠️ **12 Vulnerabilities** (3 low, 2 moderate, 6 high, 1 critical)

### Critical (1)
- **next** (v13.4.0): 35+ advisories including:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Denial of Service via Image Optimization
  - Information exposure in dev server
  - Cache key confusion
  - Authorization bypass
  - Middleware redirect SSRF
  - Content injection in image optimization
  - Race condition to cache poisoning
  - Multiple DoS vulnerabilities with Server Components
  - HTTP request smuggling in rewrites
  - Unbounded disk cache growth
  - XSS in App Router with CSP nonces
  - Cache poisoning via race conditions
  - XSS in beforeInteractive scripts
  - SSRF via WebSocket upgrades
  - Middleware/Proxy bypass in Pages Router
  - Server Action DoS
  - Cache confusion with invalid UTF-8
  - Unbounded Server Action payload
  - SSRF in rewrites
  - Unauthenticated RCE on Windows
  - Unauthenticated RCE in Image Optimization with AVIF/SVG

### High (6)
- **postcss** (v8.4.31): XSS, arbitrary file read via source maps
- **brace-expansion** (v1.1.11): Quadratic-time expansion DoS, recursive nesting DoS
- **minimatch** (v9.0.3): ReDoS via repeated wildcards, GLOBSTAR backtracking, nested extglob
- **source-map-js** (v1.2.0): Event-loop DoS via source-map offsets

### Moderate (2)
- **postcss-selector-parser** (<6.1.5): Quadratic complexity in flat selector parsing
- **deepmerge** (>=4.2.0): Prototype poisoning in mergeObject()

### Low (3)
- Various transitive dependencies

**Known Issue:** Per CLAUDE.md, Next.js and postcss are knowingly left at current versions. Fixing requires a major upgrade from Next 13 to Next 16, which is a product decision deferred for later.

---

## Recommendations

1. **Lint Errors in Generated Files:** Review the code generation pipeline that creates files in `components/generated/`. Consider updating the generator to emit properly escaped quote entities.

2. **SplitSection.tsx:** Update lines 93 and 96 to use Next.js `<Image />` component instead of `<img>` for optimized image loading.

3. **Security Vulnerabilities:** No immediate action required on Next.js/PostCSS versions (product decision). Monitor other high-severity dependencies for non-breaking updates.

---

**Monitor Script:** website-monitor  
**Environment:** Production build  
**Node Version:** v20+  
**NPM Version:** 10+
