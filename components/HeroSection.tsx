'use client'

import { ArrowRight } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

export default function HeroSection() {
  const handleCTAClick = () => {
    trackCTAClick('加入内测名单', 'hero_section')
    // 滚动到留资部分
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="font-serif text-academic-blue">一键复现</span>
          <br />
          <span className="bg-gradient-to-r from-bio-purple via-bio-blue to-bio-purple bg-clip-text text-transparent">
            顶刊级生信图表样式
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-academic-gray mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          利用 AI 引擎精准提取 Nature/Cell 论文图表风格。
          <br className="hidden sm:block" />
          上传图片，直接获得同款样式的 <span className="font-serif text-academic-blue">R (ggplot2)</span> 或 <span className="font-serif text-academic-blue">Python</span> 代码。
          <br />
          <span className="text-base sm:text-lg text-academic-gray/80">不再为调色和排版浪费深夜。</span>
        </p>

        <button
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-bio-purple to-bio-blue text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          加入内测名单 (免费)
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}

