import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '@/components/CookieConsent'

const manrope = localFont({
  src: '../public/fonts/manrope-variable.woff2',
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Movena: All-in-one platform for moving companies',
  description: 'Quotes, scheduling, and crew tracking in one place. Built for moving companies that are done managing five different tools.',
  metadataBase: new URL('https://movena.io'),
  alternates: {
    canonical: '/',
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
    title: 'Movena: All-in-one platform for moving companies',
    description: 'Quotes, scheduling, and crew tracking in one place. Built for moving companies that are done managing five different tools.',
    url: 'https://movena.io',
    siteName: 'Movena',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 627,
        alt: 'Movena: All-in-one platform for moving companies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movena: All-in-one platform for moving companies',
    description: 'Quotes, scheduling, and crew tracking in one place. Built for moving companies that are done managing five different tools.',
    images: ['/og-image.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Movena',
  url: 'https://movena.io',
  logo: 'https://movena.io/favicon.svg',
  description: 'All-in-one software platform for moving companies. Quotes, scheduling, and crew tracking in one place.',
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
  description: 'All-in-one platform for moving companies: quoting, dispatch optimization, crew mobile app, customer tracking, and Nordic accounting integrations.',
  url: 'https://movena.io',
  offers: {
    '@type': 'Offer',
    price: '2500',
    priceCurrency: 'DKK',
    description: 'Starter plan from 2,500 DKK/month',
  },
  provider: {
    '@type': 'Organization',
    name: 'Movena',
    url: 'https://movena.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0J0F29PP9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S0J0F29PP9');`,
          }}
        />
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
        <LanguageProvider>
          {children}
          <Analytics />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
