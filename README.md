# Payment Receipt Frontend

Interfaz web del proyecto `payment-receipt` construida con React, TypeScript y Vite. Consume la API del backend `payment-receipt-api` para analizar comprobantes, mostrar insights y administrar el historial del chat.

## Descripcion

Este frontend funciona como capa de presentacion. Captura la interaccion del usuario, administra el estado visual y consume la API del backend. La capa de acceso a red esta centralizada en `src/api.ts`, por lo que los componentes no llaman endpoints directamente.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Arquitectura de frontend

El proyecto sigue una estructura basada en componentes y estado levantado al padre:

- `App.tsx`: orquestador principal del estado.
- `api.ts`: cliente HTTP centralizado.
- `components/`: UI compuesta por paneles, chat y comprobantes.
- `types.ts`: contratos de datos compartidos.
- `utils/`: helpers de formato, mensajes y errores.

## Flujo de comunicacion con el backend

1. El usuario escribe, busca o sube un archivo.
2. `App.tsx` recibe la accion y actualiza el estado local.
3. `src/api.ts` arma la peticion HTTP con `fetch`.
4. El backend responde con `ApiResponse<T>`.
5. `api.ts` valida el resultado y devuelve `data`.
6. `App.tsx` actualiza el estado de React y la UI se re-renderiza.

## Componentes principales

- `ChatPanel`: contenedor principal del chat.
- `ChatComposer`: entrada de texto, adjuntos y botones de accion.
- `QuickPrompts`: atajos para preguntas frecuentes.
- `ChatBubble`: render de cada mensaje.
- `InsightsPanel`: resumen estadistico.
- `ReceiptsPanel`: listado y busqueda de comprobantes.
- `HeroPanel`: cabecera visual de la aplicacion.

## Archivo importante: `src/api.ts`

Este archivo centraliza todas las llamadas al backend:

- `sendChatMessage(mensaje)`
- `analyzeReceiptText(texto)`
- `analyzeReceiptFile(file)`
- `getReceipts()`
- `searchReceipts(query)`
- `getInsights()`
- `getChatHistory()`
- `clearChatHistory()`

Tambien contiene helpers para:

- leer respuestas JSON
- validar errores HTTP
- extraer `data` del `ApiResponse`

## Requisitos

- Node.js 20 o superior
- npm
- Backend `payment-receipt-api` ejecutandose localmente o accesible por red

## Instalacion

```bash
npm install
```

## Ejecucion local

```bash
npm run dev
```

Por defecto la aplicacion se ejecuta en `http://localhost:5173`.

## Configuracion

La URL base del backend se define con `VITE_API_BASE_URL`.

```bash
VITE_API_BASE_URL=http://localhost:8080 npm run dev
```

Si no se define esta variable, el frontend usa `http://localhost:8080`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Funcionalidades

- Chat para consultar comprobantes.
- Analisis de texto plano pegado por el usuario.
- Carga de archivos con `multipart/form-data`.
- Listado y busqueda de comprobantes persistidos.
- Panel de insights con metrica general del sistema.
- Render de respuestas con formato basico tipo Markdown.

## Estructura

- `src/App.tsx`: estado principal y orquestacion de acciones.
- `src/api.ts`: capa de acceso a la API.
- `src/components/`: componentes de UI.
- `src/constants/`: textos y estilos reutilizables.
- `src/types.ts`: tipos del dominio del frontend.
- `src/utils/`: utilidades de formato, errores y render de mensajes.
- `src/index.css`: estilos globales.

## Produccion

```bash
npm run build
```

El resultado se genera en `dist/`.
