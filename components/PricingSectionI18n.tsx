'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'
import { trackPricingClick, trackPricingFormSubmit } from '@/lib/analytics'

interface PricingSectionI18nProps {
  lang: Language
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  lang: Language
}

function Modal({ isOpen, onClose, planName, lang }: ModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const t = content[lang].pricing.modal

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackPricingFormSubmit(planName, email)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-bio-purple to-bio-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-academic-blue">
            {t.title}
          </h3>
          
          <p className="text-academic-gray mb-6 leading-relaxed">
            {t.message}{' '}
            <span className="font-semibold text-bio-purple">{t.discount}</span>
            {lang === 'zh' ? '。' : '.'}
          </p>
          
          <p className="text-sm text-academic-gray/70 mb-4">
            {t.selectedPlan} <span className="font-semibold">{planName}</span>
          </p>
          
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              disabled={submitted}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-purple focus:border-transparent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitted}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-bio-purple to-bio-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? t.submitted : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function PricingSectionI18n({ lang }: PricingSectionI18nProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const t = content[lang].pricing

  const plans = [
    {
      key: 'free' as const,
      ...t.plans.free,
    },
    {
      key: 'professional' as const,
      ...t.plans.professional,
    },
    {
      key: 'lab' as const,
      ...t.plans.lab,
    },
  ]

  const handlePlanClick = (planKey: string, planName: string, price: number) => {
    trackPricingClick(planKey, planName, price)
    setSelectedPlan(planName)
    setModalOpen(true)
  }

  return (
    <>
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-academic-blue font-serif">
            {t.title}
          </h2>
          <p className="text-center text-academic-gray mb-16 text-lg">
            {t.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-bio-purple md:-mt-4 md:mb-4'
                    : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-bio-purple to-bio-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {plan.popularLabel || 'Recommended'}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-academic-blue">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-academic-gray mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-bio-purple to-bio-blue">
                      ${plan.price}
                    </span>
                    <span className="text-academic-gray">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`${
                          feature.included ? 'text-academic-gray' : 'text-gray-400'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan.key, plan.name, plan.price)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-bio-purple to-bio-blue text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-100 text-academic-blue hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan}
        lang={lang}
      />
    </>
  )
}

