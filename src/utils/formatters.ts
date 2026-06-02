import type { Receipt } from '../types'

export function formatMoney(value: number | null | undefined, currency = 'PEN') {
  if (value === null || value === undefined) {
    return '--'
  }

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency || 'PEN',
  }).format(value)
}

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Sin fecha'
  }

  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(
        Number(value.slice(0, 4)),
        Number(value.slice(5, 7)) - 1,
        Number(value.slice(8, 10)),
      )
    : new Date(value)

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getReceiptTitle(receipt: Receipt) {
  const number = [receipt.serie, receipt.numero].filter(Boolean).join('-')
  return `${receipt.tipo}${number ? ` ${number}` : ''}`
}
