'use client'
import { useEffect } from 'react'

export default function ClientBody({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 移除 Grammarly 注入造成 hydration mismatch 的屬性
    const attrs = ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed']
    attrs.forEach((a) => {
      if (document.body.hasAttribute(a)) document.body.removeAttribute(a)
    })
  }, [])

  return (
    <body
      className="min-h-screen overflow-x-hidden text-slate-800 antialiased"
      suppressHydrationWarning
      style={{ background: 'transparent' }}
    >
      {children}
    </body>
  )
}
