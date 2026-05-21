'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Lock, Clock, TrendingUp, Star, Info } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { DEMO_URL } from '@/lib/constants'
import {
  trackDemoClick,
  trackCalculatorStart,
  trackCalculatorComplete,
  trackCalculatorUnlock,
} from '@/lib/tracking'
import { getCalculatorCopy, fill, type CalculatorCopy } from '@/lib/calculator/copy'
import { CURRENCIES, DEFAULT_CURRENCY, getCurrency } from '@/lib/calculator/currency'
import {
  computeSavings,
  EMPTY_INPUTS,
  type CalculatorInputs,
  type BreakdownRow as BreakdownRowData,
} from '@/lib/calculator/engine'

type Screen =
  | 'intro'
  | 'baseline'
  | 'planning'
  | 'quoting'
  | 'followup'
  | 'reviews'
  | 'messaging'
  | 'inventory'
  | 'result'

const QUESTION_SCREENS: Screen[] = [
  'baseline',
  'planning',
  'quoting',
  'followup',
  'reviews',
  'messaging',
  'inventory',
]

export default function SavingsCalculator() {
  const { locale } = useLanguage()
  const c = getCalculatorCopy(locale)

  const [screen, setScreen] = useState<Screen>('intro')
  const [direction, setDirection] = useState(1)
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...EMPTY_INPUTS,
    currency: DEFAULT_CURRENCY,
    hourlyCost: getCurrency(DEFAULT_CURRENCY).defaultHourly,
  })

  const result = useMemo(() => computeSavings(inputs), [inputs])
  const cur = inputs.currency

  const nf = useMemo(
    () => new Intl.NumberFormat(locale === 'da' ? 'da-DK' : 'en-US', { maximumFractionDigits: 0 }),
    [locale],
  )
  // Exact whole-currency display so every number equals the formula shown beside it.
  const money = (n: number) => nf.format(Math.round(n))
  const hours = (n: number) => nf.format(Math.round(n))
  const fc = (tmpl: string) => fill(tmpl, { cur })

  const set = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }))

  // Switching currency also resets the pre-filled hourly cost to that currency's default.
  const setCurrency = (code: string) =>
    setInputs((prev) => ({ ...prev, currency: code, hourlyCost: getCurrency(code).defaultHourly }))

  const go = (to: Screen, dir: number) => {
    setDirection(dir)
    setScreen(to)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const start = () => {
    trackCalculatorStart()
    go('baseline', 1)
  }

  const currentIndex = QUESTION_SCREENS.indexOf(screen)
  const next = () => {
    if (currentIndex < QUESTION_SCREENS.length - 1) {
      go(QUESTION_SCREENS[currentIndex + 1], 1)
    } else {
      trackCalculatorComplete()
      go('result', 1)
    }
  }
  const back = () => {
    if (screen === 'result') return go(QUESTION_SCREENS[QUESTION_SCREENS.length - 1], -1)
    if (currentIndex > 0) go(QUESTION_SCREENS[currentIndex - 1], -1)
    else go('intro', -1)
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        {screen !== 'intro' && screen !== 'result' && (
          <ProgressBar current={currentIndex + 1} total={QUESTION_SCREENS.length} label={c.progress} />
        )}

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {screen === 'intro' && <Intro c={c} onStart={start} />}

              {screen === 'baseline' && (
                <Step title={c.baseline.title} subtitle={c.baseline.subtitle}>
                  <SelectField
                    label={c.baseline.currencyLabel}
                    help={c.baseline.currencyHelp}
                    value={inputs.currency}
                    onChange={setCurrency}
                    options={CURRENCIES.map((x) => ({ value: x.code, label: x.label }))}
                  />
                  <NumberField
                    label={c.baseline.movesLabel}
                    help={c.baseline.movesHelp}
                    value={inputs.movesPerMonth}
                    onChange={(v) => set('movesPerMonth', v)}
                  />
                  <NumberField
                    label={c.baseline.hourlyLabel}
                    help={c.baseline.hourlyHelp}
                    suffix={fc(c.units.perHour)}
                    value={inputs.hourlyCost}
                    onChange={(v) => set('hourlyCost', v)}
                  />
                </Step>
              )}

              {screen === 'planning' && (
                <Step title={c.planning.title} subtitle={c.planning.subtitle}>
                  <NumberField
                    label={c.planning.minutesLabel}
                    help={c.planning.minutesHelp}
                    suffix={c.units.minutes}
                    value={inputs.planningMinutesPerMove}
                    onChange={(v) => set('planningMinutesPerMove', v)}
                  />
                </Step>
              )}

              {screen === 'quoting' && (
                <Step title={c.quoting.title}>
                  <YesNo
                    question={c.quoting.entry}
                    value={inputs.doesQuoting}
                    yes={c.yes}
                    no={c.no}
                    onChange={(v) => set('doesQuoting', v)}
                  />
                  {inputs.doesQuoting && (
                    <Reveal>
                      <NumberField
                        label={c.quoting.quotesLabel}
                        value={inputs.quotesPerMonth}
                        onChange={(v) => set('quotesPerMonth', v)}
                      />
                      <NumberField
                        label={c.quoting.minutesLabel}
                        help={c.quoting.minutesHelp}
                        suffix={c.units.minutes}
                        value={inputs.minutesPerQuote}
                        onChange={(v) => set('minutesPerQuote', v)}
                      />
                    </Reveal>
                  )}
                </Step>
              )}

              {screen === 'followup' && (
                <Step title={c.followup.title}>
                  <YesNo
                    question={c.followup.entry}
                    value={inputs.doesFollowup}
                    yes={c.yes}
                    no={c.no}
                    onChange={(v) => set('doesFollowup', v)}
                  />
                  {inputs.doesFollowup ? (
                    <Reveal>
                      <NumberField
                        label={c.followup.leadsLabel}
                        value={inputs.leadsPerMonth}
                        onChange={(v) => set('leadsPerMonth', v)}
                      />
                      <NumberField
                        label={c.followup.minutesLabel}
                        suffix={c.units.minutes}
                        value={inputs.minutesPerFollowup}
                        onChange={(v) => set('minutesPerFollowup', v)}
                      />
                    </Reveal>
                  ) : (
                    <Reveal>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8] mb-1">
                        {c.followup.upliftTitle}
                      </p>
                      <NumberField
                        label={c.followup.upliftLabel}
                        help={c.followup.upliftHelp}
                        suffix="%"
                        value={inputs.followupUpliftPct}
                        onChange={(v) => set('followupUpliftPct', v)}
                      />
                    </Reveal>
                  )}
                </Step>
              )}

              {screen === 'reviews' && (
                <Step title={c.reviews.currentTitle}>
                  <NumberField
                    label={c.reviews.currentLabel}
                    value={inputs.reviewsPerMonth}
                    onChange={(v) => set('reviewsPerMonth', v)}
                  />
                  <YesNo
                    question={c.reviews.sendsEntry}
                    value={inputs.sendsReviewRequest}
                    yes={c.yes}
                    no={c.no}
                    onChange={(v) => set('sendsReviewRequest', v)}
                  />
                  {inputs.sendsReviewRequest ? (
                    <Reveal>
                      <NumberField
                        label={c.reviews.sendsTimeLabel}
                        help={c.reviews.sendsTimeHelp}
                        suffix={c.units.minutes}
                        value={inputs.reviewMinutesPerMonth}
                        onChange={(v) => set('reviewMinutesPerMonth', v)}
                      />
                    </Reveal>
                  ) : (
                    <Reveal>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8] mb-1">
                        {c.reviews.extraTitle}
                      </p>
                      <NumberField
                        label={c.reviews.extraLabel}
                        help={c.reviews.extraHelp}
                        value={inputs.extraReviewsPerMonth}
                        onChange={(v) => set('extraReviewsPerMonth', v)}
                      />
                    </Reveal>
                  )}
                </Step>
              )}

              {screen === 'messaging' && (
                <Step title={c.messaging.title}>
                  <YesNo
                    question={c.messaging.entry}
                    value={inputs.doesMessaging}
                    yes={c.yes}
                    no={c.no}
                    onChange={(v) => set('doesMessaging', v)}
                  />
                  {inputs.doesMessaging && (
                    <Reveal>
                      <NumberField
                        label={c.messaging.hoursLabel}
                        help={c.messaging.hoursHelp}
                        suffix={c.units.hoursPerWeek}
                        value={inputs.messagingHoursPerWeek}
                        onChange={(v) => set('messagingHoursPerWeek', v)}
                      />
                    </Reveal>
                  )}
                </Step>
              )}

              {screen === 'inventory' && (
                <Step title={c.inventory.title}>
                  <YesNo
                    question={c.inventory.entry}
                    value={inputs.tracksInventory}
                    yes={c.yes}
                    no={c.no}
                    onChange={(v) => set('tracksInventory', v)}
                  />
                  {/* Fields show regardless of yes/no — most movers can estimate this. */}
                  <p className="text-[13px] text-[#94A3B8] leading-[1.5] -mt-1">{c.inventory.estimateNote}</p>
                  <NumberField
                    label={c.inventory.itemsLabel}
                    value={inputs.itemsLostPerMonth}
                    onChange={(v) => set('itemsLostPerMonth', v)}
                  />
                  <NumberField
                    label={c.inventory.minutesLabel}
                    suffix={c.units.minutes}
                    value={inputs.minutesChasingPerItem}
                    onChange={(v) => set('minutesChasingPerItem', v)}
                  />
                  <NumberField
                    label={fc(c.inventory.costLabel)}
                    value={inputs.costPerItem}
                    onChange={(v) => set('costPerItem', v)}
                  />
                </Step>
              )}

              {screen === 'result' && (
                <ResultView
                  c={c}
                  inputs={inputs}
                  result={result}
                  cur={cur}
                  money={money}
                  hours={hours}
                  onRestart={() => {
                    setInputs({
                      ...EMPTY_INPUTS,
                      currency: DEFAULT_CURRENCY,
                      hourlyCost: getCurrency(DEFAULT_CURRENCY).defaultHourly,
                    })
                    go('intro', -1)
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {screen !== 'intro' && screen !== 'result' && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={back}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#475569] hover:text-[#0B1F3B] transition-colors"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              {c.nav.back}
            </button>
            <button
              onClick={next}
              className="btn-gradient inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg text-white text-[14px] font-semibold"
            >
              {currentIndex === QUESTION_SCREENS.length - 1 ? c.nav.seeResults : c.nav.next}
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Screens ──────────────────────────────────────────────────────────────────

function Intro({ c, onStart }: { c: CalculatorCopy; onStart: () => void }) {
  return (
    <div className="text-center pt-6">
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
          {c.intro.eyebrow}
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
      </div>
      <h1 className="text-[30px] sm:text-[44px] font-extrabold tracking-[-0.025em] text-[#0B1F3B] leading-[1.1]">
        {c.intro.title}
      </h1>
      <p className="mt-5 text-[17px] sm:text-[18px] text-[#475569] leading-[1.7] max-w-xl mx-auto">
        {c.intro.subtitle}
      </p>
      <p className="mt-4 text-[14px] text-[#94A3B8]">{c.intro.timeNote}</p>
      <button
        onClick={onStart}
        className="btn-gradient inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-white text-[15px] font-semibold mt-8"
      >
        {c.intro.start}
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  )
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="pt-2">
      <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-[-0.02em] text-[#0B1F3B] leading-[1.15]">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[16px] text-[#475569] leading-[1.6]">{subtitle}</p>}
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </div>
  )
}

function ResultView({
  c,
  inputs,
  result,
  cur,
  money,
  hours,
  onRestart,
}: {
  c: CalculatorCopy
  inputs: CalculatorInputs
  result: ReturnType<typeof computeSavings>
  cur: string
  money: (n: number) => string
  hours: (n: number) => string
  onRestart: () => void
}) {
  const { locale } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'unlocked' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const fc = (tmpl: string) => fill(tmpl, { cur })
  const hasUpside = result.upside.revenuePct != null || result.upside.extraReviewsPerMonth != null
  const unlocked = status === 'unlocked'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !company.trim()) {
      setErrorMsg(c.gate.missingFields)
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg(c.gate.invalidEmail)
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/calculator/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, locale, inputs, result }),
      })
      if (res.ok) {
        trackCalculatorUnlock()
        setStatus('unlocked')
      } else {
        setErrorMsg(c.gate.networkError)
        setStatus('error')
      }
    } catch {
      setErrorMsg(c.gate.networkError)
      setStatus('error')
    }
  }

  return (
    <div className="pt-2">
      {/* Headline */}
      <div className="text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
          {c.result.eyebrow}
        </span>
        <div className="mt-4 text-[40px] sm:text-[56px] font-extrabold tracking-[-0.03em] text-[#0B1F3B] leading-[1]">
          {money(result.headlineMonthly)}
          <span className="text-[20px] sm:text-[26px] font-bold text-[#475569]"> {fc(c.units.moneyPerMonth)}</span>
        </div>
        <p className="mt-3 text-[16px] text-[#475569]">
          {fill(c.result.perYear, { value: money(result.headlineAnnual), cur })}
        </p>
        {result.totalHoursPerMonth > 0 && (
          <p className="mt-2 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0B1F3B]">
            <Clock size={16} className="text-[#1D4ED8]" strokeWidth={2} />
            {fill(c.result.hoursLine, { hours: hours(result.totalHoursPerMonth) })}
          </p>
        )}
      </div>

      {/* Upside (always free) */}
      {hasUpside && (
        <div className="mt-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#475569] mb-3">
            {c.result.upsideTitle}
          </p>
          <div className="flex flex-col gap-3">
            {result.upside.revenuePct != null && (
              <UpsideCard
                icon={<TrendingUp size={18} strokeWidth={2} />}
                value={fill(c.result.revenueUpside, { pct: result.upside.revenuePct })}
                note={c.result.revenueUpsideNote}
              />
            )}
            {result.upside.extraReviewsPerMonth != null && (
              <UpsideCard
                icon={<Star size={18} strokeWidth={2} />}
                value={fill(c.result.reviewUpside, { count: result.upside.extraReviewsPerMonth })}
                note={c.result.reviewUpsideNote}
              />
            )}
          </div>
        </div>
      )}

      {/* Breakdown — gated */}
      <div className="mt-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#475569] mb-3">
          {c.result.breakdownTitle}
        </p>

        {unlocked ? (
          <div className="rounded-2xl border border-[#E2E8F0] divide-y divide-[#E2E8F0] overflow-hidden">
            {result.rows.map((row) => (
              <BreakdownRow key={row.key} row={row} c={c} cur={cur} money={money} hours={hours} />
            ))}
            {result.inventoryExposureMonthly != null && (
              <div className="px-5 py-4 bg-[#FEF2F2]">
                <p className="text-[13px] text-[#991B1B]">
                  {fill(c.result.exposureNote, { value: money(result.inventoryExposureMonthly), cur })}
                </p>
              </div>
            )}
            <div className="px-5 py-4 bg-[#F8FAFC]">
              <p className="text-[12px] text-[#475569] leading-[1.6]">{c.result.assumptions}</p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl border border-[#E2E8F0] overflow-hidden">
            {/* blurred teaser background */}
            <div
              aria-hidden
              className="absolute inset-0 select-none pointer-events-none blur-[6px] opacity-50"
            >
              {result.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]"
                >
                  <span className="text-[15px] font-semibold text-[#0B1F3B]">{c.result.rowLabels[row.key]}</span>
                  <span className="text-[15px] font-bold text-[#0B1F3B]">••••</span>
                </div>
              ))}
            </div>
            {/* gate form in normal flow — defines the card height, so nothing clips */}
            <div className="relative bg-white/85 backdrop-blur-[2px] px-6 py-9">
              {status === 'sending' ? (
                <p className="text-center text-[15px] font-semibold text-[#475569]">{c.gate.sending}</p>
              ) : (
                <form onSubmit={submit} className="w-full">
                  <div className="flex items-center justify-center gap-2 mb-2 text-[#1D4ED8]">
                    <Lock size={16} strokeWidth={2} />
                    <p className="text-[15px] font-bold text-[#0B1F3B]">{c.result.lockedTitle}</p>
                  </div>
                  <p className="text-[13px] text-center text-[#475569] mb-5 max-w-sm mx-auto">{c.result.lockedNote}</p>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder={c.gate.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 w-full rounded-lg border border-[#E2E8F0] px-4 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={c.gate.companyPlaceholder}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="h-12 w-full rounded-lg border border-[#E2E8F0] px-4 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder={c.gate.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-lg border border-[#E2E8F0] px-4 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                    />
                    {status === 'error' && <p className="text-[12px] text-[#DC2626]">{errorMsg}</p>}
                    <button
                      type="submit"
                      className="btn-gradient inline-flex items-center justify-center gap-2 h-12 w-full rounded-lg text-white text-[15px] font-semibold mt-1"
                    >
                      {c.gate.button}
                      <ArrowRight size={15} strokeWidth={2} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-[#0B1F3B] px-7 py-8 text-center">
        <h3 className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-white leading-[1.15]">
          {c.result.ctaTitle}
        </h3>
        <p className="mt-3 text-[15px] text-white/60 leading-[1.6] max-w-md mx-auto">{c.result.ctaSubtitle}</p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDemoClick('savings_calculator')}
          className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white text-[#0B1F3B] text-[15px] font-semibold hover:bg-white/90 transition-colors mt-6"
        >
          {c.result.ctaButton}
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onRestart}
          className="text-[13px] font-semibold text-[#94A3B8] hover:text-[#475569] transition-colors"
        >
          {c.result.restart}
        </button>
      </div>
    </div>
  )
}

// ── Pieces ───────────────────────────────────────────────────────────────────

function BreakdownRow({
  row,
  c,
  cur,
  money,
  hours,
}: {
  row: BreakdownRowData
  c: CalculatorCopy
  cur: string
  money: (n: number) => string
  hours: (n: number) => string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-[15px] font-semibold text-[#0B1F3B]">{c.result.rowLabels[row.key]}</p>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={c.result.moreInfo}
              aria-expanded={open}
              className={`shrink-0 rounded-full p-0.5 transition-colors ${
                open ? 'text-[#1D4ED8]' : 'text-[#CBD5E1] hover:text-[#1D4ED8]'
              }`}
            >
              <Info size={15} strokeWidth={2} />
            </button>
          </div>
          <p className="text-[12px] text-[#94A3B8] mt-0.5 font-mono">{row.formula}</p>
        </div>
        <div className="text-right shrink-0">
          {row.hoursSavedPerMonth > 0 && (
            <p className="text-[15px] font-bold text-[#0B1F3B]">
              {hours(row.hoursSavedPerMonth)} {c.units.hoursPerMonth}
            </p>
          )}
          {row.moneySavedPerMonth > 0 && (
            <p className="text-[15px] font-bold text-[#16A34A]">
              {money(row.moneySavedPerMonth)} {fill(c.units.moneyPerMonth, { cur })}
            </p>
          )}
        </div>
      </div>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-[13px] text-[#475569] leading-[1.55] mt-2.5 overflow-hidden"
        >
          {c.result.rowInfo[row.key]}
        </motion.p>
      )}
    </div>
  )
}

function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  return (
    <div className="mb-10">
      <p className="text-[12px] font-semibold text-[#94A3B8] mb-2">{fill(label, { n: current, total })}</p>
      <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#1D4ED8]"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function NumberField({
  label,
  help,
  suffix,
  value,
  onChange,
}: {
  label: string
  help?: string
  suffix?: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-semibold text-[#0B1F3B]">{label}</label>
      {help && <p className="text-[13px] text-[#94A3B8] -mt-0.5">{help}</p>}
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
          className={`h-12 w-full rounded-lg border border-[#E2E8F0] pl-4 text-[16px] font-semibold text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors ${
            suffix ? 'pr-28' : 'pr-4'
          }`}
          placeholder="0"
        />
        {suffix && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#94A3B8] pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function SelectField({
  label,
  help,
  value,
  onChange,
  options,
}: {
  label: string
  help?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[15px] font-semibold text-[#0B1F3B]">{label}</label>
      {help && <p className="text-[13px] text-[#94A3B8] -mt-0.5">{help}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-lg border border-[#E2E8F0] pl-4 pr-10 text-[16px] font-semibold text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

function YesNo({
  question,
  value,
  yes,
  no,
  onChange,
}: {
  question: string
  value: boolean
  yes: string
  no: string
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[16px] font-semibold text-[#0B1F3B] leading-[1.4]">{question}</p>
      <div className="grid grid-cols-2 gap-3">
        <Choice active={value === true} label={yes} onClick={() => onChange(true)} />
        <Choice active={value === false} label={no} onClick={() => onChange(false)} />
      </div>
    </div>
  )
}

function Choice({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-lg border text-[15px] font-semibold transition-colors inline-flex items-center justify-center gap-2 ${
        active
          ? 'border-[#1D4ED8] bg-[#1D4ED8]/5 text-[#1D4ED8]'
          : 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1]'
      }`}
    >
      {active && <Check size={15} strokeWidth={2.5} />}
      {label}
    </button>
  )
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-6 overflow-hidden"
    >
      {children}
    </motion.div>
  )
}

function UpsideCard({ icon, value, note }: { icon: React.ReactNode; value: string; note: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] px-5 py-4">
      <div className="mt-0.5 text-[#1D4ED8]">{icon}</div>
      <div>
        <p className="text-[17px] font-extrabold text-[#0B1F3B] leading-[1.1]">{value}</p>
        <p className="text-[13px] text-[#475569] mt-1 leading-[1.5]">{note}</p>
      </div>
    </div>
  )
}
