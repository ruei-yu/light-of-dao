'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BackgroundAura from '../components/BackgroundAura'

const Radar = dynamic(() => import('react-chartjs-2').then(m => m.Radar), { ssr: false })

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const LABELS = ['安心之光', '力行之光', '覺察之光', '圓融之光', '喜悅之光', '信念之光'] as const
type Key = typeof LABELS[number]

// ✨ 圖示 + 副標（粗體 note）
const ICONS: Record<Key, { src: string; color: string; note: string }> = {
  安心之光: { src: '/icons/peace.svg?v=2',  color: '#39A0FF', note: '<b>從焦慮與不安回到安定</b>' },
  力行之光: { src: '/icons/action.svg?v=2', color: '#5bc0be',  note: '<b>從倦怠與遲疑回到行動</b>' },
  覺察之光:{ src: '/icons/insight.svg?v=2', color: '#6f5bd3',  note: '<b>從混亂與迷惑回到清明</b>' },
  圓融之光: { src: '/icons/harmony.svg?v=2',color: '#f59e0b',  note: '<b>從執著與剛硬打開心扉</b>' },
  喜悅之光: { src: '/icons/joy.svg?v=2',    color: '#f6c453',  note: '<b>從外在回歸內在的價值</b>' },
  信念之光: { src: '/icons/vow.svg?v=2',    color: '#ef4444',  note: '<b>從迷惘與動搖回到信念</b>' },
}

const BODY: Record<Key, string[]> = {
  安心之光: [
    '點起安心之光，讓雜亂的思緒回歸最單純的狀態，讓一切紛亂慢慢沉澱。',
    '學習撫平內在的波動，帶領自己重新感受心底的寧靜與安定。'
  ],
  力行之光: [
    '點起力行之光，讓改變於此刻展開。',
    '願不再停留於想，而是化為前行的步伐。',
    '光引你向前，讓善意在行動中綻放。'
  ],
  覺察之光: [
    '點起覺察之光，洞見情緒的源頭。',
    '當心明則理明，當理明則慧生，',
    '引領自己走向更有智慧與善意的選擇。'
  ],
  圓融之光: [
    '點起圓融之光，如暖陽照進心中。',
    '柔軟不是退讓，而是和睦的起點。',
    '當學會放下與轉念，幸福便自在心中綻放。'
  ],
  喜悅之光: [
    '點起喜悅之光，重新感受生命的意義與溫度。',
    '在修練中體會快樂的本質，',
    '也明白——什麼才是值得我們永恆追尋的。'
  ],
  信念之光: [
    '點起信念之光，回歸赤子之心。',
    '懷著初心與善心前行，',
    '願力化作腳下最亮的光，指引你前路。'
  ],
}

const BLESSINGS: Record<Key, string[]> = {
  安心之光: [
    '心靜則光明，光明則不動於外境。',
    '安心不在他處，回到呼吸即是門。'
  ],
  力行之光: [
    '善念一起，當下即行；行起之處，福自隨之。',
    '莫待明日，願在腳下。'
  ],
  覺察之光: [
    '能見己心，萬事自明。',
    '見情不隨情，見念不逐念。'
  ],
  圓融之光: [
    '以柔化剛，以慈化結。',
    '放下一分執著，便得一分自在。'
  ],
  喜悅之光: [
    '歡喜是一種修行，從心生，向心回。',
    '常念感恩，福樂自增。'
  ],
  信念之光: [
    '立願如山，行願如水；山定而水達。',
    '真心不退，光自前導。'
  ],
}

type ResultPayload = {
  score: number[]
  bestIndex: number
  bestKey: Key
  answers: number[]
}

