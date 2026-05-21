# Cost Saver Calculator — Build Spec

*Working spec. Status: drafting. Owner: Samuel. Last updated: 2026-05-21.*

A short interactive form on the Movena website that asks a moving company about how they
work today and returns a conservative estimate of the time and money Movena could save
them, plus the revenue they could unlock. Target completion time: 2 to 5 minutes. Ends on
a "book a call" CTA pointing at the existing Cal.com link.

The whole thing lives or dies on credibility. Every number must be defensible and lean
conservative. We would rather a mover nods at a believable number than rolls their eyes at
an inflated one. Show the math wherever we can.

---

## 1. Goal and success

- **Primary goal:** turn a cold visitor into a booked call. The calculator is a lead magnet
  and a trust builder, not a toy.
- **Secondary goal:** capture qualified leads (email + company profile) even when they don't
  book immediately.
- **Done when:** a visitor can complete the form, see a headline number for free, unlock the
  full breakdown with their email, and book a call, on mobile and desktop, in production.

---

## 2. UX flow

1. **Intro screen.** One line on what this is and the time it takes. Single "Start" button.
2. **Profile questions.** A few baseline questions that every module needs (company size,
   moves per month, hourly cost with a Nordic default pre-filled and adjustable).
3. **Modules.** Each value area is an opt-in module gated by a yes/no. If it doesn't apply,
   we skip it and ask nothing more. This keeps the form short and makes the result personal.
4. **Calculate.** Progress through is fast, ideally one question per screen on mobile with a
   progress bar.
5. **Result — headline (free).** Combined headline number up top, built from hard savings
   only. Revenue upside shown as a separate "+X% potential" line, never folded into the DKK
   headline. Below it, a blurred/locked preview of the full breakdown.
6. **Soft gate.** "Enter your email to see the full breakdown" reveals the breakdown on the
   page and (pending decision) emails them a copy.
7. **Breakdown (unlocked).** Per-module rows showing the inputs they gave, the assumption we
   applied, and the saving. Fully transparent.
8. **CTA.** "Book a 20-minute call" → `DEMO_URL` (the existing Cal.com link). Same tracking
   as the rest of the site (`trackDemoClick`).

---

## 3. Baseline / profile inputs

Asked once, used across all modules.

| Input | Type | Default | Notes |
|---|---|---|---|
| Moves per month | number | — | Drives planning, quoting, and other per-move math |
| Loaded hourly cost | number (DKK/hr) | ~250 DKK (adjustable) | Pre-filled Nordic default, slider/field to change. The single time-to-money conversion rate. |
| Team size | number | — | Optional, used for context and possibly scaling some modules |

> **Currency:** OPEN — see questions. Default DKK.

---

## 4. Modules

Each module: an entry question, 1 to 2 follow-up inputs, a multiplier we own, and an output.
All multipliers below are **final, confirmed by Samuel**. Two modules (lead follow-up,
reviews) use a self-diagnosis branch: instead of us claiming a number, the visitor states
their own, which makes the result theirs and raises their awareness of what they're losing.

### 4.1 Job / move planning
- **Entry:** always on (every mover plans jobs).
- **Inputs:** time spent planning each move (minutes).
- **Logic:** Movena cuts planning time by `P%`.
- **Output (time):** `moves/month × planning_minutes × P% ÷ 60` = hours saved/month.
- **`P = 40%`** (conservative).

### 4.2 Quoting (automatic / semi-automatic)
- **Entry:** "Do you send quotes to customers?"
- **Inputs:** quotes per month, time per quote (minutes).
- **Logic:** the customer fills in the data, but some movers still go out to physically
  review, so semi-auto quoting cuts `Q%` of the time, not all of it.
- **Output (time):** `quotes/month × quote_minutes × Q% ÷ 60` = hours saved/month.
- **`Q = 50%`**.

### 4.3 Lead follow-up (self-diagnosis branch)
- **Entry:** "Do you follow up on leads that don't book right away?"
  - **Yes →** inputs: leads/month followed up, time per follow-up (minutes).
    - **Logic:** Movena automates follow-up, cutting `F%` of the time.
    - **Output (time):** `leads/month × followup_minutes × F% ÷ 60` = hours saved/month.
    - **`F = 85%`**.
  - **No →** input: "If you did follow up, how much more revenue do you think you'd win? (%)"
    - **Output (upside):** `+X%` shown as a separate upside line. Percentage only, we do not
      ask their revenue and do not convert to DKK.

### 4.4 Reviews (self-diagnosis branch)
- **Entry:** "How many reviews do you get per month right now?" then "Do you send a review
  request after each job?"
  - **No →** "If you did, how many extra reviews do you think you'd get per month?"
    - **Output (upside):** `+N extra reviews/month`, in their own number, shown as a tangible
      upside line. No revenue figure attached.
  - **Yes →** treated as an automation flow (Movena automates the send): time saved on
    sending requests, folded into section 4.5.
- Reviews carry no invented DKK or %-revenue claim. The extra-reviews count is the upside.

### 4.5 Automation flows (time only)
- **Entry:** "Which manual touchpoints do you run today?" (multi-select: booking
  confirmations, reminders, post-move follow-up, review-request sending, etc.)
- **Inputs:** per selected flow, rough volume per month and minutes per touch.
- **Logic:** each automated flow removes `A%` of its manual time. Time only, no revenue claim.
- **Output (time):** sum over flows of `volume × minutes × A% ÷ 60` = hours saved/month.
- **`A = 90%`** per flow.

### 4.6 Inventory (self-reported loss)
- **Entry:** "Do you track inventory / equipment (e.g. moving boxes)?"
- **Inputs:** items lost per month, time spent chasing each (minutes), cost per item (DKK).
  The visitor self-reports the loss, which doubles as an awareness nudge.
