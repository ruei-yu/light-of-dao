'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Radar = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Radar),
  { ssr: false }
)

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

// 六個光
const LABELS = ['安心之光','力行之光','洞察之光','圓融之光','喜悅之光','發心之光'] as const
type Key = typeof LABELS[number]

// 你的六個圖示（把檔案放 public/icons 下；檔名可自訂）
const ICONS: Record<Key, { src: string; color: string; note: string }> = {
  安心之光: {
    src: '/icons/peace.png',
    color: '#5bc0be',
    note: '把心安住在光中，你就能在變動中保持穩定與清明。',
  },
  力行之光: {
    src: '/icons/action.png',
    color: '#ff7a59',
    note: '從小行動開始，願力在每一步中被喚醒，路也因此顯現。',
  },
  洞察之光: {
    src: '/icons/insight.png',
    color: '#6f5bd3',
    note: '看見因與果，心就少了糾結，多了方向與智慧。',
  },
  圓融之光: {
    src: '/icons/harmony.png',
    color: '#f59e0b',
    note: '不必硬碰硬，願你在理解中包容，在包容中前進。',
  },
  喜悅之光: {
    src: '/icons/joy.png',
    color: '#f6c453',
    note: '喜悅不是結果，而是你走在道上的自然狀態。',
  },
  發心之光: {
    src: '/icons/vow.png',
    color: '#ef4444',
    note: '當你記起初心，力量自然湧現，步伐也會踏實而穩定。',
  },
}

type ResultPayload = {
  score: number[]        // 長度6的分數陣列
  bestIndex: number
  bestKey: Key
  answers: number[]      // 每題選了哪個選項（0~5）
}

export default function ResultPage() {
  const [data, setData] = useState<ResultPayload | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lod_result')
      if (raw) {
        const parsed = JSON.parse(raw)
        // 輕量驗證
        if (Array.isArray(parsed?.score) && parsed.score.length === 6) {
          setData(parsed)
        }
      }
    } catch (e) {
      console.error('parse result failed', e)
    }
  }, [])

  // 如果沒有資料，提示回首頁
  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10">
        <div className="max-w-xl text-center">
          <h1 className="mb-2 text-2xl font-bold">找不到結果</h1>
          <p className="text-slate-600 mb-6">請先完成測驗，或重新整理再試一次。</p>
          <Link href="/" className="inline-block rounded-xl bg-slate-900 px-5 py-2 font-medium text-white">
            回到測驗
          </Link>
        </div>
      </main>
    )
  }

  const { score, bestIndex, bestKey, answers } = data
  const total = answers.length || score.reduce((a, b) => a + b, 0) || 1

  // 雷達圖資料
  const chartData = useMemo(() => {
    return {
      labels: LABELS,
      datasets: [
        {
          label: '你的六光分佈',
          data: score,
          borderWidth: 2,
          fill: true,
        },
      ],
    }
  }, [score])

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        r: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { circular: true },
          angleLines: { color: 'rgba(0,0,0,0.08)' },
        },
      },
    } as const
  }, [])

  // 排序後的統計（從高到低）
  const sorted = LABELS
    .map((k, i) => ({ key: k, value: score[i] ?? 0 }))
    .sort((a, b) => b.value - a.value)

  const top = sorted[0]
  const icon = ICONS[bestKey] ?? ICONS['安心之光']

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        {/* 標題區 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">你的心之光</h1>
          <p className="text-slate-600">以下是你的測驗結果與六光分佈</p>
        </div>

        {/* 主結果卡片 */}
        <section className="mx-auto max-w-2xl rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur text-center">
          <div className="mb-4 flex justify-center">
            <Image src={icon.src} alt={bestKey} width={120} height={120} />
          </div>
          <h2 className="mb-2 text-2xl font-bold" style={{ color: icon.color }}>
            {bestKey}
          </h2>
          <p className="text-slate-700">{icon.note}</p>
        </section>

        {/* 統計 + 雷達圖 */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-black/5 backdrop-blur">
            <h3 className="mb-4 text-lg font-semibold">六光雷達圖</h3>
            <Radar data={chartData} options={chartOptions} />
          </div>

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
              <li className="pt-2">
                <div className="text-slate-600 mb-2">分數明細（高→低）</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {sorted.map((s) => (
                    <div
                      key={s.key}
                      className="rounded-xl border border-slate-200/70 p-3 text-center"
                      title={`${s.key}: ${s.value}`}
                    >
                      <div className="text-sm text-slate-500">{s.key}</div>
                      <div className="text-xl font-bold">{s.value}</div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 六光總覽（圖示 + 短文案） */}
        <section className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">六光導引</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LABELS.map((k) => {
              const it = ICONS[k]
              return (
                <div key={k} className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur">
                  <div className="mb-3 flex items-center gap-3">
                    <Image src={it.src} alt={k} width={48} height={48} />
                    <div className="text-base font-semibold" style={{ color: it.color }}>{k}</div>
                  </div>
                  <p className="text-sm text-slate-700">{it.note}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 底部動作 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white">
            再測一次
          </Link>
          <button
            onClick={() => {
              if (!navigator?.clipboard) return
              navigator.clipboard.writeText(window.location.origin)
            }}
            className="rounded-xl px-5 py-2 ring-1 ring-black/10 text-slate-700"
            title="複製分享連結"
          >
            複製分享連結
          </button>
        </div>
      </div>
    </main>
  )
}
