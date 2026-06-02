import { useEffect, useRef, useState } from 'react'
import {
  analyzeReceiptFile,
  analyzeReceiptText,
  clearChatHistory,
  getChatHistory,
  getInsights,
  getReceipts,
  searchReceipts,
  sendChatMessage,
} from './api'
import { ChatPanel } from './components/chat/ChatPanel'
import { HeroPanel } from './components/dashboard/HeroPanel'
import { InsightsPanel } from './components/dashboard/InsightsPanel'
import { ReceiptsPanel } from './components/receipts/ReceiptsPanel'
import { WELCOME_MESSAGE } from './constants/ui'
import type { ChatMessage, Insight, Receipt } from './types'
import { getErrorMessage } from './utils/errors'
import { getReceiptTitle } from './utils/formatters'
import { createMessage } from './utils/messages'

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage('assistant', WELCOME_MESSAGE),
  ])
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [insights, setInsights] = useState<Insight | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    void refreshDashboard()
    void hydrateHistory()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function refreshDashboard() {
    try {
      const [nextReceipts, nextInsights] = await Promise.all([
        getReceipts(),
        getInsights(),
      ])
      setReceipts(nextReceipts)
      setInsights(nextInsights)
    } catch (caughtError) {
      setError(getErrorMessage(caughtError))
    }
  }

  async function hydrateHistory() {
    try {
      const history = await getChatHistory()
      if (history.length === 0) {
        return
      }

      setMessages((current) => [
        current[0],
        ...history.map((item) =>
          createMessage(
            item.rol === 'USER' ? 'user' : 'assistant',
            item.contenido,
          ),
        ),
      ])
    } catch {
      // El historial no bloquea el flujo principal del reto.
    }
  }

  async function handleSendMessage() {
    const message = input.trim()
    if (!message || isLoading) {
      return
    }

    setInput('')
    setError(null)
    setIsLoading(true)
    setMessages((current) => [...current, createMessage('user', message)])

    try {
      const response = await sendChatMessage(message)
      setMessages((current) => [
        ...current,
        createMessage('assistant', response.mensaje),
      ])
    } catch (caughtError) {
      showError(caughtError)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAnalyzeText() {
    const text = input.trim()
    if (!text || isLoading) {
      return
    }

    setInput('')
    setError(null)
    setIsLoading(true)
    setMessages((current) => [
      ...current,
      createMessage('user', 'Analizar comprobante pegado en el chat'),
    ])

    try {
      const receipt = await analyzeReceiptText(text)
      await refreshDashboard()
      setMessages((current) => [
        ...current,
        createMessage(
          'assistant',
          `Comprobante analizado y guardado: ${getReceiptTitle(receipt)}.`,
          receipt,
        ),
      ])
    } catch (caughtError) {
      showError(caughtError)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAnalyzeFile() {
    if (!selectedFile || isLoading) {
      return
    }

    setError(null)
    setIsLoading(true)
    setMessages((current) => [
      ...current,
      createMessage('user', `Analizar archivo: ${selectedFile.name}`),
    ])

    try {
      const receipt = await analyzeReceiptFile(selectedFile)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      await refreshDashboard()
      setMessages((current) => [
        ...current,
        createMessage(
          'assistant',
          `Archivo procesado y persistido: ${getReceiptTitle(receipt)}.`,
          receipt,
        ),
      ])
    } catch (caughtError) {
      showError(caughtError)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch() {
    const query = searchTerm.trim()
    if (!query) {
      await refreshDashboard()
      return
    }

    setError(null)
    try {
      setReceipts(await searchReceipts(query))
    } catch (caughtError) {
      showError(caughtError)
    }
  }

  function showError(caughtError: unknown) {
    const message = getErrorMessage(caughtError)
    setError(message)
    setMessages((current) => [...current, createMessage('system', message)])
  }

  async function handleClearChat() {
    setMessages([createMessage('assistant', WELCOME_MESSAGE)])
    setInput('')
    setError(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    try {
      await clearChatHistory()
    } catch (caughtError) {
      setError(`No se pudo limpiar el historial persistido: ${getErrorMessage(caughtError)}`)
    }
  }

  return (
    <main className="relative z-10 grid h-screen max-h-screen grid-rows-[auto_minmax(0,1fr)] overflow-auto px-2.5 py-2.5 text-ink sm:p-4 lg:p-8 xl:overflow-hidden">
      <HeroPanel insights={insights} />

      <section className="mx-auto grid min-h-0 w-full max-w-[1420px] grid-cols-1 gap-4 xl:h-full xl:grid-cols-[430px_minmax(0,1fr)] xl:overflow-hidden xl:gap-7">
        <aside
          className="grid min-h-0 min-w-0 gap-4 overflow-hidden [animation:rise-in_620ms_ease_80ms_both] xl:grid-rows-[auto_minmax(0,1fr)]"
          aria-label="Panel de datos"
        >
          <InsightsPanel insights={insights} onRefresh={refreshDashboard} />
          <ReceiptsPanel
            receipts={receipts}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </aside>

        <ChatPanel
          messages={messages}
          input={input}
          selectedFile={selectedFile}
          isLoading={isLoading}
          error={error}
          fileInputRef={fileInputRef}
          messagesEndRef={messagesEndRef}
          onInputChange={setInput}
          onFileSelect={setSelectedFile}
          onSendMessage={handleSendMessage}
          onAnalyzeText={handleAnalyzeText}
          onAnalyzeFile={handleAnalyzeFile}
          onClearChat={handleClearChat}
        />
      </section>
    </main>
  )
}

export default App
