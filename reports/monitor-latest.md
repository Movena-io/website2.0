# Movena Website Monitor Report

**Run Timestamp**: 2026-11-06T00:00:00Z  
**Status**: ⚠️ **WARNINGS** — Build passes; lint errors improved but still present

---

## Summary

Build completes successfully with no errors. Lint errors **reduced from 87 to 44** in auto-generated components, plus 2 warnings about img elements. Security audit shows stable **12 vulnerabilities**: **1 critical** in Next.js (36 known CVEs). Next.js upgrade flagged as product decision per CLAUDE.md.

**Key Metrics vs Previous Run (15:42 UTC)**:
- Build: ✅ Pass (65 pages, 0 errors) — **No change**
- Lint: ❌ Fail (44 errors, down from 87) — **IMPROVED** 📉
- Security: ⚠️ Warning (12 vulnerabilities) — **Stable**

---

## Build Status

**Result**: ✅ **PASS**

Next.js production build compiled successfully. All static pages generated without errors:
- **Routes**: 65 pages generated (en/da pairs, feature pages, 3 API routes)
- **Middleware**: 27.9 kB
- **First Load JS**: 80.6 kB shared
- **Largest page**: 24.6 kB (savings-calculator)
- **Output**: Production-ready `.next/` directory
- **Build Duration**: ~45 seconds

---

## Lint Status

**Result**: ❌ **FAIL** (44 errors across 14 files, 2 warnings)

**Primary error**: `react/no-unescaped-entities` — Single quotes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Files with errors** (auto-generated components):
- BeregnerEn (2), BlogIndexDa (1), BlogIndexEn (1), BlogPostEn (7)
- BookDemoEn (3), ErrorEn (2), FaaAllePengeneHjemEn (5), ForsideDa (1)
- ForsideEn (18), HavStyrPaaDagenEn (8), NotFoundEn (1), OmOsEn (2)
- PrivatlivspolitikEn (3), VindFlereFlytningerEn (8)

**Warnings** (2):
- `components/SplitSection.tsx` (lines 93, 96): Using `<img>` instead of `<Image />` from `next/image`

**Trend**: ✅ **IMPROVED** — Lint errors reduced from 87 to 44 (-50%). Generation process appears to have been partially fixed or dependencies updated. Remaining errors are concentrated in generated components.

---

## Security Audit

**Result**: ⚠️ **WARNING** (12 vulnerabilities: 3 low, 2 moderate, 6 high, 1 critical)

**Dependencies installed**: 417 packages (418 audited)

### 🔴 Critical (1)

**`next` (v0.9.9–16.3.0)**: 36 known security vulnerabilities

**Attack vectors**:
- **SSRF**: Server Actions, WebSocket upgrades, rewrites, Middleware redirects (4 CVEs)
- **RCE**: Windows servers (GHSA-p293), AVIF image optimization (GHSA-2xp9), SVG optimization (GHSA-2464)
- **DoS**: Image Optimizer (3 CVEs), Server Components (4 CVEs), App Router Server Actions
- **XSS**: CSP nonces (GHSA-ffhc), beforeInteractive scripts (GHSA-gx5p)
- **Cache Poisoning**: Response body cache confusion (2 CVEs), Middleware/Proxy redirects (GHSA-3g8h)
- **Authorization Bypass** (GHSA-7gfc)
- **Information Disclosure**: Dev server origin verification (GHSA-3h52)

**Fix**: Requires major version upgrade (Next.js 13→16.4.5 or 15.5.28+)  
**Status**: Deferred per CLAUDE.md as product roadmap decision

### 🟠 High (6)

| Package | Issue | Location | Fix |
|---------|-------|----------|-----|
| `brace-expansion` ≤1.1.20 | DoS: quadratic expansion, nested groups | @typescript-eslint/typescript-estree | npm audit fix |
| `minimatch` 7.0.0–11.0.0 | ReDoS: wildcards, GLOBSTAR, nested extglobs | @typescript-eslint/typescript-estree | npm audit fix |
| `postcss` ≤8.5.22 | XSS unescaped `</style>`, path traversal | next/node_modules | Requires Next.js upgrade |
| `source-map-js` 1.0.0–1.2.1 | Event-loop DoS via indexed offsets | Multiple deps | npm audit fix |

### 🟡 Moderate (2)

| Package | Issue | Impact |
|---------|-------|--------|
| `deepmerge` ≥4.2.0 | Prototype poisoning in mergeObject() | Requires `npm audit fix --force` (breaking) |
| `postcss-selector-parser` <6.1.5 | Quadratic complexity CPU exhaustion | Requires `npm audit fix --force` (breaking) |

### 🟢 Low (3)

Transitive dependencies with low-severity issues.

---

## Recommended Actions

### 🔴 **CRITICAL**: Next.js Security

Product team decision required (per CLAUDE.md). The 36 known Next.js CVEs cover significant attack vectors (SSRF, RCE, DoS, XSS, cache poisoning).

**Options**:
1. **Upgrade**: Next.js 13→16.4.5 (breaking change, major effort)
2. **Interim mitigation** (if sensitive):
   - Restrict image uploads to JPG/PNG only
   - Disable AVIF/SVG in image optimizer remotePatterns
   - Audit Server Actions for untrusted input
   - Validate webhook signatures
3. **Monitor**: Track deployment environment for exploitation attempts

### 🟡 **HIGH**: Fix Remaining Lint Errors (44 in generated components)

**Positive**: Lint errors improved 50% since last run (87→44). Root cause is likely in code generation upstream.

- Identify what changed between runs (code generation fix?)
- Apply same fixes to remaining 14 files
- Regenerate affected components
- **Impact**: Unblocks linting in CI/CD

### 🟡 **MEDIUM**: Fix source-map-js DoS

- Run: `npm audit fix` (resolves CVSS 7.5 DoS, no breaking changes)
- Quick win with minimal risk

### 🟠 **LOW**: Replace `<img>` in SplitSection.tsx

- Use Next.js `<Image />` component (lines 93, 96)
- Improves Largest Contentful Paint (LCP) and bandwidth optimization
- Non-critical but recommended

---

## Monitoring Notes

- **Build**: Consistently passing ✅ (65 pages, no regression)
- **Lint**: Improved significantly (87→44 errors, -50%)
- **Security**: 12 vulnerabilities stable; Next.js 36 CVEs awaiting product decision
- **Dependencies**: Fresh install (417 packages, 12 vulnerabilities found)

**Trend Analysis**: Lint errors are trending in the right direction. Investigation needed to identify what changed between 15:42 UTC run (87 errors) and this run (44 errors).

---

**Report generated**: 2026-11-06T00:00:00Z  
**Previous run**: 2026-11-06T15:42:00Z (87 lint errors)
