# Website2.0 Health Monitor

**Run Time:** 2026-09-15 11:57 UTC | **Overall Status:** ⚠️ Warning

---

## Executive Summary

The website2.0 project **builds and lints successfully** with no compilation errors. All 40 pages generate correctly across both locales (en, da). Code quality is good with only 3 minor linting warnings (image optimization recommendations).

**However:** The project contains 5 known vulnerabilities in dependencies, with 1 critical and 4 high severity. These are **intentionally pinned** per CLAUDE.md policy—Next.js is locked at v13.x because upgrading requires a major version bump that is a product decision, not a monitor action.

**Recommendation:** Continue normal operations. Schedule Next.js 13→16+ upgrade as a separate product initiative.

---

## Check Results Summary

| Check | Result | Status |
|:------|:-------|:-------|
| **npm install** | 423 packages, all up to date | ✅ Pass |
| **npm run build** | 40 pages generated, 0 errors | ✅ Pass |
| **npm run lint** | 0 errors, 3 warnings | ⚠️ Warning |
| **npm audit** | 5 vulnerabilities (1 critical, 4 high) | ❌ Fail |

---

## Build: ✅ Healthy

All pages compiled successfully with zero errors.

### Build Metrics
- **Pages Generated:** 40/40
- **Locales:** en, da (both complete)
- **Compilation Errors:** 0
- **TypeScript Validation:** Pass
- **Bundle Size (Shared):** 80.6 kB
- **First Load JS:** 109–169 kB depending on route

### Generated Routes
- `/[locale]` — Landing page (19.1 kB)
- `/[locale]/blog` — Blog index (208 B)
- `/[locale]/blog/[slug]` — 21 article pages
- `/[locale]/contact` — Contact form (1.72 kB)
- `/[locale]/savings-calculator` — Calculator (16.3 kB)
- `/[locale]/privacy` — Privacy policy (186 B)
- `/[locale]/terms` — Terms (186 B)
- `/api/calculator/submit` — Serverless endpoint
- `/api/contact` — Serverless endpoint
- Middleware — 27 kB

---

## Lint: ⚠️ 3 Warnings (Non-Critical)

All linting issues are performance recommendations, not errors.

### Warnings Detail

| File | Line | Issue | Recommendation |
|:-----|:----:|:------|:----------------|
| components/MetaPixel.tsx | 54 | Using `<img>` element | Use `<Image />` from next/image for LCP optimization |
| components/SplitSection.tsx | 93 | Using `<img>` element | Use `<Image />` from next/image for LCP optimization |
| components/SplitSection.tsx | 96 | Using `<img>` element | Use `<Image />` from next/image for LCP optimization |

**Assessment:** Low priority. These are optional refactorings that improve performance. No functional issues.

---

## Audit: ❌ 5 Vulnerabilities (Known & Pinned)

**Total Found:** 5 vulnerabilities (1 critical, 4 high)  
**Intentional Status:** Per CLAUDE.md policy, Next.js is pinned at v13.x. Fixing requires major version upgrade.

### Critical Severity (1)

#### next@13.x — 31+ Security Advisories

**Pinned By:** CLAUDE.md (product decision, not monitor action)

**Key Vulnerabilities:**
- **GHSA-p293-qw3h-jr36** — Unauthenticated RCE on Windows (CVSS 9.0)
- **GHSA-2xp9-vwfh-vxw4** — Unauthenticated RCE in Image Optimization (AVIF)
- **GHSA-fr5h-rqp8-mj6g** — Server-Side Request Forgery in Server Actions
- **GHSA-8h8q-6873-q5fj** — Denial of Service with Server Components (multiple variants)
- **GHSA-3x4c-7xq6-9pq8** — Unbounded next/image disk cache growth (storage exhaustion)
- **GHSA-3g8h-86w9-wvmq** — Middleware/Proxy cache poisoning
- **GHSA-ffhc-5mcf-pf4q** — Cross-site scripting via CSP nonces in App Router
- **GHSA-6g55-p6wh-862q** — Arbitrary file read via CSS sourceMappingURL
- Plus 23 additional cache poisoning, authorization bypass, information disclosure, and DoS issues

**Fix Required:** Next.js 13→16+ upgrade (major version breaking change)

---

### High Severity (4)

#### 1. minimatch (9.0.0–9.0.6) — 3 ReDoS Vulnerabilities

**Location:** @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch

**Issues:**
- **GHSA-3ppc-4f35-3m26** — ReDoS via repeated wildcards
- **GHSA-7r86-cg39-jmmj** — ReDoS via multiple GLOBSTAR segments
- **GHSA-23c5-xmqv-rm74** — ReDoS via nested extglobs (catastrophic backtracking)

**Scope:** Development-only dependency (ESLint parsing). No production runtime impact.

**Fix:** Available via `npm audit fix` (non-breaking, safe to apply)

---

#### 2. postcss (≤8.5.22) — 4 Vulnerabilities

**Location:** Nested within Next.js (cannot be patched independently)

