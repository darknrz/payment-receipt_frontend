import { Metric } from '../ui/Metric'
import type { Insight } from '../../types'
import { formatMoney } from '../../utils/formatters'

type InsightGridProps = {
  insights: Insight | null
}

export function InsightGrid({ insights }: InsightGridProps) {
  const items: Array<[string, number | string]> = [
    ['Pendientes', insights?.comprobantesPendientes ?? 0],
    ['Invalidos', insights?.comprobantesInvalidos ?? 0],
    ['Promedio', formatMoney(insights?.promedioTotal, 'PEN')],
    ['Monedas', Object.keys(insights?.porMoneda ?? {}).join(', ') || '--'],
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
      {items.map(([label, value]) => (
        <Metric key={label} label={label} value={value} />
      ))}
    </div>
  )
}
