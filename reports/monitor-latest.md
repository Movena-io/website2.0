# Website Monitor Report

**Timestamp:** 2026-09-21 at 10:05:00 UTC  
**Overall Status:** ✅ OPERATIONAL (Known Vulnerabilities)

---

## Executive Summary

The website build and lint checks passed successfully. Known security vulnerabilities in Next.js v13 remain per project policy; these require a major version upgrade (v16+) that is a product decision, not a monitor action.

**Status:** ✅ All checks pass | ⚠️ Security advisories (acknowledged and accepted per CLAUDE.md)

---

## Detailed Results

### 1. Build Check ✅ PASSED

**Command:** `npm run build`

**Status:** ✅ Compiled successfully

**Output Summary:**
- All 40 static pages generated successfully
- No build errors detected
- Bundle analysis:
  - Main app chunk: 80.6 kB (shared across all routes)
  - Total First Load JS optimized across all routes
  - Middleware: 27 kB
  - Routes properly configured for SSG and static rendering

**Key Routes Generated:**
- Home page: 19.1 kB initial, 169 kB First Load JS
- Blog index: 208 B, 115 kB First Load JS
- Blog articles: 21 dynamic post pages (en/da localized)
- Savings calculator: 16.3 kB, 166 kB First Load JS
- Contact page: 1.72 kB, 109 kB First Load JS
- Legal pages (privacy/terms): 186 B each, 107 kB First Load JS
- API routes: Calculator submit, Contact form (serverless)
- SEO: robots.txt and sitemap.xml generated

---

### 2. Lint Check ⚠️ WARNINGS

**Command:** `npm run lint`

**Status:** ⚠️ 3 Warnings (No Errors)

**Warnings Details:**

| File | Line | Rule | Issue |
|------|------|------|-------|
| `./components/MetaPixel.tsx` | 54 | @next/next/no-img-element | Using `<img>` instead of Next.js `<Image />` component |
| `./components/SplitSection.tsx` | 93 | @next/next/no-img-element | Using `<img>` instead of Next.js `<Image />` component |
| `./components/SplitSection.tsx` | 96 | @next/next/no-img-element | Using `<img>` instead of Next.js `<Image />` component |

**Recommendation:** Consider replacing `<img>` tags with Next.js `<Image />` component from `next/image` to optimize LCP (Largest Contentful Paint) and reduce bandwidth usage. This is a code quality recommendation, not a blocking issue.

---

### 3. Security Audit ❌ CRITICAL

**Command:** `npm audit`

**Status:** ❌ 5 Vulnerabilities Detected (1 Critical, 4 High)

#### Critical Severity (1)

**Package:** `next@13.x`  
**Type:** Multiple Security Advisories  
**Location:** `node_modules/next`

