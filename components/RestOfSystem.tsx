'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronDown,
  Users,
  Truck,
  Package,
  Warehouse,
  Clock,
  FileText,
  Contact,
  BarChart3,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const moduleIcons = [Users, Truck, Package, Warehouse, Clock, FileText, Contact, BarChart3]

export default function RestOfSystem() {
  const { t } = useLanguage()
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  function toggle(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="rest-of-system" className="bg-white py-14 md:py-20 light-to-dark-hint scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="reveal text-[24px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] text-center mb-10">
          {t.restOfSystem.headline}
        </h2>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.restOfSystem.moduleList.map((mod, i) => {
            const isOpen = openSet.has(i)
            const Icon = moduleIcons[i] ?? Package
            return (
              <button
                key={mod.name}
                onClick={() => toggle(i)}
                className={`group text-left rounded-xl border p-4 transition-all duration-200 ${
                  isOpen
                    ? 'border-[#3B82F6] bg-[#F8FAFF]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:-translate-y-0.5'
                }`}
              >
                {/* Icon */}
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className={`mb-3 transition-colors duration-200 ${
                    isOpen ? 'text-[#3B82F6]' : 'text-[#64748B]'
                  }`}
                />

                {/* Title row */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[14px] font-semibold text-[#0B1F3B]">{mod.name}</h3>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className={`text-[#94A3B8] shrink-0 transition-transform duration-250 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Expandable content */}
                <div
                  className="grid transition-[grid-template-rows] duration-250 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 text-[13px] text-[#475569] leading-[1.6]">
                      {mod.description}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {mod.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#3B82F6]" />
                          <span className="text-[12px] text-[#475569] leading-[1.5]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <p className="reveal mt-6 text-center text-[13px] text-[#94A3B8]">
          {t.restOfSystem.integrationNote}
        </p>
      </div>
    </section>
  )
}
