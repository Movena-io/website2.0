'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">

          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.contact.label}</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
            </div>
            <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.025em] text-[#0B1F3B] leading-[1.1] mb-4">
              {t.contact.headline}
            </h1>
            <p className="text-[18px] font-normal text-[#475569] leading-[1.7] max-w-xl">
              {t.contact.subheadline}
            </p>
          </div>

          <div className="max-w-xl">

            {/* Contact form */}
            <div>
              {status === 'sent' ? (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-8">
                  <p className="text-[16px] font-bold text-[#166534] mb-2">{t.contact.successTitle}</p>
                  <p className="text-[14px] text-[#166534]/80">{t.contact.successBody}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-[13px] font-semibold text-[#0F172A]">{t.contact.nameLabel}</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder={t.contact.namePlaceholder}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-[13px] font-semibold text-[#0F172A]">{t.contact.emailLabel}</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-[13px] font-semibold text-[#0F172A]">{t.contact.subjectLabel}</label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder={t.contact.subjectPlaceholder}
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-[13px] font-semibold text-[#0F172A]">{t.contact.messageLabel}</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder={t.contact.messagePlaceholder}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-[13px] text-[#DC2626]">
                      {t.contact.errorPrefix}{' '}
                      <a href="mailto:hello@movena.io" className="underline">hello@movena.io</a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gradient inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-white text-[14px] font-semibold disabled:opacity-60"
                  >
                    {status === 'sending' ? t.contact.sending : t.contact.send}
                    {status !== 'sending' && <ArrowRight size={15} strokeWidth={2} />}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
