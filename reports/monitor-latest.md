# Website Monitor Report

**Run Date:** 2026-11-03  
**Run Time:** 15:47 UTC  
**Overall Status:** ⚠️ **WARNING** - Build successful, lint errors and security vulnerabilities detected

---

## Summary

The Movena website built successfully with 65 static pages generated. However, the project has linting failures and multiple security vulnerabilities that need attention before deployment.

---

## Build Status: ✅ Passed

```
✓ Compiled successfully
✓ Generated static pages (65/65)
✓ Type checking passed
```

**Routes Deployed:**
- 65 pages successfully generated including homepage, blog posts, about, contact, and feature pages
- Middleware compiled: 27.9 kB
- Total First Load JS: 80.6 kB (shared)

---

## Lint Status: ❌ Failed

**Total Issues:** 68 total (2 warnings, 66 errors)

### Issues Found:

**Warnings (2):**
- `SplitSection.tsx:93,96` - Using `<img>` instead of `<Image />` from next/image (2 instances)

**Errors (66):**
Primary issue: Unescaped apostrophes in generated components that should use HTML entities (`&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`)

Affected files:
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (24 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Note:** Most errors are in generated components under `components/generated/`, indicating these are generated from external sources and need the generation process to be fixed rather than manual editing.

---

## Security Audit Status: ❌ Critical Concerns

**Total Vulnerabilities:** 25 (3 low, 15 moderate, 6 high, 1 critical)

### Critical Issues:

1. **Critical (1):**
   - `glob@7.1.7` - Remote code execution vulnerability (GHSA-ww39-953v-wcq6)

2. **High Severity (6):**
   - `@typescript-eslint/typescript-estree` - Minimatch DoS
   - `@typescript-eslint/parser` - Minimatch DoS
   - `brace-expansion` - Quadratic-time expansion DoS (GHSA-q2hr-2g5m-vwhr)
   - `minimatch` - Multiple DoS vulnerabilities
   - `next@13` - WebSocket SSRF (GHSA-c4j6-fc7j-m34r)
   - `next@13` - Middleware/Proxy bypass with i18n (GHSA-36qx-fr4f-26g5)
   - `next@13` - App Router Server Actions DoS (GHSA-m99w-x7hq-7vfj)
   - `next@13` - Server-Side Request Forgery in rewrites (GHSA-p9j2-gv94-2wf4)

3. **Moderate Severity (15):**
   - Multiple ESLint and TypeScript tooling vulnerabilities
   - `next@13` - XSS in beforeInteractive scripts, Image Optimization API DoS, Cache confusion, Unbounded Server Action payload
   - `@react-email/render` - html-to-text vulnerability

### Dependency Status:

- **next@13:** Pinned at version 13 (as noted in CLAUDE.md). Multiple high and moderate CVEs exist for this version. Requires major version upgrade to 15+ for fixes. ⚠️ **Product decision required**
- **postcss@8:** Nested with known vulnerabilities via Next.js
- **ESLint@8.57.1:** End of life, should upgrade to v9+
- **js-yaml@3, nanoid@3:** Known scoped overrides in place per package.json

---

## Recommended Actions

### 🔴 Priority 1 (Critical):
1. Address the critical RCE in `glob@7.1.7` - upgrade or use override
2. Review Next.js 13 security posture - a major version upgrade to 15+ is needed for security fixes

### 🟠 Priority 2 (High):
1. Fix generated component linting errors (66 errors) - requires fixing the generation source
2. Upgrade ESLint from v8 to v9 to address multiple tooling vulnerabilities

### 🟡 Priority 3 (Medium):
1. Replace `<img>` tags with `<Image />` from next/image in SplitSection.tsx (2 instances)
2. Review and fix linting issues in generated components to prevent future regressions

### ℹ️ Info:
- CLAUDE.md notes: Next.js 13 to 16+ upgrade and postcss version pinning are known issues left as product decisions
- npm audit fix would rewrite ~87 packages, beyond what's needed for individual CVEs

---

## Dependencies Summary

- **Total Packages:** 418
- **Vulnerabilities:** 25
- **Deprecated Packages:** 6
  - `rimraf@3.0.2`
  - `inflight@1.0.6`
  - `glob@7.1.7`
  - `eslint@8.57.1`
  - `@humanwhocodes/config-array@0.13.0`
  - `@humanwhocodes/object-schema@2.0.3`

---

## Deployment Status

**Development:** ✅ Ready - Build succeeds, site is functional  
**Production:** ⚠️ Blocked - Security vulnerabilities and linting errors must be resolved before production deployment
