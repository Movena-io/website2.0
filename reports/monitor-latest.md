# Website Monitor Report

**Run Date**: 2026-09-05 01:02 UTC  
**Overall Status**: 🔴 **CRITICAL** - Security vulnerabilities detected

---

## Summary

| Check | Status | Details |
|-------|--------|---------|
| Build | ✅ Healthy | Successfully compiled, all 41 pages generated |
| Lint | ⚠️ Warning | 3 warnings about `<img>` elements (non-critical) |
| Security | 🔴 Critical | 4 high-severity vulnerabilities |

---

## Build Check ✅

**Status**: PASSED

The Next.js application compiled successfully with no errors.

**Output**:
- Compiled successfully
- Generated 41 static pages
- Route sizes: Main app ~169 kB (with shared chunks ~80.6 kB)
- No TypeScript errors

---

## Lint Check ⚠️

**Status**: PASSED WITH WARNINGS (3 warnings)

Linting completed successfully. Found 3 non-critical warnings:

1. **MetaPixel.tsx:54** - Using `<img>` instead of Next.js `<Image />`
2. **SplitSection.tsx:93** - Using `<img>` instead of Next.js `<Image />`
3. **SplitSection.tsx:96** - Using `<img>` instead of Next.js `<Image />`

**Recommendation**: Consider migrating `<img>` elements to Next.js `<Image />` component for automatic optimization and better performance.

---

## Security Audit 🔴 CRITICAL

**Status**: FAILED - 4 HIGH SEVERITY VULNERABILITIES

### Detected Vulnerabilities

#### 1. **Next.js** - 31 High Severity Advisories
Multiple critical security issues in Next.js (0.9.9 - 16.3.0-preview.10):
- Server-Side Request Forgery (SSRF) vulnerabilities (GHSA-fr5h-rqp8-mj6g, GHSA-4342-x723-ch2f, GHSA-p9j2-gv94-2wf4)
- Denial of Service (DoS) conditions (GHSA-g77x-44xx-532m, GHSA-mwv6-3258-q52c, GHSA-5j59-xgg2-r9c4, and others)
- Cache poisoning/confusion vulnerabilities (GHSA-g5qg-72qw-gw5v, GHSA-qpjv-v59x-3qc4, GHSA-ggv3-7p47-pfv8, GHSA-3g8h-86w9-wvmq, GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q)
- Information disclosure (GHSA-3h52-269p-cp9r, GHSA-955p-x3mx-jcvp)
- Authorization bypass (GHSA-7gfc-8cq8-jh5f)
- Cross-site scripting (XSS) (GHSA-ffhc-5mcf-pf4q, GHSA-gx5p-jg67-6x7h)
- Image optimization DoS (GHSA-9g9p-9gw9-jx7f, GHSA-h64f-5h5j-jqjh)
- Server Components issues (GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj, GHSA-h25m-26qc-wcjf)

**Fix Available**: Upgrade to next@16.3.4 (requires `npm audit fix --force` - breaking change)

#### 2. **PostCSS** - High Severity
- XSS via unescaped `</style>` in CSS output (GHSA-qx2v-qp2m-jg93)
- Path traversal via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849)

**Fix Available**: Included in next@16.3.4 upgrade

#### 3. **nanoid** - High Severity
- Custom generators can loop indefinitely when size is zero (GHSA-2v37-7h3g-55p8)

**Fix Available**: Via `npm audit fix`

#### 4. **js-yaml** - High Severity
- Quadratic CPU consumption in !!omap resolution (CVE-2026-59870)
- Located in: node_modules/gray-matter/node_modules/js-yaml

**Fix Available**: Via `npm audit fix` (or gray-matter dependency update)

---

## Recommendations

### Immediate Actions Required 🚨

1. **Update Next.js**: The current version has 31 known vulnerabilities affecting core security areas:
   ```bash
   npm audit fix --force
   npm install next@16.3.4
   ```
   **Note**: This is a breaking change - test thoroughly after upgrade

2. **Update Dependencies**: Run full audit fix to address nanoid and js-yaml:
   ```bash
   npm audit fix
   ```

3. **Testing**: After updates, re-run:
   - `npm run build` (verify no build regressions)
   - `npm run lint` (check code quality)
   - Full regression testing on all application pages

### Post-Update Verification

- Verify all 41 pages still build correctly
- Test Server Actions and middleware functionality
- Test image optimization routes
- Verify cache behavior hasn't changed
- Run performance benchmarks on critical routes

---

## Next Steps

1. Review Next.js 16.3.4 changelog for breaking changes
2. Apply security updates in a feature branch with full testing
3. Re-run monitor after updates to confirm all vulnerabilities are resolved
4. Commit updated package-lock.json
5. Deploy with caution, monitoring for unexpected behavior
