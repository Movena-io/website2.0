# Website Monitor Report
**Run Time:** 2026-10-25 (automated)  
**Overall Status:** ❌ **BUILD BLOCKED** - Linting failures prevent deployment

---

## Summary
- **Build**: ✅ Successful — Next.js app compiled without errors (61 pages generated)
- **Lint**: ❌ **Failed** — 93 ESLint errors in generated components (blocking)
- **Security**: ⚠️ **11 vulnerabilities** — 1 critical, 6 high, 4 moderate

---

## 1. Linting Results

**Status**: ❌ **FAILED** — **93 errors** (this is a major increase from 59)

### Issue: Unescaped HTML Entities in Generated Components
- **Error count**: 91 unescaped apostrophes
- **Affected files**: 12+ auto-generated React components under `components/generated/`
- **ESLint rule**: `react/no-unescaped-entities`
- **Problem**: Raw single quotes (`'`) should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (alphabetical):
- `BeregnerEn.tsx`: 2 errors
- `BlogIndexDa.tsx`: 1 error  
- `BlogIndexEn.tsx`: 1 error
- `BlogPostEn.tsx`: 7 errors
- `BookDemoEn.tsx`: 3 errors
- `ErrorEn.tsx`: 2 errors
- `FaaAllePengeneHjemEn.tsx`: 5 errors
- `ForsideDa.tsx`: 1 error
- `ForsideEn.tsx`: 19 errors
- `HavStyrPaaDagenEn.tsx`: 8 errors
- `NotFoundEn.tsx`: 1 error
- `OmOsEn.tsx`: 2 errors
- `PrivatlivspolitikEn.tsx`: 3 errors
- `VindFlereFlytningerEn.tsx`: 8 errors

### Minor Issues: Image Optimization (2 warnings)
- `components/SplitSection.tsx:93,96`
- **Issue**: Using `<img>` instead of Next.js `<Image/>` component
- **Impact**: Performance (slower LCP, higher bandwidth)
- **Fix**: Replace with `<Image/>` from `next/image`

### Why This Matters
These are **generated components**. The linting errors indicate either:
1. The generation source includes unescaped quotes, OR
2. The generation process doesn't properly escape HTML entities

This must be fixed before code can be deployed or merged.

---

## 2. Build Results

**Status**: ✅ **SUCCESSFUL**

Build completed without errors despite linting issues.

- **Output**: 61 static pages generated successfully
- **Compilation time**: ~30 seconds
- **Routes**: 43+ unique paths across 2 locales (en, da)

### Generated Routes
- **Home**: `/en`, `/da`
- **Blog**: `/[locale]/blog`, `/[locale]/blog/[slug]` (21 posts)
- **Feature pages**: about, book-demo, contact, get-paid, om-os, run-the-day, savings-calculator, win-more-moves, etc.
- **Legal**: privacy, privatlivspolitik, dataportabilitet
- **API**: /api/calculator/submit, /api/contact, /api/demo
- **SEO**: robots.txt, sitemap.xml

### Build Metrics
- **First Load JS (shared)**: 80.6 kB
- **Largest page**: Savings calculator (24.6 kB)
- **Middleware**: 27.9 kB
- **Total chunks**: ~15 shared + page-specific bundles

**Build succeeds because linting is skipped during build. This is why lint errors don't prevent builds but do block CI/deployment.**

---

## 3. Security Audit: 11 Vulnerabilities

**Status**: ⚠️ **Warning** — 11 total (1 critical in dependencies, 6 high, 4 moderate)

### Critical (1)

**next** embedded package chain — Multiple critical advisories in Next.js itself
- **Affected versions**: 0.9.9 - 16.3.0-preview.10 (includes 13.x)
- **Known issues**: SSRF, RCE, XSS, Cache poisoning, HTTP request smuggling
- **Fix**: Requires upgrade to `next@16.4.3+` (major version bump)
- **Status**: Per CLAUDE.md, this is a known constraint requiring product decision

### High Severity (6)

1. **brace-expansion** - CPU exhaustion DoS (uncontrolled recursion)
   - CVSS: 7.5

2. **minimatch** - ReDoS vulnerability  
   - Affects: `@typescript-eslint/typescript-estree`, `@typescript-eslint/parser`
   - Impact: Dev tooling (not production code)

3. **postcss** (bundled in Next.js) - Path traversal via sourceMappingURL
   - CVSS: 7.5
   - Affects: All Next.js builds

4. **source-map-js** - Event-loop DoS
   - CVSS: 7.5
   - Range: 1.0.0 - 1.2.1

5. **@typescript-eslint/typescript-estree** - Depends on minimatch

6. **@typescript-eslint/parser** - Depends on @typescript-eslint/typescript-estree

### Moderate Severity (4)

- **@tailwindcss/typography**, **postcss-nested**, **tailwindcss** - Depend on vulnerable `postcss-selector-parser`
- **postcss-selector-parser** - Quadratic complexity CPU exhaustion (CVSS: 5.9)

### Audit Summary
```
Total packages: 418
Vulnerabilities: 11 (1 critical, 6 high, 4 moderate)
```

### Known Constraint
From `CLAUDE.md`:
> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."

This constraint is appropriate given the scope of changes required.

---

## Action Items (Priority Order)

### 🔴 BLOCKING - Must Fix Before Deploy
**Fix linting errors in generated components** (93 errors)
- Escape unescaped HTML entities in all `components/generated/` files
- OR: Regenerate with proper entity escaping
- OR: Exclude generated files from lint rules if they're auto-generated from external source

### 🟠 SHOULD FIX - Next Sprint  
**Image optimization** (2 warnings)
- Replace `<img>` with `<Image/>` in `SplitSection.tsx`
- Low effort, improves performance

**Plan Next.js upgrade** (product decision)
- Next.js 13→16 migration requires product team approval
- Resolves critical vulnerabilities and postcss issues
- Significant effort but necessary long-term

### 🟡 MONITORING
**Security vulnerabilities** 
- Current state is known and acknowledged
- Continue monitoring for CVE updates
- Plan upgrade timeline with product team

---

**Report Generated:** Automated website-monitor (Claude Haiku 4.5)  
**Environment:** Remote execution (Linux)  
**Tools Run:** npm lint, npm build, npm audit  
**Previous Status:** ✅ Lint had 59 errors; now 93 (regression detected)
