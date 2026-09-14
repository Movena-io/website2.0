# Movena Website Monitor Report

**Run Timestamp**: 2026-09-14T17:04:50Z  
**Overall Status**: ⚠️ **WARNING**

---

## Executive Summary

The Movena website builds and deploys successfully with all 40 static pages generated correctly. Linting passes with 3 minor performance optimization suggestions. Security audit identifies 5 vulnerabilities: 1 critical in Next.js and 4 high-severity in transitive dependencies. 

**Key Point**: Per CLAUDE.md, Next.js 13 vulnerabilities are acknowledged as requiring a major version upgrade (a product decision, not a monitor action). The project is functional and deployable.

---

## Check Results Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | 40 pages generated, no errors |
| **Lint** | ⚠️ PASS | 3 warnings (image optimization suggestions) |
| **Security** | ⚠️ WARNING | 5 vulnerabilities (1 critical, 4 high) |

---

## 1. Build Check ✅ **PASSED**

**Command**: `npm run build`  
**Duration**: ~30 seconds  
**Status**: Compilation successful

### Details

- ✓ Next.js compiled successfully without errors
- ✓ Type checking passed
- ✓ Generated 40 static pages successfully
- ✓ Middleware compiled (27 kB)
- ✓ First Load JS (shared): 80.6 kB

### Pages Generated

**Static Routes** (SSG):
- `/[locale]` - Home (19.1 kB, 169 kB First Load JS)
- `/[locale]/blog` - Blog index (208 B, 115 kB First Load JS)
- `/[locale]/blog/[slug]` - Blog posts (21 articles)
- `/[locale]/savings-calculator` (16.3 kB, 166 kB First Load JS)
- `/[locale]/contact` (1.72 kB, 109 kB First Load JS)
- `/[locale]/privacy` (186 B, 107 kB First Load JS)
- `/[locale]/terms` (186 B, 107 kB First Load JS)

**API Routes** (Lambda):
- `/api/calculator/submit`
- `/api/contact`

**Static Assets**:
- `robots.txt`
- `sitemap.xml`

### Bundle Metrics

- Shared JS chunks: 80.6 kB
  - chunks/472-28ec35b8e2b527de.js: 27.5 kB
  - chunks/fd9d1056-bfd247beca2ef082.js: 51.1 kB
  - chunks/main-app-14409b30a4e213f3.js: 230 B
  - chunks/webpack-e662da484b6e6c98.js: 1.79 kB

**Conclusion**: Build is healthy. No compilation errors or warnings.

---

## 2. Lint Check ⚠️ **PASSED WITH WARNINGS**

**Command**: `npm run lint`  
**Status**: 3 warnings, 0 errors

### Warnings Identified

| File | Line | Issue | Rule |
|------|------|-------|------|
| `components/MetaPixel.tsx` | 54 | Using `<img>` instead of `<Image />` | @next/next/no-img-element |
| `components/SplitSection.tsx` | 93 | Using `<img>` instead of `<Image />` | @next/next/no-img-element |
| `components/SplitSection.tsx` | 96 | Using `<img>` instead of `<Image />` | @next/next/no-img-element |

### Impact Assessment

- **Performance**: Using raw `<img>` may result in slower LCP (Largest Contentful Paint)
- **Bandwidth**: No automatic image optimization applied
- **Cost**: Potential additional usage or cost from image optimization providers

### Remediation

Replace `<img>` elements with Next.js `<Image />` component:
1. Import: `import Image from 'next/image'`
2. Replace `<img>` with `<Image />`
3. Add required `alt`, `width`, and `height` attributes

**Conclusion**: All warnings are fixable optimization suggestions. No critical code quality issues.

---

## 3. Security Audit ⚠️ **5 VULNERABILITIES DETECTED**

**Command**: `npm audit`  
**Status**: 5 vulnerabilities (1 critical, 4 high)  
**Fixable via npm audit fix**: 1 (minimatch)  
**Fixable via npm audit fix --force**: 4 (requires breaking changes)

### Vulnerability Summary

| Package | Severity | CVEs | Dev/Prod | Fix |
|---------|----------|------|----------|-----|
| **next** | CRITICAL | 34+ | Prod | `npm audit fix --force` ⚠️ Breaking |
| **minimatch** | HIGH | 3 | Dev | `npm audit fix` |
| **postcss** | HIGH | 4+ | Prod | `npm audit fix --force` ⚠️ Breaking |
| **Total** | **1 CRIT, 4 HIGH** | **41+** | | |

### Detailed Analysis

#### 1. Next.js (CRITICAL) — Multiple Security Flaws

**Package**: next (0.9.9–16.3.0-preview.10)  
**Current Version**: 13.x  
**Severity**: CRITICAL (34+ distinct vulnerabilities)  
**Fix Required**: Upgrade to 16.3.5+ (breaking change)

