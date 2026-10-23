# Website Monitor Report

**Timestamp:** 2026-10-23T04:04:56Z  
**Overall Status:** ⚠️ Warning

---

## Build Check: ✅ Passed

Next.js build completed successfully.

**Details**:
- Compilation: Successful
- Static pages generated: 61/61
- Type checking: Passed
- No build errors or blocking issues

**Output Summary**:
```
✓ Compiled successfully
✓ Type checking completed
✓ Generating static pages (61/61)
```

Routes compiled include:
- Home pages (en, da)
- About pages
- Blog index and 21 blog posts
- Contact, demo booking, savings calculator
- Various feature landing pages
- API endpoints for calculator, contact, and demo forms

---

## Lint Check: ⚠️ Failed (80+ Errors)

ESLint validation did not pass. Exit code: 1

**Summary**:
- Errors: 73 (unescaped entities in generated components)
- Warnings: 2 (deprecated `<img>` tag usage)

**Details**:

**Errors (Unescaped Entities)**: All errors are of type `react/no-unescaped-entities` where apostrophe characters (`'`) need HTML entity escaping.

Affected files (all auto-generated components):
- `components/generated/BeregnerEn.tsx` (2 errors)
- `components/generated/BlogIndexDa.tsx` (1 error)
- `components/generated/BlogIndexEn.tsx` (1 error)
- `components/generated/BlogPostEn.tsx` (7 errors)
- `components/generated/BookDemoEn.tsx` (3 errors)
- `components/generated/ErrorEn.tsx` (2 errors)
- `components/generated/FaaAllePengeneHjemEn.tsx` (5 errors)
- `components/generated/ForsideDa.tsx` (1 error)
- `components/generated/ForsideEn.tsx` (15 errors)
- `components/generated/HavStyrPaaDagenEn.tsx` (8 errors)
- `components/generated/NotFoundEn.tsx` (1 error)
- `components/generated/OmOsEn.tsx` (2 errors)
- `components/generated/PrivatlivspolitikEn.tsx` (3 errors)
- `components/generated/VindFlereFlytningerEn.tsx` (8 errors)

**Warnings (2 total)**:
- `components/SplitSection.tsx` (2 warnings): Using `<img>` instead of Next.js `<Image />` component

**Note**: The lint errors are in auto-generated components (under `components/generated/`), suggesting these are output from a code generator that needs configuration updates to properly escape HTML entities.

---

## Security Check: ❌ Critical Issues Found

npm audit identified **16 vulnerabilities** (1 critical, 12 high, 3 moderate).

### Critical Severity (1):

**Next.js (0.9.9 - 16.3.0-preview.10)** - Multiple security advisories
- Server-Side Request Forgery in Server Actions
- Denial of Service in image optimization
- Information exposure in dev server
- Cache key confusion for image optimization
- Authorization bypass vulnerability
- Improper middleware redirect handling
- Content injection in image optimization
- Race condition to cache poisoning
- Multiple DoS vulnerabilities with Server Components
- Self-hosted DoS via Image Optimizer
- HTTP request deserialization DoS
- HTTP request smuggling in rewrites
- Unbounded next/image disk cache growth
- XSS in CSP nonces
- Cache poisoning via RSC cache collisions
- Cross-site scripting in beforeInteractive scripts
- Server-side request forgery with WebSocket upgrades
- Middleware/Proxy bypass in i18n
- Server Action payload issues
- SSRF in rewrites
- Remote Code Execution vulnerabilities (Windows, AVIF, SVG handling)

**Known Issue**: Per CLAUDE.md, Next.js is intentionally pinned at current version. Upgrading requires major version upgrade (Next.js 13→16), which is a product decision, not a monitor action.

### High Severity (12):

1. **brace-expansion** - Quadratic-time expansion DoS, nested recursion DoS
2. **braces** - Stack-exhaustion DoS via nested patterns
3. **minimatch** - ReDoS vulnerabilities (repeated wildcards, extglobs)
4. **PostCSS** - XSS via unescaped `</style>`, arbitrary file read, path traversal
5. **source-map-js** - Event-loop DoS via source-map offsets

**Dependency Chain Example**:
- braces → chokidar → tailwindcss (and transitive to @tailwindcss/typography)
- minimatch → globby → @typescript-eslint/typescript-estree → @typescript-eslint/parser

### Moderate Severity (3):

1. **postcss-selector-parser** - Quadratic complexity in flat selector parsing
2. **js-yaml** (pinned override)
3. **nanoid** (pinned override)

**Available Fixes**:
- `npm audit fix` can address some issues (brace-expansion, minimatch, source-map-js)
- `npm audit fix --force` required for others (requires Tailwind and Next.js upgrades)

**Note**: Per CLAUDE.md, `npm audit fix --force` is NOT recommended as it would upgrade Next.js and PostCSS beyond intentional pinning.

---

## Dependencies: ✅ Installed

- Total packages: 418 (after audit)
- Installation completed: Yes
- Dependencies ready for build/dev: Yes

---

## Summary

| Check | Status | Severity |
|-------|--------|----------|
| Build | ✅ Pass | — |
| Lint | ⚠️ Fail | Medium (auto-generated code) |
| Security | ❌ Fail | Critical (Next.js), High (transitive deps) |
| Dependencies | ✅ Ready | — |

**Alert Level**: ⚠️ **Warning**

**Key Findings**:
1. Build and runtime are healthy - Next.js compiles successfully with proper type checking
2. Linting fails on auto-generated components due to unescaped HTML entities - appears to be a code generation configuration issue
3. Security audit shows multiple vulnerabilities, but the critical Next.js vulnerabilities are intentionally pinned per project decision documented in CLAUDE.md
4. Transitive dependencies have high-severity issues accessible via `npm audit fix` or `npm audit fix --force`

**Recommended Actions**:
- Fix code generation output to properly escape HTML entities in generated components (would resolve 73 lint errors)
- Evaluate optional: `npm audit fix` for non-breaking dependency updates
- Major version upgrade decision for Next.js 16+ is a product-level decision, not a routine monitor action
