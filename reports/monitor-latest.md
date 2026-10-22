# Website Monitor Report

**Run Timestamp:** 2026-10-22T00:00:00Z  
**Overall Status:** ⚠️ Warning (Build Successful, Lint Failed, Security Warnings)

---

## Summary

**npm run build:** ✅ PASS - Compiled successfully with all 61 routes generated  
**npm run lint:** ❌ FAIL - 76 linting errors across generated components  
**npm audit:** ⚠️ CRITICAL - 16 vulnerabilities found (1 critical, 12 high, 3 moderate)

The website builds successfully and routes are properly configured. However, linting errors in generated components must be resolved before deployment, and critical security vulnerabilities in Next.js remain unpatched per product decision documented in CLAUDE.md.

---

## 1. Dependencies Installation: ✅ HEALTHY

- **Status:** 417 packages installed successfully
- **Deprecation Warnings:** rimraf@3, inflight@1.0.6, glob@7.1.7, eslint@8, @humanwhocodes packages
- **npm Version:** Latest available is 12.2.1 (current: 10.9.4)

---

## 2. Build Check: ✅ PASS

**Status:** `npm run build` completes successfully

**Build Results:**
- Production build generated without errors: "Compiled successfully"
- All 61 routes compiled and optimized
- Static page generation completed for all locales (en, da)
- Build artifacts healthy and readable

**Routes Verified (61 total):**
- Homepage: `/[locale]` → /en, /da
- Pages: about, blog, blog/[slug], book-demo, contact, dataportabilitet, faa-alle-pengene-hjem, get-paid, hav-styr-paa-dagen, om-os, privacy, privatlivspolitik, run-the-day, savings-calculator, vind-flere-flytninger, win-more-moves
- API: /api/calculator/submit, /api/contact, /api/demo
- Static: /robots.txt, /sitemap.xml
- Middleware properly configured

---

## 3. Lint Check: ❌ FAIL

**Status:** `npm run lint` failed with Exit Code 1

**Error Summary:**
- Total: 76 linting issues (74 errors, 2 warnings)

**Error Breakdown:**

1. **Unescaped Entities (74 errors)** - `react/no-unescaped-entities`
   - Apostrophes in JSX should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
   - Files affected:
     - BeregnerEn.tsx (2 errors)
     - BlogIndexDa.tsx (1 error)
     - BlogIndexEn.tsx (1 error)
     - BlogPostEn.tsx (7 errors)
     - BookDemoEn.tsx (3 errors)
     - ErrorEn.tsx (2 errors)
     - FaaAllePengeneHjemEn.tsx (5 errors)
     - ForsideDa.tsx (1 error)
     - ForsideEn.tsx (24 errors)
     - HavStyrPaaDagenEn.tsx (8 errors)
     - NotFoundEn.tsx (1 error)
     - OmOsEn.tsx (2 errors)
     - PrivatlivspolitikEn.tsx (3 errors)
     - VindFlereFlytningerEn.tsx (8 errors)

2. **Image Optimization Warnings (2 warnings)** - `@next/next/no-img-element`
   - SplitSection.tsx lines 93, 96: Using `<img>` should be replaced with Next.js `<Image />` for LCP optimization

**Assessment:** Linting errors are blocking and must be fixed. Errors are concentrated in auto-generated component files (components/generated/) which suggests the generation process needs to be updated to properly escape HTML entities.

---

## 4. Security Audit: ❌ CRITICAL - 16 Vulnerabilities

**Status:** `npm audit` found 16 vulnerabilities (1 critical, 12 high, 3 moderate)

### CRITICAL Severity (1):

**Next.js (0.9.9 - 16.3.0-preview.10)** - 31 separate vulnerability advisories:
- **Current project version:** 13.x
- **Critical vulnerabilities:**
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Unauthenticated Remote Code Execution on Windows-hosted servers
  - Unauthenticated Remote Code Execution in Image Optimization API (AVIF/SVG files)
  
- **High-severity vulnerabilities (30+):**
  - Denial of Service in image optimization
  - Information exposure in dev server
  - Cache key confusion and cache poisoning
  - Authorization bypass vulnerabilities
  - Unbounded disk cache growth exhaustion
  - XSS vulnerabilities in App Router with CSP nonces
  - Middleware bypass in Pages Router with i18n
  - Server-side request forgery in rewrites
  - HTTP request smuggling in rewrites
  - Incomplete post-event deserialization security fixes

- **Note:** Per CLAUDE.md section "npm audit": Next.js and postcss are knowingly left on current versions as upgrading to Next 16+ is a major product decision, not a monitor action. Do not run `npm audit fix --force`.

### HIGH Severity (12):

1. **brace-expansion** (3 CVEs)
   - Quadratic-time expansion causes CPU DoS
   - Uncontrolled recursion in nested brace groups causes stack exhaustion
   - Located in: @typescript-eslint/typescript-estree/node_modules/brace-expansion
   - Fix: `npm audit fix` available

