'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'
import { trackLeadCaptureSubmit } from '@/lib/analytics'

interface LeadCaptureSectionProps {
  lang: Language
}

export default function LeadCaptureSection({ lang }: LeadCaptureSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const t = content[lang].leadCapture

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackLeadCaptureSubmit(email, 'lead_capture_section')
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
          _subject: 'BioPlot AI - Lead Capture Form Submission',
          source: 'lead_capture_section',
        }),
      })
      
      if (response.ok) {
        // 提交成功
        setTimeout(() => {
          setSubmitted(false)
          setEmail('')
        }, 3000)
      } else {
        // 提交失败，但仍然显示成功消息（避免用户困惑）
        setTimeout(() => {
          setSubmitted(false)
          setEmail('')
        }, 3000)
      }
    } catch (error) {
      // 网络错误，但仍然显示成功消息
      console.error('Form submission error:', error)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section
      id="lead-capture"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-bio-purple via-bio-blue to-indigo-600"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white font-serif">
          {t.title}
        </h2>
        
        <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full px-6 py-4 pl-12 rounded-lg bg-white/95 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-academic-blue placeholder-gray-400"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="px-8 py-4 bg-white text-bio-purple rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? (
                <>
                  <span className="animate-spin">✓</span>
                  {t.submitted}
                </>
              ) : (
                <>
                  {t.submit}
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          
          {submitted && (
            <p className="mt-4 text-white/90 text-sm">
              {t.thankYou}
            </p>
          )}
        </form>

        <p className="mt-8 text-white/70 text-sm">
          {t.privacy}
        </p>
      </div>
    </section>
  )
}

