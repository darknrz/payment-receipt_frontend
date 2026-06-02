import { InsightGrid } from './InsightGrid'
import { PANEL_SHELL, SOFT_ACTION } from '../../constants/ui'
import type { Insight } from '../../types'

type InsightsPanelProps = {
  insights: Insight | null
  onRefresh: () => void | Promise<void>
}

export function InsightsPanel({ insights, onRefresh }: InsightsPanelProps) {
  return (
    <div className={`${PANEL_SHELL} rounded-[28px] p-5`}>
      <div className="mb-4 flex items-center justify-between font-black text-ink">
        <span>Insights</span>
        <button
          className={`${SOFT_ACTION} px-3 py-2 text-xs`}
          onClick={() => void onRefresh()}
        >
          Actualizar
        </button>
      </div>
      <InsightGrid insights={insights} />
    </div>
  )
}
