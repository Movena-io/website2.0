# Website Monitor Report

**Run Timestamp**: 2026-10-31 at 03:05 UTC  
**Overall Status**: ⚠️ **ISSUES FOUND** — Linting errors in generated files + accepted security vulnerabilities

---

## Summary

| Check | Status | Count |
|-------|--------|-------|
| **Build** | ✅ PASS | All 65 routes compiled |
| **Lint** | ❌ FAIL | 67 errors (66 unescaped entities, 2 img warnings) |
| **Security** | 🔴 CRITICAL | 25 vulnerabilities (1 critical, 6 high, 15 moderate, 3 low) |

---

## Build Check: ✅ **PASS**

The Next.js build completed successfully without errors.

**Output Summary:**
- ✅ Compiled successfully
- ✅ 65 pages generated
- ✅ All routes compiled without errors
- ✅ Static generation completed
- ✅ Build traces collected

**Size Metrics:**
- First Load JS (shared): 80.6 kB
- Middleware: 27.9 kB
- Optimized output delivered

**Routes Generated:**
- Homepage and localized variants (`[locale]`, `[locale]/en`, `[locale]/da`)
- 25+ blog posts across both locales
- Product pages (win-more-moves, run-the-day, etc.)
- Demo booking, contact, and support pages
- API endpoints (calculator, contact, demo)

---

## Lint Check: ❌ **FAIL** (67 issues: 66 errors, 1 warning)

### Warnings (1)
- **`./components/SplitSection.tsx`** (lines 93, 96)
  - Issue: Using `<img>` instead of Next.js `<Image />` component
  - Impact: Suboptimal image loading performance
  - Fix: Replace with optimized `<Image />` component

### Errors (66)
All linting errors are **unescaped HTML entities** (primarily single quotes `'`) in auto-generated React components.

**Error Distribution by File:**
- `./components/generated/ForsideEn.tsx` — 19 errors
- `./components/generated/HavStyrPaaDagenEn.tsx` — 8 errors
- `./components/generated/VindFlereFlytningerEn.tsx` — 8 errors
- `./components/generated/BlogPostEn.tsx` — 7 errors
- `./components/generated/FaaAllePengeneHjemEn.tsx` — 5 errors
- `./components/generated/BookDemoEn.tsx` — 3 errors
- `./components/generated/PrivatlivspolitikEn.tsx` — 3 errors
- `./components/generated/BeregnerEn.tsx` — 2 errors
- `./components/generated/ErrorEn.tsx` — 2 errors
- `./components/generated/OmOsEn.tsx` — 2 errors
- `./components/generated/BlogIndexDa.tsx` — 1 error
- `./components/generated/BlogIndexEn.tsx` — 1 error
- `./components/generated/ForsideDa.tsx` — 1 error
- `./components/generated/NotFoundEn.tsx` — 1 error

