# website2.0 Health Monitor Report

**Run Timestamp:** 2026-09-15 02:15:32 UTC  
**Overall Status:** ⚠️ **Warning** — Build and lint pass; critical security vulnerabilities present (acknowledged technical debt)

---

## Executive Summary

The website2.0 project builds and lints successfully with all 40 static pages generating correctly. **Build: PASS** | **Lint: PASS (3 warnings)** | **Audit: 5 vulnerabilities (1 critical, 4 high)**

Critical vulnerabilities in Next.js 13.x (31+ advisories including RCE, SSRF, XSS, DoS) and PostCSS are acknowledged as intentional technical debt per CLAUDE.md—fixing requires major version upgrade (Next.js 13→16), a product decision outside this monitor's scope. Transitive ReDoS vulnerabilities in minimatch (dev-only) are fixable via scoped override.

**Key Findings:**
- ✅ Build passes: 40 static pages, zero compilation errors
- ⚠️ Lint: 3 non-critical warnings (use `<Image />` for optimization)
- ❌ Security: 5 vulnerabilities (1 critical Next.js, 4 high in minimatch/postcss)
- 📋 Next.js upgrade intentionally deferred per project policy (CLAUDE.md)

---

## Build Status: ✅ PASS — Zero Errors

**Command:** `npm run build`

**Result:** ✅ Compilation successful, all 40 static pages generated

**Details:**
- Type checking: PASS
- Compilation: PASS
- Static page generation: 40/40 complete
- No warnings or errors

**Routes Generated:**
- Locale homes: `/[locale]` (en, da) — 19.1 kB per variant
- Blog index: `/[locale]/blog` — 208 B (both locales)
- Blog articles: 21 posts at `/[locale]/blog/[slug]` — 209 B per page (route template)
- Core pages: contact (1.72 kB), privacy (186 B), savings-calculator (16.3 kB), terms (186 B)
- API routes: `/api/calculator/submit`, `/api/contact`
- SEO: robots.txt, sitemap.xml
- Middleware: 27 kB

**Asset Breakdown:**
- Shared First Load JS: 80.6 kB
  - chunks/472: 27.5 kB
  - chunks/fd9d: 51.1 kB
  - main-app: 230 B
  - webpack runtime: 1.79 kB

✅ **Assessment:** Build is stable and performant with optimized output

---

## Lint Status: ⚠️ PASS WITH 3 WARNINGS — No Errors

**Command:** `npm run lint`

**Result:** 0 errors, 3 warnings (non-blocking)

**Warnings Detected:**

| File | Line | Rule | Message | Impact |
|------|------|------|---------|--------|
| `components/MetaPixel.tsx` | 54 | `@next/next/no-img-element` | Using `<img>` instead of `<Image />` | Performance: LCP, bandwidth |
| `components/SplitSection.tsx` | 93 | `@next/next/no-img-element` | Using `<img>` instead of `<Image />` | Performance: LCP, bandwidth |
| `components/SplitSection.tsx` | 96 | `@next/next/no-img-element` | Using `<img>` instead of `<Image />` | Performance: LCP, bandwidth |

**Assessment:** All warnings are optimization suggestions, not blockers. Using Next.js `<Image />` component with automatic optimization improves Largest Contentful Paint (LCP) and reduces bandwidth. Low priority for sprint planning.

✅ **Recommendation:** Migrate 3 image instances to `next/image` in a future sprint (low effort, good performance gains)

---

## Security Audit: ❌ CRITICAL — 5 Vulnerabilities (1 Critical, 4 High)

**Command:** `npm audit`

**Audit Results:** 423 packages audited → 5 vulnerabilities detected (1 critical, 4 high)

---

### 🔴 CRITICAL Severity: Next.js — 31+ Security Advisories

**Package:** `next` (v13.x)  
**Severity Level:** CRITICAL (multiple high and critical advisories)  
**Current Version:** 13.x  
**Affected Range:** 0.9.9–16.3.0-preview.10

**Known Critical Vulnerabilities (sampling):**

