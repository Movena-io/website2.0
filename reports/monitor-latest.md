# Website Monitor Report

**Run Time:** 2026-09-29 UTC
**Overall Status:** ⚠️ **WARNING** — Build passes but lint has errors, known security vulnerabilities persist

## Summary

The website build completed successfully with 61 static pages generated. However, the project has critical linting failures in generated components and known security vulnerabilities in Next.js dependencies.

## Check Results

### ✅ Build: PASSED
- Next.js compilation successful
- 61 static pages generated
- No build warnings
- Build time: Normal

### ❌ Lint: FAILED (Exit code 1)
**Issue:** ESLint errors in generated components (`react/no-unescaped-entities`)

**Affected Files (59 errors across 15 generated components):**
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (9 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemDa.tsx` (1 error)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (3 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (18 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (4 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (10 errors)

**Pattern:** Unescaped single quotes `'` in generated component strings. These should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Additional Warnings:**
- 2 warnings in `SplitSection.tsx` about using `<img>` instead of `<Image />` from `next/image`

### ⚠️ Security: 5 VULNERABILITIES (4 high, 1 critical)

**Critical (1):**
- **Next.js** (v13-16.3.0-preview.10): Multiple critical vulnerabilities including SSRF, RCE, DoS, and cache poisoning issues

**High (4):**
- **minimatch** (9.0.0-9.0.6): ReDoS vulnerability via repeated wildcards with non-matching literal in pattern
  - Transitive dependency via @typescript-eslint/typescript-estree → @typescript-eslint/parser
- **postcss** (≤8.5.22): XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL, path traversal
  - Nested under Next.js

**Note:** Per CLAUDE.md, Next.js and its nested postcss are knowingly kept at current versions. Upgrading requires Next 13 to 16 major version upgrade (product decision). Do not run `npm audit fix --force`.

### 📦 Dependencies
- 417 packages installed
- 154 packages requesting funding
- npm version: 10.9.7 (update available to 12.1.0)

## Recommendations

### Priority 1: Fix Lint Errors
The generated components have systematic unescaped entity errors. These files appear to be auto-generated (in `components/generated/` directory). Check:
1. The generation source/template — are entities being escaped there?
2. Whether a generation tool update is needed
3. Post-generation fix or linting exception if auto-generation is the expected pattern

### Priority 2: Monitor Security Vulnerabilities
Current vulnerabilities are known and deferred. Track for when Next.js is upgraded to a newer major version.

## Artifacts
- Build output: 80.6 kB shared JS, 27.8 kB middleware
- Route analysis: SSG (61 routes), SSR (1 route), API (3 routes)
