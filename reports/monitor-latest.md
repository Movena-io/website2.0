# Website Monitor Report

**Run Timestamp:** 2026-09-23T02:07:08Z  
**Overall Status:** ⚠️ **WARNING** (Build healthy, known security vulnerabilities pending product decision)

---

## Executive Summary

The Movena marketing website build and type checking passed successfully with all 38 static pages compiled without errors. Linting identified 2 non-critical warnings in image optimization. Security audit revealed 5 known vulnerabilities (4 high, 1 critical) in dependencies, which are documented as expected and pending a major Next.js upgrade decision. The working tree is clean with no uncommitted changes.

---

## Build Check: ✅ **HEALTHY**

**Status:** Compiled successfully

The Next.js 13 application compiled without errors. All 38 static pages were generated successfully.

**Pages Generated:**
- Home pages for English and Danish locales (`/en`, `/da`)
- Blog index and 21 article pages
- Contact page (`/[locale]/contact`)
- Savings calculator (`/[locale]/savings-calculator`)
- Data portability page (`/[locale]/dataportabilitet`)
- API routes (`/api/calculator/submit`, `/api/contact`)
- Static routes (robots.txt, sitemap.xml)

**Build Metrics:**
- First Load JS (shared): 80.6 kB
- Build output directory (.next): 109 MB
- Node modules: 535 MB
- Routes compiled: 38
- Middleware: 27.1 kB

**Compilation:** ✅ No errors or type issues detected

---

## Lint Check: ⚠️ **WARNING**

**Status:** 2 warnings found (no errors)

**Location:** `./components/SplitSection.tsx`

| Line | Issue | Rule |
|------|-------|------|
| 93 | Using `<img>` instead of `<Image />` from Next.js | @next/next/no-img-element |
| 96 | Using `<img>` instead of `<Image />` from Next.js | @next/next/no-img-element |

**Impact:** Non-critical. These warnings relate to image optimization and Largest Contentful Paint (LCP) performance. Both `<img>` elements in the SplitSection component should be converted to use Next.js's `Image` component for automatic optimization.

**Action:** Update the component to import and use `next/image` for better performance metrics.

---

## Dependency & Security Check: ❌ **CRITICAL VULNERABILITIES FLAGGED**

**Status:** 5 vulnerabilities detected
- 4 High severity
- 1 Critical severity

### Critical Severity (1)

**Next.js** (versions 0.9.9 - 16.3.0-preview.10)
- Current version: `13.5.11`
- Multiple server-side vulnerabilities:
  - SSRF (Server-Side Request Forgery)
  - DoS (Denial of Service) in Server Components and Image Optimization
  - Cache poisoning via response body confusion and middleware/proxy issues
  - XSS in App Router (CSP nonce handling, beforeInteractive scripts)
  - Remote Code Execution on Windows-hosted servers
  - Information disclosure (internal Server Function endpoints)
- **Fix Required:** Upgrade to v16.3.6 or later
- **Note:** This is a breaking change requiring major version upgrade (v13 → v16+)

### High Severity (4)

**minimatch** (via @typescript-eslint/typescript-estree)
- Current: v9.0.0-9.0.6
- ReDoS (Regular Expression Denial of Service) vulnerabilities:
  - Repeated wildcards with non-matching literals in patterns
  - Nested `*()` extglobs generating catastrophic backtracking
  - Multiple non-adjacent GLOBSTAR segments
- Dev dependency chain only (no direct production impact)

**PostCSS** (nested in Next.js)
- Current: ≤8.5.22
- Multiple vulnerabilities:
  - XSS via unescaped `</style>` in CSS stringify output
  - Arbitrary file read via attacker-controlled sourceMappingURL
  - Path traversal in source map auto-loading
- Bundled with Next.js; fixing requires Next.js upgrade

### Known Issue (Per CLAUDE.md)

The Next.js and PostCSS vulnerabilities are **knowingly deferred**. Per project documentation:
> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

**Recommendation:** Do NOT run `npm audit fix` or `npm audit fix --force` without architectural review and product decision on Next.js upgrade.

---

## Recent Changes & Git Status

**Last 5 Commits:**
```
463092a - Monitor: website health check 2026-09-22
c13a80f - Monitor: scheduled website health check (2026-09-22)
c096f2e - Merge branch 'claude/movena-legal-cleanup-2855ea'
d23478c - Use vl@movena.io, and swap in the new dashboard screenshot
b0d7269 - website: monitor check - 38 pages built, 5 security vulnerabilities flagged
```

**Working Tree Status:** ✅ Clean
- No uncommitted changes
- No staged changes
- No untracked files

**Branch Status:** Up to date with origin/main

---

## Check Results Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | All 38 routes compiled successfully |
| **Type Checking** | ✅ PASS | No TypeScript errors |
| **Lint** | ⚠️ WARNING | 2 non-critical image optimization warnings |
| **Dependencies** | ⚠️ VULNERABLE | 5 known vulnerabilities (4 high, 1 critical) |
| **Git Status** | ✅ CLEAN | No uncommitted changes |
| **Working Tree** | ✅ CLEAN | Ready for deployment |

---

## Recommendations

### Immediate (Code Quality)
1. ⚠️ **Update SplitSection.tsx** (Lines 93, 96)
   - Convert `<img>` elements to `next/image` Image component
   - Priority: Medium (performance optimization, non-blocking)

### Strategic (Security)
2. 📋 **Product Decision Required:** Plan Next.js v13 → v16+ upgrade
   - Resolves 1 critical + 4 high vulnerabilities
   - Breaking change requiring architectural review
   - Currently deferred per CLAUDE.md

### Maintenance
3. 🚫 **Do NOT run npm audit fix** without upgrade plan
   - Would attempt to bump Next.js to v16.3.6 (breaking change)
   - Must be a deliberate product decision, not automated

---

## Environment & Build Details

- **Node Version:** Check locally (`node -v`)
- **NPM Version:** Check locally (`npm -v`)
- **Next.js Version:** 13.5.11 (current, intentionally held)
- **React Version:** ^18
- **TypeScript Version:** ^5
- **Build System:** Next.js App Router
- **Tailwind CSS:** ^3
- **Package Lock:** Locked (package-lock.json)

**Dependencies:** 422 packages installed (via node_modules)

---

## Monitor Run Details

- **Run Time:** 2026-09-23T02:07:08Z
- **Build Command:** `npm run build`
- **Lint Command:** `npm run lint`
- **Audit Command:** `npm audit`
- **Status Check:** `git status`
- **All Checks:** Completed successfully

---

*Report generated by website monitor system. History available via `git log reports/monitor-latest.md`.*
