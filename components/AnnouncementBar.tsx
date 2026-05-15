'use client'

import { Sparkles, ArrowRight } from 'lucide-react'
import { SIGNUP_URL } from '@/lib/constants'
import { trackSignupClick } from '@/lib/tracking'
import { useLanguage } from '@/lib/LanguageContext'

export default function AnnouncementBar() {
  const { t } = useLanguage()

  return (
    <a
      href={SIGNUP_URL}
      onClick={() => trackSignupClick('announcement_bar')}
      className="group block w-full bg-[#1D4ED8] text-white hover:bg-[#0a1d36] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-medium leading-tight">
        <Sparkles size={13} strokeWidth={2} className="text-[#60A5FA] shrink-0" />
        <span className="text-white/80">{t.announcement.text}</span>
        <span className="font-semibold text-white">{t.announcement.highlight}</span>
        <span className="text-white/80">{t.announcement.tail}</span>
        <ArrowRight
          size={13}
          strokeWidth={2.5}
          className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
        />
      </div>
    </a>
  )
}
