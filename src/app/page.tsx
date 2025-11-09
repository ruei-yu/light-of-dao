'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Page() {
  const lines = [
    '每個人心裡都有一盞不滅的燈，',
    '在喜悅、困惑、平靜與成長之間閃爍，',
    '光的顏色也隨著心境而悄然變化。',
    '或許，有一道色彩的光芒，正等待被點亮。',
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-800">
      {/* 封面區：底層柔彩由 globals.css 的 .hero-section::before */}
      <section className="hero-section relative overflow-hidden flex items-center justify-center px-6 py-16 sm:py-28 text-center">
        {/* 六色亮點閃爍層（請已在 globals.css 貼上 .hero-glow-layer 與 .glow-*） */}
        <div className="hero-glow-layer" aria-hidden="true">
          <div className="glow glow--pink" />
          <div className="glow glow--orange" />
          <div className="glow glow--yellow" />
          <div className="glow glow--green" />
          <div className="glow glow--blue" />
          <div className="glow glow--purple" />
        </div>

        {/* 中央白色呼吸光 */}
        <div className="hero-glow" aria-hidden="true" />

        {/* 內容層 */}
        <motion.div
          className="container-narrow relative z-10 mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* 小標 */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm ring-1 ring-black/5 backdrop-blur"
          >
            <span>✨ Light of Dao</span>
            <span className="text-slate-500">心燈小測驗</span>
          </motion.div>

          {/* 標題 */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-snug"
          >
            找到你此刻最需要的
            <span className="block mt-1 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              「心光」
            </span>
          </motion.h1>

          {/* 導入文字：逐行淡入 */}
          <motion.div variants={fadeUp} className="mt-6 text-slate-600 leading-8">
            <motion.div variants={container} className="space-y-1">
              {lines.map((line, i) => (
                <motion.span key={i} variants={fadeUp} className="block">
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* 說明 */}
          <motion.p variants={fadeUp} className="mt-6 text-slate-600 leading-7">
            現在，讓我們透過 15 道題直覺選擇，<br />
            一起找出——此刻你最需要的那道光。<br />
            測驗結束後將呈現你的「六光分佈」雷達圖與引導文字。
          </motion.p>

          {/* 按鈕 */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link href="/quiz" className="rounded-xl bg-slate-900 px-6 py-3 text-white font-medium hover:bg-slate-800 transition">
                立即開始測驗
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <a href="#about" className="rounded-xl px-6 py-3 ring-1 ring-black/10 text-slate-700 hover:bg-white/60 transition">
                了解內容
              </a>
            </motion.div>
          </motion.div>

          {/* 卡片 */}
          <section id="about" className="mt-16 grid gap-4 sm:grid-cols-3 text-left">
            {[
              { title: '🌿 溫和引導', text: '問題設計以日常情境出發，協助你輕柔覺察，不做對錯評分。' },
              { title: '🌞 六光分佈', text: '安心、力行、洞察、圓融、喜悅、信念——以雷達圖呈現心性平衡。' },
              { title: '💫 行動建議', text: '完成後提供溫暖的文字與方向建議，幫助你穩穩前行。' }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -2 }} className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
                <div className="text-sm font-semibold text-slate-700">{card.title}</div>
                <p className="mt-2 text-sm text-slate-600">{card.text}</p>
              </motion.div>
            ))}
          </section>
        </motion.div>
      </section>
    </main>
  )
}
