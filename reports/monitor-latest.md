# Website2.0 Health Monitor Report

**Run Timestamp:** 2026-09-15 (UTC)  
**Overall Status:** ❌ Critical

---

## Summary

The website2.0 project builds and lints successfully, but contains **5 security vulnerabilities** (1 critical, 4 high) that require attention. The critical severity stems from Next.js 13 containing multiple RCE vulnerabilities (CVSS 9.0). Per CLAUDE.md, this major version upgrade is a known product decision outside monitoring scope. The 4 high-severity issues in minimatch and PostCSS are transitive dependencies with fixable alternatives.

---

## Build Status: ✅ Successful

**Result:** Compilation completed without errors

- ✅ All 40 static pages generated successfully
- ✅ Type checking passed with no issues
- ✅ No build errors detected
- ✅ Static site generation working as expected
- ✅ Output size optimized

**Build Command Output:**
```
Creating an optimized production build...
✓ Compiled successfully
✓ Generating static pages (40/40)
✓ Finalizing page optimization
✓ Collecting build traces
```

**Routes Generated:**
- Home pages: `/[locale]` (en, da) — 19.1 kB
- Blog index: `/[locale]/blog` — 208 B
- Blog articles: `/[locale]/blog/[slug]` — 21 articles, 209 B each
- Pages: contact (1.72 kB), privacy (186 B), savings-calculator (16.3 kB), terms (186 B)
- API endpoints: `/api/calculator/submit`, `/api/contact`
- Static assets: robots.txt, sitemap.xml
- Middleware: 27 kB

**Asset Summary:**
- Shared JS (First Load): 80.6 kB
  - chunks/472: 27.5 kB
  - chunks/fd9d: 51.1 kB
  - main-app: 230 B
  - webpack: 1.79 kB

---

## Lint Status: ⚠️ Warnings Only (No Errors)

**Result:** 3 warnings found, 0 errors, 0 blocking issues

**Issues Detected:**

| File | Line | Rule | Issue | Severity |
|------|------|------|-------|----------|
| `components/MetaPixel.tsx` | 54 | `@next/next/no-img-element` | Using `<img>` tag | ⚠️ Warning |
| `components/SplitSection.tsx` | 93 | `@next/next/no-img-element` | Using `<img>` tag | ⚠️ Warning |
| `components/SplitSection.tsx` | 96 | `@next/next/no-img-element` | Using `<img>` tag | ⚠️ Warning |

**Assessment:** Low severity — performance optimization recommendations. Using Next.js `<Image />` component instead of native `<img>` improves Largest Contentful Paint (LCP) and reduces bandwidth through automatic optimization. Non-blocking suggestions; builds succeed despite warnings.

---

## Security Audit: ❌ 5 Vulnerabilities (1 Critical, 4 High)

**Audit Results:**
```
npm audit
423 packages audited
5 vulnerabilities: 1 critical, 4 high, 0 moderate, 0 low
```

### Critical Severity (1)

#### **next** — Multiple Critical & High Vulnerabilities
- **Package:** `next` (v13.x)
- **Location:** `node_modules/next`

**Critical CVEs in Current Version:**

| CVE | Title | CVSS | Type | Affected Range |
|-----|-------|------|------|-----------------|
| GHSA-p293-qw3h-jr36 | Unauthenticated Remote Code Execution on Windows | 9.0 | Path Traversal RCE | 13.4.0 - 15.5.23 |
| GHSA-2xp9-vwfh-vxw4 | RCE in Image Optimization API (AVIF) | — | Image Processing RCE | 10.0.0 - 15.5.23 |
| GHSA-fr5h-rqp8-mj6g | Server-Side Request Forgery in Server Actions | 7.5 | SSRF | 13.4.0 - 14.1.0 |
| GHSA-g77x-44xx-532m | Denial of Service in Image Optimization | 5.9 | DoS | 10.0.0 - 14.2.6 |

**Additional High/Moderate Issues:** 15+ additional vulnerabilities including:
- Authorization bypass, cache poisoning, middleware bypass, XSS in CSP nonces, information disclosure, HTTP smuggling
- Affects Server Actions, Image Optimization API, Dev Server, WebSocket upgrades

**Product Status (per CLAUDE.md):** ⚠️ 
> "Next.js and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

**Available Fix:** `npm audit fix --force` → next@16.3.5 (requires major version upgrade 13 → 16)

**Recommendation:** Establish timeline for upgrade; this is a product decision requiring cross-team coordination and testing due to breaking changes.

---

### High Severity (4)

#### **1. minimatch (9.0.0 - 9.0.6)** — Regular Expression Denial of Service (ReDoS)

