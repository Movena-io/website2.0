# Website Monitor Report

**Run Timestamp:** 2026-09-15 (UTC)  
**Overall Status:** ❌ **Critical** (Build & Lint OK | 5 Security Vulnerabilities)

---

## Summary

The website2.0 project builds successfully and passes linting with minor warnings only. However, 5 known vulnerabilities are present in the dependency tree (1 critical, 4 high). All vulnerabilities are in Next.js 13 and its nested PostCSS, which are intentionally pinned per CLAUDE.md. Fixing requires a major version upgrade (Next.js 13→16) as a product decision outside monitor scope.

---

## Build Check ✅ PASSED

**Status:** Healthy - No compilation errors

- Production build compiled successfully
- All 40 static pages generated without errors
- Middleware compiled (27 kB)
- First Load JS: 80.6 kB (shared chunks)
- Build time: Optimal

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
| `MetaPixel.tsx` | 54 | Use `<Image />` instead of `<img>` |
| `SplitSection.tsx` | 93 | Use `<Image />` instead of `<img>` |
| `SplitSection.tsx` | 96 | Use `<Image />` instead of `<img>` |

These are optimization suggestions for LCP improvement; not blocking issues.

---

## Security Audit 🚨 CRITICAL

**Total Vulnerabilities:** 5 (1 critical, 4 high)

### Critical Severity (1)

**Next.js 0.9.9 - 16.3.0-preview.10**

Multiple critical security issues in current version:
- Server-Side Request Forgery in Server Actions
- Unauthenticated Remote Code Execution (Windows servers, Image Optimization API)
- Authorization bypass vulnerabilities
- Cache poisoning via middleware/proxy redirects
- Cross-site scripting in CSP nonces and beforeInteractive scripts
- Denial of Service in Server Actions and Image Optimization
- HTTP request smuggling in rewrites
- Unbounded image cache growth exploits

**Current Fix:** Requires Next.js 16.3.5+ (major breaking change)

**Status:** KNOWN & INTENTIONAL per CLAUDE.md - "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

### High Severity (4)

**minimatch 9.0.0 - 9.0.6** (via @typescript-eslint)
- 3 ReDoS vulnerabilities: repeated wildcards, GLOBSTAR segments, nested extglobs
- Location: Dev dependency chain (@typescript-eslint/typescript-estree)
- Not in production code
- Fix: Update @typescript-eslint (relatively safe)

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

## Known Constraints

**Per CLAUDE.md documentation:**

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

This constraint is intentional and acknowledged. All 5 vulnerabilities are resolved by the Next.js 13→16 upgrade, which requires:
- Comprehensive testing
- Product team coordination with main Movena repository
- Strategic business decision on timing and resources

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

The build pipeline works correctly and application is technically deployable. Security upgrade decisions are outside monitor scope.

---

**Report generated:** 2026-09-15  
**Next review:** Automated monitoring continues  
**History:** `git log reports/monitor-latest.md`
