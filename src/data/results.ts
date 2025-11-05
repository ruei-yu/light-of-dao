
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
    insight:
      "求道讓你學會讓心安住。當光照進不安，動亂化為靜水，你會發現，平靜本就在心中。",
    gradient: "bg-gradient-to-br from-sky-200 via-sky-100 to-white",
    color: "sky-600",
  },
  LIXING: {
    title: "力行之光",
    subtitle: "從倦怠與遲疑回到行動",
    insight:
      "求道是行的開始。它讓願不再只是想，而是一步步實現的力量；光會推著你前進，讓善化為行。",
    gradient: "bg-gradient-to-br from-amber-200 via-orange-100 to-white",
    color: "amber-600",
  },
  DONGCHA: {
    title: "洞察之光",
    subtitle: "從困惑中看清因緣",
    insight:
      "當你願意停下，智慧就浮現。求道幫你看清事物的緣起，讓疑惑化為理解，讓心更通透。",
    gradient: "bg-gradient-to-br from-violet-200 via-purple-100 to-white",
    color: "violet-600",
  },
  YUANRONG: {
    title: "圓融之光",
    subtitle: "從執著與糾結走向包容",
    insight:
      "求道教你不硬不爭而能圓滿。柔軟不是退讓，而是最深的力量；當你放下，世界也為你展開。",
    gradient: "bg-gradient-to-br from-emerald-200 via-teal-100 to-white",
    color: "emerald-600",
  },
  XIYUE: {
    title: "喜悅之光",
    subtitle: "從壓力與沈悶回到歡喜",
    insight:
      "光進入心中，笑容自然綻放。求道讓你重新感受生命的溫度，明白快樂也是修行。",
    gradient: "bg-gradient-to-br from-pink-200 via-rose-100 to-white",
    color: "pink-600",
  },
  FAXIN: {
    title: "發心之光",
    subtitle: "從封閉與失落喚醒願力",
    insight:
      "求道不是逃離，而是回到初心。當你願意為眾生，願力即是最亮的光；道會為你打開路。",
    gradient: "bg-gradient-to-br from-yellow-200 via-amber-100 to-white",
    color: "yellow-600",
  },
};
