import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BioPlot AI - 一键复现顶刊级生信图表样式',
  description: '利用 AI 引擎精准提取 Nature/Cell 论文图表风格。上传图片，直接获得同款样式的 R (ggplot2) 或 Python 代码。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

