# Website Monitor Report — 2026-09-01

**Report Generated**: 2026-09-01 at 12:04 UTC  
**Status**: ⚠️ **WARNINGS PRESENT** — Build and lint pass, but critical security vulnerabilities require attention

---

## Summary

- ✅ **Build**: Passed successfully (41 static pages generated)
- ⚠️ **Lint**: Passed with 3 warnings (image optimization recommendations)
- ❌ **Security**: 7 high-severity vulnerabilities detected

---

## 1. Build Check: ✅ PASSED

**Command**: `npm run build`

### Result
- Compilation: **Successful**
- Static pages generated: **41**
- Middleware: **27 kB**
- First Load JS (shared): **80.6 kB**

#### Route Summary
- `/_not-found` (875 B, 81.5 kB First Load JS)
- `/[locale]` (19.1 kB, 169 kB First Load JS)
- `/[locale]/blog` (208 B, 115 kB First Load JS)
- `/[locale]/blog/[slug]` (209 B, 115 kB First Load JS) — 21 blog post paths
- `/[locale]/contact` (1.72 kB, 109 kB First Load JS)
- `/[locale]/privacy` (186 B, 107 kB First Load JS)
- `/[locale]/savings-calculator` (16.3 kB, 166 kB First Load JS)
- `/[locale]/terms` (186 B, 107 kB First Load JS)
- `/api/calculator/submit` (0 B)
- `/api/contact` (0 B)
- `/icon.svg`, `/robots.txt`, `/sitemap.xml` (static assets)

**Verdict**: Production build is healthy and ready for deployment.

---

## 2. Lint Check: ⚠️ PASSED WITH WARNINGS

**Command**: `npm run lint`

### Warnings (3 total)

#### Components/MetaPixel.tsx:54
```
Warning: Using `<img>` could result in slower LCP and higher bandwidth.
Consider using `<Image />` from `next/image` to automatically optimize images.
```

#### Components/SplitSection.tsx:93
```
Warning: Using `<img>` could result in slower LCP and higher bandwidth.
Consider using `<Image />` from `next/image` to automatically optimize images.
```

#### Components/SplitSection.tsx:96
```
Warning: Using `<img>` could result in slower LCP and higher bandwidth.
Consider using `<Image />` from `next/image` to automatically optimize images.
```

**Severity**: Low — These are best-practice recommendations for image optimization, not blocking issues.

---

## 3. Security Audit: ❌ CRITICAL VULNERABILITIES DETECTED

**Command**: `npm audit`

### Vulnerability Summary
- **Total Vulnerabilities**: 7 high-severity
- **Dependencies Affected**: 5 packages
- **Blocking**: Yes — Next.js vulnerabilities are critical

### Detailed Findings

#### 1. **Next.js** (CRITICAL)
**Severity**: High  
**Versions affected**: 0.9.9 - 16.3.0-preview.10  
**Current version**: 14.x.x (estimated)

**Vulnerabilities** (32 known issues):
- Server-Side Request Forgery (SSRF) in Server Actions — GHSA-fr5h-rqp8-mj6g
- Denial of Service in Image Optimization — GHSA-g77x-44xx-532m
- Authorization bypass vulnerability — GHSA-7gfc-8cq8-jh5f
- Cache poisoning via collisions in React Server Component cache-busting — GHSA-vfv6-92ff-j949
- Cross-site scripting (XSS) in CSP nonces — GHSA-ffhc-5mcf-pf4q
- Middleware / Proxy redirects cache-poisoning — GHSA-3g8h-86w9-wvmq
- Server-side request forgery in WebSocket upgrades — GHSA-c4j6-fc7j-m34r
- Unbounded Server Action payload in Edge runtime — GHSA-4c39-4ccg-62r3
- Unauthenticated disclosure of internal Server Function endpoints — GHSA-955p-x3mx-jcvp
- And 23 additional vulnerabilities related to DoS, information exposure, content injection, etc.

**Recommendation**: Upgrade to **Next.js 16.3.4** (breaking change)  
**Command**: `npm audit fix --force` (requires review of breaking changes)

#### 2. **PostCSS** (HIGH)
**Severity**: High  
**Versions affected**: ≤8.5.22

**Vulnerabilities**:
- XSS via unescaped `</style>` in CSS output — GHSA-qx2v-qp2m-jg93
- Arbitrary file read via attacker-controlled sourceMappingURL — GHSA-6g55-p6wh-862q
- Incomplete fix for sourceMappingURL disclosure — GHSA-fxqj-rqcc-2cmp
- Path Traversal in Source Map auto-loading — GHSA-r28c-9q8g-f849

**Impact**: PostCSS is a transitive dependency of Next.js  
**Recommendation**: Will be fixed with Next.js upgrade to 16.3.4

#### 3. **js-yaml** (HIGH)
**Severity**: High  
**Versions affected**: 3.0.0 - 3.15.0 || 4.0.0 - 4.3.0

**Vulnerability**:
- Quadratic CPU consumption in !!omap resolution — CVE-2026-59870
- Can lead to Denial of Service attacks

**Path**: `gray-matter` → `js-yaml`  
**Recommendation**: `npm audit fix` available

#### 4. **minimatch** (HIGH)
**Severity**: High  
**Versions affected**: 9.0.0 - 9.0.6

**Vulnerabilities**:
- Regular Expression Denial of Service (ReDoS) via repeated wildcards — GHSA-3ppc-4f35-3m26
- ReDoS via multiple non-adjacent GLOBSTAR segments — GHSA-7r86-cg39-jmmj
- ReDoS via nested *() extglobs — GHSA-23c5-xmqv-rm74

**Path**: `@typescript-eslint/typescript-estree` → `minimatch`  
**Recommendation**: `npm audit fix` available

#### 5. **nanoid** (HIGH)
**Severity**: High  
**Versions affected**: <3.3.18

**Vulnerability**:
- Custom generators can loop indefinitely when size is zero — GHSA-2v37-7h3g-55p8

**Recommendation**: `npm audit fix` available

---

## Remediation Plan

### Immediate Actions (Critical Priority)
1. **Upgrade Next.js to 16.3.4** (Breaking change)
   - Command: `npm audit fix --force`
   - Review changelog for breaking changes
   - Test thoroughly before deployment
   - This single upgrade will resolve most vulnerabilities

### Secondary Actions (High Priority)
1. Review the breaking changes introduced by Next.js 16.3.4
2. Update middleware and server-side components if necessary
3. Run full test suite after upgrade

### Ongoing
1. Update image optimization in components (lint warnings):
   - Replace `<img>` with `<Image />` from `next/image` in:
     - Components/MetaPixel.tsx:54
     - Components/SplitSection.tsx:93, 96

---

## Recommendations

### 🚨 **Critical**
- The Next.js vulnerabilities affect core security features (SSRF, authorization, cache poisoning)
- **Action Required**: Upgrade to Next.js 16.3.4 immediately before next production deployment
- Breaking changes must be reviewed and tested

### ⚠️ **Important**
- Lint warnings should be addressed in the next sprint (performance optimization)
- Image optimization will improve Core Web Vitals (LCP, bandwidth)

### ✅ **Current Status**
- Build and compilation: Healthy
- Code quality: Good (only best-practice warnings)
- Deployment readiness: Blocked by security vulnerabilities

---

## Next Steps

1. Review Next.js 16.3.4 breaking changes
2. Run `npm audit fix --force` in a feature branch
3. Execute full test suite
4. Deploy to staging environment for final testing
5. Address lint warnings in subsequent PR

---

**Report File**: MONITOR-REPORT-2026-09-01-latest.md  
**Status**: Requires action before production deployment
