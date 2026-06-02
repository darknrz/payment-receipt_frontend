import { STATUS_LABELS } from '../../constants/ui'
import type { ReceiptStatus } from '../../types'

type StatusBadgeProps = {
  status: ReceiptStatus
}

const statusStyles: Record<ReceiptStatus, string> = {
  VALIDO: 'bg-emerald-500/15 text-emerald-700',
  INVALIDO: 'bg-rose-500/15 text-rose-700',
  PENDIENTE: 'bg-amber-400/20 text-amber-700',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black uppercase ${statusStyles[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
