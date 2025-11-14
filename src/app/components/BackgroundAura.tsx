'use client'

type AuraProps = {
  theme?: string
}

// 六光對應顏色（主色 + 補色光暈）
const colorMap: Record<string, { main: string; accent: string }> = {
  安心之光: { main: '#9ecaff', accent: '#e4f1ff' }, // 藍
  力行之光: { main: '#9be2c5', accent: '#d8fff0' }, // 綠
  覺察之光: { main: '#bba4ff', accent: '#f0eaff' }, // 紫
  圓融之光: { main: '#fbbf77', accent: '#fff3e0' }, // 橘
  喜悅之光: { main: '#fef4c1', accent: '#fffbe0' }, // 黃
  信念之光: { main: '#ffc0cb', accent: '#fff0f3' }, // 粉
}

export default function BackgroundAura({ theme }: AuraProps) {
  // 沒有或找不到 theme 時，用很淡的白色當底
  const palette = (theme && colorMap[theme]) || {
    main: '#f1f5f9',
    accent: '#ffffff',
  }

  const { main, accent } = palette

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none transition-all duration-1000 ease-out"
      style={{
        backgroundImage: [
          // 柔和主色鋪滿整頁（基底）
          `linear-gradient(180deg, ${accent} 0%, ${main} 60%, ${accent} 100%)`,
          // 四角外擴的光暈層
          `radial-gradient(120vw 100vh at -10% -10%, ${main}90 0%, transparent 70%)`,
          `radial-gradient(120vw 100vh at 110% -10%, ${main}90 0%, transparent 70%)`,
          `radial-gradient(120vw 100vh at -10% 110%, ${main}90 0%, transparent 70%)`,
          `radial-gradient(120vw 100vh at 110% 110%, ${main}90 0%, transparent 70%)`,
          // 中央白光柔化
          `radial-gradient(70vw 70vh at 50% 50%, rgba(255,255,255,0.75) 0%, transparent 70%)`,
        ].join(','),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(60px) saturate(1.2) brightness(1.05)',
      }}
    />
  )
}