- **Logic:** Movena automates chasing (`I%` of the time) and faster chasing recovers `R%` of
  what they currently lose.
- **Output (time):** `items_lost × chase_minutes × I% ÷ 60` = hours saved/month. **`I = 90%`**.
- **Output (money):** `items_lost × item_cost × R%` = DKK saved/month (direct). **`R = 30%`**.
- We also surface their full self-reported monthly loss as "what's at risk today" alongside
  the recovered figure.

> Modules are extensible. Samuel is walking the system to find more areas; adding a module
> is a self-contained block, so v1 can ship with these and grow.

---

## 5. The math, assembled

```
total_hours_saved   = sum of hours saved across all active modules   (per month)
money_from_time     = total_hours_saved × loaded_hourly_cost          (per month)
direct_money_saved  = inventory money saved + any other direct DKK     (per month)

HEADLINE (hard savings, free) = money_from_time + direct_money_saved
  → shown per month, with the annualized figure (× 12) alongside
  → direct_money_saved = inventory recovered (items_lost × item_cost × 30%)

UPSIDE (separate lines, never added to the DKK headline):
  → lead follow-up: "+X% potential revenue" (their self-reported %)
  → reviews: "+N extra reviews/month" (their self-reported count)
```

- **Time framing:** per month is the primary figure, annual alongside. Per month is
  relatable, annual is the punch.
- **Rounding:** round to clean ranges, never false precision (e.g. "~14,000 DKK/month", not
  "13,847 DKK"). Consider a low–high range rather than a single point.

---

## 6. Lead capture (soft gate)

- Email entered at the gate unlocks the on-page breakdown **and** triggers a copy of the
  report to the visitor via Resend (a second touchpoint and a reason to reply or book).
- **Where the lead goes:** **Attio CRM.** On submit, push a record with their answers, the
  computed result, email, company, timestamp, locale, and referral source. This is the
  pipeline we work the lead from.
- **Team notification:** **email the team** via Resend on each completion, with the lead and
  their headline result, so a hot lead gets seen fast.
- Three things fire on submit: Attio record created, report emailed to visitor, summary
  emailed to team. All from the one `POST /api/calculator/submit` handler.

---

## 7. Technical implementation

Mirrors existing site patterns (waitlist + contact).

- **Route:** `app/[locale]/savings-calculator/page.tsx`.
- **Component:** a client component holding form state, step machine, and result rendering.
  Framer Motion for step transitions, consistent with the site.
- **Styling:** Tailwind + existing design tokens, Manrope, brand guidelines. Reuse `ui/`
  primitives where they exist.
- **i18n:** **English + Danish**, full bilingual via the site's `[locale]` + `useLanguage()`
  / `translations.ts`. Every label, question, and result string needs both. Numbers format
  per locale; currency DKK for both.
- **API:** `POST /api/calculator/submit` — body: all answers + computed result + email. On
  submit it (1) creates the Attio record, (2) emails the visitor their report, (3) emails the
  team a summary. Follow the waitlist/contact route shape.
- **Data layer:** **Attio is the system of record** for leads, so no Supabase table needed
  for v1. Local JSON only as a dev fallback. The Vercel serverless file-store caveat does not
  apply since the lead goes to Attio, not a file.
- **Email:** Resend is already wired (`resend` dep, `@react-email/render`). Two templates:
  the visitor report copy, and the team summary.
- **Analytics:** reuse `trackDemoClick` for the CTA; add lightweight events for start,
  complete, gate-unlock so we can measure the funnel.
- **Deploy:** push to GitHub only. Never `vercel deploy` from CLI.

---

## 8. Confirmed multipliers

All locked with Samuel. These are the credibility core; change only with reason.

| Module | Multiplier | Value |
|---|---|---|
| Job planning | planning time removed | 40% |
| Quoting | quote time removed (semi-auto, some still physically review) | 50% |
| Lead follow-up (yes) | follow-up time automated | 85% |
| Lead follow-up (no) | revenue upside | self-reported %, shown as line, no DKK |
| Reviews (no) | extra reviews | self-reported count, shown as line |
| Automation flows | manual flow time removed | 90%, time only |
| Inventory | chasing time automated | 90% |
| Inventory | loss recovered (money) | 30% of self-reported loss |
| Time-to-money | loaded hourly cost (pre-filled, adjustable) | 250 DKK/hr |

Still open, not blocking: any additional modules Samuel finds while walking the system.

---

## 9. Build phases

1. **Phase 1 — Logic + result, English, local.** Form, all six modules with the confirmed
   multipliers, the math, and the result page (headline + breakdown). No gate, no persistence.
   A clickable thing to react to.
2. **Phase 2 — Soft gate + Attio + emails + CTA.** Email unlock, Attio record on submit,
   visitor report email and team summary email via Resend, Cal.com CTA, funnel analytics
   events.
3. **Phase 3 — Danish + ship.** Add the `da` translations, final copy pass, deploy via GitHub.

---

## 10. Decisions (resolved)

1. **Route slug:** `/savings-calculator`.
2. **Languages:** English + Danish (full bilingual via `[locale]`).
3. **Lead destination:** Attio CRM.
4. **Gate email:** unlocks on-page breakdown AND emails the visitor a copy of the report.
5. **Team notification:** email the team a summary on each completion.
6. **Currency:** DKK only for v1.
7. **Time framing:** per month primary, annual figure alongside.

8. **Multipliers:** all confirmed, see section 8.
9. **Reviews:** their own self-diagnosis branch, not bundled into automation flows.
10. **Inventory:** visitor self-reports the loss; Movena recovers 30%.

### Still outstanding (not blocking the build)

- Any additional modules Samuel finds while walking the system.
