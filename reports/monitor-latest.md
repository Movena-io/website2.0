# Website2.0 Health Check Report

**Run Timestamp**: 2026-09-20 10:05 UTC  
**Overall Status**: ⚠️ **PASSED WITH WARNINGS**

---

## Summary

The website2.0 project successfully builds and runs. No new issues detected since the last report (2026-09-19). However, there are 5 npm security vulnerabilities that should be reviewed (4 high, 1 critical). Linting shows 3 warnings about image optimization. No configuration or locale setup issues detected.

---

## 1. Build Status

**Result**: ✅ **SUCCESS**

The Next.js build completed successfully with no errors.

- **Build Output**: Compiled without errors
- **Pages Generated**: 40 static pages
- **Routes Built**: 
  - Home pages (`/en`, `/da`)
  - Blog index and article pages (21 blog routes)
  - Contact pages (`/en/contact`, `/da/contact`)
  - Privacy pages (`/en/privacy`, `/da/privacy`)
  - Savings calculator pages (`/en/savings-calculator`, `/da/savings-calculator`)
  - Terms pages (`/en/terms`, `/da/terms`)
  - API routes (calculator/submit, contact)
  - Middleware enabled
  - Static files (robots.txt, sitemap.xml)

**First Load JS Size**: 80.6 kB (shared by all routes)

---

## 2. Lint Status

**Result**: ⚠️ **PASSED WITH 3 WARNINGS**

Linting completed successfully with no errors, but 3 warnings about image optimization:

### Warnings

| File | Line | Issue |
|------|------|-------|
| `components/MetaPixel.tsx` | 54 | Using `<img>` tag - consider using `<Image />` from `next/image` for optimization |
| `components/SplitSection.tsx` | 93 | Using `<img>` tag - consider using `<Image />` from `next/image` for optimization |
| `components/SplitSection.tsx` | 96 | Using `<img>` tag - consider using `<Image />` from `next/image` for optimization |

**Recommendation**: These are informational warnings about performance optimization. Consider converting these `<img>` tags to Next.js `<Image />` components to improve LCP and reduce bandwidth.

---

## 3. Security Audit

**Result**: ⚠️ **5 VULNERABILITIES DETECTED**

### Vulnerability Breakdown

**Critical (1)**:
- **next** (multiple versions affected): Server-Side Request Forgery in Server Actions and 32 other critical security issues
  - Location: `node_modules/next`
  - Current: v13.5.11 (old version)
  - Note: Fixing requires upgrade to Next.js 16.3.5, a major breaking change
  - Issues: SSRF, DoS, XSS, cache poisoning, authentication bypass, and more

**High (4)**:
- **minimatch** (3 issues): ReDoS vulnerabilities via repeated wildcards and extglobs
  - Location: `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`
  - Severity: High
  - Impact chain: minimatch → @typescript-eslint/typescript-estree → @typescript-eslint/parser
  - Fix available via `npm audit fix`
  
- **postcss** (4 issues): XSS and path traversal via CSS parsing
  - Location: `node_modules/next/node_modules/postcss`
  - Severity: High
  - Issues: Unescaped </style> XSS, arbitrary .map file disclosure, sourceMappingURL traversal

### Important Notes (per CLAUDE.md)

As documented in `AUDIT-NOTE.md`, the following are known:
- Next.js upgrade to v16 is a product decision (major upgrade from v13)
- Current versions are intentionally kept on their known versions
- Do NOT run `npm audit fix --force`
- For transitive dependency issues, patch via `overrides` in `package.json`

**Current Fixes Available**:
- `npm audit fix` - will fix minimatch issues only
- `npm audit fix --force` - would upgrade Next.js to v16.3.5 (breaking change, requires product decision)

---

## 4. Key Configuration Files

**Result**: ✅ **ALL PRESENT**

| File | Status | Purpose |
|------|--------|---------|
| `package.json` | ✓ Present | Project metadata and dependencies |
| `next.config.js` | ✓ Present | Next.js configuration |
| `tsconfig.json` | ✓ Present | TypeScript configuration |

---

## 5. Locale Setup

**Result**: ✅ **VERIFIED**

**Configuration**: Located in `lib/locales.ts`
- **Locales Configured**: `en` (English), `da` (Danish)
- **Default Locale**: `en`
- **Type Safety**: Full TypeScript support with `Locale` type

**Verification**:
- ✓ Both locales defined in `LOCALES` constant
- ✓ Both locales built successfully in production build
- ✓ Locale validation function present
- ✓ Localized path helper function implemented

**Routes Generated** (per build output):
- `/en` and `/da` home routes
- `/en/blog`, `/da/blog` and all blog articles
- `/en/contact`, `/da/contact`
- `/en/privacy`, `/da/privacy`
- `/en/savings-calculator`, `/da/savings-calculator`
- `/en/terms`, `/da/terms`

---

## 6. Dependencies

**Status**: ⚠️ **422 PACKAGES INSTALLED**

- **Total packages**: 423 (including root)
- **Packages seeking funding**: 154
- **Deprecated packages**: 5 (rimraf, inflight, glob, @humanwhocodes/config-array, @humanwhocodes/object-schema, eslint)

**Dependencies installed successfully** despite the vulnerability warnings.

---

## Recommendations

### Priority: High
1. Review AUDIT-NOTE.md for context on known vulnerabilities
2. Decide on Next.js major version upgrade timeline (v13 → v16)
3. If deferring Next.js upgrade, monitor security advisories for critical exploits

### Priority: Medium
1. Address minimatch ReDoS vulnerabilities using `npm audit fix` when ready
2. Consider upgrading ESLint from v8 to v9 (currently on deprecated v8.57.1)

### Priority: Low
1. Convert 3 `<img>` tags to Next.js `<Image />` components for performance
2. Review funding opportunities for dependent packages

---

## Status Change Log

- **2026-09-20**: ✅ No new issues detected. Build and security status unchanged.
- **2026-09-19**: Initial comprehensive health check. 5 vulnerabilities identified.

---

## Build Artifacts

- Output directory: `.next/`
- Generated files include static pages, middleware, and optimized bundles
- Ready for deployment to production

---

*Report generated by website-monitor health check script*  
*For detailed logs, refer to git history: `git log reports/monitor-latest.md`*
