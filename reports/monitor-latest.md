# Website Monitor Report

**Run Time**: 2026-10-24 04:21 UTC  
**Overall Status**: ⚠️ **DEGRADED** (Build passes, but lint and security issues require attention)

---

## Summary

The Movena website builds successfully with all 61 pages generated. However, linting checks fail with 50+ errors in generated components, and 11 security vulnerabilities are present in dependencies.

---

## Build Check: ✅ PASS

```
✓ Compiled successfully
✓ Generating static pages (61/61)
✓ Finalizing page optimization
```

**Details**:
- Production build completed without compilation errors
- All 61 routes generated as static pages and server routes
- Build size: First Load JS 156 kB (homepage) with shared chunks 80.6 kB
- Middleware: 27.9 kB

---

## Lint Check: ❌ FAIL (50+ errors)

**Exit Code**: 1  
**Error Count**: 50+ errors, 2 warnings

### Critical Errors
Unescaped apostrophes in JSX across multiple generated components:
- `./components/generated/BeregnerEn.tsx`: 2 errors
- `./components/generated/BlogIndexDa.tsx`: 1 error
- `./components/generated/BlogIndexEn.tsx`: 1 error
- `./components/generated/BlogPostEn.tsx`: 7 errors
- `./components/generated/BookDemoEn.tsx`: 3 errors
- `./components/generated/ErrorEn.tsx`: 2 errors
- `./components/generated/FaaAllePengeneHjemEn.tsx`: 5 errors
- `./components/generated/ForsideDa.tsx`: 1 error
- `./components/generated/ForsideEn.tsx`: 18 errors
- `./components/generated/HavStyrPaaDagenEn.tsx`: 8 errors
- `./components/generated/NotFoundEn.tsx`: 1 error
- `./components/generated/OmOsEn.tsx`: 2 errors
- `./components/generated/PrivatlivspolitikEn.tsx`: 3 errors
- `./components/generated/VindFlereFlytningerEn.tsx`: 8 errors

**Rule Violated**: `react/no-unescaped-entities` — Apostrophes should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

### Warnings
- `./components/SplitSection.tsx:93,96` — Using `<img>` instead of `next/image` (2 warnings)

**Note**: Generated component files are auto-generated and contain unescaped entities in content strings. These are likely generated from markdown or data sources.

---

## Security Audit: ❌ FAIL (11 vulnerabilities)

**Exit Code**: 1  
**Vulnerability Count**: 11 (1 critical, 6 high, 4 moderate)

### Critical Severity (1)
**next 0.9.9 - 16.3.0-preview.10**  
35 CVEs including:
- Server-Side Request Forgery in Server Actions
- Denial of Service conditions in Image Optimization
- Authorization bypass vulnerability
- Middleware redirect handling SSRF
- Content injection in Image Optimization
- Cache poisoning vulnerabilities
- Server Components DoS vulnerabilities
- Disk cache exhaustion (unbounded growth)
- HTTP request smuggling in rewrites
- Cross-site scripting vulnerabilities
- Remote code execution on Windows

**Status per CLAUDE.md**: This is a known issue. Fixing requires Next 13 → 16+ major version upgrade, which is a product decision, not a monitor action. Keep Next.js on current version.

### High Severity (6)
1. **brace-expansion** (transitive)
   - Quadratic-time expansion DoS
   - Nested brace group recursion DoS
   - Fix: Available via `npm audit fix`

2. **minimatch** (transitive via @typescript-eslint/typescript-estree)
   - ReDoS via repeated wildcards
   - ReDoS via GLOBSTAR segments
   - ReDoS via nested extglobs

3. **postcss** (nested under next)
   - XSS via unescaped `</style>` in CSS output
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source map auto-loading
   - Note: Requires next upgrade to fix

4. **source-map-js** (transitive)
   - Event-loop DoS via indexed source-map offsets
   - Fix: Available via `npm audit fix`

### Moderate Severity (4)
1. **postcss-selector-parser**
   - Quadratic complexity in flat selector parsing (CPU exhaustion)
   - Requires transitive dependency updates

---

## Recommendations

### 🔴 Critical Action
**Evaluate next.js upgrade path**: 35 CVEs in Next.js require evaluation. Per project instructions, upgrading from Next 13 to 16+ is a product decision requiring stakeholder input. Schedule a technical review.

### 🟡 Medium Priority
1. **Fix generated component lint errors**: 50+ errors in auto-generated files need correction at the source (likely markdown/content generation scripts)
2. **Address high-severity transitive vulnerabilities**: `brace-expansion` and `source-map-js` have fixes available via `npm audit fix`

### 🟢 Low Priority
1. **Replace `<img>` with `next/image`**: Update SplitSection.tsx to use Next.js Image component
2. **Consider major dependency updates**: When next.js strategy is decided, review postcss and typescript-eslint updates

---

## Next Steps

1. ✅ BUILD: Continues to work — no action required
2. 🔧 LINT: Investigate generated component generation process; fix source if possible
3. 🛡️ SECURITY: Schedule product team discussion on next.js upgrade timeline
