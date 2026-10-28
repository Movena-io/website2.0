# Website Monitor Report

**Run Date:** 2026-10-28  
**Run Time:** 13:14 UTC  
**Overall Status:** ⚠️ **WARNING** — Build succeeds, but lint errors and known critical vulnerabilities detected

---

## Summary

The Movena website project compiles successfully with Next.js 13 App Router and Tailwind CSS. However, there are:

- **Build**: ✅ **PASS** — Production build completed successfully (65 static pages generated)
- **Lint**: ❌ **FAIL** — ESLint errors in generated components and warnings in manual code
- **Security**: ⚠️ **WARNING** — 12 vulnerabilities detected (3 low, 2 moderate, 6 high, 1 critical)

---

## Build Check

✅ **Status: PASS**

```
✓ Compiled successfully
✓ Generating static pages (65/65)
✓ Finalizing page optimization
```

**Details:**
- Routes generated: 65 pages (43 content pages, 5 API routes, 1 middleware)
- First Load JS: 80.6 kB shared + page-specific bundles
- Total project size: ~156 kB (English homepage)
- Deployment ready

---

## Lint Check

❌ **Status: FAIL** — 90 ESLint violations (Exit code 1)

**Violations by type:**

### Critical Errors: Unescaped single quotes in generated components (87 errors)
- **Files affected:** 10 auto-generated components
  - `BeregnerEn.tsx` (2 errors)
  - `BlogIndexDa.tsx`, `BlogIndexEn.tsx` (2 total)
  - `BlogPostEn.tsx` (7 errors)
  - `BookDemoEn.tsx` (3 errors)
  - `ErrorEn.tsx` (2 errors)
  - `FaaAllePengeneHjemEn.tsx` (5 errors)
  - `ForsideDa.tsx`, `ForsideEn.tsx` (26 errors)
  - `HavStyrPaaDagenEn.tsx` (8 errors)
  - `NotFoundEn.tsx` (1 error)
  - `OmOsEn.tsx` (2 errors)
  - `PrivatlivspolitikEn.tsx` (3 errors)
  - `VindFlereFlytningerEn.tsx` (8 errors)

- **Rule:** `react/no-unescaped-entities`
- **Issue:** Single quotes (`'`) should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- **Note:** These files are auto-generated (in `components/generated/`) — likely from content management or build tooling

### Warnings: Image optimization (2 warnings)
- **File:** `SplitSection.tsx` (lines 93, 96)
- **Rule:** `@next/next/no-img-element`
- **Issue:** Using `<img>` instead of Next.js `<Image />` component
- **Impact:** Slower LCP, higher bandwidth

---

## Security Audit

⚠️ **Status: WARNING** — 12 vulnerabilities found

### Vulnerability Summary
- **Total:** 12 vulnerabilities
  - 🔴 **Critical:** 1
  - 🟠 **High:** 6
  - 🟡 **Moderate:** 2
  - 🟢 **Low:** 3

### Breakdown by Package

#### Critical (1)
- **`next@13.x`** — 1 critical vulnerability
  - Unauthenticated Remote Code Execution in Image Optimization API (SVG files)
  - CVE: GHSA-2464-fhr4-w9xw, GHSA-hc6r-7m96-88cp, GHSA-2xp9-vwfh-vxw4
  - **Note:** Known issue acknowledged in CLAUDE.md — Next 13→16 major upgrade required for fix

#### High (6)
- **`next@13.x`** — 4 high-severity issues
  - Image Optimization API vulnerabilities (ReDoS in responsive image parsing)
  - Denial of Service in App Router via Server Actions (CVE: GHSA-p3m5-59mp-jv5r)
- **`@typescript-eslint/parser` & related** — 2 high-severity issues
  - brace-expansion DoS via uncontrolled recursion (GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p)
- **`postcss@<8.5.23`** — High-severity file read vulnerabilities
  - Path Traversal via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849)

#### Moderate (2)
- **`@tailwindcss/typography@0.5.x`** — postcss-selector-parser DoS (GHSA-rj75-hqrm-r3gf)
- **`@react-email/render`** — Indirect via html-to-text

#### Low (3)
- Deprecation warnings: `rimraf@3`, `inflight@1.0.6`, `glob@7.1.7`, `@eslint` packages, `eslint@8.57`

### Mitigation Notes
- **Next.js & PostCSS:** CLAUDE.md explicitly states these are knowingly left on current versions. A Next 13→16 major upgrade is required for fixes; this is a product decision, not a monitor action. **Do not run `npm audit fix --force`.**
- **Transitive dependencies:** Per CLAUDE.md, use scoped entries in `overrides` in `package.json` (as done with `js-yaml@3` and `nanoid@3`) for patching transitive deps instead of sweeping `npm audit fix`.

---

## Recommendations

### 🔴 Critical Issues (Action Required)
1. **Generated component lint errors** — These need fixing to restore lint compliance:
   - Escape single quotes in auto-generated `.tsx` files, or
   - Configure ESLint to ignore `react/no-unescaped-entities` in `components/generated/`
   - Check generation source for quote escaping

### 🟡 Medium Priority (Consider)
2. **Image optimization warnings** — Replace `<img>` with Next.js `<Image />` in `SplitSection.tsx` for better performance
3. **Deprecation notices** — ESLint 8.x is EOL; consider planning upgrade path for future major version

### ℹ️ Known/Acknowledged (No Action)
- **Next.js critical CVE:** Documented as awaiting product decision on major version upgrade
- **PostCSS vulnerabilities:** Same — part of Next 13 stack

---

## Dependencies
- Total: 450 packages
  - Production: 152
  - Development: 289
  - Optional: 37

---

## Next Steps
1. Resolve lint errors in `components/generated/` (or adjust linting config)
2. Plan Next.js major version upgrade (Next 16+) for security fixes
3. Monitor for new security advisories
