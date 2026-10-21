# Website Monitor Report

**Run Timestamp:** 2026-10-21T18:30:00Z (scheduled)  
**Overall Status:** ❌ **CRITICAL** — Lint errors blocking CI, security vulnerabilities requiring attention

---

## Summary

The website build compiles successfully, but linting fails with 84 errors and 2 warnings. Multiple critical security vulnerabilities exist, particularly in Next.js. Dependencies are installed and functional.

| Check | Status | Details |
|-------|--------|---------|
| **Build** | ✅ Pass | Next.js app compiled successfully (18 static pages, 3 API routes) |
| **Lint** | ❌ Failed | 84 errors (unescaped entities in generated components), 2 warnings (img tags) |
| **Security** | ❌ Critical | 20 vulnerabilities: 1 critical, 12 high, 7 moderate |
| **Dependencies** | ✅ Installed | 418 packages (417 added), 154 with funding available |

---

## Build Check ✅

**Status:** Successful  
**Command:** `npm run build`  
**Exit Code:** 0

The Next.js application compiled successfully without errors.

**Key Metrics:**
- Static pages generated: 18
- Server-side routes: 3 API endpoints + middleware
- Middleware size: 27.9 kB
- First Load JS (shared): 80.6 kB
- Localized routes: /en and /da variants for all pages

---

## Lint Check ❌

**Status:** Failed  
**Command:** `npm run lint`  
**Exit Code:** 1

### Summary
- **Errors:** 84 (unescaped entities in generated components)
- **Warnings:** 2 (img tags in SplitSection.tsx)

### Errors (84 unescaped entities)
**Rule:** `react/no-unescaped-entities` — Single quotes must be escaped in JSX text

**Affected files (all in components/generated/):**
- BeregnerEn.tsx (2)
- BlogIndexDa.tsx (1)
- BlogIndexEn.tsx (1)
- BlogPostEn.tsx (7)
- BookDemoEn.tsx (3)
- ErrorEn.tsx (2)
- FaaAllePengeneHjemEn.tsx (5)
- ForsideDa.tsx (1)
- ForsideEn.tsx (20+)
- HavStyrPaaDagenEn.tsx (8)
- NotFoundEn.tsx (1)
- OmOsEn.tsx (2)
- PrivatlivspolitikEn.tsx (3)
- VindFlereFlytningerEn.tsx (8)

**Fix:** Unescaped `'` should be escaped as `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;`.

### Warnings (2)
- `components/SplitSection.tsx:93, 96` — Using `<img>` instead of Next.js `<Image />`

**Note:** All errors are in auto-generated components in `components/generated/`. The generation source should output properly escaped entities.

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

1. **brace-expansion** — CPU DoS via quadratic-time expansion (GHSA-q2hr-2g5m-vwhr)
2. **braces** — Stack-exhaustion DoS via deeply nested patterns (GHSA-vfj7-8cjw-p6xm)
3. **minimatch** — ReDoS vulnerabilities (GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj, GHSA-23c5-xmqv-rm74)
4. **postcss** ≤8.5.22 — XSS via unescaped `</style>` in CSS (GHSA-qx2v-qp2m-jg93)

**Fixable:** Some can be addressed via `npm audit fix` or via `overrides` in package.json (recommended per CLAUDE.md).

### Moderate Severity (7)

Primarily cascade dependencies:
- postcss-nested, postcss-selector-parser (CSS processing)
- fast-glob, globby (build tooling)
- chokidar (watched file events)

---

## Recommendations

### Critical Path
1. **Resolve lint errors** — The 84 unescaped entities in generated components must be fixed. Identify the generation source and update it to output valid JSX, or regenerate the files.
2. **Establish Next.js upgrade timeline** — Document decision and timeline for Next.js 13→16 migration to address 30+ critical/high vulnerabilities.

### For Monitoring
- Next.js upgrade is a product decision (not actionable by monitor)
- Do NOT run `npm audit fix --force` per project instructions

### Optional Improvements
- Patch transitive dependencies via `overrides` in package.json following the pattern used for `js-yaml@3` and `nanoid@3`
- Replace `<img>` tags with Next.js `<Image />` in SplitSection.tsx

---

**Report generated by website-monitor agent**
