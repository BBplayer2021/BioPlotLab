'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { trackPricingClick, trackPricingFormSubmit } from '@/lib/analytics'

const plans = [
  {
    name: 'Free',
    nameCn: '基础版',
    price: 0,
    period: '月',
    description: '适合个人学习使用',
    features: [
      { text: '仅限颜色提取', included: true },
      { text: '每日 3 次使用', included: true },
      { text: '完整样式复现', included: false },
      { text: '导出 PDF/SVG', included: false },
      { text: '代码自动纠错', included: false },
      { text: '多账号共享', included: false },
      { text: '私有样式库', included: false },
      { text: '优先技术支持', included: false },
    ],
    cta: '开始使用',
    popular: false,
    gradient: 'from-gray-400 to-gray-500',
  },
  {
    name: 'Professional',
    nameCn: '专业版',
    price: 19,
    period: '月',
    description: '适合独立研究者',
    features: [
      { text: '完整样式复现', included: true },
      { text: '导出 PDF/SVG', included: true },
      { text: '代码自动纠错', included: true },
      { text: '无限使用次数', included: true },
      { text: '多账号共享', included: false },
      { text: '私有样式库', included: false },
      { text: '优先技术支持', included: false },
    ],
    cta: '订阅',
    popular: true,
    gradient: 'from-bio-purple to-bio-blue',
  },
  {
    name: 'Lab',
    nameCn: '实验室版',
    price: 99,
    period: '月',
    description: '适合团队协作',
    features: [
      { text: '专业版所有功能', included: true },
      { text: '多账号共享（最多 10 人）', included: true },
      { text: '私有样式库', included: true },
      { text: '优先技术支持', included: true },
      { text: 'API 访问', included: true },
      { text: '定制化服务', included: true },
    ],
    cta: '订阅',
    popular: false,
    gradient: 'from-indigo-600 to-purple-600',
  },
]

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
}

function Modal({ isOpen, onClose, planName }: ModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 追踪表单提交
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
            感谢关注！
          </h3>
          
          <p className="text-academic-gray mb-6 leading-relaxed">
            产品正在最后打磨中，留下您的邮箱，上线后我们将为您提供
            <span className="font-semibold text-bio-purple">首月 5 折优惠</span>。
          </p>
          
          <p className="text-sm text-academic-gray/70 mb-4">
            您选择的方案：<span className="font-semibold">{planName}</span>
          </p>
          
          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入您的邮箱"
              required
              disabled={submitted}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bio-purple focus:border-transparent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitted}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-bio-purple to-bio-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? '已提交 ✓' : '提交'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')

  const handlePlanClick = (planName: string, planCn: string, price: number) => {
    // 追踪定价方案点击（核心指标）
    trackPricingClick(planName, planCn, price)
    setSelectedPlan(`${planName} (${planCn})`)
    setModalOpen(true)
  }

  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-academic-blue font-serif">
            定价方案
          </h2>
          <p className="text-center text-academic-gray mb-16 text-lg">
            选择适合您的方案
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
                      推荐
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-academic-blue">
                    {plan.nameCn}
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
                  onClick={() => handlePlanClick(plan.name, plan.nameCn, plan.price)}
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
      />
    </>
  )
}

