import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FEATURE_PAGES_ENABLED, features, getFeatureBySlug } from '@/lib/features'
import { featureMetadata } from '@/lib/page-meta'
import { SiteShell } from '@/components/redesign/Layout'
import { FeaturePage } from '@/components/redesign/FeaturePage'

// /da/funktioner/<slug> exists in the da tree only; the other language has its
// own base path and slugs (see lib/features.ts).
export const dynamicParams = false

export function generateStaticParams({ params }: { params: { locale: string } }) {
  // Switched off for launch step 1: no paths, so every URL here falls through
  // to the catch-all 404 exactly as before these pages existed.
  if (!FEATURE_PAGES_ENABLED || params.locale !== 'da') return []
  return features.map((feature) => ({ slug: feature.slug.da }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const feature = FEATURE_PAGES_ENABLED && params.locale === 'da' ? getFeatureBySlug(params.slug, 'da') : undefined
  return feature ? featureMetadata(feature, 'da') : {}
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  const feature = FEATURE_PAGES_ENABLED && params.locale === 'da' ? getFeatureBySlug(params.slug, 'da') : undefined
  if (!feature) notFound()
  return (
    <SiteShell>
      <FeaturePage featureKey={feature.key} />
    </SiteShell>
  )
}
