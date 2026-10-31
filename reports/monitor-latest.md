# Website Monitor Report

**Timestamp:** 2026-10-31T08:04:46+00:00  
**Overall Status:** ⚠️ Warning

---

## Summary

The website build completes successfully, but linting fails due to generated component errors and the project has 25 security vulnerabilities (1 critical, 6 high). The generated components contain unescaped HTML entities that violate ESLint rules. The critical Next.js vulnerability should be addressed through a major version upgrade (Next.js 13 to 16+), but this is a known architectural decision documented in CLAUDE.md.

---

## Build Status: ✅ Healthy

**Result:** Successful  
**Command:** `npm run build`

The Next.js 13 production build completed successfully, generating 65 static pages across English and Danish locales. All routes compiled without errors.

**Key metrics:**
- Routes compiled: 65
- Middleware size: 27.9 kB
- Largest page bundle: 42.7 kB (homepage)
- Build includes SSG, SSR, and API routes

---

## Lint Status: ❌ Failed

**Result:** 79 errors, 2 warnings  
**Command:** `npm run lint`

### Critical Issues

**79 ESLint Errors - Unescaped Entities in Generated Components**
- **Location:** `components/generated/*.tsx` (BeregnerEn, BlogIndexDa, BlogIndexEn, BlogPostEn, BookDemoEn, ErrorEn, FaaAllePengeneHjemEn, ForsideDa, ForsideEn, HavStyrPaaDagenEn, NotFoundEn, OmOsEn, PrivatlivspolitikEn, VindFlereFlytningerEn)
- **Rule:** `react/no-unescaped-entities`
- **Issue:** Unescaped single quotes (`'`) in JSX strings. These should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.
- **Impact:** Medium - Generated code that requires manual fixes or regeneration to comply with linting rules

### Warnings

**2 ESLint Warnings - Image Optimization**
- **Location:** `components/SplitSection.tsx` (lines 93, 96)
- **Rule:** `@next/next/no-img-element`
- **Issue:** Using raw `<img>` tags instead of Next.js `<Image />` component
- **Impact:** Low - Performance and bandwidth optimization recommendation

---

## Security Audit: ⚠️ 25 Vulnerabilities

**Command:** `npm audit`

### Critical (1)

**Next.js versions 0.9.9 - 16.3.0-preview.10** - Multiple CVEs

The installed version of Next.js has 30+ published security advisories including:
- Server-Side Request Forgery (SSRF) vulnerabilities
- Denial of Service (DoS) conditions
- Cache poisoning and cache key confusion
- Authorization bypass
- Information disclosure
- Remote Code Execution (RCE) on Windows
- XSS vulnerabilities
- Middleware bypass issues

**Note:** CLAUDE.md explicitly documents that Next.js 13 is intentionally kept on its current version as a known architectural decision. Upgrading to Next.js 16+ is a major version upgrade that requires product decision approval.

### High (6)

1. **minimatch** - ReDoS (Regular Expression Denial of Service) vulnerabilities
   - Multiple issues with glob pattern parsing
   - Affects: eslint and related tooling
   - Fix: Available via `npm audit fix --force` (requires eslint upgrade)

2. **brace-expansion** - DoS via quadratic-time expansion
   - Nested brace expansion causes CPU exhaustion
   - Affects: TypeScript ESLint utilities
   - Fix: Available via `npm audit fix`

3. **postcss** (in next/node_modules) - 4 XSS and information disclosure vulnerabilities
   - Path traversal in source map handling
   - Unescaped </style> tags in CSS output
   - Affects: CSS processing in Next.js
   - Fix: Available via `npm audit fix --force` (requires next upgrade)

4. **source-map-js** - Event-loop DoS via indexed source-map sections
   - Affects: Source map processing
   - Fix: Available via `npm audit fix`

### Moderate (15)

- **deepmerge** - Prototype poisoning
- **postcss-selector-parser** - Quadratic complexity in flat selector parsing
- **html-to-text** - Depends on vulnerable deepmerge
- **@react-email/render** - Depends on vulnerable html-to-text
- Various transitive dependencies with moderate-severity issues

### Low (3)

Minor dependencies with low-severity advisories

---

## Recommendations

### High Priority

1. **Address Generated Component Linting Errors**
   - The `components/generated/` folder contains auto-generated files with widespread unescaped entity errors
   - Determine if these are generated from a source that needs to be corrected
   - Consider adding eslint-disable comments if regeneration is not feasible, or fix the generation process

2. **Security Vulnerability Triage**
   - The critical Next.js vulnerabilities require architectural decision approval
   - Evaluate feasibility of upgrading Next.js 13 to 16+ as a separate initiative
   - In the interim, assess exposure to SSRF, DoS, and RCE risks in deployment environment

3. **Update source-map-js**
   - Quick fix with no breaking changes: `npm audit fix`
   - Addresses high-severity DoS vulnerability with minimal risk

### Medium Priority

4. **Fix Image Component Warnings**
   - Replace `<img>` with Next.js `<Image />` in SplitSection.tsx
   - Improves performance and optimizes bandwidth usage

5. **Stabilize ESLint/minimatch**
   - The high-severity minimatch vulnerabilities require cascading updates
   - These can only be fixed with `npm audit fix --force` which upgrades eslint to v4
   - Evaluate impact on linting workflow before forcing this upgrade

---

## Technical Details

**Node Version:** Determined by project environment  
**Dependencies:** 418 packages  
**Build Tool:** Next.js 13 App Router  
**Localization:** 2 locales (en, da)  
**Package Manager:** npm

---

## Next Steps

1. Resolve generated component linting errors (high priority)
2. Schedule Next.js major version upgrade assessment (medium-long term)
3. Apply low-risk security patches where available
4. Review and test any breaking changes before committing
