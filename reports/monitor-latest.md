# website2.0 Health Monitor Report

**Run Timestamp:** 2026-09-15 12:00 UTC  
**Overall Status:** ⚠️ Warning

---

## Executive Summary

The website2.0 project **builds and lints successfully** with no compilation errors. Code quality shows **3 minor optimization warnings** (non-critical). The project has **5 active security vulnerabilities** (1 critical, 4 high) in core dependencies Next.js and PostCSS. Per CLAUDE.md, these are **known issues requiring a major Next.js version upgrade (13 → 16+)**, which is a deferred product decision.

---

## Build Status ✅ Healthy

**Result:** Compiled successfully with no errors

**Details:**
- ✓ All type checks passed
- ✓ 40 static pages generated successfully
- ✓ Both locales compiled (en/da)
- ✓ All routes deployed:
  - Landing page, blog, contact form, privacy, terms, savings calculator
  - 21 blog articles (across 2 locales)
  - API endpoints: /api/calculator/submit, /api/contact
  - Middleware: 27 kB (compiled successfully)
- ✓ First Load JS: 80.6 kB (shared baseline)
- ✓ No compilation warnings or errors

**Bundle Analysis:**
- Main locale page: 169 kB (loaded)
- Blog pages: 115 kB
- Largest page: 166 kB
- Static assets optimized

---

## Lint Status ⚠️ Warnings Only

**Result:** 3 warnings, 0 errors

**Issues:**

| File | Line | Issue | Impact |
|------|------|-------|--------|
| components/MetaPixel.tsx | 54 | `<img>` instead of `<Image />` | Slower LCP, higher bandwidth |
| components/SplitSection.tsx | 93 | `<img>` instead of `<Image />` | Slower LCP, higher bandwidth |
| components/SplitSection.tsx | 96 | `<img>` instead of `<Image />` | Slower LCP, higher bandwidth |

**Severity:** Low (performance optimization recommendations, not critical)  
**Recommendation:** Migrate to Next.js `<Image />` component for performance optimization. Can be deferred.

---

## Security Audit ❌ Critical Issues Found

**Total Vulnerabilities:** 5 (1 critical, 4 high)  
**Total Packages Audited:** 423

### Critical Severity (1)

**Next.js 13.5.6** — Multiple critical security advisories

Includes 31 known vulnerabilities affecting Next.js versions 0.9.9 - 16.3.0-preview.10:
- **Unauthenticated Remote Code Execution on Windows** (GHSA-p293-qw3h-jr36)
  - CVSS Score: 9.0 (critical)
  - Range affected: 13.4.0 to <15.5.24
  
- **Unauthenticated RCE in Image Optimization API with AVIF** (GHSA-2xp9-vwfh-vxw4)
  - Severity: Critical
  - Range affected: 10.0.0 to <15.5.24

- **Server-Side Request Forgery in Server Actions** (GHSA-fr5h-rqp8-mj6g)
  - CVSS Score: 7.5 (high)
  - Range affected: 13.4.0 to <14.1.1

- Plus 28 additional vulnerabilities (DoS, cache poisoning, XSS, information disclosure, HTTP smuggling, etc.)

**Current Version:** 13.5.6 (in affected range)  
**Fix Available:** Requires upgrade to Next.js 16.3.5+ (major breaking change)

### High Severity (4)

**minimatch 9.0.6** (via @typescript-eslint/typescript-estree)
- **3 ReDoS vulnerabilities** (Regular Expression Denial of Service)
  - GHSA-3ppc-4f35-3m26: Repeated wildcards with non-matching literal
  - GHSA-7r86-cg39-jmmj: Multiple non-adjacent GLOBSTAR segments (CVSS 7.5)
  - GHSA-23c5-xmqv-rm74: Nested extglobs (CVSS 7.5)
- **Scope:** Development dependency (TypeScript linting only, does not affect production)
- **Fix:** Available via `npm audit fix`

