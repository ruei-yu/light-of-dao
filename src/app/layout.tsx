// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Light of Dao',
  description: '心燈測驗・找回內在的明',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body
        className="min-h-screen overflow-x-hidden text-slate-800 antialiased"
        style={{ background: 'transparent' }}
      >
        {/* 單張固定背景（修正：僅使用 longhand，沒有 shorthand/background） */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10"
          style={{
            pointerEvents: 'none',
            backgroundImage: [
             // 中央白色區（保留乾淨的文字區）
             'radial-gradient(1200px 900px at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.80) 26%, rgba(255,255,255,0) 60%)',
             // 粉色：左上
             'radial-gradient(1200px 900px at 0% 0%, rgba(255,182,193,0.70) 0%, rgba(255,182,193,0) 70%)',
             // 橘色：右上
             'radial-gradient(1200px 900px at 100% 0%, rgba(251,176,102,0.70) 0%, rgba(251,176,102,0) 70%)',
             // 黃色：上方偏右
             'radial-gradient(1000px 800px at 60% -10%, rgba(255,245,157,0.70) 0%, rgba(255,245,157,0) 70%)',
             // 綠色：下方
             'radial-gradient(1200px 900px at 50% 110%, rgba(152,236,197,0.60) 0%, rgba(152,236,197,0) 70%)',
             // 藍色：左下
             'radial-gradient(1200px 900px at 0% 100%, rgba(160,200,255,0.70) 0%, rgba(160,200,255,0) 70%)',
             // 紫色：右下
             'radial-gradient(1200px 900px at 100% 100%, rgba(196,170,255,0.70) 0%, rgba(196,170,255,0) 70%)',
            ].join(','),
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px) saturate(115%)',
            willChange: 'transform', // 平滑
          }}
        />

        {/* 內容層 */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
