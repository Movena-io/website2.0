'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
            <span className="text-[18px] font-extrabold tracking-[-0.025em] text-[#0B1F3B]">Movena</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8">
          <a href="/#features" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Features</a>
          <a href="/#how-it-works" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">How it works</a>
          <a href="/#faq" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">FAQ</a>
          <a href="/contact" className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Talk to us</a>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4 pr-[50px]">
          <a
            href="/auth"
            className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
          >
            Log in
          </a>
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center justify-center h-10 px-5 rounded-lg text-white text-[14px] font-semibold"
          >
            Join the waitlist
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
        <div className="md:hidden bg-white/90 border-t border-[#E2E8F0] px-6 py-4 flex flex-col gap-4 rounded-b-2xl">
          <a href="/#features" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">Features</a>
          <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">How it works</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">FAQ</a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-[#475569]">Talk to us</a>
          <a
            href="/auth"
            onClick={() => setMenuOpen(false)}
            className="text-[14px] font-medium text-[#475569]"
          >
            Log in
          </a>
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-gradient inline-flex items-center justify-center h-10 px-4 rounded-lg text-white text-[14px] font-semibold w-full"
          >
            Join the waitlist
          </a>
        </div>
      )}
    </header>
  )
}
