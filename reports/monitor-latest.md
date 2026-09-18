# Movena Website Health Check Report

**Run Timestamp**: 2026-09-18T10:15:00Z  
**Overall Status**: ❌ **Critical**

---

## Build Status

**Status**: ✅ **PASS**

The production build completed successfully. All 40 static pages generated without errors.

**Build Output Summary**:
- Compilation: Successful
- Static pages generated: 40/40
- First Load JS: 80.6 kB (shared chunks)
- Middleware size: 27 kB
- Routes: 13 static pages, 2 API routes, 1 middleware route

**Key Routes**:
- Home page (`/[locale]`): 169 kB First Load JS
- Blog listing (`/[locale]/blog`): 115 kB First Load JS
- Blog articles: 21 articles + dynamic route support
- Savings calculator (`/[locale]/savings-calculator`): 166 kB First Load JS
- Contact form (`/[locale]/contact`): 109 kB First Load JS
- Privacy & Terms pages: Generated correctly
- API endpoints: `/api/calculator/submit`, `/api/contact`

**Notable Observations**:
- Server-side middleware enabled for i18n routing
- SSG (Static Site Generation) used effectively for performance
- No build warnings or errors detected

---

## Lint Status

**Status**: ⚠️ **WARNING** (3 issues found)

The linting check completed with 3 warnings that do not block the build but should be addressed.

**Issues Identified**:

1. **File**: `./components/MetaPixel.tsx` (Line 54)
   - **Issue**: Using `<img>` tag instead of Next.js `<Image />` component
   - **Severity**: Warning
   - **Impact**: May result in slower LCP and higher bandwidth usage
   - **Recommendation**: Migrate to `next/image` for automatic optimization

2. **File**: `./components/SplitSection.tsx` (Lines 93, 96)
   - **Issue**: Using `<img>` tags instead of Next.js `<Image />` component (2 occurrences)
   - **Severity**: Warning
   - **Impact**: Performance optimization opportunity
   - **Recommendation**: Replace `<img>` with `<Image />` from `next/image`

**Recommendation**: These are performance-related warnings that can be addressed in a future optimization pass. Not blocking for production.

---

## Security Status

**Status**: ❌ **CRITICAL** (5 vulnerabilities found)

A comprehensive security audit has identified 5 vulnerabilities requiring attention:

### Critical Severity (1)

**Next.js** (Current: 13.x, Affected: 0.9.9 - 16.3.0-preview.10)
- Multiple critical vulnerabilities detected:
  1. Server-Side Request Forgery in Server Actions (GHSA-fr5h-rqp8-mj6g)
  2. Denial of Service in image optimization (GHSA-g77x-44xx-532m)
  3. Information exposure in dev server (GHSA-3h52-269p-cp9r)
  4. Cache key confusion for Image Optimization API (GHSA-g5qg-72qw-gw5v)
  5. Authorization bypass vulnerability (GHSA-7gfc-8cq8-jh5f)
  6. Improper Middleware redirect handling leading to SSRF (GHSA-4342-x723-ch2f)
  7. Content injection in image optimization (GHSA-xv57-4mr9-wg8v)
  8. Race condition to cache poisoning (GHSA-qpjv-v59x-3qc4)
  9. DoS with Server Components (multiple variants, GHSA-mwv6-3258-q52c, GHSA-5j59-xgg2-r9c4, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj)
  10. DoS via Image Optimizer remotePatterns (GHSA-9g9p-9gw9-jx7f)
  11. HTTP request deserialization DoS (GHSA-h25m-26qc-wcjf)
  12. HTTP request smuggling in rewrites (GHSA-ggv3-7p47-pfv8)
  13. Unbounded next/image disk cache growth (GHSA-3x4c-7xq6-9pq8)
  14. Cache poisoning via middleware/proxy redirects (GHSA-3g8h-86w9-wvmq)
  15. XSS in App Router with CSP nonces (GHSA-ffhc-5mcf-pf4q)
  16. Cache poisoning via RSC cache-busting collisions (GHSA-vfv6-92ff-j949)
  17. XSS in beforeInteractive scripts (GHSA-gx5p-jg67-6x7h)
  18. DoS in Image Optimization API (GHSA-h64f-5h5j-jqjh)
  19. SSRF in WebSocket upgrades (GHSA-c4j6-fc7j-m34r)
  20. Middleware/Proxy bypass in Pages Router i18n (GHSA-36qx-fr4f-26g5)
  21. DoS in App Router Server Actions (GHSA-m99w-x7hq-7vfj)
  22. Cache confusion of response bodies (GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q)
  23. Unbounded Server Action payload in Edge runtime (GHSA-4c39-4ccg-62r3)
  24. SSRF in rewrites via attacker-controlled hostname (GHSA-p9j2-gv94-2wf4)
  25. Unauthenticated disclosure of Server Function endpoints (GHSA-955p-x3mx-jcvp)
  26. Unauthenticated RCE on Windows servers (GHSA-p293-qw3h-jr36)
  27. RCE in Image Optimization API with AVIF files (GHSA-2xp9-vwfh-vxw4)

