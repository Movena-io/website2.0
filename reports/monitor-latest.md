# Website Monitor Report

**Run Date:** 2026-10-28 12:07:11 UTC  
**Status:** ⚠️ **WARNING** - Build successful but linting errors and critical vulnerabilities found

---

## Summary

The website build completed successfully, but there are significant linting errors in generated components and critical security vulnerabilities that require attention.

---

## Check Results

### 1. Dependencies Installation ✅
- **Status:** PASS
- **Details:** Dependencies installed successfully (417 packages added)

### 2. Build Check ✅
- **Status:** PASS
- **Output:** 
  - Created optimized production build
  - Generated 65 static pages successfully
  - Total First Load JS: 156 kB (shared: 80.6 kB)
  - All routes compiled without errors

### 3. Linting Check ⚠️
- **Status:** FAIL - 77 ESLint errors found
- **Error Summary:**
  - **77 errors** in generated components (unescaped entities):
    - Multiple files have unescaped apostrophes that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`
    - Affected files: `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `ErrorEn.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx`
  - **2 warnings** about using `<img>` instead of `next/image`
    - Files: `SplitSection.tsx` (lines 93, 96)

### 4. Security Audit ❌
- **Status:** FAIL - 12 vulnerabilities detected
- **Breakdown:** 3 low, 2 moderate, 6 high, **1 critical**

#### Critical Vulnerabilities (1)
- **Next.js (0.9.9 - 16.3.0-preview.10)**: Multiple critical advisories
  - Server-Side Request Forgery in Server Actions
  - Denial of Service in image optimization
  - Authorization bypass vulnerabilities
  - Information exposure in dev server
  - And 29 more known vulnerabilities
  - **Fix:** `npm audit fix --force` (requires breaking change: Next.js upgrade to 16.4.3+)

#### High Severity (6)
- **brace-expansion**: Quadratic-time expansion DoS, uncontrolled recursion attacks
  - Affected: `@typescript-eslint/typescript-estree`
- **minimatch**: ReDoS via repeated wildcards, combinatorial backtracking
  - Affected: `@typescript-eslint/typescript-estree`
- **postcss**: XSS via unescaped `</style>`, arbitrary file read via sourceMappingURL
  - Fix available via `npm audit fix` or `npm audit fix --force`
- **source-map-js**: Event-loop denial of service via source-map offset handling

#### Moderate (2)
- **deepmerge**: Prototype poisoning vulnerability
  - Depends on: `html-to-text` → `@react-email/render`
- **postcss-selector-parser**: Quadratic complexity in flat selector parsing

---

## Recommended Actions

### Priority 1 (Critical)
1. **Update Next.js** - Current version has 30+ known vulnerabilities
   - Requires major version upgrade from 13 to 16+
   - Breaking changes may require code updates
   - **Note:** CLAUDE.md states this is a product decision, not a monitor action

### Priority 2 (High)
1. Fix linting errors in generated components - 77 unescaped entities
   - These are in `components/generated/` - likely auto-generated files
   - Consider whether generation source should escape these properly
2. Address high-severity vulnerabilities in dependencies
   - Can run `npm audit fix` for `brace-expansion`, `minimatch`, `postcss`, `source-map-js`

### Priority 3 (Medium)
1. Replace `<img>` with `next/image` in `SplitSection.tsx` for better LCP
2. Consider patching `deepmerge` and `postcss-selector-parser` moderate vulnerabilities

---

## Files Status
- Build output: ✅ All 65 routes generated
- Next.js version: 13.5.x (Outdated, 30+ known vulnerabilities)
- Dependencies: 418 packages audited, 12 with known vulnerabilities

---

**Next Run:** Scheduled for 2026-10-29 12:02:00 UTC
