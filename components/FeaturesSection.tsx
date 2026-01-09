'use client'

import { FileText, Shield, Code2 } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface FeaturesSectionProps {
  lang: Language
}

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const t = content[lang].features

  const icons: Record<string, typeof FileText> = {
    nature: FileText,
    privacy: Shield,
    code: Code2,
  }

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.title}
        </h2>
        <p 
          className="text-center text-slate-300 mb-16 text-lg"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, index) => {
            const Icon = icons[item.icon] || FileText
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl font-bold mb-4 text-white"
                  style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-slate-300 leading-relaxed"
                  style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
