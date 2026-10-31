# Website Monitor Report

**Timestamp:** 2026-10-31T00:30:00Z  
**Overall Status:** ❌ **CRITICAL** - Build success but critical security vulnerabilities and lint errors

---

## Summary

The Movena website build completes successfully, but the project faces **critical security issues** and widespread linting errors. There is **1 critical vulnerability** (xml5 infinite loop), **6 high-severity** vulnerabilities including Next.js SSRF/bypass/DoS issues, and **77 lint errors** in generated components (unescaped entities) plus 2 warnings. The project requires urgent attention to address the critical vulnerability and high-severity Next.js security gaps.

---

## Build Status: ✅ SUCCESS

- **Command:** `npm run build`
- **Result:** Build completed successfully
- **Pages built:** 40+ routes across 2 locales (en, da)
- **Bundle size:** ~80.6 KB shared JS, middleware 27.9 KB
- **Details:** Next.js App Router successfully compiled without errors

---

## Lint Status: ❌ FAILED (77 errors, 2 warnings)

- **Command:** `npm run lint`
- **Result:** Exit code 1 - **FAILED**
- **Error Count:** 77 errors (primarily in generated components)
- **Warning Count:** 2 warnings

### Errors - Unescaped Entities (75 instances):
- **Rule:** `react/no-unescaped-entities`
- **Files affected:** 11 auto-generated component files
  - `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx`
