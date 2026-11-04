# Movena Website Monitor Report

**Run Timestamp**: 2026-11-04T23:03:00Z  
**Status**: ❌ **CRITICAL**

---

## Summary

Build passes. Lint fails with 80 errors in auto-generated components (unescaped entities). Security audit reports 12 vulnerabilities: 1 critical in Next.js (RCE in Image Optimization API for SVG/AVIF files), 6 high-severity (brace-expansion DoS, minimatch ReDoS, postcss file read vulnerabilities, TypeScript ESLint issues). Next.js upgrade is a product decision per CLAUDE.md.

**Changes since last run**: Lint errors up from 63 → 80 (+17). Vulnerabilities stable at 12. Build remains passing.

---

## Build Status

**Result**: ✅ **PASS**

The Next.js build completed successfully with no errors. All 65 static pages generated without issues:
- 40 locale-specific routes (en/da pairs)
- 3 API routes (calculator, contact, demo)
- Middleware: 27.9 kB
- First Load JS shared: 80.6 kB
- Largest page: 24.6 kB (savings-calculator)

**Build time**: ~2 minutes  
**Output**: Production-ready

---

## Lint Status

**Result**: ❌ **FAIL** (80 errors across 14 files, 2 warnings)

**Error type**: `react/no-unescaped-entities` — Apostrophes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (14 auto-generated components):
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (28 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Warnings** (2):
- `components/SplitSection.tsx` (lines 93, 96): Using `<img>` instead of `<Image />` from `next/image` (performance impact)

**Note**: Errors are in auto-generated components. Review the generation source to fix apostrophe escaping.

---

## Security Audit

**Result**: ❌ **CRITICAL** (12 vulnerabilities: 1 critical, 6 high, 2 moderate, 3 low)

### 🔴 Critical (1)

| Package | Version Range | CVE | Severity | Issue |
|---------|----------------|-----|----------|-------|
| `next` | ≥10.0.0 ≤15.5.27 | GHSA-2xp9-vwfh-vxw4 | Critical | RCE in Image Optimization API (AVIF files) |
| `next` | ≥10.0.0 ≤15.5.27 | GHSA-2464-fhr4-w9xw | Critical | RCE in Image Optimization API (SVG files) |

**Impact**: Unauthenticated remote code execution via maliciously crafted image files  
**Status**: Intentionally deferred per `CLAUDE.md`. Requires Next.js 13 → 16 upgrade (product decision).

### 🔴 High (6)

| Package | Issue | Range |
|---------|-------|-------|
| `@typescript-eslint/parser` | Via minimatch | 6.16.0–7.5.0 |
| `@typescript-eslint/typescript-estree` | Via minimatch | 6.16.0–7.5.0 |
| `brace-expansion` | 3× DoS: quadratic expansion, stack exhaustion | <1.1.21, ≥2.0.0 <2.1.7, <1.1.19 |
| `postcss` | 4× CVEs: XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL | ≤8.5.22 |

### 🟠 Moderate (2)

- `@tailwindcss/typography` (via postcss-selector-parser)
- `postcss-selector-parser` (DoS via unrestricted parsing depth)

### 🟡 Low (3)

- `@react-email/render` (via html-to-text)
- Others

---

## Recommended Actions

### 🔴 Critical Priority

1. **Next.js RCE Risk**: The image optimization API accepts unvalidated AVIF/SVG files. If untrusted user uploads are processed, apply immediate mitigations:
   - Restrict image uploads to safe formats (JPG, PNG only)
   - Disable AVIF/SVG in image optimizer config
   - Plan Next.js upgrade (requires 15.5.28+ or 16.4.5+)

### 🟠 High Priority

2. **Dependency Overrides** (non-breaking): Pin vulnerable transitive dependencies in `package.json`:
   ```json
   "overrides": {
     "brace-expansion": ">=1.1.21 <2.0.0 || >=2.1.7",
     "source-map-js": ">=1.2.2"
   }
   ```
   Then run `npm install`.

3. **Fix Lint Errors**: Address 80 `react/no-unescaped-entities` errors:
   - Fix component generation source (escape apostrophes at generation time), or
   - Suppress with per-file `eslint-disable` comments in the generator template

### 🔵 Medium Priority

4. **Upgrade chains**: Once Next.js is upgraded, `postcss` and `minimatch` will resolve automatically.

---

## Monitoring Notes

- Lint errors increased (63 → 80): likely from component regeneration
- Build continues to pass
- Security vulnerabilities stable; Next.js upgrade remains a product-level decision
- No code commits since last report

---

**Report generated**: 2026-11-04T23:03:00Z
