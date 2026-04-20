'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeftIcon } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

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

export default function AuthPage() {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">

      {/* Animated paths -- full page background */}
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
        {t.auth.backHome}
      </a>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 py-12 space-y-5">

        {/* Logo */}
        <div className="flex items-center justify-center mb-2">
          <Image src="/assets/logo.png" alt="Movena" width={130} height={35} priority />
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-[26px] font-extrabold tracking-[-0.025em] text-[#0B1F3B]">
            {t.auth.comingSoon}
          </h1>
          <p className="text-[15px] text-[#64748B]">
            {t.auth.comingSoonBody}
          </p>
        </div>

        {/* Back to home button */}
        <a
          href="/"
          className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-[#0B1F3B] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold transition-colors"
        >
          {t.auth.backHome}
        </a>
      </div>

    </main>
  )
}
