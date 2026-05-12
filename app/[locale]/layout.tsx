import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import '../globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
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
    title: 'Movena: All-in-one software for moving companies',
    description:
      'Software for moving companies. Quotes, scheduling, crew coordination, and customer follow-ups in one platform. Built for movers done managing a stack of disconnected tools.',
    ogLocale: 'en_US',
  },
  da: {
    title: 'Movena: Alt-i-ét software til flyttefirmaer',
    description:
      'Software til flyttefirmaer. Tilbud, kalender, holdkoordinering og kundeopfølgninger i én platform. Bygget til flyttefirmaer, der er trætte af at jonglere en stak af forskellige værktøjer.',
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Movena',
  url: 'https://movena.io',
  logo: 'https://movena.io/favicon.svg',
  description:
    'All-in-one software platform for moving companies. Quotes, scheduling, crew coordination, and customer follow-ups in one place.',
  email: 'hello@movena.io',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Copenhagen',
    addressCountry: 'DK',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'NewNorth I/S',
  },
  sameAs: [] as string[],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Movena',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Moving Company Software',
  operatingSystem: 'Web',
  description:
    'All-in-one platform for moving companies: quoting, dispatch optimization, crew mobile app, and customer tracking.',
  url: 'https://movena.io',
  provider: {
    '@type': 'Organization',
    name: 'Movena',
    url: 'https://movena.io',
  },
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

  return (
    <html lang={params.locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans bg-white text-[#0F172A] antialiased`}>
        <LanguageProvider initialLocale={params.locale}>
          {children}
          <Analytics />
          <GoogleAnalytics />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
