import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import { SiteShell } from '@/components/redesign/Layout'
import { CallbackPage } from '@/components/redesign/OtherPages'

// Same slug in both languages.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {}
  return pageMetadata('bookDemo', params.locale as Locale)
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  return (
    <SiteShell>
      <CallbackPage />
    </SiteShell>
  )
}
