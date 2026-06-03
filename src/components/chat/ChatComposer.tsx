import type { RefObject } from 'react'
import { ACTION_BASE, SOFT_ACTION } from '../../constants/ui'

type ChatComposerProps = {
  input: string
  selectedFile: File | null
  isLoading: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onInputChange: (value: string) => void
  onFileSelect: (file: File | null) => void
  onSendMessage: () => void | Promise<void>
  onAnalyzeText: () => void | Promise<void>
  onAnalyzeFile: () => void | Promise<void>
  onClearChat: () => void | Promise<void>
}

export function ChatComposer({
  input,
  selectedFile,
  isLoading,
  fileInputRef,
  onInputChange,
  onFileSelect,
  onSendMessage,
  onAnalyzeText,
  onAnalyzeFile,
  onClearChat,
}: ChatComposerProps) {
  return (
    <div className="shrink-0 border-t border-ink/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(232,244,239,0.78))] p-4 shadow-[0_-10px_30px_rgba(33,38,31,0.06)]">
      <textarea
        className="min-h-24 w-full resize-y rounded-[24px] border border-ink/10 bg-white/90 px-4 py-4 text-ink outline-none transition focus:border-teal-500/60 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]"
        placeholder="Pregunta algo o pega el texto de un comprobante..."
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            void onSendMessage()
          }
        }}
      />

      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <label
          className={`${SOFT_ACTION} flex w-full cursor-pointer items-center justify-center overflow-hidden px-4 py-3 text-sm sm:w-auto sm:max-w-[260px]`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.txt,.csv,image/*"
            onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
          />
          <span className="truncate">
            {selectedFile ? selectedFile.name : 'Adjuntar archivo'}
          </span>
        </label>

        <button
          className={`${SOFT_ACTION} w-full px-4 py-3 text-sm sm:w-auto`}
          disabled={!input.trim() || isLoading}
          onClick={() => void onAnalyzeText()}
        >
          Analizar texto
        </button>

        <button
          className={`${SOFT_ACTION} w-full px-4 py-3 text-sm sm:w-auto`}
          disabled={!selectedFile || isLoading}
          onClick={() => void onAnalyzeFile()}
        >
          Analizar archivo
        </button>

        <button
          className={`${SOFT_ACTION} w-full px-4 py-3 text-sm sm:w-auto`}
          disabled={isLoading}
          onClick={() => void onClearChat()}
        >
          Limpiar chat
        </button>

        <button
          className={`${ACTION_BASE} w-full bg-gradient-to-br from-teal-500 to-teal-700 px-4 py-3 text-sm text-white shadow-[0_16px_30px_rgba(15,118,110,0.22)] sm:ml-auto sm:w-auto`}
          disabled={!input.trim() || isLoading}
          onClick={() => void onSendMessage()}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