**Issues:**
- **GHSA-qx2v-qp2m-jg93** — XSS via unescaped `</style>` tag in CSS output
- **GHSA-6g55-p6wh-862q** — Arbitrary file read via sourceMappingURL parameter
- **GHSA-fxqj-rqcc-2cmp** — Incomplete fix for sourceMappingURL arbitrary reads
- **GHSA-r28c-9q8g-f849** — Path traversal via source map auto-loading

**Scope:** Coupled to Next.js version. Cannot update independently.

**Fix:** Only available via Next.js 16.3.5+ upgrade

---

## Vulnerability Dependency Tree

```
Critical (1)
└─ next@13.x [PINNED—PRODUCT DECISION]
   ├─ [31 CVEs: RCE, SSRF, XSS, DoS, cache poisoning, auth bypass]
   └─ postcss@8.5.x (nested, cannot patch separately)
       └─ [4 CVEs: XSS, arbitrary file read, path traversal]

High (4)
├─ minimatch@9.0.0-9.0.6 [FIXABLE]
│  ├─ [3 ReDoS via combinatorial backtracking]
│  └─ @typescript-eslint/typescript-estree
│     └─ @typescript-eslint/parser [dev dependency only]
│
└─ postcss@8.5.22 (duplicate entry—nested in next)
   └─ [4 CVEs—same as above]
```

---

## Policy Reference

From `/home/user/website2.0/CLAUDE.md`:

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."

**Interpretation:** The vulnerabilities are documented and accepted as technical debt. Monitor reports the status; final upgrade decision belongs to the product team.

---

## Recommended Actions

### ❌ Do Not Run
- `npm audit fix --force` — Triggers unwanted Next.js 13→16 upgrade
- `npm update next` — Same effect: breaking major version change

### ⚠️ Optional (Non-Breaking)
```bash
npm audit fix
```
- Fixes only minimatch ReDoS (3 high-severity dev-dependency issues)
- Safe to apply; does not modify core dependencies
- Does NOT resolve Next.js or PostCSS vulnerabilities
- Good for developers concerned about build-time security posture

### ✅ Recommended (Product Roadmap)
Schedule and plan **Next.js 13→16+ major version upgrade**
- Resolves all 5 vulnerabilities in one operation
- Requires full regression testing of all 40 pages and both locales
- May involve breaking API changes (requires code review)
- Should be prioritized on product roadmap

### 🎯 Nice-to-Have (Low Effort)
Refactor 3 image elements to use Next.js Image component:
- `components/MetaPixel.tsx:54`
- `components/SplitSection.tsx:93`
- `components/SplitSection.tsx:96`
- Effort: ~15 minutes
- Benefit: Improved LCP and reduced bandwidth usage

---

## Risk Context

| Scenario | Risk Level | Notes |
|:---------|:-----------|:------|
| **Windows Deployment** | CRITICAL | RCE vector (GHSA-p293-qw3h-jr36) active in v13.x |
| **Image Optimization** | HIGH | AVIF processing can trigger RCE (GHSA-2xp9-vwfh-vxw4) |
| **Server Actions** | HIGH | SSRF attacks possible (GHSA-fr5h-rqp8-mj6g) |
| **Cache Poisoning** | HIGH | Middleware redirects can be exploited (GHSA-3g8h-86w9-wvmq) |
| **Disk Space** | MEDIUM | Unbounded image cache can exhaust storage (GHSA-3x4c-7xq6-9pq8) |
| **CSS Processing** | MEDIUM | Source maps can leak files; CSS can be XSS'd (PostCSS) |
| **Build/Lint Time** | LOW | minimatch ReDoS only affects development (non-production) |

**Deployment Posture:** Site functions correctly but carries documented security risk. Upgrade should be prioritized.

---

## Metrics & Status

| Metric | Value | Status |
|:-------|:-----:|:-------|
| Build Compilation | Pass | ✅ |
| Type Checking | Pass | ✅ |
| Linting Errors | 0 | ✅ |
| Linting Warnings | 3 | ⚠️ |
| Pages Generated | 40/40 | ✅ |
| Packages Audited | 423 | ✅ |
| **Vulnerabilities Total** | **5** | **❌** |
| — Critical | 1 | ❌ |
| — High | 4 | ❌ |
| — Production Impact | Documented | ⚠️ |

---

## Conclusion

**Status:** ⚠️ **Warning** (Operationally Buildable, Known Security Debt)

**Breakdown:**
- ✅ **Build:** Healthy. Zero compilation errors. All 40 pages and both locales generated successfully.
- ✅ **Code Quality:** Minor linting warnings only (3 image optimization recommendations).
- ❌ **Security:** 5 vulnerabilities present (1 critical, 4 high). Intentionally pinned per CLAUDE.md.
- ⚠️ **Production Ready:** Site builds and functions correctly. Deployment carries documented risk.

**Key Takeaway:** The website is operationally stable for immediate deployment. The 5 vulnerabilities are known technical debt accepted pending Next.js 13→16+ major version upgrade, which is a product team decision. Monitor status; do not override policy with --force flags.
