# Monitor Report — website2.0

**Run Time:** 2026-09-13 (automated monitor)  
**Overall Status:** 🟢 HEALTHY

---

## Summary

Comprehensive health check completed successfully. Both build and linting pass with no blocking issues.

---

## Build Check: `npm run build`

**Status:** ✅ PASS

- Next.js production build compiled successfully
- 40 static pages generated (SSG with JSON exports)
- Type validation passed
- Build traces collected successfully

### Build Output Highlights

- Main entry point `/[locale]`: 19.1 kB (169 kB First Load JS)
- Blog index `/[locale]/blog`: 208 B (115 kB First Load JS)  
- Blog posts `/[locale]/blog/[slug]`: 21 paths generated (including 17 more)
- Savings calculator `/[locale]/savings-calculator`: 16.3 kB (166 kB First Load JS)
- API routes: 2 lambda functions (`/api/calculator/submit`, `/api/contact`)
- Static assets: robots.txt, sitemap.xml
- Middleware: 27 kB

**First Load JS shared by all:** 80.6 kB  
- chunks/472: 27.5 kB
- chunks/fd9d1056: 51.1 kB
- main-app: 230 B
- webpack: 1.79 kB

---

## Linting Check: `npm run lint`

**Status:** ✅ PASS with 3 warnings

### Warnings (Non-blocking)

1. **./components/MetaPixel.tsx:54** — `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image` for optimization

2. **./components/SplitSection.tsx:93** — `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image` for optimization

3. **./components/SplitSection.tsx:96** — `@next/next/no-img-element`
   - Recommendation: Use `<Image />` from `next/image` for optimization

**Note:** These are style warnings about image optimization, not errors. The code compiles and runs correctly.

---

## Dependencies

**Status:** ⚠️ Note

- Total packages: 423 (with 422 added during install)
- 5 vulnerabilities found (4 high, 1 critical)
- Per CLAUDE.md: Next 13 and postcss are knowingly left on current versions (upgrade to Next 16 is a product decision)
- Deprecated packages present: rimraf@3.0.2, inflight@1.0.6, glob@7.1.7, @humanwhocodes packages, eslint@8

**No action required** — These are pre-existing and follow project maintenance policy.

---

## Project Info

- **Package:** movena-website v0.1.0
- **Framework:** Next.js 13.5.11 (App Router)
- **Styling:** Tailwind CSS 3
- **Locales:** 2 (English `/en`, Danish `/da`)
- **Node version:** As installed

---

## Recommendations

1. **Optional:** Migrate `<img>` tags to `<Image />` from next/image in MetaPixel.tsx and SplitSection.tsx for better LCP and bandwidth optimization.

2. **Future consideration:** ESLint is on v8 (no longer supported). Consider upgrading to ESLint 9+ when feasible.

---

## No Action Required

✅ Build passes  
✅ Lint passes  
✅ No blocking issues identified
