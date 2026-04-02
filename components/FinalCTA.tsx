import { ArrowRight } from 'lucide-react'

const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'

export default function FinalCTA() {
  return (
    <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-28 relative overflow-hidden" id="waitlist">
      {/* Dot grid background with radial fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center gap-4 justify-center mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">Early access</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
        </div>
        <h2 className="text-[32px] lg:text-[42px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0B1F3B]">
          Get early access <span className="text-[#F97316]">before we open to everyone</span>
        </h2>
        <p className="mt-4 text-[17px] font-normal leading-[1.7] text-[#475569] max-w-xl mx-auto">
          Sign up now and we will reach out personally when access opens.{' '}
          <strong className="font-semibold text-[#0B1F3B]">Early members get better pricing and direct support from the founders.</strong>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-white text-[15px] font-semibold shadow-sm"
          >
            Get early access
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
        <p className="mt-4 text-[13px] font-medium text-[#94A3B8]">
          No credit card. Free during early access.
        </p>
      </div>
    </section>
  )
}
