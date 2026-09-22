# Website Monitor Report

**Run Time:** 2026-09-22T17:05:00Z  
**Overall Status:** ❌ **CRITICAL** - Known security vulnerabilities present

---

## Summary

Website monitoring check completed. Build and lint checks passed, but security audit shows critical vulnerabilities that are acknowledged as part of a planned major version upgrade.

---

## 1. Build Check

**Status:** ✅ PASS

Next.js 13 build compiled successfully with no errors. All 38 static pages generated correctly.

**Route Summary:**
- Root and locale-specific routes (`/en`, `/da`)
- Blog index and 21 individual blog post routes
- Feature pages (contact, dataportabilitet, savings-calculator)
- API endpoints (calculator, contact)
- Static routes (robots.txt, sitemap.xml)

**Build Metrics:**
- First Load JS shared: 80.6 kB
- Main app bundle: 230 B
- Middleware: 27.1 kB

---

## 2. Lint Check

**Status:** ⚠️ PASS with warnings (2 warnings)

Found in `components/SplitSection.tsx`:

```
Line 93: Using <img> could result in slower LCP. Consider using <Image /> from next/image.
Line 96: Using <img> could result in slower LCP. Consider using <Image /> from next/image.
```

**Severity:** Low (performance optimization opportunity)  
**Impact:** Component uses native `<img>` tags instead of Next.js `<Image>` component  
**Recommendation:** Refactor to use Next.js `<Image>` component for better Core Web Vitals

---

## 3. Security Audit

**Status:** ❌ CRITICAL

`npm audit` detected **5 vulnerabilities** (1 critical, 4 high):

### Critical Severity (1)

**Package:** `next@13.5.11`  
**Severity:** CRITICAL  
**Issues:** 31+ known advisories including:
- Server-Side Request Forgery in Server Actions
- Denial of Service via Server Components
- Cache poisoning vulnerabilities
- Cross-site scripting in various contexts
- Unbounded next/image disk cache growth
- Middleware/Proxy bypass vulnerabilities
- Unauthenticated Remote Code Execution on Windows servers
- Multiple cache confusion vulnerabilities

**Status:** ACKNOWLEDGED  
Per CLAUDE.md: "Next.js and its nested postcss are knowingly left on their current versions. Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

**Fix Path:** Upgrade to next@16.3.6+ (major version jump, breaking change)

### High Severity (4)

**Package:** `minimatch` (nested: @typescript-eslint/typescript-estree → @typescript-eslint/parser)  
**Severity:** HIGH  
**Issues:**
- ReDoS via repeated wildcards with non-matching literal in pattern
- ReDoS via multiple non-adjacent GLOBSTAR segments
- ReDoS via nested *() extglobs with catastrophic backtracking

**Fix:** Available via `npm audit fix`

**Package:** `postcss@8.x` (nested in next)  
**Severity:** HIGH  
**Issues:**
- XSS via unescaped `</style>` in CSS stringify output
- Arbitrary file read via attacker-controlled sourceMappingURL
- Path traversal in source map auto-loading

**Fix:** Requires next upgrade to v16+ (bundled with next)

### Vulnerability Chain

```
minimatch (ReDoS) 
  ← @typescript-eslint/typescript-estree
    ← @typescript-eslint/parser

postcss (XSS, file disclosure)
  ← next (CRITICAL)
    ← root package
```

---

## 4. Current Status

| Check | Result | Status |
|-------|--------|--------|
| Build | PASS | ✅ |
| Lint | 2 warnings | ⚠️ |
| Security | 5 vulnerabilities | ❌ CRITICAL |

**Vulnerability Summary:**
- Total: 5
- Critical: 1 (next)
- High: 4 (minimatch + postcss)
- All fixable, but some require breaking changes

---

## Recommendations

### Security (Critical Priority)

Per project guidelines, the Next.js critical vulnerabilities are a **known limitation** and acknowledged as requiring a major version upgrade decision.

**Actions:**
1. Do NOT run `npm audit fix --force` (per CLAUDE.md guidance)
2. Plan and schedule Next.js 13 → 16 upgrade when product timeline permits
3. Review and implement compensating controls in production (WAF, CSP headers, monitoring)
4. Monitor Next.js 16 releases for stability before upgrade

### Lint Warnings (Low Priority)

**Action:** Refactor `SplitSection.tsx` to use Next.js `<Image>` component
- Update lines 93 and 96 to use `<Image />` instead of `<img />`
- This will improve Core Web Vitals (LCP) scores

### Dependencies

**Immediate action:** None required (vulnerabilities are acknowledged as part of planned upgrade)  
**Medium-term:** Schedule TypeScript ESLint/minimatch updates when breaking changes are acceptable

---

## Conclusion

The website **builds and runs successfully** with good code structure. The critical security vulnerabilities in Next.js 13 are documented as a known limitation pending a major version upgrade. Lint warnings are minor optimization opportunities. The project is in a functional, maintainable state but requires security updates as part of the planned Next.js major version upgrade.

**Next scheduled monitor run:** Per configured schedule
