'use client'

import { Upload, Sparkles, Code } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface WorkflowSectionProps {
  lang: Language
}

export default function WorkflowSection({ lang }: WorkflowSectionProps) {
  const t = content[lang].workflow
  
  const steps = [
    {
      icon: Upload,
      title: t.steps[0].title,
      description: t.steps[0].description,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Sparkles,
      title: t.steps[1].title,
      description: t.steps[1].description,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Code,
      title: t.steps[2].title,
      description: t.steps[2].description,
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-academic-blue font-serif">
          {t.title}
        </h2>
        <p className="text-center text-academic-gray mb-16 text-lg">
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
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-academic-blue">
                    {step.title}
                  </h3>
                  <p className="text-academic-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 transform -translate-y-1/2">
                    <div className="w-12 lg:w-24 h-0.5 bg-gradient-to-r from-bio-purple to-bio-blue" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 代码示例 Mockup */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
              <code>{`library(ggplot2)

${t.codeComment}
p <- ggplot(data, aes(x = condition, y = expression)) +
  geom_violin(aes(fill = condition), alpha = 0.7) +
  scale_fill_manual(values = c(
    "#1E88E5",  ${t.codeExtract}
    "#FF6B6B"
  )) +
  theme_minimal() +
  theme(
    text = element_text(family = "Arial", size = 12),
    legend.position = "right"
  )

ggsave("plot.pdf", p, width = 8, height = 6)`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

