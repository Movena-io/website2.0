# Website Monitor Report — website2.0

**Run Time:** 2026-09-14 (automated monitor)  
**Overall Status:** 🔴 **CRITICAL** — Build successful, lint warnings, critical security vulnerabilities present

---

## Summary

The Movena website builds and runs successfully. Linting reveals minor style issues with image optimization. However, **5 security vulnerabilities exist in Next.js 13 and dependencies**, including 2 critical remote code execution flaws that require a Next.js major version upgrade for remediation.

| Check | Status | Issues |
|-------|--------|--------|
| **Build** | ✅ Pass | 0 errors |
| **Lint** | ⚠️ Warning | 3 image optimization recommendations |
| **Security** | ❌ CRITICAL | 5 vulnerabilities (1 critical, 4 high) |

---

## Build Check ✅

**Status:** PASSED

- Next.js production build compiled successfully
- 40 static pages generated (SSG with JSON exports)
- Type validation passed
- Build traces collected successfully
- All locales functional (en, da)

### Build Output

**Routes Generated:**
- Main entry: `/[locale]` (19.1 kB, 169 kB First Load JS)
- Blog index: `/[locale]/blog` (115 kB First Load JS)
- Blog posts: `/[locale]/blog/[slug]` (21 paths)
- Calculator: `/[locale]/savings-calculator` (16.3 kB, 166 kB First Load JS)
- Legal: `/[locale]/privacy`, `/[locale]/terms`
- Contact: `/[locale]/contact`
- API routes: `/api/calculator/submit`, `/api/contact` (2 lambda)
- Static: robots.txt, sitemap.xml

**Shared JS:** 80.6 kB total (chunks optimized)

---

## Linting Check ⚠️

**Status:** 3 WARNINGS (Non-Critical)

### Findings

1. **./components/MetaPixel.tsx:54** — `<img>` tag optimization
2. **./components/SplitSection.tsx:93** — `<img>` tag optimization
3. **./components/SplitSection.tsx:96** — `<img>` tag optimization

**Assessment:** These are performance recommendations to use Next.js `<Image />` component for automatic optimization. Not blocking; code compiles correctly.

---

## Security Audit ❌

**Status:** 5 VULNERABILITIES — 1 CRITICAL, 4 HIGH

### Critical Issues (Immediate Concern)

#### 1. **Next.js Unauthenticated RCE on Windows Servers**
- **Package:** next@13.4.2
- **Advisory:** GHSA-p293-qw3h-jr36
- **CVSS:** 9.0 (Critical)
- **Description:** Unauthenticated Remote Code Execution affecting Windows-hosted deployments
- **Range:** >=13.4.0 <15.5.24
- **Fix:** Requires Next.js ≥15.5.24

#### 2. **Next.js Image Optimization RCE (AVIF)**
- **Package:** next@13.4.2
- **Advisory:** GHSA-2xp9-vwfh-vxw4
- **CVSS:** Critical
- **Description:** Unauthenticated RCE in Image Optimization API when AVIF files processed
- **Range:** >=10.0.0 <15.5.24
- **Fix:** Requires Next.js ≥15.5.24

### High-Severity Issues

#### 3. **Next.js Server Actions SSRF**
- **Package:** next@13.4.2
- **Advisory:** GHSA-fr5h-rqp8-mj6g
- **CVSS:** 7.5
- **Description:** Server-Side Request Forgery in Server Actions
- **Fix:** Requires Next.js ≥14.1.1

#### 4. **PostCSS Arbitrary File Read**
- **Package:** postcss@8.4.31 (nested in next)
- **Advisory:** GHSA-6g55-p6wh-862q
- **CVSS:** 7.5
- **Description:** Path traversal via sourceMappingURL in CSS allows reading arbitrary files
- **Fix:** Requires Next.js upgrade (nested dependency)

#### 5. **TypeScript-ESLint minimatch ReDoS**
- **Package:** @typescript-eslint/typescript-estree → minimatch@9.0.0-9.0.6
- **Advisory:** Multiple ReDoS vulnerabilities in minimatch regex patterns
- **CVSS:** 7.5
- **Fix:** Available via npm audit fix

### Vulnerability Summary

```
npm audit output (2026-09-14):
- Direct vulnerabilities: 1 (next)
- Transitive vulnerabilities: 4
- Total: 5 (1 critical, 4 high)
```

**Known Project Policy:** Per CLAUDE.md:
> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

---

## Dependency Status

- **Total packages:** 455 (157 prod, 289 dev, 37 optional)
- **Framework:** Next.js 13.4.2 (current; 16.3+ available)
- **Styling:** Tailwind CSS 3
- **Locales:** 2 (en, da)

---

## Recommendations

### 🔴 Urgent (Product Decision Required)

The **two critical RCE vulnerabilities** (GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4) require Next.js 15.5.24 or higher.

**Action required:**
- Determine deployment platform (Windows vs. Linux) — Windows deployments are at immediate risk
- Plan and execute Next.js 13 → 15/16 migration
- Review Next.js release notes for breaking changes

### ⚠️ High Priority

- Audit deployment infrastructure for Windows servers
- Schedule Next.js major version upgrade
- Review Server Actions for SSRF exposure

### 📋 Optional (No Timeline)

- Convert 3 `<img>` tags to `next/image` for LCP improvement
- Consider ESLint 9+ upgrade (v8 no longer supported)

---

*Automated monitor: reports/monitor-latest.md overwritten on each run. History available via `git log reports/monitor-latest.md`.*
