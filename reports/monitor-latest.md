# Website Monitor Report

**Run Timestamp:** 2026-10-14 19:55 UTC  
**Overall Status:** ⚠️ **WARNING** — Build successful, lint errors present, security vulnerabilities found

---

## Summary

The website builds successfully but has **71 linting errors** and **20 security vulnerabilities** (1 critical, 12 high, 7 moderate). Most lint errors are in generated components and are pre-existing. Security vulnerabilities in Next.js and dependencies are acknowledged as requiring major version upgrades per project guidance.

---

## Build Check ✅

**Status:** PASSED

```
Build completed successfully
Next.js compiled all routes without errors
```

**Output:** All pages compiled, including:
- Homepage and localized routes (`/en`, `/da`)
- Blog pages and calculator
- API routes (calculator/submit, contact, demo)
- Middleware compiled (27.9 kB)

---

## Lint Check ❌

**Status:** FAILED (71 errors, 2 warnings)

### Error Summary
- **71 React errors:** Unescaped entities (`'`) in generated components
  - Primary files affected: `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogPostEn.tsx`, `ForsideEn.tsx`, and others
  - These are generated components (in `/components/generated/`) not manually maintained
  
### Warning Summary
- **2 warnings:** Use of `<img>` tag in `SplitSection.tsx` (lines 93, 96)
  - Recommendation: Consider `next/image` for optimization

### Context
The lint errors in generated components are expected and reflect the source material conversion process. These files are auto-generated and would require fixing at the source.

---

## Security Audit ⚠️

**Status:** 20 vulnerabilities found (1 critical, 12 high, 7 moderate)

### Critical Vulnerabilities
- **Next.js (next@13)** — 31 CVEs including:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Denial of Service in image optimization
  - Information exposure in dev server
  - Authorization bypass
  - Remote Code Execution (Windows hosts with AVIF)
  - Multiple cache poisoning & injection vectors

### High-Severity Vulnerabilities
- **brace-expansion** — Quadratic-time expansion causing CPU DoS (3 CVEs)
- **braces** — Stack-exhaustion DoS via nested patterns
- **minimatch** — ReDoS vulnerabilities (3 CVEs)
- **postcss** — XSS via unescaped `</style>` in CSS output

### Transitive Dependencies
Vulnerabilities propagate through:
- `tailwindcss` → `chokidar`, `fast-glob`, `postcss-nested`
- `@tailwindcss/typography` → `postcss-selector-parser`, `tailwindcss`
- TypeScript ESLint toolchain → glob utilities

### Remediation Notes
Per project CLAUDE.md:
- **Next.js & postcss** are knowingly on current versions; fixing requires Next 13→16+ major upgrade (product decision, not monitor action)
- Do NOT run `npm audit fix --force` (would upgrade Next.js)
- Transitive dependencies (brace-expansion, minimatch) can be patched via npm `overrides` in package.json without breaking changes

---

## Recommendations

| Priority | Action | Justification |
|----------|--------|---------------|
| Low | Fix img warnings | Use `next/image` in SplitSection.tsx for performance |
| Low | Resolve lint errors in generated files | Fix at content source, regenerate components |
| Medium | Patch high-severity transitive deps | Add npm overrides for brace-expansion, minimatch |
| Product Decision | Next.js major version upgrade | Required to resolve 31 critical/high CVEs; requires assessment |

---

## Check Details

- **npm install:** 417 packages added, 1 deprecated warning (inflight, glob)
- **npm run build:** Success
- **npm run lint:** 1 exit code (linting errors found)
- **npm audit:** 20 vulnerabilities, 0 immediate fixes without breaking changes
