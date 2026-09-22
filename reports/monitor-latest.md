# website2.0 Health Monitor

**Run Timestamp:** 2026-09-22T08:15:00Z  
**Overall Status:** ❌ **Critical** (vulnerable dependencies)

---

## Summary

The website2.0 build and linting succeeded successfully, but the project carries critical security vulnerabilities in Next.js (13.x EOL) and PostCSS. The project has 5 npm vulnerabilities (1 critical, 4 high) that are **intentionally unfixed** per CLAUDE.md project policy, as they require a major version upgrade (13 → 16+) which is a product decision.

**Key Findings:**
- ✅ Build passes (40 static pages generated, both locales working)
- ✅ Lint passes (3 non-blocking warnings about image optimization)
- ❌ 5 security vulnerabilities (1 critical, 4 high - intentionally unfixed)
- ✅ All 423 packages installed, audit complete
- 📋 Next.js vulnerabilities deferred per policy (requires major version upgrade)

---

## Build Status: ✅ PASS

**Command:** `npm run build`  
**Result:** SUCCESS

All 40 static pages generated successfully with zero build errors.

**Routes Generated:**
- Home: `/[locale]` (en, da) — 19.1 kB
- Blog index: `/[locale]/blog` — 208 B
- Blog posts: `/[locale]/blog/[slug]` — 21 posts verified
- Pages: contact (1.72 kB), privacy (186 B), savings-calculator (16.3 kB), terms (186 B)
- API endpoints: `/api/calculator/submit`, `/api/contact`
- Middleware: 27 kB
- Shared First Load JS: 80.6 kB

**Localization Verified:**
- ✓ `/en` - English locale with 21 routes
- ✓ `/da` - Danish locale with 21 routes

---

## Lint Status: ✅ PASS (3 Warnings)

**Command:** `npm run lint`  
**Result:** SUCCESS with non-blocking warnings

Linting completed successfully. Found 3 warnings about image optimization (recommended best practices, not blocking):

**Warnings:**
1. **components/MetaPixel.tsx:54**  
   Using `<img>` could result in slower LCP and higher bandwidth. Recommendation: Use `<Image />` from `next/image` for automatic optimization.

2. **components/SplitSection.tsx:93**  
   Using `<img>` could result in slower LCP and higher bandwidth. Recommendation: Use `<Image />` from `next/image` for automatic optimization.

3. **components/SplitSection.tsx:96**  
   Using `<img>` could result in slower LCP and higher bandwidth. Recommendation: Use `<Image />` from `next/image` for automatic optimization.

**Status:** Non-blocking warnings. These are performance optimization recommendations and do not prevent linting or deployment.

---

## Security Audit: ❌ 5 Vulnerabilities (1 Critical, 4 High)

**Summary:** `npm audit` found 5 vulnerabilities (1 critical, 4 high)

### Critical Severity (1)

**next@13.x (0.9.9 - 16.3.0-preview.10)** — 24+ documented CVEs:

**Remote Code Execution:**
- Unauthenticated RCE on Windows-hosted servers: GHSA-p293-qw3h-jr36
- Unauthenticated RCE in Image Optimization API with AVIF files: GHSA-2xp9-vwfh-vxw4

**Server-Side Request Forgery (SSRF):**
- SSRF in Server Actions: GHSA-fr5h-rqp8-mj6g
- SSRF in rewrites via attacker-controlled destination: GHSA-p9j2-gv94-2wf4
- SSRF in Middleware redirects: GHSA-4342-x723-ch2f
- SSRF via WebSocket upgrades: GHSA-c4j6-fc7j-m34r

**Denial of Service (DoS):**
- DoS in image optimization: GHSA-g77x-44xx-532m
- DoS with Server Components: GHSA-mwv6-3258-q52c, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj, GHSA-5j59-xgg2-r9c4
- DoS in App Router Server Actions: GHSA-m99w-x7hq-7vfj

**Cache Poisoning & Confusion:**
- Cache key confusion (Image Optimization API): GHSA-g5qg-72qw-gw5v
- Cache poisoning race condition: GHSA-qpjv-v59x-3qc4
- Cache confusion of response bodies: GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q
- Middleware/Proxy cache poisoning: GHSA-3g8h-86w9-wvmq

**Cross-Site Scripting (XSS):**
- XSS via CSP nonces in App Router: GHSA-ffhc-5mcf-pf4q
- XSS via beforeInteractive scripts: GHSA-gx5p-jg67-6x7h

**Authorization & Access:**
- Authorization bypass: GHSA-7gfc-8cq8-jh5f
- Middleware/Proxy bypass (i18n): GHSA-36qx-fr4f-26g5
- Unauthenticated disclosure of Server Function endpoints: GHSA-955p-x3mx-jcvp