- **Issue:** Unescaped apostrophes in JSX should be `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- **Impact:** Code quality blocker; prevents lint-gated CI/CD

### Warnings - Image Optimization (2 instances):
- **Location:** `components/SplitSection.tsx` (lines 93, 96)
- **Rule:** `@next/next/no-img-element`
- **Issue:** Using raw `<img>` instead of Next.js `<Image />` component
- **Impact:** Performance degradation (slower LCP, higher bandwidth)

---

## Security Audit Status: ❌ CRITICAL (25 Vulnerabilities)

- **Command:** `npm audit`
- **Result:** Exit code 1 - **FAILED**
- **Total Vulnerabilities:** 25
  - 🔴 **Critical:** 1
  - 🔴 **High:** 6
  - 🟡 **Moderate:** 15
  - 🟢 **Low:** 3

### CRITICAL Vulnerability (1):

**xml5** - Infinite Loop in XML Parsing
- **Source:** `@react-email/render` → `html-to-text` → `xml5`
- **Impact:** Denial of Service via malformed XML input
- **Fix Available:** Update `@react-email/render` to v2.2.0+ (currently on v0.0.4-2.1.1)

### HIGH-Severity Vulnerabilities (6):

1. **@typescript-eslint/parser & @typescript-eslint/typescript-estree**
   - Root cause: Depends on `eslint` 8.x and `minimatch` with unpatched DoS
   - Fix: Requires ESLint 4.0.0+ (major version upgrade)

2. **brace-expansion** - Quadratic-time Expansion DoS (2 CVEs)
   - CVSS: 5.3 (Moderate-High)
   - Affects: glob patterns in build tools
   - Fix: `npm audit fix` available

3. **glob** - Multiple ReDoS & DoS Vulnerabilities
   - Used by ESLint and Next.js CLI
   - CVSS: 5.3-7.5 range

4. **Next.js 13.x** - Multiple Critical Security Issues:
   - **GHSA-c4j6-fc7j-m34r:** Server-Side Request Forgery (SSRF) in WebSocket upgrades
     - CVSS: 8.6 (Critical)
     - Impact: Authentication bypass via WebSocket manipulation
   - **GHSA-36qx-fr4f-26g5:** Middleware/Proxy Bypass in Pages Router i18n
     - CVSS: 7.5 (High)
     - Impact: Authorization bypass for protected routes
   - **GHSA-m99w-x7hq-7vfj:** Denial of Service in App Router Server Actions
     - Impact: Service unavailability via malicious payloads
   - **Plus 7 additional moderate Next.js CVEs** (cache poisoning, XSS, DoS)

### Moderate Vulnerabilities (15):
- ESLint ecosystem (5): `@eslint-community/eslint-utils`, `@eslint/eslintrc`, `@humanwhocodes/config-array`
- Next.js additional issues (7): cache confusion, XSS, DoS variants
- Tailwind/CSS: `@tailwindcss/typography`, `postcss-selector-parser`
- Email rendering: `@react-email/render` dependencies

### Low Vulnerabilities (3):
- Transitive dependencies in Next.js and @react-email/render

---

## Root Cause Analysis

### 1. ESLint Ecosystem Outdated
- **Current:** ESLint 8.57.1 (deprecated, end-of-life)
- **Issue:** Cascading vulnerabilities in `minimatch`, `glob`, `@typescript-eslint/*`
- **Solution:** Upgrade to ESLint 4.x (requires `npm audit fix --force`)

### 2. Next.js 13 End-of-Life (Known Issue)
- **Current:** Next.js 13.x with 30+ published security advisories
- **Note:** CLAUDE.md documents this as intentional architectural decision
- **Impact:** SSRF, auth bypass, and DoS vulnerabilities in production
- **Solution:** Requires product team approval for Next.js 13→16 upgrade

### 3. Generated Components Not Regenerated
- **Issue:** 75 lint errors in auto-generated component files
- **Cause:** Components likely generated from source that needs fixing
- **Impact:** Build quality checks fail, blocks lint-gated CI/CD pipelines

### 4. @react-email/render Outdated
- **Current:** 0.0.4-2.1.1 (vulnerable)
- **Update Available:** 2.2.0+ (addresses xml5 critical vulnerability)
- **Fix:** `npm install @react-email/render@latest`

---

## Dependency Statistics

- **Total Dependencies:** 450 (152 prod, 289 dev, 37 optional)
- **Vulnerable Packages:** 25
- **Direct Vulnerable:** 2 (@react-email/render, @tailwindcss/typography)
- **Transitive Vulnerable:** 23

---

## Recommendations

### 🚨 IMMEDIATE (Critical Priority):

1. **Fix Critical xml5 Vulnerability**
   ```bash
   npm install @react-email/render@latest
   ```
   - Eliminates 1 critical vulnerability
   - Low-risk, available as minor/patch update

2. **Escalate Next.js Security Issues to Product**
   - GHSA-c4j6-fc7j-m34r (SSRF in WebSocket): CVSS 8.6
   - GHSA-36qx-fr4f-26g5 (Auth bypass): CVSS 7.5
   - These require architectural decision (Next.js 13→16+ upgrade)
   - Document risk exposure in current deployment

3. **Regenerate Components or Fix Linting**
   - Regenerate auto-generated components in `components/generated/`
   - OR add `.eslintignore` entries for generated files (temporary measure)
   - Required to unblock lint-gated CI/CD

### ⚠️ SHORT-TERM (High Priority):

4. **Update ESLint to v4 (Major Version)**
   - Fixes 9+ high & moderate vulnerabilities
   - Risk: Potentially breaking lint rule changes
   - Action: `npm audit fix --force` (test thoroughly)

5. **Update @tailwindcss/typography**
   - Fixes postcss-selector-parser vulnerability
   - Action: `npm audit fix` or `npm install @tailwindcss/typography@latest`

6. **Fix Image Component Warnings**
   - Replace `<img>` with `<Image />` in `SplitSection.tsx` (lines 93, 96)
   - Improves LCP and reduces bandwidth usage

### 📋 LONG-TERM (Product Decision):

7. **Plan Next.js 13→16 Upgrade**
   - As per CLAUDE.md: major upgrade decision
   - Addresses 30+ published Next.js CVEs
   - Requires testing, migration planning, and approval

---

## Exit Codes

| Check | Status | Code | Action |
|-------|--------|------|--------|
| Build | ✅ Success | 0 | None |
| Lint | ❌ Failed | 1 | Fix generated components or suppress |
| Audit | ❌ Failed | 1 | Address vulnerabilities (critical + high priority) |

**Overall:** Deploy blocked due to critical security vulnerability + lint errors.

---

## Metrics

- **Build Time:** ~60 seconds
- **Routes:** 40+ static & SSG pages
- **Middleware:** 27.9 KB
- **Page Bundle Range:** 5.2-24.6 KB (per route)
- **Shared JS:** 80.6 KB

---

**Last Run:** 2026-10-31 00:30 UTC  
**Next Recommended:** 2026-11-01 (after applying fixes)
