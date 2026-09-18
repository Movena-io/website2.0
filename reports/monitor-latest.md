# website2.0 Health Monitor

**Run Timestamp:** 2026-09-18 18:15:00 UTC  
**Overall Status:** ⚠️ **ISSUES DETECTED** – Build & Lint Pass, Security Vulnerabilities Present (Known/Intentional)

---

## Summary

The website2.0 project **builds and lints successfully** with no compilation errors. All 40 static pages generate correctly. Linting produces **3 non-blocking warnings** about using native `<img>` instead of Next.js Image component. Security audit reveals **5 vulnerabilities: 1 critical and 4 high severity**. The critical vulnerability is in Next.js (33+ advisories); the high-severity vulnerabilities are in transitive dependencies (minimatch and postcss). Per CLAUDE.md project policy, Next.js vulnerabilities are **intentionally deferred** as they require a major version upgrade (13 → 16+), which is a product decision.

**Key Findings:**
- ✅ Build passes without errors (40 static pages generated)
- ⚠️ 3 lint warnings (non-blocking, performance optimization suggestions)
- ❌ 5 security vulnerabilities (1 critical Next.js, 4 high minimatch/postcss)
- ✅ All 423 packages audited and installed successfully
- 📋 Next.js vulnerabilities intentionally deferred pending product decision

---

## Build Status: ✅ Successful

**Result:** Compilation completed without errors

- ✅ All 40 static pages generated successfully
- ✅ Type checking passed with no issues
- ✅ No build errors detected
- ✅ Output size optimized

**Routes Generated:**
- Home pages: `/[locale]` (en, da) — 19.1 kB
- Blog index: `/[locale]/blog` — 208 B
- Blog articles: `/[locale]/blog/[slug]` — 21 articles, 209 B each
- Pages: contact (1.72 kB), privacy (186 B), savings-calculator (16.3 kB), terms (186 B)
- API endpoints: `/api/calculator/submit`, `/api/contact`
- Static assets: robots.txt, sitemap.xml
- Middleware: 27 kB

**Asset Summary:**
- Shared JS (First Load): 80.6 kB
  - chunks/472: 27.5 kB
  - chunks/fd9d: 51.1 kB
  - main-app: 230 B
  - webpack: 1.79 kB

---

## Lint Status: ⚠️ Warnings Only (No Errors)

**Result:** 3 warnings found, 0 errors, 0 blocking issues

**Issues Detected:**

| File | Line | Rule | Issue |
|------|------|------|-------|
| `components/MetaPixel.tsx` | 54 | `@next/next/no-img-element` | Using `<img>` tag instead of `<Image />` |
| `components/SplitSection.tsx` | 93 | `@next/next/no-img-element` | Using `<img>` tag instead of `<Image />` |
| `components/SplitSection.tsx` | 96 | `@next/next/no-img-element` | Using `<img>` tag instead of `<Image />` |

**Assessment:** Low severity — performance optimization recommendations. Using Next.js `<Image />` component improves LCP and reduces bandwidth through automatic optimization. Non-blocking suggestions; builds succeed despite warnings.

---

## Security Audit: ❌ 5 Vulnerabilities (1 Critical, 4 High)

**Audit Results:**
```
npm audit
423 packages audited
5 vulnerabilities: 1 critical, 4 high
```

### Critical Severity (1)

#### **next (13.5.11)** — 33+ Security Advisories

- **Package:** `next` v13.5.11
- **Location:** `node_modules/next`
- **Total Advisories:** 33+ critical and high severity

**Key Critical/High Issues:**
- Unauthenticated Remote Code Execution on Windows servers
- Unauthenticated RCE in Image Optimization API (AVIF handling)
- Server-Side Request Forgery (SSRF) in Server Actions
- Server-Side Request Forgery in rewrites
- Denial of Service in Image Optimization and Server Components
- Cache poisoning in Image API and middleware
- Authorization bypass
- Middleware bypass (i18n)
- XSS via CSP nonces and beforeInteractive scripts
- Information disclosure in dev server
- HTTP request smuggling
- Unbounded disk cache growth

**Product Status (per CLAUDE.md):** ⚠️ **Intentionally Deferred**
> "Next.js and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. Do not run `npm audit fix --force`."

**Available Fix:** `npm audit fix --force` → next@16.3.5 (breaking change)

**Status:** No action required per project policy. Next.js upgrade is a product decision requiring planning and cross-team coordination.

---

### High Severity (4)

#### **1. minimatch (9.0.0 - 9.0.6)** — 3 ReDoS Vulnerabilities

**Affected Package:** `@typescript-eslint/typescript-estree → minimatch`

