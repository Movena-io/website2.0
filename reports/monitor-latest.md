# Website Monitor Report

**Run timestamp**: 2026-10-03T00:00:00Z

**Overall Status**: ⚠️ **WARNING** - Build successful but linting errors and critical security vulnerabilities present

---

## Summary

The Movena website project has completed its health checks with the following results:

- ✅ **Build**: PASSED - Next.js build compiled successfully
- ❌ **Lint**: FAILED - 58 linting errors found
- ⚠️ **Security**: CRITICAL - 13 vulnerabilities (12 high severity, 1 critical)

---

## Detailed Findings

### 1. Build Check ✅ PASSED

**Command**: `npm run build`

**Result**: Success

The Next.js application compiled without errors. The build generated 61 static pages with the following metrics:

- First Load JS shared: 80.6 kB
- Middleware size: 27.8 kB
- Build completed successfully with no warnings
- Pages generated for both English and Danish locales

### 2. Lint Check ❌ FAILED - 58 Errors

**Command**: `npm run lint`

**Exit Code**: 1

**Issues Found**:

#### Unescaped Entities (57 errors)
Multiple generated component files contain unescaped single quotes (`'`) that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` for proper HTML rendering.

**Affected files**:
- `./components/generated/BlogIndexDa.tsx` (1 error)
- `./components/generated/BlogIndexEn.tsx` (1 error)
- `./components/generated/BlogPostEn.tsx` (7 errors)
- `./components/generated/BookDemoEn.tsx` (3 errors)
- `./components/generated/ErrorEn.tsx` (2 errors)
- `./components/generated/FaaAllePengeneHjemDa.tsx` (1 error)
- `./components/generated/FaaAllePengeneHjemEn.tsx` (3 errors)
- `./components/generated/ForsideDa.tsx` (1 error)
- `./components/generated/ForsideEn.tsx` (27 errors)
- `./components/generated/HavStyrPaaDagenEn.tsx` (4 errors)
- `./components/generated/NotFoundEn.tsx` (1 error)
- `./components/generated/OmOsEn.tsx` (2 errors)
- `./components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `./components/generated/VindFlereFlytningerEn.tsx` (10 errors)

**Note**: These appear to be generated components. The source generation tool should be updated to properly escape HTML entities.

#### Image Optimization Warnings (2 warnings)
- `./components/SplitSection.tsx` (lines 93, 96)
  - Warning: Using `<img>` could result in slower LCP and higher bandwidth
  - Recommendation: Use `<Image />` from `next/image` for automatic optimization

**Impact**: Build succeeds with warnings, but production deployments should address these linting errors to maintain code quality standards.

### 3. Security Audit ❌ CRITICAL - 13 Vulnerabilities

**Command**: `npm audit`

**Exit Code**: 1

#### Critical Vulnerabilities (1)

**Next.js** (v13.5.11)
- Severity: CRITICAL
- Multiple critical security vulnerabilities including:
  - Server-Side Request Forgery (SSRF) in Server Actions
  - Denial of Service in image optimization
  - Information exposure in dev server
  - Authorization bypass vulnerability
  - Middleware redirect SSRF
  - Content injection in image optimization
  - Race condition to cache poisoning
  - DoS with Server Components
  - HTTP request smuggling in rewrites
  - Cross-site scripting vulnerabilities
  - Cache poisoning vulnerabilities
  - Unbounded disk cache growth

**Current Version**: 13.5.11
**Available Fix**: Requires upgrade to v16.3.8+ (breaking change)

**Note from CLAUDE.md**: *"Next.js and its nested PostCSS are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."*

**Action Required**: This is a known constraint. A major version upgrade decision needs to be made by the product team.

#### High Severity Vulnerabilities (12)

1. **brace-expansion** - Quadratic-time expansion and DoS via uncontrolled recursion
   - Paths: `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`
   - Fix available via `npm audit fix`

2. **braces** - Stack-exhaustion denial of service through deeply nested patterns
   - Depends on: `chokidar`, `micromatch`, `fast-glob`, `globby`
   - Fix: Requires `npm audit fix --force` (breaking change: tailwindcss@4.3.3)

3. **minimatch** - ReDoS (Regular Expression Denial of Service)
   - Multiple ReDoS patterns identified
   - Fix available via `npm audit fix`

4. **PostCSS** (≤8.5.22) - Multiple vulnerabilities:
   - XSS via unescaped `</style>` in CSS stringify output
   - Arbitrary file read via attacker-controlled sourceMappingURL
   - Path traversal in source map auto-loading
   - Fix: Requires `npm audit fix --force` (breaking change: next@16.3.8)

**Dependency Chain Analysis**:
```
braces → chokidar → tailwindcss → @tailwindcss/typography
         micromatch → fast-glob → globby → @typescript-eslint/typescript-estree
                                            → @typescript-eslint/parser
```

---

## Recommendations

### 🚨 Critical Issues

1. **Next.js Major Version Upgrade**: The current v13.5.11 has critical security vulnerabilities. A product decision is needed to upgrade to Next 13 → 16, which would modernize the entire dependency tree.

2. **Generated Component Linting**: The generated components in `./components/generated/` contain 57 unescaped entity errors. Update the code generation tool to properly escape HTML entities.

### ⚠️ Important Issues

1. **Image Optimization**: Update `SplitSection.tsx` to use Next.js `<Image />` component instead of `<img>` for better performance and LCP metrics.

2. **Dependency Updates**: Once product decision is made on Next.js upgrade:
   - Consider `npm audit fix --force` after upgrading
   - This will resolve most high-severity dependency vulnerabilities

### ✅ What's Working Well

- Build process completes successfully
- All 61 pages generate correctly for both locales
- Bundle sizes are reasonable (80.6 kB shared JS)
- No build-time type errors

---

## Next Steps

1. **Urgent**: Establish product timeline for Next.js v13 → v16 migration
2. **High**: Fix ESLint errors in generated components (update generation tool)
3. **Medium**: Optimize images in SplitSection component
4. **Post-upgrade**: Run `npm audit fix` after Next.js upgrade

---

**Monitor Version**: 1.0  
**Repository**: movena-io/website2.0  
**Last Run**: 2026-10-03  
**Next Scheduled Run**: As configured
