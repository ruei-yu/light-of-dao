"use client";
type Props = { current: number; total: number };

export default function Progress({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
        <span>進度</span>
        <span>{current}/{total}（{pct}%）</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
