# Movena Website Monitor Report

**Run Timestamp:** 2026-10-25 13:47 UTC  
**Overall Status:** ⚠️ Warning

---

## Executive Summary

The website **builds successfully** (61 static pages generated), but has **11 security vulnerabilities** including 1 critical issue in Next.js, and **67 lint errors** primarily in auto-generated components. The critical vulnerability in Next.js is a known limitation, per CLAUDE.md. Code generation tool must be updated to escape HTML entities in JSX.

---

## Check Results

### 1. Dependency Installation ✅

**Status:** Passed

- 417 packages installed successfully
- No blockers during installation
- Note: 154 packages have available funding

---

### 2. Lint Check ⚠️

**Status:** Failed (Exit Code 1)

**Summary:** 67 errors and 2 warnings detected, primarily in generated components.

**Breakdown:**

**Warnings (2)** — SplitSection.tsx
- Line 93, 96: Using native `<img>` instead of Next.js `<Image />` component
- **Impact:** Slower LCP and higher bandwidth usage
- **Fix:** Replace with `next/image` component

**Errors (65)** — Generated Components
- **Issue Type:** Unescaped HTML entities (apostrophes `'`)
- **ESLint Rule:** `react/no-unescaped-entities`
- **Root Cause:** Code generation tool does not escape JSX entities
- **Solution:** Entities should use `&apos;`, `&#39;`, `&lsquo;`, `&rsquo;`

