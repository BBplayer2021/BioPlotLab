'use client'

import { Brain, Palette, FileCode, Zap } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface FeaturesSectionProps {
  lang: Language
}

const icons = [Brain, Palette, FileCode, Zap]

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const t = content[lang].features
  
  const features = t.items.map((item, index) => ({
    icon: icons[index],
    ...item,
  }))

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-academic-blue font-serif">
          {t.title}
        </h2>
        <p className="text-center text-academic-gray mb-16 text-lg">
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="flex gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-bio-purple/10 to-bio-blue/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-bio-purple" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-academic-blue">
                    {feature.title}
                  </h3>
                  <p className="text-academic-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

