# Website Monitor Report

**Run Timestamp:** 2026-10-15 UTC  
**Overall Status:** ⚠️ **WARNING** — Build successful, lint errors present, security vulnerabilities found

---

## Summary

The website builds successfully but has **44 linting issues** (42 errors + 2 warnings) and **20 security vulnerabilities** (1 critical, 12 high, 7 moderate). Lint errors are in auto-generated components. Security vulnerabilities in Next.js and dependencies are acknowledged as requiring major version upgrades per project guidance.

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

**Status:** FAILED (42 errors + 2 warnings)

### Error Summary
- **42 React ESLint errors:** Unescaped entities (`'`) in generated components
  - Files: BeregnerEn.tsx, BlogIndexDa.tsx, BlogIndexEn.tsx, BlogPostEn.tsx, BookDemoEn.tsx, ErrorEn.tsx, FaaAllePengeneHjemEn.tsx, ForsideDa.tsx, ForsideEn.tsx, HavStyrPaaDagenEn.tsx, NotFoundEn.tsx, OmOsEn.tsx, PrivatlivspolitikEn.tsx, VindFlereFlytningerEn.tsx
  - Issue: react/no-unescaped-entities — single quotes must be escaped as `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`
  - These are auto-generated components (in `/components/generated/`) not manually maintained
  
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

- **npm install:** 417 packages, 20 vulnerabilities reported
- **npm run build:** ✓ Success — 61 static pages generated
- **npm run lint:** ✗ Failed — 42 errors (in generated files), 2 warnings
- **npm audit:** 20 vulnerabilities (1 critical, 12 high, 7 moderate)

**Trend:** Status stable vs. prior run (2026-10-14). No new vulnerabilities introduced.
