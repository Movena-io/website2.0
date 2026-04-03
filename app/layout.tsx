import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import { Analytics } from '@vercel/analytics/react'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Movena — All-in-one platform for moving companies',
  description: 'Quotes, scheduling, crew tracking, and invoicing in one place. Built for moving companies that are done managing five different tools.',
  metadataBase: new URL('https://movena.io'),
  openGraph: {
    title: 'Movena — All-in-one platform for moving companies',
    description: 'Quotes, scheduling, crew tracking, and invoicing in one place. Built for moving companies that are done managing five different tools.',
    url: 'https://movena.io',
    siteName: 'Movena',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 627,
        alt: 'Movena — All-in-one platform for moving companies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movena — All-in-one platform for moving companies',
    description: 'Quotes, scheduling, crew tracking, and invoicing in one place. Built for moving companies that are done managing five different tools.',
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
        </LanguageProvider>
      </body>
    </html>
  )
}
