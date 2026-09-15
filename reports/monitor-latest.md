# Movena Website Monitor Report

**Run Timestamp**: 2026-09-15 (Current)  
**Overall Status**: ⚠️ **WARNING** (build passes; Next.js CVEs known/deferred; minimatch ReDoS fixable)

---

## Build ✅ PASS

**Command**: `npm run build`

Result: **Compiled successfully**. All 40 static pages generated without errors.

- TypeScript validation: ✓ Valid
- Static page generation: ✓ 40/40 complete
- Middleware: ✓ 27 kB
- Shared First Load JS: 80.6 kB
- No build errors or critical warnings

Route breakdown: 8 locale-specific pages, 8 blog articles, contact/privacy/terms/savings-calculator pages, 2 API routes, robots.txt, and sitemap.

---

## Lint ⚠️ WARNING (3 warnings, 0 errors)

**Command**: `npm run lint`

Result: **Clean exit** (no errors). 3 non-critical warnings found.

| File | Line | Issue |
|------|------|-------|
| `components/MetaPixel.tsx` | 54 | Use Next.js `<Image />` instead of `<img>` for performance |
| `components/SplitSection.tsx` | 93 | Use Next.js `<Image />` instead of `<img>` for performance |
| `components/SplitSection.tsx` | 96 | Use Next.js `<Image />` instead of `<img>` for performance |

**Impact**: Pre-existing, non-blocking. These are performance optimization recommendations (LCP and bandwidth); code is functional.

---

## Security ⚠️ WARNING (5 vulnerabilities: 4 high, 1 critical)

**Command**: `npm audit`

Result: **5 vulnerabilities found**.

### Critical Vulnerability (1)

**Package**: `next` (0.9.9–16.3.0-preview.10)  
**Severity**: CRITICAL  
**Count**: 31 CVEs including:
- Server-Side Request Forgery (SSRF) in Server Actions and rewrites
- Denial of Service in Image Optimization and Server Components
- Information exposure in dev server
- Authorization bypass
- Remote Code Execution (Windows)
- Cache poisoning and confusion vulnerabilities
- Cross-site scripting (App Router, beforeInteractive scripts)
- Unbounded payload handling in Edge runtime

**Fix**: `npm audit fix --force` → next@16.3.5 (breaking change, requires Next.js 13→16 major upgrade)

**Status**: ⚠️ **DEFERRED** — Per CLAUDE.md: "Next.js and nested postcss are knowingly left on current versions. Fixing requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action."

### High Vulnerabilities (4)

| Package | Range | Issue | Status |
|---------|-------|-------|--------|
| `postcss` | ≤8.5.22 | XSS via unescaped `</style>`; arbitrary file read via sourceMappingURL; path traversal in source map auto-loading | Bundled in `next`; deferred with Next.js upgrade |
| `minimatch` | 9.0.0–9.0.6 | ReDoS via repeated wildcards / GLOBSTAR segments / nested extglobs | Fixable independently |
| `@typescript-eslint/typescript-estree` | 6.16.0–7.5.0 | Depends on vulnerable minimatch | Fixes with minimatch patch |
| `@typescript-eslint/parser` | 6.16.0–7.5.0 | Depends on vulnerable @typescript-eslint/typescript-estree | Fixes with minimatch patch |

### Recommended Action: Fix minimatch

The minimatch ReDoS vulnerabilities in the TypeScript ESLint chain are **actionable without touching Next.js**. Per CLAUDE.md policy, avoid `npm audit fix` (rewrites ~87 packages). Use `package.json` overrides instead:

```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": ">=9.0.7"
  }
}
```

Then run `npm install`.

---

## Deprecation Warnings

During `npm install`, the following deprecated packages were flagged:
- rimraf@3.0.2 (v4+ required)
- inflight@1.0.6 (memory leak; use lru-cache)
- glob@7.1.7 (old version; security vulnerabilities fixed in current)
- @humanwhocodes/config-array@2.0.3, @humanwhocodes/object-schema@2.0.3 (use @eslint/* instead)
- eslint@8.57.1 (version no longer supported; see https://eslint.org/version-support)

Long-term: plan upgrade of ESLint toolchain and deprecated dependencies as part of maintenance.

---

## Summary Table

| Check | Status | Notes |
|-------|--------|-------|
| **Build** | ✅ Pass | 40 pages compiled; no errors |
| **Lint** | ⚠️ Warn | 3 `<img>` optimization hints; no errors |
| **Audit** | ⚠️ Warn | Next.js CVEs deferred (product decision); minimatch fixable |
| **Overall** | ⚠️ Warn | Build healthy; known Next.js issues tracked; actionable minimatch fix available |

---

## Notes

- No regressions from previous run
- Build and deployment ready
- Next.js upgrade (13→16) remains primary open risk; scheduled for product roadmap decision
- Minimatch patch recommended as interim control measure
