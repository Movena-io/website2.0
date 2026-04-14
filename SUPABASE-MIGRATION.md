# Supabase Waitlist Migration

The waitlist currently uses a JSON file (`data/waitlist.json`) for storage. This works locally but will fail silently on Vercel because serverless functions don't have a persistent filesystem.

**This migration is a P1 blocker for deploying to movena.io.**

Estimated time: 30-45 minutes.

---

## Step 1: Set Up the Supabase Table

Run this SQL in the Supabase SQL editor (Database > SQL Editor):

```sql
create table if not exists waitlist (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null unique,
  company           text not null,
  referral_code     text not null unique,
  referred_by       text,                          -- referral code of the person who referred them
  referral_count    integer not null default 0,
  created_at        timestamptz not null default now()
);

-- Index for fast referral code lookups
create index if not exists waitlist_referral_code_idx on waitlist(referral_code);

-- Index for email dedup checks
create index if not exists waitlist_email_idx on waitlist(email);

-- Enable RLS (waitlist data is sensitive)
alter table waitlist enable row level security;

-- Only service role can read/write (API routes use service role key)
-- No public access to waitlist data
```

---

## Step 2: Add Env Variables

Add to `.env.local` (and to Vercel project settings):

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

Use the **service role key** (not the anon key) in server-only API routes. The service role bypasses RLS, which is correct here since these are server-side operations.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Only use it in `app/api/` route handlers.

---

## Step 3: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

---

## Step 4: Update `lib/waitlist.ts`

Replace the file adapter section with Supabase calls. The public API (`signup`, `lookupByCode`, `getTotalSignups`) stays identical -- only the storage layer changes.

Replace everything from `// ─── File adapter ─────` to `// ─── Public API ─────` with:

```typescript
// ─── Supabase adapter ─────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function readEntries(): Promise<WaitlistEntry[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    referralCode: row.referral_code,
    referredBy: row.referred_by,
    referralCount: row.referral_count,
    createdAt: row.created_at,
  }))
}
```

Then update the `signup` function to use async Supabase calls instead of `readData`/`writeData`. Replace the `signup` function body:

```typescript
export async function signup(input: {
  name: string
  email: string
  company: string
  referredBy?: string
}): Promise<SignupResult> {
  const supabase = getSupabase()

  try {
    // Check for duplicate email
    const { data: existing } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', input.email.toLowerCase().trim())
      .single()

    if (existing) {
      const allEntries = await readEntries()
      const entry = mapRow(existing)
      const position = calculatePosition(entry, allEntries)
      return { success: true, entry, position, totalSignups: allEntries.length }
    }

    // Credit referrer if valid code
    if (input.referredBy) {
      await supabase
        .from('waitlist')
        .update({ referral_count: supabase.rpc('increment', { x: 1 }) })
        .eq('referral_code', input.referredBy)
      // Note: use a Postgres function for atomic increment (see below)
    }

    const referralCode = generateReferralCode(input.name)
    const { data: inserted, error } = await supabase
      .from('waitlist')
      .insert({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        company: input.company.trim(),
        referral_code: referralCode,
        referred_by: input.referredBy ?? null,
        referral_count: 0,
      })
      .select()
      .single()

    if (error || !inserted) {
      console.error('[waitlist] insert error:', error)
      return { success: false, error: 'server_error' }
    }

    const allEntries = await readEntries()
    const entry = mapRow(inserted)
    const position = calculatePosition(entry, allEntries)
    return { success: true, entry, position, totalSignups: allEntries.length }
  } catch (err) {
    console.error('[waitlist] signup error:', err)
    return { success: false, error: 'server_error' }
  }
}

function mapRow(row: any): WaitlistEntry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    referralCode: row.referral_code,
    referredBy: row.referred_by,
    referralCount: row.referral_count,
    createdAt: row.created_at,
  }
}
```

Add an atomic increment function in Supabase SQL editor (prevents race conditions on referral_count):

```sql
create or replace function increment(x integer, row_id uuid)
returns void as $$
  update waitlist set referral_count = referral_count + x where id = row_id;
$$ language sql;
```

---

## Step 5: Update API Routes

Both `app/api/waitlist/signup/route.ts` and `app/api/waitlist/[code]/route.ts` call `signup` and `lookupByCode` synchronously. With Supabase, these become async. Make both route handlers async and await the results:

```typescript
// Before
const result = signup({ name, email, company, referredBy })

// After
const result = await signup({ name, email, company, referredBy })
```

Same pattern for `lookupByCode`.

---

## Step 6: Migrate Existing Data

If there are any existing entries in `data/waitlist.json`, import them to Supabase before going live:

```bash
# From the project root
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/waitlist.json', 'utf8'));
console.log(JSON.stringify(data.entries, null, 2));
" 
```

Copy the output and use Supabase's table editor to import, or write a one-time migration script.

---

## Step 7: Verify Before Deploying

1. Test signup locally with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set
2. Confirm a new entry appears in the Supabase table
3. Confirm duplicate email returns existing entry (not an error)
4. Confirm referral code lookup works
5. Confirm referrer's `referral_count` increments correctly
6. Delete test entries from Supabase
7. Deploy to Vercel with env vars set in Vercel project settings

---

## Vercel Env Vars

In Vercel project settings > Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL` -- Production + Preview + Development
- `SUPABASE_SERVICE_ROLE_KEY` -- Production only (do not expose in Preview builds)
