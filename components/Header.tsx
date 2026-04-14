'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { TYPEFORM_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/translations'

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'da', label: 'DA', flag: '🇩🇰' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { locale, setLocale, t } = useLanguage()
  const currentLang = LANGUAGES.find(l => l.code === locale)!

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`sticky top-5 z-50 mx-5 transition-all duration-200 ${
        menuOpen ? 'rounded-t-2xl' : 'rounded-2xl'
      } bg-white/75 backdrop-blur-md border border-[#E2E8F0] ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="h-16 grid grid-cols-3 items-center">
        <div className="pl-[50px]">
          <a href="/" className="flex items-center">
            <Image src="/assets/logo.png" alt="Movena" width={144} height={36} priority />
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8">
          <a href="/#features" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.features}</a>
          <a href="/#how-it-works" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.howItWorks}</a>
          <a href="/#faq" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.faq}</a>
          <a href="/contact" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.talkToUs}</a>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4 pr-[50px]">
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#475569] hover:text-[#0B1F3B] transition-colors"
            >
              <span className="text-[16px] leading-none">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <ChevronDown
                size={11}
                strokeWidth={2.5}
                className={`transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 py-1.5 bg-white rounded-xl border border-[#E2E8F0] shadow-lg w-[110px] z-50">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setLangOpen(false) }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] transition-colors hover:bg-[#F8FAFC] ${
                      locale === lang.code
                        ? 'font-semibold text-[#0B1F3B]'
                        : 'font-medium text-[#475569]'
                    }`}
                  >
                    <span className="text-[16px] leading-none">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center justify-center h-10 px-5 rounded-lg text-white text-[14px] font-semibold"
          >
            {t.nav.joinWaitlist}
          </a>
        </div>

        <div className="md:hidden flex justify-end pr-5">
          <button
            className="p-2 text-[#475569]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/75 border-t border-[#E2E8F0] px-6 py-4 flex flex-col gap-4 rounded-b-2xl">
          <a href="/#features" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.features}</a>
          <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.howItWorks}</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.faq}</a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.talkToUs}</a>

          {/* Mobile language toggle */}
          <div className="flex items-center gap-3">
            {LANGUAGES.map((lang, i) => (
              <span key={lang.code} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[#E2E8F0]">|</span>}
                <button
                  onClick={() => { setLocale(lang.code); setMenuOpen(false) }}
                  className={`flex items-center gap-1.5 text-[14px] font-semibold transition-colors ${
                    locale === lang.code ? 'text-[#0B1F3B]' : 'text-[#94A3B8]'
                  }`}
                >
                  <span className="text-[16px] leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              </span>
            ))}
          </div>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-gradient inline-flex items-center justify-center h-10 px-4 rounded-lg text-white text-[14px] font-semibold w-full"
          >
            {t.nav.joinWaitlist}
          </a>
        </div>
      )}
    </header>
  )
}
