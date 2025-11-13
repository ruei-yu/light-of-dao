export type LightKey = "ANXIN" | "LIXING" | "DONGCHA" | "YUANRONG" | "XIYUE" | "FAXIN";

export const LIGHTS: Record<LightKey, {
  title: string;
  subtitle: string;
  insight: string;
  gradient: string;
  color: string;
}> = {
  ANXIN: {
    title: "安心之光",
    subtitle: "從焦慮與不安回到穩定",
    insight: "點起安心之光，讓雜亂的思緒回歸最單純的狀態，一切紛亂將慢慢沉澱。一起學習撫平內在的波動，帶領自己重新感受心底的寧靜與安定。",
    gradient: "bg-gradient-to-br from-sky-200 via-sky-100 to-white",
    color: "sky-600",
  },
  LIXING: {
    title: "力行之光",
    subtitle: "從倦怠與遲疑回到行動",
    insight: "點起力行之光，讓改變於此刻展開。願不再停留於想，而是化為前行的步伐。光引你向前，讓善意在行動中綻放。",
    gradient: "bg-gradient-to-br from-amber-200 via-orange-100 to-white",
    color: "amber-600",
  },
  DONGCHA: {
    title: "覺察之光",
    subtitle: "從困惑中看清因緣",
    insight: "點起覺察之光，洞見情緒的源頭。當心明則理明，當理明則慧生，引領自己走向更有智慧與善意的選擇。",
    gradient: "bg-gradient-to-br from-violet-200 via-purple-100 to-white",
    color: "violet-600",
  },
  YUANRONG: {
    title: "圓融之光",
    subtitle: "從執著與糾結走向包容",
    insight: "點起圓融之光，如暖陽照進心中。柔軟不是退讓，而是和睦的起點。當學會放下與轉念，幸福便自在心中綻放。",
    gradient: "bg-gradient-to-br from-emerald-200 via-teal-100 to-white",
    color: "emerald-600",
  },
  XIYUE: {
    title: "喜悅之光",
    subtitle: "從壓力與沈悶回到歡喜",
    insight: "點起喜悅之光，重新感受生命的意義與溫度。在修煉中體會快樂的本質，也明白——什麼才是值得我們永恆追尋的。
",
    gradient: "bg-gradient-to-br from-pink-200 via-rose-100 to-white",
    color: "pink-600",
  },
  FAXIN: {
    title: "信念之光",
    subtitle: "從封閉與失落喚醒願力",
    insight: "點起信念之光，回歸赤子之心。懷著初心與善心前行，愿力化作最閃亮的光，指引你前路。",
    gradient: "bg-gradient-to-br from-yellow-200 via-amber-100 to-white",
    color: "yellow-600",
  },
};
