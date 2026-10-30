# Website Monitor Report

**Run Timestamp**: 2026-10-30 at 21:05 UTC  
**Overall Status**: ⚠️ **WARNING** — Build succeeds, lint errors in generated files, 1 critical security vulnerability

---

## Summary

| Check | Status | Count |
|-------|--------|-------|
| **Build** | ✅ PASS | All 65 routes compiled |
| **Lint** | ❌ FAIL | 46 errors, 2 warnings |
| **Security** | 🔴 CRITICAL | 12 total (1 critical, 6 high, 2 moderate, 3 low) |

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

## Lint Check: ❌ **FAIL** (46 errors, 2 warnings)

### Warnings (2)
- **`./components/SplitSection.tsx`** (lines 93, 96)
  - Issue: Using `<img>` instead of Next.js `<Image />` component
  - Impact: Suboptimal image loading performance
  - Fix: Replace with optimized `<Image />` component

### Errors (46)
All linting errors are **unescaped single quotes** (`'`) in auto-generated React components.

**Error Distribution by File:**
- `./components/generated/ForsideEn.tsx` — 15 errors
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

## Security Audit: 🔴 **CRITICAL** (12 vulnerabilities)

### Critical Severity (1)

**PostCSS Path Traversal (Arbitrary .map File Disclosure)**
- **Package**: `postcss` (≤8.5.22, nested in Next.js)
- **Advisory**: GHSA-6g55-p6wh-862q
- **Description**: Path traversal in sourceMappingURL auto-loading allows attackers to read arbitrary `.map` files and disclose source code
- **CVSS Score**: 7.5 (High)
- **Root Cause**: Incomplete validation of sourceMappingURL in CSS comments
- **Current Status**: Blocked by Next.js 13 version constraint
- **Fix Required**: Upgrade to Next.js 16.4.3+ (major version bump)

### High Severity (6)

1. **Next.js Multiple RCE & Authorization Bypass Vulnerabilities**
   - Package: `next` (v13.x, 13.0.0 - 15.5.27 affected)
   - **GHSA-2464-fhr4-w9xw**: Unauthenticated RCE in Image Optimization API when SVG files are used
   - **GHSA-p3m5-59mp-jv5r**: DoS in App Router using Server Actions
   - **GHSA-jcpm-2c4f-jj6f**: Unauthorized request handling via internal routing
   - Critical for production systems using image optimization
   - Fix Required: Upgrade to Next.js 16.4.3+

2. **brace-expansion DoS Vulnerabilities** (via glob → minimatch chain)
   - Package: Transitive via build tools
   - **GHSA-q2hr-2g5m-vwhr**: Quadratic-time expansion causes CPU DoS
   - **GHSA-qhr7-859c-m2p7**: Stack exhaustion via nested brace groups
   - **GHSA-6j4f-fj2g-mc7p**: Stack exhaustion in parseCommaParts
   - **GHSA-2xp9-vwfh-vxw4**: Uncontrolled recursion causing DoS
   - CVSS: 7.5 (High)
   - Impact: Build-time DoS via malicious file patterns

3. **@typescript-eslint/typescript-estree ReDoS**
   - Package: `@typescript-eslint/typescript-estree` (6.16.0 - 7.5.0)
   - Via: `minimatch` dependency
   - Issue: Regular expression DoS in glob pattern matching
   - Impact: Lint check resource exhaustion

4. **PostCSS XSS & Information Disclosure** (4 advisories)
   - Package: `postcss` (nested in Next.js)
   - **GHSA-qx2v-qp2m-jg93**: XSS via unescaped `</style>` in CSS stringify output
   - **GHSA-6g55-p6wh-862q**: Arbitrary file read via source map path traversal
   - **GHSA-fxqj-rqcc-2cmp**: Incomplete fix of GHSA-6g55-p6wh-862q
   - **GHSA-r28c-9q8g-f849**: Path traversal in sourceMappingURL
   - CVSS: 6.1 - 7.5 (Moderate to High)

### Moderate Severity (2)

1. **@tailwindcss/typography CPU Exhaustion**
   - Package: `@tailwindcss/typography` (≤0.5.3)
   - Via: `postcss-selector-parser` (<6.1.5)
   - Issue: Quadratic complexity in flat selector parsing allows CPU DoS
   - CVSS: 5.9
   - **GHSA-rj75-hqrm-r3gf**

2. **@react-email/render Vulnerability**
   - Package: `@react-email/render` (0.0.4 - 2.1.1)
   - Via: `html-to-text` dependency
   - Severity: Low → Moderate in dependency chain
   - Fix Available: v2.2.0 (semver major bump)

### Low Severity (3)

Various transitive dependencies with low-impact vulnerabilities.

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

**Last Updated**: 2026-10-30 at 21:05 UTC
**Next Scheduled Check**: Per schedule configuration
