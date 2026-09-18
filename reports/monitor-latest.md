# Website Monitor Report

**Run Timestamp**: 2026-09-18 (Automated)  
**Overall Status**: ⚠️ **WARNING** — Build and lint pass, but critical security vulnerabilities present

## Summary

The website builds and lints successfully, but npm audit identifies 5 vulnerabilities (4 high, 1 critical) primarily in dependencies that are pinned as part of ongoing product decisions.

## Detailed Findings

### ✅ Dependencies
- **Status**: Installed successfully
- **Count**: 423 packages, 154 requesting funding
- **Notes**: No installation failures

### ✅ Build
- **Status**: PASSED
- **Details**: Next.js production build completed successfully
- **Output**: Generated 40 static pages with expected route optimization
- **Middleware**: 27 kB

### ⚠️ Linting
- **Status**: PASSED with WARNINGS (3 non-critical)
- **Warnings**:
  1. `./components/MetaPixel.tsx:54` — Image optimization: using `<img>` instead of `<Image />` from next/image
  2. `./components/SplitSection.tsx:93` — Image optimization: using `<img>` instead of `<Image />`
  3. `./components/SplitSection.tsx:96` — Image optimization: using `<img>` instead of `<Image />`
- **Recommendation**: These are best-practice suggestions for image performance, not errors. Consider updating if image optimization is a priority.

### ❌ Security Audit
- **Status**: VULNERABLE (5 vulnerabilities detected)
- **Breakdown**: 4 high-severity, 1 critical-severity

#### Critical Vulnerabilities
1. **Next.js** (node_modules/next)
   - Severity: CRITICAL
   - Multiple advisories including:
     - Server-Side Request Forgery in Server Actions (GHSA-fr5h-rqp8-mj6g)
     - Denial of Service in Image Optimization (GHSA-g77x-44xx-532m)
     - Authorization bypass (GHSA-7gfc-8cq8-jh5f)
     - Cross-site scripting vulnerabilities (GHSA-ffhc-5mcf-pf4q, GHSA-gx5p-jg67-6x7h)
     - Cache poisoning/confusion (multiple)
     - Information exposure (GHSA-3h52-269p-cp9r)
     - Additional 24+ advisories
   - **Fix Available**: `npm audit fix --force` would upgrade to next@16.3.5 (breaking change)
   - **Status**: Intentionally pinned per project decisions (Next 13 → 16 requires major product decision)

#### High-Severity Vulnerabilities
1. **minimatch** (nested dependency via @typescript-eslint)
   - Severity: HIGH
   - ReDoS (Regular Expression Denial of Service) via multiple patterns:
     - Repeated wildcards with non-matching literal (GHSA-3ppc-4f35-3m26)
     - Repeated GLOBSTAR segments (GHSA-7r86-cg39-jmmj)
     - Nested extglobs (GHSA-23c5-xmqv-rm74)
   - Transitive chain: eslint → @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch
   - **Fix Available**: `npm audit fix`

2. **PostCSS** (nested in next)
   - Severity: HIGH
   - Multiple vulnerabilities:
     - XSS via unescaped `</style>` in CSS output (GHSA-qx2v-qp2m-jg93)
     - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q and follow-ups)
     - Path traversal in source map loading (GHSA-r28c-9q8g-f849)
   - **Fix Available**: `npm audit fix --force` (requires next upgrade)
   - **Status**: Pinned as part of Next.js constraint

## Recommendations

1. **Immediate**: Consider whether the Next.js critical vulnerabilities warrant the major version upgrade (13 → 16). This is a product-level decision noted in CLAUDE.md.

2. **Short-term**: The minimatch vulnerabilities could potentially be addressed via an `overrides` entry in package.json (following the js-yaml and nanoid pattern), though this requires testing to ensure compatibility.

3. **Image Optimization**: The 3 linting warnings about `<img>` tags are non-critical; address if image performance is a priority.

4. **Monitoring**: Continue tracking security advisories on the base dependencies (next, postcss, @typescript-eslint).

## Previous Status

No previous report available (first run or baseline comparison).
