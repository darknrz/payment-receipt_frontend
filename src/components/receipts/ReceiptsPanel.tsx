import { ReceiptListItem } from './ReceiptListItem'
import { ACTION_BASE, PANEL_SHELL } from '../../constants/ui'
import type { Receipt } from '../../types'

type ReceiptsPanelProps = {
  receipts: Receipt[]
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onSearch: () => void | Promise<void>
}

export function ReceiptsPanel({
  receipts,
  searchTerm,
  onSearchTermChange,
  onSearch,
}: ReceiptsPanelProps) {
  return (
    <div className={`${PANEL_SHELL} flex min-h-0 flex-col rounded-[28px] p-5`}>
      <div className="mb-4 flex items-center justify-between font-black text-ink">
        <span>Comprobantes</span>
        <span className="text-sm font-semibold text-muted">{receipts.length}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="min-w-0 flex-1 rounded-full border border-ink/10 bg-white/90 px-3.5 py-3 text-ink outline-none transition focus:border-teal-500/60 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]"
          aria-label="Buscar comprobantes"
          placeholder="Buscar por RUC, serie, emisor..."
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void onSearch()
            }
          }}
        />
        <button
          className={`${ACTION_BASE} bg-ink px-3.5 py-3 text-white`}
          onClick={() => void onSearch()}
        >
          Buscar
        </button>
      </div>
      <div className="mt-4 grid min-h-0 flex-1 gap-2.5 overflow-auto pr-1">
        {receipts.length === 0 ? (
          <p className="m-0 rounded-[20px] border border-dashed border-ink/25 p-5 text-center text-muted">
            Aun no hay comprobantes guardados.
          </p>
        ) : (
          receipts.map((receipt) => (
            <ReceiptListItem key={receipt.id} receipt={receipt} />
          ))
        )}
      </div>
    </div>
  )
}
