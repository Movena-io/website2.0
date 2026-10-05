# Website Monitor Report

**Run:** 2026-10-05T19:14:12Z  
**Overall status:** ⚠️ WARNING — build passes, lint errors in generated files, critical security vulnerability in Next.js

---

## Note on scheduled task

This run was triggered as "nightly-digest" with working directory `/Users/samuelodegaard/Desktop/Friday`, which does not exist in this container. The website-monitor checks were run instead (equivalent function). The scheduled task prompt may need updating to reference `website-monitor` and the correct working directory.

---

## Results

| Check    | Status | Details |
|----------|--------|---------|
| Build    | ✅ Pass | `npm run build` exited 0, all pages generated |
| Lint     | ❌ Fail | 40+ `react/no-unescaped-entities` errors in generated components; 2 `no-img-element` warnings in `SplitSection.tsx` |
| Security | ❌ Critical | 13 vulnerabilities (1 critical, 12 high) |

---

## Build

`npm run build` completed successfully (exit 0). All routes — static, SSG, and server — generated without errors.

---

## Lint

`npm run lint` exited non-zero with errors and warnings:

**Errors (all `react/no-unescaped-entities`)** — unescaped `'` in JSX in generated components:

- `components/generated/BlogIndexDa.tsx`
- `components/generated/BlogIndexEn.tsx`
- `components/generated/BlogPostEn.tsx` (7 occurrences)
- `components/generated/BookDemoEn.tsx` (3 occurrences)
- `components/generated/ErrorEn.tsx` (2 occurrences)
- `components/generated/FaaAllePengeneHjemDa.tsx`
- `components/generated/FaaAllePengeneHjemEn.tsx` (3 occurrences)
- `components/generated/ForsideDa.tsx`
- `components/generated/ForsideEn.tsx` (15 occurrences)
- `components/generated/HavStyrPaaDagenEn.tsx` (4 occurrences)
- `components/generated/NotFoundEn.tsx`
- `components/generated/OmOsEn.tsx` (2 occurrences)
- `components/generated/PrivatlivspolitikEn.tsx` (3 occurrences)
- `components/generated/VindFlereFlytningerEn.tsx` (10 occurrences)

**Warnings (`@next/next/no-img-element`)** in `components/SplitSection.tsx` lines 93 and 96.

These errors are all in auto-generated files under `components/generated/`. The fix is to either regenerate them with proper HTML entity escaping, or add `// eslint-disable-next-line react/no-unescaped-entities` in the generator template.

---

## Security

`npm audit` found **13 vulnerabilities: 1 critical, 12 high**.

**Critical:**
- **Next.js DoS via Server Components** (`next` 0.9.9 – 16.3.0-preview.10)  
  [GHSA-5j59-xgg2-r9c4](https://github.com/advisories/GHSA-5j59-xgg2-r9c4) — "Denial of Service with Server Components – Incomplete Fix Follow-Up"  
  Fix requires `npm audit fix --force` (major version upgrade of Next.js). Per CLAUDE.md this is a product decision, not a monitor action.

**High (12):** Various transitive dependencies. Some fixable via `npm audit fix`; others require `--force` (Next.js upgrade).

Per `CLAUDE.md`, patching transitive deps should use `overrides` in `package.json`, and the Next.js upgrade is deferred as a product decision.

---

## Recommendations

1. **Lint errors in generated files** — update the code generator to escape apostrophes as `&apos;` or `&#39;` in JSX text content. 40+ errors across 14 files, persistent across runs.
2. **Critical Next.js vulnerability** — schedule a Next.js 13→16 upgrade as a product milestone; it clears both the critical and many high advisories.
3. **Fix scheduled task prompt** — change "nightly-digest" to "website-monitor" and update the working directory to the correct remote path (`/home/user/website2.0`).
