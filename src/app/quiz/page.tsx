'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import QUESTIONS from '@/data/questions'

// 六個面向：安心 / 力行 / 覺察 / 圓融 / 喜悅 / 信念
const DIMENSIONS = ['安心之光', '力行之光', '覺察之光', '圓融之光', '喜悅之光', '信念之光'] as const

// 小工具：洗牌
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function QuizPage() {
  const router = useRouter()

  // ✅ 初始化題目時，就先把每一題的 options 打散一次
  const [questions] = useState(() =>
    QUESTIONS.map((q) => ({
      ...q,
      options: shuffle(q.options),
    }))
  )

  const total = questions.length

  // 第幾題（0-based）
  const [idx, setIdx] = useState(0)
  // 各題選到哪個選項（0~5），未作答用 -1
  const [answers, setAnswers] = useState<number[]>(
    Array.from({ length: total }, () => -1)
  )

  const current = questions[idx]
  const percent = Math.round(((idx + 1) / total) * 100)
  const canNext = answers[idx] !== -1

  const selectOption = (optIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = optIndex
      return next
    })
  }

  const goPrev = () => {
    if (idx > 0) setIdx((v) => v - 1)
  }

  const finishAndGoResult = () => {
    // ✅ 計分改成「看選到的選項對應哪一盞光」
    const score = Array(DIMENSIONS.length).fill(0) as number[]

    answers.forEach((a, qIndex) => {
      if (a >= 0) {
        const opt = questions[qIndex].options[a]
        const key = opt.key
        const dimIndex = DIMENSIONS.indexOf(key as (typeof DIMENSIONS)[number])
        if (dimIndex >= 0) {
          score[dimIndex] += 1
        }
      }
    })

    // 找出最高分面向
    const bestIndex = score.indexOf(Math.max(...score))
    const bestKey = DIMENSIONS[bestIndex] ?? '安心之光'

    // 存起來給 /result 用
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'lod_result',
        JSON.stringify({ score, bestIndex, bestKey, answers })
      )
    }
    router.push('/result')
  }

  const goNext = () => {
    if (!canNext) return
    if (idx < total - 1) {
      setIdx((v) => v + 1)
    } else {
      // ✅ 最後一題按下去，直接進結果頁
      finishAndGoResult()
    }
  }

  // 簡單進度條
  const ProgressBar = useMemo(
    () => (
      <div className="w-full">
        <div className="mb-2 text-sm text-slate-600">{`第 ${idx + 1} / ${total} 題`}</div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-slate-900 transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    ),
    [idx, percent, total]
  )

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold leading-relaxed text-slate-900">
          心燈測驗・找到你此刻最需要的「心之光」
        </h1>

        {ProgressBar}

        <section className="mt-8 rounded-2xl bg-white/80 p-5 shadow-md ring-1 ring-black/5 backdrop-blur">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            {current.title}
          </h2>

          <div className="space-y-3">
            {current.options.map((opt, i) => {
              const selected = answers[idx] === i
              return (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={[
                    'w-full text-left rounded-xl px-4 py-3 transition',
                    'bg-white hover:-translate-y-[1px] hover:shadow-lg',
                    selected
                      ? 'ring-2 ring-slate-900/70 shadow-lg'
                      : 'ring-1 ring-black/5',
                  ].join(' ')}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={idx === 0}
              className="rounded-xl px-4 py-2 text-slate-700 ring-1 ring-black/10 disabled:opacity-40"
            >
              上一題
            </button>

            <button
              onClick={goNext}
              disabled={!canNext}
              className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white disabled:opacity-50"
            >
              {idx < total - 1 ? '下一題' : '看結果'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
