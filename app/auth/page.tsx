'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AtSignIcon, ChevronLeftIcon, Truck } from 'lucide-react'

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none">
        <title>Background</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#0B1F3B"
            strokeWidth={path.width}
            strokeOpacity={0.015 + path.id * 0.003}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 40 + Math.random() * 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
  </svg>
)

export default function AuthPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">

      {/* Animated paths — full page background */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Back to home */}
      <a
        href="/"
        className="absolute top-7 left-6 inline-flex items-center text-[14px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors z-10"
      >
        <ChevronLeftIcon size={16} className="mr-1.5" />
        Home
      </a>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 py-12 space-y-5">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#1D4ED8] flex items-center justify-center shrink-0">
            <Truck size={15} strokeWidth={1.5} className="text-white" />
          </div>
          <span className="text-[18px] font-extrabold tracking-[-0.025em] text-[#0B1F3B]">Movena</span>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0B1F3B]">
            Sign in or create account
          </h1>
          <p className="text-[15px] text-[#64748B]">
            Access your Movena workspace.
          </p>
        </div>

        {/* Google SSO */}
        <button
          type="button"
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-lg border border-[#E2E8F0] bg-white text-[14px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-sm"
        >
          <GoogleIcon className="w-4 h-4" />
          Continue with Google
        </button>

        {/* OR separator */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px w-full bg-[#E2E8F0]" />
          <span className="text-[12px] text-[#94A3B8] whitespace-nowrap">OR</span>
          <div className="h-px w-full bg-[#E2E8F0]" />
        </div>

        {/* Email form */}
        <form className="space-y-2">
          <p className="text-[13px] text-[#64748B]">
            Enter your email to sign in or create an account
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full h-10 rounded-lg border border-[#E2E8F0] bg-white pl-9 pr-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-colors"
            />
            <AtSignIcon
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold transition-colors"
          >
            Continue with email
          </button>
        </form>

        {/* Legal */}
        <p className="text-[13px] text-[#94A3B8] text-center">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-[#64748B] hover:text-[#0F172A] underline underline-offset-4 transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-[#64748B] hover:text-[#0F172A] underline underline-offset-4 transition-colors">
            Privacy Policy
          </a>.
        </p>
      </div>

    </main>
  )
}