**Affected Components (14 files):**
- BeregnerEn.tsx (2 errors)
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (7 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemEn.tsx (5 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (22 errors)
- HavStyrPaaDagenEn.tsx (8 errors)
- NotFoundEn.tsx (1 error)
- OmOsEn.tsx (2 errors)
- PrivatlivspolitikEn.tsx (3 errors)
- VindFlereFlytningerEn.tsx (8 errors)

**Critical Note:** The "generated" prefix in filenames indicates these are auto-generated and should not be manually maintained. The code generation process needs to be fixed at the source.

---

### 3. Build Check ✅

**Status:** Passed (Compilation Successful)

- All pages compiled without errors
- **Static Pages Generated:** 61/61
- **Build Time:** Completed successfully
- **Linting:** Skipped during build (intentional)
- **Type Checking:** Passed

**Route Summary:**
- 32 locale-specific application routes (en/da)
- 3 API endpoints (calculator, contact, demo)
- 2 static assets (robots.txt, sitemap.xml)
- 1 not-found fallback handler

**Bundle Sizes:**
- Smallest page: 874 B (404)
- Largest page: 24.6 kB (savings-calculator)
- Shared first-load JS: 80.6 kB
- Middleware: 27.9 kB
- **Status:** Sizes within acceptable range

---

### 4. Security Audit ❌

**Status:** Failed — 11 Vulnerabilities Detected

**Vulnerability Summary by Severity:**

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 1 | 🔴 Requires Product Decision |
| High | 6 | 🟠 Partially Fixable |
| Moderate | 4 | 🟡 Fixable with breaking changes |

---

## Detailed Vulnerability Analysis

### CRITICAL (1)

#### Next.js (versions 0.9.9 - 16.3.0)
- **Current Version:** 13.5.11
- **Status:** Vulnerable to 39 known CVEs
- **High-Impact Issues:**
  1. Server-Side Request Forgery (SSRF) in Server Actions & rewrites
  2. Unauthenticated Remote Code Execution (RCE) on Windows servers
  3. Unauthenticated RCE in Image Optimization API (SVG & AVIF)
  4. Denial of Service (DoS) in Server Actions & Image Optimizer
  5. Cache poisoning via response body confusion
  6. Request smuggling in rewrites
  7. Cross-site scripting (XSS) in CSP nonces
  8. Authorization bypass vulnerabilities
  9. Information disclosure in development server
  10. Middleware/Proxy bypass in Pages Router

- **Fix Available:** Yes — upgrade to Next.js 16.4.3
- **Breaking Changes:** Yes — major version bump (13→16)
- **Product Decision:** Per CLAUDE.md, "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."
- **Recommendation:** Schedule as separate initiative with product team

---

### HIGH SEVERITY (6)

#### 1. brace-expansion (3 CVEs)
- **Versions Affected:** ≤1.1.20, 2.0.0-2.1.6
- **Issues:**
  - Quadratic-time expansion of patterns like `{a},b}` (GHSA-q2hr-2g5m-vwhr)
  - Quadratic-time expansion with nested braces (GHSA-qhr7-859c-m2p7)
  - DoS via recursion in parseCommaParts (GHSA-6j4f-fj2g-mc7p)
- **Location:** `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`
- **Fix:** `npm audit fix` (non-breaking)
- **Risk Level:** Build-time only, not production code

#### 2. minimatch (3 CVEs - ReDoS)
- **Versions Affected:** 9.0.0-9.0.6
- **Issues:**
  - ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
  - ReDoS via multiple GLOBSTAR segments (GHSA-7r86-cg39-jmmj)
  - ReDoS via nested extglobs (GHSA-23c5-xmqv-rm74)
- **Dependency Chain:** @typescript-eslint/typescript-estree → minimatch
- **Fix:** `npm audit fix` (non-breaking)
- **Risk Level:** Build-time only (ESLint dependency)

#### 3. postcss (4 CVEs)
- **Versions Affected:** ≤8.5.22
- **Issues:**
  - XSS via unescaped `</style>` in CSS stringify output (GHSA-qx2v-qp2m-jg93)
  - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q)
  - Information disclosure via sourceMappingURL when `from` unset (GHSA-fxqj-rqcc-2cmp)
  - Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
- **Location:** Nested in Next.js (`node_modules/next/node_modules/postcss`)
- **Fix:** Requires Next.js 16.4.3 upgrade (`npm audit fix --force`)
- **Risk Level:** Medium - build-time primarily, but affects CSS processing

#### 4. source-map-js (1 CVE)
- **Versions Affected:** 1.0.0-1.2.1
- **Issue:** Event-loop denial of service via indexed source-map section offsets (GHSA-68fv-2mgg-jv7q)
- **Fix:** `npm audit fix` (non-breaking)
- **Risk Level:** Build-time only

---

### MODERATE (4)

#### 1. postcss-selector-parser (1 CVE)
- **Versions Affected:** <7.1.6
- **Issue:** Quadratic complexity in flat selector parsing allows CPU exhaustion (GHSA-rj75-hqrm-r3gf)
- **Dependency Chain:**
  - tailwindcss → postcss-nested → postcss-selector-parser
  - tailwindcss → postcss-selector-parser
  - @tailwindcss/typography → postcss-nested → postcss-selector-parser
- **Fix:** Requires breaking changes to tailwindcss and @tailwindcss/typography
- **Risk Level:** Build-time (CSS processing), could impact build performance

#### 2. tailwindcss (depends on vulnerable versions)
- **Versions Affected:** ≤0.0.0 oxide-insiders || 0.5.0-3.4.19
- **Vulnerable Dependency:** postcss-selector-parser, postcss-nested
- **Fix Requires:** `npm audit fix --force`

#### 3. @tailwindcss/typography (depends on vulnerable versions)
- **Versions Affected:** ≤0.4.0 or ≥0.5.0-alpha.1
- **Vulnerable Dependencies:** postcss-selector-parser, tailwindcss
- **Fix Requires:** `npm audit fix --force`

---

## Recommendations by Priority

### 🚨 CRITICAL (Fix This Week)

1. **Regenerate Auto-Generated Components**
   - **What:** Re-run the code generation tool that creates `components/generated/*` files
   - **Why:** 65 lint errors prevent CI/CD pipeline from passing
   - **Action:** 
     - Identify the source tool/script generating these components
     - Enable HTML entity escaping in generation settings
     - Re-run generation
     - Verify `npm run lint` passes
   - **Owner:** Development team maintaining code generation process
   - **Blocking:** CI/CD pipeline, deployment readiness

2. **Apply Patch-Level Security Fixes (npm audit fix)**
   - **What:** Run `npm audit fix` (NOT `--force`)
   - **Why:** Addresses 6 vulnerabilities in non-critical dependencies
   - **Packages Fixed:**
     - brace-expansion (3 DoS CVEs)
     - minimatch (3 ReDoS CVEs)  
     - source-map-js (1 DoS CVE)
   - **Risk Level:** Low - build-time dependencies only
   - **Verification:** Re-run `npm run build` and `npm run lint` after

3. **Update SplitSection.tsx (Quick Win)**
   - **What:** Replace native `<img>` with Next.js `<Image />` component
   - **Why:** Improves LCP performance and bandwidth optimization
   - **File:** `/home/user/website2.0/components/SplitSection.tsx`
   - **Lines:** 93, 96
   - **Effort:** 5 minutes

### ⚠️ SHORT-TERM (This Month)

4. **Plan Next.js Upgrade Initiative**
   - **What:** Schedule separate project to upgrade Next.js 13→16.4.3
   - **Why:** 39 critical and high-severity CVEs in Next.js
   - **Note:** Per CLAUDE.md, this is a product decision requiring business approval
   - **Impact:** Breaking changes, requires regression testing
   - **Owner:** Product team + engineering

### 📋 LONG-TERM (Product Planning)

5. **Monitor Tailwind Ecosystem Upgrades**
   - Keep eye on postcss-selector-parser updates
   - Plan Tailwind major version bumps strategically
   - Not urgent but part of long-term dependency hygiene

---

## Health Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Build** | ✅ Healthy | Compiles successfully, 61 pages generated |
| **Code Quality** | ⚠️ Degraded | 67 lint errors in generated files, blocks CI/CD |
| **Security** | ⚠️ Warning | 11 vulnerabilities (1 critical, 6 high, 4 moderate) |
| **Performance** | ✅ Good | Bundle sizes optimized, First Load JS ~156 kB |
| **Deployment Readiness** | ❌ Not Ready | Lint failures must be resolved first |

---

## Actionable Next Steps

1. **This Hour:** Identify and run the code generation tool with entity escaping enabled
2. **Today:** Apply `npm audit fix` to patch available vulnerabilities
3. **Tomorrow:** Update SplitSection.tsx to use next/image
4. **This Week:** Verify all changes pass build and lint, attempt deployment
5. **This Month:** Coordinate with product team on Next.js upgrade roadmap

---

## Monitor Configuration

- **Report Path:** `reports/monitor-latest.md` (single file, completely overwritten per run)
- **Schedule:** Automated monitoring
- **Previous Run:** 2026-10-25T14:32:00Z
- **Changes This Run:** Recount of lint errors (67 vs 52 previously reported), same security findings
