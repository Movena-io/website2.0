'use client'

import { useState, useEffect } from 'react'
import { PRIVACY_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'

// Dispatched by the footer's cookie settings link to bring the banner back so a
// visitor can change an answer they already gave.
export const COOKIE_SETTINGS_EVENT = 'cookie-consent-open'

// Both answers share this, so declining is exactly as easy to hit as accepting.
// The only difference left is fill: accept is solid, decline is outlined. The
// transparent border on accept keeps the two the same size to the pixel.
const CONSENT_BUTTON =
  'text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap'

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

  useEffect(() => {
    // Reopened on purpose, so no opening delay this time.
    const open = () => setVisible(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, open)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open)
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    window.dispatchEvent(new Event('cookie-consent-update'))
    setVisible(false)
  }

  function decline() {
    const wasAccepted = localStorage.getItem('cookie-consent') === 'accepted'
    localStorage.setItem('cookie-consent', 'declined')
    window.dispatchEvent(new Event('cookie-consent-update'))
    setVisible(false)

    // Analytics and the pixel cannot be taken back out of the page once their
    // script has run, so withdrawing consent only really takes effect on a
    // fresh load. Reload only when there was consent to withdraw.
    if (wasAccepted) window.location.reload()
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-[#0B1F3B] border border-white/10 rounded-xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-[13px] leading-[1.6] text-[#94A3B8] flex-1">
          {t.cookieConsent.message}{' '}
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-2 hover:text-[#93C5FD] transition-colors"
          >
            {t.cookieConsent.privacyLink}
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className={`${CONSENT_BUTTON} border border-white/25 text-white hover:bg-white/10`}
          >
            {t.cookieConsent.decline}
          </button>
          <button
            onClick={accept}
            className={`${CONSENT_BUTTON} border border-transparent bg-[#1D4ED8] hover:bg-[#1E40AF] text-white`}
          >
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
