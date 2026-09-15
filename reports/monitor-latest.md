# Website Health Monitor Report

**Run Time:** 2026-09-15 10:11:51 UTC  
**Overall Status:** ⚠️ Warning — Build healthy, lint warnings present, critical vulnerabilities in Next.js deferred by product decision

---

## Summary

The website2.0 project builds and lints successfully with no errors. All 40 static pages compile without issues. However, there are 5 npm security vulnerabilities (1 critical, 4 high) present in core dependencies. Per CLAUDE.md, Next.js and PostCSS are intentionally kept at current versions as a major upgrade to Next.js 13→16 is required—this is a product decision, not a monitor action. Minor lint warnings exist regarding image optimization best practices.

---

## Detailed Results

### Build: ✅ Passing

**Command:** `npm run build`  
**Status:** Compiled successfully with zero build errors

- **Pages Generated**: 40 static pages
- **Performance Metrics**:
  - Shared First Load JS: 80.6 kB
  - Largest chunk: 27.5 kB (chunks/472-28ec35b8e2b527de.js)
  - Route-specific sizes: 15–19 kB for main routes
  - Middleware: 27 kB
- **Routes Summary**: 
  - 2 locales (en, da)
  - Blog with 21 posts
  - Main pages: Contact, Privacy, Terms, Savings Calculator
  - API endpoints: /api/calculator/submit, /api/contact
  - Static files: robots.txt, sitemap.xml
- **Type Checking**: ✅ Valid (no TypeScript errors)

### Lint: ⚠️ Minor Warnings (3)

**Command:** `npm run lint`  
**Status:** 3 warnings, 0 errors

All warnings relate to image optimization best practices:

| File | Line | Issue | Recommendation |
|------|------|-------|-----------------|
| `components/MetaPixel.tsx` | 54 | `<img>` should use `<Image />` from next/image | Improves LCP and reduces bandwidth |
| `components/SplitSection.tsx` | 93 | `<img>` should use `<Image />` from next/image | Improves LCP and reduces bandwidth |
| `components/SplitSection.tsx` | 96 | `<img>` should use `<Image />` from next/image | Improves LCP and reduces bandwidth |

**Impact:** Low. These are performance best-practice suggestions, not blocking errors. Code is functional and will compile without issues. Recommended for future optimization pass.

### Security Audit: ⚠️ 5 Vulnerabilities (1 Critical, 4 High)

**Command:** `npm audit`  
**Total Packages Audited:** 423  
**Result:** 5 vulnerabilities (1 critical, 4 high)

#### Critical (1)

**Package**: `next@13.5.6` (Direct dependency)  
**Vulnerable Range:** 0.9.9 through 16.3.0-preview.10  
**Fix Available:** Yes, via `npm audit fix --force` → Next.js 16.3.5 (breaking change)

**Primary Critical/High Vulnerabilities:**
- **Server-Side Request Forgery (SSRF)** in Server Actions (GHSA-fr5h-rqp8-mj6g, CVSS 7.5)
- **Remote Code Execution (RCE)** on Windows-hosted servers (GHSA-p293-qw3h-jr36)
- **Denial of Service** via Server Components deserialization (GHSA-h25m-26qc-wcjf, CVSS 7.5)
- **Multiple DoS** in Server Components payload handling (GHSA-mwv6-3258-q52c, GHSA-5j59-xgg2-r9c4, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj, all CVSS 7.5)
- **SSRF via WebSocket upgrades** (GHSA-c4j6-fc7j-m34r, CVSS 8.6)
- **Middleware/Proxy bypasses** (GHSA-36qx-fr4f-26g5, GHSA-4342-x723-ch2f)
- **Image Optimization DoS and cache poisoning** (multiple GHSA)
- **Cache confusion** (GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q)
- **HTTP request smuggling** (GHSA-ggv3-7p47-pfv8)
- **Information disclosure** (GHSA-3h52-269p-cp9r, GHSA-955p-x3mx-jcvp)
- **XSS vulnerabilities** (GHSA-ffhc-5mcf-pf4q, GHSA-gx5p-jg67-6x7h)
- **Unbounded disk cache growth** (GHSA-3x4c-7xq6-9pq8)

**Status**: ⚠️ **INTENTIONALLY DEFERRED** — Per CLAUDE.md: *"Next.js and its nested PostCSS are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action."*

#### High (4)

**Minimatch (Transitive via @typescript-eslint)**

