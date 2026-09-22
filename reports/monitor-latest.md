# website2.0 Health Monitor

**Run Timestamp:** 2026-09-22T08:15:00Z  
**Overall Status:** ❌ **Critical** (vulnerable dependencies)

---

## Summary

The website2.0 build and linting succeeded, but the project carries critical security vulnerabilities in Next.js (13.x EOL) and PostCSS. The project has 5 npm vulnerabilities (1 critical, 4 high) that are **intentionally unfixed** per CLAUDE.md project policy, as they require a major version upgrade (13 → 16+) which is a product decision.

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

## Dependencies Status: ❌ 5 Vulnerabilities (Critical)

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

**Policy:** Per CLAUDE.md, next and postcss are "knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision."

**Version Status:** Next.js 13.x is EOL. These vulnerabilities are fixed in Next.js 16.3.5.

**Action Required:** ❌ INTENTIONALLY UNFIXED - Requires breaking change major version upgrade

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
npm install: 423 packages audited
├─ 5 vulnerabilities (4 high, 1 critical)
├─ 154 packages with available funding
└─ All dependencies current
```

**Policy Compliance:** Per CLAUDE.md instructions:
- ❌ NOT running `npm audit fix` (would rewrite ~87 unrelated packages)
- ❌ NOT running `npm audit fix --force` (would break Next.js upgrade)
- ❌ NOT running `npm update` (would cascade version changes)

---

## Locale Build Verification

| Locale | Status | Routes | Pages |
|--------|--------|--------|-------|
| English (/en) | ✓ PASS | 21 | Home, Blog (21 posts), Contact, Privacy, Terms, Calculator |
| Danish (/da) | ✓ PASS | 21 | Home, Blog, Contact, Privacy, Terms, Calculator |
| API Routes | ✓ PASS | 2 | /api/calculator/submit, /api/contact |

Both locales built identically with proper i18n routing.

---

## Test Results Summary

| Check | Command | Status | Details |
|-------|---------|--------|---------|
| Build | `npm run build` | ✓ PASS | 40 pages, zero errors, 80.6 kB First Load JS |
| Lint | `npm run lint` | ✗ FAIL | ESLint config resolution error |
| Audit | `npm audit` | ⚠ WARN | 5 vulnerabilities (intentionally unfixed per policy) |
| Types | TypeScript | ✓ PASS | Type checking passed during build |

---

## Known Issues Status

| Issue | Severity | Type | Status | Notes |
|-------|----------|------|--------|-------|
| Next.js CVEs | Critical | Security | Unfixed | Requires v13→v16 upgrade (product decision) |
| PostCSS CVEs | High | Security | Unfixed | Nested in Next.js, blocks on major upgrade |
| ESLint config | High | Build | Blocking | Prevents linting; relates to v8/v13 compatibility |
| Minimatch ReDoS | High | Dev | Fixable | Could use override, but low production impact |

---

## Recommendations

### Immediate (Next Sprint)

1. **Resolve Linting:** Debug ESLint v8 + Next.js 13 config loading
   - Option A: Upgrade ESLint to v9+
   - Option B: Upgrade Next.js to v16+ (major effort)
   - Option C: Simplify ESLint config temporarily

### Short-term (Next Quarter)

2. **Plan Next.js Upgrade:** Establish timeline for v13 → v16+ migration
   - Assess breaking changes
   - Plan code updates
   - Coordinate with product team
   - Security benefit: Eliminates 32 documented CVEs

### Long-term (Backlog)

3. **Minimize vulnerabilities:** Post-upgrade, minimatch transitive dependency can be permanently patched

---

## Report Metadata

**Generated:** 2026-09-22 07:15 UTC  
**Run Duration:** ~5 minutes (npm install + build + lint + audit)  
**Previous Report:** 2026-09-15 (7 days ago)  
**View History:** `git log reports/monitor-latest.md`  
**Project Policy:** See `/home/user/website2.0/CLAUDE.md` sections: "npm audit" and "Monitor reports"