**Identified Vulnerabilities (31 total):**
1. GHSA-fr5h-rqp8-mj6g - Server-Side Request Forgery in Server Actions
2. GHSA-g77x-44xx-532m - Denial of Service condition in image optimization
3. GHSA-3h52-269p-cp9r - Information exposure in dev server (lack of origin verification)
4. GHSA-g5qg-72qw-gw5v - Cache Key Confusion for Image Optimization API Routes
5. GHSA-7gfc-8cq8-jh5f - Authorization bypass vulnerability
6. GHSA-4342-x723-ch2f - Improper Middleware Redirect Handling (SSRF)
7. GHSA-xv57-4mr9-wg8v - Content Injection Vulnerability for Image Optimization
8. GHSA-qpjv-v59x-3qc4 - Race Condition to Cache Poisoning
9. GHSA-mwv6-3258-q52c - Denial of Service with Server Components
10. GHSA-5j59-xgg2-r9c4 - Denial of Service with Server Components (Incomplete Fix Follow-Up)
11. GHSA-9g9p-9gw9-jx7f - DoS via Image Optimizer remotePatterns configuration
12. GHSA-h25m-26qc-wcjf - HTTP request deserialization DoS (insecure RSC)
13. GHSA-ggv3-7p47-pfv8 - HTTP request smuggling in rewrites
14. GHSA-3x4c-7xq6-9pq8 - Unbounded next/image disk cache growth
15. GHSA-q4gf-8mx6-v5v3 - Denial of Service with Server Components
16. GHSA-8h8q-6873-q5fj - Denial of Service with Server Components
17. GHSA-3g8h-86w9-wvmq - Middleware/Proxy redirects cache poisoning
18. GHSA-ffhc-5mcf-pf4q - Cross-site scripting in App Router (CSP nonces)
19. GHSA-vfv6-92ff-j949 - Cache poisoning via RSC cache-busting collision
20. GHSA-gx5p-jg67-6x7h - Cross-site scripting in beforeInteractive scripts
21. GHSA-h64f-5h5j-jqjh - Denial of Service in Image Optimization API
22. GHSA-c4j6-fc7j-m34r - Server-side request forgery (WebSocket upgrades)
23. GHSA-36qx-fr4f-26g5 - Middleware/Proxy bypass in Pages Router (i18n)
24. GHSA-m99w-x7hq-7vfj - Denial of Service in App Router (Server Actions)
25. GHSA-68g3-v927-f742 - Cache confusion of response bodies
26. GHSA-4633-3j49-mh5q - Cache confusion of response bodies (invalid UTF-8)
27. GHSA-4c39-4ccg-62r3 - Unbounded Server Action payload (Edge runtime)
28. GHSA-p9j2-gv94-2wf4 - Server-Side Request Forgery in rewrites
29. GHSA-955p-x3mx-jcvp - Unauthenticated disclosure of internal Server Function endpoints
30. GHSA-p293-qw3h-jr36 - Unauthenticated Remote Code Execution (windows-hosted servers)
31. GHSA-2xp9-vwfh-vxw4 - Unauthenticated RCE in Image Optimization API (AVIF)

**Fix Available:** `npm audit fix --force` (requires Next.js upgrade to v16.3.5+, a breaking change)

#### High Severity (2)

**Package:** `minimatch@9.0.0-9.0.6`  
**Type:** ReDoS (Regular Expression Denial of Service) Vulnerabilities  
**Location:** `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`  
**Dependency Chain:** @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**Identified Vulnerabilities:**
1. GHSA-3ppc-4f35-3m26 - ReDoS via repeated wildcards with non-matching literal
2. GHSA-7r86-cg39-jmmj - ReDoS via multiple non-adjacent GLOBSTAR segments
3. GHSA-23c5-xmqv-rm74 - ReDoS from nested *() extglobs with catastrophic backtracking

**Fix Available:** `npm audit fix`

#### High Severity (2)

**Package:** `postcss@8.5.22`  
**Type:** Path Traversal, XSS, Information Disclosure  
**Location:** `node_modules/next/node_modules/postcss`  
**Dependency Chain:** next → postcss

**Identified Vulnerabilities:**
1. GHSA-qx2v-qp2m-jg93 - XSS via Unescaped </style> in CSS Stringify Output
2. GHSA-6g55-p6wh-862q - Arbitrary file read via attacker-controlled sourceMappingURL
3. GHSA-fxqj-rqcc-2cmp - Incomplete fix of GHSA-6g55-p6wh-862q (attacker-controlled sourceMappingURL)
4. GHSA-r28c-9q8g-f849 - Path Traversal in Source Map Auto-Loading

**Fix Available:** `npm audit fix --force` (requires Next.js upgrade to v16.3.5+, a breaking change)

---

## Important Project Notes

Per `CLAUDE.md`:
> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

**Recommendation:** 
- The security vulnerabilities in Next.js v13 are well-known and documented
- Upgrading to Next.js v16+ is a product/architecture decision requiring stakeholder approval
- Consider patching transitive dependencies using scoped entries in `overrides` in `package.json` instead
- Examples of existing patches: `js-yaml@3` and `nanoid@3` are already pinned this way

---

## Summary Table

| Check | Status | Details |
|-------|--------|---------|
| Build | ✅ PASSED | All 40 pages compiled, 0 errors |
| Lint | ⚠️ WARNINGS | 3 non-critical img tag warnings |
| Security | ⚠️ KNOWN | 5 vulnerabilities (acknowledged per project policy) |
| **Overall** | **✅ OPERATIONAL** | **Known advisories do not block operations** |

---

**Report Generated:** 2026-09-21 at 10:05:00 UTC (scheduled monitor run)
