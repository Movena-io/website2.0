# Website Monitor Report

**Run Timestamp:** 2026-10-19 02:30 UTC  
**Overall Status:** ❌ **FAILED** — Lint errors must be fixed (58 errors blocking deployment)

---

## Summary

The Movena website build compiles successfully, but linting fails with 58 errors that must be resolved before deployment:

- **Build:** ✅ Successful (61 pages generated) 
- **Lint:** ❌ Failed (58 errors in generated components) — **BLOCKING ISSUE**
- **Security Audit:** ⚠️ 20 vulnerabilities (1 critical, 12 high, 7 moderate) — intentionally pinned or known

---

## Build Check ✅
- **Status:** PASS
- **Details:** Next.js application compiles without errors in production mode
- **Output:** 61 static pages generated successfully, optimized build completed
- **Note:** Lint check is skipped during build, so errors don't block compilation

### Build Artifacts
- Largest pages: Savings Calculator (138 kB), Run the Day (127 kB), Win More Moves (127 kB)
- Shared chunk size: 80.6 kB
- Total routes: 40+ distinct pages across 2 locales (en/da)

---

## Lint Check ❌
- **Status:** FAIL (exit code 1)
- **Total Errors:** 58 in generated components, 2 warnings
- **Primary Issue:** Unescaped single quotes in auto-generated React components

### Error Breakdown
**Unescaped entities** (56 errors across generated files):
- `./components/generated/BeregnerEn.tsx` (2 errors)
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (20 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Warnings** (2, non-blocking):
- `./components/SplitSection.tsx` lines 93, 96: Using `<img>` instead of Next.js `<Image />` component

### Root Cause
These files are in `components/generated/` indicating they are auto-generated from an upstream source. The generation tool outputs apostrophes without HTML entity encoding, violating React's ESLint rule `react/no-unescaped-entities`.

---

## Security Audit ❌
- **Status:** FAIL — 20 vulnerabilities detected (unchanged from previous run)
- **Breakdown:**
  - 1 **CRITICAL** vulnerability
  - 12 **HIGH** severity vulnerabilities  
  - 7 **MODERATE** severity vulnerabilities

### Critical Severity (1)
**Package:** `next` (0.9.9 - 16.3.0-preview.10)

The current Next.js v13 contains 29+ security advisories:
- Server-Side Request Forgery (SSRF) in Server Actions
- Unauthenticated Remote Code Execution on Windows-hosted servers
- Denial of Service in image optimization API
- Cache poisoning and auth bypass vulnerabilities
- Cross-site scripting (XSS) in CSP nonces and scripts
- Information disclosure in dev server
- HTTP request smuggling in rewrites

**Status:** Per CLAUDE.md, Next.js upgrades from v13 to v16+ are product decisions. This version is knowingly pinned due to breaking changes.

### High Severity (12)
- **brace-expansion**: CPU DoS via quadratic-time expansion (in @typescript-eslint chain)
- **braces**: Stack exhaustion DoS via deeply nested patterns (in tailwindcss dependency chain)
- **minimatch**: Multiple ReDoS vulnerabilities (in @typescript-eslint)
- **postcss** (≤8.5.22): XSS via unescaped `</style>` tags; path traversal via sourceMappingURL (nested in Next.js)
- **source-map-js**: Event-loop DoS through source-map parsing

### Moderate Severity (7)
- **postcss-selector-parser** (<7.1.6): Quadratic complexity CPU exhaustion (in tailwindcss → postcss-nested)
- **sprintf-js**: DoS via unbounded precision specifiers (in gray-matter → js-yaml → argparse)

### Dependency Chains
```
next (critical)
├── postcss <=8.5.22 (high)
└── tailwindcss <=3.4.19
    ├── chokidar → braces (high)
    ├── fast-glob → micromatch → braces (high)
    └── postcss-nested → postcss-selector-parser (moderate)

@typescript-eslint/parser
└── @typescript-eslint/typescript-estree
    ├── globby → fast-glob → micromatch → braces (high)
    └── minimatch (high)

gray-matter
└── js-yaml → argparse → sprintf-js (moderate)
```

---

## Change Summary (vs. Previous Run - 2026-10-18)
- **Build:** ✅ Same (passing)
- **Lint Errors:** Steady at 58 errors (no change from last run)
- **Security Vulnerabilities:** Same count (20 total, 1 critical) - no change

**Status:** After code regeneration on 2026-10-18, the lint error count stabilized at 58. These errors persist and must be addressed. The generated components consistently have unescaped entities indicating a systematic issue in the code generation process.

---

## Recommendations

### PRIORITY 1: BLOCKING — Fix Lint Errors

**Generate components have unescaped HTML entities**
- 56 errors across generated components in `components/generated/*`
- All errors are apostrophes (`'`) that need HTML entity encoding
- **Impact:** Lint fails, blocks all deployments
- **Root Cause:** Auto-generation tool outputs raw apostrophes without escaping

**Action Items:**
1. Review the code generation script (likely in `scripts/`) 
2. Fix the generator to output `&apos;` or `&#39;` instead of `'`
3. Re-generate all affected component files
4. Verify lint passes with `npm run lint`

### PRIORITY 2: Security — Next.js Vulnerabilities

- Current Next.js v13 has 29+ security advisories (1 critical)
- Per CLAUDE.md: This is a **product decision** (requires major upgrade to v16+)
- **Not actionable** by the monitor—requires business/product prioritization
- Known issues documented; breaking changes on upgrade path

### PRIORITY 3: Code Quality — Image Optimization

- Replace `<img>` tags in `SplitSection.tsx` (lines 93, 96) with Next.js `<Image />` component
- Low-priority warning (performance optimization, non-blocking)

### Medium-Term

- Once Next.js upgrade decision is made, ~70% of high/moderate vulnerabilities resolve automatically
- Transitive dependencies (braces, minimatch, sprintf-js) will be fixed in the upgrade chain
- No workarounds via `npm audit fix --force` recommended—it forces Breaking Changes incompatible with v13

---

## Environment
- **Node packages:** 418 audited
- **Dependencies:** 417 installed  
- **npm version available:** 12.2.0 (current: 10.9.4)
- **Build time:** ~30 seconds
- **Next.js:** v13.x (pinned, known vulnerabilities)
- **Tailwind:** v3.x branch

