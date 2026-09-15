# Website Monitor Report

**Run Timestamp:** 2026-09-15 10:52 UTC  
**Overall Status:** ⚠️ Warning

---

## Summary

The website2.0 project builds successfully and code quality is healthy. However, 5 known critical vulnerabilities exist in Next.js 13 and dependencies (intentionally deferred as a product decision per CLAUDE.md).

---

## Build Check ✅ PASSED

**Status:** Healthy - No compilation errors

- Production build compiled successfully
- All 40 static pages generated without errors
- Middleware compiled (27 kB)
- First Load JS: 80.6 kB (shared chunks)

**Routes Generated (40 total):**
- Home pages (en/da) with SSG
- Blog index and 21 article routes (SSG)
- Savings calculator (SSG, 16.3 kB)
- Contact form (server-rendered)
- Privacy & Terms (static)
- API routes: calculator/submit, contact
- Sitemap & robots.txt (static)

---

## Lint Check ⚠️ PASSED (3 Warnings)

**Status:** No errors - warnings only

**Image Optimization Recommendations:**

| File | Line | Issue |
|------|------|-------|
| `components/MetaPixel.tsx` | 54 | Use `<Image />` instead of `<img>` |
| `components/SplitSection.tsx` | 93 | Use `<Image />` instead of `<img>` |
| `components/SplitSection.tsx` | 96 | Use `<Image />` instead of `<img>` |

These are optimization suggestions for LCP improvement; not blocking issues.

---

## Security Audit 🔴 CRITICAL VULNERABILITIES (Known & Deferred)

**Total Vulnerabilities:** 5 (1 critical, 4 high)

### Critical Severity (1)

**Next.js 13.x** (node_modules/next)

31 documented security advisories including:
- Server-Side Request Forgery in Server Actions
- Unauthenticated Remote Code Execution (Windows servers, Image Optimization API)
- Authorization bypass vulnerabilities
- Cache poisoning via middleware/proxy redirects
- Cross-site scripting in CSP nonces and beforeInteractive scripts
- Denial of Service in Server Actions and Image Optimization
- HTTP request smuggling in rewrites
- Unbounded image cache growth exploits

**Current Fix:** Requires Next.js 16.3.5+ (major breaking change)

**Status:** KNOWN & INTENTIONAL per CLAUDE.md
> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

### High Severity (4)

**minimatch 9.0.0 - 9.0.6** (via @typescript-eslint/typescript-estree)
- 3 ReDoS vulnerabilities: repeated wildcards, GLOBSTAR segments, nested extglobs
- Location: Dev dependency chain
- Not in production code
- Fix: Update @typescript-eslint (relatively safe, no breaking changes)

**postcss ≤8.5.22** (nested in Next.js)
- XSS via unescaped `</style>` in CSS stringify output
- Arbitrary `.map` file read via sourceMappingURL (path traversal)
- Incomplete security patches allowing continued exploitation
- Cannot update independently—blocked by Next.js version
- Fix: Requires Next.js 16.3.5+ upgrade

---

## Dependency Summary

| Metric | Value |
|--------|-------|
| Total packages | 423 audited |
| Critical vulnerabilities | 1 |
| High vulnerabilities | 4 |
| Moderate | 0 |
| Low | 0 |
| Funding opportunities | 154 packages |

---

## Recommendations

### Priority 1: Product Decision
Schedule Next.js 13→16 major upgrade as a strategic initiative. This single upgrade resolves all vulnerabilities.

### Priority 2: Quick Wins
- Migrate 3 `<img>` tags to `<Image />` component (improves LCP, low risk)
- Can be done independently of major version work

### Priority 3: Ongoing Monitoring
- Track Next.js 13.x patch releases for emergency security patches
- Continue automated monitoring
- Review vulnerabilities before major version planning

---

## Deployment Readiness

**Status:** ✅ Deployable (with known security caveats)

- Build: **Pass** ✅
- Lint: **Pass** ⚠️ (minor warnings only)
- Security: **Known vulnerabilities** - requires business risk acceptance

---

**History:** `git log reports/monitor-latest.md`
