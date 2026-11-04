# Movena Website Monitor Report

**Run Timestamp**: 2026-11-04T10:00:00Z  
**Status**: ❌ **CRITICAL**

---

## Summary

Build passes. Lint has 63 errors across 15 files (all in auto-generated components). Security audit reports 12 vulnerabilities: 1 critical (Next.js, multiple CVEs), 6 high (brace-expansion, minimatch, postcss, source-map-js), 2 moderate, 3 low. Vulnerability count is down from 25 in the previous run, likely due to deduplication in the npm audit output format — the underlying Next.js issue remains unresolved (intentional per CLAUDE.md).

**Changes since last run**: Lint errors down from 88 → 63 (25 fewer). Vulnerabilities shown: 25 → 12 (npm audit deduplication). No code commits since last run.

---

## Build Status

**Result**: ✅ **PASS**

The Next.js build completed successfully with no errors. All routes generated:
- 42 static routes (SSG)
- 3 API routes (server)
- 10+ blog post variations across locales
- Middleware: 27.9 kB
- First Load JS shared: 80.6 kB

---

## Lint Status

**Result**: ❌ **FAIL** (63 errors across 15 files, 2 warnings)

All errors are `react/no-unescaped-entities` in auto-generated components under `components/generated/`. These are pre-existing issues in generated code.

**Files with errors** (15 files):
- `components/SplitSection.tsx`
- `components/generated/BeregnerEn.tsx`
- `components/generated/BlogIndexDa.tsx`
- `components/generated/BlogIndexEn.tsx`
- `components/generated/BlogPostEn.tsx`
- (and 10 more generated components)

**Warning**: 2 `@next/next/no-img-element` warnings (use `<Image />` from `next/image`)

**Note**: Previous run reported 88 errors; now 63. No code changes were committed — the difference may reflect a linting scope change or component regeneration.

---

## Security Audit

**Result**: ❌ **CRITICAL** (12 vulnerabilities: 1 critical, 6 high, 2 moderate, 3 low)

### Critical

| Package | Range | Issues |
|---------|-------|--------|
| `next` | 0.9.9 – 16.3.0-preview.10 | SSRF in Server Actions, DoS in image optimization, auth bypass, middleware redirect SSRF, cache poisoning, XSS, RCE (Windows), RCE in image optimization API (SVG/AVIF), HTTP request smuggling, unauthenticated function endpoint disclosure, and more (34 CVEs) |

**Status**: Intentionally deferred per `CLAUDE.md`. Fixing requires upgrading Next.js 13 → 16+, a product-level decision.

### High

| Package | Issues |
|---------|--------|
| `brace-expansion` (≤1.1.20, 2.0.0–2.1.6) | 3 DoS CVEs (quadratic expansion, stack exhaustion) |
| `minimatch` (7.0.0–11.0.0) | 4 ReDoS CVEs |
| `postcss` (≤8.5.22) | XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL (3 CVEs) |
| `source-map-js` (1.0.0–1.2.1) | Event-loop DoS via indexed source-map offsets |

### Moderate / Low

2 moderate (postcss-selector-parser, @tailwindcss/typography dependency chain), 3 low.

**Patchable without breaking changes**: `source-map-js`, `brace-expansion` can be pinned in `overrides` per CLAUDE.md pattern. `postcss` and `minimatch` upgrades may require care.

---

## Recommended Actions

1. **High priority (overrides)**: Pin `source-map-js` and `brace-expansion` using `overrides` in `package.json` — same pattern as `js-yaml` and `nanoid`. These are patchable without breaking changes.
2. **Lint**: The 63 `react/no-unescaped-entities` errors in generated components should be fixed at generation time or suppressed with a per-file eslint-disable comment in the generator template.
3. **Next.js upgrade**: Requires product decision — not a monitor action.
