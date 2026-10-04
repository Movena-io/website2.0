# Website Monitor Report

**Run Timestamp:** 2026-10-04T00:00:00Z  
**Overall Status:** ❌ **Failed** – Build passes; Lint errors block deployment

---

## Summary

The website builds successfully with all 61 static pages generated without errors. However, the linting step fails with 71 errors in auto-generated component files. All errors are related to unescaped single quotes in JSX strings within components in the `components/generated/` directory. These linting errors must be resolved before deployment.

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

**Status:** 71 errors, 2 warnings (Exit code 1)

### Errors: Unescaped apostrophes in auto-generated components

All errors are in `components/generated/*` files. The generation process is not properly escaping HTML entities in JSX:

**Error pattern:** `'` should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

**Affected files (16 auto-generated components):**
- `BlogIndexDa.tsx` (1 error)
- `BlogIndexEn.tsx` (1 error)
- `BlogPostEn.tsx` (7 errors)
- `BookDemoEn.tsx` (3 errors)
- `ErrorEn.tsx` (2 errors)
- `FaaAllePengeneHjemDa.tsx` (1 error)
- `FaaAllePengeneHjemEn.tsx` (3 errors)
- `ForsideDa.tsx` (1 error)
- `ForsideEn.tsx` (18 errors – highest concentration)
- `HavStyrPaaDagenEn.tsx` (4 errors)
- `NotFoundEn.tsx` (1 error)
- `OmOsEn.tsx` (2 errors)
- `PrivatlivspolitikEn.tsx` (3 errors)
- `VindFlereFlytningerEn.tsx` (10 errors)

**Root cause:** Auto-generation process (CMS/content builder) does not escape HTML entities in React strings.

### Warnings: Image optimization (non-blocking)

**File:** `components/SplitSection.tsx` (lines 93, 96)

Using native `<img>` instead of Next.js `<Image>` component. Minor LCP and bandwidth impact. (2 warnings)

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

### 🔴 Priority 1: Fix Lint Errors (BLOCKING)

**Severity:** Critical | **Effort:** Medium | **Timeline:** Immediate

Fix 71 unescaped apostrophes in auto-generated components – this blocks deployment:

1. Identify the generation source (CMS, content builder, markdown processor, code generator)
2. Update generator to escape HTML entities in JSX strings (`'` → `&apos;` or `&rsquo;`)
3. Regenerate all affected components in `components/generated/`
4. Run `npm run lint` to verify all 71 errors are resolved
5. Minor: Replace `<img>` with Next.js `<Image>` in `SplitSection.tsx` (lines 93, 96) to fix warnings

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
| **Timestamp** | 2026-10-04T00:00:00Z |
| **Build** | ✅ PASS (61 pages, 3 APIs) |
| **Lint** | ❌ FAIL (71 errors, 2 warnings) |
| **Security** | ⚠️ WARNING (13 vulns: 1 crit, 12 high) |
| **Dependencies** | 417 packages installed |
| **Node.js** | Working |
| **Overall** | ❌ FAILED |

## Reproduce

```bash
npm install
npm run build    # Build check
npm run lint     # Lint check
npm audit        # Security check
```
