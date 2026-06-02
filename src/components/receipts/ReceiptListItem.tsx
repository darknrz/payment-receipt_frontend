import { StatusBadge } from '../ui/StatusBadge'
import type { Receipt } from '../../types'
import { formatMoney, getReceiptTitle } from '../../utils/formatters'

type ReceiptListItemProps = {
  receipt: Receipt
}

export function ReceiptListItem({ receipt }: ReceiptListItemProps) {
  return (
    <article className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] border border-ink/10 bg-white/65 p-3.5">
      <div className="min-w-0">
        <strong className="block truncate text-ink">{getReceiptTitle(receipt)}</strong>
        <span className="mt-1 block truncate text-sm text-muted">
          {receipt.emisorRazonSocial ?? 'Emisor no identificado'}
        </span>
      </div>
      <div className="grid justify-items-end gap-2">
        <StatusBadge status={receipt.estado} />
        <strong className="whitespace-nowrap text-ink">
          {formatMoney(receipt.total, receipt.moneda ?? 'PEN')}
        </strong>
      </div>
    </article>
  )
}
