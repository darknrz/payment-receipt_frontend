import { Metric } from '../ui/Metric'
import type { Insight } from '../../types'
import { formatMoney } from '../../utils/formatters'

type HeroPanelProps = {
  insights: Insight | null
}

export function HeroPanel({ insights }: HeroPanelProps) {
  return (
    <section className="mx-auto mb-4 grid max-w-[1420px] grid-cols-1 items-end gap-4 rounded-[24px] border border-ink/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(232,244,239,0.84))] p-4 shadow-[0_24px_70px_rgba(33,38,31,0.13)] [animation:rise-in_540ms_ease_both] sm:p-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:rounded-[30px] lg:p-6">
      <div>
        <h1 className="max-w-[880px] font-display text-3xl font-black leading-[0.98] text-ink sm:text-4xl lg:text-6xl">
          Chat operativo para analizar comprobantes de pago
        </h1>
      </div>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        aria-label="Resumen de comprobantes"
      >
        <Metric label="Comprobantes" value={insights?.totalComprobantes ?? 0} />
        <Metric label="Validos" value={insights?.comprobantesValidos ?? 0} />
        <Metric
          label="Total"
          value={formatMoney(insights?.totalFacturado, 'PEN')}
        />
      </div>
    </section>
  )
}
