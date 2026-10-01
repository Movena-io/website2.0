# Website Monitor Report

**Run Time**: 2026-10-01
**Overall Status**: ❌ **FAILED**

---

## Summary

The website project has **critical issues** requiring immediate attention:
- **Build**: ✅ Passed
- **Lint**: ❌ **Failed** (2 warnings, 67 errors)
- **Security**: ❌ **Critical** (6 vulnerabilities: 1 critical, 5 high)

---

## 1. Build Check ✅

**Status**: **PASSED**

The Next.js application compiled successfully. All 61 static pages generated without errors.

**Key Metrics**:
- Compilation: ✓ Successful
- Type checking: ✓ Passed
- Static page generation: ✓ 61/61 pages
- First Load JS (shared): 80.6 kB
- Middleware size: 27.8 kB

**Routes Generated**:
- Home pages (en/da)
- Blog index & 21 articles
- Product pages (6 major sections with i18n)
- API endpoints (3 routes)
- Sitemaps & robots.txt

---

## 2. Lint Check ❌ **FAILED**

**Status**: **69 Issues Found** (2 warnings, 67 errors)

### Warnings (2)
Located in: `./components/SplitSection.tsx`

- Line 93, 96: Using `<img>` instead of Next.js `<Image />` component
  - Impact: Potential LCP and bandwidth issues
  - Fix: Replace with `next/image` Image component

### Errors (67) - All in Generated Files
Located in: `./components/generated/` directory

**Affected Files**:
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (8 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemDa.tsx (1 error)
- FaaAllePengeneHjemEn.tsx (3 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (25 errors)
- HavStyrPaaDagenEn.tsx (4 errors)
- NotFoundEn.tsx (1 error)
- OmOsEn.tsx (2 errors)
- PrivatlivspolitikEn.tsx (3 errors)
- VindFlereFlytningerEn.tsx (10 errors)

**Error Pattern**: Unescaped single quotes (`'`) in JSX text
- ESLint Rule: `react/no-unescaped-entities`
- Fix needed: Escape with `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Note**: All failing errors are in generated component files, suggesting they may be auto-generated from a build process. Regenerating these files should resolve the linting errors.

---

## 3. Security Audit ❌ **CRITICAL**

**Status**: **6 Vulnerabilities Found**
- **1 Critical** severity
- **5 High** severity

### Critical Severity (1)

#### Next.js (node_modules/next)
**Severity**: 🔴 CRITICAL

**Affected Versions**: 0.9.9 - 16.3.0-preview.10
**Current Version**: 13.x (from package.json)

**Vulnerabilities** (36 CVEs total):
1. Server-Side Request Forgery in Server Actions
2. Denial of Service in image optimization
3. Information exposure in dev server (no origin verification)
4. Cache Key Confusion for Image Optimization API Routes
5. Authorization bypass vulnerability
6. Improper Middleware Redirect Handling (SSRF)
7. Content Injection in Image Optimization
8. Race Condition to Cache Poisoning
9. DoS with Server Components (multiple variants - 5 CVEs)
10. HTTP request deserialization DoS
11. HTTP request smuggling in rewrites
12. Unbounded `/image` disk cache exhaustion
13. Middleware/Proxy cache poisoning
14. XSS in App Router with CSP nonces
15. Cache poisoning via React Server Component collisions
16. XSS in beforeInteractive scripts with untrusted input
17. Image Optimization API DoS
18. SSRF in WebSocket upgrades
19. Middleware/Proxy bypass in Pages Router i18n
20. Server Action DoS
21. Cache confusion in response bodies (UTF-8 variants)
22. Unbounded Server Action payload in Edge runtime
23. SSRF in rewrites via attacker-controlled hostname
24. Unauthenticated disclosure of Server Function endpoints
25. **Unauthenticated Remote Code Execution on Windows** ⚠️
26. Unauthenticated RCE in Image Optimization with AVIF
27. PostCSS dependency vulnerabilities

**Action Required**: 
- Fix requires upgrade to Next.js 16.3.8 (breaking change)
- CLAUDE.md notes: "Fixing them requires Next 13 to 16, a major upgrade that is a product decision"
- This is a known issue that requires product decision to upgrade

### High Severity (5)

#### brace-expansion (multiple locations)
**Severity**: 🟠 HIGH

**Affected Versions**: ≤1.1.20 || 2.0.0-2.1.6
**Locations**: 
- node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion
- node_modules/brace-expansion

**Vulnerabilities**:
1. Quadratic-time expansion DoS (GHSA-q2hr-2g5m-vwhr)
2. Uncontrolled recursion on nested braces (GHSA-qhr7-859c-m2p7)
3. DoS via parseCommaParts recursion (GHSA-6j4f-fj2g-mc7p)

**Fix Available**: `npm audit fix`

---

#### minimatch (transitive via @typescript-eslint)
**Severity**: 🟠 HIGH

**Affected Versions**: 9.0.0 - 9.0.6
**Location**: node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch

**Vulnerabilities**:
1. ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
2. ReDoS via multiple GLOBSTAR segments (GHSA-7r86-cg39-jmmj)
3. ReDoS from nested extglobs (GHSA-23c5-xmqv-rm74)

**Dependency Chain**:
- @typescript-eslint/typescript-estree 6.16.0-7.5.0
- @typescript-eslint/parser 6.16.0-7.5.0

**Fix Available**: `npm audit fix` or upgrade typescript-eslint

---

#### PostCSS (nested in next.js)
**Severity**: 🟠 HIGH

**Affected Versions**: ≤8.5.22
**Location**: node_modules/next/node_modules/postcss

**Vulnerabilities**:
1. XSS via unescaped `</style>` in CSS stringify output (GHSA-qx2v-qp2m-jg93)
2. Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q)
3. Incomplete fix - attacker-controlled sourceMappingURL reads `.map` files (GHSA-fxqj-rqcc-2cmp)
4. Path Traversal in Source Map auto-loading (GHSA-r28c-9q8g-f849)

**Note**: PostCSS is nested within next.js. Fixing requires updating Next.js.

**Fix**: Requires Next.js upgrade to 16.3.8 (breaking change)

---

## Remediation

### Immediate Actions Needed

1. **Generated Files Linting** (Easy)
   - Regenerate components in `components/generated/`
   - Or manually escape quotes in JSX text
   - Estimated effort: Low (automated fix available)

2. **SplitSection.tsx** (Easy)
   - Replace `<img>` with `next/image` `<Image />` on lines 93, 96
   - Estimated effort: Very low

### Product Decision Required

3. **Next.js Upgrade** (Breaking Change)
   - Current: Next.js 13
   - Required: Next.js 16.3.8+
   - Status: Requires product decision (noted in CLAUDE.md)
   - Estimated effort: High (major version upgrade)
   - Blocks: All Next.js CVE fixes, including critical RCE on Windows

### Security Risk Assessment

**Current Risk Level**: 🔴 **HIGH**

- Critical RCE vulnerability in Next.js on Windows-hosted servers
- Multiple DoS vectors in image optimization and Server Components
- SSRF and authorization bypass risks in Server Actions
- Transitive high-severity vulnerabilities in dev dependencies (currently lower risk)

The most critical concern is the Windows RCE if the deployment environment uses Windows servers.

---

## Monitoring Notes

- Build system is healthy and functional
- Code generation process is creating invalid ESLint output (unescaped quotes)
- Dependency vulnerability situation is known and documented in CLAUDE.md
- Next.js version is intentionally held on v13 pending major upgrade decision
