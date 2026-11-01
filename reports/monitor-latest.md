# Website Monitor Report

**Run Timestamp:** 2026-11-01 08:03:48 UTC  
**Overall Status:** ⚠️ **WARNING** — Build successful, but lint errors and critical security vulnerabilities found

---

## Summary

The Movena website build compiles successfully, but the project has significant code quality and security concerns that need attention. Generated components have widespread linting violations, and Next.js itself has critical security vulnerabilities.

---

## Build Status: ✅ **PASSED**

Build completed successfully without errors. All 65 static pages generated correctly with:
- Build size: 156 KB for main chunk
- Middleware: 27.9 KB
- All routes compiled successfully (both locale variants: `en` and `da`)

```
✓ Compiled successfully
✓ Generating static pages (65/65)
✓ Route validity verified
```

---

## Lint Status: ❌ **FAILED** (67 Errors + 2 Warnings)

Linting revealed errors in generated component files that prevent CI/CD:

### Errors (67 total)
- **Main Issue**: Unescaped single quotes (`'`) in JSX content across generated components
  - Affected files: `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `ErrorEn.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx` (14 files)
  - Violations should use HTML entities: `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
  
### Warnings (2 total)
- **File**: `SplitSection.tsx` (lines 93, 96)
- **Issue**: Using `<img>` instead of Next.js `<Image>` for image optimization
- **Recommendation**: Consider migrating to `next/image` for better LCP and bandwidth optimization

---

## Security Audit: 🔴 **CRITICAL VULNERABILITIES FOUND**

**Total vulnerabilities: 25** (3 low, 15 moderate, 6 high, 1 critical)

### Critical Issues (Requires Immediate Attention)

**Next.js (0.9.9 - 16.3.0-preview.10)**
- Severity: **CRITICAL**
- Multiple severe CVEs affecting:
  - Server-Side Request Forgery (SSRF) in Server Actions and rewrites
  - Remote Code Execution (RCE) on Windows-hosted servers
  - Denial of Service (DoS) in Image Optimization and Server Components
  - Authorization bypass vulnerabilities
  - Cache poisoning and content injection attacks
  - Information disclosure vulnerabilities

### High Severity Issues

1. **PostCSS (≤8.5.22)**
   - XSS via unescaped `</style>` in CSS output
   - Path traversal via sourceMappingURL
   - Arbitrary .map file disclosure

2. **brace-expansion (≤1.1.20 || 2.0.0-2.1.6)**
   - DoS: Quadratic-time expansion and stack exhaustion

3. **minimatch (≤11.0.0)**
   - ReDoS via repeated wildcards
   - Multiple DoS attack vectors

4. **source-map-js (1.0.0 - 1.2.1)**
   - Event-loop DoS through malformed source maps

### Moderate Issues
- **deepmerge**: Prototype poisoning
- **postcss-selector-parser**: Quadratic complexity in parsing

---

## Recommendations

### Priority 1: Security (Critical)
- ⚠️ **Next.js requires major upgrade** (current: ~13.x, advisories cover up to 16.3)
  - This is noted in `CLAUDE.md` as a product decision (Next 13→16 is major upgrade)
  - Document timeline for upgrade or create security exception
  - Do NOT run `npm audit fix --force` — it would break the project

### Priority 2: Linting (High)
- Fix unescaped quotes in generated component files
  - These files are likely auto-generated; review generation source
  - Consider updating the generator to output HTML-entity-escaped quotes
  - Alternative: Disable rule in generated file headers if these are untouched imports

### Priority 3: Code Quality (Medium)
- Migrate `<img>` tags in `SplitSection.tsx` to Next.js `<Image>` component
- Address deprecated ESLint warnings (ESLint 8.x is no longer supported)

---

## Action Items

1. **Investigate generated components**: Are `components/generated/*.tsx` files auto-generated? If so, fix the generator.
2. **Next.js upgrade timeline**: Per CLAUDE.md, Next 13→16 requires product decision. Establish upgrade path.
3. **Lint gate**: Add pre-commit hook to prevent generated files with lint errors from being committed.

---

## Dependencies Status

- Installed: 417 packages (418 total)
- Audit: `npm audit fix` (non-breaking) available; `npm audit fix --force` would break project
- Build: Ready for deployment (despite lint errors, build succeeds)
