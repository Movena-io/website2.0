# Health Monitor Report — website2.0

**Run Time:** 2026-09-15 at time of execution  
**Overall Status:** ⚠️ **Warning** (Buildable with Known Security Debt)

**Summary:** Build and lint pass successfully. Dependencies audit reveals 5 vulnerabilities (1 critical, 4 high) that are intentionally pinned per CLAUDE.md. Site is operationally buildable but requires Next.js major version upgrade to resolve security issues.

---

## Quick Status

| Check | Result | Status |
|-------|--------|--------|
| **npm install** | ✅ Fresh (423 packages) | Ready |
| **npm run build** | ✅ Success (40 pages, 0 errors) | Healthy |
| **npm run lint** | ⚠️ 3 warnings | Non-critical |
| **npm audit** | ❌ 5 vulnerabilities | Known/Pinned |

---

## Build: ✅ Success

**Command:** `npm run build`  
**Result:** Compiled successfully with zero errors

**Compilation Results:**
- ✓ All 40 pages generated across both locales (en, da)
- ✓ TypeScript validation passed
- ✓ Zero errors during optimization and page generation

**Generated Routes:**
- `/[locale]` — Home (19.1 kB)
- `/[locale]/blog` — Blog index (208 B)
- `/[locale]/blog/[slug]` — 21 article pages
- `/[locale]/contact` — Contact form (1.72 kB)
- `/[locale]/savings-calculator` — Calculator (16.3 kB)
- `/[locale]/privacy` — Privacy policy (186 B)
- `/[locale]/terms` — Terms (186 B)
- `/api/calculator/submit` — API endpoint
- `/api/contact` — Contact API
- Middleware layer (27 kB)

**Bundle Sizes:**
- Shared JS: 80.6 kB
- Locale pages: 169 kB (First Load)
- Blog pages: 115 kB (First Load)
- Status: Optimal

---

## Lint: ⚠️ Warnings Only

**Command:** `npm run lint`  
**Result:** 0 errors, 3 warnings

**Warnings (Non-Critical):**

| File | Line | Rule | Suggestion |
|------|------|------|-----------|
| components/MetaPixel.tsx | 54 | @next/next/no-img-element | Use `<Image />` from next/image |
| components/SplitSection.tsx | 93 | @next/next/no-img-element | Use `<Image />` from next/image |
| components/SplitSection.tsx | 96 | @next/next/no-img-element | Use `<Image />` from next/image |

**Assessment:** All warnings are performance recommendations (optimize image loading). Not errors. These refactorings are optional and can be addressed in a future maintenance cycle.

---

## Dependencies: ❌ 5 Vulnerabilities

**Command:** `npm audit`  
**Packages Audited:** 423 (all up to date)  
**Vulnerabilities Found:** 5 total (1 critical, 4 high)

---

### Critical Severity (1)

#### Next.js (versions 0.9.9–16.3.0-preview.10)
**Project Status:** Pinned at v13.x (intentional per CLAUDE.md)

**Issues:** 31 documented CVEs including:
- GHSA-p293-qw3h-jr36: Unauthenticated RCE on Windows (CVSS 9.0)
- GHSA-2xp9-vwfh-vxw4: Unauthenticated RCE in Image Optimization with AVIF
- GHSA-fr5h-rqp8-mj6g: SSRF in Server Actions
- GHSA-8h8q-6873-q5fj: Denial of Service with Server Components
- GHSA-3x4c-7xq6-9pq8: Unbounded next/image disk cache growth
- GHSA-3g8h-86w9-wvmq: Middleware/Proxy cache poisoning
- GHSA-ffhc-5mcf-pf4q: XSS in App Router with CSP nonces
- 24 additional cache poisoning, authorization bypass, and DoS vulnerabilities

**Resolution:** Requires Next.js 13→16+ major version upgrade (breaking change). This is a documented product decision per CLAUDE.md and not a monitor action.

---

### High Severity (4)

#### minimatch ReDoS Vulnerabilities (3)
**Location:** @typescript-eslint/typescript-estree → minimatch  
**Versions Affected:** 9.0.0–9.0.6

**Issues:**
- GHSA-3ppc-4f35-3m26: ReDoS via repeated wildcards with non-matching literal
- GHSA-7r86-cg39-jmmj: ReDoS via multiple non-adjacent GLOBSTAR segments
- GHSA-23c5-xmqv-rm74: ReDoS via nested extglobs generating catastrophic backtracking

**Scope:** Development dependency only (TypeScript ESLint parsing). No production runtime impact.

**Fix:** Available via `npm audit fix` (non-breaking, safe)

---

