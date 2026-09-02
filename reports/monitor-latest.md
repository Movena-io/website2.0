# Website Monitor Report

**Timestamp**: 2026-09-02 UTC  
**Overall Status**: ⚠️ **Warning** — Build successful, but critical security vulnerabilities require attention

---

## Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Pass | Compiled successfully |
| **Lint** | ⚠️ Warning | 3 warnings about image optimization |
| **Security Audit** | ❌ Critical | 7 high-severity vulnerabilities found |

---

## Build Check ✅

**Status**: Passed

The Next.js application compiled successfully with no errors. All 41 static pages generated correctly.

```
✓ Compiled successfully
✓ Generating static pages (41/41)
✓ Finalizing page optimization
```

---

## Lint Check ⚠️

**Status**: Warnings (Non-blocking)

Found 3 warnings related to image optimization:

1. **MetaPixel.tsx:54** — Using `<img>` instead of Next.js `<Image />`
2. **SplitSection.tsx:93** — Using `<img>` instead of Next.js `<Image />`
3. **SplitSection.tsx:96** — Using `<img>` instead of Next.js `<Image />`

**Recommendation**: Replace `<img>` elements with Next.js `<Image />` component for automatic optimization, better LCP performance, and reduced bandwidth usage.

---

## Security Audit ❌

**Status**: 7 High-Severity Vulnerabilities

### Critical Vulnerabilities

#### 1. **next** (Multiple High-Severity Issues)
- **SSRF in rewrites**: Server-Side Request Forgery via attacker-controlled destination hostname
- **Server Function endpoint disclosure**: Unauthenticated access to internal Server Function endpoints
- **Unbounded Server Action payload**: Edge runtime does not enforce payload size limits
- **Affected Range**: `>=12.0.0 <15.5.21`
- **Fix Available**: `16.3.4` (Major version bump)

#### 2. **postcss** (Multiple High-Severity Issues)
- **Path Traversal**: Arbitrary .map file disclosure via sourceMappingURL
- **XSS Vulnerability**: Unescaped `</style>` in CSS output
- **Affected Range**: `<=8.5.22`
- **Fix Available**: Update to `>8.5.22`

#### 3. **js-yaml** (ReDoS Attack Vector)
- **Quadratic CPU consumption** in `!!omap` resolution
- **CVE**: CVE-2026-59870
- **CVSS Score**: 7.5 (High)
- **Affected Range**: `>=3.0.0 <3.15.1` or `>=4.0.0 <4.3.1`
- **Impact**: Denial of Service via CPU exhaustion

#### 4. **minimatch** (ReDoS Vulnerabilities)
- **Repeated wildcard ReDoS**: Multiple combinatorial backtracking issues
- **Affected Range**: `>=9.0.0 <9.0.7`
- **CVSS Score**: 7.5 (High)
- **Impact**: Regex denial of service

#### 5. **nanoid** (Infinite Loop)
- **Custom generator infinite loop** when size is zero
- **CVSS Score**: 5.9 (High)
- **Affected Range**: `<3.3.18`

#### 6. **@typescript-eslint/parser** (Transitive)
- Affected by minimatch vulnerabilities
- **Affected Range**: `6.16.0 - 7.5.0`

#### 7. **@typescript-eslint/typescript-estree** (Transitive)
- Affected by minimatch vulnerabilities
- **Affected Range**: `6.16.0 - 7.5.0`

### Remediation Steps

1. **Upgrade Next.js** (Priority 1 — High Impact)
   ```bash
   npm install next@16.3.4 --save
   ```
   This addresses SSRF, endpoint disclosure, and payload validation issues.

2. **Update PostCSS** (Priority 1 — High Impact)
   ```bash
   npm install postcss@latest --save
   ```

3. **Update js-yaml** (Priority 2 — DoS Risk)
   - Update to `>=3.15.1` or `>=4.3.1`

4. **Update minimatch** (Priority 2 — Transitive)
   - Will be resolved when upgrading TypeScript ESLint deps

5. **Update nanoid** (Priority 2 — Low Probability)
   - Update to `>=3.3.18`

---

## Recommendations

1. **Immediate Action Required**: Upgrade Next.js to v16.3.4 to patch server-side security vulnerabilities
2. **Address Image Optimization**: Convert `<img>` tags to Next.js `<Image />` component
3. **Dependency Updates**: Run `npm audit fix` or `npm install next@16.3.4` to resolve transitive vulnerabilities
4. **Re-run Monitor**: After updates, re-run this monitor to verify all checks pass

---

## Dependencies Overview

- **Total Packages**: 456 (158 prod, 289 dev, 37 optional)
- **Funding Requests**: 154 packages
- **Vulnerabilities**: 7 high-severity, 0 critical

---

**Next Steps**: Address the high-severity vulnerabilities before deploying to production.
