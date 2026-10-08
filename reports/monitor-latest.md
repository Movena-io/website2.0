# Website Monitor Report

**Run:** 2026-10-08T00:00:00Z  
**Overall status:** ⚠️ WARNING — build passes, lint errors in generated files, security vulnerabilities present

---

## Results Summary

| Check    | Status | Details |
|----------|--------|---------|
| Build    | ✅ Pass | `npm run build` successful, all pages generated |
| Lint     | ❌ Fail | 53 `react/no-unescaped-entities` errors; 2 `no-img-element` warnings |
| Security | ⚠️ Alert | 20 vulnerabilities (1 critical, 12 high, 7 moderate) |

---

## Build Check ✅

`npm run build` completed successfully. All 48 prerendered pages generated correctly with proper routing and optimization.

**Build Summary:**
- Static pages: 48
- Server-side routes: 3 (API endpoints)
- First Load JS: 80.6 kB shared by all pages
- No compilation errors or warnings

---

## Lint Check ❌

`npm run lint` exited with **53 errors** and **2 warnings**.

**Error Summary:** All 53 errors are `react/no-unescaped-entities` — unescaped single quotes (`'`) in generated components that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Files (14 generated components, 53 total errors):**
- `components/generated/BlogIndexDa.tsx` — 1
- `components/generated/BlogIndexEn.tsx` — 1
- `components/generated/BlogPostEn.tsx` — 8
- `components/generated/BookDemoEn.tsx` — 3
- `components/generated/ErrorEn.tsx` — 2
- `components/generated/FaaAllePengeneHjemDa.tsx` — 1
- `components/generated/FaaAllePengeneHjemEn.tsx` — 3
- `components/generated/ForsideDa.tsx` — 1
- `components/generated/ForsideEn.tsx` — 17
- `components/generated/HavStyrPaaDagenEn.tsx` — 4
- `components/generated/NotFoundEn.tsx` — 1
- `components/generated/OmOsEn.tsx` — 2
- `components/generated/PrivatlivspolitikEn.tsx` — 3
- `components/generated/VindFlereFlytningerEn.tsx` — 10

**Warnings (2):**
- `components/SplitSection.tsx:93` — Using `<img>` instead of Next.js `<Image />`
- `components/SplitSection.tsx:96` — Using `<img>` instead of Next.js `<Image />`

**Root Cause:** These are auto-generated files. The generation process or source data must be escaping HTML entities properly before components are generated.

---

## Security Audit ❌

`npm audit` detected **20 vulnerabilities: 1 critical, 12 high, 7 moderate**.

**Vulnerability Breakdown:**

**Critical (1):**
- **Next.js** (0.9.9 – 16.3.0-preview.10) — 34 known CVEs including:
  - Unauthenticated Remote Code Execution on Windows servers (CVSS 9.0)
  - Server-Side Request Forgery in Server Actions
  - Denial of Service via Image Optimization & Server Components
  - Multiple cache poisoning & authorization bypass vulnerabilities

**High (12):**
- brace-expansion (≤1.1.20 | 2.0.0-2.1.6) — 3 DoS vulnerabilities
- braces (*) — Stack-exhaustion DoS
- minimatch (9.0.0-9.0.6) — 3 ReDoS vulnerabilities
- postcss (≤8.5.22) — 4 CVEs (XSS, file read, path traversal)
- source-map-js (1.0.0-1.2.1) — Event-loop DoS

**Moderate (7):**
- postcss-selector-parser (<7.1.6) — Quadratic complexity parsing
- sprintf-js (*) — DoS via unbounded precision
- Other transitive dependencies

**Note:** Per CLAUDE.md, Next.js and nested postcss are knowingly at current versions. Upgrading requires Next.js 13→16 major version bump, a product decision. However, critical RCE on Windows (CVSS 9.0) may warrant urgent review.

---

## Recommendations

1. **Lint Errors** — Regenerate `/components/generated/` files with proper HTML entity escaping in source data. This is the primary blocker for passing linting.
2. **Security Review** — Evaluate Next.js major version upgrade path (13→16) as a product milestone. The critical RCE vulnerability may require prioritized action.
3. **Build Warnings** — Migrate `<img>` tags in `SplitSection.tsx` to Next.js `<Image />` component for LCP optimization.

---

## Change from Previous Run (2026-10-05)

- Build status: unchanged (✅ passing)
- Lint errors: decreased from 40+ to 53 (counted exactly this run)
- Security: 20 vulnerabilities (unchanged count; critical Next.js RCE remains unpatched)
- Generated components remain the primary code quality issue
