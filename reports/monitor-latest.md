# Website Monitor Report

**Timestamp:** 2026-11-01T02:04:00Z  
**Overall Status:** ⚠️ **NEEDS ATTENTION** - Build success, but lint errors and security vulnerabilities present

---

## Summary

The Movena website build completes successfully. The project has **50 ESLint errors** in generated components (unescaped entities) plus 2 warnings about image optimization, and **25 security vulnerabilities** (1 critical in Next.js, 6 high, 15 moderate, 3 low). Per project CLAUDE.md, Next.js version pinning is an intentional architectural decision requiring product team review.

---

## Build Status: ✅ SUCCESS

- **Command:** `npm run build`
- **Result:** Build completed successfully
- **Pages built:** 65 routes across 2 locales (en, da)
- **Status:** ✅ Production build generated without errors

---

## Lint Status: ❌ FAILED (50 errors, 2 warnings)

- **Command:** `npm run lint`
- **Result:** Exit code 1 - **FAILED**
- **Error Count:** 50 errors (primarily in generated components)
- **Warning Count:** 2 warnings

### Errors - Unescaped Entities (50 instances):
- **Rule:** `react/no-unescaped-entities`
- **Files affected:** 14 auto-generated component files
  - `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `ErrorEn.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx`
- **Issue:** Unescaped apostrophes in JSX content. Should use `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` entities
- **Impact:** Code quality blocker; prevents lint-gated CI/CD pipelines

**Distribution by file**:
- `ForsideEn.tsx`: 15 errors
- `HavStyrPaaDagenEn.tsx`: 8 errors
- `VindFlereFlytningerEn.tsx`: 8 errors
- `BlogPostEn.tsx`: 7 errors
- Others: 1-5 errors each

### Warnings - Image Optimization (2 instances):
- **Location:** `components/SplitSection.tsx` (lines 93, 96)
- **Rule:** `@next/next/no-img-element`
- **Issue:** Using raw `<img>` instead of Next.js `<Image />` component
- **Impact:** Performance degradation (slower LCP, higher bandwidth)

---

## Security Audit Status: ⚠️ 25 Vulnerabilities

- **Command:** `npm audit`
- **Result:** Exit code 1 - **VULNERABILITIES DETECTED**
- **Total Vulnerabilities:** 25
  - 🔴 **Critical:** 1 (Next.js)
  - 🟠 **High:** 6 (brace-expansion, minimatch, postcss, source-map-js)
  - 🟡 **Moderate:** 15 (ESLint, deepmerge, postcss-selector-parser, etc.)
  - 🟢 **Low:** 3

### CRITICAL Vulnerability (1) 🔴

**next** (0.9.9 - 16.3.0-preview.10) — Next.js 13 Security Issues

**Note from CLAUDE.md**: "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

Multiple critical vulnerabilities in Next.js 13.x including:
- Server-Side Request Forgery (SSRF) in Server Actions
- Denial of Service in image optimization and Server Components
- Information exposure in dev server (missing origin verification)
- Cache key confusion for Image Optimization API
- Authorization bypass vulnerability
- Middleware redirect handling leading to SSRF
- Content injection in image optimization
- Race condition to cache poisoning
- HTTP request smuggling in rewrites
- XSS in App Router (CSP nonces)
- Remote Code Execution on Windows-hosted servers
- Remote Code Execution in Image Optimization (AVIF/SVG files)
- Unauthenticated disclosure of Server Function endpoints
- And 17+ additional security issues

### HIGH-Severity Vulnerabilities (6) 🟠

1. **brace-expansion** (≤1.1.20 || 2.0.0-2.1.6)
   - Quadratic-time expansion causes CPU denial of service (GHSA-q2hr-2g5m-vwhr)
   - Uncontrolled recursion on nested braces (GHSA-qhr7-859c-m2p7)
   - DoS via recursion in parseCommaParts (GHSA-6j4f-fj2g-mc7p)
   - **Location:** `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion` and `node_modules/brace-expansion`
   - **Fix Available:** `npm audit fix`

2. **minimatch** (≤11.0.0)
   - ReDoS via repeated wildcards (GHSA-3ppc-4f35-3m26)
   - ReDoS from multiple non-adjacent GLOBSTAR segments (GHSA-7r86-cg39-jmmj)
   - Catastrophically backtracking regex from nested *() extglobs (GHSA-23c5-xmqv-rm74)
   - Potential DoS via globparts amplification (GHSA-g3hv-75wg-m249)
   - **Location:** ESLint chain: `@typescript-eslint/typescript-estree` → `minimatch`
   - **Fix:** Requires ESLint 4.0.0+ (breaking change)

3. **postcss** (≤8.5.22)
   - XSS via unescaped `</style>` in CSS stringify output (GHSA-qx2v-qp2m-jg93)
   - Arbitrary file read via attacker-controlled sourceMappingURL (GHSA-6g55-p6wh-862q)
   - Path traversal in source map auto-loading (GHSA-r28c-9q8g-f849)
   - **Location:** `node_modules/next/node_modules/postcss`
   - **Fix:** Requires Next.js upgrade (v16.4.3+)

4. **source-map-js** (1.0.0-1.2.1)
   - Event-loop denial of service via indexed source-map section offsets (GHSA-68fv-2mgg-jv7q)
   - **Fix Available:** `npm audit fix`

### Moderate Vulnerabilities (15) 🟡

1. **deepmerge** (≥4.2.0)
   - Prototype poisoning of returned objects (GHSA-gcqx-w48m-w2h4)
   - **Dependency Chain:** `@react-email/render` → `html-to-text` → `deepmerge`
   - **Fix:** `npm audit fix --force` (breaking change to @react-email/render v2.2.0)

2. **postcss-selector-parser** (<6.1.5)
   - Quadratic complexity in flat selector parsing causes CPU exhaustion (GHSA-rj75-hqrm-r3gf)
   - **Affects:** `@tailwindcss/typography`, `postcss-nested`, `tailwindcss`
   - **Fix:** `npm audit fix --force`

3. Additional moderate issues in ESLint ecosystem and Next.js dependencies

### Low Vulnerabilities (3) 🟢

(Transitive dependencies with lower impact)

---

## Root Cause Analysis

### 1. Generated Components with Unescaped Entities
- **Issue:** 50 lint errors in `components/generated/` files
- **Cause:** Auto-generated components contain unescaped apostrophes in JSX
- **Impact:** Blocks linting from passing; prevents merge with lint-gated CI/CD
- **Solution:** Regenerate components with proper entity escaping, or add eslintignore for generated folder

### 2. Legacy Image Usage
- **Issue:** 2 warnings in `SplitSection.tsx` using native `<img>` tags
- **Cause:** Code predates Next.js Image component optimization
- **Impact:** Performance penalty (slower LCP, higher bandwidth)
- **Solution:** Replace with `<Image />` from `next/image`

### 3. Next.js 13 Security Exposure (Known Architectural Decision)
- **Current:** Next.js 13.x with 30+ published security advisories
- **Note:** CLAUDE.md documents this as intentional architectural decision
- **Impact:** Multiple critical vulnerabilities (SSRF, auth bypass, DoS, RCE)
- **Solution:** Requires product team approval for Next.js 13→16+ upgrade
- **Status:** Not a monitor action per CLAUDE.md

### 4. ESLint Ecosystem Outdated
- **Current:** ESLint 8.57.1 (deprecated, end-of-life) with cascading vulnerable dependencies
- **Affected:** `minimatch`, `brace-expansion`, `@typescript-eslint/*`
- **Impact:** 6+ high-severity vulnerabilities in build toolchain
- **Solution:** Requires ESLint major version upgrade (4.0.0+) with breaking change testing

---

## Dependency Statistics

- **Total Dependencies:** 418 packages installed (417 + 1 npm)
- **Vulnerable Packages:** 25
- **Direct Vulnerable:** 2 (next, @react-email/render, @tailwindcss/typography - via transitive chains)
- **Transitive Vulnerable:** 23

---

## Recommendations

### 🔴 CRITICAL (Blocking Issues):

1. **Fix Lint Errors in Generated Components (50 errors)**
   - **Files:** `components/generated/*.tsx` (ForsideEn, HavStyrPaaDagenEn, etc.)
   - **Action:** Regenerate components with proper HTML entity escaping for apostrophes
   - **Alternative:** Add `components/generated/` to `.eslintignore` as temporary measure
   - **Impact:** Unblocks lint-gated CI/CD pipelines
   - **Estimated Effort:** Low-medium (depends on generation process)

### 🟠 HIGH PRIORITY (Security):

2. **Security Vulnerabilities Awareness**
   - **Next.js critical issues:** Multiple SSRF, auth bypass, RCE, and DoS vulnerabilities in v13
   - **Note:** Per CLAUDE.md, this is an intentional architectural decision requiring product team approval
   - **Action:** Escalate to product for Next.js 13→16+ upgrade planning
   - **Status:** Not a monitor action

3. **High-Severity Dependency Vulnerabilities**
   - **brace-expansion DoS:** `npm audit fix` available (low-risk patch)
   - **minimatch DoS:** Requires ESLint 4.x upgrade (breaking change)
   - **postcss XSS/disclosure:** Requires Next.js upgrade (blocks on product decision)
   - **source-map-js DoS:** `npm audit fix` available (low-risk patch)

### 🟡 MEDIUM PRIORITY (Performance):

4. **Replace `<img>` with `<Image />` in SplitSection.tsx**
   - **Location:** Lines 93, 96
   - **Benefit:** Faster LCP, reduced bandwidth
   - **Estimated Effort:** Low (2 component replacements)

5. **Code Quality: Lint Warnings**
   - **Issue:** @next/next/no-img-element warnings (related to #4 above)
   - **Impact:** Post-fix, lint should have no warnings

### 📋 LONG-TERM (Product Decision):

6. **Plan Next.js 13→16 Upgrade**
   - **Requirement:** Product team decision per CLAUDE.md
   - **Impact:** Fixes 30+ published Next.js CVEs
   - **Effort:** Major version upgrade with testing, migration planning
   - **Timeline:** To be determined by product

---

## Notes for Operations

- **Lint blocker:** The 50 generated component errors prevent `npm run lint` from exiting cleanly (exit code 1)
- **Build status:** Build completes successfully despite lint errors
- **Security note:** Per CLAUDE.md, do not run `npm audit fix --force` without product approval; it would upgrade Next.js which is a documented architectural decision
- **Patching:** Use scoped `overrides` in package.json (per CLAUDE.md pattern) rather than broad `npm audit fix`

---

## Exit Codes

| Check | Status | Code | Finding |
|-------|--------|------|---------|
| Build | ✅ Success | 0 | Production build succeeds, 65 pages generated |
| Lint | ❌ Failed | 1 | 50 errors (unescaped entities in generated components), 2 warnings (image optimization) |
| Audit | ❌ Failed | 1 | 25 vulnerabilities detected (1 critical Next.js, 6 high, 15 moderate, 3 low) |

**Overall:** Build succeeds. Lint and audit checks report issues. Deploy blocked until generated component linting is addressed.

---

## Build Output Summary

```
✓ Compiled successfully
✓ Generating static pages (65/65)
✓ Generating static pages complete
```

Routes generated: 65 pages across 2 locales (en, da)
- Homepage and locale root pages (2)
- About, Blog, Demo booking pages (9)
- Blog post pages (25)
- Feature pages: Savings calculator, Moving finder, Team tools (9)
- API routes (3)
- Info pages: Contact, Privacy, Dataportability (6)
- Static files: robots.txt, sitemap.xml

---

## Metrics

- **Dependencies:** 418 packages installed
- **Build Success Rate:** 100% (successful compilation)
- **Linting Status:** Failed with errors in generated code
- **Security Vulnerabilities:** 25 total
- **Page Count:** 65 static routes
- **Middleware Size:** 27.9 KB
- **Shared JS:** 80.6 KB
- **Page Bundle Range:** 5.2-24.6 KB (varies by route)

---

**Last Run:** 2026-11-01 02:04 UTC  
**Next Check:** Recommended after fixing generated component linting
