'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import {
  PRICING,
  CURRENCY_SYMBOLS,
  SIGNUP_URL,
  type PricingCurrency,
  type PricingInterval,
} from '@/lib/constants'
import { trackSignupClick } from '@/lib/tracking'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

// ─── Pill toggles ─────────────────────────────────────────────────────────────

function PillGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; badge?: string }[]
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] p-1">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ' +
              (active ? 'bg-white text-[#0B1F3B] shadow-sm' : 'text-[#64748B] hover:text-[#0B1F3B]')
            }
          >
            <span>{opt.label}</span>
            {opt.badge && (
              <span className="rounded-full bg-[#1D4ED8]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">
                {opt.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Per-role card ────────────────────────────────────────────────────────────

function PriceCard({
  name,
  tagline,
  features,
  amount,
  currency,
  interval,
  perMonthLabel,
  perUserLabel,
  ctaLabel,
  ctaLocation,
}: {
  name: string
  tagline: string
  features: readonly string[]
  amount: number
  currency: PricingCurrency
  interval: PricingInterval
  perMonthLabel: string
  perUserLabel: string
  ctaLabel: string
  ctaLocation: string
}) {
  // Annual cards show the effective monthly figure with the full-year cost underneath.
  const monthly = interval === 'year' ? amount / 12 : amount
  const display =
    interval === 'year'
      ? (Math.round(monthly * 100) / 100).toLocaleString(undefined, {
          minimumFractionDigits: monthly % 1 === 0 ? 0 : 2,
          maximumFractionDigits: 2,
        })
      : amount.toString()

  return (
    <div className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[15px] font-semibold text-[#0B1F3B]">{name}</p>
      <p className="mt-1 text-[13px] text-[#64748B] leading-[1.5]">{tagline}</p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[40px] font-semibold tracking-[-0.02em] text-[#0B1F3B]">
          {CURRENCY_SYMBOLS[currency]}{display}
        </span>
        <span className="text-[14px] font-medium text-[#64748B]">{perMonthLabel}</span>
      </div>
      <p className="mt-1 text-[12px] text-[#94A3B8]">
        {perUserLabel}
        {interval === 'year' && (
          <>
            {' · '}
            {CURRENCY_SYMBOLS[currency]}{amount} {interval === 'year' ? '/year' : ''}
          </>
        )}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-[#475569] leading-[1.5]">
            <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#1D4ED8]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={SIGNUP_URL}
        onClick={() => trackSignupClick(ctaLocation)}
        className="mt-7 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold transition-colors"
      >
        {ctaLabel}
        <ArrowRight size={15} strokeWidth={2} />
      </a>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { t } = useLanguage()
  const localizedHref = useLocalizedHref()

  const [currency, setCurrency] = useState<PricingCurrency>('DKK')
  const [interval, setInterval] = useState<PricingInterval>('month')

  const adminAmount = PRICING.admin[currency][interval]
  const crewAmount = PRICING.crew[currency][interval]

  return (
    <section id="pricing" className="bg-white scroll-mt-24 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
            {t.pricing.label}
          </span>
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.pricing.headline} <span className="text-[#29ABE2]">{t.pricing.highlight}</span>
          </h2>
          <p className="text-[15px] text-[#475569] max-w-[520px] leading-[1.7]">
            {t.pricing.subheadline}
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <PillGroup
            value={interval}
            onChange={setInterval}
            options={[
              { value: 'month', label: t.pricing.monthlyLabel },
              { value: 'year', label: t.pricing.annualLabel, badge: t.pricing.annualSavings },
            ]}
          />
          <PillGroup
            value={currency}
            onChange={setCurrency}
            options={[
              { value: 'DKK', label: 'DKK' },
              { value: 'EUR', label: 'EUR' },
              { value: 'USD', label: 'USD' },
            ]}
          />
        </div>

        {/* Currency note */}
        {currency === 'USD' && (
          <p className="text-center text-[12px] text-[#94A3B8] -mt-6 mb-8">
            {t.pricing.currencyNote}
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <PriceCard
            name={t.pricing.tiers.admin.name}
            tagline={t.pricing.tiers.admin.tagline}
            features={t.pricing.tiers.admin.features}
            amount={adminAmount}
            currency={currency}
            interval={interval}
            perMonthLabel={t.pricing.perMonth}
            perUserLabel={t.pricing.perUser}
            ctaLabel={t.pricing.ctaPrimary}
            ctaLocation="pricing_admin"
          />
          <PriceCard
            name={t.pricing.tiers.crew.name}
            tagline={t.pricing.tiers.crew.tagline}
            features={t.pricing.tiers.crew.features}
            amount={crewAmount}
            currency={currency}
            interval={interval}
            perMonthLabel={t.pricing.perMonth}
            perUserLabel={t.pricing.perUser}
            ctaLabel={t.pricing.ctaPrimary}
            ctaLocation="pricing_crew"
          />
        </div>

        {/* Included strip */}
        <div className="mt-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] px-6 py-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#475569] mb-3 text-center sm:text-left">
            {t.pricing.includedTitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.pricing.included.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#1D4ED8]" />
                <span className="text-[13px] text-[#475569] leading-[1.5]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-center text-[13px] text-[#64748B]">
          {t.pricing.finePrint}{' '}
          <a
            href={localizedHref('/contact')}
            className="font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
          >
            {t.pricing.ctaSecondary}
          </a>
        </p>

      </div>
    </section>
  )
}
