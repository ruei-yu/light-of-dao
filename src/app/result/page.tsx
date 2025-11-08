'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BackgroundAura from '../components/BackgroundAura' // 🌈 加入柔光背景

// 只在瀏覽器載入 Radar（禁止 SSR）
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

// 固定 6 光
const LABELS = ['安心之光', '力行之光', '洞察之光', '圓融之光', '喜悅之光', '發心之光'] as const
type Key = typeof LABELS[number]

// ✨ 圖示
const ICONS = {
  安心之光: { src: '/icons/peace.svg?v=2',  color: '#5bc0be', note: '把心安住在光中，你就能在變動中保持穩定與清明。' },
  力行之光: { src: '/icons/action.svg?v=2', color: '#39A0FF', note: '從小行動開始，願力在每一步中被喚醒，路也因此顯現。' },
  洞察之光:{ src: '/icons/insight.svg?v=2', color: '#6f5bd3', note: '看見因與果，心就少了糾結，多了方向與智慧。' },
  圓融之光: { src: '/icons/harmony.svg?v=2',color: '#f59e0b', note: '不必硬碰硬，願你在理解中包容，在包容中前進。' },
  喜悅之光: { src: '/icons/joy.svg?v=2',    color: '#f6c453', note: '喜悅不是結果，而是你走在道上的自然狀態。' },
  發心之光: { src: '/icons/vow.svg?v=2',    color: '#ef4444', note: '當你記起初心，力量自然湧現，步伐也會踏實而穩定。' },
} as const

// 🌟 依「最高分光」對應的祝福庫
const BLESSINGS: Record<Key, string[]> = {
  安心之光: [
    '安住當下，一呼一吸皆是清明；心若不動，萬相自寂。',
    '心定則身安，光在處處；願你在靜裡，看見更大的穩。',
  ],
  力行之光: [
    '道在行中現，念在步中明；一步一光，一日一成。',
    '願你以願為舟、以行為槳，小步不停，終至彼岸。',
  ],
  洞察之光: [
    '見其因，捨其惑；明其果，定其心。',
    '願你以慧照見本然，於分岔處能知所向。',
  ],
  圓融之光: [
    '以理解化尖，以慈心圓角；合和同真，萬事成就。',
    '願你不爭不礙，柔中有力，轉剛為和。',
  ],
  喜悅之光: [
    '喜不從外來，光自心中明；願你處處見可愛，念念皆光。',
    '願你以笑迎風，於平凡處見璀璨，在行走中生歡喜。',
  ],
  發心之光: [
    '初心一發，群善隨之；願你念念向善，步步踏實。',
    '願你記取本願，如燈長明，照己亦照人。',
  ],
}

type ResultPayload = {
  score: number[]     // 長度 6
  bestIndex: number
  bestKey: Key
  answers: number[]   // 每題選 0~5
}

export default function ResultPage() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<ResultPayload | null>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = sessionStorage.getItem('lod_result')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.score) && parsed.score.length === 6) {
          setData(parsed)
        }
      }
    } catch (e) {
      console.error('讀取結果失敗：', e)
    }
  }, [])

  const safeScore = (data?.score && data.score.length === 6) ? data.score : [0,0,0,0,0,0]
  const safeAnswers = Array.isArray(data?.answers) ? data!.answers : []
  const safeBestKey: Key = (data?.bestKey as Key) ?? '安心之光'

  const sorted = useMemo(
    () => LABELS.map((k, i) => ({ key: k, value: safeScore[i] ?? 0 })).sort((a, b) => b.value - a.value),
    [safeScore]
  )
  const top = sorted[0]
  const icon = ICONS[safeBestKey]

  const blessing = useMemo(() => {
    const key = (top?.key ?? safeBestKey) as Key
    const pool = BLESSINGS[key] ?? BLESSINGS['安心之光']
    return pool[Math.floor(Math.random() * pool.length)]
  }, [top?.key, safeBestKey])

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

  const total = safeAnswers.length

  // 🌈 這裡根據最高分光加上專屬背景
  return (
    <main className="relative min-h-screen px-6 py-10 sm:px-10 overflow-x-hidden">
      <BackgroundAura theme={safeBestKey} /> {/* 💡 將最高分光傳入背景 */}
      
      {!mounted ? (
        <div className="min-h-[60vh] flex items-center justify-center text-slate-700">
          <div className="animate-pulse text-lg">載入中…</div>
        </div>
      ) : !data ? (
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
            <p className="text-slate-600">以下是你的測驗結果與六光分佈</p>
          </div>

          {/* 主結果卡 */}
          <section className="mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur text-center">
            <div className="mb-4 flex justify-center">
              <Image src={icon.src} alt={safeBestKey} width={120} height={120} />
            </div>
            <h2 className="mb-2 text-2xl font-bold" style={{ color: icon.color }}>
              {safeBestKey}
            </h2>
            <p className="text-slate-700">{icon.note}</p>
          </section>

          {/* 統計 + 雷達圖 */}
          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
              <h3 className="mb-4 text-lg font-semibold">六光雷達圖</h3>
              <Radar data={chartData} options={chartOptions} />
            </div>

            {/* 右側：統計資訊 + 仙佛慈語祝福 */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
                <h3 className="mb-4 text-lg font-semibold">統計資訊</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-600">總題數</span>
                    <span className="font-medium">{total}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-600">最高分光</span>
                    <span className="font-medium">{top.key}（{top.value}）</span>
                  </li>
                </ul>
              </div>

              {/* 仙佛慈語祝福卡 */}
              <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
                <h3 className="text-lg font-semibold text-slate-800">仙佛慈語祝福</h3>
                <p className="mt-2 text-slate-600 text-sm leading-7">{blessing}</p>
                <div className="mt-3 text-xs text-slate-400">— 祝你安然、清明且有力量</div>
              </div>
            </div>
          </section>

          {/* 六光導引 */}
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">六光導引</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LABELS.map((k) => {
                const it = ICONS[k]
                return (
                  <div key={k} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur">
                    <div className="mb-3 flex items-center gap-3">
                      <Image src={it.src} alt={k} width={48} height={48} />
                      <div className="text-base font-semibold" style={{ color: it.color }}>
                        {k}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700">{it.note}</p>
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
