# Website Monitor Report

**Run Time:** 2026-09-22T15:04:25Z  
**Overall Status:** ISSUES FOUND

---

## 1. Build Check

**Status:** PASS ✓

The Next.js 13 build completed successfully with no errors. All 38 static pages were generated correctly, including:
- Locale-specific routes for `/en` and `/da`
- Blog index and individual blog post pages (21 routes for blog slugs)
- Root page and feature pages (contact, savings-calculator, dataportabilitet)
- API endpoints for calculator and contact form

**Finding:** Build size optimal
- First Load JS shared: 80.6 kB
- Main app bundle: 230 B
- Middleware: 27.1 kB

---

## 2. Lint Check

**Status:** WARNING ⚠

Running `npm run lint` found 2 linting warnings in `/components/SplitSection.tsx`:

```
Lines 93, 96: Using <img> could result in slower LCP and higher bandwidth.
Consider using <Image /> from next/image.
```

**Severity:** WARNING  
**Impact:** Performance optimization opportunity. The component uses native `<img>` tags instead of Next.js `<Image>` component, which could affect Core Web Vitals and user experience.

**Recommendation:** Refactor `SplitSection.tsx` to use Next.js `<Image>` component with proper `width`, `height`, and `placeholder` props.

---

## 3. Repository Structure

**Status:** PASS ✓

All required directories are present and properly organized:

| Directory | Status | Notes |
|-----------|--------|-------|
| `app/` | ✓ | Contains Next.js 13 App Router structure |
| `app/[locale]/` | ✓ | Dynamic locale segment with 4 subdirectories |
| `components/` | ✓ | React components directory present |
| `content/blog/` | ✓ | Blog markdown files with README.md documentation |
| `lib/` | ✓ | Utility and helper functions |
| `public/` | ✓ | Static assets |

---

## 4. Locale Configuration

**Status:** PASS ✓

The site correctly implements multi-locale support using Next.js 13 App Router patterns:

- **Locale segment:** `app/[locale]/` (dynamic routing, not static `en/` and `da/` directories)
- **Middleware:** Present at `middleware.ts` for locale detection and redirection
- **Coverage:** Both English (`en`) and Danish (`da`) locales fully implemented
- **Sitemap generation:** Automatic per `/app/sitemap.ts`
- **Routes generated:** 19 locale-specific paths (each route × 2 locales)

**Finding:** Architecture is correct for i18n with dynamic segments.

---

## 5. Content Check - Blog Posts

**Status:** ISSUES FOUND ⚠

### Frontmatter Compliance
**Status:** PASS ✓  
All 18 blog post files (excluding README.md) contain valid frontmatter with required fields:
- `title` ✓
- `slug` ✓
- `date` (YYYY-MM-DD format) ✓
- `excerpt` ✓

No missing or malformed frontmatter fields detected.

### Language Coverage
**Status:** WARNING ⚠

**Finding:** 3 blog posts lack Danish translations:

1. `get-more-moving-reviews.md` - English only
2. `moving-industry-twenty-years-behind.md` - English only
3. `moving-quote-follow-up.md` - English only

**Impact:** These articles do not appear on `/da/blog` and are inaccessible to Danish readers via the blog index. Direct links to `/da/blog/<english-slug>` render the English version marked `noindex` (as designed).

**Expected behavior per `content/blog/README.md`:**
- All blog posts should have corresponding `.da.md` files when available for publication
- Danish articles feed into `/da/blog` only when a real Danish version exists

**Recommendation:** Either:
1. Create `.da.md` translations for these three posts to make them discoverable on the Danish blog, OR
2. Document why English-only versions are intentional for these topics

### File Pairing
**Status:** PASS ✓

Existing Danish translations are correctly paired by filename:
- `moving-company-dispatch.md` ↔ `moving-company-dispatch.da.md` ✓
- `moving-company-equipment-tracking.md` ↔ `moving-company-equipment-tracking.da.md` ✓
- `moving-company-job-planning.md` ↔ `moving-company-job-planning.da.md` ✓
- `hidden-time-killers-moving-company-week.md` ↔ `hidden-time-killers-moving-company-week.da.md` ✓
- `software-to-moving-companies.md` ↔ `software-to-moving-companies.da.md` ✓
- `ways-moving-companies-lose-money.md` ↔ `ways-moving-companies-lose-money.da.md` ✓

Draft status: All 18 posts have `draft: false` (no unpublished content).

---

## 6. Dependencies

**Status:** CRITICAL ⚠⚠⚠

`npm audit` detected 5 vulnerabilities affecting the project:

### Critical Issues (1)

