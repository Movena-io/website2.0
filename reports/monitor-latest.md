# Website Monitor Report

**Run Timestamp**: 2026-10-26 UTC  
**Overall Status**: ❌ **CRITICAL** — Build passes, but linting fails and security vulnerabilities present

---

## Summary

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ PASSED | Next.js build completed successfully, 63 static pages generated |
| **Lint** | ❌ FAILED | 78 errors, 2 warnings in generated components |
| **Security** | ❌ CRITICAL | 9 vulnerabilities: 1 critical, 6 high, 2 moderate |

---

## Build Check ✅

**Result**: PASSED

Next.js build completed successfully without errors. All 63 static pages were generated and optimized.

**Key Metrics**:
- Routes compiled: 63 pages
- Build time: ~45 seconds
- First Load JS: 80.6 kB (shared by all pages)
- No compilation errors

**Build Output Highlights**:
- Middleware: 27.9 kB
- Largest route: `/[locale]` at 156 kB First Load JS
- Multiple SSG and static routes properly configured

---

## Lint Check ❌

**Result**: FAILED — Exit code 1

**Error Summary**:
- Total issues: 80 (78 errors + 2 warnings)
- All errors are in generated component files (`components/generated/*`)
- Errors: Unescaped entities (`react/no-unescaped-entities`) — single quotes in JSX text
- Warnings: 2 instances in `SplitSection.tsx` recommending `<Image />` over `<img>`

**Affected Files** (Generated Components):
- `BeregnerEn.tsx` (2 errors)
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (7 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemEn.tsx` (5 errors)
- `ForsideDa.tsx` (1 error)
- `ForsideEn.tsx` (17 errors)
- `HavStyrPaaDagenEn.tsx` (8 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (8 errors)

**Manual File Issues**:
- `SplitSection.tsx:93, 96` — 2 warnings about `<img>` elements (consider Next.js `<Image />`)

**Note**: All lint errors are in auto-generated component files. These are generated files in `components/generated/` directory and should be re-generated with proper entity escaping.

---

## Security Check ❌

**Result**: CRITICAL — 9 vulnerabilities found (1 critical, 6 high, 2 moderate)

**Critical Vulnerabilities** (1):

1. **Next.js 0.9.9 - 16.3.0-preview.10** — Critical severity
   - 31 documented vulnerabilities including:
     - Server-Side Request Forgery (SSRF) in Server Actions and rewrites
     - Remote Code Execution (RCE) on Windows-hosted servers, Image Optimization API (AVIF/SVG)
     - Denial of Service in App Router and Server Components
     - Cache poisoning vulnerabilities
     - Authorization bypass
     - Cross-site scripting (CSP nonces, beforeInteractive scripts)
     - HTTP request smuggling and deserialization attacks
     - Unauthenticated disclosure of internal endpoints
     - Middleware/Proxy bypass in Pages Router with i18n
   - Fix requires: `npm audit fix --force` (breaking change to Next 16.4.3)
   - **Status**: Acknowledged in CLAUDE.md — Next.js 13→16 upgrade is a product decision, knowingly kept on current version

**High Severity Vulnerabilities** (6):

1. **brace-expansion** — DoS via quadratic-time expansion and uncontrolled recursion
   - Multiple recursion stack exhaustion attacks
   - Locations: `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`, root
   - Fix available via `npm audit fix`

2. **minimatch 9.0.0-9.0.6** — ReDoS (Regular Expression Denial of Service)
   - Multiple ReDoS vectors via GLOBSTAR segments and extglobs
   - Location: `@typescript-eslint/typescript-estree` dependency chain
   - Fix available via `npm audit fix`

3. **postcss ≤8.5.22** — XSS and information disclosure
   - Unescaped `</style>` in CSS stringify output
   - Arbitrary file read via attacker-controlled `sourceMappingURL`
   - Path traversal in source map auto-loading
   - Location: `node_modules/next/node_modules/postcss`
   - Fix requires: `npm audit fix --force` (breaking change to Next 16.4.3)

4. **source-map-js 1.0.0-1.2.1** — Event-loop DoS
   - Denial of service via indexed source-map section offsets
   - Fix available via `npm audit fix`

**Moderate Severity Vulnerabilities** (2):

1. **postcss-selector-parser <6.1.5** — CPU exhaustion via quadratic complexity in flat selector parsing
   - Affects: `@tailwindcss/typography`, `tailwindcss`, `postcss-nested`
   - Fix available via `npm audit fix --force` (breaking change)

**Dependency Recommendations**:
- Per CLAUDE.md: Do NOT run `npm audit fix --force` or `npm update` — these rewrite ~87 packages
- For transitive dependencies, use `overrides` in `package.json` (like `js-yaml@3` and `nanoid@3`)
- Next.js and postcss versions are knowingly held at current versions pending a product decision to upgrade

---

## Dependency Status

**npm install output**:
- 417 packages added/audited
- 154 packages have available funding
- Deprecation warnings for: rimraf, inflight, glob, @humanwhocodes modules, eslint

**npm version**: Current v10.x (new major v12.2.1 available, not updated per policy)

---

## Recommendations

1. **Immediate**: Regenerate files in `components/generated/` with proper entity escaping to resolve lint errors
   - These appear to be auto-generated files with improper JSX entity handling
   
2. **Short-term**: Address high-severity vulnerabilities in dependency chain:
   - `source-map-js`: Update available via `npm audit fix` (safe, non-breaking)
   - `brace-expansion`: Update available via `npm audit fix` (safe, non-breaking)
   - `minimatch`: Update available via `npm audit fix` (safe, non-breaking)

3. **Long-term**: Evaluate Next.js upgrade pathway
   - Current version 13 has 31 critical/high vulnerabilities
   - Requires product decision for Next.js 13→16 migration
   - This is acknowledged as intentional per CLAUDE.md

---

## Files Changed in This Report

- `reports/monitor-latest.md` — Monitor report (overwritten)

---

*Run by: website-monitor agent | Automated scheduled check*