**Issue Categories**:
- Server-Side Request Forgery (SSRF) - 3 instances
- Cross-Site Scripting (XSS) - 2+ instances
- Denial of Service (DoS) - 5+ instances
- Cache Poisoning - 2+ instances
- Remote Code Execution (RCE) - 1+ instances
- Authorization Bypass
- Information Disclosure
- HTTP Request Smuggling

**Examples**:
- GHSA-fr5h-rqp8-mj6g: SSRF in Server Actions
- GHSA-g77x-44xx-532m: DoS in Image Optimization
- GHSA-3h52-269p-cp9r: Information Exposure in Dev Server
- GHSA-7gfc-8cq8-jh5f: Authorization Bypass
- GHSA-xv57-4mr9-wg8v: Content Injection in Image Optimization
- GHSA-qpjv-v59x-3qc4: Race Condition to Cache Poisoning

**Dependency Location**: `node_modules/next`

**Note**: Per CLAUDE.md, these vulnerabilities are "knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

#### 2. minimatch (HIGH) — Regular Expression DoS (ReDoS)

**Packages**: minimatch 9.0.0–9.0.6  
**Severity**: HIGH (3 distinct vulnerabilities)  
**Fixable**: Yes, via `npm audit fix` (non-breaking)  
**Impact Level**: Development-only (not runtime)

**Vulnerabilities**:
1. GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards
2. GHSA-7r86-cg39-jmmj: ReDoS via combinatorial backtracking
3. GHSA-23c5-xmqv-rm74: ReDoS via nested extglobs

**Dependency Chain**:
```
@typescript-eslint/typescript-estree → minimatch
@typescript-eslint/parser → @typescript-eslint/typescript-estree
```

**Location**: `node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch`

**Impact**: Development environment; not runtime impact

#### 3. PostCSS (HIGH) — XSS & Information Disclosure

**Package**: postcss (≤8.5.22)  
**Severity**: HIGH (4+ vulnerabilities)  
**Fixable**: Requires Next.js upgrade  
**Dependency**: Nested within Next.js

**Vulnerabilities**:
1. GHSA-qx2v-qp2m-jg93: XSS via unescaped `</style>` in CSS stringify
2. GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL
3. GHSA-fxqj-rqcc-2cmp: Incomplete fix (still readable .map files)
4. GHSA-r28c-9q8g-f849: Path traversal in source map auto-loading

**Impact**:
- Script injection via malicious CSS
- Reading sensitive `.map` files and other files
- Path traversal to access files outside intended directories

**Location**: `node_modules/next/node_modules/postcss`

---

## Remediation Options

### Option 1: Accept Acknowledged Risk (Current Status)

Per CLAUDE.md, Next.js vulnerabilities are a known constraint:
- ✅ Build: Passes
- ✅ Deploy: Functional
- ⚠️ Security: Known flaws require major version decision
- 📋 Recommendation: Acknowledge constraint; prioritize at product level

### Option 2: Fix minimatch Only (Safe)

```bash
npm audit fix
```

- Addresses 3 ReDoS vulnerabilities
- Non-breaking upgrade
- Development environment only
- Leaves 4 Next.js/PostCSS vulnerabilities in place

### Option 3: Major Upgrade (Breaking)

```bash
npm audit fix --force
```

- ⚠️ Requires Next.js 13 → 16+ migration
- Fixes all 5 vulnerabilities
- Potential breaking changes
- Requires thorough testing and potential code updates

---

## Dependency Status

- **Total Packages**: 422
- **Vulnerabilities**: 5 (1 critical, 4 high)
- **Audit Status**: Exit code 1 (vulnerabilities detected)
- **npm fund**: 154 packages have funding options

---

## Recommendations

### Priority 1: No Action Required
The website is functional and deployable. Next.js vulnerabilities are acknowledged constraints (per CLAUDE.md).

### Priority 2: Optional Enhancement
Consider running `npm audit fix` to patch minimatch ReDoS (development-only impact).

### Priority 3: Code Quality
Replace 3 `<img>` tags with `next/image` components for performance optimization.

### Priority 4: Strategic Decision
Plan Next.js major version upgrade (13 → 16+) as a product initiative when feasible.

---

## Metadata

- **Monitor Agent**: website-monitor
- **Project**: Movena Website (website2.0)
- **Repository**: movena-io/website2.0
- **Build Status**: ✅ PASS
- **Lint Status**: ⚠️ 3 warnings
- **Audit Status**: ⚠️ 5 vulnerabilities (acknowledged)
- **Next Recommended Run**: 2026-09-21 (weekly)

---

*Report generated by website-monitor agent. This file is overwritten on each run. Run history available via `git log reports/monitor-latest.md`.*
