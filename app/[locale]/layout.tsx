import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import '../globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MetaPixel from '@/components/MetaPixel'
import { LOCALES, isLocale, type Locale } from '@/lib/locales'

const manrope = localFont({
  src: '../../public/fonts/manrope-variable.woff2',
  variable: '--font-manrope',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const META_BY_LOCALE: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'Movena: Software for Danish and European moving companies',
    description:
      'Movena is a Danish company in Copenhagen. Quotes, scheduling, crew and invoicing in one system for moving companies, built together with Danish movers and made to run across Europe.',
    ogLocale: 'en_GB',
  },
  da: {
    title: 'Movena: Software til danske flyttefirmaer',
    description:
      'Movena er et dansk system til flyttefirmaer. Tilbud, planlægning, mandskab og fakturering i et. Bygget i København sammen med danske flyttefirmaer.',
    ogLocale: 'da_DK',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {}
  }

  const meta = META_BY_LOCALE[params.locale]
  const path = `/${params.locale}`

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL('https://movena.io'),
    alternates: {
      canonical: path,
      languages: {
        en: '/en',
        da: '/da',
        'x-default': '/en',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://movena.io${path}`,
      siteName: 'Movena',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 627,
          alt: meta.title,
        },
      ],
      locale: meta.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
    },
  }
}

// Both schemas are built per locale. An English description sitting on /da
// is the single clearest signal to an LLM that the Danish page is a
// translation of a foreign product rather than a Danish one.
const SCHEMA_COPY: Record<
  Locale,
  { org: string; software: string; locality: string; country: string; areaServed: string[] }
> = {
  en: {
    org: 'Movena is a Danish software company based in Copenhagen. We build one system for moving companies covering quotes, scheduling, crew, materials and invoicing, developed together with Danish moving companies and built to run across Europe.',
    software:
      'One system for moving companies: quoting, scheduling, crew coordination, materials, storage and invoicing, with a mobile app for the crew on site. Built in Denmark together with moving companies.',
    locality: 'Copenhagen',
    country: 'Denmark',
    areaServed: ['Denmark', 'Europe'],
  },
  da: {
    org: 'Movena er et dansk softwarefirma i København. Vi laver et samlet system til flyttefirmaer med tilbud, planlægning, mandskab, materialer og fakturering. Systemet er bygget sammen med danske flyttefirmaer.',
    software:
      'Et samlet system til flyttefirmaer: tilbud, planlægning, mandskab, materialer, opmagasinering og fakturering, med en app til medarbejderne ude på adressen. Bygget i Danmark sammen med flyttefirmaer.',
    locality: 'København',
    country: 'Danmark',
    areaServed: ['Danmark', 'Europa'],
  },
}

function buildOrganizationSchema(locale: Locale) {
  const copy = SCHEMA_COPY[locale]
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Movena',
    legalName: 'Movena I/S',
    url: `https://movena.io/${locale}`,
    logo: 'https://movena.io/favicon.svg',
    description: copy.org,
    email: 'hello@movena.io',
    telephone: '+45 28 70 84 02',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: copy.locality,
        addressCountry: 'DK',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rådhuspladsen',
      postalCode: '1550',
      addressLocality: copy.locality,
      addressCountry: 'DK',
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'CVR',
      value: '45966232',
    },
    areaServed: copy.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: ['da', 'en'],
    parentOrganization: {
      '@type': 'Organization',
      name: 'NewNorth I/S',
    },
    sameAs: [] as string[],
  }
}

function buildSoftwareSchema(locale: Locale) {
  const copy = SCHEMA_COPY[locale]
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Movena',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Moving Company Software',
    operatingSystem: 'Web',
    description: copy.software,
    url: `https://movena.io/${locale}`,
    inLanguage: locale,
    countryOfOrigin: {
      '@type': 'Country',
      name: copy.country,
    },
    provider: {
      '@type': 'Organization',
      name: 'Movena',
      url: 'https://movena.io',
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) {
    notFound()
  }

  const locale = params.locale as Locale

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema(locale)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSoftwareSchema(locale)) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans bg-white text-[#0F172A] antialiased`}>
        <LanguageProvider initialLocale={locale}>
          {children}
          <Analytics />
          <GoogleAnalytics />
          <MetaPixel />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
