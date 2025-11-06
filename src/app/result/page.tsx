'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 六個光的圖示（記得把圖片放在 public/icons/ 裡）
const ICONS = [
  { key: '安心之光', src: '/icons/peace.png', color: '#5bc0be' },
  { key: '力行之光', src: '/icons/action.png', color: '#ff7a59' },
  { key: '洞察之光', src: '/icons/insight.png', color: '#6f5bd3' },
  { key: '圓融之光', src: '/icons/harmony.png', color: '#f59e0b' },
  { key: '喜悅之光', src: '/icons/joy.png', color: '#f6c453' },
  { key: '發心之光', src: '/icons/vow.png', color: '#ef4444' },
]

export default function ResultPage() {
  const [bestKey, setBestKey] = useState<string | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('lod_result')
    if (raw) {
      const data = JSON.parse(raw)
      setBestKey(data.bestKey)
    }
  }, [])

  const icon = ICONS.find((i) => i.key === bestKey)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">你的心之光</h1>

        {icon ? (
          <div className="mx-auto max-w-md rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
            <div className="mb-4 flex justify-center">
              <Image src={icon.src} alt={icon.key} width={120} height={120} />
            </div>
            <h2 className="mb-2 text-2xl font-bold" style={{ color: icon.color }}>
              {icon.key}
            </h2>
            <p className="text-slate-700">
              感謝完成測驗，願這束光陪你繼續往前。
            </p>
          </div>
        ) : (
          <p className="text-slate-700">找不到結果，請先完成測驗。</p>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-xl bg-slate-900 px-5 py-2 font-medium text-white"
          >
            再測一次
          </Link>
        </div>
      </div>
    </main>
  )
}
