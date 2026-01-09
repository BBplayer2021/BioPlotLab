'use client'

import { useState, useEffect } from 'react'
import { Check, X, FileText, Copy, QrCode } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackPricingFormSubmit(planName, email)
    setSubmitted(true)
    
    try {
      // 提交到 Formspree
      const response = await fetch('https://formspree.io/f/mgovqyvj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'BioPlot AI - Pricing Form Submission',
          plan: planName,
          source: 'pricing_modal',
        }),
      })
      
      if (response.ok) {
        // 提交成功
        setTimeout(() => {
          setSubmitted(false)
          setEmail('')
          onClose()
        }, 2000)
      } else {
        // 提交失败，但仍然显示成功消息
        setTimeout(() => {
          setSubmitted(false)
          setEmail('')
          onClose()
        }, 2000)
      }
    } catch (error) {
      // 网络错误，但仍然显示成功消息
      console.error('Form submission error:', error)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
        onClose()
      }, 2000)
    }
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
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Check className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <h3 
            className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900"
            style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
          >
            {t.title}
          </h3>
          
          <p 
            className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed"
            style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
          >
            {t.message}{' '}
            <span className="font-semibold text-blue-600">{t.discount}</span>
            {lang === 'zh' ? '。' : '.'}
          </p>
          
          <p 
            className="text-xs sm:text-sm text-slate-500 mb-4"
            style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
          >
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-base"
            />
            <button
              type="submit"
              disabled={submitted}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? t.submitted : t.submit}
            </button>
            
            {/* 扫码入群按钮 */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onClose()
                // 延迟打开二维码弹窗，确保当前弹窗关闭动画完成
                setTimeout(() => {
                  const event = new CustomEvent('openQRModal')
                  window.dispatchEvent(event)
                }, 300)
              }}
              className="w-full mt-3 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              {lang === 'zh' ? '扫码入群' : 'Scan to Join'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Nature 规范弹窗组件
function NatureModal({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Language }) {
  const [copied, setCopied] = useState(false)
  const t = content[lang].pricing.natureButton

  const configText = lang === 'zh' 
    ? `# Nature 期刊出版规范配置
字体: ${t.values.font}
分辨率: ${t.values.dpi}
色彩模式: ${t.values.colorMode}
文件格式: ${t.values.format}`
    : `# Nature Journal Publication Standards
Font: ${t.values.font}
Resolution: ${t.values.dpi}
Color Mode: ${t.values.colorMode}
File Format: ${t.values.format}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 relative animate-in zoom-in-95 duration-300 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 
                className="text-xl sm:text-2xl font-bold text-slate-900"
                style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
              >
                {t.title}
              </h3>
              <p className="text-sm text-slate-600">{t.subtitle}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{t.specs.font}</span>
              </div>
              <p className="text-sm text-slate-600">{t.values.font}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{t.specs.dpi}</span>
              </div>
              <p className="text-sm text-slate-600">{t.values.dpi}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{t.specs.colorMode}</span>
              </div>
              <p className="text-sm text-slate-600">{t.values.colorMode}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{t.specs.format}</span>
              </div>
              <p className="text-sm text-slate-600">{t.values.format}</p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Copy className="w-5 h-5" />
            {copied ? t.copied : t.copyButton}
          </button>
        </div>
      </div>
    </div>
  )
}

// 二维码弹窗组件
function QRModal({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Language }) {
  const t = content[lang].pricing.natureButton

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm w-full p-4 sm:p-6 md:p-8 relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h3 
            className="text-xl sm:text-2xl font-bold mb-2 text-slate-900"
            style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
          >
            {t.qrTitle}
          </h3>
          <p 
            className="text-sm text-slate-600 mb-6"
            style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
          >
            {t.qrSubtitle}
          </p>
          
          {/* 二维码图片 - 请将二维码图片放在 public/images/qr-code.png */}
          <div className="bg-slate-100 rounded-lg p-4 sm:p-6 md:p-8 mb-4 flex items-center justify-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-lg flex items-center justify-center border-2 border-slate-200 overflow-hidden">
              <img 
                src="/images/qr-code.png" 
                alt="QR Code" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'zh' ? '请使用微信扫描二维码' : 'Please scan with WeChat'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PricingSectionI18n({ lang }: PricingSectionI18nProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [natureModalOpen, setNatureModalOpen] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const t = content[lang].pricing

  // 监听二维码弹窗打开事件
  useEffect(() => {
    const handleOpenQR = () => {
      setQrModalOpen(true)
    }
    window.addEventListener('openQRModal', handleOpenQR as EventListener)
    return () => {
      window.removeEventListener('openQRModal', handleOpenQR as EventListener)
    }
  }, [])

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
      key: 'addon' as const,
      ...t.plans.addon,
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
          <p className="text-center text-academic-gray mb-8 text-lg">
            {t.subtitle}
          </p>

          {/* 点数提示 */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm sm:text-base text-blue-700 font-medium">
                {t.creditHint}
              </span>
            </div>
          </div>

          {/* "我要投 Nature" 按钮 */}
          <div className="mb-12 text-center">
            <button
              onClick={() => setNatureModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ fontFamily: lang === 'zh' ? "'PingFang SC', 'Microsoft YaHei', sans-serif" : "'Helvetica', 'Arial', sans-serif" }}
            >
              <FileText className="w-5 h-5" />
              {t.natureButton.label}
            </button>
          </div>

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
                  
                  {/* 价格显示 */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-bio-purple to-bio-blue">
                        {lang === 'zh' ? '¥' : '$'}{plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-academic-gray">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* 点数显示 */}
                  {plan.credits && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4 border border-blue-100">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs text-slate-600">{plan.creditsLabel}</span>
                        <span className="text-2xl font-bold text-blue-600">{plan.credits}</span>
                        <span className="text-xs text-slate-600">{lang === 'zh' ? '点数' : 'Credits'}</span>
                      </div>
                    </div>
                  )}
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

          {/* 透明化说明 */}
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              {t.creditTransparency}
            </p>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan}
        lang={lang}
      />
      <NatureModal
        isOpen={natureModalOpen}
        onClose={() => setNatureModalOpen(false)}
        lang={lang}
      />
      <QRModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        lang={lang}
      />
    </>
  )
}

