# Website Monitor Report

**Run Timestamp:** 2026-10-03T00:00:00Z  
**Overall Status:** ⚠️ **Warning** – Build passes; Lint errors and critical security vulnerabilities present

---

## Summary

The website builds successfully with all 61 static pages generated without errors. However, linting revealed 60+ errors in auto-generated components (unescaped apostrophes), and security audit detected 13 vulnerabilities including critical Next.js issues. Per CLAUDE.md, Next.js upgrade to 16+ is a product decision and not an automatic fix.

---

## Build Check: ✅ PASS

**Status:** Successful compilation

```
✓ Compiled successfully
✓ Generating static pages (61/61)
✓ Finalizing page optimization
```

The Next.js 13 build completes successfully and generates:
- **61 static pages** (SSG, bilingual en/da)
- **3 API routes** (calculator, contact, demo)
- **1 Middleware** (27.8 kB)
- **Largest bundle:** savings-calculator at 58.9 kB (169 kB First Load JS)
- **Shared JS:** 80.6 kB across all pages

---

## Lint Check: ❌ FAIL

**Status:** 60+ errors, 2 warnings (Exit code 1)

### Errors: Unescaped apostrophes in auto-generated components

All errors are in `components/generated/*` files. The generation process is not properly escaping HTML entities in JSX:

**Error pattern:** `'` should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Affected files (14 auto-generated components):**
- `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`
- `BookDemoEn.tsx`, `ErrorEn.tsx`
- `FaaAllePengeneHjemDa.tsx`, `FaaAllePengeneHjemEn.tsx`
- `ForsideDa.tsx`, `ForsideEn.tsx` (most errors)
- `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`
- `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`
- `VindFlereFlytningerEn.tsx`

**Root cause:** Auto-generation process (CMS/content builder) does not escape HTML entities in React strings.

### Warnings: Image optimization (non-blocking)

**File:** `components/SplitSection.tsx` (lines 93, 96)

Using native `<img>` instead of Next.js `<Image>` component. Minor LCP and bandwidth impact.

---

## Security Check: ❌ CRITICAL

**Status:** 13 vulnerabilities (1 critical, 12 high)

### 🔴 Critical: Next.js (32+ CVEs)

**Package:** `next` (affects 0.9.9-16.3.0-preview.10)

Known vulnerabilities include:
- **SSRF** in Server Actions
- **DoS** in image optimization & Server Components
- **Authorization bypass** and **cache poisoning**
- **XSS** in App Router with CSP nonces
- **Remote Code Execution** on Windows with Image Optimization
- **Middleware/Proxy bypass** in i18n routing
- **HTTP request smuggling** in rewrites
- **Information exposure** in dev server

### 🟠 High: Transitive Dependencies (12 CVEs)

| Package | Vulnerability | Severity | Fix Option |
|---------|---|---|---|
| `brace-expansion` | DoS via quadratic expansion | High | `npm audit fix` |
| `minimatch` 9.0.0-9.0.6 | ReDoS in pattern matching | High | `npm audit fix` |
| `braces` | Stack-exhaustion DoS | High | `npm audit fix --force` (breaking) |
| `postcss` ≤8.5.22 | XSS, path traversal, file read | High | Requires Next.js 16+ |

### ⚠️ Known Constraints (per CLAUDE.md)

- Next.js and PostCSS are **knowingly pinned** on current versions
- **Product decision required** for Next.js 13 → 16+ migration
- `npm audit fix --force` **NOT recommended** (breaks 12 packages)
- Use `overrides` in `package.json` for transitive patches instead

---

## Recommendations

### 🔴 Priority 1: Fix Lint Errors

**Severity:** High | **Effort:** Medium | **Timeline:** Next sprint

Fix 60+ unescaped apostrophes in auto-generated components:

1. Find the generation source (CMS, content builder, markdown processor)
2. Update generator to escape HTML entities (`'` → `&apos;` or `&rsquo;`)
3. Regenerate all affected components
4. Add pre-commit hook to validate generated files pass linting
5. Minor: Replace `<img>` with Next.js `<Image>` in `SplitSection.tsx` (lines 93, 96)

### 🔴 Priority 2: Security Vulnerabilities (Product Decision)

**Severity:** Critical | **Effort:** Major | **Timeline:** Requires planning

Next.js upgrade is a product-level decision (per CLAUDE.md):

1. **Next.js 13 → 16+ migration plan:**
   - 2-4 weeks estimated effort
   - Breaking changes in routing, middleware, API handling
   - Requires full regression testing (61 pages + 3 API endpoints)
   - Will resolve all critical vulnerabilities + 12 transitive CVEs

2. **Interim patches (safe):**
   - Run `npm audit fix` for `brace-expansion` and `minimatch` (low-risk)
   - Add `overrides` in `package.json` for other transitive vulns (pattern: `js-yaml@3`, `nanoid@3`)

3. **Do NOT run:**
   - ❌ `npm audit fix --force` (breaks 12 packages)
   - ❌ `npm update <pkg>` (rewrites ~87 packages)

### 🟡 Priority 3: Monitoring

- Schedule next monitor run to track lint fixes
- Track Next.js upgrade planning status
- Subscribe to Next.js CVE feed

---

## Run Metrics

| Metric | Status |
|--------|--------|
| **Timestamp** | 2026-10-03T00:00:00Z |
| **Build** | ✅ PASS (61 pages, 3 APIs) |
| **Lint** | ❌ FAIL (60+ errors, 2 warnings) |
| **Security** | ❌ CRITICAL (13 vulns: 1 crit, 12 high) |
| **Dependencies** | 418 packages installed |
| **Node.js** | Working |
| **Overall** | ⚠️ Warning |

## Reproduce

```bash
npm install
npm run build    # Build check
npm run lint     # Lint check
npm audit        # Security check
```
