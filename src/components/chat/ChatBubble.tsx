import { ReceiptCard } from '../receipts/ReceiptCard'
import type { ChatMessage } from '../../types'
import { formatDate } from '../../utils/formatters'
import { renderMessageContent } from '../../utils/renderMessageContent'

type ChatBubbleProps = {
  message: ChatMessage
}

const bubbleStyles: Record<ChatMessage['role'], string> = {
  user: 'ml-auto bg-gradient-to-br from-ink to-[#254137] text-white',
  assistant: 'mr-auto border border-ink/10 bg-white/90 text-ink',
  system: 'mx-auto border border-rose-700/15 bg-rose-50/80 text-rose-800',
}

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <article
      className={`max-w-[92%] rounded-[26px] p-4 shadow-[0_14px_34px_rgba(33,38,31,0.1)] md:max-w-[760px] ${bubbleStyles[message.role]}`}
    >
      <div className="flex justify-between gap-4 text-xs font-extrabold uppercase opacity-70">
        <span>
          {message.role === 'user'
            ? 'Usuario'
            : message.role === 'assistant'
              ? 'Agent'
              : 'Sistema'}
        </span>
        <time>{formatDate(message.timestamp)}</time>
      </div>
      {renderMessageContent(message.content)}
      {message.receipt ? <ReceiptCard receipt={message.receipt} /> : null}
    </article>
  )
}
