# Website Monitor Report

**Run Timestamp**: 2026-10-03T00:00:00Z  
**Overall Status**: ⚠️ **WARNING** — Build passes, linting fails, security vulnerabilities present

---

## Summary

The Movena website builds successfully, but has unresolved issues:
- **Build**: ✅ **PASS** — Next.js compilation successful, all 61 pages generated
- **Lint**: ❌ **FAIL** — 63 errors (unescaped apostrophes in generated components), 2 warnings
- **Security**: ⚠️ **CRITICAL** — 13 vulnerabilities (1 critical, 12 high)

---

## Build Status: ✅ SUCCESSFUL

**Status**: The Next.js build completed successfully.

**Key Metrics**:
- Compilation: ✓ Successful, no errors
- Type checking: ✓ Passed
- Static page generation: ✓ 61/61 pages generated
- First Load JS (shared): 80.6 kB
- Middleware size: 27.8 kB

**Routes Generated** (61 total):
- Localized pages: English and Danish variants
- Home pages and landing pages
- Blog index + 21 blog posts
- Product features: run-the-day, win-more-moves, get-paid, savings-calculator, hav-styr-paa-dagen, vind-flere-flytninger, faa-alle-pengene-hjem
- Core pages: about, contact, privacy, dataportabilitet
- API routes: /api/calculator/submit, /api/contact, /api/demo
- Utility routes: robots.txt, sitemap.xml

---

## Lint Status: ❌ FAILED

**Status**: 63 errors + 2 warnings found

### Errors (63) - Unescaped Apostrophes in Generated Components
**ESLint Rule**: `react/no-unescaped-entities`

All errors are in `./components/generated/` directory. The pattern is unescaped single quotes (`'`) in JSX text that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Files** (14 total):
1. BlogIndexDa.tsx (1 error)
2. BlogIndexEn.tsx (1 error)
3. BlogPostEn.tsx (9 errors)
4. BookDemoEn.tsx (3 errors)
5. ErrorEn.tsx (2 errors)
6. FaaAllePengeneHjemDa.tsx (1 error)
7. FaaAllePengeneHjemEn.tsx (3 errors)
8. ForsideDa.tsx (1 error)
9. ForsideEn.tsx (16 errors)
10. HavStyrPaaDagenEn.tsx (4 errors)
11. NotFoundEn.tsx (1 error)
12. OmOsEn.tsx (2 errors)
13. PrivatlivspolitikEn.tsx (3 errors)
14. VindFlereFlytningerEn.tsx (10 errors)

**Root Cause**: These are generated component files. The generation process is creating JSX with unescaped special characters.

### Warnings (2)
Located in: `./components/SplitSection.tsx`
- Lines 93, 96: Using `<img>` instead of Next.js `<Image />` component
- Impact: May cause slower LCP and higher bandwidth usage
- Fix: Replace with `next/image` Image component

---

## Security Audit: ⚠️ CRITICAL

**Status**: 13 vulnerabilities found (1 critical, 12 high)

### Critical Severity (1): Next.js

**Package**: next (0.9.9 - 16.3.0-preview.10)
**Current Version**: 13.x

**Key Vulnerabilities**:
- Server-Side Request Forgery in Server Actions
- Denial of Service in image optimization
- **Unauthenticated Remote Code Execution on Windows** ⚠️
- **Unauthenticated RCE in Image Optimization with AVIF**
- Authorization bypass in Server Components
- Improper Middleware Redirect handling (SSRF)
- Multiple cache poisoning variants
- HTTP request smuggling in rewrites
- XSS via CSP nonces in App Router
- XSS in beforeInteractive scripts

**Full Count**: 36+ specific CVEs in this version range

**Resolution**: Requires upgrade to Next.js 16.3.8+ (breaking change)

**Note from CLAUDE.md**:
> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

### High Severity (12)

**brace-expansion** (3 vulnerabilities):
- Quadratic-time expansion DoS
- Uncontrolled recursion on nested braces
- DoS via parseCommaParts recursion
- **Fix Available**: `npm audit fix`

**minimatch** (3 vulnerabilities):
- ReDoS via repeated wildcards
- ReDoS via multiple GLOBSTAR segments
- ReDoS from nested extglobs
- **Locations**: Transitive via @typescript-eslint/typescript-estree
- **Fix Available**: `npm audit fix`

**postcss** (4 vulnerabilities):
- XSS via unescaped `</style>` in CSS output
- Arbitrary file read via sourceMappingURL
- Path Traversal in source map auto-loading
- **Location**: Nested within Next.js (node_modules/next/node_modules/postcss)
- **Fix**: Requires Next.js upgrade

**braces** (1 vulnerability):
- Stack-exhaustion DoS via deeply nested patterns
- **Fix Available**: `npm audit fix --force` (breaking change with Tailwind)

---

## Recommendations

### Priority 1: Linting Errors (Must Fix for CI/CD)
- **Action**: Regenerate or manually fix the 14 generated component files
- **Scope**: Escape all unescaped apostrophes in JSX text
- **Effort**: Low (can be automated in generation pipeline)
- **Blocks**: Prevents CI/linting from passing

### Priority 2: Image Component (Nice to Have)
- **Action**: Update `SplitSection.tsx` lines 93, 96
- **Scope**: Replace `<img>` with `next/image` Image component
- **Effort**: Minimal (2 lines)
- **Benefit**: Better LCP and bandwidth performance

### Priority 3: Security Vulnerabilities (Product Decision)
- **Action**: Plan Next.js upgrade from v13 to v16.3.8+
- **Scope**: Major version upgrade with breaking changes
- **Effort**: High (requires testing across both locales and features)
- **Benefit**: Fixes 36+ CVEs including critical RCE on Windows
- **Status**: Noted as deferred product decision in CLAUDE.md

---

## Summary

The build pipeline is **healthy and functional**. The linting errors in generated components prevent CI from passing and should be the immediate focus. The Next.js vulnerabilities are a known issue that requires product decision for major version upgrade.

---

Generated by website-monitor on 2026-10-03
