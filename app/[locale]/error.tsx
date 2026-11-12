'use client'

import { useEffect } from 'react'
import { SiteShell } from '@/components/redesign/Layout'
import { ErrorPage } from '@/components/redesign/OtherPages'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  useEffect(() => {
    // Sentry's client integration picks this up; logging it here keeps the
    // digest in the browser console for local debugging too.
    console.error(error)
  }, [error])

  return (
    <SiteShell>
      <ErrorPage reset={reset} />
    </SiteShell>
  )
}
