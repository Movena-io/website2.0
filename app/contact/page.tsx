'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, ArrowRight } from 'lucide-react'

export default function Contact() {
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
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">Contact</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
            </div>
            <h1 className="text-[40px] lg:text-[52px] font-extrabold tracking-[-0.025em] text-[#0B1F3B] leading-[1.1] mb-4">
              Talk to us
            </h1>
            <p className="text-[18px] font-normal text-[#475569] leading-[1.7] max-w-xl">
              We&apos;re a small team building something we care about. Reach out directly — we respond to every message.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left: contact form */}
            <div>
              {status === 'sent' ? (
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-8">
                  <p className="text-[16px] font-bold text-[#166534] mb-2">Message sent</p>
                  <p className="text-[14px] text-[#166534]/80">
                    We&apos;ll get back to you at {form.email || 'your email'} shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="What's on your mind?"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="h-10 rounded-lg border border-[#E2E8F0] px-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-[13px] text-[#DC2626]">Something went wrong. Try emailing us directly at hello@movena.io</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gradient inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-white text-[14px] font-semibold disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                    {status !== 'sending' && <ArrowRight size={15} strokeWidth={2} />}
                  </button>
                </form>
              )}
            </div>

            {/* Right: info panels */}
            <div className="flex flex-col gap-5">
              {/* Location */}
              <div className="flex items-start gap-4 rounded-2xl p-6 border border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} strokeWidth={1.5} className="text-[#1D4ED8]" />
                </div>
                <div>
                  <p className="text-[16px] font-bold text-[#0B1F3B] mb-1">Based in Copenhagen</p>
                  <p className="text-[14px] font-normal text-[#475569] leading-[1.6]">
                    Copenhagen, Denmark.<br />We operate across the Nordic market.
                  </p>
                </div>
              </div>

              {/* About */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8">
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4">About us</p>
                <p className="text-[18px] font-bold text-[#0B1F3B] leading-[1.4] mb-4">
                  Three founders, one focus.
                </p>
                <p className="text-[15px] font-normal text-[#475569] leading-[1.75] mb-4">
                  We&apos;re Samuel, Villads, and Valdemar — building Movena because we saw how unnecessarily fragmented the tools are for moving companies. No sales team, no support queue. Just us.
                </p>
                <p className="text-[15px] font-normal text-[#475569] leading-[1.75]">
                  If you run a moving company and want to talk through whether Movena is a fit, or just want to give us feedback — we genuinely want to hear from you.
                </p>
                <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                  <a
                    href="mailto:hello@movena.io"
                    className="text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    hello@movena.io
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
