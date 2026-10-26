# Website Monitor Report

**Run Timestamp**: 2026-10-26T22:04:00Z  
**Overall Status**: ❌ **CRITICAL** — Build passes; linting failed; 9 security vulnerabilities

---

## Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASSED | Next.js build completed successfully |
| **Lint** | ❌ FAILED | 57 errors + 2 warnings in generated components |
| **Security** | ❌ CRITICAL | 9 vulnerabilities: 1 critical, 6 high, 2 moderate |
| **Dependencies** | ✅ OK | 418 packages installed |

---

## Build Check ✅

**Result**: PASSED

Next.js application compiled without errors. All routes including dynamically localized paths generated successfully.

**Build Summary**:
- Total routes compiled with mixed rendering strategies
- First Load JS (shared): 80.6 kB
- Middleware size: 27.9 kB
- Status: No compilation errors

---

## Lint Check ❌

**Result**: FAILED — Exit code 1  
**Issues**: 57 errors + 2 warnings

**Error Categories**:
- **57 unescaped entity errors** (`react/no-unescaped-entities`): Single quotes in JSX not properly escaped
- **2 warnings** in `SplitSection.tsx` (lines 93, 96): Recommend using Next.js `<Image />` component instead of `<img>`

**Affected Generated Components** (all in `components/generated/`):
- `BeregnerEn.tsx` (2 errors)
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (7 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemEn.tsx` (5 errors)
- `ForsideDa.tsx` (1 error)
- `ForsideEn.tsx` (16 errors)
- `HavStyrPaaDagenEn.tsx` (8 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (8 errors)

**Action Required**: Regenerate components with proper HTML entity encoding for quotes (`&apos;`, `&#39;`, `&lsquo;`, `&rsquo;`)

---

## Security Audit ❌ **CRITICAL**

**Result**: FAILED — Exit code 1  
**Vulnerabilities**: 9 total (1 critical, 6 high, 2 moderate)

### 🔴 Critical (1)

**Next.js** (v13, affecting versions 0.9.9–16.3.0-preview.10)
- 31+ vulnerabilities including:
  - SSRF in Server Actions, rewrites, WebSocket upgrades
  - RCE on Windows servers and in Image Optimization (AVIF/SVG)
  - DoS in App Router, Server Components, image optimization
  - Cache poisoning, authorization bypass, XSS
  - HTTP smuggling, request deserialization attacks
  - Unauthenticated endpoint disclosure, middleware bypass
- **Fix**: Requires upgrade to Next 16.4.3 (`npm audit fix --force` — **breaking change**)
- **Status**: Per CLAUDE.md, intentionally held on v13 pending product decision

### 🟠 High (6)

1. **brace-expansion** — DoS via quadratic expansion and stack exhaustion
   - Fix: `npm audit fix` (safe)

2. **minimatch** (9.0.0–9.0.6) — ReDoS via wildcards, GLOBSTAR, extglobs
   - Location: `@typescript-eslint/typescript-estree` dependency
   - Fix: `npm audit fix` (safe)

3. **postcss** (≤8.5.22) — XSS, arbitrary file read, source map traversal
   - Location: `node_modules/next/node_modules/postcss`
   - Fix: Requires Next.js upgrade (`npm audit fix --force` — **breaking**)

4. **source-map-js** (1.0.0–1.2.1) — Event-loop DoS
   - Fix: `npm audit fix` (safe)

### 🟡 Moderate (2)

1. **postcss-selector-parser** (<6.1.5) — CPU exhaustion via quadratic complexity
   - Affects: `@tailwindcss/typography`, Tailwind, PostCSS Nested
   - Fix: `npm audit fix --force` (breaking)

**Dependency Guidance** (per CLAUDE.md):
- ⚠️ Do NOT run `npm audit fix --force` — rewrites ~87 packages beyond advisory scope
- For transitive deps: Use `overrides` in `package.json` (see `js-yaml@3`, `nanoid@3` pattern)
- Next.js and PostCSS: Knowingly held pending product upgrade decision

---

## Files

**This Report**: `reports/monitor-latest.md` (updated)

---

## Recommendations

### 🔴 Immediate
- **Regenerate `components/generated/*`** with entity escaping for quotes
  
### 🟡 Short-term
- Patch safe transitive vulnerabilities: `source-map-js`, `brace-expansion`, `minimatch` (via `npm audit fix` or `overrides`)

### 🟢 Long-term
- Plan Next.js 13→16 migration to resolve 31 critical/high vulnerabilities (product decision required)

---

*Automated monitor check | Timestamp: 2026-10-26T22:04:00Z*
