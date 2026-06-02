import { StatusBadge } from '../ui/StatusBadge'
import type { Receipt } from '../../types'
import { formatDate, formatMoney, getReceiptTitle } from '../../utils/formatters'

type ReceiptCardProps = {
  receipt: Receipt
}

export function ReceiptCard({ receipt }: ReceiptCardProps) {
  const fields = [
    ['Emisor', receipt.emisorRazonSocial ?? '--'],
    ['RUC', receipt.emisorRuc ?? '--'],
    ['Fecha', formatDate(receipt.fechaEmision)],
    ['Subtotal', formatMoney(receipt.subtotal, receipt.moneda ?? 'PEN')],
    ['IGV', formatMoney(receipt.igv, receipt.moneda ?? 'PEN')],
    ['Total', formatMoney(receipt.total, receipt.moneda ?? 'PEN')],
  ]

  return (
    <div className="mt-3.5 rounded-[22px] border border-ink/10 bg-gradient-to-b from-[#f7faf5] to-white/90 p-4">
      <div className="flex items-center justify-between gap-3">
        <strong className="truncate">{getReceiptTitle(receipt)}</strong>
        <StatusBadge status={receipt.estado} />
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {fields.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-ink/5 p-3">
            <dt className="text-xs font-extrabold uppercase text-muted">{label}</dt>
            <dd className="mt-1 truncate font-extrabold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {receipt.observaciones ? (
        <p className="mt-3 text-sm text-muted">{receipt.observaciones}</p>
      ) : null}
      {receipt.items.length > 0 ? (
        <div className="mt-3 grid gap-2">
          {receipt.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-3 border-t border-ink/10 pt-2"
            >
              <span className="truncate">{item.descripcion}</span>
              <strong className="whitespace-nowrap">
                {formatMoney(item.subtotal, receipt.moneda ?? 'PEN')}
              </strong>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
