'use client'

import { Camera, Upload, Package } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface WorkflowSectionProps {
  lang: Language
}

export default function WorkflowSection({ lang }: WorkflowSectionProps) {
  const t = content[lang].workflow
  
  const steps = [
    {
      icon: Camera,
      title: t.steps[0].title,
      description: t.steps[0].description,
      gradient: 'from-blue-600 to-blue-500',
    },
    {
      icon: Upload,
      title: t.steps[1].title,
      description: t.steps[1].description,
      gradient: 'from-slate-700 to-slate-600',
    },
    {
      icon: Package,
      title: t.steps[2].title,
      description: t.steps[2].description,
      gradient: 'from-emerald-600 to-emerald-500',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.title}
        </h2>
        <p 
          className="text-center text-slate-600 mb-16 text-lg"
          style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
        >
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-4 text-slate-900"
                    style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-slate-600 leading-relaxed"
                    style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 transform -translate-y-1/2 z-0">
                    <div className="w-12 lg:w-24 h-1 bg-gradient-to-r from-blue-500 via-slate-400 to-emerald-500 rounded-full" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

