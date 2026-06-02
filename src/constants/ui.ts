import type { ReceiptStatus } from '../types'

export const QUICK_PROMPTS = [
  'Dame un resumen de comprobantes registrados',
  'Cuales comprobantes estan pendientes?',
  'Que comprobantes son invalidos y por que?',
]

export const WELCOME_MESSAGE =
  'Carga un comprobante o haz una pregunta sobre los datos guardados. Puedo analizar texto, archivos y consultar insights.'

export const STATUS_LABELS: Record<ReceiptStatus, string> = {
  VALIDO: 'Valido',
  INVALIDO: 'Invalido',
  PENDIENTE: 'Pendiente',
}

export const PANEL_SHELL =
  'min-w-0 border border-ink/10 bg-white/80 shadow-[0_24px_70px_rgba(33,38,31,0.13)] backdrop-blur-xl'

export const ACTION_BASE =
  'rounded-full border-0 font-extrabold transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(33,38,31,0.1)] disabled:cursor-not-allowed disabled:opacity-45 disabled:grayscale'

export const SOFT_ACTION = `${ACTION_BASE} bg-soft text-ink`