#### PostCSS (≤8.5.22)
**Location:** Nested within Next.js  
**Issues:** 4 high-severity vulnerabilities
- GHSA-qx2v-qp2m-jg93: XSS via unescaped `</style>` in CSS output
- GHSA-6g55-p6wh-862q: Arbitrary file read via sourceMappingURL  
- GHSA-fxqj-rqcc-2cmp: Incomplete fix for sourceMappingURL arbitrary reads
- GHSA-r28c-9q8g-f849: Path traversal in source map auto-loading

**Scope:** Cannot be patched independently (nested Next.js dependency)

**Fix:** Only via Next.js 16.3.5+ upgrade

---

## Vulnerability Tree

```
Critical Vulnerabilities (1)
└─ next@13.x (pinned intentionally)
   ├─ [31+ CVEs: RCE, SSRF, DoS, cache poisoning, XSS]
   └─ nested: postcss@8.5.x
      └─ [4 vulnerabilities: arbitrary file read, XSS, path traversal]

High Vulnerabilities (4)
├─ minimatch@9.0.0-9.0.6 (3 ReDoS vulns)
│  └─ @typescript-eslint/typescript-estree
│     └─ @typescript-eslint/parser (dev dependency)
│
└─ postcss@8.5.22 (4 vulns)
   └─ next@13.x (cannot patch independently)
```

---

## CLAUDE.md Policy

From project instructions (npm audit section):

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next.js 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run npm audit fix --force."

**Status:** These are documented technical debt, consciously accepted pending formal Next.js upgrade decision. Monitor reports status; enforcement requires product team approval.

---

## Risk Analysis

**Severity Level:** Critical (Documented & Intentional)

| Context | Risk | Notes |
|---------|------|-------|
| **Windows Deployment** | CRITICAL | GHSA-p293-qw3h-jr36 (CVSS 9.0): Unauthenticated RCE |
| **Image Optimization** | HIGH | GHSA-2xp9-vwfh-vxw4: AVIF-triggered RCE |
| **Server Actions** | HIGH | GHSA-fr5h-rqp8-mj6g: SSRF in Server Actions |
| **Cache Layer** | HIGH | GHSA-3g8h-86w9-wvmq: Middleware cache poisoning |
| **Disk Space** | MEDIUM | GHSA-3x4c-7xq6-9pq8: Unbounded cache growth |
| **CSS Processing** | MEDIUM | PostCSS XSS and file read via sourceMappingURL |
| **Build/Lint** | LOW | minimatch ReDoS only; no runtime production impact |

---

## Actions

### ❌ Do Not
- `npm audit fix --force` — Forces Next.js 13→16 upgrade without product approval (breaking change)
- `npm update next` — Same breaking change as above

### ⚠️ Optional (Non-Breaking)
- `npm audit fix` — Patches minimatch ReDoS only
  - Resolves 3 high-severity dev-dependency issues
  - Low risk, non-breaking
  - Does NOT resolve Next.js/PostCSS issues
  - Good for developers concerned about build-time security

### ✅ Recommended (Product Decision)
- **Schedule Next.js 13→16+ Upgrade**
  - Resolves all 5 vulnerabilities
  - Requires full regression testing of all routes
  - Major version bump (breaking changes likely)
  - Should be prioritized on product roadmap

### 🎯 Nice-to-Have (Low Priority)
- Replace 3 `<img>` tags with `<Image />` component
  - Files: components/MetaPixel.tsx:54, components/SplitSection.tsx:93, components/SplitSection.tsx:96
  - Effort: ~15 minutes
  - Benefit: Better LCP, reduced bandwidth

---

## Metrics

| Check | Result | Status |
|-------|--------|--------|
| Build Compilation | Success | ✅ |
| Type Validation | Pass | ✅ |
| Lint Errors | 0 | ✅ |
| Lint Warnings | 3 | ⚠️ |
| Pages Generated | 40/40 | ✅ |
| Packages Audited | 423 | ✅ |
| **Vulnerabilities** | **5** | **❌** |
| — Critical | 1 | ❌ |
| — High | 4 | ❌ |

---

## Conclusion

**Overall Status:** ⚠️ **Warning** (Operationally Buildable, Known Security Debt)

**Detailed Assessment:**

- **Build:** ✅ Healthy. Compilation successful, all 40 pages across en/da locales generated, zero errors.
- **Code Quality:** ⚠️ Minor warnings only. 3 non-critical recommendations for image optimization.
- **Security:** ❌ Critical vulnerabilities present. Next.js 13.x has 31+ CVEs (RCE, SSRF, XSS, DoS, cache poisoning). PostCSS adds 4 more.
- **Status:** Vulnerabilities are **documented and intentionally pinned** per CLAUDE.md policy. Not a monitor enforcement issue; requires product team decision on Next.js major version upgrade.
- **Production Ready:** Site builds and functions correctly. Deployment carries documented security risk. Upgrade should be prioritized.

**Key Takeaway:** The site is operationally stable for immediate use but requires planning for Next.js 13→16+ upgrade to eliminate all vulnerabilities. Current state is accepted technical debt pending product decision.
