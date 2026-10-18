# Website Monitor Report

**Run Date:** 2026-10-18 14:05 UTC  
**Overall Status:** ❌ **FAILED** - Lint errors (50+) and security vulnerabilities (20)

---

## Summary

The website build compiles successfully, but has critical issues:
- **Build**: ✅ Passed
- **Lint**: ❌ **FAILED** - 50+ ESLint errors in generated components
- **Security**: ⚠️ **20 vulnerabilities** (1 critical, 12 high, 7 moderate)

---

## Build Check ✅

**Status**: PASSED

The Next.js application compiles successfully. All 61 static pages generated without errors.

```
✓ Compiled successfully
✓ Generating static pages (61/61)
```

---

## Lint Check ❌

**Status**: FAILED (Exit code 1)

### Issues Found

**Error Count**: 66 ESLint errors

**Primary Issue**: Unescaped single quotes in generated components

The following files have `react/no-unescaped-entities` errors (apostrophes need HTML entity encoding):
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

**Note**: These files are **generated components** (in `components/generated/` directory). The source of generation should be updated to properly escape apostrophes as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Warnings** (not blocking):
- 2 warnings about using `<img>` instead of Next.js `<Image />` component in `SplitSection.tsx`

---

## Security Audit ❌

**Status**: FAILED - 20 vulnerabilities detected

### Critical Severity (1)

**Package**: `next` (0.9.9 - 16.3.0)
- 30+ known vulnerabilities including SSRF, RCE, DoS, XSS, cache poisoning, and information disclosure issues
- **Note**: Per CLAUDE.md, Next.js upgrades (13→16) are product decisions. Current version is knowingly kept on this version.

### High Severity (12)

**Package**: `braces` (*)
- Stack exhaustion DoS through deeply nested patterns

**Package**: `minimatch` (9.0.0 - 9.0.6)
- ReDoS via repeated wildcards, nested wildcards, and multiple GLOBSTAR segments

**Package**: `postcss` (≤8.5.22) - nested in `next`
- XSS via unescaped `</style>` in CSS output
- Source map path traversal and arbitrary file read

**Package**: `postcss-selector-parser` (<7.1.6)
- Quadratic complexity in flat selector parsing (CPU exhaustion)

**Package**: `source-map-js` (1.0.0 - 1.2.1)
- Event-loop DoS through indexed source-map section offsets

**Package**: `brace-expansion` (≤1.1.20 || 2.0.0 - 2.1.6)
- Multiple DoS vulnerabilities via quadratic-time expansion and uncontrolled recursion

### Moderate Severity (7)

**Package**: `postcss-selector-parser` (<7.1.6)
- Quadratic complexity in parsing (overlap with high-severity issue above)

**Package**: `sprintf-js` (*)
- DoS through unbounded precision specifiers

**Dependency chains involve**:
- `@tailwindcss/typography` → `postcss-selector-parser`
- `gray-matter` → `js-yaml` → `argparse` → `sprintf-js`
- `tailwindcss` → `chokidar` → `braces`, `micromatch` → `fast-glob`, `globby`

### Audit Fix Notes

Per CLAUDE.md guidance:
- ❌ Do NOT run `npm audit fix --force` - it forces breaking changes (Next 13→16, Tailwind updates)
- Transitive dependency patches should use `overrides` in `package.json` (like `js-yaml@3` and `nanoid@3`)
- The Next.js and PostCSS vulnerabilities require a major version upgrade decision at the product level

---

## Recommendations

### Priority 1: Fix Lint Errors
The generated components need apostrophe escaping. Investigate the generation source:
- Check if there's a content generation script that needs updating
- These are in `components/generated/` suggesting they're auto-generated from markdown or config files
- Update the generator to escape HTML entities properly

### Priority 2: Address Security Vulnerabilities (Product Decision)
1. **Next.js critical issues**: Requires upgrade from v13 to v16+ (breaking change, needs product approval)
2. **Transitive deps**: Consider patching via `overrides` in package.json for low-impact packages
3. **Future**: Plan Next.js major version upgrade to eliminate most vulnerabilities

### Priority 3: Image Optimization (Warning)
- Replace `<img>` tags in `SplitSection.tsx` with Next.js `<Image />` component for better performance

---

## Details

- **Dependencies**: 418 packages audited
- **Build Size**: First Load JS ~156 kB (main entry points)
- **Next.js Version**: 13.x (current, known to have vulnerabilities)
- **Tailwind**: 3.x branch (compatible with postcss vulnerabilities noted above)