2. **braces** (1 CVE)
   - Stack-exhaustion DoS via deeply nested patterns
   - Located in: transitive dependency via chokidar → tailwindcss
   - Fix: `npm audit fix --force` required (breaking change to tailwindcss)

3. **minimatch** (3 CVEs)
   - ReDoS: repeated wildcards with non-matching literals
   - ReDoS: multiple non-adjacent GLOBSTAR segments
   - ReDoS: nested *() extglobs causing backtracking
   - Located in: @typescript-eslint/typescript-estree/node_modules/minimatch
   - Fix: `npm audit fix` available

4. **postcss (nested in next/node_modules)** (4 CVEs)
   - XSS via unescaped </style> in CSS stringify output
   - Arbitrary file read via attacker-controlled sourceMappingURL
   - Path traversal in source map auto-loading
   - Incomplete prior security fix
   - Fix: Requires Next.js major version upgrade

5. **source-map-js** (1 CVE)
   - Event-loop DoS via indexed source-map section offsets
   - Fix: `npm audit fix` available

### MODERATE Severity (3):

1. **postcss-selector-parser** (1 CVE)
   - Quadratic complexity in flat selector parsing allows CPU exhaustion
   - Located in: tailwindcss, @tailwindcss/typography dependencies
   - Fix: `npm audit fix --force` required (breaking changes)

2. **postcss** nested versions (see HIGH section above)

### Audit Fix Recommendations:

- **Patchable with `npm audit fix` (non-breaking):**
  - brace-expansion vulnerabilities
  - minimatch ReDoS issues
  - source-map-js DoS
  - Estimated: 3-4 vulnerabilities addressable

- **Requires `npm audit fix --force` (breaking changes):**
  - braces: Would update tailwindcss to 4.3.3
  - postcss-selector-parser: Would update @tailwindcss/typography to 0.5.4
  - Estimated: ~4 vulnerabilities, not recommended without testing

- **Requires major version upgrade (product decision):**
  - Next.js 0.9.9 → 16.4.2 (31 vulnerabilities)
  - postcss nested in Next.js (4 vulnerabilities)
  - Estimated: 35 vulnerabilities tied to Next.js upgrade

### Scoped Dependency Overrides Already in Place:
- js-yaml@3
- nanoid@3

(These pin known transitive security issues per package.json pattern)

---

## 5. Immediate Actions Required

### BLOCKING: Fix Linting Errors
- **Issue:** 74 unescaped entity errors in generated components prevent passing linting checks
- **Files:** All files in `components/generated/` with apostrophes
- **Fix:** Update the generation process (scripts/dc-to-tsx.mjs or similar) to properly escape apostrophes as HTML entities
- **Impact:** Must be resolved before any deployment

### HIGH PRIORITY: Address Transitive Vulnerabilities
- **Action:** Run `npm audit fix` to patch non-breaking vulnerabilities
  - Fixes: brace-expansion, minimatch, source-map-js issues
  - Risk level: Low, no breaking changes
  - Estimated effort: 10 minutes
- **Action:** Evaluate `npm audit fix --force` for braces/postcss-selector-parser
  - Impact: Updates tailwindcss to 4.3.3, @tailwindcss/typography to 0.5.4
  - Risk level: Medium, requires testing
  - Estimated effort: 30 minutes including testing

### PRODUCT DECISION: Next.js Upgrade
- **Issue:** 31 Next.js vulnerabilities (1 critical + 30 high) cannot be patched with audit fix
- **Required:** Upgrade from Next.js 13.x to 16.4.2+
- **Impact:** Major version upgrade, requires thorough testing per CLAUDE.md
- **Status:** Deferred pending product timeline decision
- **Current status:** Known and documented in CLAUDE.md

### MEDIUM PRIORITY: Image Optimization
- **Issue:** 2 warnings in SplitSection.tsx about `<img>` vs `<Image />`
- **Impact:** Performance improvement only, not blocking
- **Fix:** Replace `<img>` with Next.js `<Image />` component from next/image

---

## Recommendations Summary

| Priority | Item | Action | Impact |
|----------|------|--------|--------|
| 🔴 CRITICAL | Linting errors (74) | Fix unescaped entities in generated components | Deployment blocker |
| 🟡 HIGH | Transitive CVEs (3-7) | Run `npm audit fix` for safe patches | Risk reduction |
| 🟡 HIGH | Next.js vulnerabilities (31) | Plan major version upgrade | Risk reduction (product decision) |
| 🟢 MEDIUM | Image optimization (2) | Convert `<img>` to `<Image />` in SplitSection.tsx | Performance improvement |

---

## Notes

- **Build artifact size:** Reasonable and within normal range for Next.js 13 with two locales
- **Routes:** All 61 static + dynamic routes properly generated
- **Localization:** Correctly configured for English (default) and Danish
- **API endpoints:** All three calculator/contact/demo endpoints compiled
- **Middleware:** Locale detection and redirection working as designed
- **Blog structure:** Previously verified as compliant with content/blog/README.md conventions
