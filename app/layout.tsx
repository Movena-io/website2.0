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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
