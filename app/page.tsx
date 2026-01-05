'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/lib/i18n'
import Header from '@/components/Header'
import HeroSectionI18n from '@/components/HeroSectionI18n'
import ComparisonSection from '@/components/ComparisonSection'
import WorkflowSection from '@/components/WorkflowSection'
import FeaturesSection from '@/components/FeaturesSection'
import PricingSectionI18n from '@/components/PricingSectionI18n'
import LeadCaptureSection from '@/components/LeadCaptureSection'

export default function Home() {
  const [lang, setLang] = useState<Language>('zh')

  // 从 localStorage 读取语言偏好
  useEffect(() => {
    const savedLang = localStorage.getItem('bioplot-lang') as Language
    if (savedLang === 'zh' || savedLang === 'en') {
      setLang(savedLang)
    }
  }, [])

  // 保存语言偏好到 localStorage
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('bioplot-lang', newLang)
  }

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />
      <HeroSectionI18n lang={lang} />
      <ComparisonSection lang={lang} />
      <WorkflowSection lang={lang} />
      <FeaturesSection lang={lang} />
      <PricingSectionI18n lang={lang} />
      <LeadCaptureSection lang={lang} />
    </main>
  )
}

