import type { ReactNode } from 'react'

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'unordered'; items: string[] }
  | { type: 'spacer' }

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={`${index}-${part}`}>{part.slice(2, -2)}</strong>
    }

    return <span key={`${index}-${part}`}>{part}</span>
  })
}

function isOrderedItem(line: string) {
  return /^\d+\.\s+/.test(line)
}

function isUnorderedItem(line: string) {
  return /^[-*]\s+/.test(line)
}

function normalizeItem(line: string) {
  return line.replace(/^\d+\.\s+|^[-*]\s+/, '')
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let currentParagraph: string[] = []
  let currentList: { type: 'ordered' | 'unordered'; items: string[] } | null =
    null

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({ type: 'paragraph', lines: currentParagraph })
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList)
    }
    currentList = null
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'spacer' })
      continue
    }

    if (isOrderedItem(trimmed)) {
      flushParagraph()
      if (currentList?.type !== 'ordered') {
        flushList()
        currentList = { type: 'ordered', items: [] }
      }
      currentList.items.push(normalizeItem(trimmed))
      continue
    }

    if (isUnorderedItem(trimmed)) {
      flushParagraph()
      if (currentList?.type !== 'unordered') {
        flushList()
        currentList = { type: 'unordered', items: [] }
      }
      currentList.items.push(normalizeItem(trimmed))
      continue
    }

    flushList()
    currentParagraph.push(line)
  }

  flushParagraph()
  flushList()

  return blocks
}

export function renderMessageContent(content: string): ReactNode {
  const blocks = parseBlocks(content)

  return (
    <div className="mt-2 space-y-3 text-[15px] leading-6">
      {blocks.map((block, index) => {
        if (block.type === 'spacer') {
          return <div key={index} className="h-1.5" />
        }

        if (block.type === 'paragraph') {
          return (
            <p key={index} className="whitespace-pre-wrap">
              {renderInline(block.lines.join('\n'))}
            </p>
          )
        }

        const ListTag = block.type === 'ordered' ? 'ol' : 'ul'

        return (
          <ListTag
            key={index}
            className={`space-y-2 pl-5 ${block.type === 'ordered' ? 'list-decimal' : 'list-disc'}`}
          >
            {block.items.map((item, itemIndex) => (
              <li key={`${index}-${itemIndex}`} className="whitespace-pre-wrap">
                {renderInline(item)}
              </li>
            ))}
          </ListTag>
        )
      })}
    </div>
  )
}
