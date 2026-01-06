/**
 * 双语内容字典
 * 支持中英文切换
 */

export type Language = 'zh' | 'en'

export const content = {
  zh: {
    // Navigation
    nav: {
      features: '功能',
      pricing: '定价',
      language: 'EN',
    },
    // Hero Section
    hero: {
      title1: '一键复现',
      title2: '顶刊级生信图表样式',
      description1: '利用 AI 引擎精准提取 Nature/Cell 论文图表风格。',
      description2: '上传图片，直接获得同款样式的',
      description3: 'R (ggplot2)',
      description4: '或',
      description5: 'Python',
      description6: '代码。',
      description7: '不再为调色和排版浪费深夜。',
      cta: '加入内测名单 (免费)',
    },
    // Pricing Section
    pricing: {
      title: '定价方案',
      subtitle: '选择适合您的方案',
      plans: {
        free: {
          name: '基础版',
          description: '每日3次样式提取，适合偶尔使用。',
          price: 0,
          period: '月',
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
        },
        professional: {
          name: '专业版',
          description: '无限次提取，支持 PDF/SVG 矢量导出，AI 自动纠错。',
          price: 19,
          period: '月',
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
          popularLabel: '推荐',
        },
        lab: {
          name: '实验室版',
          description: '团队共享账号，优先支持新图表类型，私有样式库。',
          price: 99,
          period: '月',
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
        },
      },
      modal: {
        title: '感谢关注！',
        message: '产品正在最后打磨中，留下您的邮箱，上线后我们将为您提供',
        discount: '首月 5 折优惠',
        selectedPlan: '您选择的方案：',
        emailPlaceholder: '请输入您的邮箱',
        submit: '提交',
        submitted: '已提交 ✓',
      },
    },
    // Comparison Section
    comparison: {
      title: '视觉对比：Before & After',
      subtitle: '不再只是"画得像"。BioPlot AI 深度解析文献像素，自动生成 99% 还原度的绘图代码。',
      precisionTagline: 'Precision in every pixel',
      beforeLabel: '原生代码输出',
      afterLabel: 'BioPlotLab 复现样式',
      beforeTitle: '原生代码输出',
      beforeDescription: '默认配色、网格背景、业余排版',
      afterTitle: 'BioPlotLab 复现样式',
      afterDescription: 'Nature 风格配色、专业排版、像素级精准还原',
      precisionTitle: '精准复现',
      precisionMetrics: '配色方案 (Color Palette)、字体系统 (Typography)、坐标轴逻辑 (Axis Logic)、标注布局 (Label Layout)',
      viewCode: '查看代码',
      codeModalTitle: 'AI 生成的 ggplot2 代码',
    },
    // Workflow Section
    workflow: {
      title: '工作流程',
      subtitle: '三步完成，从图片到代码',
      steps: [
        {
          title: '上传文献原图',
          description: '支持 Nature、Cell、Science 等顶刊的图表截图或 PDF 导出',
        },
        {
          title: 'AI 样式解构',
          description: '智能识别配色方案、字体、布局、图例位置等视觉元素',
        },
        {
          title: '生成可运行代码',
          description: '输出完整的 ggplot2 或 matplotlib 代码，可直接运行',
        },
      ],
      codeComment: '# AI 生成的代码示例',
      codeExtract: '# 从原图提取的精确色号',
    },
    // Features Section
    features: {
      title: '核心优势',
      subtitle: '专为生信研究者打造',
      items: [
        {
          title: '比通用大模型更懂生信',
          description: '深度理解 Seurat、DESeq2 等生信工具链，准确识别单细胞、差异表达等图表类型',
        },
        {
          title: '精准色号提取',
          description: 'AI 自动识别并提取图表中的精确 RGB/HEX 色号，确保颜色完全一致',
        },
        {
          title: '矢量图支持',
          description: '支持 PDF、SVG 等矢量格式，保持图表清晰度，适合论文发表',
        },
        {
          title: '代码自动纠错',
          description: '生成的代码经过语法检查，确保可直接运行，减少调试时间',
        },
      ],
    },
    // Lead Capture Section
    leadCapture: {
      title: '抢先体验 BioPlot AI',
      subtitle: '加入内测名单，第一时间体验 AI 驱动的生信图表样式复现功能',
      emailPlaceholder: '请输入您的邮箱地址',
      submit: '提交',
      submitted: '已提交',
      thankYou: '感谢您的关注！我们会尽快与您联系。',
      privacy: '我们承诺不会向第三方分享您的邮箱信息',
    },
  },
  en: {
    // Navigation
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      language: '中文',
    },
    // Hero Section
    hero: {
      title1: 'Replicate Top-tier Journal',
      title2: 'Plot Styles with One Click',
      description1: 'Precisely extract visual styles from Nature/Cell papers using AI.',
      description2: 'Upload a figure and get the exact',
      description3: 'R (ggplot2)',
      description4: 'or',
      description5: 'Python',
      description6: 'code instantly.',
      description7: 'Stop wasting late nights on colors and layouts.',
      cta: 'Join Beta (Free)',
    },
    // Pricing Section
    pricing: {
      title: 'Pricing',
      subtitle: 'Choose the plan that works for you',
      plans: {
        free: {
          name: 'Basic',
          description: '3 extractions per day, perfect for occasional use.',
          price: 0,
          period: 'mo',
          features: [
            { text: 'Color extraction only', included: true },
            { text: '3 uses per day', included: true },
            { text: 'Full style replication', included: false },
            { text: 'PDF/SVG export', included: false },
            { text: 'AI code debugging', included: false },
            { text: 'Team sharing', included: false },
            { text: 'Private style library', included: false },
            { text: 'Priority support', included: false },
          ],
          cta: 'Get Started',
          popular: false,
        },
        professional: {
          name: 'Pro',
          description: 'Unlimited extractions, PDF/SVG vector export, AI-driven code debugging.',
          price: 19,
          period: 'mo',
          features: [
            { text: 'Full style replication', included: true },
            { text: 'PDF/SVG export', included: true },
            { text: 'AI code debugging', included: true },
            { text: 'Unlimited uses', included: true },
            { text: 'Team sharing', included: false },
            { text: 'Private style library', included: false },
            { text: 'Priority support', included: false },
          ],
          cta: 'Subscribe',
          popular: true,
          popularLabel: 'Recommended',
        },
        lab: {
          name: 'Lab',
          description: 'Team sharing, priority support for new plot types, private style library.',
          price: 99,
          period: 'mo',
          features: [
            { text: 'All Pro features', included: true },
            { text: 'Team sharing (up to 10 users)', included: true },
            { text: 'Private style library', included: true },
            { text: 'Priority support', included: true },
            { text: 'API access', included: true },
            { text: 'Custom services', included: true },
          ],
          cta: 'Subscribe',
          popular: false,
        },
      },
      modal: {
        title: 'Thank You!',
        message: 'Coming Soon! We are polishing the final features. Leave your email for a',
        discount: '50% early-bird discount',
        selectedPlan: 'Selected Plan:',
        emailPlaceholder: 'Enter your email',
        submit: 'Submit',
        submitted: 'Submitted ✓',
      },
    },
    // Comparison Section
    comparison: {
      title: 'Visual Comparison: Before & After',
      subtitle: 'Beyond "Looking Similar". BioPlot AI analyzes figure pixels to generate code with 99% stylistic fidelity.',
      precisionTagline: 'Precision in every pixel',
      beforeLabel: 'Default Output',
      afterLabel: 'Reproduced by BioPlotLab',
      beforeTitle: 'Default Output',
      beforeDescription: 'Default colors, grid background, amateur layout',
      afterTitle: 'Reproduced by BioPlotLab',
      afterDescription: 'Nature-style colors, professional layout, pixel-perfect reproduction',
      precisionTitle: 'Precision Metrics',
      precisionMetrics: 'Color Palette, Typography, Axis Logic, Label Layout',
      viewCode: 'View Code',
      codeModalTitle: 'AI-Generated ggplot2 Code',
    },
    // Workflow Section
    workflow: {
      title: 'Workflow',
      subtitle: 'Three steps from image to code',
      steps: [
        {
          title: 'Upload Journal Figure',
          description: 'Support screenshots or PDF exports from top journals like Nature, Cell, Science',
        },
        {
          title: 'AI Style Deconstruction',
          description: 'Intelligently identify color schemes, fonts, layouts, legend positions, and other visual elements',
        },
        {
          title: 'Generate Runnable Code',
          description: 'Output complete ggplot2 or matplotlib code that can be run directly',
        },
      ],
      codeComment: '# AI-generated code example',
      codeExtract: '# Exact color codes extracted from original figure',
    },
    // Features Section
    features: {
      title: 'Core Features',
      subtitle: 'Built for bioinformatics researchers',
      items: [
        {
          title: 'More Bioinformatics-Savvy Than General Models',
          description: 'Deep understanding of bioinformatics toolchains like Seurat, DESeq2, accurately identifies single-cell, differential expression, and other plot types',
        },
        {
          title: 'Precise Color Extraction',
          description: 'AI automatically identifies and extracts exact RGB/HEX color codes from plots, ensuring perfect color matching',
        },
        {
          title: 'Vector Format Support',
          description: 'Support PDF, SVG and other vector formats, maintaining plot clarity, suitable for publication',
        },
        {
          title: 'Automatic Code Debugging',
          description: 'Generated code undergoes syntax checking to ensure it can run directly, reducing debugging time',
        },
      ],
    },
    // Lead Capture Section
    leadCapture: {
      title: 'Get Early Access to BioPlot AI',
      subtitle: 'Join the beta list to be among the first to experience AI-driven bioinformatics plot style replication',
      emailPlaceholder: 'Enter your email address',
      submit: 'Submit',
      submitted: 'Submitted',
      thankYou: 'Thank you for your interest! We will contact you soon.',
      privacy: 'We promise not to share your email with third parties',
    },
  },
} as const

