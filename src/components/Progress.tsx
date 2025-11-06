'use client';

type Props = {
  /** 目前是第幾題（從 0 開始） */
  current: number;
  /** 總題數 */
  total: number;
};

export default function Progress({ current, total }: Props) {
  // +1 是因為 current 0-based，UI 要顯示 1-based
  const done = Math.min(total, current + 1);
  const pct = Math.round((done / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>第 {done} / {total} 題</span>
        <span>{pct}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
        <div
          className="h-full bg-slate-900 transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
