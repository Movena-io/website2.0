export function trackWaitlistClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'waitlist_click', { location })
  }
}

export function trackDemoClick(location: string) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'demo_click', { location })
  }

  // Meta Pixel: demo booking intent. Final Schedule event fires from Cal.com.
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Schedule', { source: location })
  }
}

export function trackLoginClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'login_click', { location })
  }
}
