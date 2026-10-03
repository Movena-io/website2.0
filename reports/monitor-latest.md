# Website Health Check Report

**Run Timestamp:** 2026-10-03  
**Overall Status:** WARNING

---

## Executive Summary

The Movena marketing website is **buildable but requires attention**. The Next.js build succeeds and generates all 61 static pages successfully. However, the project has significant lint violations (70 errors) and known security vulnerabilities in Next.js and its dependencies. The security issues require a major version upgrade (Next 13 → 16) which is a product decision beyond the scope of automated fixes.

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

**Status:** 70 errors, 2 warnings

### Error Summary: 68 unescaped single quote errors

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
- `ForsideEn.tsx` (18 errors)
- `HavStyrPaaDagenEn.tsx` (4 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (10 errors)

**Note:** These files are auto-generated (likely from a content management system or template generator). The errors suggest the generation process is not properly escaping HTML entities in React strings.

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

**Package:** `next` (version constraint: 0.9.9 - 16.3.0-preview.10)

Next.js has 34 known CVEs affecting the current version:
- Server-Side Request Forgery (SSRF) in Server Actions
- Denial of Service in image optimization
- Authorization bypass vulnerabilities
- Cache poisoning vulnerabilities
- Cross-site scripting (XSS) in App Router applications
- Multiple middleware/proxy bypass issues
- Remote Code Execution on Windows-hosted servers
- Information exposure in dev server

### High Severity Vulnerabilities (12)

| Package | CVEs | Issue |
|---------|------|-------|
| `brace-expansion` | 3 | Quadratic-time expansion and recursive DoS |
| `braces` | 1 | Stack-exhaustion DoS via nested patterns |
| `minimatch` | 3 | Regular expression DoS (ReDoS) |
| `postcss` | 4 | XSS, arbitrary file read, path traversal |

### Known Constraints

Per `CLAUDE.md`:
- Next.js and nested postcss are **knowingly left on their current versions**
- Fixing requires a major upgrade: Next 13 → Next 16
- This is a **product decision**, not an automated fix
- `npm audit fix --force` is **not recommended** (breaking changes)

### Transitive Dependencies

Most vulnerabilities are transitive dependencies through Next.js ecosystem:
- `braces` → `chokidar` → `tailwindcss`
- `minimatch` → `globby` → `@typescript-eslint/typescript-estree`

---

## Recommendations

### Priority 1: Fix Lint Errors (Code Quality)

The 68 unescaped quote errors must be fixed in the content generation pipeline:

1. **Investigate the generation source:** The `components/generated/*` files suggest an automated generation process. Find where these components are generated (likely a CMS, content builder, or template engine).

2. **Fix the generator:** Update the generator to properly escape HTML entities in React string contexts. Change single quotes in content strings to use HTML entities.

3. **Regenerate components:** Once the generator is fixed, regenerate all affected components.

4. **Minor fix:** Update `SplitSection.tsx` to use Next.js `<Image>` component instead of `<img>` tags for better performance.

### Priority 2: Address Security Vulnerabilities (Strategic)

This requires a product-level decision:

1. **Plan Next.js upgrade:** Schedule a migration from Next 13 to Next 16 (or latest stable)
   - Test thoroughly for breaking changes
   - Update TypeScript and ESLint configurations
   - Update Tailwind CSS if needed

2. **Update transitive dependencies:** Once Next.js is upgraded, the dependent package versions will resolve automatically.

3. **Interim mitigation:** These are build-time and dev-time dependencies for the most part. Production impact depends on deployment method and whether these dependencies are exposed.

### Priority 3: Monitor Generated Components

Ensure future content generation:
- Validates HTML entities in strings
- Includes lint checks in the generation pipeline
- Tests generated components before committing

---

## Test Commands

Reproduce this report with:
```bash
npm run build    # Build check
npm run lint     # Lint check
npm audit        # Security check
```

---

**Last Updated:** 2026-10-03  
**Next.js Version:** 13.x  
**Static Pages:** 61 generated successfully  
**Build Status:** HEALTHY  
**Code Quality:** NEEDS ATTENTION (lint errors)  
**Security:** NEEDS ATTENTION (known version constraint)
