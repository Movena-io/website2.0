# Movena Website Monitor Report

**2026-10-25T14:32:00Z** | ❌ **CRITICAL - Lint Errors Block CI/CD**

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

**Status**: ❌ **Failed with 52 Errors**

### Warnings (2)
- `./components/SplitSection.tsx:93,96` — Using `<img>` instead of Next.js `<Image />` component

### Errors (52)
Auto-generated components in `components/generated/` have unescaped apostrophes:
- BeregnerEn, BlogIndexDa, BlogIndexEn, BlogPostEn, BookDemoEn, ErrorEn, FaaAllePengeneHjemEn, ForsideDa, ForsideEn, HavStyrPaaDagenEn, NotFoundEn, OmOsEn, PrivatlivspolitikEn, VindFlereFlytningerEn
- **Issue**: `react/no-unescaped-entities` — apostrophes should use `&apos;`, `&#39;`, etc.
- **Root Cause**: Generation tool doesn't escape JSX entities
- **Blocking**: These errors prevent CI/CD pipeline from passing

---

## Security Audit

**Status**: 🔴 **CRITICAL** — 11 Vulnerabilities (1 critical, 6 high, 4 moderate)

### CRITICAL (1)
**Next.js** (current: 13.5.6, affected: 0.9.9–16.3.0)
- 31+ known CVEs affecting this version:
  - Server-Side Request Forgery (SSRF) in Server Actions & rewrites
  - Unauthenticated Remote Code Execution on Windows & with Image Optimization
  - Denial of Service in Server Components & Image Optimizer
  - Cache poisoning and request smuggling
  - Cross-site scripting (XSS) in App Router
  - Authorization bypass
  - Information disclosure in dev server
- Fix: Requires `next@16.4.3` (breaking change: v13→v16)
- **Status per CLAUDE.md**: Known issue — major version upgrade is a product decision, not an automated action

### HIGH SEVERITY (6)

1. **postcss** (≤8.5.22) nested in Next.js
   - XSS via unescaped `</style>` tags
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source maps
   - **Requires Next.js v16 to fix**

2. **brace-expansion** (multiple versions)
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
   - Requires major version upgrades to Tailwind

### MODERATE (4)
- **@tailwindcss/typography** (≤0.4.0 or ≥0.5.0-alpha.1)
- **tailwindcss** (depends on vulnerable postcss-selector-parser)
- Requires breaking changes to fix

---

## Summary

| Check | Status | Finding |
|-------|--------|---------|
| **Build** | ✅ Pass | Compilation successful, 61 pages generated |
| **Lint** | ❌ Fail | **52 errors** in generated components (unescaped entities) — **CI-blocking** |
| **Security** | 🔴 Critical | 11 vulnerabilities: 1 critical, 6 high, 4 moderate |

---

## Changes from Previous Run

- Lint error count: 78+ → **52** (more precise count)
- No change in security advisory count
- Build status unchanged (passing)

---

## Action Plan

### 🚨 CRITICAL (Block CI/CD)
1. **Fix Lint Errors in Generated Components**
   - 52 unescaped-entity errors must be resolved before deployment
   - Check generation source (build script or schema converter)
   - Options: Fix generator to escape entities OR manually patch components
   - **Owner**: Development team responsible for `components/generated/`

### ⚠️ Immediate (This Week)
1. **Do NOT run `npm audit fix --force`** — will force Next.js v13→v16 upgrade (breaking change)
2. Run `npm audit fix` to patch safe transitive dependencies:
   - brace-expansion (3 DoS CVEs)
   - minimatch (3 ReDoS CVEs)
   - source-map-js (1 DoS CVE)
   - @typescript-eslint packages (dev-time only, low risk)

### 📋 Planned (Requires Product Decision)
- **Next.js v13 → v16.4.3 Upgrade** — Breaking change, requires:
  - Full regression testing
  - Review of Next.js 16 breaking changes
  - Update dependencies tied to Next.js internals
  - Per CLAUDE.md: "a product decision, not a monitor action"

### 🔄 Low Priority
- Update `SplitSection.tsx` to use `next/image` instead of `<img>` (performance optimization)

---

## Monitor Configuration

- **Report Path**: `reports/monitor-latest.md` (single file, overwritten per run)
- **Schedule**: Automated monitoring
- **Previous Run**: 2026-10-25T00:04:00Z (Lint: 78+ errors, Security: same 11 CVEs)
