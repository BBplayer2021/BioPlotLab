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
      title: '让你的实验数据，一键穿上"Nature"的外套',
      subtitle: 'BioPlotLab：专为初学者设计的顶刊图表逆向复现引擎。无需代码，1:1 像素级复现文献绘图规范。',
      cta: '立即体验"一键投 Nature"',
    },
    // Pricing Section
    pricing: {
      title: '定价方案',
      subtitle: '选择适合您的方案',
      creditHint: '按需付费，每一分钱都用在刀刃上。1 点数 = 1 次完整的 AI 逆向绘图任务。',
      creditTransparency: '点数仅在成功生成成果包时扣除，识别失败不扣点，保障科研投入。',
      plans: {
        free: {
          name: '基础版',
          description: '适合初次体验',
          price: 0,
          period: '月',
          credits: 3,
          creditsLabel: '每月送',
          features: [
            { text: '完整样式复现', included: true },
            { text: '导出 PDF/SVG', included: true },
            { text: '代码自动纠错', included: true },
            { text: '成果包导出', included: false },
            { text: '多账号共享', included: false },
            { text: '私有样式库', included: false },
            { text: '优先技术支持', included: false },
          ],
          cta: '立即获取点数',
          popular: false,
        },
        professional: {
          name: '专业版',
          description: '最受硕博生欢迎，支持"成果包"导出',
          price: 49,
          period: '月',
          credits: 50,
          creditsLabel: '每月包含',
          features: [
            { text: '完整样式复现', included: true },
            { text: '导出 PDF/SVG', included: true },
            { text: '代码自动纠错', included: true },
            { text: '成果包导出', included: true },
            { text: '多账号共享', included: false },
            { text: '私有样式库', included: false },
            { text: '优先技术支持', included: false },
          ],
          cta: '开启订阅赠 50 点',
          popular: true,
          popularLabel: '推荐',
        },
        addon: {
          name: '点数加油包',
          description: '无需订阅，永久有效',
          price: 19,
          period: '',
          credits: 20,
          creditsLabel: '包含',
          features: [
            { text: '完整样式复现', included: true },
            { text: '导出 PDF/SVG', included: true },
            { text: '代码自动纠错', included: true },
            { text: '成果包导出', included: true },
            { text: '永久有效', included: true },
            { text: '无需订阅', included: true },
          ],
          cta: '立即获取点数',
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
      natureButton: {
        label: '我要投 Nature',
        title: 'Nature 期刊出版规范',
        subtitle: '一键复制顶刊标准配置',
        specs: {
          font: '字体',
          dpi: '分辨率',
          colorMode: '色彩模式',
          format: '文件格式',
        },
        values: {
          font: 'Arial / Helvetica (10-12pt)',
          dpi: '300 DPI (最小)',
          colorMode: 'RGB (屏幕) / CMYK (印刷)',
          format: 'PDF (矢量) / TIFF (位图)',
        },
        copyButton: '一键复制配置',
        copied: '已复制 ✓',
        qrTitle: '扫码入群',
        qrSubtitle: '加入 BioPlotLab 用户群，获取最新动态',
      },
    },
    // Comparison Section
    comparison: {
      title: '视觉对比：Before & After',
      subtitle: '不再只是"画得像"。BioPlotLab 深度解析文献像素，自动生成 99% 还原度的绘图代码。',
      beforeLabel: 'Source: Nature Genetics 文献原图',
      afterLabel: 'BioPlotLab: 1:1 复现图 (基于用户数据)',
      floatingTag: '99% 视觉相似度，支持 SVG 导出',
      viewCode: '查看代码',
      codeModalTitle: 'AI 生成的 ggplot2 代码',
    },
    // Workflow Section (Process Section)
    workflow: {
      title: '三步走流程',
      subtitle: '从文献截图到成果包，只需三步',
      steps: [
        {
          icon: 'screenshot',
          title: '视觉克隆',
          description: '截取任意文献中的心仪图表，AI 自动提取配色、字体、布局参数',
        },
        {
          icon: 'upload',
          title: '智能适配',
          description: '直接上传 DESeq2 等原始结果，AI 自动清洗数据并映射变量',
        },
        {
          icon: 'package',
          title: '成果交付',
          description: '一键生成包含高分图片、可溯源 R 代码、标准数据的"成果包"',
        },
      ],
    },
    // Features Section (Pricing & Trust)
    features: {
      title: '核心卖点',
      subtitle: '专为科研发表打造',
      items: [
        {
          title: '我要投 Nature',
          description: '内置顶刊出版规范，一键设置字体、DPI 与色彩模式',
          icon: 'nature',
        },
        {
          title: '内存级隐私保护',
          description: '郑重承诺数据仅在本地/内存处理，关闭页面即焚，绝不上传服务器',
          icon: 'privacy',
        },
        {
          title: '代码信任背书',
          description: '随包附赠带有详细注释的 R 代码，满足学术严谨性要求',
          icon: 'code',
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
      title: 'Dress Your Experimental Data in "Nature" Style with One Click',
      subtitle: 'BioPlotLab: A top-tier journal plot reverse engineering engine designed for beginners. No coding required, 1:1 pixel-level replication of literature plotting standards.',
      cta: 'Try "One-Click to Nature" Now',
    },
    // Pricing Section
    pricing: {
      title: 'Pricing',
      subtitle: 'Choose the plan that works for you',
      creditHint: 'Pay as you go, every penny counts. 1 Credit = 1 complete AI reverse plotting task.',
      creditTransparency: 'Credits are only deducted when a result package is successfully generated. Failed recognition does not consume credits, protecting your research investment.',
      plans: {
        free: {
          name: 'Basic',
          description: 'Perfect for first-time users',
          price: 0,
          period: 'mo',
          credits: 3,
          creditsLabel: 'Free',
          features: [
            { text: 'Full style replication', included: true },
            { text: 'PDF/SVG export', included: true },
            { text: 'AI code debugging', included: true },
            { text: 'Result package export', included: false },
            { text: 'Team sharing', included: false },
            { text: 'Private style library', included: false },
            { text: 'Priority support', included: false },
          ],
          cta: 'Get Credits Now',
          popular: false,
        },
        professional: {
          name: 'Pro',
          description: 'Most popular among graduate students, supports "Result Package" export',
          price: 49,
          period: 'mo',
          credits: 50,
          creditsLabel: 'Includes',
          features: [
            { text: 'Full style replication', included: true },
            { text: 'PDF/SVG export', included: true },
            { text: 'AI code debugging', included: true },
            { text: 'Result package export', included: true },
            { text: 'Team sharing', included: false },
            { text: 'Private style library', included: false },
            { text: 'Priority support', included: false },
          ],
          cta: 'Subscribe & Get 50 Credits',
          popular: true,
          popularLabel: 'Recommended',
        },
        addon: {
          name: 'Credit Top-up',
          description: 'No subscription required, credits never expire',
          price: 19,
          period: '',
          credits: 20,
          creditsLabel: 'Includes',
          features: [
            { text: 'Full style replication', included: true },
            { text: 'PDF/SVG export', included: true },
            { text: 'AI code debugging', included: true },
            { text: 'Result package export', included: true },
            { text: 'Never expires', included: true },
            { text: 'No subscription', included: true },
          ],
          cta: 'Get Credits Now',
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
      natureButton: {
        label: 'I Want to Submit to Nature',
        title: 'Nature Journal Publication Standards',
        subtitle: 'One-click copy top-tier journal configuration',
        specs: {
          font: 'Font',
          dpi: 'Resolution',
          colorMode: 'Color Mode',
          format: 'File Format',
        },
        values: {
          font: 'Arial / Helvetica (10-12pt)',
          dpi: '300 DPI (minimum)',
          colorMode: 'RGB (screen) / CMYK (print)',
          format: 'PDF (vector) / TIFF (bitmap)',
        },
        copyButton: 'Copy Configuration',
        copied: 'Copied ✓',
        qrTitle: 'Scan to Join',
        qrSubtitle: 'Join BioPlotLab user group for latest updates',
      },
    },
    // Comparison Section
    comparison: {
      title: 'Visual Comparison: Before & After',
      subtitle: 'Beyond "Looking Similar". BioPlotLab analyzes figure pixels to generate code with 99% stylistic fidelity.',
      beforeLabel: 'Source: Nature Genetics Original Figure',
      afterLabel: 'BioPlotLab: 1:1 Reproduction (Based on User Data)',
      floatingTag: '99% Visual Similarity, SVG Export Supported',
      viewCode: 'View Code',
      codeModalTitle: 'AI-Generated ggplot2 Code',
    },
    // Workflow Section (Process Section)
    workflow: {
      title: 'Three-Step Process',
      subtitle: 'From literature screenshot to result package in just three steps',
      steps: [
        {
          icon: 'screenshot',
          title: 'Visual Cloning',
          description: 'Capture any desired chart from literature, AI automatically extracts color schemes, fonts, and layout parameters',
        },
        {
          icon: 'upload',
          title: 'Smart Adaptation',
          description: 'Directly upload raw results from DESeq2, AI automatically cleans data and maps variables',
        },
        {
          icon: 'package',
          title: 'Result Delivery',
          description: 'One-click generation of "result package" containing high-resolution images, traceable R code, and standard data',
        },
      ],
    },
    // Features Section (Pricing & Trust)
    features: {
      title: 'Core Selling Points',
      subtitle: 'Built for scientific publication',
      items: [
        {
          title: 'I Want to Submit to Nature',
          description: 'Built-in top-tier journal publication standards, one-click font, DPI, and color mode settings',
          icon: 'nature',
        },
        {
          title: 'Memory-Level Privacy Protection',
          description: 'Solemnly promise: data processed only locally/in memory, destroyed when page closes, never uploaded to server',
          icon: 'privacy',
        },
        {
          title: 'Code Trust Endorsement',
          description: 'Package includes well-commented R code, meeting academic rigor requirements',
          icon: 'code',
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

