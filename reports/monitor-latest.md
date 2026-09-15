# Website Monitor Report

**Run Timestamp:** 2026-09-15  
**Overall Status:** ⚠️ Warning

---

## Summary

Build completed successfully with no errors. Lint check found 3 non-critical warnings (image optimization style issues). Security audit reveals 5 vulnerabilities (1 critical, 4 high), but Next.js vulnerabilities are documented as intentional per project configuration.

---

## Check Results

### ✅ Build Check: PASSED

- Production build compiled successfully
- All 40 static pages generated without errors
- Route optimization completed
- First Load JS: 80.6 kB (shared across all routes)
- No compilation errors or build failures

**Status:** Healthy

---

### ⚠️ Lint Check: 3 Warnings (Non-Critical)

| File | Line | Issue |
|------|------|-------|
| `./components/MetaPixel.tsx` | 54 | Using `<img>` instead of Next.js `<Image />` |
| `./components/SplitSection.tsx` | 93 | Using `<img>` instead of Next.js `<Image />` |
| `./components/SplitSection.tsx` | 96 | Using `<img>` instead of Next.js `<Image />` |

**Status:** Warnings only (no errors)

**Impact:** Style/performance optimization recommendations; not blocking

---

### 🔴 Security Audit: 5 Vulnerabilities

#### Critical (1)

**Next.js 13** - 31+ known security issues
- SSRF in Server Actions and rewrites
- DoS in Server Components and Image Optimization API
- RCE on Windows-hosted servers
- XSS in App Router with CSP nonces and beforeInteractive scripts
- Cache poisoning and middleware bypasses
- Authorization bypass and information disclosure

**Status:** INTENTIONAL - Per CLAUDE.md: "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

#### High (4)

**minimatch** (via @typescript-eslint)
- 3 ReDoS vulnerabilities in glob pattern matching
- Location: Dev dependency chain, not production code
- Fix available: `npm audit fix` (safe)

**PostCSS ≤ 8.5.22** (nested in Next.js)
- 4 vulnerabilities: XSS, arbitrary file read, path traversal
- Location: Inside Next.js node_modules (cannot update independently)
- Fix blocked: Requires Next.js major version upgrade

---

## Audit Summary

| Metric | Value |
|--------|-------|
| Total packages audited | 423 |
| Packages seeking funding | 154 |
| Total vulnerabilities | 5 |
| Critical | 1 |
| High | 4 |
| Moderate | 0 |
| Low | 0 |

---

## Recommendations

1. **No immediate action required** - Build is functional and lint warnings are non-blocking
2. **Optional:** Migrate `<img>` tags to Next.js `<Image />` for better LCP optimization
3. **Product decision:** Next.js major upgrade (13 → 16) would resolve all Next.js/PostCSS vulnerabilities

---

## How to View Run History

`git log reports/monitor-latest.md`
