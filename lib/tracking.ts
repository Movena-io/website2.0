export function trackWaitlistClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'waitlist_click', { location })
  }
}

export function trackSignupClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'signup_click', { location })
  }
}

export function trackLoginClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'login_click', { location })
  }
}
