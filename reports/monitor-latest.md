# Website Monitor Report

**Run Time:** 2026-09-03 (Scheduled Monitor Run)  
**Overall Status:** ⚠️ **CRITICAL** — Build succeeds, 7 high-severity vulnerabilities present

---

## Summary

The Movena website builds and lints successfully without errors. However, the dependency security audit reveals **7 critical high-severity vulnerabilities** requiring immediate attention. These vulnerabilities are distributed across Next.js (Server-Side Request Forgery, DoS vectors), PostCSS (arbitrary file read, path traversal), TypeScript ESLint tooling (ReDoS), js-yaml (CVE-2026-59870), and nanoid.

---

## Detailed Results

### ✅ Build Check: PASSED
- **Status:** Healthy
- **Exit Code:** 0
- **Output:** 
  - ✓ Compiled successfully
  - ✓ Generated 41 static pages
  - ✓ Type checking passed
  - ✓ No build errors

**Build Metrics:**
- First Load JS shared by all: 80.6 kB
- Routes generated: 
  - 2 locale variants (en, da)
  - 9 main app routes + API endpoints
- Middleware size: 27 kB
- Page data collection: Complete

### ✅ Lint Check: PASSED (3 warnings)
- **Status:** Healthy  
- **Exit Code:** 0
- **Warnings Found:** 3 (non-critical)

**Lint Warnings:**
1. **MetaPixel.tsx:54** - Using `<img>` instead of Next.js `Image` component (performance impact)
2. **SplitSection.tsx:93** - Using `<img>` instead of Next.js `Image` component
3. **SplitSection.tsx:96** - Using `<img>` instead of Next.js `Image` component

*Impact:* Non-critical warnings suggesting migration to Next.js Image component for improved Largest Contentful Paint (LCP) and bandwidth optimization.

### ❌ Security Audit: CRITICAL

- **Status:** Failed (exit code 1 - vulnerabilities detected)
- **High-Severity Vulnerabilities:** 7 direct packages
- **Dependencies Audited:** 424 total packages
- **Exit Code:** 1 (indicates vulnerabilities found)

#### Vulnerable Packages (Current Run)

**1. next (Core Framework)**
- **Multiple High & Moderate Severity Issues:**
  - Server-Side Request Forgery (SSRF) in rewrites via attacker-controlled destination hostname (GHSA-p9j2-gv94-2wf4) — **HIGH**
  - Unbounded Server Action payload in Edge runtime (GHSA-4c39-4ccg-62r3) — **MODERATE**
  - Unauthenticated disclosure of internal Server Function endpoints (GHSA-955p-x3mx-jcvp) — **MODERATE**
  - Server Component DoS vectors
- **Affected Versions:** 12.0.0 - 16.3.0-preview.10
- **Fix Available:** Yes (Next.js 16.3.4+)

**2. postcss ≤8.5.22**
- **Arbitrary File Read** via attacker-controlled sourceMappingURL (GHSA-6g55-p6wh-862q) — **HIGH** (CVSS 7.5)
  - Leads to information disclosure via .map file exposure
- **Path Traversal** in source map auto-loading (GHSA-r28c-9q8g-f849) — **HIGH** (CVSS 7.5)
  - Incomplete fix bypass allowing arbitrary .map file disclosure
- **XSS via Unescaped </style>** in CSS Stringify output (GHSA-qx2v-qp2m-jg93) — **MODERATE** (CVSS 6.1)
  - Affects user-supplied CSS in specific contexts
- **Incomplete Fix Bypass** (GHSA-fxqj-rqcc-2cmp) — **MODERATE**
  - sourceMappingURL reads arbitrary files when `from` is unset

**3. minimatch@9.0.0–9.0.6**
- **ReDoS (Regular Expression Denial of Service)** Vulnerabilities:
  - Repeated wildcards with non-matching literal (GHSA-3ppc-4f35-3m26) — **HIGH**
  - Multiple non-adjacent GLOBSTAR combinatorial backtracking (GHSA-7r86-cg39-jmmj) — **HIGH** (CVSS 7.5)
  - Nested `*()` extglobs catastrophic backtracking (GHSA-23c5-xmqv-rm74) — **HIGH** (CVSS 7.5)
- **Impact:** Affects @typescript-eslint tooling via transitive dependency

**4. js-yaml@3.x–4.3.0**
- **Quadratic CPU Consumption** in `!!omap` resolution (CVE-2026-59870) — **HIGH** (CVSS 7.5)
  - DoS vector via malicious YAML
  - Fix not backported to 3.x or 4.x branches
- **Affected Ranges:** >=3.0.0 <3.15.1 and >=4.0.0 <4.3.1
- **Nodes:** gray-matter/node_modules/js-yaml, node_modules/js-yaml

**5. nanoid <3.3.18**
- **Infinite Loop in Custom Generators** when size is zero (GHSA-2v37-7h3g-55p8) — **HIGH** (CVSS 5.9)
  - DoS vector in applications using custom nanoid generators

