import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'You are on the Movena waitlist',
  description: 'Thanks for joining the Movena waitlist. Refer other moving companies to move up the list.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/waitlist/success',
  },
}

export default function WaitlistSuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
