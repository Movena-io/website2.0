# Website Monitor Report

**Run Timestamp:** 2026-10-23 17:04:47 UTC  
**Overall Status:** ⚠️ **WARNING** — Build passed, linting failed, security vulnerabilities present

---

## Summary

The website build completed successfully with all 61 static pages generated. However, linting failed due to unescaped entity errors in generated components, and npm audit detected 11 security vulnerabilities (1 critical, 6 high, 4 moderate).

---

## Build Check: ✅ PASSED

**Status:** Successful  
**Exit Code:** 0

All 61 static pages compiled without errors:

```
✓ Compiled successfully
✓ Generating static pages (61/61)
✓ First Load JS shared: 80.6 kB
✓ Middleware: 27.9 kB
```

**Routes Generated:**
- Localized homepage (en/da)
- Blog system (21+ posts)
- Product pages (calculator, run-the-day, win-more-moves, get-paid, etc.)
- Info pages (about, privacy, contact)
- API routes (calculator, contact, demo)
- Sitemap and robots.txt

---

## Lint Check: ❌ FAILED

**Status:** Failed  
**Exit Code:** 1  
**Error Count:** 56+ unescaped entity errors

### Issues:

**Primary:** Unescaped apostrophes in generated React components (`react/no-unescaped-entities` rule)

**Affected Files (12 generated components):**
- `ForsideEn.tsx` - 24 errors
- `HavStyrPaaDagenEn.tsx` - 8 errors
- `VindFlereFlytningerEn.tsx` - 8 errors
- `BeregnerEn.tsx`, `BlogPostEn.tsx`, `FaaAllePengeneHjemEn.tsx`, and 6 others with 1-7 errors each

**Root Cause:** Component generator outputs unescaped `'` characters. These files are auto-generated and need the source generation process configured to escape entities.

**Secondary:** 2 warnings in `SplitSection.tsx` about using `<img>` instead of Next.js `<Image />` (performance optimization)

---

## Security Audit: ⚠️ VULNERABILITIES DETECTED

**Status:** Failed  
**Exit Code:** 1  
**Total Vulnerabilities:** 11 (4 moderate, 6 high, 1 critical)

### CRITICAL (1):

**Next.js (v13)** - Multiple critical RCE and SSRF vulnerabilities:
- Remote Code Execution on Windows-hosted servers
- Unauthenticated RCE in Image Optimization API (AVIF/SVG files)
- Server-Side Request Forgery in Server Actions
- Cache poisoning via multiple mechanisms
- Denial of Service via Server Components
- XSS via CSP nonces
- HTTP request smuggling in rewrites
- And 27+ additional high/critical security issues

**Context:** Per CLAUDE.md, Next.js 13→16 is a major upgrade requiring product decision. Not recommended to auto-fix.

### HIGH SEVERITY (6):

1. **brace-expansion** - DoS via quadratic-time expansion and stack exhaustion (2 advisories)
2. **minimatch** - ReDoS via wildcards, GLOBSTAR backtracking, nested extglobs (3 advisories)
3. **postcss** - XSS in CSS stringify, arbitrary file read via sourceMappingURL, path traversal in source maps (4 advisories)
4. **source-map-js** - Event-loop DoS via source-map offsets

### MODERATE (4):

- `postcss-selector-parser` - Quadratic complexity CPU exhaustion in flat selector parsing
- Inherited through `@tailwindcss/typography`, `tailwindcss`, `postcss-nested`

### Dependency Tree:

```
next@13 (CRITICAL: 31+ advisories)
├── postcss (HIGH: 4 advisories - XSS, file read, path traversal)
├── typescript-eslint (HIGH: DoS via transitive minimatch/globby)
└── Various CSS tools with accumulated vulns

npm packages installed: 417
Vulnerabilities: 11 total (cannot fix without major breaking changes)
```

---

## Recommendations

| Priority | Item | Action |
|----------|------|--------|
| 🔴 **CRITICAL** | Generated component linting | Investigate generation source; enable entity escaping; regenerate |
| 🟠 **HIGH** | Next.js security | Documented constraint (CLAUDE.md); requires product decision to upgrade 13→16 |
| 🟡 **MEDIUM** | Image optimization | Update 2 `<img>` tags in SplitSection.tsx to `<Image />` components |

---

## Overall Health

| Metric | Status | Notes |
|--------|--------|-------|
| **Build Compilation** | ✅ | 61 routes, no errors |
| **Type Checking** | ✅ | Passed |
| **Code Quality (Lint)** | ❌ | 56+ errors in generated code |
| **Security** | ⚠️ | 11 vulnerabilities (1 critical - Next.js version constrained) |
| **Deployability** | ✅ | Production build successful |

**Assessment:** Website is buildable and deployable. Linting failures are in auto-generated components requiring source regeneration. Security vulnerabilities are version-level constraints acknowledged in project documentation.
