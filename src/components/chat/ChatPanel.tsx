import type { RefObject } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatComposer } from './ChatComposer'
import { QuickPrompts } from './QuickPrompts'
import { PANEL_SHELL, SOFT_ACTION } from '../../constants/ui'
import type { ChatMessage } from '../../types'
import { ErrorBanner } from '../ui/ErrorBanner'
import { LoadingDots } from '../ui/LoadingDots'

type ChatPanelProps = {
  messages: ChatMessage[]
  input: string
  selectedFile: File | null
  isLoading: boolean
  error: string | null
  fileInputRef: RefObject<HTMLInputElement | null>
  messagesEndRef: RefObject<HTMLDivElement | null>
  onInputChange: (value: string) => void
  onFileSelect: (file: File | null) => void
  onSendMessage: () => void | Promise<void>
  onAnalyzeText: () => void | Promise<void>
  onAnalyzeFile: () => void | Promise<void>
  onClearChat: () => void | Promise<void>
}

export function ChatPanel({
  messages,
  input,
  selectedFile,
  isLoading,
  error,
  fileInputRef,
  messagesEndRef,
  onInputChange,
  onFileSelect,
  onSendMessage,
  onAnalyzeText,
  onAnalyzeFile,
  onClearChat,
}: ChatPanelProps) {
  return (
    <section
      className={`${PANEL_SHELL} grid h-full min-h-0 min-w-0 grid-rows-[auto_auto_auto_minmax(0,1fr)_auto] overflow-hidden rounded-[28px] [animation:rise-in_620ms_ease_160ms_both] lg:rounded-[34px]`}
      aria-label="Chat de comprobantes"
    >
      <div className="flex flex-col gap-2 border-b border-ink/10 px-5 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 font-bold text-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-500 shadow-[0_0_0_8px_rgba(20,184,166,0.14)]"></span>
          <strong>Orchestrator conectado</strong>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span>Backend: localhost:8080</span>
          <button
            className={`${SOFT_ACTION} px-3 py-2 text-xs text-ink`}
            disabled={isLoading}
            onClick={() => void onClearChat()}
          >
            Limpiar chat
          </button>
        </div>
      </div>

      {error ? <ErrorBanner message={error} /> : null}

      <QuickPrompts onSelectPrompt={onInputChange} />

      <div className="flex min-h-0 flex-col gap-3.5 overflow-auto px-5 py-5">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isLoading ? <LoadingDots /> : null}
        <div ref={messagesEndRef} />
      </div>

      <ChatComposer
        input={input}
        selectedFile={selectedFile}
        isLoading={isLoading}
        fileInputRef={fileInputRef}
        onInputChange={onInputChange}
        onFileSelect={onFileSelect}
        onSendMessage={onSendMessage}
        onAnalyzeText={onAnalyzeText}
        onAnalyzeFile={onAnalyzeFile}
      />
    </section>
  )
}
