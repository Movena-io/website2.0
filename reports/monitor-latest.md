# Website Monitor Report

**Run Timestamp:** 2026-09-15 (Current Check)  
**Overall Status:** ⚠️ Warning

---

## Summary

The website builds successfully with no compilation errors. Code quality checks pass with minor warnings. However, the project has critical security vulnerabilities in Next.js and high-severity vulnerabilities in transitive dependencies that require attention.

---

## Build Check: ✅ Success

- **Result:** Compilation successful
- **Output:** All 40 static pages generated successfully
- **Bundle Size:** First Load JS shared: 80.6 kB
- **Issues:** None

---

## Lint Check: ⚠️ Warnings (Non-Blocking)

Found 3 warnings related to image optimization:

1. **MetaPixel.tsx:54** - Using `<img>` instead of Next.js `<Image />`
   - Recommendation: Consider migrating to `next/image` for optimized image handling
   
2. **SplitSection.tsx:93** - Using `<img>` instead of Next.js `<Image />`
   - Recommendation: Consider migrating to `next/image` for optimized image handling
   
3. **SplitSection.tsx:96** - Using `<img>` instead of Next.js `<Image />`
   - Recommendation: Consider migrating to `next/image` for optimized image handling

These are warnings only and do not affect functionality. They can be addressed in a future refactor to improve image loading performance and LCP metrics.

---

## Security Audit: ❌ 5 Vulnerabilities (1 Critical, 4 High)

### Critical Vulnerabilities (1)

**Next.js 0.9.9 - 16.3.0-preview.10** - Critical  
Multiple security issues identified:
- Server-Side Request Forgery (SSRF) in Server Actions
- Denial of Service conditions in image optimization
- Information exposure in dev server (missing origin verification)
- Cache key confusion for Image Optimization API routes
- Authorization bypass vulnerabilities
- Improper Middleware redirect handling (SSRF)
- Content injection in image optimization
- Cache poisoning via race conditions
- Multiple DoS vulnerabilities with Server Components
- Image Optimizer abuse via remotePatterns
- HTTP request smuggling in rewrites
- Unbounded disk cache growth in next/image
- XSS in App Router with CSP nonces
- Cache poisoning via React Server Component collisions
- XSS in beforeInteractive scripts
- Server-side request forgery with WebSocket upgrades
- Middleware/Proxy bypass in i18n configuration
- Unbounded Server Action payload in Edge runtime
- Unauthenticated disclosure of Server Function endpoints
- Unauthenticated RCE on Windows-hosted servers
- Unauthenticated RCE in Image Optimization with AVIF

**Note:** As documented in CLAUDE.md, Next.js 13 is knowingly on a current version and fixing requires a major upgrade to Next 16+. This is a product decision, not a routine maintenance action. Automatic patching via `npm audit fix --force` is not recommended without product team approval.

### High Severity Vulnerabilities (4)

**minimatch 9.0.0 - 9.0.6** - High  
Multiple ReDoS (Regular Expression Denial of Service) vulnerabilities:
- ReDoS via repeated wildcards with non-matching literal in pattern
- ReDoS via matchOne() combinatorial backtracking with multiple GLOBSTAR segments
- ReDoS via nested extglobs generating catastrophically backtracking regex

**Affected through:** @typescript-eslint/typescript-estree → @typescript-eslint/parser  
**Fix available:** `npm audit fix`

**PostCSS ≤8.5.22** - High  
Multiple information disclosure and injection vulnerabilities:
- XSS via unescaped `</style>` in CSS stringify output
- Arbitrary file read via attacker-controlled sourceMappingURL
- Path traversal in source map auto-loading
- Incomplete fix of prior sourceMappingURL vulnerability

**Affected through:** next/node_modules/postcss  
**Fix available:** `npm audit fix --force` (requires Next.js upgrade to 16.3.5, a breaking change)

---

## Dependency Status

- **Total Packages:** 423 audited
- **Funding Available:** 154 packages available for funding
- **Last Updated:** Dependencies are up-to-date

---

## Recommendations

### Immediate (If Applicable)
1. **Minimatch ReDoS vulnerabilities:** Can be patched via `npm audit fix` (patches to @typescript-eslint packages)
2. **Review PostCSS exposure:** Assess if your application actually uses features vulnerable to the disclosed PostCSS issues

### Future (Product Decision Required)
1. **Next.js Major Upgrade:** Plan migration from Next.js 13 to 16+ to address critical vulnerabilities
   - This requires thorough testing and is a breaking change
   - Timeline should be determined by product team based on security risk assessment
   - Consider staging the upgrade in a separate branch for testing

### Code Quality (Optional)
1. **Image optimization:** Migrate `<img>` tags to Next.js `<Image />` component in:
   - components/MetaPixel.tsx
   - components/SplitSection.tsx

---

## Build Environment

- **Node Packages:** 423 total (up to date)
- **Build Command:** `npm run build` (Next.js)
- **Lint Command:** `next lint` (ESLint)
- **Audit Tool:** npm audit

---

## Status Explanation

**⚠️ Warning** status is set because:
- Critical vulnerabilities exist in Next.js (known technical debt)
- High-severity vulnerabilities in transitive dependencies (minimatch, postcss)
- Build and lint pass successfully (functional status OK)
- Per CLAUDE.md, Next.js version is intentionally held pending major upgrade decision

The website is currently deployable and functional, but security vulnerabilities should be tracked for remediation in the next planning cycle.
