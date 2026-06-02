import type { ChatMessage, Receipt } from '../types'

export function createMessage(
  role: ChatMessage['role'],
  content: string,
  receipt?: Receipt,
): ChatMessage {
  return {
    id: `${Date.now()}-${crypto.randomUUID()}`,
    role,
    content,
    timestamp: new Date().toISOString(),
    receipt,
  }
}
