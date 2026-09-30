# Website Monitor Report

**Run Timestamp:** 2026-09-30 (automated scheduled run)  
**Overall Status:** ⚠️ **WARNING** - Build successful, but linting and security issues detected

---

## Build Check: ✅ PASSED

Build completed successfully with no errors.

- Compiled successfully
- Generated 61 static pages
- Output: `.next` directory
- Build time: ~15s

Routes generated include homepage, about, blog posts, contact, and multiple localized pages.

---

## Lint Check: ❌ FAILED (47 errors, 2 warnings)

ESLint violations found in generated components. Most issues are unescaped entities in generated content.

### Errors (47 total)
- **Unescaped quote entities**: 45 errors across generated blog, homepage, and feature pages
  - Files affected: `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `ErrorEn.tsx`, `FaaAllePengeneHjemDa.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx`
  - Issue: `'` should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` (react/no-unescaped-entities)

### Warnings (2 total)
- **Image optimization**: 2 warnings in `SplitSection.tsx`
  - Lines 93, 96: Using `<img>` instead of Next.js `<Image />` component
  - Impact: Potential LCP and bandwidth performance issues

### Recommendation
The errors appear to be in auto-generated component files. Regenerate these components or add ESLint disable rules to these files if they are intentionally generated and cannot be modified directly.

---

## Security Audit: ❌ FAILED (6 vulnerabilities)

### Critical (1)
- **Next.js 0.9.9 - 16.3.0-preview.10**: GHSA-fr5h-rqp8-mj6g and 32 other advisories
  - SSRF in Server Actions, DoS in image optimization, authorization bypass, middleware bypass, cache poisoning, race conditions, and more
  - **Fix available**: `npm audit fix --force` → Next.js 16.3.8 (breaking change)
  - **Status per CLAUDE.md**: Knowingly left on current version. Major upgrade is a product decision, not a monitor action.

### High (5)
1. **brace-expansion** (transitive via @typescript-eslint)
   - Quadratic-time expansion DoS and recursion DoS vulnerabilities
   - Location: `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`

2. **minimatch** (transitive via @typescript-eslint)
   - ReDoS vulnerability via repeated wildcards and nested GLOBSTAR segments
   - Location: `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`

3. **PostCSS** (transitive via Next.js)
   - XSS via unescaped `</style>`, path traversal via sourceMappingURL
   - Location: `node_modules/next/node_modules/postcss`
   - **Status per CLAUDE.md**: Knowingly left on current version with Next.js

### Summary
- 5 high severity vulnerabilities in transitive dependencies
- 1 critical vulnerability in Next.js (33 total Next.js advisories)
- Fix available via `npm audit fix` for transitive deps, but `npm audit fix --force` required for Next.js (breaking change)

---

## Dependency Check

Dependencies installed successfully:
- Total packages: 417 added on fresh install
- 418 total packages audited
- Installation time: ~17s

---

## Alerts

- ❌ **Critical**: Next.js has 1 critical and 32 high-severity vulnerabilities. Requires major version upgrade (13→16) for fix.
- ⚠️ **Warning**: 47 ESLint errors in generated components (unescaped quotes).
- ⚠️ **Warning**: 2 image optimization warnings in SplitSection component.
- ℹ️ **Info**: Transitive security vulnerabilities in @typescript-eslint dependencies.

---

## Recommendations

1. **Security**: Next.js vulnerability requires architectural decision on major version upgrade (out of scope for monitor).
2. **Linting**: Investigate generated component files and either:
   - Regenerate them properly with escaped entities
   - Add `.eslintignore` rules for auto-generated files
   - Add ESLint disable comments
3. **Performance**: Replace `<img>` with `<Image />` in SplitSection.tsx for better LCP.

---

**Last Updated**: 2026-09-30
