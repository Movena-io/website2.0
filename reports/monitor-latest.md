# Website Monitor Report

**Run Timestamp**: 2026-10-20T15:19:00Z  
**Overall Status**: ⚠️ Partial Failure

---

## Summary

The website build succeeds and all 61 routes compile properly. However, critical security vulnerabilities exist in dependencies, and generated components have lint errors related to unescaped entities.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Pass | Next.js build compiled successfully, all 61 routes generated |
| **Lint** | ⚠️ Warnings | 2 warnings (img tags), 88+ errors (unescaped quotes in generated files) |
| **Security** | ❌ Critical | 20 vulnerabilities: 1 critical, 12 high, 7 moderate |

---

## Build Check ✅ Healthy

**Status**: Successful  
**Command**: `npm run build`

The Next.js application compiled successfully without errors.

**Key Metrics**:
- Routes compiled: 61 static pages generated
- Middleware: 27.9 kB
- First Load JS shared: 80.6 kB
- Largest page bundle: 42.7 kB (homepage)

**Localized routes**:
- English (/en): 30+ pages
- Danish (/da): 30+ pages
- Dynamic blog posts, calculators, contact forms all working

---

## Lint Check ⚠️ Warnings

**Status**: Warnings and Errors Found  
**Command**: `npm run lint`  
**Exit Code**: 1

### Issues Summary
- **Warnings**: 2
- **Errors**: 88+ (in generated components)

### Warnings (2)
- `components/SplitSection.tsx:93` - Using `<img>` instead of Next.js `<Image />`
- `components/SplitSection.tsx:96` - Using `<img>` instead of Next.js `<Image />`

**Impact**: Performance (slower LCP, higher bandwidth)  
**Fix**: Replace `<img>` with `<Image />` from `next/image`

### Errors (88+ unescaped entities)
**Rule**: `react/no-unescaped-entities` - Single quotes must be escaped

**Affected generated components**:
- BeregnerEn.tsx (2 errors)
- BlogIndexDa.tsx (1 error)
- BlogIndexEn.tsx (1 error)
- BlogPostEn.tsx (7 errors)
- BookDemoEn.tsx (3 errors)
- ErrorEn.tsx (2 errors)
- FaaAllePengeneHjemEn.tsx (5 errors)
- ForsideDa.tsx (1 error)
- ForsideEn.tsx (18 errors)
- HavStyrPaaDagenEn.tsx (9 errors)
- NotFoundEn.tsx (1 error)
- OmOsEn.tsx (2 errors)
- PrivatlivspolitikEn.tsx (3 errors)
- VindFlereFlytningerEn.tsx (8 errors)

**Note**: These files are auto-generated. The issue is that unescaped single quotes (`'`) should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`. The generation tool needs to output properly escaped entities or the linter should be configured to ignore generated files.

---

## Security Check ❌ Critical

**Status**: Failed  
**Command**: `npm audit`  
**Exit Code**: 1

**Summary**: 20 vulnerabilities (1 critical, 12 high, 7 moderate)

### Critical Vulnerability (1)

**Next.js** `13.x` (versions 0.9.9 - 16.3.0-preview.10)

Current installation: Next.js 13.x

**Key Security Issues**:
- Server-Side Request Forgery (SSRF) in Server Actions
- Unauthenticated Remote Code Execution (RCE) on Windows-hosted servers
- Unauthenticated RCE in Image Optimization API with AVIF files
- Denial of Service (DoS) in Image Optimization and Server Components
- Cache poisoning (response bodies, image optimization, React Server Components)
- Authorization bypass vulnerabilities
- Cross-site scripting (XSS) in CSP nonces and beforeInteractive scripts
- HTTP request smuggling in rewrites
- Middleware/Proxy bypass in i18n configurations
- Information exposure in dev server due to missing origin verification

**Fix Path**: Upgrade to Next.js 16.4.2 (major breaking change)  
**Per CLAUDE.md**: This is a product decision, not a routine maintenance action. Do NOT run `npm audit fix --force` automatically.

### High Severity (12)

1. **brace-expansion** — CPU DoS via quadratic-time expansion  
   - Fix: `npm audit fix`

2. **braces** — Stack-exhaustion DoS via nested brace patterns  
   - Fix: `npm audit fix --force` (requires Tailwind CSS upgrade)

3. **minimatch** — ReDoS via repeated wildcards and glob patterns  
   - Fix: `npm audit fix`

4. **postcss** ≤8.5.22 — Multiple vulnerabilities:
   - XSS via unescaped `</style>` in CSS stringify
   - Arbitrary file read via sourceMappingURL in CSS comments
   - Path traversal in source map auto-loading
   - Fix: `npm audit fix --force` (requires Next.js upgrade)

5. **source-map-js** — Event-loop DoS via indexed source-map offsets  
   - Fix: `npm audit fix`

### Moderate Severity (7)

1. **postcss-selector-parser** — Quadratic complexity DoS in flat selector parsing
2. **sprintf-js** — DoS via unbounded precision specifiers

---

## Assessment & Recommendations

### Immediate (High Priority)

1. **Build Success** - No action needed, build process works correctly
2. **Lint Warnings (SplitSection.tsx)** - Fix 2 img tags → Image component (quick win)
3. **Generated Component Errors** - Regenerate with escaped quotes or add to linter ignore

### Medium Priority

1. **Security Patching**:
   - Some high-severity vulnerabilities can be fixed with `npm audit fix`
   - Document critical Next.js vulnerabilities and timeline for v13→v16 migration
   - Consider security hotfix strategy for current version line

2. **Dependency Management**:
   - Use `package.json` `overrides` field to patch transitive dependencies
   - Follow existing pattern (js-yaml@3, nanoid@3 already pinned)

### Low Priority

1. **Major Upgrades**:
   - Next.js 13 → 16 is major breaking change (product decision required)
   - Plan Tailwind CSS 3 → 4 upgrade if taken
   - Consider deprecation status of ESLint 8

---

**Generated by website-monitor**
