/**
 * 统一的事件追踪工具
 * 支持 Vercel Analytics、Google Analytics 和 console 日志
 */

// 事件类型定义
export type EventCategory = 'pricing' | 'cta' | 'form' | 'navigation' | 'comparison'

export interface AnalyticsEvent {
  category: EventCategory
  action: string
  label?: string
  value?: number
  [key: string]: any // 允许额外的自定义属性
}

/**
 * 追踪事件的主函数
 */
export function trackEvent(event: AnalyticsEvent) {
  const { category, action, label, value, ...customData } = event

  // 1. Console 日志（开发环境，始终记录）
  console.log('[Analytics]', {
    category,
    action,
    label,
    value,
    ...customData,
    timestamp: new Date().toISOString(),
  })

  // 2. Vercel Analytics (如果可用)
  // 使用方式：安装 @vercel/analytics 并在组件中导入 track 函数
  // import { track } from '@vercel/analytics'
  // 然后调用：track(action, { category, label, value, ...customData })
  // 
  // 这里我们通过动态导入来避免在生产环境中如果没有安装包时出错
  if (typeof window !== 'undefined') {
    try {
      // 尝试使用 Vercel Analytics 的 track 函数（如果已安装 @vercel/analytics）
      // 注意：这需要在组件中手动调用 track，或者使用动态导入
      // 为了简化，我们使用全局对象检查
      if ((window as any).__VERCEL_ANALYTICS_TRACK__) {
        ;(window as any).__VERCEL_ANALYTICS_TRACK__(action, {
          category,
          label,
          value,
          ...customData,
        })
      }
    } catch (error) {
      console.warn('[Analytics] Vercel Analytics error:', error)
    }
  }

  // 3. Google Analytics 4 (如果可用)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      ;(window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customData,
      })
    } catch (error) {
      console.warn('[Analytics] Google Analytics error:', error)
    }
  }

  // 4. 发送到自定义端点（可选，用于数据收集）
  // 如果将来需要后端存储，可以在这里添加 fetch 调用
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    try {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch((error) => {
        console.warn('[Analytics] Custom endpoint error:', error)
      })
    } catch (error) {
      // 静默失败，不影响用户体验
    }
  }
}

/**
 * 追踪定价方案点击
 */
export function trackPricingClick(planName: string, planCn: string, price: number) {
  trackEvent({
    category: 'pricing',
    action: 'pricing_plan_clicked',
    label: `${planName} (${planCn})`,
    value: price,
    planName,
    planCn,
    price,
    currency: 'USD',
  })
}

/**
 * 追踪定价表单提交
 */
export function trackPricingFormSubmit(planName: string, email: string) {
  trackEvent({
    category: 'form',
    action: 'pricing_form_submitted',
    label: planName,
    planName,
    // 注意：实际生产环境中，邮箱等敏感信息不应直接发送
    // 这里仅用于演示，实际应该只发送哈希值或完全省略
    emailHash: email ? btoa(email).substring(0, 10) : undefined,
  })
}

/**
 * 追踪 CTA 按钮点击
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent({
    category: 'cta',
    action: 'cta_clicked',
    label: ctaName,
    location,
  })
}

/**
 * 追踪对比组件交互
 */
export function trackComparisonInteraction(action: 'slider_drag' | 'view_side_by_side') {
  trackEvent({
    category: 'comparison',
    action,
  })
}

/**
 * 追踪留资表单提交
 */
export function trackLeadCaptureSubmit(email: string, location: string = 'lead_capture_section') {
  trackEvent({
    category: 'form',
    action: 'lead_capture_submitted',
    label: location,
    emailHash: email ? btoa(email).substring(0, 10) : undefined,
  })
}

