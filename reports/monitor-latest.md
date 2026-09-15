# Website Health Monitor Report

**Run Timestamp:** 2026-09-15 (UTC)  
**Overall Status:** ⚠️ Warning

---

## Summary

Build and lint checks pass successfully with no compilation errors. Code quality shows **3 minor optimization warnings** (non-critical img elements). Security audit identifies **5 vulnerabilities** (1 critical in Next.js, 4 high in minimatch/PostCSS). Per CLAUDE.md, Next.js and PostCSS vulnerabilities are **known and intentionally pinned**, awaiting product decision for major version upgrade (13 → 16+). Build is production-ready operationally.

---

## Build Status: ✅ Healthy

**Result:** Compiled successfully with zero errors

- ✓ Type checks passed
- ✓ 40 static pages generated successfully (both locales: en, da)
- ✓ All routes compiled:
  - Home: /[locale] (19.1 kB)
  - Blog: /[locale]/blog (21 articles generated)
  - Utilities: /[locale]/contact, /[locale]/savings-calculator, /[locale]/privacy, /[locale]/terms
  - API endpoints: /api/calculator/submit, /api/contact
  - Middleware: 27 kB
- ✓ Bundle sizes healthy:
  - First Load JS (shared): 80.6 kB
  - Main locale: 169 kB
  - Blog pages: 115 kB
- ✓ No compilation warnings or errors

---

## Lint Status: ⚠️ Minor Issues

**Result:** 3 warnings, 0 errors

| File | Line | Issue | Severity |
|------|------|-------|----------|
| components/MetaPixel.tsx | 54 | `<img>` instead of `<Image />` | Low (performance) |
| components/SplitSection.tsx | 93 | `<img>` instead of `<Image />` | Low (performance) |
| components/SplitSection.tsx | 96 | `<img>` instead of `<Image />` | Low (performance) |

**Assessment:** Non-critical performance optimization recommendations. Next.js `<Image />` component would improve LCP and reduce bandwidth. Can be deferred.

---

## Security Audit: ❌ Critical (Known/Pinned)

**Total Vulnerabilities:** 5 (1 critical, 4 high)  
**Packages Audited:** 423 (up to date, no newer versions available)

### Critical Severity (1)

**Next.js** — Affects versions 0.9.9 - 16.3.0-preview.10 (31 known CVEs)

Current: unknown exact version but in critical range  
Examples of critical issues:
- Unauthenticated Remote Code Execution on Windows (CVSS 9.0)
- Unauthenticated RCE in Image Optimization API with AVIF
- Server-Side Request Forgery in Server Actions
- Denial of Service via Server Components
- Cache poisoning attacks
- Authorization bypass vulnerabilities
- HTTP request smuggling

**Status:** Pinned intentionally per CLAUDE.md. Requires Next.js 13 → 16+ upgrade (breaking change, product decision).

### High Severity (4)

**minimatch 9.0.6** (transitive: @typescript-eslint/parser → @typescript-eslint/typescript-estree)
- 3 ReDoS (Regular Expression Denial of Service) vulnerabilities
- GHSA-3ppc-4f35-3m26: Repeated wildcards with non-matching literal
- GHSA-7r86-cg39-jmmj: Multiple GLOBSTAR segments (CVSS 7.5)
- GHSA-23c5-xmqv-rm74: Nested extglobs (CVSS 7.5)
- Scope: Dev dependency only (TypeScript linting, not production)
- Fix: Available via `npm audit fix`

**PostCSS 8.5.0** (nested in next/node_modules)
- 4 high-severity vulnerabilities:
  - Arbitrary file read via sourceMappingURL (CVSS 7.5)
  - Path traversal in source map loading (CVSS 7.5)
  - XSS via unescaped `</style>` (CVSS 6.1)
  - Incomplete fix for source map disclosure
- Scope: Cannot fix independently (pinned by Next.js 13)
- Fix: Requires Next.js 16.3.5+ upgrade

### Dependency Chain
```
next (13.x) ─→ postcss (8.5.0) [4 vulnerabilities]
@typescript-eslint/parser ─→ @typescript-eslint/typescript-estree ─→ minimatch (9.0.6) [3 ReDoS]
```

---

## Policy: Known Issues & Deferred Decisions

Per **CLAUDE.md** (npm audit section):

> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

**Interpretation:** The 5 vulnerabilities are documented technical debt, consciously accepted pending product team scheduling of Next.js major version upgrade. Monitor reports status; does not enforce fixes.

---

## Risk Assessment

**Production Risk Level:** Critical (documented, accepted)

- **Windows deployments:** Immediate RCE risk from Next.js vulnerabilities
- **Linux deployments:** Lower immediate risk but still affected by AVIF optimization RCE and cache poisoning
- **PostCSS risks:** Arbitrary file reads and XSS possible in certain configurations
- **minimatch risks:** Dev-time only; no production impact (ReDoS in linting pipeline)

---

## Dependency Summary

| Metric | Value |
|--------|-------|
| Total Packages Audited | 423 |
| **Critical Vulns** | **1** |
| **High Vulns** | **4** |
| **Total Vulns** | **5** |
| Funding Available | 154 packages |

---

## Recommendations

### Do NOT
- ~~`npm audit fix --force`~~ (triggers breaking Next.js 13→16 upgrade)
- Patch PostCSS independently (pinned by Next.js)

### Can Do (Low Risk)
- **Optional:** `npm audit fix` patches minimatch ReDoS only (non-breaking)
  - Resolves 3 dev-dependency ReDoS vulnerabilities
  - Does not fix Next.js/PostCSS issues

### Requires Product Decision (Major Effort)
- **Schedule Next.js 13 → 16+ major version upgrade**
  - Blocking: Resolves all 5 vulnerabilities
  - Effort: Breaking changes, full regression testing
  - Timeline: Product team call

### Quick Wins (Optional)
- Replace 3 `<img>` elements with `<Image />` (MetaPixel.tsx:54, SplitSection.tsx:93/96)
  - Effort: Low
  - Benefit: Performance improvement

---

## Health Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| **Build** | ✅ Healthy | 0 errors, 40 pages generated |
| **Type Safety** | ✅ Healthy | All checks pass |
| **Code Quality** | ⚠️ Minor | 3 img optimization warnings |
| **Production Ready** | ✅ Yes | Operationally sound |
| **Security Posture** | ❌ Critical | Known vulns, pinned, awaiting upgrade decision |

**Conclusion:** Website is **operationally production-ready** (builds, deploys, runs) but carries **documented security risk in core dependencies** pending Next.js major version upgrade decision by product team.
