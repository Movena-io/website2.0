# Website Health Monitor Report

**Run Date:** 2026-10-16 at 14:32 UTC
**Overall Status:** ❌ **CRITICAL** — Build successful, but linting errors and critical security vulnerabilities require attention

---

## Summary

The website build completes successfully, but the project has significant issues that need remediation:

- **Build:** ✅ Successful
- **Linting:** ❌ Failed (57 errors, 2 warnings)
- **Security:** ❌ Critical (20 vulnerabilities: 1 critical, 12 high, 7 moderate)

---

## 1. Build Status: ✅ PASSED

The Next.js application compiled successfully with no build errors.

```
✓ Compiled successfully
✓ Generating static pages (61/61)
```

**Routes Generated:** 42 static pages, 3 dynamic routes, 3 API endpoints
**Build Size:** 80.6 kB shared JS, routes ranging from 0 B to 42.7 kB

---

## 2. Linting Status: ❌ FAILED

**Error Count:** 57 errors + 2 warnings
**Exit Code:** 1

### Critical Findings:

**Unescaped HTML Entities (57 errors)** — The character `'` (apostrophe) appears unescaped in multiple generated components and should be replaced with HTML entities like `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected Components:**
- `components/generated/BeregnerEn.tsx` — 2 errors
- `components/generated/BlogIndexDa.tsx` — 1 error
- `components/generated/BlogIndexEn.tsx` — 1 error
- `components/generated/BlogPostEn.tsx` — 7 errors
- `components/generated/BookDemoEn.tsx` — 3 errors
- `components/generated/ErrorEn.tsx` — 2 errors
- `components/generated/FaaAllePengeneHjemEn.tsx` — 5 errors
- `components/generated/ForsideDa.tsx` — 1 error
- `components/generated/ForsideEn.tsx` — 17 errors
- `components/generated/HavStyrPaaDagenEn.tsx` — 9 errors
- `components/generated/NotFoundEn.tsx` — 1 error
- `components/generated/OmOsEn.tsx` — 2 errors
- `components/generated/PrivatlivspolitikEn.tsx` — 3 errors
- `components/generated/VindFlereFlytningerEn.tsx` — 8 errors

**Note:** These are all in generated components. The generation pipeline or source data needs to be updated to properly escape entities.

### Warnings:

**Image Optimization (2 warnings)** — Using `<img>` instead of `<Image />` from `next/image`:
- `components/SplitSection.tsx:93` — Could result in slower LCP and higher bandwidth
- `components/SplitSection.tsx:96` — Same issue

---

## 3. Security Status: ❌ CRITICAL

**Total Vulnerabilities:** 20 (1 critical, 12 high, 7 moderate)

### ⚠️ CRITICAL SEVERITY:

1. **Next.js: Unauthenticated Remote Code Execution on Windows-hosted servers**
   - Package: `next` (>=13.4.0 <15.5.24)
   - CVE: CWE-22 (Path Traversal)
   - CVSS: 9.0 (Critical)
   - URL: https://github.com/advisories/GHSA-p293-qw3h-jr36

2. **Next.js: Unauthenticated Remote Code Execution in Image Optimization API**
   - Package: `next` (>=10.0.0 <15.5.24)
   - CVE: CWE-1395
   - URL: https://github.com/advisories/GHSA-2xp9-vwfh-vxw4

### 🔴 HIGH SEVERITY (12):

- **Next.js:** Multiple Server-Side Request Forgery, XSS, and unauthorized disclosure vulnerabilities
- **PostCSS:** Path traversal and information disclosure via sourceMappingURL
- **Brace-expansion:** DoS via uncontrolled recursion (stack exhaustion)
- **Minimatch:** ReDoS vulnerability
- **Glob:** Related to minimatch vulnerabilities
- **@typescript-eslint/typescript-estree & parser:** Minimatch dependency vulnerabilities

### 🟡 MODERATE SEVERITY (7):

- **@tailwindcss/typography:** Postcss-selector-parser and tailwindcss transitive vulnerabilities
- **argparse:** sprintf-js vulnerability via gray-matter
- **PostCSS:** XSS via unescaped `</style>` in CSS output
- **Next.js:** Additional moderate-severity issues

---

## 4. Dependencies

**Installed:** 418 packages
**Available Updates:** npm 10.9.4 → 12.2.0

### Known Issues:

Per CLAUDE.md: Next.js (13) and its nested PostCSS are knowingly left on current versions. A major upgrade to Next.js 15+ would be required to patch the critical RCE vulnerabilities, which is a product decision outside the scope of this monitor.

Similarly, `npm audit fix` and `npm update` are avoided because they rewrite ~87 packages far beyond what has an advisory.

---

## Recommendations

### High Priority:

1. **Fix Linting Errors:** Update the component generation pipeline to properly escape HTML entities (apostrophes). This blocks the build in CI if linting is enforced.

2. **Address Critical Vulnerabilities:** Evaluate upgrading Next.js from v13 to v15+ to patch:
   - GHSA-p293-qw3h-jr36 (RCE on Windows)
   - GHSA-2xp9-vwfh-vxw4 (RCE in Image API)
   
   This is a major version upgrade that requires product decision and testing.

### Medium Priority:

3. **Image Optimization:** Replace `<img>` tags with `<Image />` component in `SplitSection.tsx` for better performance.

4. **Review Transitive Dependencies:** While direct dependencies are pinned as noted in CLAUDE.md (`js-yaml@3`, `nanoid@3`), the PostCSS vulnerabilities cascade through Next.js. Consider scoped overrides in `package.json` for critical transitive deps.

### Monitoring:

- Continue running this monitor on a scheduled basis to catch new advisories
- Build remains functional; deployments can proceed if linting errors are handled separately
- Track Next.js release notes for security patches to v15+

---

**Generated by Claude Code — website-monitor agent**