export default function ResultPage() {
  // 🔹 直接在初始值讀取 sessionStorage，確保第一幀就有正確主題
  const [data] = useState<ResultPayload | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = window.sessionStorage.getItem('lod_result')
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.score) && parsed.score.length === 6) return parsed
      return null
    } catch { return null }
  })

  const safeScore = (data?.score && data.score.length === 6) ? data.score : [0,0,0,0,0,0]
  const safeBestKey: Key = (data?.bestKey as Key) ?? '安心之光'

  const sorted = useMemo(
    () => LABELS.map((k, i) => ({ key: k, value: safeScore[i] ?? 0 })).sort((a, b) => b.value - a.value),
    [safeScore]
  )
  const top = sorted[0]
  const bestKey: Key = (top?.key ?? safeBestKey) as Key

  const icon = ICONS[bestKey]
  const bodyLines = BODY[bestKey]
  const blessings = BLESSINGS[bestKey]

  const chartData = useMemo(() => ({
    labels: LABELS,
    datasets: [{
      label: '你的六光分佈',
      data: safeScore,
      borderColor: '#334155',
      backgroundColor: 'rgba(51,65,85,0.15)',
      borderWidth: 2,
      fill: true,
    }],
  }), [safeScore])

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#475569' },
        grid: { circular: true, color: 'rgba(0,0,0,0.08)' },
        pointLabels: { color: '#475569', font: { size: 13 } },
      },
    },
  }), [])

  return (
    <main className="relative min-h-screen px-6 py-10 sm:px-10 overflow-x-hidden">
      {/* ✅ 有資料時才渲染背景，避免預設綠閃 */}
      {data && <BackgroundAura theme={bestKey} />}

      {!data ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-2xl font-bold">找不到結果</h1>
          <p className="text-slate-600 mb-6">請先完成測驗，或重新整理再試一次。</p>
          <Link href="/" className="inline-block rounded-xl bg-slate-900 px-5 py-2 font-medium text-white">
            回到測驗
          </Link>
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">你的心之光</h1>
            <p className="text-slate-600">以下是你的測驗結果與六光導引</p>
          </div>

          {/* 主結果卡 */}
                    {/* 主結果卡 */}
          <section className="mx-auto max-w-4xl rounded-2xl bg-white/80 p-8 shadow-md ring-1 ring-black/5 backdrop-blur">
            {/* 讓整個「icon + 文字」組合在卡片裡置中 */}
            <div className="flex justify-center">
              {/* 左圖右文 */}
              <div className="flex items-center gap-8">
                {/* 左邊 icon */}
                <div className="flex-shrink-0">
                  <Image
                    src={icon.src}
                    alt={bestKey}
                    width={200}   // 想再大可以改 220、240
                    height={200}
                  />
                </div>

                {/* 右邊文字：靠左排 */}
                <div className="text-left">
                  <h2 className="mb-2 text-3xl font-bold" style={{ color: icon.color }}>
                    【{bestKey}】
                  </h2>
                  <p
                    className="text-slate-700 mb-4 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: icon.note }}
                  />
                  <div className="text-slate-700 text-lg leading-8 space-y-2">
                    {bodyLines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 雷達圖 + 仙佛慈語 */}
          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
              <h3 className="mb-4 text-lg font-semibold">六光雷達圖</h3>
              <Radar data={chartData} options={chartOptions} />
            </div>

            <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-800">仙佛慈語祝福</h3>
              <div className="mt-3 space-y-2 text-slate-600 leading-7">
                {blessings.map((b, i) => (<p key={i}>• {b}</p>))}
              </div>
            </div>
          </section>
          

          {/* 六光導引卡片 */}
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">六光導引</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LABELS.map((k) => {
                const it = ICONS[k]
                return (
                  <div
                    key={k}
                    className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <Image src={it.src} alt={k} width={48} height={48} />
                      {/* 不要【】、不要粗體 */}
                      <div className="text-base text-slate-800" style={{ color: it.color }}>
                        {k}
                      </div>
                    </div>
                    {/* 將 note 中的 <b> 標籤去掉並以純文字呈現 */}
                    <p className="text-sm text-slate-700">
                      {it.note.replace(/<[^>]+>/g, '')}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>


          {/* 底部按鈕 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white">
              再測一次
            </Link>
            <button
              onClick={() => {
                if (navigator.clipboard) navigator.clipboard.writeText(window.location.origin)
              }}
              className="rounded-xl px-5 py-2 ring-1 ring-black/10 text-slate-700"
            >
              複製分享連結
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
