# Website Monitor Report

**Run Timestamp**: 2026-09-05 (Automated Scheduled Check)

**Overall Status**: ⚠️ **WARNING** - Build successful, lint warnings present, security vulnerabilities detected

---

## Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Passed | Next.js build successful, 41 routes generated |
| **Lint** | ⚠️ Warnings | 3 warnings (img element usage) |
| **Dependencies** | ✅ Installed | 423 packages installed (154 seeking funding) |
| **Security** | ❌ Critical | 7 high-severity vulnerabilities found |

---

## Build Check

✅ **PASSED** - Next.js compilation successful

```
✓ Compiled successfully
✓ Generating static pages (41/41)
✓ Collecting build traces
```

### Build Output Details
- **Static Routes Generated**: 41 pages
- **First Load JS Shared**: 80.6 kB
- **Middleware**: 27 kB
- **Build Status**: All pages compiled and optimized successfully

---

## Lint Check

⚠️ **WARNINGS** - 3 ESLint warnings found

### Issues Identified

1. **components/MetaPixel.tsx:54:9**
   - Warning: Using `<img>` could result in slower LCP
   - Recommendation: Use `<Image />` from `next/image`
   
2. **components/SplitSection.tsx:93:17**
   - Warning: Using `<img>` could result in slower LCP
   - Recommendation: Use `<Image />` from `next/image`

3. **components/SplitSection.tsx:96:19**
   - Warning: Using `<img>` could result in slower LCP
   - Recommendation: Use `<Image />` from `next/image`

**Action Required**: Update 2 components to use Next.js Image optimization for improved performance.

---

## Security Audit

❌ **CRITICAL** - 7 high-severity vulnerabilities detected

### Vulnerable Dependencies

1. **@typescript-eslint/parser** (HIGH)
   - Affected: 6.16.0 - 7.5.0
   - Via: @typescript-eslint/typescript-estree
   - Fix Available: Yes

2. **@typescript-eslint/typescript-estree** (HIGH)
   - Affected: 6.16.0 - 7.5.0
   - Via: minimatch
   - Fix Available: Yes

3. **minimatch** (HIGH - ReDoS Vulnerabilities)
   - Affected: 9.0.0 - 9.0.6
   - Issues: Multiple ReDoS attacks and wildcard backtracking
   - Fix Available: Yes

4. **js-yaml** (HIGH - CVE-2026-59870)
   - Affected: 3.0.0 - 3.15.0, 4.0.0 - 4.3.0
   - Issue: Quadratic CPU consumption in omap resolution
   - CVSS Score: 7.5
   - Fix Available: Yes

5. **nanoid** (HIGH)
   - Affected: < 3.3.18
   - Issue: Custom generators can loop indefinitely when size is zero
   - CVSS Score: 5.9
   - Fix Available: Yes

6. **next** (MIXED SEVERITY)
   - Multiple vulnerabilities detected across versions 0.9.9 - 16.3.0-preview.10
   - Includes SSRF via rewrites, information disclosure, and unbounded payload issues
   - Fix Available: Yes (requires upgrade to 16.3.4+)

7. **postcss** (HIGH)
   - Multiple vulnerabilities: XSS, arbitrary file read, path traversal
   - Affected: <= 8.5.22
   - Fix Available: Yes

### Vulnerability Statistics
- **Total Vulnerabilities**: 7
- **High Severity**: 7
- **Moderate**: 0
- **Low**: 0
- **Critical**: 0

### Dependencies Overview
- **Production Dependencies**: 158
- **Development Dependencies**: 289
- **Optional Dependencies**: 37
- **Total Dependencies**: 456

---

## Recommendations

### 🔴 Priority 1: Security Updates
- Run `npm audit fix` to automatically patch vulnerabilities
- Major dependency updates may be required (particularly Next.js to 16.3.4+)
- Test thoroughly after applying fixes for breaking changes

### 🟡 Priority 2: Image Optimization
- Replace `<img>` elements with Next.js `<Image />` component in:
  - `components/MetaPixel.tsx` (line 54)
  - `components/SplitSection.tsx` (lines 93, 96)
- This will improve Core Web Vitals metrics

### 🟢 Priority 3: Maintenance
- Update deprecated packages (rimraf 3.x, glob 7.x, eslint 8.x)
- Consider upgrading npm (10.9.7 → 12.0.2 available)

---

## Next Steps

1. **Address Security**: `npm audit fix` or `npm audit fix --force` for breaking changes
2. **Update Images**: Refactor image imports in identified components
3. **Test & Validate**: Run full test suite after updates
4. **Monitor**: Re-run monitor on next scheduled check

---

*Report generated automatically by website-monitor agent*