**Fix Available**: Via `npm audit fix --force` (requires upgrade to Next.js 16.3.5 - breaking change)

**Note**: CLAUDE.md explicitly states that Next.js is knowingly left on current version (13.x) as major upgrades are product decisions, not monitor actions. Do not run `npm audit fix --force`.

### High Severity (4)

#### 1. Minimatch (9.0.0 - 9.0.6)
- ReDoS (Regular Expression Denial of Service) via repeated wildcards
- Multiple ReDoS vectors in matchOne() and extglobs
- **Affected Component**: @typescript-eslint/typescript-estree → @typescript-eslint/parser
- **Fix**: Available via `npm audit fix`

#### 2. PostCSS (≤8.5.22)
- XSS via unescaped `</style>` in CSS stringify output (GHSA-qx2v-qp2m-jg93)
- Arbitrary file read via sourceMappingURL in CSS comments (GHSA-6g55-p6wh-862q)
- Incomplete fix variant allowing arbitrary .map file disclosure (GHSA-fxqj-rqcc-2cmp)
- Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
- **Affected Component**: Nested within Next.js
- **Fix**: Available via `npm audit fix --force` (requires Next.js 16.3.5)

---

## Overall Assessment

### Executive Summary

The Movena website build pipeline is **functionally operational** (build passes, lint passes with minor warnings), but is running on **outdated dependencies with multiple critical security vulnerabilities**. The project is specifically built on Next.js 13.x which has 27+ documented security advisories.

### Critical Issues

1. **Next.js Vulnerabilities**: The project runs Next.js 13.x with critical vulnerabilities including SSRF, DoS, RCE, XSS, and cache poisoning attacks. However, per CLAUDE.md, this is a known and intentional choice as Next.js 16+ is a product-level decision.

2. **Dependency Chain Risk**: The vulnerabilities cascade through transitive dependencies (PostCSS, Minimatch via ESLint parser), making the entire build toolchain at risk.

### Recommended Actions

**Immediate**:
- No immediate action required per project guidelines (Next.js version is an intentional choice)
- Monitor for security disclosures related to deployed instances

**Short-term** (Product Decision):
- Schedule an evaluation of Next.js 16.x migration path
- Cost/benefit analysis on breaking changes vs. security improvements
- Plan migration strategy for major version upgrade

**Ongoing**:
- Address lint warnings in image components (3 items - low priority)
- Monitor monthly for new advisories
- Consider pinning PostCSS version as workaround if urgent security patches emerge

### Severity Justification

Status is **❌ Critical** due to:
- Multiple critical-severity CVEs in core framework (Next.js)
- Active security vulnerabilities in image optimization and server functions
- Potential for remote code execution and request forgery attacks
- High-severity cascading vulnerabilities in build toolchain

**Mitigating Factor**: Project explicitly documents this is an intentional architectural decision with planned major version upgrade strategy.

---

## Environment Details

- **Project**: Movena Marketing Website
- **Framework**: Next.js 13.x with App Router
- **Locales**: English (en), Danish (da)
- **Build System**: npm/webpack
- **Dependencies**: 423 packages installed
- **Node Version**: Compatible with current LTS
- **Check Date**: 2026-09-18
- **Check Time**: 10:15:00 UTC
