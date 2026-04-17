export function trackWaitlistClick(location: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'waitlist_click', { location })
  }
}