**Vulnerabilities:**
- ReDoS via repeated wildcards with non-matching literal
- ReDoS via GLOBSTAR combinatorial backtracking
- ReDoS via nested `*()` extglobs

**Impact:** Low in production (dev/build-time only). Could cause build hangs with malicious glob patterns.

**Recommendation:** Add scoped override in `package.json` (similar to existing `js-yaml@3` and `nanoid@3` entries) to pin minimatch to safe version (≥9.1.0), then run `npm install`.

---

#### **2. postcss (≤8.5.22)** — 4 High-Severity Vulnerabilities

**Affected Package:** `next → postcss` (nested dependency, not independently upgradeable)

**Vulnerabilities:**
- Arbitrary file read via sourceMappingURL
- Path traversal via source map auto-loading
- Incomplete fix for sourceMappingURL issue
- XSS via unescaped `</style>` in CSS stringify

**Status:** Cannot be patched independently; requires Next.js major version upgrade to 16+ (which upgrades PostCSS).

**Recommendation:** Resolution tied to Next.js upgrade timeline.

---

## Dependency Summary

```
npm install
423 packages audited
├─ 5 vulnerabilities (1 critical, 4 high)
├─ 154 packages with available funding
└─ All dependencies up to date
```

- **Total Packages:** 423
- **Vulnerable Packages:** 3 (next, minimatch, postcss)
- **Status:** All production dependencies current

---

## Recommendations by Priority

### 🔴 Priority 1: Critical — Next.js Major Version Upgrade

**Status:** ⚠️ Acknowledged product decision in CLAUDE.md. **Do not run `npm audit fix --force`** without explicit approval.

**Issue:** Next.js 13 contains 33 security advisories including multiple critical RCE and SSRF vulnerabilities.

**Required Action:** Establish timeline and plan for Next.js 13 → 16+ upgrade (breaking change)
- Comprehensive testing and validation required
- Code updates may be necessary for breaking changes
- Coordinate with product and engineering teams
- This is a **product decision**, not routine maintenance

**Interim Risk Management:**
- Continue vulnerability monitoring (this report)
- Implement defense-in-depth: WAF, strict CSP policies, request validation
- Disable or restrict Server Actions usage where possible
- Monitor Image Optimizer for exploit attempts

**Do Not:** Do not attempt `npm audit fix --force` as it would unilaterally upgrade Next.js with potential breaking changes.

---

### 🟡 Priority 2: High — Minimatch Transitive Dependency (Dev-Only)

**Status:** ✅ Fixable independently without major upgrades.

**Issue:** Dev/build-time dependency with 3 ReDoS vulnerabilities. Low production impact.

**Recommended Approach (per CLAUDE.md):**
Add minimatch override to `package.json`:
```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": "^9.1.0"
  }
}
```
Then run `npm install`. This avoids `npm audit fix` rewriting ~87 unrelated packages.

---

### 🟢 Priority 3: Code Quality — Lint Warnings

**Status:** ✅ Non-blocking, low priority optimization.

**Found:** 3 warnings about using `<img>` instead of `<Image />` component:
- `components/MetaPixel.tsx:54`
- `components/SplitSection.tsx:93`
- `components/SplitSection.tsx:96`

**Benefit:** Improves LCP score and reduces bandwidth through automatic image optimization.

---

## Test Results Summary

| Check | Command | Status | Details |
|-------|---------|--------|---------|
| Dependencies | `npm install` | ✅ Pass | 423 packages audited, up to date |
| Build | `npm run build` | ✅ Pass | All 40 static pages generated, zero errors |
| Linting | `npm run lint` | ⚠️ Warn | 3 non-blocking warnings, 0 errors |
| Security | `npm audit` | ❌ Critical | 5 vulnerabilities (1 critical in Next.js, 4 high in minimatch/postcss) |

---

## Overall Assessment

**Build Health:** ✅ Excellent  
**Code Quality:** ⚠️ Good (minor optimization suggestions)  
**Security Posture:** ❌ Critical vulnerabilities present (intentionally deferred)  

**Conclusion:** The website builds and deploys successfully with no blockers. All 40 localized pages render correctly. Vulnerabilities in Next.js and PostCSS are acknowledged as deferred product decisions requiring major version upgrades. Development dependency vulnerabilities (minimatch) are fixable with targeted overrides per CLAUDE.md guidelines. Monitor run completed successfully.

---

**Report generated:** 2026-09-18 18:15:00 UTC (automated monitor run)  
**View history:** `git log reports/monitor-latest.md`  
**Project instructions:** See `/home/user/website2.0/CLAUDE.md` for Next.js upgrade policy and dependency patching guidelines
