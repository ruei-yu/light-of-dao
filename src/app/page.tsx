// src/app/page.tsx
'use client';

export const prerender = false;         // 👈 不要在 build 時預先產生
// 或用：export const dynamic = 'force-dynamic';

import { useState } from "react";
import Progress from "@/components/Progress";
import { QUESTIONS } from "@/data/questions";

export default function QuizPage() {
  // 防呆：確保題庫陣列存在
  const LIST = Array.isArray(QUESTIONS) ? QUESTIONS : [];
  if (LIST.length === 0) {
    return (
      <main className="container-narrow py-8">
        <h1 className="text-2xl font-bold">Light of Dao</h1>
        <p className="mt-4 text-slate-600">題庫尚未載入或格式不正確。</p>
      </main>
    );
  }

  const total = LIST.length;
  const [index, setIndex] = useState(0);
  const q = LIST[index] ?? { title: "", options: [] };

  return (
    <main className="container-narrow py-8">
      <h1 className="mb-4 text-3xl font-bold">心燈測驗・找回內在的明</h1>
      <Progress current={index} total={total} />

      <h2 className="mt-6 mb-4 text-xl">{q.title ?? `第 ${index + 1} 題`}</h2>

      <div className="space-y-3">
        {(q.options ?? []).map((opt: any, i: number) => (
          <button
            key={i}
            className="option w-full"
            onClick={() => setIndex((n) => Math.min(total - 1, n + 1))}
          >
            {typeof opt === "string" ? opt : opt.text}
          </button>
        ))}
      </div>
    </main>
  );
}
