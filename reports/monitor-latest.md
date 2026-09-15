# Website2.0 Health Monitor Report

**Run Timestamp:** 2026-09-15 at 18:00+ UTC  
**Overall Status:** ❌ Critical

---

## Summary

Build and lint checks passed successfully. Security audit detected **5 vulnerabilities** (1 critical, 4 high). The critical Next.js vulnerabilities are known issues per CLAUDE.md and require a product-level decision for a major version upgrade from Next.js 13 to 16. Lint warnings are non-critical performance recommendations.

---

## Build Check: ✅ Passed

**Result:** Compilation successful with no errors

- All 40 static pages generated successfully
- Type checking passed
- No build errors detected
- Output optimized for production

**Build Summary:**
```
✓ Compiled successfully
✓ Generating static pages (40/40)
✓ Type checking completed
✓ Build traces collected
```

**Routes Configured:**
- Home pages: `/[locale]` (en, da)
- Blog: `/[locale]/blog` and `/[locale]/blog/[slug]` (21 articles)
- Additional pages: contact, privacy, savings-calculator, terms
- API routes: calculator/submit, contact endpoints
- Middleware: 27 kB

---

## Lint Check: ⚠️ Warnings (Non-Critical)

**Result:** 3 warnings found, no errors

**Issues:**
1. **MetaPixel.tsx:54** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image` for LCP optimization
   
2. **SplitSection.tsx:93** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image`
   
3. **SplitSection.tsx:96** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image`

**Severity:** Low — Performance optimization recommendations that do not block builds or deployment.

---

## Security Audit: ❌ Critical Vulnerabilities

**Total Vulnerabilities:** 5 (1 Critical, 4 High)

### Critical Severity (1)

**Next.js (versions 0.9.9 - 16.3.0-preview.10)** — 33 CVEs

The project's Next.js version contains multiple critical security vulnerabilities:
- **Server-Side Request Forgery (SSRF)** in Server Actions, rewrites, and WebSocket upgrades
- **Denial of Service (DoS)** via Server Components and Image Optimization
- **Unauthenticated Remote Code Execution (RCE)** on Windows-hosted servers
- **Cache poisoning and collision** vulnerabilities
- **XSS vulnerabilities** in App Router (CSP nonces) and beforeInteractive scripts
- **Image Optimization API** exploits and unbounded cache growth
- **Middleware/Proxy bypass** in Pages Router i18n and rewrites
- **Information disclosure** in dev server and internal endpoints
- **Authorization bypass** vulnerabilities
- **Server-side request deserialization** DoS with React Server Components
- **HTTP request smuggling** in rewrites

**CLAUDE.md Status:** Next.js and postcss are "knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

**Available Fix:** `npm audit fix --force` → next@16.3.5 (breaking change)

### High Severity (4)

**1. minimatch (9.0.0 - 9.0.6)** — ReDoS Vulnerabilities

3 Regular Expression Denial of Service (ReDoS) vulnerabilities:
- Repeated wildcards with non-matching literal in pattern
- Multiple non-adjacent GLOBSTAR segments combinatorial backtracking
- Nested *() extglobs generate catastrophically backtracking regex

Dependency chain: @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**Available Fix:** `npm audit fix`

**2. PostCSS (≤8.5.22)** — 4 Vulnerabilities

- **XSS:** Unescaped `</style>` in CSS Stringify Output
- **Information Disclosure:** Arbitrary file read via attacker-controlled sourceMappingURL
- **Path Traversal:** Previous Source Map auto-loading reads arbitrary .map files
- **Source Map Injection:** Incomplete fix of sourceMappingURL handling

Dependency chain: next → postcss (nested)

**Available Fix:** `npm audit fix --force` (requires Next.js upgrade)

---

## Dependency Summary

- **Total Packages:** 423
- **Audited:** All
- **Vulnerable:** 5 (1 critical, 4 high)
- **Funding Requests:** 154 packages

---

## Recommendations

### Immediate Actions (Best Effort)
1. **Lint warnings:** Convert 3 `<img>` tags to `<Image />` for performance
   - Files: MetaPixel.tsx, SplitSection.tsx
   - Effort: Low

### Product-Level Decision Required
1. **Next.js & PostCSS Upgrade:** Schedule major version upgrade from Next.js 13 to 16+
   - Current impact: 33 Next.js CVEs including critical SSRF, RCE, and DoS vulnerabilities
   - Breaking change: Requires comprehensive testing and validation
   - Timeline: Coordinate with product and engineering teams

2. **Interim Mitigation (if upgrade blocked):**
   - Monitor for active 0-day exploits
   - Deploy behind WAF/reverse proxy to mitigate SSRF and DoS vectors
   - Implement strict CSP and request validation

---

## Test Commands Executed

```bash
npm install           # Verify dependencies (423 packages)
npm run build         # Production build validation
npm run lint          # Code quality and performance checks
npm audit             # Security vulnerability scan
```

---

**Report generated by automated monitor on 2026-09-15**
