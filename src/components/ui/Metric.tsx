type MetricProps = {
  label: string
  value: number | string
}

export function Metric({ label, value }: MetricProps) {
  return (
    <div className="min-w-0 rounded-[20px] border border-ink/10 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <span className="block text-xs font-black uppercase text-muted">{label}</span>
      <strong className="mt-2 block truncate font-display text-2xl font-black text-ink">
        {value}
      </strong>
    </div>
  )
}
