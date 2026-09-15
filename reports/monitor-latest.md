# Movena Website Monitor Report

**Run Timestamp**: 2026-09-15T00:00:00Z  
**Overall Status**: ⚠️ **WARNING** (build passes; known Next.js CVEs; minimatch ReDoS fixable)

---

## Build ✅ PASS

`npm run build` succeeded. All 40 static pages generated.

```
Route (app)                                                          Size     First Load JS
┌ ○ /_not-found                                                      875 B          81.5 kB
├ ● /[locale]                                                        19.1 kB         169 kB
├ ● /[locale]/blog                                                   208 B           115 kB
├ ● /[locale]/blog/[slug]                                            209 B           115 kB
├ ● /[locale]/contact                                                1.72 kB         109 kB
├ ● /[locale]/privacy                                                186 B           107 kB
├ ● /[locale]/savings-calculator                                     16.3 kB         166 kB
├ ● /[locale]/terms                                                  186 B           107 kB
├ λ /api/calculator/submit
├ λ /api/contact
├ ○ /robots.txt
└ ○ /sitemap.xml
```

---

## Lint ⚠️ WARNING (3 warnings, 0 errors)

`npm run lint` exited clean (no errors), but produced 3 warnings about `<img>` elements:

| File | Line | Warning |
|------|------|---------|
| `components/MetaPixel.tsx` | 54 | `<img>` should be `<Image />` (`@next/next/no-img-element`) |
| `components/SplitSection.tsx` | 93 | `<img>` should be `<Image />` (`@next/next/no-img-element`) |
| `components/SplitSection.tsx` | 96 | `<img>` should be `<Image />` (`@next/next/no-img-element`) |

These are pre-existing and non-blocking.

---

## Security ⚠️ WARNING (5 vulnerabilities: 4 high, 1 critical)

`npm audit` found 5 vulnerabilities. Per CLAUDE.md policy, the `next` and nested `postcss` issues are **knowingly deferred** — fixing them requires a Next.js 13→16 major upgrade, which is a product decision.

### Critical (1)

| Package | Range | Advisories (sample) |
|---------|-------|---------------------|
| `next` | 0.9.9–16.3.0-preview.10 | SSRF in Server Actions, SSRF in rewrites, auth bypass, RCE on Windows, DoS via Server Components, cache poisoning, XSS, and 20+ others |

Fix requires `npm audit fix --force` → installs `next@16.3.5` (breaking change). **Deferred — product decision.**

### High (4)

| Package | Range | Issue |
|---------|-------|-------|
| `postcss` (bundled inside `next`) | ≤8.5.22 | XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL |
| `minimatch` | 9.0.0–9.0.6 | ReDoS via repeated wildcards / GLOBSTAR / extglobs |
| `@typescript-eslint/typescript-estree` | 6.16.0–7.5.0 | Depends on vulnerable `minimatch` |
| `@typescript-eslint/parser` | 6.16.0–7.5.0 | Depends on vulnerable `@typescript-eslint/typescript-estree` |

`postcss` is nested inside `next` — also deferred.

**`minimatch` is fixable** without touching `next`. Per CLAUDE.md, avoid `npm audit fix` (rewrites ~87 packages). Recommended fix: add a scoped `overrides` entry in `package.json`:

```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": ">=9.0.7"
  }
}
```

Then run `npm install`.

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| Build | ✅ Pass | 40 pages, clean compile |
| Lint | ⚠️ Warning | 3 `<img>` warnings, no errors |
| Security | ⚠️ Warning | Next.js CVEs deferred (policy); minimatch ReDoS actionable |

No regressions from previous run. Deferred Next.js upgrade remains the main open risk.
