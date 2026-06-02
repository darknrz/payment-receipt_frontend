# Payment Receipt Frontend

Interfaz web del proyecto `payment-receipt` construida con React, TypeScript y Vite. Consume la API del backend `payment-receipt-api` para analizar comprobantes, mostrar insights y administrar el historial del chat.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Requisitos

- Node.js 20 o superior
- npm
- Backend `payment-receipt-api` ejecutandose localmente o en un entorno accesible por red

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

La URL base del backend se define con la variable `VITE_API_BASE_URL`.

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
- Visualizacion estructurada de la respuesta JSON del backend.

## Estructura

- `src/api.ts`: capa de acceso a la API.
- `src/components/`: componentes de UI, dashboard, chat y comprobantes.
- `src/types.ts`: tipos compartidos del dominio.
- `src/index.css`: estilos globales.

## Produccion

```bash
npm run build
```

El resultado se genera en `dist/`.
