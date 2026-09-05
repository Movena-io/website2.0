# Website Monitor Report

**Run Timestamp**: 2026-09-05 03:05 UTC  
**Overall Status**: ⚠️ **WARNING** - Security vulnerabilities detected (Build & Lint healthy)

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

## Security Audit ⚠️ WARNING

**Status**: VULNERABLE - 7 HIGH SEVERITY VULNERABILITIES

### Detected Vulnerabilities

#### 1. **Next.js** - 29 High Severity Advisories
Multiple security issues in the current Next.js version affecting:
- **Denial of Service (DoS)**: Image optimization, Server Components, Server Actions
- **Server-Side Request Forgery (SSRF)**: Middleware/proxy redirects, WebSocket upgrades, rewrites
- **Cross-Site Scripting (XSS)**: App Router CSP nonces, beforeInteractive scripts
- **Cache Poisoning/Confusion**: React Server Component cache, response body cache
- **Information Disclosure**: Dev server origin verification, internal Server Function endpoints
- **Authorization Bypass**: API route protection issues
- **Middleware/Proxy Bypass**: Pages Router i18n handling
- **Data Handling**: Request deserialization, unbounded payloads, invalid UTF-8 sequences

**Fix Available**: Upgrade to next@16.3.4 via `npm audit fix --force` (breaking change)

#### 2. **PostCSS** - High Severity
- XSS via unescaped `</style>` in CSS Stringify Output (GHSA-qx2v-qp2m-jg93)
- Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp)
- Path traversal in source map handling (GHSA-r28c-9q8g-f849)

**Fix Available**: Included in next@16.3.4 upgrade

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
