# Website Monitor Report - 2026-08-31 (Latest Run)

## Summary

Automated health check completed for Movena website. **Status unchanged from previous run: 7 high-severity vulnerabilities still present**, primarily in Next.js and dependencies.

### Overall Status: 🔴 CRITICAL ATTENTION REQUIRED

---

## 1. Build Check: ✅ PASSED

**Result:** Next.js build completed successfully

- All 41 static pages generated without errors
- Route compilation successful
- First Load JS: 81.5 kB - 169 kB (optimized)
- No build errors or warnings

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
- Moderate Severity: 0 at high level
- Low Severity: 0 at high level
- Critical: 0

### High-Severity Vulnerabilities (Requires Immediate Action)

#### 1. **Next.js Security Issues** (DIRECT DEPENDENCY - 13.5.11)
   - Current Version: 13.5.11
   - Required Upgrade: 15.5.21+ or 16.3.3+
   - Multiple High-Severity Vulnerabilities:
     - **GHSA-fr5h-rqp8-mj6g**: Server-Side Request Forgery in Server Actions
     - **GHSA-7gfc-8cq8-jh5f**: Authorization bypass
     - **GHSA-mwv6-3258-q52c**: Denial of Service with Server Components
     - **GHSA-5j59-xgg2-r9c4**: DoS - Incomplete Fix Follow-Up
     - **GHSA-c4j6-fc7j-m34r**: WebSocket Server-Side Request Forgery ⚠️ HIGHEST IMPACT (CVSS 8.6)
     - **GHSA-36qx-fr4f-26g5**: Middleware / Proxy bypass in i18n
     - **GHSA-p9j2-gv94-2wf4**: SSRF in rewrites via attacker-controlled hostname
     - **GHSA-m99w-x7hq-7vfj**: DoS in App Router using Server Actions
   - Impact: Critical - affects server-side security and request handling

#### 2. **PostCSS Arbitrary File Read** (VIA NEXT.JS TRANSITIVE)
   - Vulnerability: GHSA-6g55-p6wh-862q - Arbitrary file read via sourceMappingURL
   - CVSS Score: 7.5 (High)
   - Affected Range: <=8.5.22
   - Impact: Information disclosure - attackers can read arbitrary .map files
   - Additional Issues: GHSA-fxqj-rqcc-2cmp (incomplete fix), GHSA-r28c-9q8g-f849 (path traversal)

#### 3. **js-yaml Quadratic CPU Consumption** (TRANSITIVE)
   - Vulnerability: GHSA-5p4m-2wfm-xmqj - Quadratic CPU consumption in !!omap resolution
   - CVSS Score: 7.5 (High)
   - Affected Ranges: 3.0.0 < 3.15.1, 4.0.0 < 4.3.1
   - Impact: Denial of Service via malicious YAML parsing
   - Installed via: gray-matter and direct dependency

#### 4. **minimatch ReDoS Vulnerabilities** (TRANSITIVE VIA @TYPESCRIPT-ESLINT)
   - Multiple Regular Expression Denial of Service issues:
     - GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards
     - GHSA-7r86-cg39-jmmj: ReDoS via multiple GLOBSTAR segments (CVSS 7.5)
     - GHSA-23c5-xmqv-rm74: ReDoS via nested *() extglobs (CVSS 7.5)
   - Affected Range: 9.0.0 - 9.0.6
   - Requires: minimatch 9.0.7+
   - Impact: CPU exhaustion attacks

#### 5. **nanoid Infinite Loop** (TRANSITIVE)
   - Vulnerability: GHSA-2v37-7h3g-55p8 - Custom generators can loop indefinitely
   - CVSS Score: 5.9 (High)
   - Requires: nanoid 3.3.18+
   - Impact: Potential DoS through infinite loops

#### 6. **@typescript-eslint/parser** (TRANSITIVE)
   - Issue: Dependency on vulnerable `minimatch`
   - Transitive: High-severity ReDoS vulnerabilities
   - Fix Available: npm audit fix

---

## Critical Issues Requiring Immediate Action

### 🚨 Issue 1: Next.js Version is Severely Outdated
- **Current:** 13.5.11
- **Risk Level:** CRITICAL - Multiple unpatched security vulnerabilities including SSRF, authorization bypass, and DoS
- **Recommendation:** Upgrade to Next.js 15.5.21+ (15.x LTS) or 16.3.3+ (latest)
- **Impact:** This is a major version upgrade that requires thorough testing

### 🚨 Issue 2: PostCSS Arbitrary File Read
- **Current:** 8.5.x (via Next.js)
- **Risk Level:** HIGH - Can leak sensitive .map files and environment configuration
- **Recommendation:** Will be resolved by Next.js upgrade to 15.5.21+
- **Impact:** May expose secrets in source maps

---

## Status Compared to Previous Report

- **Build Status**: No change (still passing)
- **Lint Issues**: No change (still 3 warnings)
- **Security Vulnerabilities**: **Still 7 high-severity** - No progress since last run
- **Timeline**: Last report was 2026-08-31, suggesting no action has been taken

---

## Recommended Actions (Priority Order)

1. **IMMEDIATE:** Decide on Next.js upgrade strategy
   - Evaluate whether to upgrade to 14.x LTS or 15.x+ latest
   - Plan backward compatibility impact
   - Create task with testing requirements

2. **After Decision:**
   - Execute upgrade following Next.js migration guide
   - Run `npm audit fix` to patch remaining transitive dependencies
   - Execute full test suite (lint, build, functional tests)
   - Manual testing of key features
   - Deploy updated version

3. **Code Quality (Low Priority):**
   - Replace `<img>` with Next.js `<Image />` in MetaPixel.tsx and SplitSection.tsx

---

## Key Points

- ⚠️ **No progress since last run** - Vulnerabilities remain unaddressed
- 🔴 **Next.js upgrade is blocking** - All PostCSS fixes depend on it
- 📋 **Decision needed** - Requires human judgment on upgrade path, not automated
- ✅ **Build quality good** - No code-level issues preventing upgrade

---

## Next Steps

1. **This week:** Schedule decision meeting on Next.js upgrade path
2. **If proceeding:** 
   - Create test plan for major version upgrade
   - Test in staging environment first
   - Check for breaking changes
   - Validate all features still work
3. **Re-run audit:** After upgrades complete

---

**Report Generated:** 2026-08-31  
**Generated By:** website-monitor agent  
**Duration:** ~2 minutes (build, lint, audit)
