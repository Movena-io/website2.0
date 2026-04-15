import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Movena — Talk to the team',
  description: 'Questions about Movena, the all-in-one platform for moving companies? Send us a message and we will get back to you.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Movena — Talk to the team',
    description: 'Questions about Movena, the all-in-one platform for moving companies? Send us a message and we will get back to you.',
    url: 'https://movena.io/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
