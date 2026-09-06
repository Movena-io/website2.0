# Website Monitor Report

**Run Timestamp**: 2026-09-06T14:30:00Z (Automated Scheduled Check)
**Overall Status**: ⚠️ **WARNING** - Security vulnerabilities require immediate attention

---

## Summary

The Movena website project has passed build and lint checks, but contains **7 high-severity security vulnerabilities** that require immediate attention.

---

## Check Results

### ✅ Build Check: PASSED

```
npm run build - Completed successfully
• Compiled successfully
• Generated 41 static pages
• No build errors
```

**Details**:
- Next.js application compiled without errors
- All 41 routes generated successfully
- Build size optimized

---

### ⚠️ Lint Check: PASSED WITH WARNINGS

```
npm run lint - 3 warnings found
```

**Warnings**:
1. `./components/MetaPixel.tsx:54` - Using `<img>` instead of `<Image />` from `next/image`
2. `./components/SplitSection.tsx:93` - Using `<img>` instead of `<Image />` from `next/image`
3. `./components/SplitSection.tsx:96` - Using `<img>` instead of `<Image />` from `next/image`

**Recommendation**: Optimize images by replacing `<img>` tags with `<Image />` from `next/image` to improve LCP and reduce bandwidth.

---

### ❌ Security Audit: FAILED

```
npm audit - 7 high severity vulnerabilities found
```

**Critical Vulnerabilities**:

1. **@typescript-eslint/parser** (indirect)
   - Affected range: 6.16.0 - 7.5.0
   - Via: @typescript-eslint/typescript-estree → minimatch
   - Fix available: Yes

2. **@typescript-eslint/typescript-estree** (indirect)
   - Affected range: 6.16.0 - 7.5.0
   - Via: minimatch
   - Fix available: Yes

3. **js-yaml** (indirect)
   - CVE-2026-59870: Quadratic CPU consumption in !!omap resolution
   - CVSS Score: 7.5 (High)
   - Affected ranges: >=3.0.0 <3.15.1 and >=4.0.0 <4.3.1
   - Fix available: Yes

4. **minimatch** (indirect)
   - Multiple ReDoS vulnerabilities
   - Affected range: 9.0.0 - 9.0.6
   - CVSS Score: 7.5 (High)
   - Fix available: Yes

5. **nanoid** (indirect)
   - Custom generators can loop indefinitely when size is zero
   - Affected range: <3.3.18
   - CVSS Score: 5.9 (High)
   - Fix available: Yes

6. **next** (direct dependency)
   - Multiple vulnerabilities including SSRF, XSS, and information disclosure
   - Current version: 16.3.0-preview.10
   - Available fix: 16.3.4 (major version bump required)
   - Key issues:
     - Server-Side Request Forgery in rewrites (GHSA-p9j2-gv94-2wf4)
     - Unauthenticated disclosure of internal Server Function endpoints (GHSA-955p-x3mx-jcvp)
     - Unbounded Server Action payload in Edge runtime (GHSA-4c39-4ccg-62r3)

7. **postcss** (indirect)
   - Multiple path traversal and information disclosure vulnerabilities
   - Affected range: <=8.5.22
   - CVSS Score: 7.5 (High)
   - Key issues:
     - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q)
     - XSS via unescaped </style> in CSS output (GHSA-qx2v-qp2m-jg93)

---

## Recommended Actions

1. **Immediate**: Update Next.js to version 16.3.4 or later to address SSRF and information disclosure vulnerabilities
2. **High Priority**: Run `npm audit fix` to resolve remaining vulnerabilities
3. **Code Quality**: Replace `<img>` tags with `<Image />` from `next/image` to optimize performance

---

## Statistics

| Metric | Count |
|--------|-------|
| High Severity Vulns | 7 |
| Moderate Vulns | 0 |
| Low Vulns | 0 |
| Lint Warnings | 3 |
| Build Errors | 0 |
| Total Dependencies | 456 |

---

**Next Steps**: 
- Review and apply security patches before next deployment
- Monitor for any new vulnerabilities in dependencies
