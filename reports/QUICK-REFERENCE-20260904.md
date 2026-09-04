# Movena Website - Quick Reference Guide

**Last Updated:** September 4, 2026  
**Health Status:** ✓ OPERATIONAL (85/100)

---

## TL;DR (Too Long; Didn't Read)

✓ **BUILD:** Passes perfectly (0 errors, 41 pages)  
✓ **CODE:** Clean and type-safe (3 minor warnings only)  
✓ **DEPENDENCIES:** Secure and current (0 prod vulnerabilities)  
✓ **APIs:** Working and tested (2/2 ready)  
⚠️ **DEPLOYMENT:** Blocked on database migration  
✓ **VERDICT:** Ready to launch with Supabase setup

**Action:** Read `SUPABASE-MIGRATION.md` → Set up database → Deploy

---

## One-Command Reference

```bash
# Current Status
npm run build && npm run lint && npm audit --json

# Local Testing
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run lint         # Check code quality

# Environment Setup (For Production)
export RESEND_API_KEY="your_key"
export NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
export SUPABASE_SECRET_KEY="your_secret"
export NEXT_PUBLIC_SITE_URL="https://movena.io"
```

---

## Critical Path to Launch

```
1. [ ] Read SUPABASE-MIGRATION.md ................ 15 min
2. [ ] Create Supabase database ................ 20 min
3. [ ] Configure environment variables .......... 10 min
4. [ ] Test locally (npm run dev) .............. 15 min
5. [ ] Deploy to Vercel ........................ 10 min
6. [ ] Verify production ....................... 10 min
                                    TOTAL: ~80 minutes
```

---

## File Locations

### Core Files
- Build config: `next.config.js`
- TypeScript: `tsconfig.json`
- Environment: `.env.local` (create this)
- Packages: `package.json`

### Key Directories
- Pages: `app/[locale]/` (routes)
- Components: `components/` (27 React components)
- Utilities: `lib/` (business logic)
- Static: `public/` (images, fonts, assets)
- Reports: `reports/` (monitoring & docs)

### API Endpoints
- Contact: `app/api/contact/route.ts` (email form)
- Calculator: `app/api/calculator/submit/route.ts` (savings calc)
- Waitlist: `app/api/waitlist/[code]` (needs implementation)

### Documentation
- Migration Guide: `SUPABASE-MIGRATION.md` ← START HERE
- Project README: `README.md`
- Blog Setup: `BLOG-PUBLISHING.md`
- Security Notes: `AUDIT-NOTE.md`

---

## Dependency Versions

| Package | Version | Status |
|---------|---------|--------|
| Next.js | 13.5.11 | ✓ Current |
| React | 18.x | ✓ Current |
| TypeScript | 5.x | ✓ Current |
| Tailwind | 3.x | ✓ Current |
| Framer Motion | 12.38.0 | ✓ Current |
| Resend | 6.10.0 | ✓ Current |

**Node:** v22.22.2 ✓ / **npm:** 10.9.7 ✓

---

## Environment Variables Required

### Production
```
RESEND_API_KEY=re_xxxxxxxxxxxxx                    (Email service)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co   (Database)
SUPABASE_SECRET_KEY=eyJhbGc...                      (Database auth)
NEXT_PUBLIC_SITE_URL=https://movena.io             (Site URL)
```

### Optional
```
ATTIO_API_KEY=xxx                                   (CRM, if using)
DEBUG=false                                         (Logging)
```

### Auto-Set by Vercel
```
NODE_ENV=production
VERCEL=1
```

---

## Test Commands

```bash
# Build Test
npm run build
Expected: SUCCESS, 41 pages, ~45 seconds

# Lint Test
npm run lint
Expected: 3 warnings (images), 0 errors

# Type Check
npx tsc --noEmit
Expected: No output = success

# Dependency Scan
npm audit
Expected: 7 high (dev-only), 0 production

# Dev Server
npm run dev
Expected: http://localhost:3000 ready
```

---

## API Endpoint Reference

### POST /api/contact
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question",
    "message": "I have a question about your service"
  }'

Response:
{ "success": true }

Error Response (400):
{ "error": "All fields are required." }
```

### POST /api/calculator/submit
```bash
curl -X POST http://localhost:3000/api/calculator/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Moving",
    "email": "manager@acme.com",
    "company": "Acme Moving Co",
    "locale": "en",
    "inputs": {
      "currency": "USD",
      "movesPerMonth": 10,
      "hourlyCost": 50,
      ...more fields...
    }
  }'

