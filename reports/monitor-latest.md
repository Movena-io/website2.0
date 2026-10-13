# Website Monitor Report

**Run Time:** 2026-10-13 04:15 UTC  
**Overall Status:** ❌ **CRITICAL** - Build passes but linting fails and critical security vulnerabilities present

---

## Summary

The Movena website project has critical issues that require attention:

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASS | Next.js build compiled successfully (61 static pages generated) |
| **Lint** | ❌ FAIL | 60+ ESLint errors in generated components |
| **Security** | ❌ CRITICAL | 20 vulnerabilities (1 critical, 12 high, 7 moderate) |

---

## Build Check

✅ **PASSED**

The Next.js application built successfully:
- Compiled without errors
- Generated 61 static pages
- Route sizes within normal ranges
- Middleware compiled at 27.9 kB

### Build Output
```
✓ Compiled successfully
✓ Generating static pages (61/61)
Route sizes: 80.6 kB First Load JS shared by all
```

---

## Lint Check

❌ **FAILED** - 60+ errors

**Issue:** Unescaped entities in generated React components  
**Rule:** `react/no-unescaped-entities`  
**Solution:** Must escape single quotes as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

### Affected Files (Sample)
- `components/generated/BeregnerEn.tsx` - 2 errors
- `components/generated/BlogIndexDa.tsx` - 1 error
- `components/generated/BlogIndexEn.tsx` - 1 error
- `components/generated/BlogPostEn.tsx` - 7 errors
- `components/generated/BookDemoEn.tsx` - 3 errors
- `components/generated/ErrorEn.tsx` - 2 errors
- `components/generated/FaaAllePengeneHjemEn.tsx` - 5 errors
- `components/generated/ForsideDa.tsx` - 1 error
- `components/generated/ForsideEn.tsx` - 17 errors
- `components/generated/HavStyrPaaDagenEn.tsx` - 8 errors
- `components/generated/NotFoundEn.tsx` - 1 error
- `components/generated/OmOsEn.tsx` - 2 errors
- `components/generated/PrivatlivspolitikEn.tsx` - 3 errors
- `components/generated/VindFlereFlytningerEn.tsx` - 8 errors

**Additional Warnings:** 2 Next.js warnings about using `<img>` instead of `<Image />` component in `SplitSection.tsx`

**Note:** All errors are in generated components. These files appear to be auto-generated from content sources. Regeneration may be needed with escaped entity fixes in the source generation process.

---

## Security Audit

❌ **CRITICAL** - 20 Vulnerabilities Detected

### Critical Severity (1)
- **next** (0.9.9 - 16.3.0-preview.10): Multiple critical vulnerabilities including SSRF, authorization bypass, cache poisoning, DoS, XSS, and RCE issues
  - 34 distinct CVEs/advisories identified
  - Note: Per project CLAUDE.md, this package is knowingly at current version; Next.js 13→16 upgrade is a product decision

### High Severity (12)
- **brace-expansion** - Quadratic-time expansion causes CPU DoS (2 distinct CVEs)
- **braces** - Stack-exhaustion DoS via nested patterns
- **minimatch** - ReDoS via repeated wildcards and nested extglobs (3 CVEs)
- **postcss** (≤8.5.22) - XSS, arbitrary file read, path traversal in source maps (4 CVEs)
  - Note: Nested in next; fixing requires Next.js upgrade
- **postcss-selector-parser** (<7.1.6) - Quadratic complexity in flat selector parsing
- **source-map-js** - Event-loop DoS through indexed source-map offsets

### Moderate Severity (7)
- **postcss-selector-parser** - Overlapping with high-severity issues
- **sprintf-js** - DoS through unbounded precision specifiers
- Additional dependencies of vulnerable packages

### Dependency Chain
Most vulnerabilities trace back to:
- **next** → **postcss** (nested)
- **tailwindcss** → **chokidar** → **braces** → **micromatch** → **fast-glob** → **globby** → **@typescript-eslint**

### Remediation Notes
- ⚠️ `npm audit fix --force` would upgrade to Next.js 16.4.0 (breaking change)
- ⚠️ Project guidelines state Next.js 13→16 upgrade is a product decision, not a monitor action
- Current versions are acknowledged in CLAUDE.md as intentionally pinned
- Scoped overrides (like `js-yaml@3` and `nanoid@3` in package.json) are the recommended approach for transitive dependencies

---

## Recommendations

### Immediate Actions
1. **Lint Errors** - Regenerate components with proper entity escaping:
   - Review the component generation source
   - Ensure single quotes are escaped in templates/output
   - Re-run generation and commit fixed files

2. **Build Warnings** - Replace `<img>` with Next.js `<Image />` in:
   - `components/SplitSection.tsx` (lines 93, 96)

### Long-term Actions
1. **Security Upgrades** - Schedule Next.js 13→16 upgrade as a product decision
2. **Dependency Monitoring** - Continue using scoped overrides for transitive vulnerabilities
3. **CI Integration** - Consider adding `npm audit` to CI/CD with allowlist for known pinned packages

---

## Environment

- Node.js npm version: Current (with notice of npm v12.2.0 available)
- Dependencies: 418 packages installed and audited
- Last `npm install`: 51s, updated dependencies as needed
