import { SiteShell } from '@/components/redesign/Layout'
import { ContactPage } from '@/components/redesign/OtherPages'

// Metadata lives in layout.tsx. The form posts to /api/contact as before.
export default function Contact() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  )
}