| CVSS | Advisory | Type | Details |
|------|----------|------|---------|
| 9.0 | GHSA-p293-qw3h-jr36 | **RCE** | Unauthenticated Remote Code Execution on Windows servers |
| 7.5+ | GHSA-2xp9-vwfh-vxw4 | **RCE** | Unauthenticated RCE in Image Optimization with AVIF files |
| 7.5 | GHSA-fr5h-rqp8-mj6g | **SSRF** | Server-Side Request Forgery in Server Actions |
| 7.5 | GHSA-4342-x723-ch2f | **SSRF** | SSRF via improper middleware redirect handling |
| 6.1 | GHSA-3h52-269p-cp9r | **Disc.** | Information exposure in dev server (origin verification missing) |
| 6.1 | GHSA-ffhc-5mcf-pf4q | **XSS** | Cross-site scripting via CSP nonces in App Router |
| 6.1 | GHSA-gx5p-jg67-6x7h | **XSS** | XSS in beforeInteractive scripts with untrusted input |
| 6.1+ | GHSA-68g3-v927-f742 | **Cache** | Cache confusion of response bodies |
| 6.1+ | GHSA-9g9p-9gw9-jx7f | **DoS** | DoS via Image Optimizer remotePatterns |
| 6.1+ | GHSA-mwv6-3258-q52c | **DoS** | DoS with Server Components |
| 6.1+ | GHSA-3x4c-7xq6-9pq8 | **DoS** | Unbounded image disk cache growth exhausts storage |

**Total Advisory Count:** 31+ known issues in npm registry for Next.js versions prior to 16.3.5

**Impact Assessment:**
- **Production Risk:** HIGH (RCE on Windows, SSRF, Auth bypass, Cache poisoning)
- **Development Risk:** MEDIUM (Info disclosure in dev server)
- **Attack Vector:** Requires attacker-controlled input (URLs, images, glob patterns)

**Product Status:** ⚠️ **Intentionally Deferred** per CLAUDE.md

> "next and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action. **Do not run `npm audit fix --force`.**"

**Available Fix:** `npm audit fix --force` → next@16.3.5+ (breaking change, major version bump)

**Why Not Fixed Now?**
- Major version upgrade (13 → 16+) is a product decision, not routine maintenance
- Requires comprehensive testing, regression validation, and potential code refactoring
- Breaking changes may require engineering effort across the codebase
- Must be coordinated with product roadmap and sprint planning

**Status:** No action by this monitor. Awaiting product/engineering decision on Next.js upgrade timeline.

---

### 🟠 HIGH Severity: Transitive Dependencies (4 Issues)

#### 1. minimatch (9.0.0–9.0.6) — 3 ReDoS Vulnerabilities

**Nested Path:** `@typescript-eslint/typescript-estree` → `minimatch`

**Vulnerabilities:**

| CVSS | Advisory | Type | Description |
|------|----------|------|-------------|
| 7.5 | GHSA-3ppc-4f35-3m26 | **ReDoS** | Repeated wildcards with non-matching literal cause backtracking |
| 7.5 | GHSA-7r86-cg39-jmmj | **ReDoS** | Multiple non-adjacent GLOBSTAR segments cause combinatorial backtracking |
| 7.5 | GHSA-23c5-xmqv-rm74 | **ReDoS** | Nested `*()` extglobs generate catastrophically backtracking regex |

**Impact:** Dev/build-time only (not production). Could cause build pipeline hangs if processed with malicious glob patterns.

**Affected Dependency Chain:**
```
@typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch
```

**Fix Available:** ✅ Yes, independently fixable

**Recommended Approach:** Add scoped override to `package.json` (following existing pattern for `js-yaml@3` and `nanoid@3`):
```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": ">=9.0.7"
  }
}
```
Then run `npm install`. This avoids `npm audit fix` which rewrites ~87 unrelated packages per CLAUDE.md.

---

#### 2. PostCSS (≤8.5.22) — 4 Information Disclosure & XSS Vulnerabilities

