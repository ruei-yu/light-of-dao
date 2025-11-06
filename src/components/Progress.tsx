type Props = { current: number; total: number };
export default function Progress({ current, total }: Props) {
  const pct = Math.min(100, Math.max(0, Math.round((current / total) * 100)));
  return (
    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden" aria-label="progress">
      <div className="h-full bg-slate-900" style={{ width: `${pct}%` }} />
    </div>
  );
}