| Aspect | Details |
|--------|---------|
| Path | `@typescript-eslint/parser` → `@typescript-eslint/typescript-estree` → `minimatch` |
| Vulnerable Version | 9.0.0–9.0.6 |
| Severity | High (ReDoS - Regular Expression Denial of Service) |
| CVEs | GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj (CVSS 7.5), GHSA-23c5-xmqv-rm74 (CVSS 7.5) |
| Impact | Regex evaluation hangs on certain glob patterns; affects build tooling |
| Fixable | **Yes, independently** via `package.json` overrides without Next.js upgrade |
| Status | Recommended for patching |

**@typescript-eslint/typescript-estree & @typescript-eslint/parser**

| Aspect | Details |
|--------|---------|
| Severity | High (due to minimatch dependency) |
| Status | Will be fixed when minimatch is patched |
| Dev-Only | Yes (not in production bundle) |

**PostCSS (Nested in Next.js)**

| Aspect | Details |
|--------|---------|
| Vulnerable Version | ≤8.5.22 |
| Severity | High |
| CVEs | GHSA-qx2v-qp2m-jg93 (XSS), GHSA-6g55-p6wh-862q (path traversal), GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 |
| Issues | XSS via unescaped `</style>`; arbitrary file read via sourceMappingURL |
| Fix Required | Next.js 16+ upgrade only |
| Status | Deferred with Next.js upgrade |

---

## Recommendations

### Immediate (Non-Breaking)

1. **Patch Minimatch ReDoS** — Can be fixed independently without Next.js upgrade:
   ```json
   "overrides": {
     "@typescript-eslint/typescript-estree": {
       "minimatch": ">=9.0.7"
     }
   }
   ```
   Then run `npm install`. Eliminates 3 ReDoS vulnerabilities affecting build tooling. Dev-only dependency; no production impact.

2. **Optimize Image Components** — Convert 3 `<img>` elements to Next.js `<Image />`:
   - `components/MetaPixel.tsx:54`
   - `components/SplitSection.tsx:93`
   - `components/SplitSection.tsx:96`
   
   Benefits: Improved LCP (Largest Contentful Paint) and reduced bandwidth. Low priority; not blocking.

### Deferred (Product Decision)

**Next.js 13 → 16 Major Upgrade** — Addresses all critical and high-severity vulnerabilities in Next.js and PostCSS. Requires:
- Major version bump (13 → 16) with breaking changes
- Full testing against Movena product integration
- Verification of all 40 routes, API endpoints, and middleware
- Assessment of CSS processing changes with PostCSS upgrade
- Validation of build performance and output
- Significant engineering effort and QA cycle

**Status:** This is intentionally deferred per CLAUDE.md and represents a product roadmap decision, not an automated monitor action. `npm audit fix --force` should NOT be run without product and engineering approval.

---

## Vulnerability Summary

**Breakdown by Impact:**
- **1 Critical vulnerability** (Next.js) — 18+ underlying CVEs with high to low severity
- **4 High vulnerabilities** — minimatch (ReDoS, 3 CVEs), PostCSS (XSS/path traversal), @typescript-eslint (2 packages)
- **6 Moderate vulnerabilities** — various Next.js nested (Image Optimization, middleware, cache, HTTP)
- **5 Low vulnerabilities** — Next.js nested (race condition, cache poisoning, CSP, etc.)

**Vulnerable Dependency Chains:**
- `minimatch@9.0.0-9.0.6` ← `@typescript-eslint/typescript-estree` ← `@typescript-eslint/parser` (dev-only)
- `postcss@≤8.5.22` (bundled in next.js) ← `next@13.5.6` (core)
- Multiple Next.js nested vulnerabilities in image optimization, server components, middleware, rewrites

---

## Dependency Summary

- **Total Packages Audited:** 423
- **Status:** Up to date
- **Vulnerabilities:** 5 (1 critical, 4 high)
- **Fixable via npm audit fix:** Only with breaking changes (Next.js 13 → 16)
- **Independently Fixable:** Minimatch (via overrides)
- **Packages Requesting Funding:** 154

---

## Deployment Status

- ✅ **Build:** Passes without errors; all 40 pages generated successfully
- ✅ **Lint:** No blocking errors; 3 minor performance suggestions
- ⚠️ **Security:** 5 vulnerabilities present; critical ones documented and intentionally deferred
- ✅ **Ready for Deployment:** Known security risks are tracked and deferred via product decision
- 📋 **Action Items:** Minimatch patch (optional), lint warnings (low priority), Next.js upgrade (product roadmap)