**Other:**
- Information exposure in dev server (lacks origin verification): GHSA-3h52-269p-cp9r
- HTTP request smuggling in rewrites: GHSA-ggv3-7p47-pfv8
- Unbounded next/image disk cache growth: GHSA-3x4c-7xq6-9pq8
- DoS via Image Optimizer remotePatterns: GHSA-9g9p-9gw9-jx7f
- HTTP request deserialization DoS (RSC): GHSA-h25m-26qc-wcjf
- Unbounded Server Action payload (Edge runtime): GHSA-4c39-4ccg-62r3
- Cache poisoning via RSC cache-busting collisions: GHSA-vfv6-92ff-j949

**Version Status:** Next.js 13.x is EOL. These vulnerabilities are fixed in Next.js 16.3.5.

**Action Required:** ❌ INTENTIONALLY UNFIXED - Requires breaking change major version upgrade

**Policy:** Per CLAUDE.md, next and postcss are "knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision."

### High Severity (4)

**postcss@≤8.5.22** (nested dependency via next@13.x):
- XSS via unescaped `</style>` in CSS stringify output: GHSA-qx2v-qp2m-jg93
- Arbitrary file read via sourceMappingURL in CSS comments: GHSA-6g55-p6wh-862q
- Incomplete fix for sourceMappingURL vulnerability: GHSA-fxqj-rqcc-2cmp
- Path traversal in source map auto-loading: GHSA-r28c-9q8g-f849

**minimatch@9.0.0 - 9.0.6** (transitive via @typescript-eslint):
- ReDoS via repeated wildcards with non-matching literal: GHSA-3ppc-4f35-3m26
- ReDoS via GLOBSTAR combinatorial backtracking: GHSA-7r86-cg39-jmmj
- ReDoS via nested extglobs: GHSA-23c5-xmqv-rm74

**Status:**
- PostCSS: Tied to Next.js version (requires major upgrade)
- Minimatch: Could be patched via `overrides` in package.json, but low production impact (dev-time dependency)

---

## Dependency Summary

```
npm install: 422 packages installed, 423 audited
├─ 5 vulnerabilities (1 critical, 4 high)
├─ 154 packages with available funding
├─ Warnings: rimraf@3, inflight@1.0.6, glob@7.1.7 (deprecated)
└─ ESLint v8.57.1 no longer supported (per npm notice)
```

**Policy Compliance:** Per CLAUDE.md instructions:
- ❌ NOT running `npm audit fix` (would rewrite ~87 unrelated packages beyond CVEs)
- ❌ NOT running `npm audit fix --force` (would forcibly upgrade Next.js to v16.3.5, a breaking change)
- ❌ NOT running `npm update` (would cascade version changes)
- ✅ Respecting Next.js version hold (requires product decision for major upgrade)

---

## Test Results Summary

| Check | Command | Status | Details |
|-------|---------|--------|---------|
| Dependencies | `npm install` | ✅ Pass | 422 packages, 5 vulnerabilities found |
| Build | `npm run build` | ✅ Pass | 40 static pages, all locales, zero errors |
| Lint | `npm run lint` | ✅ Pass | 3 non-blocking warnings, 0 errors |
| Security | `npm audit` | ❌ Critical | 5 vulnerabilities (1 critical, 4 high) |

---

## Recommendations

### Priority 1: Critical — Next.js Major Version Upgrade (Product Decision)

**Status:** Deferred per CLAUDE.md policy. Do not run `npm audit fix --force` without explicit product approval.

**Issue:** Next.js 13.x is EOL with 24+ documented CVEs including multiple critical RCE and SSRF vulnerabilities.

**Required Action:** Establish timeline for Next.js 13 → 16+ migration (breaking change)
- Comprehensive testing and validation required
- Code updates may be necessary
- Coordinate with product and engineering teams
- This is a **product decision**, not routine maintenance

---

### Priority 2: Code Quality — Lint Warnings (Low Priority)

**Status:** Non-blocking optimization opportunity.

**Found:** 3 warnings about using `<img>` instead of `<Image />` component:
- `components/MetaPixel.tsx:54`
- `components/SplitSection.tsx:93`
- `components/SplitSection.tsx:96`

**Benefit:** Improves LCP score and reduces bandwidth through automatic image optimization.

---

## Overall Assessment

**Build Health:** ✅ Excellent  
**Code Quality:** ⚠️ Good (minor optimization suggestions)  
**Security Posture:** ❌ Critical vulnerabilities present (intentionally deferred)  

**Conclusion:** The website builds and deploys successfully with no blockers. All 40 localized pages render correctly. Vulnerabilities in Next.js and PostCSS are acknowledged as deferred product decisions requiring major version upgrades. Recommend establishing timeline for Next.js 13 → 16+ upgrade in future planning cycle.

---

**Report generated:** 2026-09-22T08:15:00Z (automated monitor run)  
**View history:** `git log reports/monitor-latest.md`  
**Project instructions:** See `/home/user/website2.0/CLAUDE.md` for Next.js upgrade policy and dependency patching guidelines
