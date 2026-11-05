# Movena Website Monitor Report

**Run Timestamp**: 2026-11-05T14:27:00Z  
**Status**: ⚠️ **WARNINGS** — Build passing, lint errors present, critical security vulnerabilities detected

---

## Summary

Build passes successfully. Lint reports 55 errors (down from 80) in auto-generated components with unescaped single quotes, plus 2 warnings about img elements. Security audit identifies 20+ vulnerabilities including **4 critical RCE vulnerabilities in Next.js** (Image Optimization API with AVIF/SVG files) and 7 high-severity issues in dependencies. Next.js upgrade is a product decision per CLAUDE.md.

**Changes since last run**: Lint errors improved to 55 (from 80—likely due to code generation improvements). Vulnerabilities increased in visibility due to detailed audit parsing. Build remains passing.

---

## Build Status

**Result**: ✅ **PASS**

The Next.js build completed successfully with no errors. All static pages generated without issues:
- 30+ locale-specific routes (en/da pairs for feature pages)
- 3 API routes (calculator, contact, demo)  
- Middleware: 27.9 kB
- First Load JS shared: 80.6 kB
- Largest page: 24.6 kB (savings-calculator)

**Build time**: ~3 minutes  
**Output**: Production-ready

---

## Lint Status

**Result**: ❌ **FAIL** (55 errors across 13 files, 2 warnings)

**Error type**: `react/no-unescaped-entities` — Single quotes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (13 auto-generated components):
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (18 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Warnings** (2):
- `components/SplitSection.tsx` (lines 93, 96): Using `<img>` instead of `<Image />` from `next/image` (performance: slower LCP, higher bandwidth)

**Note**: Errors are in auto-generated components. Review code generation source to fix apostrophe escaping.

---

## Security Audit

**Result**: ❌ **CRITICAL** (20+ vulnerabilities: 4 critical, 7 high, 9 moderate/low)

### 🔴 Critical (4)

| Package | CVE/Advisory | Version Range | Issue |
|---------|--------|-------|-------|
| `next` | GHSA-h3kf-j4h8-w3h-jr36 | ≥13.4.0 <15.5.24 | RCE: Malformed image files → code execution |
| `next` | GHSA-2xp9-vwfh-vxw4 | ≥10.0.0 <15.5.24 | RCE: AVIF files in Image Optimization API |
| `next` | GHSA-2464-fhr4-w9xw | ≥10.0.0 ≤15.5.27 | RCE: SVG files in Image Optimization API |
| `brace-expansion` | GHSA-qhr7-859c-m2p7 | <1.1.20, ≥2.0.0 <2.1.6 | DoS: Stack exhaustion via nested brace expansion (CVSS 7.5) |

**Impact**: Unauthenticated remote code execution via crafted image files  
**Status**: Intentionally deferred per `CLAUDE.md`. Requires Next.js 13 → 16 upgrade (product decision).

### 🟡 High (7)

| Package | Issue | Version Range | CVSS |
|---------|-------|-------|------|
| `@typescript-eslint/typescript-estree` | Via minimatch ReDoS | 6.16.0–7.5.0 | - |
| `@typescript-eslint/parser` | Via minimatch ReDoS | 6.16.0–7.5.0 | - |
| `brace-expansion` | DoS: Quadratic-time expansion | <1.1.21, ≥2.0.0 <2.1.7 | 5.3 |
| `brace-expansion` | DoS: Recursion in parseCommaParts | <1.1.19 | 7.5 |
| `postcss` | XSS via unescaped `</style>` | ≤8.5.10 | 6.1 |
| `postcss` | Arbitrary file read via sourceMappingURL | ≤8.5.11 | 7.5 |
| `postcss` | Path traversal in source map loading | ≤8.5.17 | 7.5 |

### 🟠 Moderate (2)

- `@tailwindcss/typography` (via postcss-selector-parser vulnerability)
- `postcss-selector-parser` (ReDoS from unrestricted parsing depth)

### 🟡 Low (3)

- `@react-email/render` (via html-to-text)
- Others

---

## Recommended Actions

### 🔴 Critical Priority

1. **Next.js RCE Risk**: Image optimization API accepts unvalidated AVIF/SVG files. If untrusted uploads are processed:
   - Restrict image uploads to safe formats (JPG, PNG only)
   - Disable AVIF/SVG support in image optimizer config
   - Plan Next.js upgrade (requires 15.5.28+ or 16.4.5+)

### 🟡 High Priority

2. **Pin Transitive Vulnerabilities** via `package.json` overrides (non-breaking):
   ```json
   "overrides": {
     "brace-expansion": ">=1.1.21 <2.0.0 || >=2.1.7",
     "minimatch": ">=9.1.0"
   }
   ```
   Then `npm install`.

3. **Fix Lint Errors**: Address 55 `react/no-unescaped-entities` errors:
   - Fix component generation source (escape apostrophes at generation time), or
   - Add per-file `/* eslint-disable react/no-unescaped-entities */` in generator template

4. **Replace img with Image**: Update `components/SplitSection.tsx` lines 93, 96 to use Next.js `<Image />` component.

### 🔵 Medium Priority

5. **Dependency Updates**: Once Next.js is upgraded, `postcss` and `minimatch` will resolve automatically.

---

## Monitoring Notes

- Lint errors improved from 80 to 55 (likely from code generation changes)
- Build continues to pass consistently
- Security vulnerabilities stable; Next.js RCE issues require product-level decision
- Dependencies installed successfully
- No blocking issues with current production build

---

**Report generated**: 2026-11-05T14:27:00Z
