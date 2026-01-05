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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="font-serif text-academic-blue">{t.title1}</span>
          <br />
          <span className="bg-gradient-to-r from-bio-purple via-bio-blue to-bio-purple bg-clip-text text-transparent">
            {t.title2}
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-academic-gray mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          {t.description1}
          <br className="hidden sm:block" />
          {t.description2}{' '}
          <span className="font-serif text-academic-blue">{t.description3}</span>{' '}
          {t.description4}{' '}
          <span className="font-serif text-academic-blue">{t.description5}</span>{' '}
          {t.description6}
          <br />
          <span className="text-base sm:text-lg text-academic-gray/80">{t.description7}</span>
        </p>

        <button
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bio-purple to-bio-blue text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {t.cta}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}