**Nested Path:** `next` → `postcss` (not independently upgradeable)

**Vulnerabilities:**

| CVSS | Advisory | Type | Description |
|------|----------|------|-------------|
| 7.5 | GHSA-6g55-p6wh-862q | **Disc.** | Path traversal via unescaped sourceMappingURL |
| 7.5 | GHSA-r28c-9q8g-f849 | **Disc.** | Path traversal in source map auto-loading |
| 7.5 | GHSA-fxqj-rqcc-2cmp | **Disc.** | Incomplete fix allows arbitrary .map file disclosure |
| 6.1 | GHSA-qx2v-qp2m-jg93 | **XSS** | Unescaped `</style>` in CSS stringify output |

**Impact:** Source map disclosure (dev info leakage) and CSS injection

**Fix Availability:** ❌ Cannot be patched independently

**Reason:** PostCSS is nested within Next.js 13.x and cannot be upgraded without upgrading Next.js to 16+.

**Resolution:** Tied to Next.js 13 → 16 upgrade decision

---

## Dependency Summary

**Installation Status:** ✅ Up to date (423 packages audited)

| Package | Type | Vulnerabilities | Status | Action |
|---------|------|-----------------|--------|--------|
| `next` | Direct | 1 critical, 7+ high | Acknowledged debt | Deferred (product decision) |
| `@typescript-eslint/typescript-estree` | Dev (transitive) | 3 high (via minimatch) | Fixable | Apply scoped override |
| `postcss` | Nested in Next.js | 4 high | Not independent | Fix with Next.js upgrade |
| **All others** | — | 0 | Clean | ✅ |

**Totals:**
- **Total Packages Audited:** 423
- **Vulnerable Packages:** 3
- **Fixable Independently:** 1 (minimatch via override)
- **Requires Major Upgrade:** 2 (Next.js/PostCSS)

---

## Recommendations & Action Plan

### 🔴 PRIORITY 1: Next.js 13 → 16 Major Version Upgrade

**Status:** AWAITING PRODUCT DECISION (intentionally deferred per CLAUDE.md)

**Rationale:** Next.js 13.x contains 31+ known vulnerabilities, including:
- Unauthenticated Remote Code Execution (Windows servers, Image API)
- Server-Side Request Forgery in Server Actions and middleware
- Authorization bypass
- Cache poisoning
- XSS via CSP nonces and untrusted scripts
- Unbounded disk cache growth leading to storage exhaustion

**Effort Level:** High — Breaking changes, regression testing, potential code refactoring

**Required Actions:**
- [ ] Schedule cross-team planning meeting (product, engineering, security)
- [ ] Define timeline and allocate sprint capacity
- [ ] Create test plan for regression validation
- [ ] Establish rollback plan for production deployment
- [ ] Review breaking changes between Next.js 13 and 16

**What NOT to Do:**
- ❌ Do NOT run `npm audit fix --force` without explicit product approval
- ❌ Do NOT attempt upgrade in isolation without testing infrastructure
- ❌ Do NOT proceed without full understanding of breaking changes

**Interim Risk Mitigation** (while planning upgrade):
- Continue automated security monitoring (this report)
- Implement defense-in-depth: WAF rules, strict CSP headers, input validation
- Restrict Server Actions to safe, authenticated endpoints only
- Avoid AVIF image processing (known RCE vector) until upgrade
- Monitor logs for Image Optimizer exploit attempts
- Consider deployment to non-Windows infrastructure if possible

---

### 🟡 PRIORITY 2: Minimatch Transitive Dependency Fix (Dev-Only)

**Status:** ✅ **Actionable — Can fix immediately without side effects**

**Effort Level:** Low (< 5 minutes)

**Issue:** 3 ReDoS vulnerabilities in minimatch (dev/build-time, low production impact)

**Recommended Solution** (per CLAUDE.md):
Use scoped override instead of `npm audit fix` (which rewrites ~87 packages):

