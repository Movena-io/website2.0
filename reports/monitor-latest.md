# Website2.0 Health Monitor

**Run Timestamp:** 2026-09-15 16:00 UTC  
**Overall Status:** ❌ **Critical**

---

## Summary

The website builds successfully with no compilation errors. Code quality linting shows 3 minor optimization warnings. However, the project carries **5 unresolved npm vulnerabilities** (4 high, 1 critical) in core dependencies Next.js and PostCSS. Per CLAUDE.md, these are known issues requiring a major Next.js upgrade (13 → 16+), which is a product decision deferred from this monitor.

---

## Build Check: ✅ Healthy

**Status:** ✓ Compiled successfully

- No compilation errors
- Generated 40 static pages across both locales (en/da)
- Type checking passed
- All routes compiled (home, blog, contact, privacy, terms, savings-calculator, etc.)
- API routes created (calculator/submit, contact endpoints)
- Middleware compiled (27 kB)
- First Load JS shared: 80.6 kB (reasonable)
- Build time: Normal

**Routes Generated:**
- 21 blog articles deployed (en/da locales)
- Landing page, contact form, calculator, legal pages all present

---

## Lint Check: ⚠️ Warnings

**Status:** 3 warnings, no errors

**Warning Details:**
1. **components/MetaPixel.tsx:54** – Using `<img>` instead of Next.js `<Image />` (performance impact on LCP)
2. **components/SplitSection.tsx:93** – Using `<img>` instead of Next.js `<Image />`
3. **components/SplitSection.tsx:96** – Using `<img>` instead of Next.js `<Image />`

**Impact:** Non-blocking; images will render but may have slower Largest Contentful Paint (LCP) and higher bandwidth usage. Can be fixed by migrating to Next.js Image component.

---

## Security Audit: ❌ Critical

**Total Vulnerabilities:** 5 (1 critical, 4 high)

### Critical Severity

**Next.js (versions 0.9.9 - 16.3.0-preview.10)** — 30+ security advisories including:

**SSRF & RCE Vulnerabilities:**
- Server-Side Request Forgery in Server Actions
- Unauthenticated Remote Code Execution on Windows-hosted servers
- Unauthenticated RCE in Image Optimization API with AVIF files
- SSRF in rewrites via attacker-controlled destination hostname
- SSRF in applications using WebSocket upgrades

**DoS Vulnerabilities:**
- Denial of Service with Server Components (multiple variants)
- Denial of Service in Image Optimization API
- DoS via Image Optimizer remotePatterns configuration
- DoS via insecure React Server Components HTTP deserialization
- DoS in App Router using Server Actions

**Authorization & Access Control:**
- Authorization bypass vulnerability
- Unauthenticated disclosure of internal Server Function endpoints

**Cache & Content Injection:**
- Cache key confusion for Image Optimization API routes
- Cache poisoning via collisions in React Server Component cache-busting
- Cache confusion of response bodies
- Content Injection in Image Optimization
- Middleware/Proxy cache poisoning
- Middleware/Proxy bypass in Pages Router with i18n

**XSS & Input Handling:**
- Cross-site scripting in App Router with CSP nonces
- Cross-site scripting in beforeInteractive scripts with untrusted input

**Other:**
- HTTP request smuggling in rewrites
- Unbounded next/image disk cache growth (storage exhaustion)
- Unbounded Server Action payload in Edge runtime
- Information exposure in dev server due to lack of origin verification

**Status:** Known issue per CLAUDE.md – requires Next.js major upgrade (13 → 16+), which is a product decision. Do not run `npm audit fix --force`.

**Fix Available:** `npm audit fix --force` (breaking change, will upgrade to Next.js 16.3.5)

### High Severity (4)

**minimatch (9.0.0 - 9.0.6)** — 3 ReDoS (Regular Expression Denial of Service)

- ReDoS via repeated wildcards with non-matching literal in pattern (GHSA-3ppc-4f35-3m26)
- ReDoS: combinatorial backtracking via multiple non-adjacent GLOBSTAR segments (GHSA-7r86-cg39-jmmj)
- ReDoS: nested `*()` extglobs generate catastrophically backtracking regex (GHSA-23c5-xmqv-rm74)

**Chain:** @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**Status:** Fixable with `npm audit fix` (non-breaking change)

**PostCSS (≤8.5.22)** — 4 vulnerabilities

- XSS via unescaped `</style>` in CSS Stringify output (GHSA-qx2v-qp2m-jg93)
- Arbitrary file read via attacker-controlled sourceMappingURL (GHSA-6g55-p6wh-862q)
- Incomplete fix of sourceMappingURL vulnerability – reads arbitrary .map files when `from` unset (GHSA-fxqj-rqcc-2cmp)
- Path Traversal in source map auto-loading leading to arbitrary .map file disclosure (GHSA-r28c-9q8g-f849)

**Chain:** Nested in next/node_modules (dependency of Next.js)

**Status:** Requires Next.js upgrade to resolve; cannot be fixed independently

---

## Dependencies Summary

- **Total Audited:** 423 packages
- **Vulnerabilities:** 5 (1 critical, 4 high)
- **Funding Available:** 154 packages offer sponsorship options
- **npm Version:** Up to date

---

## Product Decision Documentation

Per CLAUDE.md (§ "npm audit"):

> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

**Implication:** The 5 vulnerabilities documented above are acknowledged risks that require explicit product decision to upgrade. This monitor reports them but defers remediation to the product team.

---

## Recommendations

### Do Not Do
- ❌ Do NOT run `npm audit fix --force` – will force Next.js 16 upgrade with breaking changes
- ❌ Do NOT run `npm audit fix` without understanding minimatch-only fix impact

### Immediate (Low Effort)
1. If acceptable: Run `npm audit fix` to patch only minimatch ReDoS vulnerabilities
   ```bash
   npm audit fix
   ```

### Short-term (Low Effort)
1. Migrate 3 `<img>` elements to Next.js `<Image />` component in MetaPixel.tsx and SplitSection.tsx (performance optimization)

### Long-term (High Effort, Product Decision)
1. Schedule Next.js 13 → 16+ major version upgrade (breaking changes, extensive testing required)
2. This will resolve all 5 vulnerabilities and modern PostCSS issues in one initiative

---

## Conclusion

**Build Status:** ✅ Healthy and production-ready from build perspective  
**Code Quality:** ✅ Acceptable (3 minor optimization warnings only)  
**Security Posture:** ❌ Critical vulnerabilities in Next.js/PostCSS (known, deferred)

The website deploys and runs without errors but carries documented security risk in core dependencies pending product team decision on major upgrade path.