**Package:** `next@13.5.11`  
**Severity:** CRITICAL  
**CVEs:** 31 known advisories including:
- Server-Side Request Forgery in Server Actions
- Denial of Service via Server Components
- Cache poisoning vulnerabilities
- Cross-site scripting in various contexts
- Unbounded disk cache growth
- Middleware/Proxy bypass vulnerabilities

**Fix available:** Yes, but requires breaking change  
- Upgrading to `next@16.3.5` is a major version jump (Next 13 → 16)
- Per project instructions: "Fixing them requires Next 13 to 16, a major upgrade that is a product decision, not a monitor action."

### High Severity Issues (4)

**Package:** `minimatch` (nested in `@typescript-eslint/typescript-estree`)  
**Severity:** HIGH (3 ReDoS vulnerabilities)  
**Details:** 
- ReDoS via repeated wildcards with non-matching literal in pattern
- Combinatorial backtracking via multiple GLOBSTAR segments  
- Nested `*()` extglobs generate catastrophically backtracking regular expressions

**Fix available:** Yes via `npm audit fix`

**Package:** `postcss` (nested in `next`)  
**Severity:** HIGH (4 vulnerabilities)  
**Details:**
- XSS via unescaped `</style>` in CSS output
- Arbitrary file read via attacker-controlled sourceMappingURL
- Path Traversal in source map auto-loading

**Fix available:** Yes, but requires major version bump (tied to next upgrade)

### Dependency Chain

```
minimatch (vulnerable) ← @typescript-eslint/typescript-estree ← @typescript-eslint/parser
postcss (vulnerable) ← next (critical) ← root
```

### Current Status
- Total vulnerabilities: **5**
- Critical: **1**
- High: **4**
- Breaking changes required: **Yes** (Next 13→16)

**Recommendation:** 
- Do NOT run `npm audit fix --force` (as noted in CLAUDE.md)
- Next/postcss upgrade is a product decision requiring stakeholder approval
- For immediate mitigation of minimatch vulnerabilities: Update TypeScript ESLint dependencies when safe
- Document security posture and any compensating controls in production (WAF, CSP, etc.)

---

## 7. Configuration Files

**Status:** PASS ✓

All required configuration files exist and are valid:

| File | Status | Type | Size |
|------|--------|------|------|
| `next.config.js` | ✓ | Next.js config | 2.7 KB |
| `tailwind.config.ts` | ✓ | Tailwind CSS config (TypeScript) | 1.2 KB |
| `postcss.config.js` | ✓ | PostCSS config | 82 bytes |
| `tsconfig.json` | ✓ | TypeScript config | 607 bytes |
| `package.json` | ✓ | Dependencies | 1.15 KB |
| `middleware.ts` | ✓ | Next.js middleware for i18n | 2.8 KB |
| `.eslintrc.json` | ✓ | ESLint config | 40 bytes |

No parsing errors or syntax issues detected.

---

## 8. Git Repository Status

**Status:** PASS ✓

- **Branch:** `main`
- **Remote sync:** Up to date with `origin/main`
- **Working tree:** Clean (no uncommitted changes)
- **Recent activity:** 5 commits in last session
  - Latest: "Cookie banner: name Vercel Analytics as the cookieless measurement" (f973703)
  - Activity: Legal cleanup, cookie banner improvements, analytics integration

---

## Summary of Findings

| Check | Result | Severity |
|-------|--------|----------|
| Build | PASS | — |
| Lint | 2 warnings | WARNING |
| Structure | PASS | — |
| Localization | PASS (except coverage) | — |
| Blog compliance | 3 missing translations | WARNING |
| Dependencies | 5 vulnerabilities | CRITICAL + HIGH |
| Configuration | PASS | — |
| Git status | PASS | — |

---

## Action Items (Prioritized)

### HIGH Priority
1. **Address security vulnerabilities** - Document Next.js/postcss upgrade plan and timeline
2. **Create missing blog translations** - Add `.da.md` files for the 3 English-only posts to improve Danish discoverability

### MEDIUM Priority
3. **Fix image optimization** - Refactor `SplitSection.tsx` to use `<Image>` component from `next/image`

### LOW Priority
4. **Monitor minimatch vulnerabilities** - Upgrade TypeScript ESLint when breaking change is acceptable

---

## Conclusion

The website is **functionally healthy** with a clean build, proper architecture, and good content structure. However, **security vulnerabilities require attention**: Next.js 13 contains critical known issues that should be addressed via an upgrade plan to Next 16+. Additionally, the blog should complete Danish translations for better language coverage. The linting warnings are minor optimization opportunities for Core Web Vitals.

**Recommended next steps:**
1. Evaluate timeline for Next.js 13 → 16 upgrade (impacts postcss and security)
2. Prioritize Danish blog translations for international reach
3. Refactor image component usage in SplitSection for performance
