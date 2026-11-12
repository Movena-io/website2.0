import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import { SiteShell } from '@/components/redesign/Layout'
import { LegalPage } from '@/components/redesign/OtherPages'
import { PRIVACY_UPDATED_DA, PrivacyBodyDa } from '@/components/redesign/PrivacyBody'

// This slug belongs to the da tree only; the other locale has its own.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'da') return {}
  return pageMetadata('privacy', 'da')
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale !== 'da') notFound()
  return (
    <SiteShell>
      <LegalPage title="Privatlivspolitik" updated={PRIVACY_UPDATED_DA}>
        <PrivacyBodyDa />
      </LegalPage>
    </SiteShell>
  )
}
