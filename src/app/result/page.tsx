'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BASE_URL = 'https://light-of-dao.vercel.app'

// 背景光暈：只在 client render，避免 hydration error
const BackgroundAura = dynamic(() => import('../components/BackgroundAura'), {
  ssr: false,
})

// 雷達圖：只在 client render
const Radar = dynamic(() => import('react-chartjs-2').then(m => m.Radar), {
  ssr: false,
})

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
type Key = (typeof LABELS)[number]

// ✨ 圖示 + 副標（粗體 note）
const ICONS: Record<Key, { src: string; color: string; note: string }> = {
  安心之光: { src: '/icons/peace.svg?v=2', color: '#39A0FF', note: '<b>從焦慮與不安回到安定</b>' },
  力行之光: { src: '/icons/action.svg?v=2', color: '#5bc0be', note: '<b>從倦怠與遲疑回到行動</b>' },
  覺察之光: { src: '/icons/insight.svg?v=2', color: '#6f5bd3', note: '<b>從混亂與迷惑回到清明</b>' },
  圓融之光: { src: '/icons/harmony.svg?v=2', color: '#f59e0b', note: '<b>從執著與剛硬打開心扉</b>' },
  喜悅之光: { src: '/icons/joy.svg?v=2', color: '#f6c453', note: '<b>從外在回歸內在的價值</b>' },
  信念之光: { src: '/icons/vow.svg?v=2', color: '#ef4444', note: '<b>從迷惘與動搖回到信念</b>' },
}

const BODY: Record<Key, string[]> = {
  安心之光: [
    '點起安心之光，讓雜亂的思緒回歸最單純的狀態，讓一切紛亂慢慢沉澱。',
    '學習撫平內在的波動，帶領自己重新感受心底的寧靜與安定。',
  ],
  力行之光: [
    '點起力行之光，讓改變於此刻展開。',
    '願不再停留於想，而是化為前行的步伐。',
    '光引你向前，讓善意在行動中綻放。',
  ],
  覺察之光: [
    '點起覺察之光，洞見情緒的源頭。',
    '當心明則理明，當理明則慧生，',
    '引領自己走向更有智慧與善意的選擇。',
  ],
  圓融之光: [
    '點起圓融之光，如暖陽照進心中。',
    '柔軟不是退讓，而是和睦的起點。',
    '當學會放下與轉念，幸福便自在心中綻放。',
  ],
  喜悅之光: [
    '點起喜悅之光，重新感受生命的意義與溫度。',
    '在修練中體會快樂的本質，',
    '也明白——什麼才是值得我們永恆追尋的。',
  ],
  信念之光: [
    '點起信念之光，回歸赤子之心。',
    '懷著初心與善心前行，',
    '願力化作腳下最亮的光，指引你前路。',
  ],
}

const BLESSINGS: Record<Key, string[]> = {
  安心之光: ['心靜則光明，光明則不動於外境。', '安心不在他處，回到呼吸即是門。'],
  力行之光: ['善念一起，當下即行；行起之處，福自隨之。', '莫待明日，願在腳下。'],
  覺察之光: ['能見己心，萬事自明。', '見情不隨情，見念不逐念。'],
  圓融之光: ['以柔化剛，以慈化結。', '放下一分執著，便得一分自在。'],
  喜悅之光: ['歡喜是一種修行，從心生，向心回。', '常念感恩，福樂自增。'],
  信念之光: ['立願如山，行願如水；山定而水達。', '真心不退，光自前導。'],
}

type ResultPayload = {
  score: number[]
  bestIndex: number
  bestKey: Key
  answers: number[]
}

// 共用複製函式（簡單穩定版，永遠會跳 alert）
function copyToClipboard(text: string) {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('已複製連結，可以貼給朋友囉！')
  } catch (err) {
    console.error(err)
    alert('複製失敗，可以改用網址列手動複製。')
  }
}

