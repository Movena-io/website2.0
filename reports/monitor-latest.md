# Website Health Monitor Report

**Run Timestamp:** 2026-09-15 11:41 UTC  
**Overall Status:** ⚠️ Warning  
**Run Summary:** Build and lint pass with minor warnings. Security audit shows 5 known vulnerabilities (1 critical in Next.js, 4 high in dependencies) that are intentionally pinned per product decision. Site is operationally production-ready.

---

## Executive Summary

| Check | Result | Details |
|-------|--------|---------|
| **npm install** | ✅ Success | 423 packages, all up to date |
| **npm run build** | ✅ Success | Compiled, 40 pages generated, 0 errors |
| **npm run lint** | ⚠️ Warnings | 3 non-critical img optimization warnings |
| **npm audit** | ❌ Critical | 5 vulnerabilities (1 critical, 4 high) - **known & pinned** |
| **Overall Health** | ⚠️ Warning | Operationally healthy; known security debt pending upgrade decision |

---

## Build Status: ✅ Healthy

**Result:** Compiled successfully with zero errors

- ✓ Type checks passed
- ✓ 40 static pages generated (both locales: en, da)
- ✓ All routes compiled:
  - Home: /[locale] (19.1 kB)
  - Blog: /[locale]/blog with 21 article routes
  - Contact: /[locale]/contact (1.72 kB)
  - Savings Calculator: /[locale]/savings-calculator (16.3 kB)
  - Legal: /[locale]/privacy, /[locale]/terms
  - API: /api/calculator/submit, /api/contact
  - Middleware: 27 kB
- ✓ Bundle sizes optimal:
  - First Load JS shared: 80.6 kB
  - Locale pages: 169 kB
  - Blog pages: 115 kB
- ✓ No warnings or errors during compilation

---

## Lint Status: ⚠️ Minor Issues

**Result:** 3 warnings, 0 errors

| File | Line | Rule | Issue | Severity |
|------|------|------|-------|----------|
| components/MetaPixel.tsx | 54 | @next/next/no-img-element | Using `<img>` instead of `<Image />` | Low |
| components/SplitSection.tsx | 93 | @next/next/no-img-element | Using `<img>` instead of `<Image />` | Low |
| components/SplitSection.tsx | 96 | @next/next/no-img-element | Using `<img>` instead of `<Image />` | Low |

**Assessment:** Non-critical performance optimization recommendations. All warnings are about image handling. The Next.js `<Image />` component would improve Largest Contentful Paint (LCP) and reduce bandwidth. These can be addressed in a future cleanup task.

---

## Security Audit: ❌ Critical (Known & Pinned)

**Summary:** 5 vulnerabilities detected (1 critical, 4 high). Per CLAUDE.md project policy, these are **knowingly pinned** and are a documented product decision, not a monitor action item.

**Packages Audited:** 423 (all up to date; no newer minor/patch versions available)

### Critical Severity (1)

**Next.js** — Affects versions 0.9.9 through 16.3.0-preview.10

Current version: 13.x (pinned intentionally)

31 documented CVEs including:
- GHSA-p293-qw3h-jr36: Unauthenticated Remote Code Execution on Windows (CVSS 9.0)
- GHSA-2xp9-vwfh-vxw4: Unauthenticated RCE in Image Optimization API with AVIF files
- GHSA-fr5h-rqp8-mj6g: Server-Side Request Forgery in Server Actions
- GHSA-8h8q-6873-q5fj: Denial of Service with Server Components
- GHSA-3x4c-7xq6-9pq8: Unbounded next/image disk cache growth
- GHSA-3g8h-86w9-wvmq: Middleware/Proxy cache poisoning
- GHSA-ffhc-5mcf-pf4q: Cross-site scripting in App Router with CSP nonces
- Multiple authorization bypass and cache confusion vulnerabilities

**Status:** Pinned at Next.js 13.x per CLAUDE.md policy. Resolution requires major upgrade to Next.js 16+, which is a breaking change scheduled by product team.

### High Severity (4)

#### 1. minimatch (9.0.0–9.0.6)
**Location:** node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch

Three ReDoS (Regular Expression Denial of Service) vulnerabilities:
- GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards
- GHSA-7r86-cg39-jmmj: ReDoS via multiple GLOBSTAR segments (CVSS 7.5)
- GHSA-23c5-xmqv-rm74: ReDoS via nested extglobs (CVSS 7.5)

**Scope:** Development dependency only (TypeScript ESLint parsing, not production runtime)

