import { QUICK_PROMPTS, SOFT_ACTION } from '../../constants/ui'

type QuickPromptsProps = {
  onSelectPrompt: (prompt: string) => void
}

export function QuickPrompts({ onSelectPrompt }: QuickPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-5 pb-1.5 pt-4">
      {QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          className={`${SOFT_ACTION} px-3 py-2 text-sm text-muted`}
          onClick={() => onSelectPrompt(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
