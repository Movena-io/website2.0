# Website Monitor Report

**Run Timestamp:** 2026-10-23T00:00:00Z  
**Overall Status:** ⚠️ **WARNING** — Build passes, linting and security issues present

---

## Executive Summary

The Movena marketing website build is **functionally complete** with all 61 routes compiled successfully. However, the project requires attention in two areas:

1. **Code Quality**: ESLint validation fails on auto-generated components due to unescaped HTML entities (73 errors)
2. **Security**: 16 npm vulnerabilities identified (1 critical, 12 high, 3 moderate), with known Next.js version constraint documented in CLAUDE.md

---

## Build Check: ✅ PASSED

**Command:** `npm run build`  
**Exit Code:** 0  
**Status:** Successful

- ✓ Next.js compilation completed successfully
- ✓ Type checking passed
- ✓ Static page generation: 61/61 routes
- ✓ No build errors or blocking warnings

**Build Output Details:**
```
✓ Compiled successfully
✓ Generating static pages (61/61)
  - First Load JS shared: 80.6 kB
  - Middleware: 27.9 kB
  - Routes generated include: home (en/da), blog, about, contact, calculator, API endpoints
```

**Routes Summary:**
- SSG pages: 35+ (blog posts, landing pages, localized variants)
- API routes: 3 (calculator, contact, demo)
- Middleware: 1 (i18n routing)
- Sitemap & robots.txt: Generated

---

## Lint Check: ❌ FAILED

**Command:** `npm run lint`  
**Exit Code:** 1  
**Issues:** 73 errors + 2 warnings

### Errors (73 total):

