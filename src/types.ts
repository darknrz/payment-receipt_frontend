export type ReceiptStatus = 'VALIDO' | 'INVALIDO' | 'PENDIENTE'

export type ReceiptType =
  | 'FACTURA'
  | 'BOLETA'
  | 'TICKET'
  | 'NOTA_CREDITO'
  | 'NOTA_DEBITO'
  | 'OTRO'

export type ApiResponse<T> = {
  success: boolean
  message?: string
  data?: T
  timestamp?: string
}

export type ChatResponse = {
  mensaje: string
  comprobanteId: string | null
  timestamp: string
}

export type ChatHistoryItem = {
  id: string
  rol: 'USER' | 'ASSISTANT'
  contenido: string
  createdAt: string
}

export type ReceiptItem = {
  id: string
  descripcion: string
  cantidad: number | null
  precioUnitario: number | null
  subtotal: number | null
}

export type Receipt = {
  id: string
  tipo: ReceiptType
  serie: string | null
  numero: string | null
  fechaEmision: string | null
  emisorRuc: string | null
  emisorRazonSocial: string | null
  emisorDireccion: string | null
  receptorRucDni: string | null
  receptorNombre: string | null
  subtotal: number | null
  igv: number | null
  total: number | null
  moneda: string | null
  estado: ReceiptStatus
  archivoNombre: string | null
  observaciones: string | null
  items: ReceiptItem[]
  createdAt: string
  updatedAt: string
}

export type Insight = {
  totalComprobantes: number
  comprobantesValidos: number
  comprobantesInvalidos: number
  comprobantesPendientes: number
  totalFacturado: number | null
  promedioTotal: number | null
  porTipo: Record<string, number>
  porMoneda: Record<string, number>
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  receipt?: Receipt
}
