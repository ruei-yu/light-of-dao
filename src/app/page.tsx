
"use client";
import { useMemo, useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { LIGHTS, type LightKey } from "@/data/results";
import Progress from "@/components/Progress";

const ORDER: LightKey[] = ["ANXIN", "LIXING", "DONGCHA", "YUANRONG", "XIYUE", "FAXIN"];

type Score = Record<LightKey, number>;
const zeroScore: Score = Object.fromEntries(ORDER.map(k => [k, 0])) as Score;

export default function Page() {
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<Score>({ ...zeroScore });

  const finished = step >= total;
  const progress = (Math.min(step, total) / total) * 100;

  const bestKey: LightKey = useMemo(() => {
    return ORDER.reduce((acc, k) => (score[k] > score[acc] ? k : acc), ORDER[0]);
  }, [score]);

  const onChoose = (to: LightKey) => {
    setScore((s) => ({ ...s, [to]: s[to] + 1 }));
    setStep((n) => n + 1);
  };

  const reset = () => {
    setStep(0);
    setScore({ ...zeroScore });
  };

  const bgClass = finished ? LIGHTS[bestKey].gradient : "bg-gradient-to-br from-zinc-100 via-white to-white";

  return (
    <main className={`relative min-h-dvh ${bgClass}`}>
      <div className="absolute inset-0 -z-10 [background-image:radial-gradient(50%_50%_at_50%_0%,rgba(0,0,0,0.06),rgba(0,0,0,0))]" />

      <div className="mx-auto max-w-2xl px-5 py-10">
        <header className="text-center mb-7">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">心燈測驗 · 找回內在的明</h1>
          <p className="mt-2 text-sm opacity-80">透過 15 題，照見此刻的心境，看看求道能帶給你什麼幫助。</p>
        </header>

        {!finished ? (
          <section className="rounded-2xl bg-white/70 backdrop-blur p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <Progress value={progress} />
              <div className="text-xs opacity-70 whitespace-nowrap">第 {step + 1} / {total}</div>
            </div>

            <h2 className="text-xl font-medium mb-6 leading-relaxed">{QUESTIONS[step].text}</h2>

            <div className="grid gap-3">
              {QUESTIONS[step].choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => onChoose(c.to)}
                  className="rounded-xl border border-black/10 bg-white/90 hover:bg-white transition p-3 text-left"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-2xl bg-white/75 backdrop-blur p-6 shadow-lg">
            <h2 className="text-2xl font-semibold">{LIGHTS[bestKey].title}</h2>
            <p className="text-sm opacity-80 mt-1">{LIGHTS[bestKey].subtitle}</p>
            <p className="mt-4 leading-relaxed">{LIGHTS[bestKey].insight}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="rounded-xl px-4 py-2 bg-black text-white"
              >
                重新測驗
              </button>
              <a
                className="rounded-xl px-4 py-2 border border-black/10 bg-white/80"
                href="#more"
              >
                什麼是「求道點心燈」？
              </a>
            </div>

            <div className="mt-8 text-sm">
              <div className="opacity-70 mb-2">你的作答分佈</div>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ORDER.map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full bg-black`} />
                    <span className="opacity-80">{LIGHTS[k].title}：{score[k]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="mt-8 text-center text-xs opacity-70">
          © {new Date().getFullYear()} 心燈 • All rights reserved.
        </footer>
      </div>
    </main>
  );
}
