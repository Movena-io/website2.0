# Website Monitor Report

**Run timestamp:** 2026-11-02 09:10:00 UTC  
**Overall status:** ❌ CRITICAL - Multiple security vulnerabilities and lint failures

---

## Summary

The website build completes successfully. Linting fails due to unescaped HTML entities in auto-generated components (79 errors). Security audit reveals 25 vulnerabilities (1 critical, 6 high, 15 moderate). The critical Next.js vulnerabilities include SSRF, RCE, DoS, and authorization bypass issues affecting the current version.

---

## Build Check

✅ **PASSED**

```
Build completed successfully
Routes generated: 65 static pages
- First Load JS shared: 80.6 kB
- Largest route: /[locale]/savings-calculator (24.6 kB)
- All pages compiled without errors
```

---

## Lint Check

❌ **FAILED** - 79 errors, 2 warnings

**Errors:** All `react/no-unescaped-entities` violations in auto-generated component files:
- `./components/generated/BeregnerEn.tsx` (2 errors)
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (25 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Issue:** Unescaped apostrophes (`'`) in generated JSX content should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Warnings:** 2 in `./components/SplitSection.tsx` about using `<img>` instead of Next.js `<Image />` component for better LCP and bandwidth optimization.

**Note:** These are generated files. Fix the content generation source to properly escape HTML entities.

---

## Security Audit

❌ **25 VULNERABILITIES** (3 low, 15 moderate, 6 high, 1 critical)

### 🔴 CRITICAL ISSUES

**Next.js** (node_modules/next)
- **Severity:** Critical (31+ known CVEs affecting versions < 16.4.3)
- **Current version:** 13.x
- **Key vulnerabilities:**
  - Server-Side Request Forgery (SSRF) in Server Actions and rewrites
  - Remote Code Execution on Windows-hosted servers and via Image Optimization API (AVIF/SVG files)
  - Denial of Service in Image Optimization and Server Components
  - Authorization bypass vulnerabilities
  - Unauthenticated disclosure of internal Server Function endpoints
  - Unauthenticated Remote Code Execution in Image Optimization API
  - Cache poisoning and key confusion
  - Middleware/Proxy bypass in Pages Router (i18n)
  - Content injection in Image Optimization
  - HTTP request smuggling in rewrites
  - XSS via CSP nonces in App Router
  - Unbounded disk cache growth in next/image

**Required fix:** Upgrade to Next.js 16.4.3+ (major version upgrade)

**Status per CLAUDE.md:** "Fixing requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

### 🟠 HIGH-SEVERITY ISSUES

1. **brace-expansion** - 3 DoS vulnerabilities via quadratic-time expansion and uncontrolled recursion
2. **minimatch** - 4 ReDoS vulnerabilities via regex backtracking in glob patterns
3. **postcss** - 4 vulnerabilities: XSS via `</style>`, arbitrary file read, path traversal via sourceMappingURL
4. **source-map-js** - Event-loop DoS via indexed source-map section offsets

### Moderate & Low Issues

- **postcss-selector-parser:** Quadratic complexity in flat selector parsing
- **deepmerge:** Prototype poisoning in mergeObject()
- Plus 15 additional moderate and 3 low severity issues in transitive dependencies

---

## Alerts

- 🔴 **CRITICAL:** Next.js contains critical SSRF, RCE, and DoS vulnerabilities
- 🔴 **CRITICAL:** Lint check failing (79 errors prevent deployment)
- 🟠 **HIGH:** 6 high-severity vulnerabilities in build tools and dependencies
- ⚠️ **WARNING:** 15 moderate-severity vulnerabilities

---

## Recommendations

1. **Immediate (Lint):** Fix generated components to escape HTML entities
   - Source the content generation pipeline for fixes
   - All generated component files need entity escaping

2. **High Priority (Security):** Next.js 13→16+ upgrade is a major product decision
   - Requires comprehensive testing and validation
   - Resolves critical SSRF, RCE, authorization, and DoS vulnerabilities
   - Currently blocked per project guidelines

3. **Medium Priority (Performance):** Replace `<img>` tags in `SplitSection.tsx` with Next.js `<Image />` component

---

## Environment

- **Node.js:** v22.23.4
- **npm:** 10.9.9
- **Dependencies installed:** 418 packages
- **npm vulnerabilities at install time:** 25 (same as audit)
