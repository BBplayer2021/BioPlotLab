'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ArrowLeftRight, Sparkles, Code, X, Copy, Check } from 'lucide-react'
import { Language } from '@/lib/i18n'
import { content } from '@/lib/i18n'

interface ComparisonSectionProps {
  lang: Language
}

// 示例 ggplot2 代码 - Nature/Cell 期刊级标准
const exampleCode = `library(ggplot2)
library(ggrepel)
library(dplyr)

# BioPlotLab 生成的代码 - 99% 样式还原
# 符合 Nature/Cell 期刊发表标准

volcano_plot <- ggplot(data, aes(x = log2FC, y = neg_log10_p)) +
  # 绘制散点图
  geom_point(
    aes(color = Significance),
    size = 1.5,                    # 点的大小
    alpha = 0.6,                   # 透明度
    stroke = 0
  ) +
  
  # Nature 配色方案
  scale_color_manual(
    values = c(
      "Significantly Up-Regulated" = "#E64B35",    # 深红色
      "Significantly Down-Regulated" = "#3C5488", # 深蓝色
      "No Significant Change" = "#999999"         # 浅灰色
    ),
    name = "Significance"
  ) +
  
  # 辅助线：log2FC = -1, 1
  geom_vline(
    xintercept = c(-1, 1),
    linetype = "dashed",
    color = "#666666",
    linewidth = 0.5,
    alpha = 0.6
  ) +
  
  # 辅助线：p-value = 0.05
  geom_hline(
    yintercept = -log10(0.05),
    linetype = "dashed",
    color = "#666666",
    linewidth = 0.5,
    alpha = 0.6
  ) +
  
  # 基因标签标注（Top 15）
  geom_text_repel(
    data = top_genes,
    aes(label = Symbol),
    size = 3,
    family = "Arial",
    color = "#333333",
    segment.color = "#666666",
    segment.size = 0.3,
    box.padding = 0.5,
    point.padding = 0.3
  ) +
  
  # 坐标轴标签
  labs(
    x = "Log2 Fold-Change",
    y = "-log10(Padj)"
  ) +
  
  # 坐标轴范围
  xlim(-10, 10) +
  ylim(0, 300) +
  
  # 主题设置
  theme_classic() +
  theme(
    # 坐标轴
    axis.line = element_line(color = "#4A4A4A", linewidth = 0.5),
    axis.text = element_text(family = "Arial", size = 10, color = "#4A4A4A"),
    axis.title = element_text(family = "Arial", size = 11, 
                              color = "#2C2C2C", face = "bold"),
    
    # 图例（右上角内部）
    legend.position = c(0.98, 0.98),
    legend.justification = c(1, 1),
    legend.background = element_rect(fill = "white", alpha = 0.9),
    legend.title = element_text(family = "Arial", size = 10, 
                                face = "bold", color = "#2C2C2C"),
    legend.text = element_text(family = "Arial", size = 9, color = "#4A4A4A"),
    
    # 去除网格线
    panel.grid = element_blank()
  )

# 保存为高分辨率图片（300 DPI）
ggsave("volcano_plot_nature_style.png", volcano_plot,
       width = 8, height = 6, units = "in", dpi = 300, bg = "white")`

