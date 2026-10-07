# Website Monitor Report

**Run timestamp:** 2026-10-07T16:04:02 UTC (automated scheduled run)  
**Overall status:** ❌ **FAILING** — Build passes, but linting failed and critical security vulnerability present

---

## Summary

The website build succeeds and all 61 pages generate correctly. However, the codebase has **62 linting errors** related to unescaped entities in generated components, plus 2 warnings about image optimization, and **20 security vulnerabilities** (1 critical, 12 high, 7 moderate) detected via npm audit. **Linting must be fixed and the critical security vulnerability requires attention.**

---

## Build Check

✅ **PASS**

- All 61 pages generated successfully
- No compilation errors
- Production build completed and optimized correctly
- Static site generation working as expected

---

## Lint Check

❌ **FAIL** — 62 errors + 2 warnings found

**Summary:** All errors are of type `react/no-unescaped-entities` in generated component files. The apostrophe character `'` must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` in JSX.

**Affected files (14 generated components):**
- `components/generated/BlogIndexDa.tsx` — 1 error
- `components/generated/BlogIndexEn.tsx` — 1 error
- `components/generated/BlogPostEn.tsx` — 9 errors
- `components/generated/BookDemoEn.tsx` — 3 errors
- `components/generated/ErrorEn.tsx` — 2 errors
- `components/generated/FaaAllePengeneHjemDa.tsx` — 1 error
- `components/generated/FaaAllePengeneHjemEn.tsx` — 3 errors
- `components/generated/ForsideDa.tsx` — 1 error
- `components/generated/ForsideEn.tsx` — 30+ errors
- `components/generated/HavStyrPaaDagenEn.tsx` — 4 errors
- `components/generated/NotFoundEn.tsx` — 1 error
- `components/generated/OmOsEn.tsx` — 2 errors
- `components/generated/PrivatlivspolitikEn.tsx` — 3 errors
- `components/generated/VindFlereFlytningerEn.tsx` — 10 errors

**Warnings:**
- `components/SplitSection.tsx:93` — Using `<img>` instead of `<Image />` from `next/image`
- `components/SplitSection.tsx:96` — Using `<img>` instead of `<Image />` from `next/image`

**Note:** The 62 lint errors are in auto-generated component files. The issue originates in the generation process or source data. These must be fixed to allow linting to pass.

---

## Security Audit

❌ **FAIL** — 20 vulnerabilities detected

**Breakdown:**
- **1 Critical**: Next.js RCE (Windows servers)
- **12 High**: brace-expansion, braces, minimatch, next (nested), postcss, source-map-js
- **7 Moderate**: braces, postcss-selector-parser, sprintf-js, @tailwindcss/typography, argparse, js-yaml, next

### ⚠️ CRITICAL Vulnerability

**Next.js Remote Code Execution (GHSA-p293-qw3h-jr36)**
- **Affected versions:** 13.4.0 - 15.5.23
- **Current version:** 13.x (in vulnerable range)
- **Impact:** Unauthenticated RCE on Windows-hosted servers
- **CVSS Score:** 9.0 (Critical)
- **Fix:** Upgrade to Next.js 15.5.24 or later

**Note:** Per CLAUDE.md, `next` and nested `postcss` are knowingly left on current versions. Fixing requires Next.js 13→16 major upgrade, a product decision. However, this critical RCE vulnerability on Windows may require immediate action.

### High-Severity Vulnerabilities

1. **brace-expansion** (≤1.1.20 | 2.0.0-2.1.6) — 3 CVEs: Quadratic-time expansion and stack exhaustion DoS
2. **braces** (*) — Stack-exhaustion DoS via deeply nested patterns
3. **minimatch** (9.0.0-9.0.6) — 3 CVEs: ReDoS via repeated wildcards and nested segments
4. **postcss** (≤8.5.22) — 4 CVEs: XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL, path traversal
5. **source-map-js** (1.0.0-1.2.1) — Event-loop DoS through indexed offsets

### Moderate Vulnerabilities

1. **@tailwindcss/typography** (≤0.4.0) — Transitive postcss-selector-parser vulnerabilities
2. **postcss-selector-parser** (<7.1.6) — Quadratic complexity in flat selector parsing
3. **sprintf-js** (*) — DoS via unbounded precision specifiers
4. **argparse** (1.0.0-1.0.10) — Transitive via gray-matter
5. **js-yaml** — Transitive via gray-matter
6. **next** (moderate) — Unauthenticated disclosure of Server Function endpoints

---

## Recommendations

### Priority 1 (Blocking)

1. **Fix generated component linting errors** — Either:
   - Escape apostrophes in source data (Markdown, JSON, templates) before generation, or
   - Regenerate components with proper entity escaping
   - This blocks the linting pipeline

### Priority 2 (Should Address)

2. **Security vulnerabilities in transitive dependencies** — Consider patching via `overrides` in `package.json`:
   - `source-map-js` to ≥1.2.2+ (high)
   - `brace-expansion` to ≥1.1.21+ (high)
   - `minimatch` to ≥9.0.7+ (high)
   - These do not require Next.js upgrade

### Priority 3 (Product Decision - Critical)

3. **Next.js major version upgrade** — Address the critical RCE vulnerability:
   - Requires upgrade from v13 to v15.5.24 or later (potentially v16)
   - This is a major version upgrade requiring comprehensive testing
   - Per CLAUDE.md, this is a product decision, not a routine maintenance action
   - However, the critical CVSS 9.0 RCE on Windows may warrant immediate consideration

---

## Dependency Health

- **npm version**: 10.9.1 (12.2.0 available)
- **Total packages**: 417 audited
- **Vulnerabilities**: 20 (1 critical, 12 high, 7 moderate)
- **Direct vulnerabilities**: 1
- **Transitive vulnerabilities**: 19

---

## Previous Issues

This report supersedes all earlier reports. Historical runs are available via `git log reports/monitor-latest.md`.