**6. @typescript-eslint/parser & @typescript-eslint/typescript-estree**
- **Transitive Vulnerability via minimatch** — **HIGH**
- Requires minimatch update to resolve

---

## Alerts & Risk Assessment

| Priority | Severity | Issue | Impact | Action |
|----------|----------|-------|--------|--------|
| 🔴 | CRITICAL | **SSRF in Next.js rewrites** (GHSA-p9j2-gv94-2wf4) | Server-Side Request Forgery attacks possible | Upgrade Next.js immediately |
| 🔴 | HIGH | **Arbitrary file read in PostCSS** (GHSA-6g55-p6wh-862q) | Information disclosure via .map files | Upgrade PostCSS (via Next.js) |
| 🔴 | HIGH | **Path traversal in PostCSS** (GHSA-r28c-9q8g-f849) | Attacker can read arbitrary files | Upgrade PostCSS (via Next.js) |
| 🔴 | HIGH | **ReDoS in minimatch** (GHSA-7r86-cg39-jmmj) | Denial of Service via regex patterns | Update minimatch (via Next.js) |
| 🔴 | HIGH | **CPU DoS in js-yaml** (CVE-2026-59870) | Server CPU exhaustion possible | Upgrade js-yaml or migrate from gray-matter |
| 🟡 | MODERATE | **Server Action payload DoS** (GHSA-4c39-4ccg-62r3) | Edge runtime memory exhaustion | Upgrade Next.js to 16.3.4+ |
| 🟢 | LOW | **3 lint warnings (image optimization)** | Performance impact, not security | Non-critical fix

---

## Recommendations

### Immediate Actions (URGENT)

1. **Prioritize Next.js Upgrade to 16.3.4+**
   - Fixes SSRF vulnerability (GHSA-p9j2-gv94-2wf4) — active attack vector
   - Fixes PostCSS vulnerabilities (arbitrary file read, path traversal)
   - Fixes minimatch ReDoS vulnerabilities
   - Will also update nanoid to safe version
   - **Command**: `npm install next@latest` (or use `npm audit fix --force` for all fixes)
   - **Risk Level**: MAJOR VERSION UPGRADE (13.x → 16.x) — requires thorough testing

2. **Handle js-yaml CVE-2026-59870**
   - Transitive dependency via gray-matter
   - Options:
     - **Option A**: Wait for gray-matter update when js-yaml 3.15.1+ or 4.3.1+ released
     - **Option B**: Migrate away from gray-matter to alternative markdown parser
     - **Option C**: Pin to js-yaml >=3.15.1 or >=4.3.1 once released
   - **Status**: No fixed versions currently available in npm

3. **Code Quality Improvements (Lower Priority)**
   - Replace `<img>` tags with Next.js `<Image />` component
   - Locations: MetaPixel.tsx:54, SplitSection.tsx:93, SplitSection.tsx:96
   - Impact: Improves LCP performance, reduces bandwidth

### Testing Strategy for Next.js 16 Upgrade

1. Create a feature branch with dependency updates
2. Run full test suite in CI
3. Manual testing in staging environment:
   - Verify all API routes respond correctly
   - Check Server Components and Server Actions functionality
   - Test form submissions (contact, calculator)
   - Verify multi-language routing (en, da)
4. Performance testing to ensure no regressions
5. Re-run security audit to confirm all vulnerabilities resolved
6. Create PR for code review before merge to main

### Deployment Safety
- ✅ **Build succeeds** — no blocking compilation errors
- ✅ **Linting passes** — 3 minor warnings only
- ❌ **Security CRITICAL** — 7 high-severity vulnerabilities must be addressed
- **REQUIRED**: Pull request with thorough code review before production deployment
- Do not auto-commit security fixes without human review

---

## Dependency Summary

- **Total Packages Audited:** 424
- **Production Dependencies:** 158
- **Development Dependencies:** 289
- **Optional Dependencies:** 37
- **High-Severity Vulnerabilities Found:** 7
- **Packages with Funding Available:** 154

---

## Report Metadata

- **Run Status**: ✅ Completed successfully
- **Run Date**: 2026-09-03
- **Checks Performed**: 
  - ✅ npm install (dependency resolution)
  - ✅ npm run lint (code quality)
  - ✅ npm run build (build compilation)
  - ✅ npm audit (security scanning)
- **Report Location**: `reports/monitor-latest.md`
- **Generated by**: Website Monitor Agent (Scheduled Task)

---

## Summary Scores

| Check | Score | Status |
|-------|-------|--------|
| **Build** | ✅ PASS | Compiles without errors |
| **Lint** | ⚠️ WARN | 3 non-critical warnings |
| **Security** | ❌ CRITICAL | 7 high-severity vulnerabilities |
| **Overall** | 🔴 CRITICAL | Action required |

---

*Generated by Website Monitor Agent*  
*Last Updated: 2026-09-03*
