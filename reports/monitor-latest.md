# Movena Website Monitor Report

**2026-10-25T00:04:00Z** | ⚠️ **CRITICAL - Action Required**

---

## Build Check

**Status**: ✅ **Passed**

The Next.js application compiled successfully without errors.

- Static pages generated: 61/61
- Type checking: Passed
- No compilation errors
- First Load JS: ~156 kB (acceptable)

---

## Lint Check

**Status**: ❌ **Failed with 78+ Errors**

### Warnings (2)
- `./components/SplitSection.tsx:93,96` — Using `<img>` instead of Next.js `<Image />` component

### Errors (78+)
Auto-generated components in `components/generated/` have unescaped apostrophes:
- BeregnerEn, BlogIndexDa, BlogIndexEn, BlogPostEn, BookDemoEn, ErrorEn, FaaAllePengeneHjemEn, ForsideDa, ForsideEn, HavStyrPaaDagenEn, NotFoundEn, OmOsEn, PrivatlivspolitikEn, VindFlereFlytningerEn
- **Issue**: `react/no-unescaped-entities` — apostrophes should use `&apos;`, `&#39;`, etc.
- **Root Cause**: Generation tool doesn't escape JSX entities

---

## Security Audit

**Status**: 🔴 **CRITICAL** — 11 Vulnerabilities (1 critical, 6 high, 4 moderate)

### CRITICAL (1)
**Next.js** (0.9.9–16.3.0)
- 34+ known CVEs: SSRF, RCE, XSS, DoS, authentication bypass, cache poisoning
- Fix: Requires `next@16.4.3` (breaking change: v13→v16)

### HIGH SEVERITY (6)

1. **postcss** (≤8.5.22) nested in Next.js
   - XSS via unescaped `</style>` tags
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source maps

2. **brace-expansion** 
   - DoS via quadratic-time expansion (CVSS 5.3–7.5)
   - DoS via uncontrolled recursion
   - **Fixable via `npm audit fix`**

3. **minimatch** (9.0.0–9.0.6)
   - ReDoS via wildcard patterns
   - ReDoS via GLOBSTAR segments
   - ReDoS via nested extglobs
   - **Fixable via `npm audit fix`**

4. **@typescript-eslint/parser & @typescript-eslint/typescript-estree** (6.16.0–7.5.0)
   - Depends on vulnerable minimatch
   - **Fixable via `npm audit fix`**

5. **source-map-js** (1.0.0–1.2.1)
   - Event-loop DoS via source-map parsing
   - **Fixable via `npm audit fix`**

6. **postcss-selector-parser** (<7.1.6)
   - CPU exhaustion via quadratic complexity in selectors
   - Requires major version upgrades

### MODERATE (4)
- **@tailwindcss/typography** (≤0.4.0 or ≥0.5.0-alpha.1)
- **tailwindcss** (depends on vulnerable postcss-selector-parser)
- Requires breaking changes to fix

---

## Summary

| Check | Status | Finding |
|-------|--------|---------|
| **Build** | ✅ Pass | Compilation successful, 61 pages generated |
| **Lint** | ❌ Fail | 78+ errors in generated components (unescaped entities); 2 warnings |
| **Security** | 🔴 Critical | 11 vulnerabilities: 1 critical, 6 high, 4 moderate |

---

## Action Plan

### 🚨 Immediate (This Week)
1. **Do NOT run `npm audit fix --force`** — it will force Next.js v16 upgrade
2. Run `npm audit fix` for safe patches (brace-expansion, minimatch, source-map-js, @typescript-eslint)
3. Fix generated component lint issues (escape apostrophes or regenerate)

### 📋 High Priority (Requires Planning)
- **Next.js v13 → v16.4.3 Upgrade** — Breaking change, requires:
  - Full regression testing
  - Review of new Next.js 16 features/breaking changes
  - Update dependencies that depend on Next.js internals
  - This is a product decision per CLAUDE.md

### 🔄 Medium Priority
- Update `SplitSection.tsx` to use `next/image` instead of `<img>`
- Address postcss-selector-parser in Tailwind dependencies

---

## Notes
- Build succeeds despite lint errors (non-blocking for deployment)
- Next.js v13 is out of long-term support — upgrade should be prioritized
- Security vulnerabilities are in known CVEs; remediation path is clear but requires major version bump
