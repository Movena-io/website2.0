'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function CookieConsent() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent')
    if (!stored) {
      // Small delay so it doesn't flash on initial paint
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    window.dispatchEvent(new Event('cookie-consent-update'))
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-[#0B1F3B] border border-white/10 rounded-xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-[13px] leading-[1.6] text-[#94A3B8] flex-1">
          {t.cookieConsent.message}{' '}
          <a href="/en/privacy" className="text-white underline underline-offset-2 hover:text-[#93C5FD] transition-colors">
            {t.cookieConsent.privacyLink}
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-[13px] font-medium text-[#64748B] hover:text-[#94A3B8] transition-colors"
          >
            {t.cookieConsent.decline}
          </button>
          <button
            onClick={accept}
            className="text-[13px] font-semibold bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-4 py-2 rounded-lg transition-colors"
          >
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
