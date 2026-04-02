import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — Movena',
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-[40px] font-bold tracking-[-0.025em] text-[#0B1F3B] mb-3">Privacy Policy</h1>
          <p className="text-[14px] text-[#475569] mb-12">Last updated: March 2026</p>

          <div className="prose-custom">

            <Section title="1. Who we are">
              <p>Movena is an all-in-one software platform for moving companies. We are operated by Movena ApS, based in Copenhagen, Denmark. If you have questions about this policy, contact us at <a href="mailto:hello@movena.io" className="text-[#1D4ED8] hover:underline">hello@movena.io</a>.</p>
            </Section>

            <Section title="2. What data we collect">
              <p>When you join the waitlist or contact us, we collect:</p>
              <ul>
                <li>Your name and email address</li>
                <li>Your company name and size, if provided</li>
                <li>Any information you voluntarily share with us</li>
              </ul>
              <p>When you use the Movena platform (once launched), we may also collect operational data such as job records, customer details entered by you, and usage data to improve the product.</p>
            </Section>

            <Section title="3. How we use your data">
              <p>We use the data we collect to:</p>
              <ul>
                <li>Contact you about your waitlist position and product updates</li>
                <li>Provide and improve the Movena platform</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>We do not sell your data to third parties. We do not use your data for advertising.</p>
            </Section>

            <Section title="4. Legal basis (GDPR)">
              <p>We process your personal data on the following legal bases:</p>
              <ul>
                <li><strong>Consent</strong> — when you sign up for the waitlist or contact us</li>
                <li><strong>Legitimate interest</strong> — to operate and improve our service</li>
                <li><strong>Legal obligation</strong> — where required by law</li>
              </ul>
            </Section>

            <Section title="5. Data storage and security">
              <p>Your data is stored securely and encrypted in transit and at rest. We use trusted third-party infrastructure providers that comply with GDPR. We retain your data only as long as necessary for the purposes described in this policy.</p>
            </Section>

            <Section title="6. Your rights">
              <p>Under GDPR, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict how we process your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>To exercise any of these rights, email us at <a href="mailto:hello@movena.io" className="text-[#1D4ED8] hover:underline">hello@movena.io</a>.</p>
            </Section>

            <Section title="7. Cookies">
              <p>Our marketing website may use essential cookies for functionality. We do not use tracking or advertising cookies. If you have questions about our cookie use, contact us.</p>
            </Section>

            <Section title="8. Changes to this policy">
              <p>We may update this policy as our product and legal obligations evolve. We will notify waitlist members of material changes by email.</p>
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
