export function trackWaitlistClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'waitlist_click', { location })
  }
}

export function trackSignupClick(location: string) {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'signup_click', { location })
  }

  // Meta Pixel: signup intent. The actual CompleteRegistration event
  // fires from the Lovable app on successful account creation.
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { source: location })
  }
}

export function trackLoginClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'login_click', { location })
  }
}
