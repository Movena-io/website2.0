# Website Monitor Report

**Run Timestamp:** 2026-09-29 (automated monitor)  
**Overall Status:** ⚠️ **FAILING** — Build passes, lint errors present, critical security vulnerabilities

---

## Summary

The website build completes successfully, but the project has **linting failures** in generated components and **5 security vulnerabilities** (1 critical, 4 high). Lint errors stem from unescaped entities in auto-generated code and are non-blocking for build. Security issues require attention, particularly Next.js (v13) which has 30+ known advisories including SSRF, RCE, and DoS vulnerabilities.

---

## Check Results

### ✅ Build: PASSED

**Status:** Build completed successfully  
**Pages generated:** 61 (static SSG)  
**Bundle size:** 80.6 kB shared JS + 27.8 kB middleware  
**Compilation:** ✓ No errors, no warnings

**Route summary:**
- SSG (Static): 61 routes (all page routes, blog posts with pre-rendered slugs)
- API: 3 routes (`/api/calculator/submit`, `/api/contact`, `/api/demo`)
- Middleware: 1

---

### ❌ Lint: FAILED (Exit code 1)

**Total issues:** 73 (70 errors, 2 warnings)

#### Errors (70 total)
**Root cause:** Unescaped single quotes (`'`) in JSX text within generated components. ESLint rule `react/no-unescaped-entities` requires escaping as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected generated components (14 files, 70 errors):**
| File | Errors | Example Location |
|------|--------|------------------|
| `ForsideEn.tsx` | 17 | Lines 215, 222, 316, 317, 375, 392, 429, 433, 434, 437, 447, 455, 462, 470, 502, 514, 562 |
| `VindFlereFlytningerEn.tsx` | 20 | Lines 258, 259, 274, 275, 281, 288, 289, 296 |
| `BlogPostEn.tsx` | 9 | Lines 207 (multiple positions) |
| `HavStyrPaaDagenEn.tsx` | 4 | Lines 193, 200, 221, 235 |
| `FaaAllePengeneHjemEn.tsx` | 3 | Lines 200, 207 (×2) |
| `BookDemoEn.tsx` | 3 | Lines 240, 241 (×2) |
| `PrivatlivspolitikEn.tsx` | 3 | Lines 198 (×3) |
| `BlogIndexEn.tsx` | 1 | Line 208 |
| `BlogIndexDa.tsx` | 1 | Line 208 |
| `ErrorEn.tsx` | 2 | Line 194 (×2) |
| `FaaAllePengeneHjemDa.tsx` | 1 | Line 221 |
| `ForsideDa.tsx` | 1 | Line 437 |
| `NotFoundEn.tsx` | 1 | Line 193 |
| `OmOsEn.tsx` | 2 | Lines 199, 200 |

**Note:** These are auto-generated files in `components/generated/` directory. Errors come from embedded content (blog text, page copy) containing contractions and possessives.

#### Warnings (2 total)
**Location:** `components/SplitSection.tsx`
- Line 93: Using `<img>` instead of `<Image />` from `next/image`
- Line 96: Using `<img>` instead of `<Image />` from `next/image`

**Issue:** Next.js recommends using its `<Image />` component for automatic optimization (LCP, bandwidth reduction).  
**Severity:** Low (performance optimization, not blocking)

---

### 🔒 Security: 5 VULNERABILITIES (1 critical, 4 high)

**Status:** ⚠️ CRITICAL — Next.js v13 has 30+ known vulnerabilities

#### Critical (1)

**Package:** `next` (v13, current version; fix available in v16.3.7+)

