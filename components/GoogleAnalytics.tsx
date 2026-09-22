'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = 'G-S0J0F29PP9'

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Reads the stored answer rather than only latching on to "accepted", so a
    // consent withdrawn from the footer's cookie settings stops re-adding the
    // tag. The already-running script goes away with the reload the banner does.
    const check = () => setConsented(localStorage.getItem('cookie-consent') === 'accepted')
    check()
    window.addEventListener('cookie-consent-update', check)
    return () => window.removeEventListener('cookie-consent-update', check)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
