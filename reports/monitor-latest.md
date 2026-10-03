# Website Health Check Report

**Run Timestamp:** 2026-10-03 UTC  
**Overall Status:** ❌ **CRITICAL** – Build passes; Lint and security issues require immediate attention

---

## Executive Summary

The Movena marketing website **builds successfully** but has **65 lint violations** and **13 security vulnerabilities** (1 critical, 12 high). The generated components contain unescaped HTML entities, and Next.js 13 has known security vulnerabilities. Per CLAUDE.md, the Next.js upgrade is a product-level decision pending major version migration planning.

---

## Build Check: PASS ✓

**Status:** Successful compilation

The Next.js 13 build completes successfully and generates:
- 61 static pages (SSG)
- 3 API routes
- 1 Middleware
- Total First Load JS: ~169 kB (savings-calculator is largest at 58.9 kB)

**Output:**
```
✓ Compiled successfully
✓ Generating static pages (61/61)
✓ Finalizing page optimization
```

**Key Metrics:**
- Largest page bundle: savings-calculator at 58.9 kB (169 kB First Load JS)
- All routes (en, da locales) built correctly
- No build errors or warnings
- Middleware: 27.8 kB
- Shared JS: 80.6 kB

---

## Lint Check: FAIL ✗

**Status:** 65 errors, 2 warnings

### Error Summary: 65 unescaped single quote errors

These are all in auto-generated component files (`components/generated/*`) with unescaped single quotes that should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

**Affected files (14 components):**
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (9 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemDa.tsx` (1 error)
- `FaaAllePengeneHjemEn.tsx` (3 errors)
- `ForsideDa.tsx` (1 error)
- `ForsideEn.tsx` (22 errors)
- `HavStyrPaaDagenEn.tsx` (4 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (11 errors)

**Root Cause:** These files are auto-generated (likely from a content management system or template generator). The generation process is not properly escaping HTML entities in React strings. All 65 errors follow the same pattern: unescaped apostrophes in JSX content.

### Warning Summary: 2 image optimization warnings

**File:** `components/SplitSection.tsx` (lines 93, 96)

```
Warning: Using `<img>` could result in slower LCP and higher bandwidth.
Consider using `<Image />` from `next/image` to automatically optimize images.
```

**Impact:** Minor performance optimization opportunity; not a breaking issue.

---

## Security Check: FAIL ✗

**Status:** 13 vulnerabilities (12 high, 1 critical)

### Critical Vulnerability (1)

**Package:** `next` (versions 0.9.9 - 16.3.0-preview.10)

Next.js has **33+ known CVEs** affecting the current version, including:
- **Server-Side Request Forgery (SSRF)** in Server Actions
- **Denial of Service** in image optimization and Server Components
- **Authorization bypass** vulnerabilities
- **Cache poisoning** vulnerabilities
- **Cross-site scripting (XSS)** in App Router applications with CSP nonces
- **Middleware/Proxy bypass** issues affecting i18n routing
- **Remote Code Execution** on Windows-hosted servers with Image Optimization
- **Information exposure** in dev server due to missing origin verification
- HTTP request smuggling in rewrites
- Unbounded disk cache growth in image optimizer

### High Severity Vulnerabilities (12)

| Package | Issue | Fix Status |
|---------|-------|-----------|
| `brace-expansion` ≤1.1.20 | Quadratic-time expansion and recursive DoS | `npm audit fix` available |
| `braces` * | Stack-exhaustion DoS via nested patterns | `npm audit fix --force` (breaking change) |
| `minimatch` 9.0.0-9.0.6 | Regular expression DoS (ReDoS) | `npm audit fix` available |
| `postcss` ≤8.5.22 | XSS, arbitrary file read, path traversal | `npm audit fix --force` (breaking change) |

### Known Constraints

Per `CLAUDE.md`:
- Next.js and nested postcss are **knowingly left on their current versions**
- Fixing requires a major upgrade: Next 13 → Next 16
- This is a **product decision**, not an automated fix
- `npm audit fix --force` is **not recommended** (breaking changes)

### Dependency Chain Analysis

The vulnerabilities are embedded in the Next.js ecosystem and its transitive dependencies:

**brace-expansion** (nested in `@typescript-eslint/typescript-estree`)
- Path: `@typescript-eslint/typescript-estree` → `globby` → `fast-glob` → `micromatch` → `brace-expansion`

**braces, minimatch, fast-glob** (nested in Tailwind)
- Path: `tailwindcss` → `chokidar` → `braces` → (stack of vulnerable modules)
- Also affects: `@tailwindcss/typography` (would break if upgraded alone)

**postcss** (nested in `next`)
- Path: `next` → `postcss` (can only be fixed with Next.js upgrade to 16.3.8+)

---

## Recommendations

### Priority 1: Fix Lint Errors (Code Quality)

**Severity:** High | **Effort:** Medium | **Timeline:** This sprint

The 65 unescaped quote errors must be fixed before the next build passes CI:

1. **Investigate the generation source:** The `components/generated/*` files suggest an automated generation process. Find where these components are generated (likely a CMS, content builder, or markdown processor).

2. **Fix the generator:** Update the generator to properly escape HTML entities when inserting content into React components:
   - Replace `'` with `&apos;` or `&rsquo;` (depending on context)
   - Consider using HTML entity encoder library in the generation pipeline

3. **Regenerate components:** Once the generator is fixed, regenerate all affected components.

4. **Lint-before-commit:** Add a pre-commit hook or CI check to validate generated components pass linting.

5. **Minor optimization:** Update `SplitSection.tsx` to use Next.js `<Image>` component instead of `<img>` tags (2 warnings in lines 93, 96).

### Priority 2: Security Vulnerabilities (Strategic/Product Decision)

**Severity:** Critical | **Effort:** Major | **Timeline:** Requires product planning

Per `CLAUDE.md`, Next.js and nested postcss are knowingly left on current versions pending a major upgrade decision:

1. **Next.js 13 → 16+ Migration:** This is a breaking change and product decision:
   - Estimated effort: 2-4 weeks depending on codebase complexity
   - Breaking changes in routing, middleware, and API handling
   - Requires thorough testing of all 61 routes and 3 API endpoints
   - Will auto-resolve transitive vulnerabilities in braces, minimatch, postcss

2. **Interim patches (low-risk):**
   - `brace-expansion` and `minimatch` fixes available via `npm audit fix` (low risk)
   - Add scoped `overrides` in `package.json` similar to existing `js-yaml` and `nanoid` pins

3. **Do NOT run:**
   - `npm audit fix --force` (breaks 12 packages)
   - `npm update` (rewrites ~87 packages)

### Priority 3: Ongoing Monitoring

- Schedule next monitor run to track progress on lint errors
- Track Next.js upgrade planning status
- Monitor new vulnerability disclosures in Next.js CVE feed

---

## Test Commands

Reproduce this report with:
```bash
npm run build    # Build check
npm run lint     # Lint check
npm audit        # Security check
```

---

## Run Details

| Metric | Value |
|--------|-------|
| **Last Updated** | 2026-10-03 UTC |
| **Next.js Version** | 13.x |
| **Node Modules** | 417 packages (418 audited) |
| **Static Pages** | 61 generated successfully |
| **Build Status** | ✅ HEALTHY |
| **Lint Status** | ❌ 65 errors, 2 warnings |
| **Security Status** | ❌ 13 vulnerabilities (1 critical, 12 high) |
| **Overall Status** | ❌ CRITICAL |

---

**Commands to reproduce this report:**
```bash
npm install      # Dependencies
npm run build    # Build check
npm run lint     # Lint check  
npm audit        # Security check
```
