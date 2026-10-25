# Website Monitor Report

**Run Time**: 2026-10-25  
**Overall Status**: ⚠️ **NEEDS ATTENTION** — Build passes, linting fails, 11 security vulnerabilities

---

## Summary

The Movena website (Next.js 13 app) compiles successfully but has linting errors in generated components and 11 dependency vulnerabilities including 1 critical issue. The critical vulnerability is in Next.js itself, which requires a major version upgrade (Next 13→16) to resolve.

---

## Check Results

### ✅ Build: SUCCESS

Next.js build completed successfully.

- **Output**: All 61 static pages generated without errors
- **Build time**: ~30s
- **Key pages generated**:
  - Home pages: `/en`, `/da`
  - Blog index and article pages (21 localized posts)
  - Feature pages: savings-calculator, book-demo, contact, about, etc.
  - API routes: calculator, contact, demo endpoints

No build errors or warnings.

---

### ❌ Lint: FAILED

**59 errors, 2 warnings**

#### Errors (59 total)
All errors are unescaped HTML entities (apostrophes) in generated components. These are auto-generated files and do not reflect hand-written code issues.

Generated files with errors:
- `components/generated/BeregnerEn.tsx`: 2 errors
- `components/generated/BlogIndexDa.tsx`: 1 error
- `components/generated/BlogIndexEn.tsx`: 1 error
- `components/generated/BlogPostEn.tsx`: 7 errors
- `components/generated/BookDemoEn.tsx`: 3 errors
- `components/generated/ErrorEn.tsx`: 2 errors
- `components/generated/FaaAllePengeneHjemEn.tsx`: 5 errors
- `components/generated/ForsideDa.tsx`: 1 error
- `components/generated/ForsideEn.tsx`: 19 errors
- `components/generated/HavStyrPaaDagenEn.tsx`: 8 errors
- `components/generated/NotFoundEn.tsx`: 1 error
- `components/generated/OmOsEn.tsx`: 2 errors
- `components/generated/PrivatlivspolitikEn.tsx`: 3 errors
- `components/generated/VindFlereFlytningerEn.tsx`: 8 errors

**Rule**: `react/no-unescaped-entities`

#### Warnings (2 total)
- `components/SplitSection.tsx:93,96` — Using `<img>` instead of `<Image>` from `next/image` (performance advisory)

**Impact**: Linting issues are primarily in auto-generated content and do not block builds. The hand-written code (SplitSection.tsx) could use next/image optimization.

---

### ⚠️ Security Audit: 11 VULNERABILITIES

#### Summary
- **Critical**: 1
- **High**: 6
- **Moderate**: 4
- **Total packages**: 450 (152 prod, 289 dev, 37 optional)

#### Critical Vulnerabilities

**Next.js** — **CRITICAL (35+ distinct advisories)**

The Next.js package contains multiple critical security issues:

- **Server-Side Request Forgery (SSRF)**: Server Actions SSRF, Middleware/Proxy SSRF, WebSocket SSRF, Rewrite SSRF
- **Denial of Service**: Image optimization DoS, Server Components DoS variants, cache poisoning, unbounded disk growth
- **Remote Code Execution**: Unauthenticated RCE on Windows, AVIF, SVG image optimization
- **Cross-Site Scripting**: CSP nonce bypass, beforeInteractive script XSS, image content injection
- **Authorization Bypass**: Middleware/Proxy bypass in i18n, unauthenticated endpoint disclosure
- **Cache & Protocol Issues**: Cache confusion, HTTP request smuggling, middleware cache poisoning

**Affected range**: 0.9.9 - 16.3.0-preview.10  
**Fix**: Requires upgrade to `next@16.4.3` (breaking change, major version jump)

---

#### High Severity (6 total)

1. **brace-expansion** — CPU exhaustion DoS via quadratic expansion and uncontrolled recursion
2. **minimatch** — ReDoS via wildcards, GLOBSTAR segments, and catastrophic backtracking
3. **postcss** (nested in Next.js) — XSS, arbitrary file read, path traversal via sourceMappingURL
4. **source-map-js** — Event-loop DoS via indexed source-map offsets
5. **@typescript-eslint/typescript-estree** — Transitive: depends on minimatch
6. **@typescript-eslint/parser** — Transitive: depends on @typescript-eslint/typescript-estree

---

#### Moderate Severity (4 total)

- **@tailwindcss/typography**, **postcss-nested**, **tailwindcss** — Depend on vulnerable postcss-selector-parser
- **postcss-selector-parser** — Quadratic complexity in flat selector parsing (CPU exhaustion)

---

## Known Constraints

From project CLAUDE.md:

> `next` and its nested `postcss` are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`.

**Implication**: The Next.js critical vulnerabilities are acknowledged as needing product team review before a major upgrade.

---

## Recommendations

1. **Linting**: Generated component errors (unescaped entities) are auto-generation artifacts. Regenerate components with entity escaping or exclude generated files from lint rules.

2. **Security - Next.js**: Plan the Next.js 13→16 upgrade with product team. This is the primary blocker for resolving the critical vulnerabilities.

3. **Security - Interim**: While awaiting Next.js upgrade:
   - Review image optimization remotePatterns configuration
   - Add WAF rules to mitigate SSRF attack surface
   - Monitor logs for exploitation attempts

4. **Transitive Dependencies**: Some high/moderate vulnerabilities (brace-expansion, source-map-js) have fixes available but are blocked by the Next.js version lock.

---

**Status**: ⚠️ Build working, linting issues in generated code, security vulnerabilities require product decision on Next.js upgrade.