export default function ResultPage() {
  const [data, setData] = useState<ResultPayload | null>(null)
  const [nickname, setNickname] = useState('') // 自己輸入的暱稱
  const [sharedName, setSharedName] = useState('') // 從分享連結來的暱稱
  const [showNameModal, setShowNameModal] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [fromShare, setFromShare] = useState(false)

  // 在 client 讀取：1) 分享連結中的結果 2) sessionStorage 中的結果
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const shared = url.searchParams.get('r')

      // 1) 先處理分享連結 (?r=...)
      if (shared) {
        const decoded = JSON.parse(atob(shared))
        if (Array.isArray(decoded?.score) && decoded.score.length === 6) {
          const bestIndex =
            typeof decoded.bestIndex === 'number'
              ? decoded.bestIndex
              : decoded.score.indexOf(Math.max(...decoded.score))

          const bestKey: Key =
            LABELS[bestIndex] ??
            (LABELS.includes(decoded.bestKey) ? decoded.bestKey : '安心之光')

          const payload: ResultPayload = {
            score: decoded.score,
            bestIndex,
            bestKey,
            answers: Array.isArray(decoded.answers) ? decoded.answers : [],
          }
          setData(payload)

          if (typeof decoded.name === 'string' && decoded.name.trim()) {
            setSharedName(decoded.name.trim())
          }
          setFromShare(true)
          return
        }
      }

      // 2) 沒有分享結果 → 用本機 sessionStorage
      const raw = window.sessionStorage.getItem('lod_result')
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.score) && parsed.score.length === 6) {
        const bestKey: Key = LABELS.includes(parsed.bestKey) ? parsed.bestKey : '安心之光'
        const payload: ResultPayload = {
          score: parsed.score,
          bestIndex:
            typeof parsed.bestIndex === 'number'
              ? parsed.bestIndex
              : parsed.score.indexOf(Math.max(...parsed.score)),
          bestKey,
          answers: Array.isArray(parsed.answers) ? parsed.answers : [],
        }
        setData(payload)

        // 讀取暱稱（可選）
        const storedName = window.sessionStorage.getItem('lod_name') || ''
        const trimmed = storedName.trim()
        if (trimmed) {
          setNickname(trimmed)
        } else {
          // 沒有暱稱 → 顯示暱稱輸入視窗
          setShowNameModal(true)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const safeScore = data?.score && data.score.length === 6 ? data.score : [0, 0, 0, 0, 0, 0]
  const safeBestKey: Key = data?.bestKey ?? '安心之光'

  const sorted = useMemo(
    () =>
      LABELS.map((k, i) => ({ key: k, value: safeScore[i] ?? 0 })).sort(
        (a, b) => b.value - a.value,
      ),
    [safeScore],
  )
  const top = sorted[0]
  const bestKey: Key = (top?.key ?? safeBestKey) as Key

  const icon = ICONS[bestKey]
  const bodyLines = BODY[bestKey]
  const blessings = BLESSINGS[bestKey]

  const chartData = useMemo(
    () => ({
      labels: LABELS,
      datasets: [
        {
          label: '你的六光分佈',
          data: safeScore,
          borderColor: '#334155',
          backgroundColor: 'rgba(51,65,85,0.15)',
          borderWidth: 2,
          fill: true,
        },
      ],
    }),
    [safeScore],
  )

  const chartOptions = useMemo(
    () => ({
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
    }),
    [],
  )

  // 分享測驗
  const handleCopyShareQuiz = () => {
    const url = `${BASE_URL}/`

    if (navigator.share) {
      navigator
        .share({
          title: 'Light of Dao 心燈測驗',
          text: '我做了一個「心之光」測驗，邀你一起點亮自己的心燈。',
          url,
        })
        .catch(() => {
          // 使用者取消就略過
        })
    } else {
      copyToClipboard(url)
    }
  }

  // 分享結果
  const handleCopyShareResult = () => {
    if (!data) return

    const nameForShare = nickname || sharedName || ''
    const payload: any = {
      score: data.score,
      bestKey: data.bestKey,
    }
    if (nameForShare) payload.name = nameForShare

    const encoded = btoa(JSON.stringify(payload))
    const url = `${BASE_URL}/result?r=${encodeURIComponent(encoded)}`

    if (navigator.share) {
      navigator
        .share({
          title: '我的心之光測驗結果',
          text: nameForShare
            ? `這是 ${nameForShare} 的心之光測驗結果，一起來點燈吧。`
            : '這是我的心之光測驗結果，一起來點燈吧。',
          url,
        })
        .catch(() => {})
    } else {
      copyToClipboard(url)
    }
  }

  return (
    <main className="relative min-h-screen px-6 py-10 sm:px-10 overflow-x-hidden">
      {/* 背景光暈（client-only） */}
      <BackgroundAura theme={data ? bestKey : undefined} />

      {/* 暱稱輸入視窗：只在自己看結果且尚未留名字時跳出 */}
      {showNameModal && !fromShare && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              想用什麼名字點亮這盞心燈？
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              這是好友在你分享的結果頁看到的名字（可留空略過）。
            </p>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="例如：Ruei、Yu..."
              value={draftName}
              onChange={e => setDraftName(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="rounded-xl px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                先略過
              </button>
              <button
                onClick={() => {
                  const name = draftName.trim()
                  if (name) {
                    setNickname(name)
                    window.sessionStorage.setItem('lod_name', name)
                  }
                  setShowNameModal(false)
                }}
                className="rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}

      {!data ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-2xl font-bold">找不到結果</h1>
          <p className="text-slate-600 mb-6">請先完成測驗，或確認分享連結是否正確。</p>
          <Link
            href="/"
            className="inline-block rounded-xl bg-slate-900 px-5 py-2 font-medium text-white"
          >
            回到測驗
          </Link>
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-4xl">
          {/* 如果是從分享連結來，而且有名字，就顯示這一行 */}
          {sharedName && (
            <p className="mb-2 text-center text-slate-500">
              這是 <span className="font-semibold">{sharedName}</span> 分享的測驗結果
            </p>
          )}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">你的心之光</h1>
            <p className="text-slate-600">以下是你的測驗結果與六光導引</p>
          </div>

          {/* 主結果卡 */}
          <section className="mx-auto max-w-4xl rounded-2xl bg-white/80 p-8 shadow-md ring-1 ring-black/5 backdrop-blur">
            {/* 手機：上下排；md 以上：左圖右文 */}
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-center">
              {/* icon */}
              <div className="flex-shrink-0">
                <Image src={icon.src} alt={bestKey} width={200} height={200} />
              </div>

              {/* 文字區：手機置中、桌機靠左 */}
              <div className="max-w-md text-center md:text-left">
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
                {blessings.map((b, i) => (
                  <p key={i}>• {b}</p>
                ))}
              </div>
            </div>
          </section>

          {/* 六光導引卡片 */}
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">六光導引</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LABELS.map(k => {
                const it = ICONS[k]
                return (
                  <div
                    key={k}
                    className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <Image src={it.src} alt={k} width={48} height={48} />
                      <div className="text-base text-slate-800" style={{ color: it.color }}>
                        {k}
                      </div>
                    </div>
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
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white"
            >
              再測一次
            </Link>

            <button
              onClick={handleCopyShareQuiz}
              className="rounded-xl px-5 py-2 ring-1 ring-black/10 text-slate-700"
            >
              分享測驗
            </button>

            <button
              onClick={handleCopyShareResult}
              className="rounded-xl px-5 py-2 ring-1 ring-black/10 text-slate-700"
            >
              分享我的結果
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