**PostCSS 8.5.0** (nested in next/node_modules)
- **4 high-severity vulnerabilities:**
  - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q, CVSS 7.5)
  - Path traversal in source map loading (GHSA-r28c-9q8g-f849, CVSS 7.5)
  - XSS via unescaped `</style>` (GHSA-qx2v-qp2m-jg93, CVSS 6.1)
  - Incomplete fix for source map disclosure (GHSA-fxqj-rqcc-2cmp)
- **Scope:** Cannot fix independently – pinned by Next.js 13
- **Fix:** Requires Next.js upgrade to 16.3.5+

### Dependency Chain

```
next (13.5.6) → postcss (8.5.0) [4 vulnerabilities]
@typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch (9.0.6) [3 vulnerabilities]
```

---

## Dependency Audit Summary

| Metric | Value |
|--------|-------|
| Total Packages Audited | 423 |
| Production Dependencies | 157 |
| Development Dependencies | 289 |
| Optional Dependencies | 37 |
| **Critical Vulnerabilities** | **1** |
| **High Vulnerabilities** | **4** |
| **Total Vulnerabilities** | **5** |
| Packages Available for Funding | 154 |

---

## Known Issues & Product Decision

Per **CLAUDE.md** (§ "npm audit"):

> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. **Do not run `npm audit fix --force`.**

**Status:** The 5 vulnerabilities are documented and acknowledged as technical debt pending product team decision on Next.js major version upgrade.

---

## Risk Assessment

### Production Risk: **Critical** ⚠️
- **Next.js RCE vulnerabilities** on production (especially Windows servers) pose immediate threat
- Requires immediate attention if deployed to Windows environments
- Linux deployments have lower immediate risk but still affected by AVIF optimization RCE
- PostCSS vulnerabilities could allow arbitrary file reads and XSS in certain configurations

### Mitigation Notes
- No immediate patches available without major version upgrade
- Security posture requires scheduling Next.js 13→16 migration
- minimatch ReDoS fixes are available but do not resolve critical issues

---

## Recommendations

### ❌ Do NOT Do
- Do NOT run `npm audit fix --force` (triggers Next.js 13→16 breaking upgrade)
- Do NOT attempt to patch PostCSS independently

### ✅ Can Do (Low Risk)
1. **Optional:** Run `npm audit fix` to patch minimatch ReDoS vulnerabilities only
   ```bash
   npm audit fix
   ```
   - This is a non-breaking change
   - Resolves 3 high-severity ReDoS issues in dev dependencies
   - Does not fix Next.js or PostCSS vulnerabilities

### 📋 Requires Product Decision (Major Effort)
1. **Schedule Next.js 13 → 16+ major version upgrade**
   - Breaking changes likely
   - Full regression testing required
   - Resolves all 5 vulnerabilities
   - Required for long-term security posture

### 🎯 Quick Wins (Optional)
1. Migrate 3 `<img>` elements to Next.js `<Image />` component
   - components/MetaPixel.tsx:54
   - components/SplitSection.tsx:93, 96
   - Effort: Low
   - Benefit: Performance improvement

---

## Overall Health Assessment

| Aspect | Status | Details |
|--------|--------|---------|
| Build Compilation | ✅ Healthy | 0 errors, compiles cleanly |
| Type Safety | ✅ Healthy | All type checks pass |
| Code Quality | ⚠️ Minor Issues | 3 optimization warnings only |
| Page Generation | ✅ Healthy | 40/40 pages generated |
| Production Readiness | ✅ Yes | Builds and deploys without errors |
| Security Posture | ❌ Critical | Known vulnerabilities pending major upgrade |

**Conclusion:** The website is **production-ready from an operational perspective** but carries **documented security risk in core dependencies** pending product team decision on Next.js 16 migration.

---

## Change Log (This Run vs. Previous)

No changes since last run.
- Build: Still compiling cleanly
- Lint: Same 3 optimization warnings
- Audit: Same 5 vulnerabilities (1 critical, 4 high)

Status remains ⚠️ Warning with acknowledged product decision on Next.js upgrade.
