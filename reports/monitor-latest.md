# Website Monitor Report

**Run Timestamp:** 2026-09-15  
**Overall Status:** ⚠️ Warning

---

## Summary

The website2.0 project builds successfully with no compilation errors and passes type checking. Code quality linting detects only minor style warnings. However, the project has **5 unresolved npm vulnerabilities** (4 high, 1 critical) related to Next.js, postcss, and minimatch dependencies. These vulnerabilities are documented as known issues in CLAUDE.md and represent a product decision requiring a major Next.js upgrade (13 to 16).

---

## Build Check: ✅ Healthy

```
✓ Compilation successful
✓ Type validation passed
✓ Generated 40 static pages
✓ No build errors or critical warnings
```

**Route Summary:**
- Both locales (en/da) building correctly
- Blog posts and pages generating (21 total blog articles)
- All API routes created (calculator/submit, contact)
- Landing pages, contact, privacy, terms, savings-calculator all present
- Middleware compiled (27 kB)

**Build size:** First Load JS shared is 80.6 kB (reasonable)

---

## Lint Check: ⚠️ Warnings (Non-critical)

```
Total warnings: 3 (no errors)
```

**Warnings Details:**
1. **MetaPixel.tsx:54** – Using `<img>` instead of Next.js `<Image />` component
2. **SplitSection.tsx:93** – Using `<img>` instead of Next.js `<Image />` component  
3. **SplitSection.tsx:96** – Using `<img>` instead of Next.js `<Image />` component

**Impact:** These are performance/optimization suggestions. Images will still load but may incur slower LCP (Largest Contentful Paint) and higher bandwidth. Can be addressed by replacing with Next.js Image component for automatic optimization.

---

## Security Audit: ❌ Critical (5 Vulnerabilities)

### Critical (1)

**Next.js (0.9.9 - 16.3.0-preview.10)** — 1 critical + 33 high severity advisories
- Server-Side Request Forgery (SSRF)
- Denial of Service (DoS) – multiple vectors
- Authorization bypass vulnerabilities
- Cache poisoning
- Cross-site scripting (XSS)
- Middleware/Proxy bypasses
- Information exposure

**Root Cause:** Next.js 13 is several major versions behind (current stable is ~16). Upgrading requires breaking changes and is documented in CLAUDE.md as a product decision, not a routine patch.

**Dependency Chain:**
```
next (13.x) → postcss (nested vulnerability)
```

### High (4)

**minimatch (9.0.0 - 9.0.6)** — 3 high severity ReDoS vulnerabilities
- Repeated wildcards with non-matching literal in pattern
- Nested *() extglobs cause catastrophic backtracking
- Multiple GLOBSTAR segments combinatorial backtracking

**Dependency Chain:**
```
@typescript-eslint/typescript-estree → minimatch
@typescript-eslint/parser (6.16.0 - 7.5.0) → typescript-estree
```

**postcss (≤8.5.22)** — 4 high severity vulnerabilities
- XSS via unescaped `</style>` in CSS output
- Arbitrary file read via sourceMappingURL injection
- Path traversal in source map auto-loading

---

## Known Issues & Product Decisions

Per `/CLAUDE.md`:
- **Next.js & postcss:** Knowingly left at current versions. Updating requires Next.js upgrade from 13 to 16+ (major breaking changes). This is a product decision, not a monitor action. Do not run `npm audit fix --force`.
- **npm audit fix:** Avoided due to 87-package rewrites beyond necessary patches. Transitive dependency patches should use `overrides` in package.json (e.g., js-yaml@3, nanoid@3).

---

## Dependencies Status

- **Total Packages:** 423 audited
- **Vulnerabilities:** 5 (1 critical, 4 high)
- **Funding Requests:** 154 packages available for sponsorship

---

## Recommendations

### Immediate (if High/Critical severity is blocking deployment):
1. Document current status – Next.js upgrade is a product roadmap item, not a patch
2. Consider deployment gates if SSRF/DoS vulnerabilities impact production

### Short-term (security hygiene):
1. Replace `<img>` elements with Next.js `<Image />` in MetaPixel.tsx and SplitSection.tsx

### Long-term (strategic):
1. Schedule Next.js 13 → 16+ upgrade as a product milestone (includes postcss update)
2. This will resolve all 5 vulnerabilities in one go

---

## Check Timestamps

- npm install: Completed (423 packages verified)
- npm run build: ✓ Passed
- npm run lint: ⚠️ 3 warnings
- npm audit: ✅ Analyzed (5 vulnerabilities documented)
