# Movena Website Monitor Report

**Run Timestamp**: 2026-11-05T23:45:00Z  
**Status**: ⚠️ **WARNINGS** — Build passes; lint errors and security vulnerabilities present

---

## Summary

Build completes successfully with no errors. Lint reports **70+ errors** in auto-generated components with unescaped single quotes, plus 2 warnings about img elements. Security audit identifies **12 vulnerabilities**: **1 critical** in Next.js covering 33 attack vectors (SSRF, DoS, RCE, XSS, cache poisoning). Next.js upgrade flagged as product decision per CLAUDE.md.

**Status comparison**: Lint errors consistent at ~70. Security vulnerability count stable at 12 total (1 critical, 6 high, 2 moderate, 3 low). Build status unchanged. Dependencies installed fresh (417 packages).

---

## Build Status

**Result**: ✅ **PASS**

Next.js production build compiled successfully. All static pages generated without errors:
- **Routes**: 65 pages generated (en/da pairs, feature pages, 3 API routes)
- **Middleware**: 27.9 kB
- **First Load JS**: 80.6 kB shared
- **Largest page**: 24.6 kB (savings-calculator)
- **Output**: Production-ready `.next/` directory

---

## Lint Status

**Result**: ❌ **FAIL** (70+ errors across 14 files, 2 warnings)

**Primary error**: `react/no-unescaped-entities` — Single quotes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (auto-generated components):
- BeregnerEn (2), BlogIndexDa (1), BlogIndexEn (1), BlogPostEn (7)
- BookDemoEn (3), ErrorEn (2), FaaAllePengeneHjemEn (5), ForsideDa (1)
- ForsideEn (15), HavStyrPaaDagenEn (8), NotFoundEn (1), OmOsEn (2)
- PrivatlivspolitikEn (3), VindFlereFlytningerEn (8)

**Warnings** (2):
- `components/SplitSection.tsx` (lines 93, 96): Using `<img>` instead of `<Image />` from `next/image`

**Note**: Errors in auto-generated code. Review generation source to fix apostrophe escaping at generation time.

---

## Security Audit

**Result**: ⚠️ **CRITICAL** (12 vulnerabilities: 3 low, 2 moderate, 6 high, 1 critical)

### 🔴 Critical (1)

**`next` (v0.9.9–16.3.0)**: 31+ security advisories

- **SSRF**: Server Actions, WebSocket upgrades, rewrites, Middleware redirects (4 CVEs)
- **RCE**: Windows servers (GHSA-p293), AVIF files (GHSA-2xp9), SVG files (GHSA-2464)
- **DoS**: Image Optimizer, Server Components (7 CVEs), App Router Server Actions
- **XSS**: CSP nonces, beforeInteractive scripts
- **Cache Poisoning**: Response bodies, Middleware/Proxy redirects (3 CVEs)
- **Authorization Bypass**, **Information Disclosure** (dev server origin verification)

**Status**: Deferred per CLAUDE.md (Next.js 13→16 product decision)

### 🟡 High (6)

| Package | Issue | Fix |
|---------|-------|-----|
| `brace-expansion` ≤1.1.20 | DoS: quadratic expansion, recursive nested groups | npm audit fix |
| `minimatch` 7.0.0–11.0.0 | ReDoS: repeated wildcards, GLOBSTAR, nested extglobs | npm audit fix |
| `postcss` ≤8.5.22 | XSS unescaped `</style>`, path traversal sourceMappingURL | Next.js upgrade only |
| `source-map-js` 1.0.0–1.2.1 | Event-loop DoS: indexed offsets (CVSS 7.5) | npm audit fix |

### 🟠 Moderate (2)

| Package | Issue |
|---------|-------|
| `deepmerge` ≥4.2.0 | Prototype poisoning in mergeObject() |
| `postcss-selector-parser` <6.1.5 | Quadratic complexity CPU exhaustion |

### 🟢 Low (3)

Transitive dependencies with low-severity issues.

---

## Recommended Actions

### 🟡 **HIGH**: Fix Escapable Lint Errors
- Review code generation (build scripts, content pipeline)
- Escape apostrophes at source (generation time)
- Regenerate affected components
- **Impact**: Clears blocking deployment issue

### 🔴 **CRITICAL**: Next.js Security
- Product team decision required (per CLAUDE.md)
- Upgrade path: Next.js 13→15.5.28+ or 16.4.5+
- **Interim mitigation** (if sensitive):
  - Restrict image uploads to JPG/PNG
  - Disable AVIF/SVG in image optimizer
  - Disable untrusted image optimization

### 🟡 **HIGH**: Fix source-map-js
- Run: `npm audit fix`
- Resolves DoS (CVSS 7.5), no breaking changes

### 🟡 **MEDIUM**: Replace `<img>` in SplitSection.tsx
- Use Next.js `<Image />` component (lines 93, 96)
- Improves LCP and bandwidth

---

## Monitoring Notes

- **Lint**: Consistent at ~70 errors
- **Build**: Consistently passing ✅
- **Security**: 12 vulnerabilities stable (1 critical, 6 high, 2 moderate, 3 low)
- **Dependencies**: Fresh install (417 packages)
- Next.js known vulnerabilities stable; awaiting product decision

---

**Report generated**: 2026-11-05T23:45:00Z
