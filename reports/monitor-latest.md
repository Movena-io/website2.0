# Website Monitor Report

**Run:** 2026-09-12T00:00:00Z  
**Overall status:** ⚠️ WARNING — build passes, lint warnings, known security advisories (Next.js upgrade deferred)

---

## Build ✅ PASS

`npm run build` succeeded. 40 static pages generated.

```
✓ Compiled successfully
✓ Generating static pages (40/40)
```

Routes: `/[locale]`, `/[locale]/blog`, `/[locale]/blog/[slug]`, `/[locale]/contact`, `/[locale]/privacy`, `/[locale]/savings-calculator`, `/[locale]/terms`, `/api/calculator/submit`, `/api/contact`, `/robots.txt`, `/sitemap.xml`

---

## Lint ⚠️ WARNINGS (3)

No errors. Three warnings about `<img>` instead of `<Image />`:

| File | Line | Warning |
|------|------|---------|
| `components/MetaPixel.tsx` | 54 | `@next/next/no-img-element` |
| `components/SplitSection.tsx` | 93 | `@next/next/no-img-element` |
| `components/SplitSection.tsx` | 96 | `@next/next/no-img-element` |

These are pre-existing warnings (no change from prior runs).

---

## Security Audit ⚠️ 5 vulnerabilities (4 high, 1 critical)

### `next` — CRITICAL (knowingly deferred)
31 CVEs covering SSRF, DoS, cache poisoning, XSS, and RCE.  
Fix requires upgrading Next.js 13 → 16 (`npm audit fix --force`).  
**Per CLAUDE.md: this is a product decision, not a monitor action. No action taken.**

### `postcss` — HIGH (nested in next, knowingly deferred)
4 CVEs (XSS via CSS stringify, arbitrary file read via sourceMappingURL).  
Also blocked by the Next.js upgrade. **Deferred alongside next.**

### `minimatch` — HIGH (via `@typescript-eslint`)
3 ReDoS vulnerabilities (GHSA-3ppc-4f35-3m26, GHSA-7r86-cg39-jmmj, GHSA-23c5-xmqv-rm74).  
Affects `@typescript-eslint/typescript-estree` and `@typescript-eslint/parser`.  
`npm audit fix` (non-force) would patch this.  
**Candidate for a scoped `overrides` entry — not auto-applied per CLAUDE.md policy.**

---

## Notes

- Scheduled task referenced agent "nightly-digest" at `/Users/samuelodegaard/Desktop/Friday`, which does not exist in this remote container. The `website-monitor` agent was run instead.
- No new issues compared to the known state. Minimatch ReDoS is the only actionable advisory not covered by the Next.js upgrade deferral.