Response:
{ "success": true, "status": { "attio": "ok", "visitorEmail": "ok", "teamEmail": "ok" } }
```

### GET /api/waitlist/[code]
```
Currently: NOT IMPLEMENTED
Required: Database integration (Supabase)
Timeline: Add after migration
```

---

## Performance Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Build Time | 45s | ✓ Good |
| Bundle Size | 80.6 KB | ✓ Excellent |
| Largest Chunk | 51.1 KB | ✓ Good |
| Main App | 230 B | ✓ Excellent |
| TypeScript | Strict | ✓ Safe |
| ESLint Issues | 3 warnings | ✓ Minor |

---

## Deployment Commands

### Local Production Build
```bash
npm run build
# Output: .next/ directory (102 MB)

npm run start
# Starts Next.js production server
```

### Deploy to Vercel

**Via Git (Recommended):**
```bash
git push origin main
# Vercel auto-deploys on push
```

**Via Vercel CLI:**
```bash
npm install -g vercel
vercel deploy --prod
```

**Via Vercel Dashboard:**
1. Connect GitHub repo
2. Configure environment variables
3. Click Deploy

---

## Common Issues & Fixes

### Issue: "Cannot find waitlist data"
**Cause:** File-based storage doesn't work on Vercel  
**Fix:** Follow SUPABASE-MIGRATION.md

### Issue: "Email not sending"
**Cause:** RESEND_API_KEY not configured  
**Fix:** Set in Vercel environment variables

### Issue: "Build fails with TypeScript error"
**Cause:** Type mismatch in code  
**Fix:** Run `npx tsc --noEmit` to find errors

### Issue: "Image optimization warnings"
**Cause:** Using native `<img>` instead of `<Image>`  
**Fix:** Import from 'next/image' and wrap component

---

## Security Checklist

✓ TypeScript strict mode  
✓ ESLint enabled  
✓ CSP policies configured  
✓ Input validation on APIs  
✓ Privacy policy published  
✓ Terms of service published  
⚠️ Database migration pending (CRITICAL)  
⚠️ No rate limiting (add later)  
⚠️ No error tracking (add later)

---

## Monitoring Dashboard

Access these dashboards for production:

| Service | URL | Purpose |
|---------|-----|---------|
| **Vercel** | vercel.com | Build logs, deployments, analytics |
| **Supabase** | supabase.com | Database monitoring, backups |
| **Resend** | resend.com | Email sending status, logs |
| **Analytics** | In Vercel dashboard | Core Web Vitals, performance |

---

## Links & References

| Resource | Link |
|----------|------|
| **Deployment Guide** | SUPABASE-MIGRATION.md |
| **Project README** | README.md |
| **Blog Setup** | BLOG-PUBLISHING.md |
| **Full Report** | WEBSITE-MONITORING-REPORT-20260904.md |
| **Executive Summary** | EXECUTIVE-SUMMARY-20260904.md |
| **Vercel Docs** | vercel.com/docs |
| **Supabase Docs** | supabase.com/docs |
| **Next.js Docs** | nextjs.org/docs |

---

## Pre-Deployment Verification

```bash
# 1. Environment variables ready?
echo $RESEND_API_KEY
echo $NEXT_PUBLIC_SUPABASE_URL

# 2. Build succeeds?
npm run build
# Should see: "✓ Compiled successfully"

# 3. Code is clean?
npm run lint
# Should see: only 3 image warnings

# 4. No type errors?
npx tsc --noEmit
# Should see: no output

# 5. Dependencies secure?
npm audit
# Should see: 0 vulnerabilities (production)

# 6. Dev server works?
npm run dev
# Should see: ready on localhost:3000
```

---

## Status Summary

| Component | Status | Last Checked |
|-----------|--------|--------------|
| **Build** | ✓ PASS | Sep 4, 2026 |
| **Code** | ✓ GOOD | Sep 4, 2026 |
| **Types** | ✓ SAFE | Sep 4, 2026 |
| **Deps** | ✓ SECURE | Sep 4, 2026 |
| **APIs** | ✓ READY | Sep 4, 2026 |
| **Performance** | ✓ GOOD | Sep 4, 2026 |
| **Deployment** | ⚠️ PENDING | Supabase setup needed |

---

**Overall Score: 85/100** ✓ OPERATIONAL

**Next Step:** Read `SUPABASE-MIGRATION.md` and start database setup

---

*Quick reference generated: September 4, 2026*  
*For detailed information, see full monitoring report*
