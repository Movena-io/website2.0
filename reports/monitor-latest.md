# Website Monitor Report

**Run Timestamp**: 2026-09-06T02:02:00Z  
**Overall Status**: ⚠️ **Warning** - Build and lint pass, but critical security vulnerabilities detected

---

## Build Check
✅ **PASSED**
- Next.js application compiled successfully
- 41 static pages generated
- No build errors
- Production-optimized build completed

---

## Lint Check
⚠️ **WARNINGS FOUND** (3 warnings, 0 errors)

1. **File**: `./components/MetaPixel.tsx:54:9`
   - **Issue**: Using `<img>` could result in slower LCP and higher bandwidth
   - **Recommendation**: Consider using `<Image />` from `next/image`

2. **File**: `./components/SplitSection.tsx:93:17`
   - **Issue**: Using `<img>` could result in slower LCP and higher bandwidth
   - **Recommendation**: Consider using `<Image />` from `next/image`

3. **File**: `./components/SplitSection.tsx:96:19`
   - **Issue**: Using `<img>` could result in slower LCP and higher bandwidth
   - **Recommendation**: Consider using `<Image />` from `next/image`

---

## Security Audit
❌ **CRITICAL** - 7 High Severity Vulnerabilities Detected

### High Severity Issues:

1. **js-yaml** (vulnerable versions: 3.0.0-3.15.0, 4.0.0-4.3.0)
   - CVE: GHSA-5p4m-2wfm-xmqj
   - Issue: Quadratic CPU consumption in !!omap resolution
   - Affected: `node_modules/gray-matter/node_modules/js-yaml`, `node_modules/js-yaml`
   - **Fix available**: `npm audit fix`

2. **minimatch** (vulnerable versions: 9.0.0-9.0.6)
   - Multiple ReDoS (Regular Expression Denial of Service) vulnerabilities:
     - GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards
     - GHSA-7r86-cg39-jmmj: ReDoS from GLOBSTAR segments
     - GHSA-23c5-xmqv-rm74: ReDoS from nested extglobs
   - Affected: `@typescript-eslint/typescript-estree` → `@typescript-eslint/parser`
   - **Fix available**: `npm audit fix`

3. **nanoid** (vulnerable versions: <3.3.18)
   - CVE: GHSA-2v37-7h3g-55p8
   - Issue: Custom generators can loop indefinitely when size is zero
   - **Fix available**: `npm audit fix`

4. **Next.js** (vulnerable versions: 0.9.9-16.3.0-preview.10)
   - **CRITICAL**: 29 distinct security advisories including:
     - Server-Side Request Forgery (SSRF) in Server Actions
     - Denial of Service in image optimization
     - Information exposure in dev server
     - Authorization bypass vulnerability
     - HTTP request smuggling in rewrites
     - Cross-site scripting (XSS) vulnerabilities
     - Unauthenticated disclosure of internal Server Function endpoints
   - Depends on vulnerable PostCSS
   - **Fix available**: `npm audit fix --force` (breaking change to next@16.3.4)

5. **PostCSS** (vulnerable versions: <=8.5.22)
   - Multiple XSS and path traversal vulnerabilities:
     - GHSA-qx2v-qp2m-jg93: XSS via unescaped `</style>`
     - GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL
     - GHSA-fxqj-rqcc-2cmp: Incomplete fix of path traversal
     - GHSA-r28c-9q8g-f849: Path traversal in source map auto-loading
   - **Fix available**: `npm audit fix --force` (part of Next.js upgrade)

---

## Summary

| Check | Result | Count |
|-------|--------|-------|
| Build | ✅ Pass | 0 errors |
| Lint | ⚠️ Warning | 3 warnings |
| Security | ❌ Critical | 7 high-severity vulnerabilities |

---

## Recommended Actions

### Immediate (High Priority)
1. **Update Next.js to 16.3.4**: Run `npm audit fix --force` to address all high-severity vulnerabilities
   - This is a breaking change but necessary to fix 29 security advisories
   - Test thoroughly after upgrade

### Short Term (Medium Priority)
1. **Fix lint warnings**: Replace `<img>` tags with Next.js `<Image />` component
   - Location: `components/MetaPixel.tsx`, `components/SplitSection.tsx`
   - Improves LCP (Largest Contentful Paint) and reduces bandwidth

### Ongoing
- Monitor for new vulnerabilities with regular `npm audit` runs
- Keep dependencies up to date

---

**Agent**: website-monitor  
**Status**: Complete
