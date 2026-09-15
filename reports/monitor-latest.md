# Website Monitor Report

**Run Timestamp:** 2026-09-15 at 10:36:07 UTC  
**Overall Status:** ⚠️ Warning (Build successful, lint warnings, critical vulnerabilities present)

---

## Summary

The build pipeline completes successfully with no compilation errors. Code quality linting produces 3 warnings related to image optimization. Security audit reveals 5 vulnerabilities (1 critical, 4 high) in core dependencies.

---

## Check Results

### ✅ Build Check: PASSED
**Status:** Successful compilation with no errors

- Production build completed successfully
- All 40 static pages generated without issues
- Route optimization completed
- First Load JS: 80.6 kB shared across routes

No build-time errors or critical warnings detected.

### ⚠️ Lint Check: WARNINGS FOUND (3)
**Status:** Code quality issues detected (non-critical)

**Warnings:**
1. `./components/MetaPixel.tsx:54` - Using `<img>` instead of Next.js `<Image />`
2. `./components/SplitSection.tsx:93` - Using `<img>` instead of Next.js `<Image />`
3. `./components/SplitSection.tsx:96` - Using `<img>` instead of Next.js `<Image />`

**Recommendation:** Consider replacing HTML `<img>` elements with Next.js `<Image />` component for automatic optimization, LCP improvements, and reduced bandwidth usage.

### 🔴 Security Audit: CRITICAL VULNERABILITIES (5 total)
**Status:** 1 Critical, 4 High severity vulnerabilities found

#### Critical Vulnerability (1)
**Package:** Next.js 13 (current version)

31 known vulnerabilities including:
- Server-Side Request Forgery (SSRF) in Server Actions and rewrites
- Denial of Service (DoS) in Server Components and Image Optimization
- Remote Code Execution (RCE) on Windows-hosted servers
- Cross-Site Scripting (XSS) in App Router with CSP nonces and beforeInteractive scripts
- Cache poisoning and confusion attacks
- Authorization bypass vulnerabilities
- Information disclosure in dev server

**Root Cause:** Next.js version 13 is significantly outdated. Current version is 16.3.5.

**Note:** Per project documentation (CLAUDE.md), Next.js is knowingly left on current version as a product decision. Upgrading to Next.js 16 requires major refactoring and is a product team responsibility, not a monitor action.

#### High Vulnerabilities (4)

**Package:** minimatch (transitive dependency)
- **Location:** `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`
- **Issues:** 3 ReDoS (Regular Expression Denial of Service) vulnerabilities
  - Repeated wildcards with non-matching literal
  - Combinatorial backtracking via GLOBSTAR segments
  - Nested extglobs generating catastrophic backtracking
- **Affected Chain:** minimatch → @typescript-eslint/typescript-estree → @typescript-eslint/parser

**Package:** postcss (nested in Next.js)
- **Location:** `node_modules/next/node_modules/postcss` (version ≤ 8.5.22)
- **Issues:** 4 high-severity vulnerabilities
  - Arbitrary file read via sourceMappingURL disclosure
  - Path traversal in source map auto-loading
  - XSS via unescaped </style> in CSS output
- **Status:** Part of Next.js dependency tree; upgrade blocked by Next.js version constraint

---

## Dependency Status

- **Total packages audited:** 423
- **Vulnerabilities:** 5 (1 critical, 4 high, 0 moderate, 0 low)
- **Packages with funding available:** 154

**Audit fix availability:**
- `npm audit fix` can address some issues (minimatch)
- `npm audit fix --force` would upgrade Next.js to 16.3.5 (breaking change, requires product team approval)

---

## Recommendations

1. **High Priority:** Establish timeline for Next.js 13 → 16 upgrade with product team. This is the root cause of 31 known vulnerabilities.

2. **Medium Priority:** Review and apply `npm audit fix` for minimatch vulnerabilities when possible without breaking Next.js.

3. **Low Priority:** Resolve lint warnings by migrating `<img>` to Next.js `<Image />` component for better performance.

---

## Previous Run History

To view previous monitor runs: `git log reports/monitor-latest.md`
