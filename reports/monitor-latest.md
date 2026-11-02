# Website Monitor Report

**Run timestamp:** 2026-11-02 07:10:24 UTC  
**Overall status:** ⚠️ WARNING - Lint failures and known security vulnerabilities

---

## Summary

The website build completes successfully. Linting fails due to unescaped HTML entities in auto-generated components (80+ errors). Security audit reveals 25 vulnerabilities (1 critical, 6 high, 15 moderate). Per project guidelines, Next.js vulnerabilities require major version upgrade (not addressed by this monitor).

---

## Build Check

✅ **PASSED**

```
Build completed successfully
Routes generated: 65 static pages
- First Load JS shared: 80.6 kB
- Largest route: /[locale]/savings-calculator (24.6 kB)
```

---

## Lint Check

❌ **FAILED** - 80+ errors

All errors are `react/no-unescaped-entities` violations in auto-generated component files:
- `./components/generated/BeregnerEn.tsx` (2 errors)
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (18 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Issue:** Unescaped apostrophes (`'`) in generated JSX content should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Note:** These are generated files. The errors likely originate from the content generation source and should be fixed at generation time, not manually in the generated output.

**Also:** 2 warnings in `./components/SplitSection.tsx` about using `<img>` instead of Next.js `<Image />` component for better LCP and bandwidth optimization.

---

## Security Audit

⚠️ **25 VULNERABILITIES** (3 low, 15 moderate, 6 high, 1 critical)

### Critical Issues

**Next.js** (node_modules/next)
- **Severity:** Critical (34 known CVEs affecting versions < 16.4.3)
- **Key issues:**
  - Server-Side Request Forgery in Server Actions
  - Denial of Service in Image Optimization
  - Authorization bypass vulnerabilities
  - Remote Code Execution (Windows-hosted servers, AVIF/SVG image handling)
  - Cache poisoning and injection vulnerabilities
  - Middleware/Proxy bypass and redirect handling issues
  - HTTP request smuggling in rewrites
  - Unauthenticated disclosure of internal Server Function endpoints

**Status:** Per `CLAUDE.md`, Next.js and postcss are intentionally left on current versions. Fixing requires upgrading from Next.js 13 to 16+, a major product decision. Do not run `npm audit fix --force`.

### High-Severity Issues

1. **brace-expansion** - DoS via quadratic-time expansion (GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p)
2. **minimatch** - ReDoS vulnerabilities via wildcards and globstar segments (GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj, GHSA-23c5-xmqv-rm74, GHSA-g3hv-75wg-m249)
3. **postcss** - XSS via unescaped `</style>` and arbitrary file read via sourceMappingURL (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849)
4. **source-map-js** - Event-loop DoS via indexed source-map offsets (GHSA-68fv-2mgg-jv7q)

### Moderate Issues

- **postcss-selector-parser** - Quadratic complexity in flat selector parsing (GHSA-rj75-hqrm-r3gf)
- **deepmerge** - Prototype poisoning (GHSA-gcqx-w48m-w2h4)

**Dependency chains:** Many vulnerabilities propagate through development dependencies (eslint, @typescript-eslint, @tailwindcss, etc.).

---

## Alerts

- 🔴 **CRITICAL:** Next.js has critical vulnerabilities requiring major version upgrade
- ❌ **FAILED:** Lint check failing due to unescaped HTML entities in generated files
- ⚠️ **WARNING:** 6 high-severity vulnerabilities in transitive dependencies
- ⚠️ **WARNING:** 15 moderate-severity vulnerabilities in transitive dependencies

---

## Recommendations

1. **Lint errors:** Review the content generation source (likely a CMS or MDX processor) to ensure it escapes HTML entities properly in generated components.
2. **Security:** Next.js upgrade is a product decision outside this monitor's scope. Track for planned Next.js 16+ migration.
3. **Image optimization:** Address 2 warnings in `SplitSection.tsx` by replacing `<img>` with Next.js `<Image />` component for better performance.

---

## Monitor Metadata

- **Node.js:** v22.23.4
- **npm:** 10.9.9
- **Total dependencies:** 418 packages (after install)
