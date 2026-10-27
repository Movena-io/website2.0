# Website Monitor Report

**Run Timestamp:** 2026-10-27T16:30:00Z  
**Overall Status:** ❌ UNHEALTHY (Build Passed, Lint Failed, Critical Security Vulnerabilities)

---

## Summary

The Movena website build completes successfully, but there are significant issues:
- **Build**: ✅ Passing (65 static pages generated)
- **Lint**: ❌ Failing (65 ESLint errors + 2 warnings, all in generated components)
- **Security**: 🔴 **CRITICAL** (9 vulnerabilities: 1 critical in Next.js, 6 high, 2 moderate)

---

## Build Status: ✅ PASSED

```
✓ Compiled successfully
✓ Generating static pages (65/65)
```

**Details:**
- All 65 routes compiled without errors
- Static page generation completed successfully
- Middleware compiled: 27.9 kB
- First Load JS: 80.6 kB (shared by all pages)

---

## Lint Status: ❌ FAILED

**Exit Code:** 1 (errors found)

### Issues Found:

**Errors (65 total):** Unescaped apostrophes in HTML entities across generated components:
- `./components/generated/BeregnerEn.tsx` - 2 errors
- `./components/generated/BlogIndexDa.tsx` - 1 error
- `./components/generated/BlogIndexEn.tsx` - 1 error
- `./components/generated/BlogPostEn.tsx` - 7 errors
- `./components/generated/BookDemoEn.tsx` - 3 errors
- `./components/generated/ErrorEn.tsx` - 2 errors
- `./components/generated/FaaAllePengeneHjemEn.tsx` - 5 errors
- `./components/generated/ForsideDa.tsx` - 1 error
- `./components/generated/ForsideEn.tsx` - 29 errors
- `./components/generated/HavStyrPaaDagenEn.tsx` - 8 errors
- `./components/generated/NotFoundEn.tsx` - 1 error
- `./components/generated/OmOsEn.tsx` - 2 errors
- `./components/generated/PrivatlivspolitikEn.tsx` - 3 errors
- `./components/generated/VindFlereFlytningerEn.tsx` - 8 errors
- `./components/generated/PrivatlivspolitikEn.tsx` - 3 errors
- `./components/generated/VindFlereFlytningerEn.tsx` - 8 errors

**Rule:** `react/no-unescaped-entities` - Apostrophes should be escaped with `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Warnings (2 total):**
- `./components/SplitSection.tsx:93:17` - Using `<img>` instead of Next.js `<Image />`
- `./components/SplitSection.tsx:96:19` - Using `<img>` instead of Next.js `<Image />`

**Note:** The ESLint errors are in generated components. These should be regenerated with proper entity escaping, or the source template should be updated.

---

## Security Audit: 🔴 CRITICAL VULNERABILITIES

**Exit Code:** 1 (vulnerabilities found)

**Summary:** 9 vulnerabilities detected
- 🔴 **1 Critical**
- 🟠 **6 High**
- 🟡 **2 Moderate**

### Critical (Must Fix)

**Package:** `next@13.5.6`
**Severity:** CRITICAL

Multiple high-impact vulnerabilities in Next.js core:
- Server-Side Request Forgery (SSRF) in Server Actions
- Denial of Service in Image Optimization
- Authorization bypass vulnerability
- Cache poisoning vulnerabilities
- Unauthenticated Remote Code Execution in Image Optimization API
- And 20+ other security issues affecting core functionality

**Status in CLAUDE.md:** Known issue - "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

---

### High Severity (6)

1. **brace-expansion** (in @typescript-eslint)
   - Quadratic-time expansion causing CPU DoS
   - Uncontrolled recursion on nested brace groups

2. **minimatch** (in @typescript-eslint)
   - ReDoS via repeated wildcards
   - Combinatorial backtracking in pattern matching

3. **postcss** (nested under next@13)
   - XSS via unescaped `</style>` in CSS output
   - Arbitrary file read via sourceMappingURL
   - Path traversal in source map auto-loading

4. **source-map-js**
   - Event-loop denial of service through indexed source-map offsets

---

### Moderate Severity (2)

1. **postcss-selector-parser** (in Tailwind)
   - Quadratic complexity in flat selector parsing allows CPU exhaustion

---

### Fix Availability

- **brace-expansion, minimatch, source-map-js**: Available via `npm audit fix`
- **postcss, next**: Require `npm audit fix --force` (breaking changes)
- **postcss-selector-parser**: Would require @tailwindcss/typography upgrade (breaking)

---

## Recommendations

### Immediate Actions

1. **Address Generated Component Lint Errors**
   - Regenerate components with proper HTML entity escaping
   - Or suppress the rule in `.eslintrc` for generated files (not recommended)
   - Update the generation source template to use proper entities

2. **Fix Image Import Warning**
   - Update `./components/SplitSection.tsx` to use Next.js `<Image />` instead of `<img>`

### Security Considerations

3. **Next.js Security Issues**
   - Document current mitigation strategy
   - Track upgrade path to Next.js 16
   - Currently a known product decision per CLAUDE.md

4. **Transitive Dependencies**
   - **brace-expansion, minimatch**: Minor impact (dev dependencies via @typescript-eslint)
   - **source-map-js**: Medium impact (build/dev tooling)
   - These are available for patching but low production risk

---

## Dependencies

- Node: v20+
- npm: 10.9.4 (note: v12.2.1 available)
- Next.js: 13.5.6
- TypeScript: 5.3.3
- Tailwind CSS: 3.4.1

---

## Next Steps

1. Regenerate or fix 48 ESLint errors in generated components
2. Update SplitSection.tsx to use Next.js Image component
3. Consider running `npm audit fix` for transitive deps (if approved)
4. Track Next.js upgrade timeline for security fixes
