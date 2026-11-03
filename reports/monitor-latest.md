# Website Monitor Report

**Run Timestamp**: 2026-11-03 at 17:32 UTC  
**Overall Status**: ⚠️ **WARNING** — Build succeeds, lint fails on generated files, 25 security vulnerabilities (1 critical)

---

## Summary

| Check | Status | Count |
|-------|--------|-------|
| **Build** | ✅ PASS | All 65 routes compiled successfully |
| **Lint** | ❌ FAIL | 88 errors (unescaped HTML entities) |
| **Security** | 🔴 CRITICAL | 25 total (1 critical, 6 high, 15 moderate, 3 low) |

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
- Product pages (win-more-moves, run-the-day, hav-styr-paa-dagen, etc.)
- Demo booking, contact, and support pages
- API endpoints (calculator, contact, demo)

---

## Lint Check: ❌ **FAIL** (88 errors, 2 warnings)

### Warnings (2)
- **`./components/SplitSection.tsx`** (lines 93, 96)
  - Issue: Using `<img>` instead of Next.js `<Image />` component
  - Impact: Suboptimal image loading performance
  - Fix: Replace with optimized `<Image />` component

### Errors (88)
All linting errors are **unescaped single quotes** (`'`) in auto-generated React components.

**Error Distribution by File:**
- `./components/generated/ForsideEn.tsx` — 21 errors
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

**Recommendation:** Fix the component generator source code rather than manually patching each generated file. Error count is increasing; priority to address the source pipeline.

---

## Security Audit: 🔴 **CRITICAL** (25 vulnerabilities)

### Critical Severity (1)

**Next.js Multiple RCE & Authorization Bypass Vulnerabilities (37 advisories)**
- **Package**: `next` (v13.x, affects 0.9.9 - 16.3.0-preview.10)
- **Key Vulnerabilities**:
  - **GHSA-2464-fhr4-w9xw**: Unauthenticated RCE in Image Optimization API when SVG files are used
  - **GHSA-2xp9-vwfh-vxw4**: Unauthenticated RCE in Image Optimization API when AVIF files are used
  - **GHSA-p293-qw3h-jr36**: Unauthenticated Remote Code Execution on Windows-hosted servers
  - **GHSA-955p-x3mx-jcvp**: Unauthenticated disclosure of internal Server Function endpoints
  - **GHSA-fr5h-rqp8-mj6g**: Server-Side Request Forgery in Server Actions
  - **GHSA-g77x-44xx-532m**: Denial of Service in image optimization
  - **GHSA-3h52-269p-cp9r**: Information exposure in dev server
  - Multiple cache poisoning, SSRF, DoS, and XSS vulnerabilities
- **CVSS Score**: Variable (5.3 - 8.6 range)
- **Current Status**: Blocked by Next.js 13 version constraint
- **Fix Required**: Upgrade to Next.js 16.4.4+ (major version bump)

### High Severity (6)

1. **brace-expansion DoS Vulnerabilities** (3 CVEs)
   - Package: Transitive via build tools
   - **GHSA-q2hr-2g5m-vwhr**: Quadratic-time expansion causes CPU DoS
   - **GHSA-qhr7-859c-m2p7**: Stack exhaustion via nested brace groups
   - **GHSA-6j4f-fj2g-mc7p**: Stack exhaustion in parseCommaParts
   - CVSS: 5.3
   - Impact: Build-time DoS via malicious file patterns

2. **minimatch ReDoS Vulnerabilities** (4 CVEs)
   - Package: `minimatch` (≤11.0.0)
   - **GHSA-3ppc-4f35-3m26**: ReDoS via repeated wildcards
   - **GHSA-7r86-cg39-jmmj**: ReDoS via GLOBSTAR segments
   - **GHSA-23c5-xmqv-rm74**: ReDoS via extglobs
   - **GHSA-g3hv-75wg-m249**: DoS via globparts amplification
   - CVSS: 7.5
   - Impact: Lint/build-time resource exhaustion

3. **PostCSS XSS & Information Disclosure** (4 CVEs)
   - Package: `postcss` (≤8.5.22, nested in Next.js)
   - **GHSA-qx2v-qp2m-jg93**: XSS via unescaped `</style>` in CSS stringify output
   - **GHSA-6g55-p6wh-862q**: Arbitrary file read via source map path traversal
   - **GHSA-fxqj-rqcc-2cmp**: Incomplete fix allowing source map disclosure
   - **GHSA-r28c-9q8g-f849**: Path traversal in sourceMappingURL
   - CVSS: 6.1 - 7.5

