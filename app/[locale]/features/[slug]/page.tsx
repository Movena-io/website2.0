import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { features, getFeatureBySlug } from '@/lib/features'
import { featureMetadata } from '@/lib/page-meta'
import { SiteShell } from '@/components/redesign/Layout'
import { FeaturePage } from '@/components/redesign/FeaturePage'

// /en/features/<slug> exists in the en tree only; the other language has its
// own base path and slugs (see lib/features.ts).
export const dynamicParams = false

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== 'en') return []
  return features.map((feature) => ({ slug: feature.slug.en }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const feature = params.locale === 'en' ? getFeatureBySlug(params.slug, 'en') : undefined
  return feature ? featureMetadata(feature, 'en') : {}
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  const feature = params.locale === 'en' ? getFeatureBySlug(params.slug, 'en') : undefined
  if (!feature) notFound()
  return (
    <SiteShell>
      <FeaturePage featureKey={feature.key} />
    </SiteShell>
  )
}
