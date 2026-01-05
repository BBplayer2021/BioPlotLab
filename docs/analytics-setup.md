# 分析追踪配置指南

本项目的点击追踪系统支持多种分析平台，帮助您了解用户行为，特别是定价方案的点击情况。

## 已实现的追踪功能

### 核心指标追踪

1. **定价方案点击** - 追踪用户点击了哪个价格档位
   - 事件：`pricing_plan_clicked`
   - 数据：方案名称、价格、中文名称
   - **关键指标**：如果 $19/月 的点击量远多于 $0/月，说明用户对"节省时间"的付费意愿极强

2. **定价表单提交** - 追踪用户在定价弹窗中提交邮箱
   - 事件：`pricing_form_submitted`
   - 数据：方案名称、邮箱哈希值

3. **CTA 按钮点击** - 追踪主要行动号召按钮
   - 事件：`cta_clicked`
   - 数据：按钮名称、位置

4. **留资表单提交** - 追踪邮箱留资
   - 事件：`lead_capture_submitted`
   - 数据：位置、邮箱哈希值

## 配置方式

### 方式一：Vercel Analytics（推荐）

Vercel Analytics 是 Vercel 平台内置的分析工具，配置简单。

#### 安装

```bash
npm install @vercel/analytics
```

#### 配置

1. 在 `app/layout.tsx` 中添加 Analytics 组件：

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

2. 在 `lib/analytics.ts` 中更新 `trackEvent` 函数以支持 Vercel Analytics：

```typescript
import { track } from '@vercel/analytics'

export function trackEvent(event: AnalyticsEvent) {
  // ... 其他代码 ...
  
  // Vercel Analytics
  try {
    track(event.action, {
      category: event.category,
      label: event.label,
      value: event.value,
      ...customData,
    })
  } catch (error) {
    console.warn('[Analytics] Vercel Analytics error:', error)
  }
}
```

3. 在 Vercel 项目设置中启用 Analytics

**注意**：当前实现已经包含了控制台日志，即使不配置 Vercel Analytics 也能正常工作。配置 Vercel Analytics 后，数据会自动发送到 Vercel 仪表板。

### 方式二：Google Analytics 4

#### 安装

无需安装额外包，只需添加 GA4 脚本。

#### 配置

1. 在 `app/layout.tsx` 中添加 GA4 脚本：

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

2. 在 `.env.local` 中添加：

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 方式三：自定义端点（可选）

如果需要将数据发送到自己的后端，可以设置环境变量：

```
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-api.com/analytics
```

## 查看追踪数据

### Console 日志（开发环境）

所有事件都会在浏览器控制台输出，格式如下：

```
[Analytics] {
  category: 'pricing',
  action: 'pricing_plan_clicked',
  label: 'Professional (专业版)',
  value: 19,
  planName: 'Professional',
  planCn: '专业版',
  price: 19,
  currency: 'USD',
  timestamp: '2024-01-01T12:00:00.000Z'
}
```

### Vercel Analytics Dashboard

在 Vercel 项目控制台的 Analytics 标签页查看：
- 事件统计
- 用户行为流
- 转化漏斗

### Google Analytics Dashboard

在 GA4 控制台的"事件"部分查看：
- 事件名称：`pricing_plan_clicked`
- 自定义维度：`planName`, `planCn`, `price`

## 数据分析建议

### 关键指标监控

1. **定价方案点击分布**
   - 监控三个方案的点击比例
   - 如果 $19/月 点击量 > $0/月，说明付费意愿强
   - 如果 $99/月 点击量也很高，可以考虑调整定价策略

2. **转化漏斗**
   - 定价点击 → 表单提交 → 邮箱验证
   - 识别流失环节

3. **用户行为路径**
   - Hero CTA → 定价页面 → 选择方案
   - 对比组件交互 → 定价页面

## 隐私保护

- 邮箱等敏感信息不会直接发送到分析平台
- 仅发送邮箱的哈希值（前10个字符）
- 符合 GDPR 和隐私保护要求

## 测试

在开发环境中，所有事件都会在控制台输出，方便调试：

```bash
npm run dev
```

打开浏览器控制台，点击定价按钮，查看事件输出。