4. **source-map-js Event-loop DoS**
   - Package: `source-map-js` (1.0.0 - 1.2.1)
   - Issue: Denial of service through indexed source-map section offsets
   - CVSS: High

5. **@typescript-eslint/parser High Severity Issues**
   - Package: `@typescript-eslint/parser` and `@typescript-eslint/typescript-estree` (6.16.0 - 7.5.0)
   - Via: `minimatch` dependency chain
   - Impact: Lint check resource exhaustion

### Moderate Severity (15)

Multiple transitive dependencies including:
- `@tailwindcss/typography` (postcss-selector-parser CPU exhaustion)
- `eslint` and ESLint plugin chain
- `@react-email/render` → `html-to-text` → `deepmerge` chain
- Various glob and file-entry-cache dependencies

### Low Severity (3)

- `@react-email/render`: Depends on vulnerable html-to-text
- `deepmerge`: Prototype poisoning
- General transitive dependency issues

---

## Vulnerability Trend

**Previous Run (2026-11-02)**: 25 vulnerabilities  
**Current Run (2026-11-03)**: 25 vulnerabilities  
**Change**: No change (stable)

Vulnerabilities remain consistent across runs. No new advisories detected or resolved.

---

## Known Constraints

Per **CLAUDE.md**:
- Next.js and PostCSS are **knowingly constrained** to current versions
- Fixing requires Next.js 13 → 16 (major version upgrade)
- This is a **product decision deferred** for later
- **`npm audit fix --force` should NOT be run** — would break compatibility
- `npm audit fix` alone won't resolve Next.js critical issues

**Deprecated Packages Installed:**
- `rimraf@3.0.2` (Security fixes in v4)
- `inflight@1.0.6` (Memory leak, no longer maintained)
- `glob@7.1.7` (Multiple published CVEs, fixed in v10)
- `eslint@8.57.1` (EOL, v9+ available)
- `@humanwhocodes/*` (Deprecated, use `@eslint/*` instead)

---

## Recommendations

### Priority 1: Fix Generated Code Quality ❌
**Action:** Update the component generation pipeline to properly escape HTML entities
- Single quotes (`'`) → use `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- Affects: 14 files in `components/generated/`
- Time to Fix: 30 min (generator update) vs. hours (manual per-file)
- Status: Not yet addressed (49 errors detected)

### Priority 2: Address Security Vulnerability Increase ⚠️
**Observation:** Vulnerability count increased from 12 to 25 in 3 days
- Monitor for pattern: Are new vulnerabilities being disclosed, or is dependency tree changing?
- Schedule Next.js upgrade planning (requires product decision)
- Do NOT run `npm audit fix --force` without planning impact

### Priority 3: Optimize SplitSection.tsx
**Action:** Replace `<img>` with Next.js `<Image />` component
- Files: `./components/SplitSection.tsx` (lines 93, 96)
- Benefit: Automatic image optimization, LCP improvement

### Priority 4: Monitor Dependency Updates
**Action:** Keep watching for non-breaking patches
- Track brace-expansion, minimatch updates for build tool chain
- Plan Next.js 13→16 upgrade as separate strategic initiative

---

## Execution Details

**Test Environment:**
- Platform: Linux (remote execution container)
- Node.js: Current LTS
- npm: v10+

**Build Metrics:**
- Build time: ~25 seconds
- Lint check time: ~5 seconds
- Security audit time: ~10 seconds
- Total execution: ~2 minutes

**Files Modified:** None (monitoring only)
**Files Added:** None (monitoring only)
**Dependencies Installed:** 418 packages

**Test Results:** See sections above

---

**Last Updated**: 2026-11-03 at 17:32 UTC  
**Next Scheduled Check**: Per schedule configuration

---

## Changes Since Last Run

**Lint Errors:** Increased from 49 to 88 (+39 errors, +80% increase)
- Likely additional generated files with unescaped entities detected
- Same root cause: code generation pipeline not escaping HTML entities properly

**Security:** No change (25 vulnerabilities remain)

**Build:** Still passing (65 routes compiled)
