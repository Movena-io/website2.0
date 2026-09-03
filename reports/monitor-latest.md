# Website Monitor Report

**Run Time:** 2026-09-03 02:15 UTC  
**Overall Status:** ⚠️ **CRITICAL** — Build succeeds, 7 high-severity vulnerabilities detected

---

## Summary

The Movena website builds and lints successfully, but the dependency audit reveals significant security issues. Next.js v13.5.11 (end-of-life) carries 31 known high-severity vulnerabilities. Combined with issues in PostCSS, js-yaml, minimatch, and nanoid, there are 7 direct high-severity vulnerabilities requiring attention. The application is production-ready from a build perspective but vulnerable from a security standpoint.

---

## Detailed Results

### ✅ Build Check: PASSED
- **Status:** Healthy
- **Exit Code:** 0
- **Output:** 
  - Compiled successfully
  - Generated 41 static pages
  - No build errors
  - Type checking passed

**Build Metrics:**
- First Load JS shared by all: 80.6 kB
- Routes: 9 main app routes + API endpoints
- Middleware size: 27 kB

### ✅ Lint Check: PASSED (with warnings)
- **Status:** Healthy  
- **Exit Code:** 0
- **Warnings Found:** 3

**Lint Warnings:**
1. **MetaPixel.tsx:54** - Using `<img>` instead of Next.js `Image` component (performance impact)
2. **SplitSection.tsx:93** - Using `<img>` instead of Next.js `Image` component
3. **SplitSection.tsx:96** - Using `<img>` instead of Next.js `Image` component

*Recommendation:* These are non-critical warnings suggesting migration to Next.js Image component for better performance and LCP optimization.

### ❌ Security Audit: CRITICAL

- **Status:** Failed (exit code 1)
- **Vulnerabilities Found:** 7 high-severity dependencies
- **Total advisories:** 40+ (primarily in Next.js with 31 advisories)

#### Vulnerable Packages (Detailed)

**1. next@13.5.11** — 31 high-severity advisories
- SSRF in Server Actions and middleware rewrites
- DoS in Server Components and Image Optimizer
- Cache poisoning via middleware/proxy redirects
- XSS in App Router (CSP nonces and beforeInteractive scripts)
- Information exposure in dev server
- Authorization bypass flaws
- HTTP request smuggling
- Race conditions in cache handling
- Middleware/proxy bypass in Pages Router
- Server Action payload DoS in Edge runtime
- Unauthenticated disclosure of internal Server Function endpoints

**2. postcss ≤8.5.22** — 4 high-severity advisories
- XSS via unescaped `</style>` in CSS output
- Arbitrary file read via attacker-controlled sourceMappingURL (CVE bypass chains)
- Path traversal in source map auto-loading

**3. minimatch@9.0.0–9.0.6** — 3 high-severity advisories (ReDoS)
- Repeated wildcards with non-matching literals
- Multiple non-adjacent GLOBSTAR segments
- Nested `*()` extglobs with catastrophic backtracking

**4. js-yaml@3.x–4.3.0** — 1 high-severity advisory
- Quadratic CPU consumption in `!!omap` resolution (CVE-2026-59870)
- Fix not backported to 3.x or 4.x branches

**5. nanoid <3.3.18** — 1 high-severity advisory
- Custom generators can loop indefinitely when size is zero

---

## Alerts

| Priority | Issue | Action |
|----------|-------|--------|
| 🔴 **CRITICAL** | Next.js has 20+ high/moderate vulnerabilities affecting core security | Upgrade to Next.js 16.3.4 (latest) |
| 🔴 **CRITICAL** | SSRF and DoS vulnerabilities in Server Components and Actions | Requires immediate patching |
| 🟡 **WARNING** | Multiple ReDoS vectors in build tools | Update minimatch via Next.js upgrade |
| 🟢 **INFO** | 3 linting warnings about image optimization | Low priority, performance improvement |

---

## Recommendations

### Immediate Actions (This Week)

1. **Evaluate Next.js upgrade strategy**
   - Current version 13.5.11 is end-of-life with 31 known vulnerabilities
   - Assess breaking changes required to move from 13.x → 16.x
   - Running `npm audit fix --force` would upgrade to Next.js 16.3.4 (major breaking change)
   - Requires deliberate testing in staging before production deployment

2. **Address Image Optimization Warnings**
   - Replace `<img>` in MetaPixel.tsx:54 with `<Image />` from next/image
   - Replace `<img>` in SplitSection.tsx:93, 96 with `<Image />` from next/image
   - Non-critical but improves LCP performance

### Short-Term Actions (Next Sprint)

1. **If/When Upgrading to Next.js 16.x**
   - Run `npm audit fix --force` (will also fix postcss)
   - Thoroughly test in staging for regressions
   - Verify Server Components and Server Actions work as expected
   - Re-run security audit to confirm vulnerabilities are resolved

2. **Handle Secondary Dependencies**
   - Migrate away from gray-matter if possible (currently requires js-yaml 3.x/4.x with known CVE)
   - Update @typescript-eslint to use non-vulnerable minimatch versions (should happen with Next.js upgrade)
   - nanoid should be automatically updated during Next.js upgrade

3. **Establish Vulnerability Response Policy**
   - Define SLA for addressing high-severity vulnerabilities
   - Automate dependency auditing via Dependabot or GitHub security alerts
   - Plan quarterly reviews of critical dependencies

### Deployment Safety
- **Never push a security fix automatically to main.** This requires human review of breaking changes.
- Previous runs (see AUDIT-NOTE.md) made commits claiming vulnerabilities were fixed when they were not.
- A pull request and code review is appropriate for dependency upgrades of this magnitude.

---

## Dependency Summary

- **Total Packages Audited:** 424
- **High-Severity Vulnerabilities:** 7 (40+ total advisories)
- **Packages Supporting Funding:** 154

---

## Assignment

This report is for **Valdemar** (dependencies owner). See AUDIT-NOTE.md in the repository root for context on previous monitoring runs and why automated commits are no longer appropriate for this task.

---

## Next Steps for Owner

1. **Review this report** for assessment of breaking-change risk
2. **Open a GitHub Discussion or Issue** if Next.js upgrade is not feasible in current sprint
3. **Create a PR** with dependency updates when ready (not automatic commits)
4. **Verify in staging** before production deployment
5. **Re-run monitor after upgrade** to confirm vulnerability resolution

---

*Generated by Website Monitor Agent on 2026-09-03 at 02:15 UTC*
