# Website Monitor Report - 2026-08-31

## Summary

Automated health check completed for Movena website. One critical finding: **7 high-severity vulnerabilities detected**, primarily in Next.js and PostCSS dependencies.

### Overall Status: 🔴 CRITICAL ATTENTION REQUIRED

---

## 1. Build Check: ✅ PASSED

**Result:** Next.js build completed successfully

- All 41 static pages generated without errors
- Route compilation successful
- First Load JS: 81.5 kB - 169 kB (optimized)

---

## 2. Lint Check: ⚠️ WARNING (3 issues)

**Result:** Build passed, but code quality warnings found

```
./components/MetaPixel.tsx (line 54)
  ⚠️ Using <img> instead of <Image /> from next/image
     Impact: Slower LCP, higher bandwidth

./components/SplitSection.tsx (lines 93, 96)
  ⚠️ Using <img> instead of <Image /> from next/image
     Impact: Slower LCP, higher bandwidth
```

**Action:** These are low-priority performance improvements. Next.js recommends using the `<Image />` component for optimal optimization.

---

## 3. Security Audit: ❌ CRITICAL - 7 HIGH Severity Vulnerabilities

**Vulnerability Summary:**
- Total Dependencies: 456 (158 prod, 289 dev, 37 optional)
- High Severity: 7
- Moderate Severity: Multiple
- Low Severity: Multiple
- Critical: 0

### High-Severity Vulnerabilities (Requires Immediate Action)

#### 1. **Next.js Security Issues** (DIRECT DEPENDENCY)
   - Current Version: 13.5.11
   - Required Upgrade: 14.1.1+ or 15.5.21+
   - Multiple Vulnerabilities:
     - **GHSA-fr5h-rqp8-mj6g**: Server-Side Request Forgery in Server Actions (CVSS 7.5)
     - **GHSA-7gfc-8cq8-jh5f**: Authorization bypass (CVSS 7.5)
     - **GHSA-mwv6-3258-q52c**: Denial of Service with Server Components (CVSS 7.5)
     - **GHSA-5j59-xgg2-r9c4**: DoS - Incomplete Fix Follow-Up (CVSS 7.5)
     - **GHSA-c4j6-fc7j-m34r**: WebSocket Server-Side Request Forgery (CVSS 8.6) ⚠️ HIGHEST IMPACT
     - **GHSA-36qx-fr4f-26g5**: Middleware / Proxy bypass in i18n (CVSS 7.5)
     - **GHSA-p9j2-gv94-2wf4**: SSRF in rewrites via attacker-controlled hostname (CVSS High)
     - **GHSA-m99w-x7hq-7vfj**: DoS in App Router using Server Actions (CVSS High)

#### 2. **PostCSS Arbitrary File Read** (TRANSITIVE via Next.js)
   - Vulnerability: GHSA-6g55-p6wh-862q - Arbitrary file read via sourceMappingURL
   - CVSS Score: 7.5 (High)
   - Impact: Information disclosure, attackers can read arbitrary .map files
   - Requires: PostCSS 8.5.23+

#### 3. **TypeScript ESLint Parser**
   - Issue: Dependency on vulnerable `minimatch`
   - Transitive: High-severity ReDoS (Regular Expression Denial of Service)
   - Fix Available: npm audit fix

#### 4. **js-yaml**
   - Vulnerability: GHSA-5p4m-2wfm-xmqj - Quadratic CPU consumption in !!omap resolution
   - CVSS Score: 7.5 (High)
   - Affected Ranges: 3.0.0 < 3.15.1, 4.0.0 < 4.3.1

#### 5. **minimatch ReDoS Vulnerabilities**
   - Multiple high-severity Regular Expression DoS issues
   - Affected Range: 9.0.0 - 9.0.6
   - Requires: minimatch 9.0.7+

#### 6. **nanoid Infinite Loop**
   - Vulnerability: GHSA-2v37-7h3g-55p8 - Custom generators can loop indefinitely
   - CVSS Score: 5.9 (High)
   - Requires: nanoid 3.3.18+

---

## Critical Issues Requiring Immediate Action

### 🚨 Issue 1: Next.js Version is Outdated
- **Current:** 13.5.11
- **Risk Level:** HIGH - Multiple unpatched security vulnerabilities including SSRF, authorization bypass, and DoS
- **Recommendation:** Upgrade to Next.js 15.5.21+ (major version upgrade required)
- **Impact:** This is a significant dependency upgrade that requires testing

### 🚨 Issue 2: PostCSS Arbitrary File Read
- **Current:** 8.5.22 (or earlier via Next.js)
- **Risk Level:** HIGH - Can leak sensitive .map files
- **Recommendation:** Upgrade to PostCSS 8.5.23+
- **Impact:** May be auto-upgraded with Next.js update

---

## Recommended Actions (Priority Order)

1. **IMMEDIATE:** Evaluate Next.js major version upgrade strategy
   - Decide whether to upgrade to 14.x LTS or 15.x latest
   - Create upgrade task with testing checklist
   - This is blocking security patches

2. **After Next.js upgrade:**
   - Run `npm audit fix` to patch transitive dependencies
   - Verify all tests pass
   - Deploy updated version

3. **Code Quality (Low Priority):**
   - Replace `<img>` with Next.js `<Image />` in MetaPixel.tsx and SplitSection.tsx

---

## Next Steps

1. Someone with dependency ownership should decide on Next.js upgrade path
2. If proceeding with upgrade:
   - Test thoroughly in development environment
   - Check for breaking changes in Next.js changelog
   - Validate all features still work
3. Re-run security audit after upgrades

---

## Notes

- The AUDIT-NOTE.md flags that previous monitoring runs identified these same vulnerabilities but no action was taken
- This report confirms those findings are still valid
- A major framework upgrade (Next.js 13.x → 14.x or 15.x) requires deliberate human decision and thorough testing
- Monitoring agent should raise issues rather than auto-committing unaddressed advisories

---

**Report Generated:** 2026-08-31  
**Generated By:** website-monitor agent
