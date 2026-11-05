# Movena Website Monitor Report

**Run Timestamp**: 2026-11-05T13:05:39Z  
**Status**: ❌ **CRITICAL** — Lint errors blocking deployment; critical Next.js vulnerabilities present

---

## Summary

Build passes successfully. Lint reports **73 errors** (increased from 55) in auto-generated components with unescaped single quotes, plus 2 warnings about img elements. These errors **block deployment**. Production security audit identifies 8 vulnerabilities including **1 critical CVE in Next.js** covering 31 distinct attack vectors (SSRF, DoS, RCE, XSS, cache poisoning). Next.js upgrade is a product decision per CLAUDE.md.

**Changes since last run**: Lint errors increased to 73 (from 55). Build remains passing. Critical security issues remain acknowledged as product-level decisions.

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

**Result**: ❌ **FAIL** (73 errors across 14 files, 2 warnings) — **BLOCKS DEPLOYMENT**

**Error type**: `react/no-unescaped-entities` — Single quotes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (14 auto-generated components):
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (29 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Warnings** (2):
- `components/SplitSection.tsx` (lines 93, 96): Using `<img>` instead of `<Image />` from `next/image` (performance: slower LCP, higher bandwidth)

**Note**: Errors are in auto-generated components (13→14 files, 55→73 errors). Review code generation source to fix apostrophe escaping at generation time.

---

## Security Audit (Production Dependencies)

**Result**: ❌ **CRITICAL** (8 vulnerabilities: 3 low, 2 moderate, 2 high, 1 critical)

### 🔴 Critical (1)

| Package | Issue | Count | Impact |
|---------|-------|-------|--------|
| `next` | **31 security advisories** across all versions ≥0.9.9 | 31 | Server-Side Request Forgery (SSRF), Denial of Service (DoS), Remote Code Execution (RCE), Cross-Site Scripting (XSS), Cache Poisoning, Authorization Bypass, Information Disclosure, Middleware/Proxy bypasses |

**Key RCE vectors**:
- GHSA-p293-qw3h-jr36: Unauthenticated RCE on Windows-hosted servers
- GHSA-2xp9-vwfh-vxw4: RCE via AVIF files in Image Optimization API
- GHSA-2464-fhr4-w9xw: RCE via SVG files in Image Optimization API
- GHSA-fr5h-rqp8-mj6g: SSRF in Server Actions

**SSRF/Bypass vectors**:
- GHSA-4342-x723-ch2f: Improper Middleware Redirect Handling → SSRF
- GHSA-c4j6-fc7j-m34r: SSRF via WebSocket upgrades
- GHSA-36qx-fr4f-26g5: Middleware/Proxy bypass in Pages Router (i18n)
- GHSA-3g8h-86w9-wvmq: Cache-poisoned Middleware/Proxy redirects

**DoS vectors**:
- GHSA-g77x-44xx-532m: Image optimization DoS
- GHSA-mwv6-3258-q52c, GHSA-5j59-xgg2-r9c4, GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj: Server Components DoS
- GHSA-m99w-x7hq-7vfj: App Router Server Actions DoS

**Status**: Intentionally deferred per `CLAUDE.md`. Requires Next.js 13 → 16 upgrade (product decision).

### 🟡 High (2)

| Package | Issue | Version | Fixable |
|---------|-------|---------|---------|
| `postcss` | **4 advisories**: XSS via unescaped `</style>`, path traversal via sourceMappingURL (2 variants), arbitrary file read | ≤8.5.22 | Only via Next.js upgrade |
| `source-map-js` | Event-loop DoS via indexed source-map section offsets (CVSS 7.5) | 1.0.0–1.2.1 | **Yes** — `npm audit fix` |

### 🟠 Moderate (2)

| Package | Issue | Type |
|---------|-------|------|
| `deepmerge` | Prototype poisoning in mergeObject() | Transitive (html-to-text → @react-email/render) |
| `postcss-selector-parser` | Quadratic complexity → CPU exhaustion | Transitive (postcss-nested, tailwindcss) |

### 🟡 Low (3)

- Various transitive dependencies with low-severity issues

---

## Recommended Actions

### 🔴 **BLOCKING**: Fix Lint Errors

**Action**: Resolve 73 `react/no-unescaped-entities` errors before deployment
- Review the code generation process (likely in build scripts or content generation pipeline)
- Ensure apostrophes are escaped at source (generation time), not post-generation
- Regenerate affected components
- Commit fixed component files

**Why**: Lint errors prevent successful `npm run build` and deployment to production.

### 🔴 **CRITICAL**: Next.js Security Issues

**Action**: Plan Next.js upgrade path (product decision per CLAUDE.md)
- Current version has 31 documented security advisories covering SSRF, RCE, DoS, XSS, cache poisoning
- Image Optimization API has multiple RCE vectors (AVIF, SVG, malformed images)
- Fix requires upgrade to Next.js 15.5.28+ or 16.4.5+
- **Interim mitigation** (if sensitive to image uploads):
  - Restrict image uploads to JPG/PNG only
  - Disable AVIF/SVG support in image optimizer
  - Disable untrusted image optimization requests

### 🟡 **HIGH PRIORITY**: Fix source-map-js

**Action**: Run `npm audit fix` to resolve source-map-js DoS vulnerability
- Affects event-loop via indexed source-map section offsets (CVSS 7.5)
- No breaking changes; safe to apply immediately
- Command: `npm audit fix`

### 🟡 **MEDIUM**: Image Optimization

**Action**: Update `components/SplitSection.tsx` lines 93, 96
- Replace `<img>` with Next.js `<Image />` component
- Improves LCP and reduces bandwidth
- Low effort, high UX impact

---

## Monitoring Notes

- **Lint errors trending up**: 80 → 55 → **73** (regression from code generation)
- Build continues to pass consistently ✅
- Security vulnerabilities stable at ~8 production issues; Next.js RCE issues acknowledged as product-level decisions
- Dependencies installed successfully (npm install: 417 packages)
- **Blocking issue present**: Lint errors must be resolved before deployment

---

**Report generated**: 2026-11-05T13:05:39Z
