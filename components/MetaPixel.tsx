'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Set NEXT_PUBLIC_META_PIXEL_ID in Vercel project settings (and locally in
// .env.local). Without it the component renders nothing, so the site keeps
// working in dev / pre-launch.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function MetaPixel() {
  const [consented, setConsented] = useState(false)
  const pathname = usePathname()

  // GDPR: only load after user accepts cookies.
  useEffect(() => {
    const check = () => {
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        setConsented(true)
      }
    }
    check()
    window.addEventListener('cookie-consent-update', check)
    return () => window.removeEventListener('cookie-consent-update', check)
  }, [])

  // App Router doesn't fire a full page load on client-side navigation, so
  // re-fire PageView on every pathname change after the pixel is loaded.
  useEffect(() => {
    if (!consented || !PIXEL_ID) return
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [consented, pathname])

  if (!consented || !PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>

      {/* JS-disabled fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