export default function ComparisonSection({ lang }: ComparisonSectionProps) {
  const t = content[lang].comparison
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(exampleCode)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-bio-purple/10 to-bio-blue/10 rounded-full mb-6">
              <ArrowLeftRight className="w-8 h-8 text-bio-purple" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-academic-blue font-serif">
              {t.title}
            </h2>
            <p className="text-lg text-academic-gray max-w-3xl mx-auto leading-relaxed mb-4">
              {t.subtitle}
            </p>
            {/* 视觉提示小标题 */}
            <p className="text-sm font-semibold text-bio-purple tracking-wider uppercase mb-2">
              {t.precisionTagline}
            </p>
          </div>

          {/* 对比滑块组件 */}
          <div className="mb-12">
            <div
              ref={containerRef}
              className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* Original 图表（左侧） - 使用真实图片 */}
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <img
                  src="/images/volcano-default.png"
                  alt="Default volcano plot output"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // 如果图片不存在，显示占位符
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'block'
                    }
                  }}
                />
                {/* 图片加载失败时的占位符 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200" style={{ display: 'none' }}>
                  <p className="text-gray-500 text-sm">请将 volcano-default.png 放置在 /public/images/ 目录</p>
                </div>
                
                {/* Reproduced 图表（右侧，通过clip-path显示） - 使用真实图片 */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <img
                    src="/images/volcano-nature.png"
                    alt="Nature style volcano plot reproduced by BioPlotLab"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 如果图片不存在，显示占位符
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'block'
                      }
                    }}
                  />
                  {/* 图片加载失败时的占位符 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50" style={{ display: 'none' }}>
                    <p className="text-gray-500 text-sm">请将 volcano-nature.png 放置在 /public/images/ 目录</p>
                  </div>
                </div>

                {/* 滑块控制条 */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10 touch-none"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-bio-purple group">
                    <ArrowLeftRight className="w-5 h-5 text-bio-purple group-hover:scale-110 transition-transform" />
                    {isDragging && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-bio-purple font-medium animate-pulse">
                        {lang === 'zh' ? 'AI 解析中...' : 'AI Analyzing...'}
                      </div>
                    )}
                  </div>
                </div>

                {/* 标签 */}
                <div className="absolute top-4 left-4 bg-red-600/95 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-20 backdrop-blur-sm">
                  {t.beforeLabel}
                </div>
                <div className="absolute top-4 right-4 bg-green-600/95 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-20 backdrop-blur-sm">
                  {t.afterLabel}
                </div>
              </div>
            </div>
          </div>

          {/* 技术说明覆盖层 */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-bio-purple to-bio-blue rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-academic-blue mb-2">
                    {t.precisionTitle}
                  </h3>
                  <p className="text-academic-gray leading-relaxed">
                    {t.precisionMetrics}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 查看代码按钮 */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowCodeModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bio-purple to-bio-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Code className="w-5 h-5" />
              {t.viewCode}
            </button>
          </div>

          {/* 并排对比（移动端友好） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <h3 className="text-lg font-semibold text-academic-blue">{t.beforeTitle}</h3>
              </div>
              <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden border-2 border-gray-300">
                <img
                  src="/images/volcano-default.png"
                  alt="Default volcano plot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
              <p className="mt-4 text-sm text-academic-gray text-center leading-relaxed">
                {t.beforeDescription}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-300">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-academic-blue">{t.afterTitle}</h3>
              </div>
              <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden border-2 border-green-400 shadow-inner">
                <img
                  src="/images/volcano-nature.png"
                  alt="Nature style volcano plot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
              <p className="mt-4 text-sm text-academic-gray text-center leading-relaxed">
                {t.afterDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 代码弹窗 */}
      {showCodeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowCodeModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-academic-blue flex items-center gap-2">
                <Code className="w-6 h-6 text-bio-purple" />
                {t.codeModalTitle}
              </h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="relative">
                <button
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-academic-gray transition-colors"
                >
                  {codeCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      {lang === 'zh' ? '已复制' : 'Copied'}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {lang === 'zh' ? '复制代码' : 'Copy Code'}
                    </>
                  )}
                </button>
                <pre className="bg-gray-900 rounded-lg p-6 text-sm text-gray-100 font-mono overflow-x-auto">
                  <code>{exampleCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 生成火山图数据点（使用固定种子确保一致性）
// 关键：显著点需要呈现火山爆发的放射状分布
function generateVolcanoData(seed: number = 42) {
  const data: Array<{ x: number; y: number; type: 'up' | 'down' | 'ns' }> = []
  
  // 简单的伪随机数生成器（使用种子）
  let rng = seed
  const random = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }
  
  // 非显著点 - 大量聚集在中心底部（-1到1之间，y值较低）
  // 形成"火山锥"形状的底部，密集聚集
  for (let i = 0; i < 250; i++) {
    // 主要在 -1 到 1 之间，但也有一些超出范围但y值很低的点
    const baseX = (random() - 0.5) * 2.5 // -1.25 到 1.25
    const x = baseX + (random() - 0.5) * 0.5 // 添加一些随机性，但保持密集
    // y值主要在底部，形成密集的火山锥
    const y = Math.pow(random(), 2) * 80 + random() * 20 // 0 到 100，更多在底部
    data.push({ x, y, type: 'ns' })
  }
  
  // 显著上调点（红色）- 从 x=1 附近开始，向上和向右放射状扩散
  // 形成"broad, upward-spreading cloud"
  // 最高点约在 y=250, x=3
  for (let i = 0; i < 120; i++) {
    // 从阈值线 x=1 附近开始，向上延伸时向外扩散
    // 使用指数分布使更多点在高处
    const y = 20 + Math.pow(random(), 0.25) * 280 // 20 到 300，更多在高处
    // 关键：y值越高，x值越远离中心（形成放射状）
    // 从 x=1 开始，随着 y 增加，x 也增加，形成放射状
    const radialFactor = (y - 20) / 280 // 0 到 1，表示从底部到顶部的比例
    const baseX = 1 + radialFactor * 2.5 // 从 1 到 3.5（符合最高点在 x=3）
    // 添加随机性形成宽阔的云，但保持放射状趋势
    const spread = random() * 2.5 + Math.pow(random(), 0.7) * 2 // 0 到 4.5
    const x = baseX + spread
    data.push({ x, y, type: 'up' })
  }
  
  // 显著下调点（蓝色）- 从 x=-1 附近开始，向上和向左放射状扩散
  // 形成"narrower, upward-spreading cloud"（比红色点少且窄）
  // 最高点约在 y=270, x=-2
  for (let i = 0; i < 90; i++) {
    // 从阈值线 x=-1 附近开始，向上延伸时向外扩散
    const y = 20 + Math.pow(random(), 0.25) * 280 // 20 到 300，更多在高处
    // 关键：y值越高，x值越远离中心（形成放射状）
    // 从 x=-1 开始，随着 y 增加，x 也减小（更负），形成放射状
    const radialFactor = (y - 20) / 280 // 0 到 1
    const baseX = -1 - radialFactor * 1.5 // 从 -1 到 -2.5（符合最高点在 x=-2）
    // 添加随机性形成较窄的云，但保持放射状趋势
    const spread = random() * 1.5 + Math.pow(random(), 0.8) * 1.5 // 0 到 3
    const x = baseX - spread
    data.push({ x, y, type: 'down' })
  }
  
  // 添加一些在阈值线附近但y值较低的显著点（形成过渡）
  for (let i = 0; i < 30; i++) {
    const y = 10 + random() * 40 // 10 到 50
    if (random() > 0.5) {
      // 上调
      const x = 1 + random() * 1.5 // 1 到 2.5
      data.push({ x, y, type: 'up' })
    } else {
      // 下调
      const x = -1 - random() * 1.5 // -2.5 到 -1
      data.push({ x, y, type: 'down' })
    }
  }
  
  return data
}

// 将数据坐标转换为百分比位置
function convertToPosition(x: number, y: number) {
  // X轴：-10 到 10 -> 0% 到 100%
  const xPercent = ((x + 10) / 20) * 100
  // Y轴：0 到 300 -> 0% 到 100%
  const yPercent = (y / 300) * 100
  return { xPercent, yPercent }
}

// 火山图 - 原图样式 (Nature Genetics)
function VolcanoPlotOriginal() {
  // 使用固定种子确保数据一致性
  const data = useMemo(() => generateVolcanoData(42), [])
  
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* 图表区域 */}
      <div className="flex-1 relative border border-gray-400 rounded bg-white overflow-hidden">
        {/* 坐标轴 - 深灰色 */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 z-10"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-700 z-10"></div>

        {/* 坐标轴刻度 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* X轴刻度：-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10 */}
          {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
            const xPercent = ((tick + 10) / 20) * 100
            return (
              <g key={`x-${tick}`}>
                <line
                  x1={`${xPercent}%`}
                  y1="100%"
                  x2={`${xPercent}%`}
                  y2="100%"
                  stroke="#4A4A4A"
                  strokeWidth="1"
                  transform="translate(0, 3)"
                />
                <text
                  x={`${xPercent}%`}
                  y="100%"
                  textAnchor="middle"
                  fill="#4A4A4A"
                  fontSize="9"
                  fontFamily="Helvetica, sans-serif"
                  transform="translate(0, 18)"
                >
                  {tick}
                </text>
              </g>
            )
          })}
          
          {/* Y轴刻度：0, 50, 100, 150, 200, 250, 300 */}
          {[0, 50, 100, 150, 200, 250, 300].map((tick) => {
            const yPercent = 100 - (tick / 300) * 100
            return (
              <g key={`y-${tick}`}>
                <line
                  x1="0"
                  y1={`${yPercent}%`}
                  x2="0"
                  y2={`${yPercent}%`}
                  stroke="#4A4A4A"
                  strokeWidth="1"
                  transform="translate(-3, 0)"
                />
                <text
                  x="0"
                  y={`${yPercent}%`}
                  textAnchor="end"
                  fill="#4A4A4A"
                  fontSize="9"
                  fontFamily="Helvetica, sans-serif"
                  transform="translate(-8, 3)"
                >
                  {tick}
                </text>
              </g>
            )
          })}
        </svg>

        {/* 网格线 - 浅灰色 */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
            const xPercent = ((tick + 10) / 20) * 100
            return (
              <line
                key={`grid-x-${tick}`}
                x1={`${xPercent}%`}
                y1="0"
                x2={`${xPercent}%`}
                y2="100%"
                stroke="#4A4A4A"
                strokeWidth="0.5"
              />
            )
          })}
          {[0, 50, 100, 150, 200, 250, 300].map((tick) => {
            const yPercent = 100 - (tick / 300) * 100
            return (
              <line
                key={`grid-y-${tick}`}
                x1="0"
                y1={`${yPercent}%`}
                x2="100%"
                y2={`${yPercent}%`}
                stroke="#4A4A4A"
                strokeWidth="0.5"
              />
            )
          })}
        </svg>

        {/* 参考线 - 虚线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
          {/* 垂直参考线：x=-1 和 x=1 */}
          <line
            x1={`${((-1 + 10) / 20) * 100}%`}
            y1="0"
            x2={`${((-1 + 10) / 20) * 100}%`}
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
          <line
            x1={`${((1 + 10) / 20) * 100}%`}
            y1="0"
            x2={`${((1 + 10) / 20) * 100}%`}
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
          {/* 水平参考线：y=0 (基线) */}
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
        </svg>

        {/* 数据点 */}
        {data.map((point, i) => {
          const { xPercent, yPercent } = convertToPosition(point.x, point.y)
          const color = point.type === 'up' ? '#E64B35' : point.type === 'down' ? '#4DBBD5' : '#999999'
          const opacity = point.type === 'ns' ? 0.5 : 0.7
          const size = point.type === 'ns' ? 2 : 3
          
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(${xPercent}% - ${size / 2}px)`,
                bottom: `calc(${yPercent}% - ${size / 2}px)`,
                backgroundColor: color,
                opacity: opacity,
              }}
            />
          )
        })}

        {/* 图例 */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded p-2 shadow-sm border border-gray-300 z-20">
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E64B35', opacity: 0.7 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>Significantly Up-Regulated</span>
          </div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4DBBD5', opacity: 0.7 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>Significantly Down-Regulated</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#999999', opacity: 0.5 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>No Significant Change</span>
          </div>
        </div>
      </div>

      {/* 轴标签 */}
      <div className="mt-3 flex justify-between text-xs font-medium text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>
        <span>Log2 Fold-Change</span>
        <span>-log10(Padj)</span>
      </div>
    </div>
  )
}

// 火山图 - BioPlot AI 复现版本（视觉几乎一致）
// 使用相同的数据生成函数以确保完全一致
function VolcanoPlotReproduced() {
  // 使用相同的固定种子确保数据完全一致
  const data = useMemo(() => generateVolcanoData(42), [])
  
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* 图表区域 - 完全相同的样式 */}
      <div className="flex-1 relative border border-gray-400 rounded bg-white overflow-hidden">
        {/* 坐标轴 - 深灰色（完全一致） */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 z-10"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gray-700 z-10"></div>

        {/* 坐标轴刻度（完全一致） */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* X轴刻度：-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10 */}
          {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
            const xPercent = ((tick + 10) / 20) * 100
            return (
              <g key={`x-${tick}`}>
                <line
                  x1={`${xPercent}%`}
                  y1="100%"
                  x2={`${xPercent}%`}
                  y2="100%"
                  stroke="#4A4A4A"
                  strokeWidth="1"
                  transform="translate(0, 3)"
                />
                <text
                  x={`${xPercent}%`}
                  y="100%"
                  textAnchor="middle"
                  fill="#4A4A4A"
                  fontSize="9"
                  fontFamily="Helvetica, sans-serif"
                  transform="translate(0, 18)"
                >
                  {tick}
                </text>
              </g>
            )
          })}
          
          {/* Y轴刻度：0, 50, 100, 150, 200, 250, 300 */}
          {[0, 50, 100, 150, 200, 250, 300].map((tick) => {
            const yPercent = 100 - (tick / 300) * 100
            return (
              <g key={`y-${tick}`}>
                <line
                  x1="0"
                  y1={`${yPercent}%`}
                  x2="0"
                  y2={`${yPercent}%`}
                  stroke="#4A4A4A"
                  strokeWidth="1"
                  transform="translate(-3, 0)"
                />
                <text
                  x="0"
                  y={`${yPercent}%`}
                  textAnchor="end"
                  fill="#4A4A4A"
                  fontSize="9"
                  fontFamily="Helvetica, sans-serif"
                  transform="translate(-8, 3)"
                >
                  {tick}
                </text>
              </g>
            )
          })}
        </svg>

        {/* 网格线 - 浅灰色（完全一致） */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => {
            const xPercent = ((tick + 10) / 20) * 100
            return (
              <line
                key={`grid-x-${tick}`}
                x1={`${xPercent}%`}
                y1="0"
                x2={`${xPercent}%`}
                y2="100%"
                stroke="#4A4A4A"
                strokeWidth="0.5"
              />
            )
          })}
          {[0, 50, 100, 150, 200, 250, 300].map((tick) => {
            const yPercent = 100 - (tick / 300) * 100
            return (
              <line
                key={`grid-y-${tick}`}
                x1="0"
                y1={`${yPercent}%`}
                x2="100%"
                y2={`${yPercent}%`}
                stroke="#4A4A4A"
                strokeWidth="0.5"
              />
            )
          })}
        </svg>

        {/* 参考线 - 虚线（完全一致） */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
          {/* 垂直参考线：x=-1 和 x=1 */}
          <line
            x1={`${((-1 + 10) / 20) * 100}%`}
            y1="0"
            x2={`${((-1 + 10) / 20) * 100}%`}
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
          <line
            x1={`${((1 + 10) / 20) * 100}%`}
            y1="0"
            x2={`${((1 + 10) / 20) * 100}%`}
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
          {/* 水平参考线：y=0 (基线) */}
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="100%"
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity={0.6}
          />
        </svg>

        {/* 数据点 - 完全相同的颜色和位置 */}
        {data.map((point, i) => {
          const { xPercent, yPercent } = convertToPosition(point.x, point.y)
          const color = point.type === 'up' ? '#E64B35' : point.type === 'down' ? '#4DBBD5' : '#999999'
          const opacity = point.type === 'ns' ? 0.5 : 0.7
          const size = point.type === 'ns' ? 2 : 3
          
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(${xPercent}% - ${size / 2}px)`,
                bottom: `calc(${yPercent}% - ${size / 2}px)`,
                backgroundColor: color,
                opacity: opacity,
              }}
            />
          )
        })}

        {/* 图例 - 完全一致 */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded p-2 shadow-sm border border-gray-300 z-20">
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E64B35', opacity: 0.7 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>Significantly Up-Regulated</span>
          </div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4DBBD5', opacity: 0.7 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>Significantly Down-Regulated</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#999999', opacity: 0.5 }}></div>
            <span className="text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>No Significant Change</span>
          </div>
        </div>
      </div>

      {/* 轴标签 - 完全一致 */}
      <div className="mt-3 flex justify-between text-xs font-medium text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>
        <span>Log2 Fold-Change</span>
        <span>-log10(Padj)</span>
      </div>
    </div>
  )
}
