import type { LightKey } from "@/data/results";

export type Choice = { label: string; to: LightKey };
export type Question = {
  title: string
  options: string[]
}

export const QUESTIONS: Question[] = [
  { id: 1, text: "最近你最常感受到的狀態是？", choices: [
    { label: "常莫名焦慮、睡不好", to: "ANXIN" },
    { label: "明知道該努力，卻提不起勁", to: "LIXING" },
    { label: "一直在想我到底在追求什麼", to: "DONGCHA" },
    { label: "與人互動總感覺卡卡的", to: "YUANRONG" },
    { label: "一切都變得沒有樂趣", to: "XIYUE" },
    { label: "不太知道自己要往哪走", to: "FAXIN" },
  ]},
  { id: 2, text: "當你面臨壓力時，你最想要的是？", choices: [
    { label: "讓心能靜下來", to: "ANXIN" },
    { label: "一股推我前進的力量", to: "LIXING" },
    { label: "有人能幫我理清頭緒", to: "DONGCHA" },
    { label: "與他人不再衝突", to: "YUANRONG" },
    { label: "一點快樂的事", to: "XIYUE" },
    { label: "一個能重新點燃信念的契機", to: "FAXIN" },
  ]},
  { id: 3, text: "當你做決定時，最常出現的想法是？", choices: [
    { label: "好怕做錯", to: "ANXIN" },
    { label: "乾脆直接去做", to: "LIXING" },
    { label: "先想清楚原因", to: "DONGCHA" },
    { label: "要顧及大家的感受", to: "YUANRONG" },
    { label: "想讓自己開心就好", to: "XIYUE" },
    { label: "希望更接近理想的自己", to: "FAXIN" },
  ]},
  { id: 4, text: "最近什麼讓你最放不下？", choices: [
    { label: "對未來的擔心", to: "ANXIN" },
    { label: "事情一直沒進展", to: "LIXING" },
    { label: "某段關係或經歷的意義", to: "DONGCHA" },
    { label: "別人對我的看法", to: "YUANRONG" },
    { label: "生活缺乏新鮮感", to: "XIYUE" },
    { label: "理想好像被遺忘了", to: "FAXIN" },
  ]},
  { id: 5, text: "如果有人想幫助你，你最希望他給的是？", choices: [
    { label: "安撫與傾聽", to: "ANXIN" },
    { label: "行動上的支持", to: "LIXING" },
    { label: "明確的指引", to: "DONGCHA" },
    { label: "包容與理解", to: "YUANRONG" },
    { label: "鼓勵與笑容", to: "XIYUE" },
    { label: "靈性的啟發或提醒", to: "FAXIN" },
  ]},
  { id: 6, text: "在你心裡，『平靜』代表什麼？", choices: [
    { label: "不再被情緒牽著走", to: "ANXIN" },
    { label: "能自在地完成想做的事", to: "LIXING" },
    { label: "理解生命的真相", to: "DONGCHA" },
    { label: "放下糾結、與人和諧", to: "YUANRONG" },
    { label: "保有開心與感恩", to: "XIYUE" },
    { label: "內心充滿願與信", to: "FAXIN" },
  ]},
  { id: 7, text: "你覺得自己最需要被療癒的部分是？", choices: [
    { label: "焦慮與不安", to: "ANXIN" },
    { label: "懶散與無力", to: "LIXING" },
    { label: "困惑與迷茫", to: "DONGCHA" },
    { label: "人際的摩擦", to: "YUANRONG" },
    { label: "生活的沈悶", to: "XIYUE" },
    { label: "信念的搖動", to: "FAXIN" },
  ]},
  { id: 8, text: "如果現在有一盞光照進你心裡，你希望它？", choices: [
    { label: "讓我放鬆", to: "ANXIN" },
    { label: "給我勇氣", to: "LIXING" },
    { label: "指引我理解", to: "DONGCHA" },
    { label: "讓我原諒", to: "YUANRONG" },
    { label: "讓我微笑", to: "XIYUE" },
    { label: "讓我重新發願", to: "FAXIN" },
  ]},
  { id: 9, text: "當你遇到難題時，你的第一反應？", choices: [
    { label: "想先逃避一下", to: "ANXIN" },
    { label: "馬上去解決", to: "LIXING" },
    { label: "找出問題的根本", to: "DONGCHA" },
    { label: "和他人好好溝通", to: "YUANRONG" },
    { label: "先轉個念", to: "XIYUE" },
    { label: "想從中學到什麼", to: "FAXIN" },
  ]},
  { id: 10, text: "當你看到別人的光芒時，你會？", choices: [
    { label: "羨慕並焦慮", to: "ANXIN" },
    { label: "被激勵、想努力", to: "LIXING" },
    { label: "想了解他如何做到", to: "DONGCHA" },
    { label: "為他開心", to: "YUANRONG" },
    { label: "感覺也被照亮", to: "XIYUE" },
    { label: "想把光分享給更多人", to: "FAXIN" },
  ]},
  { id: 11, text: "你覺得自己最大的挑覺是？", choices: [
    { label: "太容易緊張", to: "ANXIN" },
    { label: "行動力不足", to: "LIXING" },
    { label: "想太多", to: "DONGCHA" },
    { label: "放不下別人", to: "YUANRONG" },
    { label: "容易情緒化", to: "XIYUE" },
    { label: "害怕失去目標", to: "FAXIN" },
  ]},
  { id: 12, text: "你最嚮往哪種狀態？", choices: [
    { label: "平靜安穩", to: "ANXIN" },
    { label: "積極堅定", to: "LIXING" },
    { label: "看清真相", to: "DONGCHA" },
    { label: "關係和諧", to: "YUANRONG" },
    { label: "快樂自在", to: "XIYUE" },
    { label: "有使命感", to: "FAXIN" },
  ]},
  { id: 13, text: "當你回望人生，你希望自己學會什麼？", choices: [
    { label: "面對一切而不亂", to: "ANXIN" },
    { label: "即使艱難也不退", to: "LIXING" },
    { label: "看透無常仍能微笑", to: "DONGCHA" },
    { label: "愛人也愛己", to: "YUANRONG" },
    { label: "在平凡中保持快樂", to: "XIYUE" },
    { label: "以願心成就圓滿", to: "FAXIN" },
  ]},
  { id: 14, text: "你覺得『求道』最可能帶給你的，是？", choices: [
    { label: "平靜", to: "ANXIN" },
    { label: "力量", to: "LIXING" },
    { label: "智慧", to: "DONGCHA" },
    { label: "和諧", to: "YUANRONG" },
    { label: "喜悅", to: "XIYUE" },
    { label: "信念", to: "FAXIN" },
  ]},
  { id: 15, text: "若現在的你能收到一句啟示，你希望它說：", choices: [
    { label: "放下焦慮，你已被光照顧", to: "ANXIN" },
    { label: "別怕前路長，走下去就會開花", to: "LIXING" },
    { label: "看懂因緣，才有自在", to: "DONGCHA" },
    { label: "以柔化剛，一切皆成全", to: "YUANRONG" },
    { label: "微笑吧，你的光正被喚醒", to: "XIYUE" },
    { label: "心有願，路自明", to: "FAXIN" },
  ]},
]

export default QUESTIONS