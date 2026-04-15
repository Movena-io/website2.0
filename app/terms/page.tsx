import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — Movena',
  description: 'The terms governing use of the Movena platform and waitlist. Operated by NewNorth I/S in Copenhagen, Denmark.',
  alternates: {
    canonical: '/terms',
  },
}

export default function Terms() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-[40px] font-bold tracking-[-0.025em] text-[#0B1F3B] mb-3">Terms of Service</h1>
          <p className="text-[14px] text-[#475569] mb-12">Last updated: April 2026</p>

          <div className="flex flex-col gap-0">

            <Section title="1. Agreement">
              <p>By joining the Movena waitlist or using the Movena platform, you agree to these Terms of Service. If you do not agree, do not use our service. These terms are governed by the laws of Denmark.</p>
            </Section>

            <Section title="2. The service">
              <p>Movena provides software tools for moving companies, including quoting, scheduling, crew coordination, and customer communication. The platform is provided as a subscription service (SaaS).</p>
              <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice.</p>
            </Section>

            <Section title="3. Accounts and access">
              <p>You are responsible for maintaining the confidentiality of your account credentials. You must not share your account with others or allow unauthorized access. You are responsible for all activity that occurs under your account.</p>
              <p>You must be at least 18 years old and legally authorized to enter into contracts on behalf of your company to use Movena.</p>
            </Section>

            <Section title="4. Acceptable use">
              <p>You agree not to:</p>
              <ul>
                <li>Use Movena for any unlawful purpose</li>
                <li>Attempt to reverse engineer, copy, or resell the platform</li>
                <li>Upload malicious code or attempt to compromise our infrastructure</li>
                <li>Use the service to harm, defraud, or mislead customers or third parties</li>
              </ul>
            </Section>

            <Section title="5. Your data">
              <p>You retain ownership of all data you enter into Movena (customer records, job details, etc.). We do not claim any rights to your data. See our <a href="/privacy" className="text-[#1D4ED8] hover:underline">Privacy Policy</a> for details on how we handle it.</p>
              <p>You are responsible for ensuring that the data you enter complies with applicable laws, including GDPR obligations toward your own customers.</p>
            </Section>

            <Section title="6. Payment and billing">
              <p>Movena is a paid subscription once launched. Pricing will be communicated before you are asked to pay. Subscriptions are billed per user, per month. All prices are exclusive of VAT unless stated otherwise.</p>
              <p>Early waitlist members may be offered founding member pricing. Any such offer will be communicated in writing.</p>
            </Section>

            <Section title="7. Intellectual property">
              <p>Movena and all its components, design, and code are the intellectual property of NewNorth I/S. You may not copy, reproduce, or distribute any part of the platform without written permission.</p>
            </Section>

            <Section title="8. Limitation of liability">
              <p>Movena is provided &ldquo;as is.&rdquo; We make no warranty that the service will be uninterrupted or error-free. To the fullest extent permitted by law, NewNorth I/S is not liable for indirect, incidental, or consequential damages arising from your use of the service.</p>
            </Section>

            <Section title="9. Termination">
              <p>Either party may terminate the agreement with 30 days written notice. We may terminate immediately if you breach these terms. Upon termination, you may export your data for 30 days before it is deleted.</p>
            </Section>

            <Section title="10. Contact">
              <p>For questions about these terms, contact us at <a href="mailto:hello@movena.io" className="text-[#1D4ED8] hover:underline">hello@movena.io</a>.</p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-[20px] font-bold text-[#0B1F3B] mb-4 tracking-[-0.01em]">{title}</h2>
      <div className="flex flex-col gap-3 text-[16px] font-normal text-[#475569] leading-[1.75] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_strong]:font-semibold [&_strong]:text-[#0F172A]">
        {children}
      </div>
    </div>
  )
}
