# Website2.0 Health Monitor Report

**Run Timestamp:** 2026-09-15 (latest)  
**Overall Status:** ⚠️ Warning

---

## Summary

Build compilation and code quality checks passed successfully with no errors. Security audit detected **5 vulnerabilities** (1 critical, 4 high). The critical Next.js vulnerabilities are acknowledged as known product decisions in CLAUDE.md and require a major version upgrade from Next.js 13 to 16. Lint warnings are non-critical performance recommendations. Development can proceed with awareness of these constraints.

---

## Build Status: ✅ Successful

**Result:** Compilation completed without errors

- ✅ All 40 static pages generated successfully
- ✅ Type checking passed with no issues
- ✅ No build errors detected
- ✅ Static site generation working as expected
- ✅ Output size within normal parameters

**Build Output:**
```
✓ Compiled successfully
✓ Generating static pages (40/40)
✓ Type checking completed
✓ Build traces collected
```

**Routes Deployed:**
- Home pages: `/[locale]` (en, da)
- Blog: `/[locale]/blog` and `/[locale]/blog/[slug]` (21 articles)
- Additional pages: contact, privacy, savings-calculator, terms
- API routes: calculator/submit, contact endpoints
- Middleware: 27 kB
- Main JS bundle: 80.6 kB (shared)

---

## Lint Status: ⚠️ Warnings Only

**Result:** 3 warnings found, 0 errors

**Issues Detected:**
1. **components/MetaPixel.tsx:54** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image` for LCP optimization
   
2. **components/SplitSection.tsx:93** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image`
   
3. **components/SplitSection.tsx:96** — Using `<img>` tag
   - Rule: `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image`

**Assessment:** Low severity — performance optimization recommendations that do not block builds or deployment. These are non-blocking suggestions for improved Largest Contentful Paint (LCP) metrics.

---

## Security Audit: ❌ 5 Vulnerabilities (4 High, 1 Critical)

**Severity Breakdown:**
- 1 Critical (Next.js)
- 4 High (minimatch: 3, PostCSS: 4)

### Critical Severity (1)

**Next.js (versions 0.9.9 - 16.3.0-preview.10)** — Multiple CVEs

Location: `node_modules/next`

The project's Next.js version contains multiple critical security vulnerabilities including:
- **Server-Side Request Forgery (SSRF)** in Server Actions, rewrites, and WebSocket upgrades
- **Denial of Service (DoS)** via Server Components and Image Optimization
- **Unauthenticated Remote Code Execution (RCE)** on Windows-hosted servers and Image Optimization API
- **Cache poisoning and collision** vulnerabilities across multiple vectors
- **XSS vulnerabilities** in App Router (CSP nonces) and beforeInteractive scripts
- **Image Optimization API** exploits including unbounded cache growth
- **Middleware/Proxy bypass** in Pages Router with i18n
- **Information disclosure** in dev server and internal Server Function endpoints
- **Authorization bypass** vulnerabilities
- **HTTP request smuggling** in rewrites
- **Unbounded Server Action payload** in Edge runtime

**Product Status (per CLAUDE.md):** ⚠️ "Next.js and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

**Available Fix:** `npm audit fix --force` → next@16.3.5 (breaking change, not recommended per CLAUDE.md)

### High Severity (4)

**1. minimatch (9.0.0 - 9.0.6)** — 3 ReDoS Vulnerabilities

Regular Expression Denial of Service vulnerabilities in glob pattern matching:
- Repeated wildcards with non-matching literal in pattern (GHSA-3ppc-4f35-3m26)
- GLOBSTAR combinatorial backtracking via non-adjacent segments (GHSA-7r86-cg39-jmmj)
- Nested `*()` extglobs generate catastrophically backtracking regex (GHSA-23c5-xmqv-rm74)

Dependency chain: @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**Status:** 🟡 Fixable via `npm audit fix`, but per CLAUDE.md, sweeping updates are discouraged. Recommend patching via `overrides` in package.json (similar to existing js-yaml@3 and nanoid@3 entries).

**2. PostCSS (≤8.5.22)** — 4 High Vulnerabilities

- **XSS:** Unescaped `</style>` in CSS Stringify Output (GHSA-qx2v-qp2m-jg93)
- **Information Disclosure:** Arbitrary file read via attacker-controlled sourceMappingURL (GHSA-6g55-p6wh-862q)
- **Path Traversal:** Previous Source Map auto-loading reads arbitrary .map files (GHSA-r28c-9q8g-f849)
- **Source Map Injection:** Incomplete fix attempt (GHSA-fxqj-rqcc-2cmp)

Dependency chain: next → postcss (nested dependency)

**Status:** ⚠️ Part of Next.js dependency tree. Upgrade requires the Next.js major version change mentioned above.

---

## Dependency Summary

- **Total Packages:** 423 audited
- **Vulnerable:** 5 (1 critical, 4 high)
- **Packages with Funding:** 154 available

---

## Recommendations

### Priority 1: Product-Level Decision (Next.js/PostCSS)

**Status:** Acknowledged as known decision in CLAUDE.md. Do not run `npm audit fix --force`.

The critical Next.js vulnerabilities require a major version upgrade from Next.js 13 to 16+. This is a product decision requiring:
- Comprehensive testing and validation
- Coordination with product and engineering teams
- Breaking changes may affect application behavior

**Interim approach:** Maintain awareness of vulnerabilities and continue scheduled monitoring. If upgrading is deferred, implement defense-in-depth measures (WAF, strict CSP, request validation).

### Priority 2: Secondary Fixes (minimatch)

**Status:** Fixable but deferred per CLAUDE.md guidelines.

Per CLAUDE.md: "Patch a transitive dependency with a scoped entry in `overrides` in `package.json` instead" of running broad `npm audit fix` commands. This avoids unintended updates to ~87 packages.

Recommendation: Add minimatch override entry to `package.json` using the same pattern as existing js-yaml@3 and nanoid@3 entries.

### Priority 3: Code Quality (lint warnings)

**Status:** Non-blocking, low priority.

Convert 3 `<img>` tags to Next.js `<Image />` component for improved LCP performance:
- `components/MetaPixel.tsx:54`
- `components/SplitSection.tsx:93`
- `components/SplitSection.tsx:96`

---

## Test Results

| Check | Status | Details |
|-------|--------|---------|
| `npm install` | ✅ Pass | 423 packages, 5 vulnerabilities flagged |
| `npm run build` | ✅ Pass | 40 pages generated, no errors |
| `npm run lint` | ⚠️ Warn | 3 non-critical warnings, 0 errors |
| `npm audit` | ❌ Critical | 5 vulnerabilities (1 critical, 4 high) |

---

**Report generated: 2026-09-15**  
**Next scheduled run:** Check CLAUDE.md for monitoring cadence
