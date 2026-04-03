'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Copy, Users, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WaitlistData {
  name: string
  position: number
  referralCount: number
  totalSignups: number
  referralCode: string
  currentTier: { referrals: number; reward: string } | null
  nextTier: { referrals: number; reward: string; spotsJumped: number } | null
}

const TIERS = [
  { referrals: 1,  reward: 'Jump 50 spots on the waitlist'     },
  { referrals: 3,  reward: 'Early access — first wave at launch' },
  { referrals: 5,  reward: '3 months free at launch'            },
  { referrals: 10, reward: '20% lifetime discount'              },
]

export default function WaitlistSuccess() {
  const searchParams = useSearchParams()
  const code = searchParams?.get('code')

  const [data, setData] = useState<WaitlistData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const referralLink =
    typeof window !== 'undefined' && code
      ? `${window.location.origin}/?ref=${code}`
      : ''

  useEffect(() => {
    if (!code) { setLoading(false); return }
    fetch(`/api/waitlist/${code}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [code])

  function copyLink() {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#1D4ED8] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!data || !code) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-[17px] font-semibold text-[#0B1F3B]">Something went wrong.</p>
          <p className="mt-2 text-[15px] text-[#64748B]">Your signup may not have saved. Try again from the home page.</p>
          <a href="/" className="mt-6 inline-block text-[14px] font-semibold text-[#1D4ED8] hover:underline">
            Back to home
          </a>
        </div>
      </div>
    )
  }

  const firstName = data.name.split(' ')[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] bg-white h-16 flex items-center px-6">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1D4ED8] flex items-center justify-center shrink-0">
            <Truck size={13} strokeWidth={1.5} className="text-white" />
          </div>
          <span className="text-[16px] font-extrabold tracking-[-0.025em] text-[#0B1F3B]">Movena</span>
        </a>
      </header>

      <main className="max-w-xl mx-auto px-6 py-16">

        {/* Position card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-5">
            <Check size={24} strokeWidth={2.5} className="text-[#16A34A]" />
          </div>

          <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[#0B1F3B]">
            You&apos;re on the list, {firstName}.
          </h1>

          <div className="mt-6 py-6 border-t border-b border-[#F1F5F9]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
              Your waitlist position
            </p>
            <p className="text-[64px] font-extrabold leading-none tracking-[-0.03em] text-[#0B1F3B] mt-2">
              #{data.position.toLocaleString()}
            </p>
            <p className="text-[14px] text-[#64748B] mt-2">
              out of {data.totalSignups.toLocaleString()} companies on the waitlist
            </p>
          </div>

          {data.currentTier && (
            <div className="mt-5 py-3 px-4 bg-[#EFF6FF] rounded-xl">
              <p className="text-[13px] font-semibold text-[#1D4ED8]">
                You unlocked: {data.currentTier.reward}
              </p>
            </div>
          )}
        </div>

        {/* Referral section */}
        <div className="mt-6 bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users size={18} strokeWidth={1.5} className="text-[#1D4ED8] shrink-0" />
            <h2 className="text-[17px] font-bold text-[#0B1F3B]">Move up the list faster</h2>
          </div>
          <p className="text-[14px] leading-[1.65] text-[#64748B] mb-5">
            Every company you refer jumps you 50 spots. You&apos;ve referred{' '}
            <span className="font-semibold text-[#0B1F3B]">{data.referralCount}</span> so far.
          </p>

          {/* Referral link */}
          <div className="flex gap-2">
            <div className="flex-1 h-11 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center overflow-hidden">
              <span className="text-[13px] text-[#475569] truncate font-mono">
                {referralLink}
              </span>
            </div>
            <button
              onClick={copyLink}
              className={cn(
                'h-11 px-4 rounded-xl text-[13px] font-semibold transition-colors shrink-0 flex items-center gap-2',
                copied
                  ? 'bg-[#DCFCE7] text-[#16A34A]'
                  : 'bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white'
              )}
            >
              <Copy size={14} strokeWidth={2} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Tier table */}
          <div className="mt-6 space-y-2">
            {TIERS.map((tier) => {
              const unlocked = data.referralCount >= tier.referrals
              return (
                <div
                  key={tier.referrals}
                  className={cn(
                    'flex items-center justify-between py-2.5 px-3 rounded-xl text-[13px]',
                    unlocked ? 'bg-[#EFF6FF]' : 'bg-[#F8FAFC]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                      unlocked ? 'bg-[#1D4ED8]' : 'bg-[#E2E8F0]'
                    )}>
                      {unlocked
                        ? <Check size={11} strokeWidth={2.5} className="text-white" />
                        : <span className="text-[10px] font-bold text-[#94A3B8]">{tier.referrals}</span>
                      }
                    </div>
                    <span className={cn(
                      'font-medium',
                      unlocked ? 'text-[#1D4ED8]' : 'text-[#64748B]'
                    )}>
                      {tier.reward}
                    </span>
                  </div>
                  <span className={cn(
                    'font-semibold shrink-0 ml-3',
                    unlocked ? 'text-[#1D4ED8]' : 'text-[#94A3B8]'
                  )}>
                    {tier.referrals} {tier.referrals === 1 ? 'referral' : 'referrals'}
                  </span>
                </div>
              )
            })}
          </div>

          {data.nextTier && (
            <p className="mt-4 text-[13px] text-[#64748B] text-center">
              {data.nextTier.referrals - data.referralCount} more referral
              {data.nextTier.referrals - data.referralCount === 1 ? '' : 's'} to unlock:{' '}
              <span className="font-semibold text-[#0B1F3B]">{data.nextTier.reward}</span>
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-[13px] text-[#94A3B8]">
          We&apos;ll email you when Movena launches. No spam, ever.
        </p>
      </main>
    </div>
  )
}
