import type {
  ApiResponse,
  ChatHistoryItem,
  ChatResponse,
  Insight,
  Receipt,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

async function readJson<T>(response: Response): Promise<ApiResponse<T>> {
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null

  if (!response.ok || body?.success === false) {
    throw new Error(body?.message ?? `Error HTTP ${response.status}`)
  }

  if (!body) {
    throw new Error('El backend no devolvio una respuesta JSON valida')
  }

  return body
}

function requireData<T>(response: ApiResponse<T>): T {
  if (response.data === undefined) {
    throw new Error(response.message ?? 'Respuesta sin datos')
  }

  return response.data
}

export async function sendChatMessage(mensaje: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat/mensaje`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje }),
  })

  return requireData(await readJson<ChatResponse>(response))
}

export async function analyzeReceiptText(texto: string): Promise<Receipt> {
  const response = await fetch(`${API_BASE_URL}/api/chat/analizar-texto`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: texto,
  })

  return requireData(await readJson<Receipt>(response))
}

export async function analyzeReceiptFile(file: File): Promise<Receipt> {
  const formData = new FormData()
  formData.append('archivo', file)

  const response = await fetch(`${API_BASE_URL}/api/chat/analizar`, {
    method: 'POST',
    body: formData,
  })

  return requireData(await readJson<Receipt>(response))
}

export async function getReceipts(): Promise<Receipt[]> {
  const response = await fetch(`${API_BASE_URL}/api/comprobantes`)

  return requireData(await readJson<Receipt[]>(response))
}

export async function searchReceipts(query: string): Promise<Receipt[]> {
  const params = new URLSearchParams({ q: query })
  const response = await fetch(`${API_BASE_URL}/api/comprobantes/buscar?${params}`)

  return requireData(await readJson<Receipt[]>(response))
}

export async function getInsights(): Promise<Insight> {
  const response = await fetch(`${API_BASE_URL}/api/comprobantes/insights`)

  return requireData(await readJson<Insight>(response))
}

export async function getChatHistory(): Promise<ChatHistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/chat/historial`)

  return requireData(await readJson<ChatHistoryItem[]>(response))
}

export async function clearChatHistory(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/chat/historial`, {
    method: 'DELETE',
  })

  await readJson<void>(response)
}
