# Website Monitor Report

**Run Timestamp:** 2026-09-15 10:40:00 UTC  
**Overall Status:** ⚠️ **Warning** (Build and Lint Healthy | Critical Security Vulnerabilities Identified)

---

## Summary

The website2.0 project builds successfully and passes linting with only non-critical warnings. However, 5 known vulnerabilities are present (1 critical, 4 high), primarily in Next.js 13 and its nested PostCSS. These vulnerabilities are documented as intentional per CLAUDE.md, requiring a major version upgrade (Next.js 13 to 16) as a strategic product decision.

---

## Build Check ✅ PASSED

**Status:** Healthy

- Production build compiled successfully
- All 40 static pages generated without errors
- Middleware compiled (27 kB)
- First Load JS: 80.6 kB (shared chunks)
- No compilation errors or build failures

**Routes Generated (40 total):**
- Home pages (en/da) with SSG optimization
- Blog index and 21 post routes (SSG)
- Savings calculator (SSG, 16.3 kB)
- Contact form (Server-rendered)
- Privacy & Terms pages (Static)
- API routes: calculator/submit, contact
- Robots.txt & sitemap.xml (Static)

---

## Lint Check ⚠️ 3 WARNINGS (Non-Critical)

**Status:** Warnings only (no errors)

**Image Optimization Warnings:**

| File | Line | Issue |
|------|------|-------|
| `./components/MetaPixel.tsx` | 54 | Using `<img>` instead of Next.js `<Image />` |
| `./components/SplitSection.tsx` | 93 | Using `<img>` instead of Next.js `<Image />` |
| `./components/SplitSection.tsx` | 96 | Using `<img>` instead of Next.js `<Image />` |

**Impact:** Performance optimization recommendations; not blocking. Migrating to `<Image />` component would improve LCP (Largest Contentful Paint) and reduce bandwidth.

---

## Security Audit ❌ 5 VULNERABILITIES FOUND

**Total Severity Count:** 1 Critical + 4 High

### Critical Vulnerabilities (1)

**Next.js 13.4.0 - 15.5.23**

Multiple CVEs affecting the current version:

1. **Unauthenticated Remote Code Execution on Windows** (CVSS 9.0)
   - Path traversal in file handling
   - Affects: 13.4.0 - 15.5.23

2. **Unauthenticated RCE in Image Optimization API** (AVIF files)
   - Arbitrary code execution via AVIF processing
   - Affects: 10.0.0 - 15.5.23

3. **Server-Side Request Forgery in Server Actions** (CVSS 7.5)
   - Unauthorized server requests via Server Actions
   - Affects: 13.4.0 - 14.1.0

4. **Cache Key Confusion - Image Optimization** (CVSS 6.2)
   - Information disclosure via cache poisoning
   - Affects: 0.9.9 - 14.2.30

5. **Denial of Service - Image Optimization** (CVSS 5.9)
   - Resource exhaustion via malformed images
   - Affects: 10.0.0 - 14.2.7

**Fix Available:** Upgrade to Next.js 16.3.5+ (major version change)

**Status:** INTENTIONAL - Per project documentation, this is a known constraint requiring product-level upgrade decision

### High Severity Vulnerabilities (4)

**1. minimatch (via @typescript-eslint/parser → @typescript-eslint/typescript-estree)**

Regular Expression Denial of Service (ReDoS) vulnerabilities:
- Repeated wildcards with non-matching literals
- Multiple GLOBSTAR segments causing catastrophic backtracking
- Nested *() extglobs generating exponential backtracking

**Affected Version:** 9.0.0 - 9.0.6  
**Location:** Dev dependency chain (not production code)  
**Fix:** Update @typescript-eslint dependencies (safe)

**2. PostCSS ≤ 8.5.22 (nested in Next.js)**

Information disclosure and code injection vulnerabilities:
- Arbitrary `.map` file read via sourceMappingURL (CVSS 7.5)
- Path traversal in source map auto-loading (CVSS 7.5)
- XSS via unescaped `</style>` tags (CVSS 6.1)
- Incomplete fixes allowing continued exploitation

**Location:** Inside Next.js node_modules (cannot update independently)  
**Fix Blocked:** Requires Next.js 16.3.5+ upgrade  
**Impact:** Secondary to Next.js upgrade path

---

## Dependency Health

| Metric | Value |
|--------|-------|
| Total packages audited | 423 |
| Production dependencies | 157 |
| Development dependencies | 289 |
| Funding opportunities | 154 packages |
| **Total vulnerabilities** | **5** |
| **Critical** | **1** |
| **High** | **4** |
| Moderate | 0 |
| Low | 0 |

---

## Known Constraints & Product Decisions

**Per CLAUDE.md project documentation:**

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

**Reasoning:** 
- Next.js 13 → 16 is a major version upgrade requiring comprehensive testing
- All current vulnerabilities (critical and high) are resolved by this upgrade
- Requires coordination with main product repository and business stakeholders
- This is outside the scope of automated monitoring

**Status:** Vulnerabilities are acknowledged and tracked; upgrade is a strategic decision, not a monitoring action.

---

## Recommendations

### High Priority (Product Decision Required)
1. Schedule Next.js 13 → 16 major upgrade as a product initiative
2. This single upgrade resolves all 5 vulnerabilities (critical + high)
3. Coordinate testing with Movena-io/Movena product repository
4. Plan for compatibility verification with existing features

### Medium Priority (Quick Wins)
1. Migrate `<img>` to `<Image />` in MetaPixel and SplitSection
2. Improves performance metrics (LCP, bandwidth optimization)
3. Low risk, non-blocking implementation
4. Can be prioritized independently of major version upgrade

### Ongoing
1. Continue automated security monitoring and reporting
2. Track Next.js 13.x patch releases for any emergency security patches
3. Review new vulnerabilities before major version planning
4. Monitor npm audit for changes in transitive dependencies

---

## Deployment Readiness

**Current State:** ✅ Deployable (subject to known constraints)

- Build: **Passes** without errors
- Code Quality: **Passes** with non-blocking warnings
- Security: **Known constraints** requiring product decision

The application is technically ready for deployment with the understanding that security upgrade decisions are outside monitor scope and require strategic product planning.

---

## Run Details

- **Environment:** Linux, Node.js with npm
- **Build System:** Next.js 13 App Router with SSG optimization
- **Monitoring Type:** Automated comprehensive health check
- **Dependencies:** Clean install verified (npm install passed)

*Report generated by automated monitor on 2026-09-15*  
*View run history: `git log reports/monitor-latest.md`*
