# Website Monitor Report

**Run Timestamp:** 2026-10-21T21:04:00Z (automated scheduled check)  
**Overall Status:** 🔴 **CRITICAL** — Build passes, lint fails, security vulnerabilities require attention

---

## Summary

The website build compiles successfully and generates all 61 static pages, but linting fails with 70+ errors and 2 warnings. Multiple critical security vulnerabilities exist in Next.js (known issue, product decision pending).

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Pass | Next.js app compiled successfully (61 static pages, 2 locales) |
| **Lint** | ❌ Failed | 70+ errors (unescaped entities in generated components), 2 warnings (img tags) |
| **Security** | ❌ Critical | 20 vulnerabilities: 1 critical, 12 high, 7 moderate |
| **Dependencies** | ✅ Installed | 418 packages, 20 vulnerabilities found |

---

## Build Check ✅

**Status:** Successful  
**Command:** `npm run build`  
**Exit Code:** 0

The Next.js application compiled successfully without errors. All pages generated correctly.

**Key Metrics:**
- Static pages generated: 61 total (both locales)
- Routes: /en and /da variants for all pages + API endpoints
- API routes: calculator/submit, contact, demo
- Middleware size: 27.9 kB
- First Load JS (shared): 80.6 kB
- Largest route: Savings calculator (24.6 kB)

---

## Lint Check ❌

**Status:** Failed  
**Command:** `npm run lint`  
**Exit Code:** 1

### Summary
- **Errors:** 70+ (unescaped entities in generated components)
- **Warnings:** 2 (img tags in SplitSection.tsx)

### Errors (70+ unescaped entities)
**Rule:** `react/no-unescaped-entities` — Single quotes must be escaped in JSX text

**Affected files (all in components/generated/):**
- BeregnerEn.tsx
- BlogIndexDa.tsx
- BlogIndexEn.tsx
- BlogPostEn.tsx
- BookDemoEn.tsx
- ErrorEn.tsx
- FaaAllePengeneHjemEn.tsx
- ForsideDa.tsx
- ForsideEn.tsx
- HavStyrPaaDagenEn.tsx
- NotFoundEn.tsx
- OmOsEn.tsx
- PrivatlivspolitikEn.tsx
- VindFlereFlytningerEn.tsx

**Pattern:** Apostrophes in text content are not escaped. Must use `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

### Warnings (2)
- `components/SplitSection.tsx:93, 96` — Using `<img>` instead of Next.js `<Image />`

**Note:** All errors are in auto-generated components in `components/generated/`. The generation source (possibly from a CMS or content pipeline) should output properly escaped entities.

---

## Security Audit ❌

**Status:** Failed  
**Command:** `npm audit`  
**Exit Code:** 1

**Summary:** 20 vulnerabilities (1 critical, 12 high, 7 moderate)

### Critical Vulnerability (1)

**Next.js** (affects versions 0.9.9 - 16.3.0-preview.10)

This project uses Next.js 13.x, which has 30+ documented critical and high-severity security issues:

- **Server-Side Request Forgery (SSRF)** in Server Actions (GHSA-fr5h-rqp8-mj6g)
- **Unauthenticated Remote Code Execution (RCE)** on Windows-hosted servers (GHSA-p293-qw3h-jr36)
- **RCE in Image Optimization API** with AVIF files (GHSA-2xp9-vwfh-vxw4)
- **Denial of Service (DoS)** in Image Optimization (GHSA-g77x-44xx-532m)
- **Authorization bypass** vulnerability (GHSA-7gfc-8cq8-jh5f)
- **Cache poisoning** via response body collisions (GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q)
- **Cross-site scripting (XSS)** in beforeInteractive scripts (GHSA-gx5p-jg67-6x7h)
- **XSS via CSP nonces** (GHSA-ffhc-5mcf-pf4q)
- **HTTP request smuggling** in rewrites (GHSA-ggv3-7p47-pfv8)
- **Middleware bypass** in i18n configurations (GHSA-36qx-fr4f-26g5)
- **Information exposure** in dev server (GHSA-3h52-269p-cp9r)
- Unbounded `/next/image` disk cache growth (GHSA-3x4c-7xq6-9pq8)
- And 18 additional high-severity issues

**Fix Path:** Upgrade to Next.js 16.4.2 (major breaking change, requires significant testing)  
**Per CLAUDE.md:** "Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

### High Severity (12)

- **brace-expansion** — CPU DoS via quadratic-time expansion (GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p)
- **braces** — Stack-exhaustion DoS via deeply nested patterns (GHSA-vfj7-8cjw-p6xm)
- **minimatch** — ReDoS vulnerabilities (GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj, GHSA-23c5-xmqv-rm74)
- **postcss** ≤8.5.22 — XSS and source map disclosure (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849)
- **source-map-js** — Event-loop DoS via indexed offsets (GHSA-68fv-2mgg-jv7q)

**Fixable:** `npm audit fix` can resolve some issues, but requires Next.js upgrade for complete resolution. Use `overrides` in package.json for transitive dependency patches (per CLAUDE.md).

### Moderate Severity (7)

- **postcss-selector-parser** < 7.1.6 — Quadratic complexity in selector parsing (GHSA-rj75-hqrm-r3gf)
- **sprintf-js** — DoS via unbounded precision specifiers (GHSA-hp3w-g68c-fv3c)
- Cascade dependencies: postcss-nested, fast-glob, globby, chokidar

---

## Alerts

### 🔴 CRITICAL
- **Next.js Security Vulnerabilities:** 30+ known CVEs affecting versions 0.9.9-16.3.0. Upgrade to v16.4.2+ required for full resolution. This is a documented product decision awaiting team action per CLAUDE.md.

### 🟠 WARNING
- **Lint Errors:** 70+ errors block deployment. Generated components contain unescaped HTML entities that must be fixed before merging any changes.
- **Build Warnings:** `<img>` elements should migrate to Next.js `<Image />` component (non-blocking but recommended).

### ✅ HEALTHY
- Build compiles successfully and generates all 61 static pages without errors.

---

## Recommendations

### Immediate Actions
1. **Fix Lint Errors (High Priority):** 
   - Identify the source generating components in `components/generated/`
   - Either regenerate with proper HTML entity escaping or manually fix the 70+ apostrophe escaping errors
   - All unescaped `'` must become `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`

2. **Next.js Upgrade (Product Decision):**
   - Document timeline for Next.js 13 → 16+ migration to address 30+ security advisories
   - This is a breaking change requiring comprehensive testing; currently scheduled as a future product decision

### Best Practices
- Do NOT run `npm audit fix --force` per CLAUDE.md (will break Next.js version pinning)
- Patch transitive dependencies via `overrides` in `package.json` using the pattern for `js-yaml@3` and `nanoid@3`
- Migrate `<img>` tags to Next.js `<Image />` in `SplitSection.tsx` for improved performance

---

**Report generated at 2026-10-21 21:04:00 UTC**  
**Monitor agent:** website-monitor
