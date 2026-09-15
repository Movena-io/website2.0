# Website Monitor Report

**Run Date**: 2026-09-15 (Latest)  
**Overall Status**: ⚠️ Warning — Build healthy, lint warnings present, known critical vulnerabilities in Next.js deferred

---

## Summary

The website2.0 project builds and deploys successfully. All 40 static pages compile without errors. However, there are three minor lint warnings and five npm security vulnerabilities present. The critical vulnerabilities are in core dependencies (Next.js and PostCSS) that are knowingly left on their current versions per product decision documented in CLAUDE.md.

---

## Detailed Results

### Build: ✅ Passing

- **Status**: Compiled successfully with zero build errors
- **Pages Generated**: 40 static pages
- **Performance**:
  - Shared First Load JS: 80.6 kB
  - Route-specific: 15–19 kB per main route
  - Middleware: 27 kB
- **Routes**: 
  - 2 locales (en, da)
  - Blog with 21 posts
  - Contact, Privacy, Terms, Savings Calculator pages
  - 2 API endpoints, robots.txt, sitemap.xml
- **TypeScript**: Valid

### Lint: ⚠️ Minor Warnings (3)

Three warnings about image optimization—using `<img>` instead of Next.js `<Image />`:

| File | Line | Issue |
|------|------|-------|
| `components/MetaPixel.tsx` | 54 | `<img>` should use `next/image` for performance |
| `components/SplitSection.tsx` | 93 | `<img>` should use `next/image` for performance |
| `components/SplitSection.tsx` | 96 | `<img>` should use `next/image` for performance |

**Impact**: Low. These are performance best-practice suggestions, not errors. Code is functional.

### Security Audit: ⚠️ 5 Vulnerabilities (1 Critical, 4 High)

#### Critical (1)

**Package**: `next` (current: 13.x, vulnerable range: 0.9.9–16.3.0-preview.10)

**Issues** (31 CVEs):
- Server-Side Request Forgery (SSRF) in Server Actions and rewrites
- Remote Code Execution (RCE) on Windows-hosted servers
- Denial of Service (DoS) via Server Components and Image Optimization
- Cache poisoning and XSS vulnerabilities
- HTTP request smuggling in rewrites
- Authorization bypass
- Unauthenticated disclosure of internal endpoints
- Various edge runtime and middleware bypasses

**Fix Required**: Upgrade to Next.js 16+ (breaking change)

**Status**: ⚠️ **INTENTIONALLY DEFERRED** — Per CLAUDE.md: *"Next.js and its nested PostCSS are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."*

#### High (4)

| Package | Severity | Issue | Status |
|---------|----------|-------|--------|
| `postcss` (≤8.5.22) | High | XSS via unescaped `</style>` in CSS output; arbitrary file read and path traversal via source map handling | Bundled in Next.js; deferred with upgrade |
| `minimatch` (9.0.0–9.0.6) | High | ReDoS vulnerabilities via repeated wildcards, GLOBSTAR segments, and nested extglobs | **Fixable independently** without Next.js upgrade |
| `@typescript-eslint/typescript-estree` | High | Depends on vulnerable minimatch | Fixes with minimatch patch |
| `@typescript-eslint/parser` | High | Depends on vulnerable @typescript-eslint/typescript-estree | Fixes with minimatch patch |

---

## Recommendations

### Optional (Non-Breaking)

1. **Minimatch Fix** — Can be patched independently via `package.json` overrides:
   ```json
   "overrides": {
     "@typescript-eslint/typescript-estree": {
       "minimatch": ">=9.0.7"
     }
   }
   ```
   Then run `npm install`. Dev dependency; does not affect production.

2. **Lint Warnings** — Migrate 3 `<img>` elements to Next.js `<Image />` component for improved LCP and bandwidth. Low priority.

### Deferred (Product Decision)

**Next.js 13 → 16 Major Upgrade** — Addresses the 1 critical + related vulnerabilities. Requires:
- Major version bump with breaking changes
- Testing against Movena product integration
- Verification of all routes, APIs, and middleware
- Assessment of CSS and build system changes
- Likely a significant engineering sprint

This is intentionally left for product roadmap decision, not automated action.

---

## Dependency Summary

- **Total Packages**: 423 (audited, up to date)
- **Vulnerabilities**: 5 (1 critical, 4 high)
- **Vulnerable Chains**: minimatch → @typescript-eslint (dev only) → Next.js (core)
- **Funding Requests**: 154 packages

---

## Deployment Status

- ✅ Build passes without errors
- ✅ All 40 pages generated successfully
- ✅ No blocking lint errors
- ⚠️ Security vulnerabilities present but documented and deferred
- ✅ Ready for deployment (known risks tracked)
