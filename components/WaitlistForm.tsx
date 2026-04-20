'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/LanguageContext'

type Step = 'email' | 'details' | 'submitting'

interface Props {
  variant?: 'hero' | 'cta'
}

export default function WaitlistForm({ variant = 'hero' }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referredBy = searchParams?.get('ref') ?? undefined
  const { t } = useLanguage()

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step === 'details') {
      nameRef.current?.focus()
    }
  }, [step])

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validateEmail(email)) {
      setError(t.waitlist.invalidEmail)
      return
    }
    setStep('details')
  }

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) { setError(t.waitlist.missingName); return }
    if (!company.trim()) { setError(t.waitlist.missingCompany); return }

    setStep('submitting')

    try {
      const res = await fetch('/api/waitlist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, referredBy }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStep('details')
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      router.push(`/waitlist/success?code=${data.code}`)
    } catch {
      setStep('details')
      setError(t.waitlist.networkError)
    }
  }

  const isHero = variant === 'hero'

  // --- Email step ---

  if (step === 'email') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.waitlist.emailPlaceholder}
            required
            autoComplete="email"
            className={cn(
              'flex-1 h-12 px-4 rounded-xl border text-[15px] font-medium placeholder:text-[#94A3B8] outline-none transition-all',
              isHero
                ? 'bg-white/90 border-white/50 text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
                : 'bg-white border-[#E2E8F0] text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
            )}
          />
          <button
            type="submit"
            className={cn(
              'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold transition-colors whitespace-nowrap shrink-0',
              isHero
                ? 'bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
            )}
          >
            {t.waitlist.getEarlyAccess}
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </form>
        {error && (
          <p className="mt-2 text-[13px] text-red-500 font-medium">{error}</p>
        )}
      </div>
    )
  }

  // --- Details step ---

  if (step === 'details') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-2">
          <p className={cn(
            'text-[13px] font-medium mb-1',
            isHero ? 'text-[#1E3A5F]/60' : 'text-[#64748B]'
          )}>
            {t.waitlist.lastStep}
          </p>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.waitlist.namePlaceholder}
            required
            autoComplete="name"
            className={cn(
              'h-12 px-4 rounded-xl border text-[15px] font-medium placeholder:text-[#94A3B8] outline-none transition-all',
              isHero
                ? 'bg-white/90 border-white/50 text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
                : 'bg-white border-[#E2E8F0] text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
            )}
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t.waitlist.companyPlaceholder}
            required
            autoComplete="organization"
            className={cn(
              'h-12 px-4 rounded-xl border text-[15px] font-medium placeholder:text-[#94A3B8] outline-none transition-all',
              isHero
                ? 'bg-white/90 border-white/50 text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
                : 'bg-white border-[#E2E8F0] text-[#0B1F3B] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20'
            )}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setStep('email'); setError(null) }}
              className={cn(
                'h-12 px-4 rounded-xl text-[14px] font-medium border transition-colors',
                isHero
                  ? 'bg-white/20 border-white/30 text-white/70 hover:bg-white/30'
                  : 'bg-transparent border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
              )}
            >
              {t.waitlist.back}
            </button>
            <button
              type="submit"
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold transition-colors',
                isHero
                  ? 'bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white'
                  : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
              )}
            >
              {t.waitlist.joinWaitlist}
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
          {error && (
            <p className="mt-1 text-[13px] text-red-500 font-medium">{error}</p>
          )}
        </form>
      </div>
    )
  }

  // --- Submitting ---

  return (
    <div className="w-full max-w-md">
      <div className={cn(
        'h-12 px-6 rounded-xl flex items-center justify-center gap-2 text-[15px] font-semibold',
        isHero ? 'bg-[#0B1F3B]/60 text-white/70' : 'bg-[#1D4ED8]/60 text-white/70'
      )}>
        <Loader2 size={16} className="animate-spin" />
        {t.waitlist.reserving}
      </div>
    </div>
  )
}
