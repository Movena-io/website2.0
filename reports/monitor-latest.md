# Website Monitor Report

**Run Time:** 2026-10-25T15:06 UTC  
**Overall Status:** ❌ **CRITICAL** — Build succeeds, but linting blocks deployment and 11 security vulnerabilities remain

---

## Summary

| Check | Status | Finding |
|-------|--------|---------|
| **Build** | ✅ Pass | 61 pages compiled successfully |
| **Lint** | ❌ Fail | 87 errors (unescaped entities in generated components) — **improved from 93** |
| **Security** | ⚠️ Critical | 11 vulnerabilities: 1 critical, 6 high, 4 moderate |

---

## Build Status: ✅ Pass

**Next.js compilation successful** — all 61 pages built without errors.

- **Output**: Generated routes across 2 locales (en, da)
- **Compilation time**: ~30 seconds
- **First Load JS**: 80.6 kB shared chunks
- **Largest page**: Savings calculator (24.6 kB)

---

## Linting Status: ❌ FAIL (87 errors, down from 93)

**Blocking issue**: Unescaped HTML entities in generated React components.

### Error Breakdown

- **Type**: `react/no-unescaped-entities` rule violations
- **Root cause**: Raw apostrophes in JSX should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
- **Error count**: 87 unescaped apostrophes
- **Affected**: 12+ auto-generated components in `components/generated/`

### Files with Errors (selection)
- `ForsideEn.tsx`: 19 errors
- `HavStyrPaaDagenEn.tsx`: 8 errors
- `BlogPostEn.tsx`: 7 errors
- `FaaAllePengeneHjemEn.tsx`: 5 errors
- `VindFlereFlytningerEn.tsx`: 8 errors
- And 7 other generated files...

### Minor Issues (2 warnings)
- `SplitSection.tsx` lines 93, 96: Using `<img>` instead of Next.js `<Image/>` component
  - **Impact**: Performance (slower LCP, higher bandwidth)

### Root Cause Analysis

These are **auto-generated components**. The lint errors suggest either:
1. The generation source contains unescaped quotes, OR
2. The generation process doesn't properly escape HTML entities

This requires fixing the generation pipeline, not manual fixes.

---

## Security Status: ⚠️ Critical (11 vulnerabilities)

### Critical Severity (1)

**Next.js** (versions 0.9.9–16.3.0-preview.10, includes 13.x)
- Multiple critical advisories:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Remote Code Execution (RCE) on Windows-hosted servers
  - RCE in Image Optimization API with AVIF/SVG files
  - Cache poisoning via response body confusion
  - HTTP request smuggling in rewrites
  - Denial of Service (DoS) with Server Components
  - Cross-site scripting (XSS) in App Router with CSP nonces
  - Authorization bypass vulnerability
  - Middleware redirect cache poisoning
- **Fix required**: Upgrade to Next.js 16.4.3+ (breaking change)
- **Status**: Known constraint per CLAUDE.md — upgrade requires product decision

### High Severity (6)

1. **brace-expansion** — CPU exhaustion via uncontrolled recursion (CVSS 7.5)
   - Affects: `@typescript-eslint/typescript-estree`
   - Impact: Dev tooling

2. **minimatch** — ReDoS vulnerability (CVSS 7.5)
   - Affects: `@typescript-eslint/parser` chain
   - Impact: Dev tooling

3. **postcss** (bundled in Next.js) — Path traversal via sourceMappingURL (CVSS 7.5)
   - Multiple advisories: arbitrary file read, XSS via unescaped `</style>`
   - Impact: All Next.js builds

4. **source-map-js** — Event-loop DoS (CVSS 7.5)

5. **@typescript-eslint/typescript-estree** — Transitive: depends on minimatch

6. **@typescript-eslint/parser** — Transitive: depends on @typescript-eslint/typescript-estree

### Moderate Severity (4)

- **postcss-selector-parser** — Quadratic complexity CPU exhaustion (CVSS 5.9)
- **@tailwindcss/typography, postcss-nested, tailwindcss** — Transitive dependencies on postcss-selector-parser

### Audit Summary
```
Total packages: 418
Vulnerabilities: 11 (1 critical, 6 high, 4 moderate)
```

### Known Constraint (from CLAUDE.md)

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."

This constraint is appropriate given the scope.

---

## Trends Since Last Run

| Metric | Previous | Current | Change |
|--------|----------|---------|--------|
| Lint Errors | 93 | 87 | ✅ **–6 errors** (improved) |
| Build Status | ✅ Pass | ✅ Pass | — |
| Security Issues | 11 | 11 | — |

**Positive**: Linting errors decreased by 6 since last run (93→87).

---

## Recommendations

### 🔴 Blocking (Deploy-Critical)

**Fix linting errors** (87 errors)
- Root cause is in the component generation pipeline
- Options:
  1. Fix generator to escape HTML entities automatically
  2. Regenerate components with proper escaping
  3. If auto-generated from external source, exclude from lint rules
- **Effort**: Depends on generation pipeline complexity

### 🟠 High Priority (Next Sprint)

**Image optimization** (2 warnings in SplitSection.tsx)
- Replace `<img>` with `<Image/>` from `next/image`
- Low effort, improves performance

**Plan Next.js upgrade** (product decision)
- Required to resolve critical vulnerabilities
- Next.js 13→16 migration is significant work
- Recommend scheduling with product team

### 🟡 Monitor

**Security vulnerabilities**
- Current state acknowledged and known
- Continue monitoring for CVE updates
- Revisit upgrade timeline with product team

---

**Report Generated:** Website Monitor (Claude Haiku 4.5)  
**Environment:** Remote execution (Linux)  
**Tools Run:** npm install, npm run build, npm run lint, npm audit  
**Session:** https://claude.ai/code/session_01NokZ7NwQHnBZdjNJaUEsyk
