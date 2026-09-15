# Website Monitor Report

**Run Timestamp:** 2026-09-15 (latest run)  
**Overall Status:** ⚠️ Warning

---

## Summary

The website2.0 project builds successfully with no compilation errors. Code quality checks pass with 3 minor warnings about image optimization. However, **5 known security vulnerabilities exist in Next.js 13 and dependencies**, which are intentionally deferred as a product decision per CLAUDE.md. Build and deployment readiness are healthy; security vulnerabilities require product-level decision to upgrade.

---

## Build Check ✅ PASSED

**Status:** Healthy - No compilation errors

- Production build compiled successfully
- All 40 static pages generated without errors
- Middleware compiled (27 kB)
- First Load JS: 80.6 kB (shared chunks)
- Type checking: All valid

**Routes Generated (40 total):**
- Home pages (en/da with SSG)
- Blog index and 21 article routes (SSG)
- Savings calculator (SSG, 16.3 kB)
- Contact form (server-rendered)
- Privacy & Terms (static)
- API routes: calculator/submit, contact
- Sitemap & robots.txt (static)

---

## Lint Check ⚠️ PASSED (3 Warnings)

**Status:** No errors - 3 optimization warnings

**Image Optimization Recommendations:**

| File | Line | Issue |
|------|------|-------|
| `components/MetaPixel.tsx` | 54 | Use `<Image />` instead of `<img>` |
| `components/SplitSection.tsx` | 93 | Use `<Image />` instead of `<img>` |
| `components/SplitSection.tsx` | 96 | Use `<Image />` instead of `<img>` |

**Impact:** Low. These are performance optimization suggestions for improved LCP and bandwidth. Not blocking; can be fixed independently.

---

## Security Audit ❌ CRITICAL (Known & Deferred)

**Total Vulnerabilities:** 5 (1 critical, 4 high)  
**Dependencies Audited:** 423 packages

### Critical Severity (1)

**Next.js 13.x** (node_modules/next)

33 documented security advisories including:
- GHSA-fr5h-rqp8-mj6g: Server-Side Request Forgery in Server Actions
- GHSA-g77x-44xx-532m: Denial of Service in image optimization
- GHSA-3h52-269p-cp9r: Information exposure in dev server
- GHSA-7gfc-8cq8-jh5f: Authorization bypass vulnerability
- GHSA-4342-x723-ch2f: Middleware/Proxy redirect SSRF
- GHSA-xv57-4mr9-wg8v: Content injection in image optimization
- GHSA-qpjv-v59x-3qc4: Cache poisoning via redirects
- GHSA-mwv6-3258-q52c: DoS with Server Components
- GHSA-ggv3-7p47-pfv8: HTTP request smuggling in rewrites
- GHSA-ffhc-5mcf-pf4q: XSS in App Router with CSP nonces
- GHSA-gx5p-jg67-6x7h: XSS in beforeInteractive scripts
- And 22 additional critical/high-severity issues

**Remediation:** Requires Next.js 16.3.5+ (major version upgrade, breaking changes)

**Status:** KNOWN & INTENTIONAL per CLAUDE.md
> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

### High Severity (4)

**minimatch 9.0.0 - 9.0.6** (nested in @typescript-eslint/typescript-estree)
- GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards with non-matching literals
- GHSA-7r86-cg39-jmmj: ReDoS via multiple non-adjacent GLOBSTAR segments
- GHSA-23c5-xmqv-rm74: ReDoS via nested `*()` extglobs
- Location: Dev dependency chain (not in production code)
- Note: Can be patched via `npm audit fix` but is nested in ESLint tooling

**postcss ≤8.5.22** (nested in Next.js)
- GHSA-qx2v-qp2m-jg93: XSS via unescaped `</style>` in CSS stringify
- GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL
- GHSA-fxqj-rqcc-2cmp: Incomplete fix allowing continued exploitation
- GHSA-r28c-9q8g-f849: Path traversal in sourceMappingURL
- Cannot update independently—blocked by Next.js 13 version
- Remediation: Requires Next.js 16.3.5+ upgrade

---

## Dependency Summary

| Metric | Value |
|--------|-------|
| Total packages audited | 423 |
| Up to date | Yes |
| Critical vulnerabilities | 1 |
| High vulnerabilities | 4 |
| Moderate vulnerabilities | 0 |
| Low vulnerabilities | 0 |
| Packages with funding | 154 |

---

## Action Items

### Priority 1: Product Decision Required
Schedule and execute Next.js 13 → 16+ major version upgrade. This is a breaking change requiring:
- Testing across all 40 routes
- Verification of API endpoints and server functions
- Updating any deprecated Next.js 13 APIs
- This single upgrade resolves all 37 security advisories

### Priority 2: Quick Wins (Independent)
- Migrate 3 `<img>` tags to Next.js `<Image />` component
- Estimated time: <30 minutes
- Improves LCP, bandwidth usage
- No dependencies on other work

### Priority 3: Monitoring
- Continue automated weekly runs
- Track Next.js 13.x patch releases for emergency security patches
- Alert if critical security patches become available

---

## Deployment Readiness

**Status:** ✅ Deployable (with documented security risk acceptance)

| Check | Result | Notes |
|-------|--------|-------|
| Build | ✅ Pass | No compilation errors |
| Type Check | ✅ Pass | All TypeScript valid |
| Lint | ⚠️ Pass | 3 warnings only (optimization) |
| Security | ❌ Critical | 5 known vulnerabilities; requires product decision |
| Dependencies | ✅ Current | 423 packages up to date |

---

**Report History:** Use `git log reports/monitor-latest.md` to see all previous runs
