'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChatbotWidget = dynamic(
  () => import('@/components/chatbot-widget').then((module) => module.ChatbotWidget),
  { ssr: false },
)

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

export function ChatbotWidgetLoader() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const idleWindow = window as IdleWindow

    if (typeof idleWindow.requestIdleCallback === 'function') {
      const handle = idleWindow.requestIdleCallback(() => setShouldRender(true), { timeout: 1500 })

      return () => idleWindow.cancelIdleCallback?.(handle)
    }

    const timeout = window.setTimeout(() => setShouldRender(true), 1200)
    return () => window.clearTimeout(timeout)
  }, [])

  return shouldRender ? <ChatbotWidget /> : null
}
