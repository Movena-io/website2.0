'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function RestOfSystem() {
  const { t } = useLanguage()

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-[24px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-4">
          {t.restOfSystem.headline}
        </h2>
        <p className="text-[16px] sm:text-[18px] text-[#475569] leading-[1.6] mb-3">
          {t.restOfSystem.modules}
        </p>
        <p className="text-[13px] text-[#94A3B8]">
          {t.restOfSystem.integrationNote}
        </p>
      </div>
    </section>
  )
}
