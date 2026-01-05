'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface HeaderProps {
  lang: Language
  onLanguageChange: (lang: Language) => void
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = content[lang]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-2xl font-bold bg-gradient-to-r from-bio-purple to-bio-blue bg-clip-text text-transparent"
            >
              BioPlot AI
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-academic-gray hover:text-academic-blue transition-colors font-medium"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-academic-gray hover:text-academic-blue transition-colors font-medium"
            >
              {t.nav.pricing}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => onLanguageChange(lang === 'zh' ? 'en' : 'zh')}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:border-bio-purple hover:bg-bio-purple/5 transition-all duration-200 font-medium text-sm text-academic-gray hover:text-bio-purple"
            >
              {t.nav.language}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => onLanguageChange(lang === 'zh' ? 'en' : 'zh')}
              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-bio-purple hover:bg-bio-purple/5 transition-all duration-200 font-medium text-xs text-academic-gray"
            >
              {t.nav.language}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

