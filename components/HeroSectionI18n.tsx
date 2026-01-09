'use client'

import { ArrowRight } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'
import { trackCTAClick } from '@/lib/analytics'

interface HeroSectionI18nProps {
  lang: Language
}

export default function HeroSectionI18n({ lang }: HeroSectionI18nProps) {
  const t = content[lang].hero

  const handleCTAClick = () => {
    trackCTAClick(t.cta, 'hero_section')
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.title}
        </h1>
        
        <p 
          className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.subtitle}
        </p>

        <button
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border-2 border-blue-400/30"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.cta}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}

