# BioPlot AI - 落地页

一个极简、现代、具有学术美感的 AI 生信绘图工具落地页。

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看页面。

### 构建生产版本

```bash
npm run build
npm start
```

## 功能特性

- ✅ Hero Section - 核心价值展示
- ✅ Before & After 视觉对比 - 交互式滑块展示原生 R 图表与 Nature 风格对比
- ✅ Workflow Visualization - 三步工作流展示
- ✅ Core Features - 核心优势展示
- ✅ Pricing Section - 三个定价方案（含弹窗交互）
- ✅ Lead Capture - 邮箱留资表单
- ✅ 完整的点击追踪系统 - 支持 Vercel Analytics 和 Google Analytics

## 事件追踪（核心指标）

项目集成了完整的点击追踪系统，帮助您分析用户行为，特别是定价方案的点击情况。

### 追踪的事件

1. **定价方案点击** - 核心指标
   - 追踪用户点击了哪个价格档位（$0/月、$19/月、$99/月）
   - **关键洞察**：如果 $19/月 的点击量远多于 $0/月，说明用户对"节省时间"的付费意愿极强

2. **定价表单提交** - 追踪用户在定价弹窗中提交邮箱

3. **CTA 按钮点击** - 追踪主要行动号召按钮

4. **留资表单提交** - 追踪邮箱留资

### 查看追踪数据

**开发环境**：所有事件都会在浏览器控制台输出，格式如下：
```
[Analytics] {
  category: 'pricing',
  action: 'pricing_plan_clicked',
  label: 'Professional (专业版)',
  value: 19,
  planName: 'Professional',
  planCn: '专业版',
  price: 19,
  ...
}
```

**生产环境**：支持以下分析平台：
- Vercel Analytics（推荐，无需配置）
- Google Analytics 4
- 自定义端点（可选）

详细配置说明请查看 [分析追踪配置指南](./docs/analytics-setup.md)

## 设计说明

- **风格**：参考 Linear、Vercel、Apple 的简洁设计
- **色调**：深蓝/学术灰/白色背景，搭配生信渐变色（紫到蓝）
- **字体**：衬线体（标题）与无衬线体（正文）结合，体现科学专业感
- **响应式**：完全适配移动端和桌面端

