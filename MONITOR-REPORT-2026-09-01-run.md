# Website Monitor Report - $(date +%Y-%m-%d\ %H:%M:%S\ UTC)

## Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | Next.js compiled successfully, all 41 pages generated |
| **Lint** | ⚠️ WARNINGS | 3 warnings about `<img>` usage (non-critical) |
| **Security Audit** | ❌ CRITICAL | 7 high-severity vulnerabilities found |

---

## Detailed Results

### Build Check ✅ PASS
- Production build completed successfully
- All 41 static pages generated without errors
- Next.js 13.5.11 compiling correctly

### Lint Check ⚠️ WARNINGS ONLY
```
./components/MetaPixel.tsx:54:9
  Warning: Using <img> could result in slower LCP and higher bandwidth.
  Consider using <Image /> from next/image

./components/SplitSection.tsx:93:17, 96:19
  Warning: Using <img> could result in slower LCP and higher bandwidth.
  Consider using <Image /> from next/image
```

### Security Audit ❌ CRITICAL VULNERABILITIES

**7 High-Severity Vulnerabilities Found**

#### Critical Dependencies Affected:

1. **Next.js 13.5.11** (6 vulnerabilities)
   - ❌ GHSA-p9j2-gv94-2wf4: Server-Side Request Forgery (SSRF) in rewrites via attacker-controlled hostname
   - ⚠️ Multiple other vulnerabilities in Server Actions, disclosures, and input handling
   - **Fix Required:** Upgrade to 16.3.4 or newer (major version bump)

2. **PostCSS ≤8.5.22** (4 vulnerabilities)
   - ❌ GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL (CVSS 7.5)
   - ❌ GHSA-r28c-9q8g-f849: Path traversal in source map loading (CVSS 7.5)
   - ⚠️ XSS via unescaped </style> in CSS output (CVSS 6.1)
   - **Fix Required:** Upgrade to latest version

3. **js-yaml 3.x / 4.x** (2 vulnerabilities)
   - ❌ CVE-2026-59870: Quadratic CPU consumption DoS (CVSS 7.5)
   - Ranges: >=3.0.0 <3.15.1 and >=4.0.0 <4.3.1
   - **Fix Required:** Upgrade to 3.15.1+ or 4.3.1+

4. **minimatch 9.0.0-9.0.6** (3 vulnerabilities)
   - ⚠️ ReDoS attacks via repeated wildcards and GLOBSTAR segments
   - **Fix Required:** Upgrade to 9.0.7+

5. **@typescript-eslint/parser & typescript-estree** (affected by minimatch)
   - Secondary vulnerabilities due to dependency chain
   - Will resolve when minimatch is updated

6. **nanoid <3.3.18** (1 vulnerability)
   - ⚠️ GHSA-2v37-7h3g-55p8: Custom generators can loop indefinitely (CVSS 5.9)
   - **Fix Required:** Upgrade to 3.3.18+

---

## Recommendations

### Immediate Action Required:
1. **Update Next.js** from 13.5.11 to 16.3.4+ (major version bump)
   - This addresses the critical SSRF vulnerability and PostCSS issues
   - Contains significant security updates

2. **Update js-yaml** to latest version (critical DoS vulnerability)

3. **Update minimatch** to 9.0.7+ (ReDoS vulnerabilities)

### Testing Steps After Updates:
- Run `npm install` to get latest versions
- Re-run build: `npm run build`
- Re-run lint: `npm run lint`
- Re-run audit: `npm audit` (should show no high vulnerabilities)

### Optional Linting Improvements:
- Replace `<img>` tags with Next.js `<Image />` component in:
  - components/MetaPixel.tsx (line 54)
  - components/SplitSection.tsx (lines 93, 96)

---

## Vulnerability Severity Breakdown
- **Critical (CVSS 9.0+):** 0
- **High (CVSS 7.0-8.9):** 7
- **Moderate:** Several (not affecting core security)
- **Low:** 0

---

Generated: $(date +%Y-%m-%d\ %H:%M:%S\ UTC)