**Fix Available:** `npm audit fix` (non-breaking, low risk)

#### 2. PostCSS (≤8.5.22)
**Location:** node_modules/next/node_modules/postcss

Four high-severity vulnerabilities:
- GHSA-qx2v-qp2m-jg93: XSS via unescaped `</style>` in CSS output (CVSS 6.1)
- GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL (CVSS 7.5)
- GHSA-fxqj-rqcc-2cmp: Incomplete fix; sourceMappingURL still reads arbitrary .map files when `from` is unset (CVSS 7.5)
- GHSA-r28c-9q8g-f849: Path traversal in source map auto-loading (CVSS 7.5)

**Scope:** Nested dependency of Next.js; cannot be patched independently

**Fix Available:** Only via Next.js 16.3.5+ upgrade (breaking change)

---

## Dependency Tree

```
next (13.x) ──→ postcss (8.5.0) ──→ [4 vulnerabilities]
                └─ [31 CVEs in Next.js itself]

@typescript-eslint/parser (6.16–7.5) ──→ @typescript-eslint/typescript-estree
                                        ──→ minimatch (9.0.6) ──→ [3 ReDoS vulns]
```

---

## Policy: Pinned Vulnerabilities

Per **CLAUDE.md** (npm audit section):

> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

**Status:** These vulnerabilities are **documented technical debt**, consciously accepted by the product team pending formal scheduling of the Next.js major version upgrade. The monitor reports status; it does not enforce fixes.

---

## Risk Assessment

**Production Risk Level:** Critical (documented and accepted)

| Deployment Type | Risk | Notes |
|-----------------|------|-------|
| **Windows servers** | Immediate RCE | GHSA-p293-qw3h-jr36 (CVSS 9.0) is critical on Windows |
| **Linux servers** | High | AVIF image optimization RCE and cache poisoning remain exploitable |
| **Image optimization** | High | AVIF-triggered RCE and disk cache exhaustion possible |
| **PostCSS processing** | Medium | Arbitrary file reads possible with crafted CSS; XSS vector in certain contexts |
| **Development/CI** | Low | minimatch ReDoS only affects build-time linting; no production impact |

---

## Actionable Items

### ❌ Do Not
- `npm audit fix --force` — triggers breaking Next.js 13→16 upgrade without product approval
- `npm update next` or `npm audit fix --force --next` for same reason

### ⚠️ Can Do (Low Risk, Optional)
- `npm audit fix` — patches minimatch ReDoS only
  - Resolves 3 high-severity dev-dependency vulnerabilities
  - Non-breaking change
  - Does not resolve Next.js/PostCSS issues
  - Recommended if minimatch ReDoS is a concern in your CI pipeline

### 📋 Blocked (Requires Product Decision)
- **Next.js 13→16+ Major Upgrade**
  - Would resolve all 5 vulnerabilities
  - Requires full regression testing
  - Product team decision needed on timeline/scope
  - Monitor will track until completed

### 🎯 Quick Wins (Optional, Low Priority)
- Replace 3 `<img>` tags with `<Image />` component
  - Files: MetaPixel.tsx:54, SplitSection.tsx:93, SplitSection.tsx:96
  - Effort: ~15 minutes
  - Benefit: Improved LCP and bandwidth optimization

---

## Summary Table

| Metric | Value | Status |
|--------|-------|--------|
| Build Success | Yes | ✅ |
| Type Check | Pass | ✅ |
| Lint Errors | 0 | ✅ |
| Lint Warnings | 3 | ⚠️ |
| Pages Generated | 40/40 | ✅ |
| Total Packages | 423 | ✅ |
| Vulnerabilities | 5 | ❌ |
| — Critical | 1 | ❌ |
| — High | 4 | ❌ |
| Funding Available | 154 pkgs | ℹ️ |

---

## Conclusion

**Website Health:** ⚠️ **Warning** (Operationally Healthy, Known Security Debt)

- **Operationally:** Build is healthy, compiles without error, runs 40 pages across 2 locales. Code quality shows only minor non-critical warnings.
- **Security:** Carries critical vulnerabilities in Next.js core and PostCSS dependencies. These are documented, intentionally pinned per CLAUDE.md, and await product team decision on Next.js major version upgrade.
- **Production Readiness:** Site can be deployed and is functionally sound. Security posture should be addressed per product timeline.
- **Monitor Role:** Tracks status. Enforcement of fixes requires separate product team approval.

**Next Monitor Run:** Scheduled per automation; or manual run with `npm audit` to check for new advisories in pinned dependencies.