1. Edit `package.json` and locate the `"overrides"` section
2. Add this entry (following existing pattern for `js-yaml@3` and `nanoid@3`):
```json
"overrides": {
  "@typescript-eslint/typescript-estree": {
    "minimatch": ">=9.0.7"
  }
}
```
3. Run: `npm install`
4. Verify: `npm audit` should remove 3 minimatch vulnerabilities

**Why This Approach?**
- Targeted fix for one transitive dependency
- Avoids `npm audit fix` side effect of updating ~87 packages
- Follows existing repository conventions (CLAUDE.md guidance)
- Maintains control over which packages change

**Expected Outcome:** Reduces vulnerability count from 5 to 2 (only Next.js and PostCSS remain)

---

### 🟢 PRIORITY 3: Code Quality — Lint Warnings

**Status:** ✅ **Non-blocking, low priority optimization**

**Effort Level:** Minimal (3 simple code changes)

**Found:** 3 `<img>` elements should use Next.js `<Image />` component:
```
components/MetaPixel.tsx:54
components/SplitSection.tsx:93
components/SplitSection.tsx:96
```

**Benefits:** 
- Improves Largest Contentful Paint (LCP) metric
- Reduces bandwidth through automatic optimization
- Better responsive image handling
- Aligns with Next.js best practices

**Recommended Timeline:** Include in next code quality sprint (low effort, good practice)

---

## Test Results Summary

| Check | Command | Status | Result |
|-------|---------|--------|--------|
| **Dependencies** | `npm install` | ✅ PASS | 423 packages audited, up to date |
| **Build** | `npm run build` | ✅ PASS | 40/40 static pages, zero compilation errors |
| **Linting** | `npm run lint` | ✅ PASS | 0 errors; 3 non-blocking warnings (performance suggestions) |
| **Security Audit** | `npm audit` | ❌ CRITICAL | 5 vulnerabilities: 1 critical (Next.js), 4 high (minimatch/postcss) |

---

## Overall Assessment

| Dimension | Status | Assessment |
|-----------|--------|-----------|
| **Build Health** | ✅ Excellent | Compiles successfully, all pages render, no errors |
| **Code Quality** | ✅ Good | 3 minor optimization suggestions (non-blocking) |
| **Security Posture** | ⚠️ Warning | Known critical vulnerabilities in Next.js (intentionally deferred) |
| **Deployment Readiness** | ✅ Ready | Can build and deploy; security risks acknowledged |

---

## Conclusion

The website2.0 project **builds successfully and is deployable** with no compilation or linting blockers. All 40 localized pages render correctly with optimized output.

**Security Context:** Critical vulnerabilities in Next.js 13.x (31+ advisories including RCE, SSRF, XSS, DoS) are **acknowledged as intentional technical debt** per project policy in CLAUDE.md. Fixing these requires a major version upgrade (13 → 16+), which is a **product decision** requiring cross-team planning—not a routine monitor action. This upgrade is strategically important but must be scheduled as a separate initiative with comprehensive regression testing.

**Actionable Items:**
1. ✅ **Quick Win:** Fix minimatch transitive vulnerability via scoped override (~5 min)
2. 📋 **Strategic:** Schedule Next.js 13 → 16+ upgrade discussion with product/engineering teams
3. 🔄 **Continuous:** Run this monitor weekly; `git log reports/monitor-latest.md` tracks history

**Risk Assessment:** The project is functional for staging and development. Production deployments carry acknowledged security risks that require mitigation (defense-in-depth, WAF, CSP policies) until Next.js upgrade is completed.

---

## Monitor Metadata

**Run Timestamp:** 2026-09-15 (automated execution)  
**Next Run:** Scheduled per monitoring policy  
**History:** `git log reports/monitor-latest.md` (this file overwritten each run)  
**Configuration:** See `/home/user/website2.0/CLAUDE.md` for project policies

**Monitor Tasks Completed:**
- [x] npm install (dependency verification)
- [x] npm run build (compilation check)
- [x] npm run lint (code quality check)
- [x] npm audit (security vulnerability scan)
- [x] Report generation
