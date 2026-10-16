# Website Monitor Report

**Run Time:** 2026-10-16 13:04 UTC  
**Status:** ❌ **CRITICAL** — Lint errors and critical security vulnerabilities (unchanged)

---

## Summary

The website monitor identified critical issues requiring immediate attention:

- **Build:** ✅ PASSING
- **Lint:** ❌ FAILING (63 unescaped entity errors)
- **Security:** ❌ CRITICAL (20 vulnerabilities: 1 critical, 12 high, 7 moderate)

---

## Build Status: ✅ PASSING

The Next.js application compiled successfully with no build errors.

```
Route (app)                          Size     First Load JS
├ ● /[locale]                        42.7 kB         156 kB
├ ● /[locale]/about                  6.96 kB         120 kB
├ ● /[locale]/blog                   4.56 kB         118 kB
... (61 total pages generated)
✓ Generating static pages (61/61)
```

**Action:** None required for build.

---

## Lint Status: ❌ FAILING

**Error Count:** 63 errors, 2 warnings

### Critical Issues

Most errors are unescaped HTML entities (`'`) in generated component files. These are auto-generated components and need the rule disabled or the generation process updated.

**Affected Files:**
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (17 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

### Minor Issues

- `components/SplitSection.tsx`: 2 warnings about unoptimized `<img>` elements

**Recommendation:** Since these are generated files, consider:
1. Disabling the `react/no-unescaped-entities` rule for the `components/generated/` directory in `.eslintrc.json`
2. Or updating the generation script to properly escape entities

---

## Security Status: ❌ CRITICAL

**Total Vulnerabilities:** 20 (1 critical, 12 high, 7 moderate)

### CRITICAL Issues

#### Next.js (Multiple CVEs)

**Package:** `next@13.5.7` → recommended: `next@16.4.2` (breaking change)

A critical vulnerability in Next.js has 35+ associated CVEs, including:
- **GHSA-fr5h-rqp8-mj6g** — Server-Side Request Forgery in Server Actions
- **GHSA-955p-x3mx-jcvp** — Unauthenticated disclosure of internal Server Function endpoints
- **GHSA-p293-qw3h-jr36** — Unauthenticated Remote Code Execution on Windows-hosted servers
- **GHSA-2xp9-vwfh-vxw4** — RCE in Image Optimization API with AVIF files

### HIGH Severity Vulnerabilities

1. **brace-expansion** (transitive) — CPU DoS via quadratic-time expansion
2. **braces** (transitive) — Stack exhaustion via nested patterns
3. **minimatch** (transitive) — ReDoS via repeated wildcards and extglobs
4. **postcss@8.5.22** (transitive via next) — XSS and arbitrary file reads
5. **source-map-js** — Event-loop DoS

### MODERATE Severity Vulnerabilities

1. **postcss-selector-parser** — CPU exhaustion via quadratic complexity
2. **sprintf-js** — DoS via unbounded precision specifiers

**Root Cause:** Next.js 13.5.7 is 3 major versions behind the latest stable release. The CLAUDE.md file notes this is intentional and requires product-level decision for Next.js 13 → 16 migration.

**Options:**
1. **Upgrade Next.js 13→16** (major breaking change, product decision)
2. **Patch transitive dependencies** in `overrides` in `package.json` (temporary mitigation)
3. **Accept documented risk** until upgrade is prioritized

---

## Recommendations

### Immediate (This Week)

1. **Disable lint rule for generated code:**
   Add to `.eslintrc.json`:
   ```json
   {
     "overrides": [
       {
         "files": ["components/generated/**"],
         "rules": {
           "react/no-unescaped-entities": "off"
         }
       }
     ]
   }
   ```

2. **Fix unoptimized images in `SplitSection.tsx`:**
   Replace `<img>` with Next.js `<Image />` component (2 instances)

### Medium Term (Q4 2026)

- **Evaluate Next.js 13→16 migration** — Product decision required
- **Resolve critical Next.js CVEs** — Blocking security issue

### Dependencies Note

As documented in CLAUDE.md:
- `js-yaml@3` and `nanoid@3` are knowingly pinned in `overrides`
- `npm audit fix --force` is not used as it causes ~87 package rewrites
- Use targeted `overrides` entries for critical vulnerabilities only

---

## Next Steps

1. Resolve lint errors (disable rule for generated code, fix SplitSection)
2. Re-run monitor to verify lint passes
3. Schedule Next.js upgrade discussion (product team)