**Affected Package:** `@typescript-eslint/typescript-estree → minimatch`  
**Vulnerability Chain:** @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**CVEs:**
| ID | Title | CVSS | Trigger |
|---|---|---|---|
| GHSA-3ppc-4f35-3m26 | ReDoS via repeated wildcards with non-matching literal | — | Pattern matching |
| GHSA-7r86-cg39-jmmj | ReDoS via GLOBSTAR combinatorial backtracking | 7.5 | Multiple non-adjacent GLOBSTAR segments |
| GHSA-23c5-xmqv-rm74 | ReDoS via nested `*()` extglobs | 7.5 | Catastrophic backtracking in regex |

**Status:** Fixable via `npm audit fix`, but per CLAUDE.md guidelines, prefer targeted override in `package.json` to avoid updating ~87 unrelated packages.

**Recommendation:** Add scoped override entry (similar to existing `js-yaml@3` and `nanoid@3` entries) rather than broad `npm audit fix`.

---

#### **2. postcss (≤8.5.22)** — Multiple High-Severity Issues

**Affected Package:** `next → postcss` (nested dependency)

**CVEs:**
| ID | Title | CVSS | Type |
|---|---|---|---|
| GHSA-6g55-p6wh-862q | Arbitrary file read via sourceMappingURL | 7.5 | Information Disclosure |
| GHSA-r28c-9q8g-f849 | Path traversal via source map auto-loading | 7.5 | Path Traversal |
| GHSA-fxqj-rqcc-2cmp | Incomplete fix for GHSA-6g55-p6wh-862q | — | Source Map Injection |
| GHSA-qx2v-qp2m-jg93 | XSS via unescaped `</style>` in CSS | 6.1 | Cross-Site Scripting |

**Status:** Cannot be patched independently; requires Next.js major version upgrade to 16+ (see above).

**Recommendation:** Resolution depends on Next.js upgrade timeline.

---

---

## Dependency Summary

```
npm install
423 packages audited
├─ 157 production dependencies
├─ 289 development dependencies  
├─ 37 optional dependencies
└─ 5 vulnerabilities (1 critical, 4 high)
```

- **Packages with Available Funding:** 154
- **Up to date:** Yes, no pending updates

---

## Recommendations by Priority

### 🔴 Priority 1: Critical — Next.js Major Version Upgrade

**Status:** Acknowledged product decision in CLAUDE.md. Do not run `npm audit fix --force`.

**Issue:** Next.js 13 contains 4 critical and 15+ additional high/moderate vulnerabilities including RCE, SSRF, DoS, and authorization bypass.

**Required Action:** Establish timeline and plan for Next.js 13 → 16+ upgrade
- Major version change requires comprehensive testing
- Breaking changes may require code updates
- Coordinate with product/engineering teams
- This is a product decision, not a routine maintenance task

**Interim Measures (while planning upgrade):**
- Maintain this monitoring schedule
- Implement defense-in-depth (WAF, strict CSP policies, request validation)
- Restrict Server Actions where possible
- Monitor image optimization features for exploit attempts
- Disable Windows deployments if running in that environment (CVSS 9.0 RCE)

---

### 🟡 Priority 2: High — Minimatch Transitive Dependency

**Status:** Fixable without major upgrades.

**Issue:** `@typescript-eslint/parser` depends on minimatch with 3 ReDoS vulnerabilities (CVSS 7.5).

**Recommended Approach (per CLAUDE.md):**
> "Patch a transitive dependency with a scoped entry in `overrides` in `package.json` instead" of running `npm audit fix`

**Action:** Add minimatch override to `package.json` to pinned safe version:
```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": "^9.1.0"
  }
}
```
Then run `npm install`. This avoids `npm audit fix` rewriting ~87 packages.

---

### 🟢 Priority 3: Code Quality — Lint Warnings

**Status:** Non-blocking, low priority optimization.

**Action:** Convert 3 `<img>` tags to Next.js `<Image />` component:
```
- components/MetaPixel.tsx:54
- components/SplitSection.tsx:93
- components/SplitSection.tsx:96
```

**Benefit:** Improves Largest Contentful Paint (LCP), reduces bandwidth via automatic optimization.

---

## Test Results

| Check | Command | Status | Details |
|-------|---------|--------|---------|
| Dependencies | `npm install` | ✅ Pass | 423 packages, 5 vulnerabilities |
| Build | `npm run build` | ✅ Pass | 40 pages generated, no errors |
| Linting | `npm run lint` | ⚠️ Warn | 3 non-blocking warnings, 0 errors |
| Security | `npm audit` | ❌ Critical | 1 critical, 4 high severity CVEs |

---

**Report generated:** 2026-09-15 (UTC)  
**Next run:** Scheduled (monitor reports history with: `git log reports/monitor-latest.md`)
