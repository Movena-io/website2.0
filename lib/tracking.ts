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

// ─── Savings calculator funnel ────────────────────────────────────────────────

function trackCalcEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export function trackCalculatorStart() {
  trackCalcEvent('calculator_start')
}

export function trackCalculatorComplete() {
  trackCalcEvent('calculator_complete')
}

export function trackCalculatorUnlock() {
  trackCalcEvent('calculator_unlock')

  // A captured lead is a real signal. Mirror the waitlist on Meta Pixel.
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { source: 'savings_calculator' })
  }
}
