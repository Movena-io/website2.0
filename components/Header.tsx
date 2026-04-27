'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { TYPEFORM_URL } from '@/lib/constants'
import { trackWaitlistClick } from '@/lib/tracking'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/translations'

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'da', label: 'DA', flag: '\u{1F1E9}\u{1F1F0}' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const { locale, setLocale, t } = useLanguage()
  const href = useLocalizedHref()
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

  useEffect(() => {
    if (!menuOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header
      className={`sticky top-5 z-50 mx-5 transition-all duration-200 ${
        menuOpen ? 'rounded-t-2xl' : 'rounded-2xl'
      } bg-white/75 backdrop-blur-md border border-[#E2E8F0] ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 md:px-0 md:grid md:grid-cols-3">
        <div className="md:pl-[50px]">
          <a href={href('/')} className="flex items-center">
            <Image src="/assets/logo.png" alt="Movena" width={120} height={30} className="md:w-[144px] md:h-[36px]" priority />
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8">
          <a href={href('/#features')} className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.features}</a>
          <a href={href('/#how-it-works')} className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.howItWorks}</a>
          <a href={href('/#faq')} className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.faq}</a>
          <a href={href('/contact')} className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">{t.nav.talkToUs}</a>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4 pr-[50px]">
          <a href={href('/auth')} className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">
            {t.nav.logIn}
          </a>

          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Change language"
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
            onClick={() => trackWaitlistClick('header')}
            className="btn-gradient inline-flex items-center justify-center h-10 px-5 rounded-lg text-white text-[14px] font-semibold"
          >
            {t.nav.joinWaitlist}
          </a>
        </div>

        <div className="md:hidden">
          <button
            ref={hamburgerRef}
            className="p-2 text-[#475569]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white/75 border-t border-[#E2E8F0] px-6 py-4 flex flex-col gap-4 rounded-b-2xl">
          <a href={href('/#features')} onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.features}</a>
          <a href={href('/#how-it-works')} onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.howItWorks}</a>
          <a href={href('/#faq')} onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.faq}</a>
          <a href={href('/contact')} onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.talkToUs}</a>
          <a href={href('/auth')} onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">{t.nav.logIn}</a>

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
            onClick={() => { trackWaitlistClick('header_mobile'); setMenuOpen(false) }}
            className="btn-gradient inline-flex items-center justify-center h-10 px-4 rounded-lg text-white text-[14px] font-semibold w-full"
          >
            {t.nav.joinWaitlist}
          </a>
        </div>
      )}
    </header>
  )
}
