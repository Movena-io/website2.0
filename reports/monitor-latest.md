# Website Monitor Report

**Run Timestamp:** 2026-10-19T19:45:00Z  
**Overall Status:** ⚠️ **WARNINGS** - Build successful, but lint errors and security vulnerabilities present

---

## Summary

The website build compiles successfully, but the codebase has linting errors and multiple security vulnerabilities that require attention.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Pass | Next.js build compiled successfully, all 61 routes generated |
| **Lint** | ❌ 74 Issues | 2 warnings, 72 errors (mostly unescaped entities in generated files) |
| **Security** | ⚠️ Critical | 20 vulnerabilities: 1 critical, 12 high, 7 moderate |

---

## Build Check ✅

**Status:** PASS  
**Details:** Next.js production build completed successfully.

- All 61 routes generated successfully
- Total First Load JS: 156 kB
- Middleware: 27.9 kB
- Server functions working correctly

No build errors detected.

---

## Lint Check ⚠️

**Status:** FAIL - 74 issues found

### Summary
- **Warnings:** 2
- **Errors:** 72

### Key Issues

**Warnings (2):**
- `SplitSection.tsx:93,96` - Missing `next/image` usage for image optimization (2 occurrences)

**Errors (72):**
- `react/no-unescaped-entities` - Unescaped apostrophes in generated component files
  - Most errors are in generated components (BeregnerEn, BlogIndexDa/En, BlogPostEn, BookDemoEn, ErrorEn, FaaAllePengeneHjemEn, ForsideDa/En, HavStyrPaaDagenEn, NotFoundEn, OmOsEn, PrivatlivspolitikEn, VindFlereFlytningerEn)
  - These files appear to be auto-generated from another source
  - Total: 72 errors across multiple files

### Recommendation
The errors in generated files (`components/generated/*`) suggest these are output from an external generator. Either:
1. Configure the generator to escape HTML entities properly
2. Add ESLint exceptions for auto-generated files
3. Fix the source that generates these files

---

## Security Audit ⚠️

**Status:** WARNINGS - 20 vulnerabilities detected

### Vulnerability Summary
- **Critical:** 1
- **High:** 12
- **Moderate:** 7

### Critical Vulnerabilities (1)

**Next.js (v13.x)** - 1 CRITICAL
- Multiple Server-Side Request Forgery (SSRF) vulnerabilities
- DoS vulnerabilities in Server Components
- Authorization bypass vulnerabilities
- Cache poisoning issues
- Image optimization vulnerabilities
- **Note:** Per CLAUDE.md, Next.js 13→16 is a major upgrade requiring product decision. This is left intentionally unpatched.

### High Severity Vulnerabilities (12)

1. **brace-expansion** - Quadratic-time expansion DoS
   - Multiple CVEs affecting nested brace groups
   - Transitive dependency via @typescript-eslint

2. **braces** - Stack exhaustion DoS via deeply nested patterns
   - Affects: tailwindcss, chokidar, fast-glob, micromatch, globby

3. **minimatch** (v9.0.0-9.0.6) - ReDoS vulnerabilities
   - Quadratic backtracking on certain patterns
   - Transitive via @typescript-eslint

4. **postcss** (v8.5.22 or earlier) - Multiple issues
   - XSS via unescaped `</style>`
   - Arbitrary file read via sourceMappingURL
   - Path traversal vulnerabilities
   - **Note:** Per CLAUDE.md, postcss in Next.js is knowingly left on current version

5. **source-map-js** - Event-loop DoS via indexed source-map offsets

### Moderate Severity Vulnerabilities (7)

1. **postcss-selector-parser** (<7.1.6) - Quadratic complexity in flat selector parsing
2. **sprintf-js** - DoS through unbounded precision specifiers
3. **js-yaml, gray-matter** chain - Multiple transitive vulnerabilities

### Fix Status
- `npm audit fix` would address some vulnerabilities
- `npm audit fix --force` required for others (involves major version upgrades)
- **Constraint:** Next.js and postcss cannot be force-upgraded per CLAUDE.md project policy

### Recommended Actions
1. Update transitive dependencies that don't require major version bumps:
   - brace-expansion, braces, minimatch (via @typescript-eslint updates)
   - source-map-js (available via `npm audit fix`)

2. For major upgrades blocked by policy:
   - Document Next.js 13 EOL risk
   - Plan migration to Next.js 16 as separate project initiative
   - Review if product can accept current vulnerability posture

---

## Next Steps

1. **Address Lint Errors:** Investigate the generated component files' source generator
2. **Security Review:** Prioritize updates to indirect dependencies (brace-expansion, source-map-js)
3. **Next.js Migration:** Plan for major version upgrade to address critical vulnerabilities
4. **Image Optimization:** Update SplitSection to use next/image for better LCP performance

---

**Report Generated:** 2026-10-19 at 19:45 UTC  
**Next Scheduled Run:** Pending schedule
