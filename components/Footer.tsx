import { Truck } from 'lucide-react'

const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'

const links = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Join waitlist', href: TYPEFORM_URL, external: true },
  ],
  Company: [
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3B] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Main row */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left: logo + tagline */}
          <div className="max-w-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#1D4ED8] flex items-center justify-center shrink-0">
                <Truck size={13} strokeWidth={1.5} className="text-white" />
              </div>
              <span className="text-[16px] font-extrabold tracking-[-0.025em] text-white">Movena</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-[#64748B]">
              All-in-one platform built for moving companies.
            </p>
          </div>

          {/* Right: link columns */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#475569] mb-4">
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map(({ label, href, external }: { label: string; href: string; external?: boolean }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-[13px] text-[#94A3B8] hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-[#475569]">
            &copy; {new Date().getFullYear()} Movena. All rights reserved.
          </p>
          <p className="text-[12px] text-[#475569]">Copenhagen, Denmark</p>
        </div>

      </div>
    </footer>
  )
}
