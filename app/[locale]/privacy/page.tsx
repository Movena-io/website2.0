import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import { SiteShell } from '@/components/redesign/Layout'
import { LegalPage } from '@/components/redesign/OtherPages'
import { PRIVACY_UPDATED_EN, PrivacyBodyEn } from '@/components/redesign/PrivacyBody'

// This slug belongs to the en tree only; the other locale has its own.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'en') return {}
  return pageMetadata('privacy', 'en')
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale !== 'en') notFound()
  return (
    <SiteShell>
      <LegalPage title="Privacy policy" updated={PRIVACY_UPDATED_EN}>
        <PrivacyBodyEn />
      </LegalPage>
    </SiteShell>
  )
}
