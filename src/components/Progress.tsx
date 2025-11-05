
export default function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-black/60 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