**Root Cause:** The code generation pipeline that creates files in `components/generated/` does not properly escape HTML entities. Single quotes should be converted to `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Recommendation:** Fix the component generator source code rather than manually patching each generated file.

---

## Security Audit: 🔴 **CRITICAL** (25 vulnerabilities)

### Critical Severity (1)

**Next.js Multiple Security Vulnerabilities**
- **Package**: `next` (0.9.9 - 16.3.0-preview.10 affected, current: ~13.x)
- **Multiple Critical Advisories Including:**
  - **GHSA-fr5h-rqp8-mj6g**: Server-Side Request Forgery in Server Actions
  - **GHSA-3h52-269p-cp9r**: Information exposure in dev server
  - **GHSA-7gfc-8cq8-jh5f**: Authorization bypass vulnerability
  - **GHSA-4342-x723-ch2f**: Improper Middleware Redirect Handling Leads to SSRF
  - **GHSA-mwv6-3258-q52c**: DoS with Server Components
  - **GHSA-2xp9-vwfh-vxw4**: Unauthenticated RCE in Image Optimization API (SVG)
  - **GHSA-2464-fhr4-w9xw**: Unauthenticated RCE in Image Optimization API (SVG)
  - Plus 22 additional Next.js security advisories
- **Impact**: Critical for any production Next.js deployment
- **Current Status**: Intentionally constrained per CLAUDE.md (product decision pending)
- **Fix Required**: Upgrade to Next.js 16+ (major version bump)

### High Severity (6)

1. **brace-expansion DoS Vulnerabilities**
   - **Severity**: High
   - **Affected**: `@typescript-eslint/typescript-estree/node_modules/brace-expansion`
   - **Issues**:
     - **GHSA-q2hr-2g5m-vwhr**: Quadratic-time expansion causes CPU DoS
     - **GHSA-qhr7-859c-m2p7**: Stack exhaustion via nested brace groups
     - **GHSA-6j4f-fj2g-mc7p**: Stack exhaustion in parseCommaParts
   - **Impact**: Build-time resource exhaustion
   - **Fix Available**: Via `npm audit fix`

2. **minimatch ReDoS Vulnerabilities**
   - **Severity**: High  
   - **Affected**: Multiple locations in ESLint dependency chain
   - **Issues**:
     - **GHSA-3ppc-4f35-3m26**: ReDoS via repeated wildcards
     - **GHSA-7r86-cg39-jmmj**: ReDoS from multiple GLOBSTAR segments
     - **GHSA-23c5-xmqv-rm74**: Catastrophic backtracking via extglobs
     - **GHSA-g3hv-75wg-m249**: DoS via globparts amplification
   - **Impact**: Lint check resource exhaustion
   - **Fix Available**: Requires `npm audit fix --force` (breaking changes)

3. **PostCSS Vulnerabilities**
   - **Severity**: High
   - **Nested in**: `next/node_modules/postcss`
   - **Issues**:
     - **GHSA-qx2v-qp2m-jg93**: XSS via unescaped `</style>` in CSS output
     - **GHSA-6g55-p6wh-862q**: Arbitrary file read via sourceMappingURL
     - **GHSA-fxqj-rqcc-2cmp**: Incomplete fix of source map disclosure
     - **GHSA-r28c-9q8g-f849**: Path traversal in sourceMappingURL
   - **Impact**: Source code disclosure, XSS attacks
   - **Fix Required**: Blocked by Next.js upgrade

4. **source-map-js Event-Loop DoS**
   - **Severity**: High
   - **Affected**: `source-map-js` v1.0.0 - v1.2.1
   - **Issue**: Event-loop denial of service through indexed source-map offsets
   - **Fix Available**: Via `npm audit fix`

### Moderate Severity (15)

Multiple packages with moderate vulnerabilities:
- **@react-email/render** (v0.0.4 - 2.1.1): Depends on vulnerable html-to-text
- **@tailwindcss/typography**: Depends on vulnerable postcss-selector-parser
- **deepmerge**: Prototype poisoning vulnerability
- **postcss-selector-parser**: Quadratic complexity ReDoS
- **Various transitive dependencies** from eslint ecosystem

### Low Severity (3)

Minor vulnerabilities in transitive dependencies.

---

## Known Constraints

Per **CLAUDE.md**:
- Next.js and PostCSS are **knowingly constrained** to current versions
- Fixing requires Next.js 13 → 16 (major version upgrade)
- This is a **product decision deferred** for later
- **`npm audit fix --force` should NOT be run** — would break compatibility

**Deprecated Packages Installed:**
- `rimraf@3.0.2` (Security fixes in v4)
- `inflight@1.0.6` (Memory leak, no longer maintained)
- `glob@7.1.7` (Multiple published CVEs, fixed in v10)
- `eslint@8.57.1` (EOL, v9+ available)
- `@humanwhocodes/*` (Deprecated, use `@eslint/*` instead)

---

## Recommendations

### Priority 1: Fix Generated Code Quality
**Action:** Update the component generation pipeline to properly escape HTML entities
- Single quotes (`'`) → use `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- Affects: 14 files in `components/generated/`
- Time to Fix: 30 min (generator update) vs. hours (manual per-file)

### Priority 2: Optimize SplitSection.tsx
**Action:** Replace `<img>` with Next.js `<Image />` component
- Files: `./components/SplitSection.tsx` (lines 93, 96)
- Benefit: Automatic image optimization, LCP improvement

### Priority 3: Monitor Dependency Updates
**Action:** No immediate action on Next.js/PostCSS (constrained by product decision)
- Monitor for non-breaking patches to high-severity packages
- Plan Next.js 13→16 upgrade as separate initiative
- Track brace-expansion, minimatch updates for build tool chain

---

## Execution Details

**Test Environment:**
- Platform: Linux (remote execution container)
- Node.js: Current LTS
- npm: v10+

**Build Metrics:**
- Build time: ~30 seconds
- Lint check time: ~5 seconds
- Security audit time: ~10 seconds
- Total execution: ~2 minutes

**Files Modified:** None (monitoring only)
**Files Added:** None (monitoring only)
**Test Results:** See sections above

---

**Last Updated**: 2026-10-31 at 03:05 UTC
**Next Scheduled Check**: Per schedule configuration
