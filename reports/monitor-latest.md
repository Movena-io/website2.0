# Website Monitor Report

**Run timestamp:** 2026-10-06 at 07:50 UTC  
**Overall status:** ⚠️ **WARNING** — Build passes, but linting failed and security vulnerabilities present

---

## Summary

The website build succeeds and all 61 pages generate correctly. However, the codebase has **63 linting errors** related to unescaped entities in generated components, and **20 security vulnerabilities** (1 critical, 12 high, 7 moderate) detected via npm audit.

---

## Build Check

✅ **PASS**

- All 61 pages generated successfully
- No compilation errors
- Build completed: ~8.5 seconds

**Output:** Next.js optimized production build completed with TypeScript type checking passing.

---

## Lint Check

❌ **FAIL** — 63 errors found

**Summary:** All errors are of type `react/no-unescaped-entities` in generated component files. The apostrophe character `'` must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` in JSX.

**Affected files (9 generated components):**
- `components/generated/BlogIndexDa.tsx` — 1 error
- `components/generated/BlogIndexEn.tsx` — 1 error
- `components/generated/BlogPostEn.tsx` — 7 errors
- `components/generated/BookDemoEn.tsx` — 3 errors
- `components/generated/ErrorEn.tsx` — 2 errors
- `components/generated/FaaAllePengeneHjemDa.tsx` — 1 error
- `components/generated/FaaAllePengeneHjemEn.tsx` — 3 errors
- `components/generated/ForsideDa.tsx` — 1 error
- `components/generated/ForsideEn.tsx` — 26 errors
- `components/generated/HavStyrPaaDagenEn.tsx` — 4 errors
- `components/generated/NotFoundEn.tsx` — 1 error
- `components/generated/OmOsEn.tsx` — 2 errors
- `components/generated/PrivatlivspolitikEn.tsx` — 3 errors
- `components/generated/VindFlereFlytningerEn.tsx` — 7 errors

**Note:** These are generated files. The issue likely originates in the generation process or source data. Non-generated files also have 2 warnings in `components/SplitSection.tsx` about using `<img>` instead of `<Image />` from `next/image`.

---

## Security Audit

❌ **FAIL** — 20 vulnerabilities detected

**Breakdown:**
- **1 Critical**: `next` (0.9.9 - 16.3.0-preview.10)
- **12 High**: `brace-expansion`, `braces`, `minimatch`, `next` (nested), `postcss`, `source-map-js`
- **7 Moderate**: `braces`, `postcss-selector-parser`, `sprintf-js`

### Critical Vulnerability

**Next.js** (current: 13.x) has **31 known CVEs** ranging from Server-Side Request Forgery (SSRF), Denial of Service, cache poisoning, information disclosure, and authentication bypass.

**Known decision:** Per CLAUDE.md, `next` and its nested `postcss` are knowingly left on their current versions. Fixing requires upgrading Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action.

### High-Severity Vulnerabilities

1. **brace-expansion** (≤1.1.20 | 2.0.0-2.1.6) — 3 CVEs: Quadratic-time expansion and stack exhaustion DoS
2. **braces** (*) — Stack-exhaustion DoS via deeply nested patterns
3. **minimatch** (9.0.0-9.0.6) — 3 CVEs: ReDoS via repeated wildcards, nested segments, and extglobs
4. **postcss** (≤8.5.22) — 4 CVEs: XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL
5. **source-map-js** (1.0.0-1.2.1) — Event-loop DoS through indexed offsets

### Moderate Vulnerabilities

1. **postcss-selector-parser** (<7.1.6) — Quadratic complexity in flat selector parsing (CPU exhaustion)
2. **sprintf-js** (*) — DoS via unbounded precision specifiers

### Dependency Chain Notes

- `tailwindcss` and `@tailwindcss/typography` depend on vulnerable transitive dependencies
- `@typescript-eslint/parser` chain includes multiple vulnerabilities
- `gray-matter` (used for blog posts) depends on vulnerable `js-yaml`

**Note:** Per CLAUDE.md, `npm audit fix` and `npm update` both rewrite ~87 packages far beyond what has an advisory. Use scoped `overrides` in `package.json` for patching transitive dependencies instead (like the existing `js-yaml@3` and `nanoid@3` pins).

---

## Recommendations

### Priority 1 (Blocking)
1. **Fix generated component linting errors** — Either:
   - Escape apostrophes in source data before generation, or
   - Regenerate components from source with proper entity escaping

### Priority 2 (Should Address)
2. **Security vulnerabilities in transitive dependencies** — Consider patching via `overrides` in `package.json` for:
   - `source-map-js` (high)
   - `brace-expansion` and `minimatch` (high)
   - These do not require Next.js upgrade

### Priority 3 (Product Decision)
3. **Next.js major version upgrade** — The 31 CVEs in `next` require upgrade to v16. This is a known decision per CLAUDE.md.

---

## Previous Issues

This report supersedes all earlier reports. Historical runs are available via `git log reports/monitor-latest.md`.
