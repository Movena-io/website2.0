'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function WhoWeAre() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-5">
          {t.whoWeAre.headline}
        </h2>
        <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7] max-w-2xl mb-12">
          {t.whoWeAre.text}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {t.whoWeAre.people.map((person) => (
            <div key={person.name}>
              <p className="text-[18px] font-semibold text-[#0B1F3B]">{person.name}</p>
              <p className="text-[14px] text-[#475569] mt-1">{person.role}</p>
              <p className="text-[14px] text-[#475569] mt-1">{person.phone}</p>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="text-[14px] text-[#1D4ED8] hover:text-[#1E40AF] transition-colors mt-0.5 inline-block"
                >
                  {person.email}
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="text-[13px] text-[#94A3B8]">
          {t.whoWeAre.companyInfo}
        </p>
      </div>
    </section>
  )
}
