# Website Monitor Report

**Run Timestamp:** 2026-11-01 (scheduled automated routine)  
**Overall Status:** ⚠️ **WARNING** — Build succeeds, but linting failures and known security vulnerabilities

---

## Summary

The Movena website build completed successfully, compiling all 65 static pages without errors. However, the project has lint failures in auto-generated components and 25 security vulnerabilities in dependencies. The critical Next.js vulnerabilities are known and intentional per project guidelines (requires major version upgrade).

---

## Build Status: ✅ **PASS**

- Compilation successful with no errors
- All 65 static pages generated correctly (both locales: `en` and `da`)
- Build output: 156 KB main chunk, 27.9 KB middleware
- Ready for deployment (from build perspective)

---

## Lint Status: ❌ **FAIL** — 92 errors + 2 warnings

### Errors (92 total)
Widespread unescaped JSX entities (`'`) in 14 auto-generated component files:
- `BeregnerEn.tsx`, `BlogIndexDa.tsx`, `BlogIndexEn.tsx`, `BlogPostEn.tsx`, `BookDemoEn.tsx`, `ErrorEn.tsx`, `FaaAllePengeneHjemEn.tsx`, `ForsideDa.tsx`, `ForsideEn.tsx`, `HavStyrPaaDagenEn.tsx`, `NotFoundEn.tsx`, `OmOsEn.tsx`, `PrivatlivspolitikEn.tsx`, `VindFlereFlytningerEn.tsx`
- Solution: Replace `'` with `&apos;`, `&lsquo;`, `&#39;`, or `&rsquo;` OR fix code generator

### Warnings (2)
- `SplitSection.tsx` lines 93, 96: Using `<img>` instead of Next.js `<Image>` component (performance recommendation)

---

## Security Audit: 25 vulnerabilities (1 critical, 6 high, 15 moderate, 3 low)

### Critical Severity
- **Next.js**: 32+ CVEs including SSRF, RCE, DoS, cache poisoning, authorization bypass
  - **Status**: KNOWN INTENTIONAL — Per `CLAUDE.md`, Next.js 13→16 upgrade is a product decision, not automated

### High Severity
- **PostCSS**: XSS, path traversal, arbitrary .map file disclosure
  - **Status**: KNOWN INTENTIONAL — bundled with Next.js, same upgrade path
- **brace-expansion**, **minimatch**: Multiple DoS/ReDoS vectors
- **source-map-js**: Event-loop DoS via source-map parsing

### Moderate & Low
- Deprecation warnings, transitive dependency issues, prototype poisoning

**Note**: Per `CLAUDE.md`, do NOT run `npm audit fix --force` — it breaks the project.

---

## Recommendations

1. **Fix linting errors** (HIGH): Investigate code generation for `components/generated/*.tsx`
   - Either fix generator to escape entities properly, or
   - Fix the generated files directly, or
   - Add ESLint disable comments if generated files are read-only

2. **Security vulnerabilities** (MONITORED): Next.js/PostCSS upgrades require product decision
   - Current state is documented and intentional
   - Review audit output for actionable transitive dependency fixes

3. **Code quality** (OPTIONAL): Migrate `<img>` to `<Image>` in `SplitSection.tsx`

---

## Check Results

| Check | Status | Details |
|-------|--------|---------|
| Build | ✅ Pass | 65/65 pages generated |
| Lint | ❌ Fail | 92 errors (generated components), 2 warnings |
| Audit | ⚠️ Warning | 25 vulnerabilities (1 critical, 6 high) — known intentional |
| npm install | ✅ Pass | 417 packages installed |