**CVEs affecting current version:**
1. **GHSA-fr5h-rqp8-mj6g** — Server-Side Request Forgery (SSRF) in Server Actions
2. **GHSA-g77x-44xx-532m** — Denial of Service in image optimization
3. **GHSA-3h52-269p-cp9r** — Information exposure in dev server (origin verification bypass)
4. **GHSA-g5qg-72qw-gw5v** — Cache Key Confusion in Image Optimization API routes
5. **GHSA-7gfc-8cq8-jh5f** — Authorization bypass vulnerability
6. **GHSA-4342-x723-ch2f** — Improper Middleware Redirect leading to SSRF
7. **GHSA-xv57-4mr9-wg8v** — Content Injection in Image Optimization
8. **GHSA-qpjv-v59x-3qc4** — Race Condition to Cache Poisoning
9. **GHSA-mwv6-3258-q52c** — DoS with Server Components
10. **GHSA-5j59-xgg2-r9c4** — DoS with Server Components (incomplete fix follow-up)
11. **GHSA-9g9p-9gw9-jx7f** — DoS via Image Optimizer `remotePatterns`
12. **GHSA-h25m-26qc-wcjf** — DoS via insecure React Server Components
13. **GHSA-ggv3-7p47-pfv8** — HTTP request smuggling in rewrites
14. **GHSA-3x4c-7xq6-9pq8** — Unbounded `next/image` disk cache growth
15. **GHSA-q4gf-8mx6-v5v3** — DoS with Server Components
16. **GHSA-8h8q-6873-q5fj** — DoS with Server Components
17. **GHSA-3g8h-86w9-wvmq** — Middleware/Proxy redirect cache poisoning
18. **GHSA-ffhc-5mcf-pf4q** — XSS in App Router with CSP nonces
19. **GHSA-vfv6-92ff-j949** — Cache poisoning via React Server Component collisions
20. **GHSA-gx5p-jg67-6x7h** — XSS in `beforeInteractive` scripts
21. **GHSA-h64f-5h5j-jqjh** — DoS in Image Optimization API
22. **GHSA-c4j6-fc7j-m34r** — SSRF in WebSocket upgrade
23. **GHSA-36qx-fr4f-26g5** — Middleware/Proxy bypass in Pages Router i18n
24. **GHSA-m99w-x7hq-7vfj** — DoS in App Router Server Actions
25. **GHSA-68g3-v927-f742** — Cache confusion of response bodies
26. **GHSA-4633-3j49-mh5q** — Cache confusion with invalid UTF-8
27. **GHSA-4c39-4ccg-62r3** — Unbounded Server Action payload in Edge runtime
28. **GHSA-p9j2-gv94-2wf4** — SSRF in rewrites via attacker-controlled hostname
29. **GHSA-955p-x3mx-jcvp** — Unauthenticated disclosure of Server Function endpoints
30. **GHSA-p293-qw3h-jr36** — **Unauthenticated RCE on Windows-hosted servers**

**Impact:** Production instances at risk of SSRF, RCE, cache poisoning, DoS, and authentication bypass attacks.

**Fix:** Upgrade to Next.js 16.3.7+ (breaking change requiring major version bump)

---

#### High (4)

**1. minimatch** (9.0.0 - 9.0.6)

**Location:** Transitive dependency: `@typescript-eslint/typescript-estree` → `minimatch`

**CVEs:**
- GHSA-3ppc-4f35-3m26 — ReDoS via repeated wildcards with non-matching literal
- GHSA-7r86-cg39-jmmj — ReDoS via multiple non-adjacent GLOBSTAR segments
- GHSA-23c5-xmqv-rm74 — ReDoS via nested `*()` extglobs

**Impact:** ESLint parsing vulnerability; low runtime impact (dev tool)

**Fix:** Auto-fixed via Next.js upgrade

---

**2. postcss** (≤8.5.22)

**Location:** Nested under `next` package (`node_modules/next/node_modules/postcss`)

**CVEs:**
- GHSA-qx2v-qp2m-jg93 — XSS via unescaped `</style>` in CSS stringify
- GHSA-6g55-p6wh-862q — Arbitrary file read via attacker-controlled `sourceMappingURL`
- GHSA-fxqj-rqcc-2cmp — Incomplete fix of GHSA-6g55-p6wh-862q
- GHSA-r28c-9q8g-f849 — Path traversal in source map auto-loading

**Impact:** CSS processing vulnerabilities; information disclosure

**Fix:** Auto-fixed via Next.js upgrade

---

### 📦 Dependencies Summary
- **Total:** 418 packages (417 + 1 new)
- **Installed:** ✓ Successfully
- **Funding:** 154 packages have funding requests
- **npm version:** 10.9.7 (update available to 12.1.0)

---

## Analysis

### Lint Errors Assessment
- **Blocking:** No (build succeeds despite lint errors)
- **Severity:** Low (cosmetic, doesn't affect functionality)
- **Pattern:** Systematic across generated components suggests content source is not escaping entities
- **Root cause:** Auto-generation process likely pulls raw text containing contractions/possessives

### Security Assessment
- **Blocking:** Yes (if running on production infrastructure exposed to untrusted input)
- **Severity:** Critical (RCE, SSRF, DoS vulnerabilities in public framework)
- **Current version:** Next.js 13.x (released 2022, now 3+ years old)
- **Latest:** Next.js 16.3.7 with all vulnerabilities patched
- **Upgrade path:** Requires product team decision and full testing cycle

---

## Recommendations

### Immediate Actions (Next 1-2 weeks)
1. **Security review:** Assess production deployment surface area
   - Is Next.js instance exposed to untrusted input?
   - Are Server Actions in use?
   - Are image optimization features exposed?

2. **Lint errors:** Consider post-generation entity escaping
   - Check content source for generation (likely Markdown/CMS with curly quotes)
   - Fix generation template to escape entities, OR
   - Add `.eslintignore` exception for `components/generated/` if acceptable

### Medium-term (1-3 months)
1. **Plan Next.js major upgrade** from v13 to v16+
   - Allocate testing effort
   - Review breaking changes documentation
   - Test locally before deploying

2. **Monitor:** If upgrade deferred, track new Next.js advisories

### Long-term (Ongoing)
- Keep Node.js and npm updated
- Regular security audits
- Implement dependency update CI/CD gates