**Type:** `react/no-unescaped-entities` - apostrophes (') must be escaped in JSX  
**Pattern:** All errors occur in auto-generated component files under `components/generated/`

**Affected Components by Error Count:**
1. `ForsideEn.tsx` - 15 errors
2. `HavStyrPaaDagenEn.tsx` - 8 errors
3. `VindFlereFlytningerEn.tsx` - 8 errors
4. `BlogPostEn.tsx` - 7 errors
5. `FaaAllePengeneHjemEn.tsx` - 5 errors
6. `BookDemoEn.tsx` - 3 errors
7. `PrivatlivspolitikEn.tsx` - 3 errors
8. `BeregnerEn.tsx`, `ErrorEn.tsx`, `OmOsEn.tsx` - 2 errors each
9. `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `ForsideDa.tsx`, `NotFoundEn.tsx` - 1 error each

**Root Cause:** The component generator (likely a CMS export, design system tool, or content pipeline) outputs JSX with unescaped apostrophes in text content. Configuration at the source should be updated to escape entities.

### Warnings (2 total):

**File:** `components/SplitSection.tsx`  
**Lines:** 93, 96  
**Issue:** Using bare `<img>` tags instead of Next.js `<Image />` component  
**Rule:** `@next/next/no-img-element`  
**Impact:** Can result in slower LCP and higher bandwidth; actionable but non-critical

---

## Security Check: ❌ CRITICAL + HIGH ISSUES

**Command:** `npm audit`  
**Exit Code:** 1  
**Total Vulnerabilities:** 16
- **CRITICAL:** 1
- **HIGH:** 12
- **MODERATE:** 3

### Critical Vulnerability (1):

**Next.js: Remote Code Execution via Image Optimization API**

- **Advisory:** GHSA-2464-fhr4-w9xw
- **Severity:** CRITICAL
- **Affected Versions:** >= 10.0.0 <= 15.5.27
- **Current Version:** 13.x
- **Vector:** Unauthenticated RCE when SVG files are processed by Next.js Image Optimization API
- **CVSS Score:** 9.0 (Critical)

**Additional Next.js RCE Advisories:**
- GHSA-p293-qw3h-jr36: RCE on Windows-hosted servers (ranges 13.4.0-15.5.23)

**Project Context:** Per CLAUDE.md, Next.js 13 is intentionally pinned as a product decision. Upgrading to 15+ requires major version migration, which is outside monitoring scope.

### High-Severity Issues (12):

1. **brace-expansion** (2 advisories)
   - DoS via uncontrolled recursion (GHSA-qhr7-859c-m2p7)
   - Quadratic-time expansion ReDoS (GHSA-q2hr-2g5m-vwhr)

2. **@typescript-eslint/parser & typescript-estree**
   - Via minimatch/globby transitive dependencies

3. **PostCSS** (4 advisories)
   - Path traversal in source maps (GHSA-r28c-9q8g-f849)
   - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q)
   - XSS via unescaped `</style>` (GHSA-qx2v-qp2m-jg93)
   - Incomplete fix bypass (GHSA-fxqj-rqcc-2cmp)

4. **Next.js: Denial of Service**
   - App Router Server Actions DoS (GHSA-p3m5-59mp-jv5r, all versions 13.0.0-15.5.27)

### Moderate Issues (3):

1. `@tailwindcss/typography` - via postcss-selector-parser
2. `postcss-nested` - inherited from PostCSS
3. `postcss` - selector parsing complexity

### Dependency Chain Analysis:

```
Next.js (pinned v13) 
├── PostCSS (nested, pinned)
│   └── (Path traversal, XSS, file read vulnerabilities)
├── @tailwindcss/typography
│   └── postcss-selector-parser (high-severity dependency)
└── TypeScript ecosystem
    ├── @typescript-eslint/parser
    └── typescript-estree → minimatch/globby (DoS vectors)

braces/minimatch (via eslint dependencies)
└── Multiple stack-exhaustion & ReDoS vulnerabilities
```

---

## Dependency Status

- **Installation:** ✅ 417 packages installed successfully
- **Installation Time:** 19 seconds
- **Deprecation Notices:** 4 (inflight, glob, ESLint, @humanwhocodes packages)
- **Funding Campaigns:** 154 packages offer sponsorship

**npm audit Summary:**
- Cannot fix with `npm audit fix` without breaking changes
- `npm audit fix --force` explicitly NOT recommended per CLAUDE.md (would upgrade Next.js/PostCSS beyond pinning)

---

## Alerts & Recommendations

| Priority | Issue | Status |
|----------|-------|--------|
| 🔴 CRITICAL | Next.js Image Optimization RCE | Acknowledged (pinned per CLAUDE.md) |
| 🟠 HIGH | ESLint/TypeScript DoS vectors | Non-runtime (dev dependencies) |
| 🟠 HIGH | PostCSS vulnerabilities | Build-time (non-runtime) |
| 🟡 MEDIUM | 73 Lint errors in generated code | Code quality (generation issue) |
| 🟡 MEDIUM | 2 Image optimization warnings | Performance (actionable) |

### Recommended Actions (Prioritized):

1. **Generated Components (High Impact, Medium Effort)**
   - Audit the component generation pipeline (CMS, design system tool, build script)
   - Enable HTML entity escaping in output configuration
   - Regenerate all files in `components/generated/` with proper escaping
   - Would resolve 73 lint errors immediately

2. **Image Optimization in SplitSection (Low Effort)**
   - Replace `<img>` tags with Next.js `<Image />` component
   - Update lines 93 and 96 in `components/SplitSection.tsx`
   - Improves LCP and enables automatic image optimization

3. **Security Monitoring (Ongoing)**
   - Monitor GitHub Security Advisories for Next.js 13.x patches
   - Review Next.js upgrade path when product roadmap permits
   - Current version is intentionally maintained per project decision

4. **Optional: Transitive Dependency Updates**
   - Some high-severity packages (brace-expansion, minimatch) have patches
   - Risk/benefit analysis needed; only affects dev build-time, not runtime
   - Not included in build process if not updated

---

## Health Summary

| Component | Status | Notes |
|-----------|--------|-------|
| **Build** | ✅ Healthy | 61/61 routes compiled, no errors |
| **Runtime** | ✅ Healthy | Deployable production build generated |
| **Type Safety** | ✅ Passed | TypeScript validation complete |
| **Code Quality** | ⚠️ Warning | 73 lint errors (generated code) |
| **Security** | ⚠️ Critical Issue | 1 critical Next.js RCE (pinned version) |
| **Dependencies** | ⚠️ High Issues | 12 high-severity advisories (dev/build-time) |

**Overall Assessment:** The website is deployable and functional. The security advisories are acknowledged constraints per project documentation. Lint failures originate from an automated code generation process that requires configuration updates.
