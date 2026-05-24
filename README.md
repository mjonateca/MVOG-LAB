# MVOG Control Room

Webapp interna para planificar ideas, reminders/calendario y pipeline operativo de MVOG.

La app actual funciona sin Supabase: lee y escribe el estado compartido en `data/state.json` usando la API de GitHub desde rutas server-side de Next.js. Vercel guarda el token como variable privada, por lo que el token nunca se expone al navegador.

## Stack actual

- Next.js App Router
- React client components para cerebro de ideas, calendario, kanban y detalle
- GitHub Contents API como backend JSON compartido
- `data/state.json` como fuente de verdad
- Vercel como plataforma de deploy

## Variables de entorno

Configura al menos una de estas variables privadas en Vercel:

```bash
GITHUB_STATE_TOKEN=
# también se aceptan: GITHUB_TOKEN, GITHUB_ACCESS_TOKEN, GH_TOKEN o GH_PAT
```

Opcionales si se quiere cambiar el repo, path o rama:

```bash
GITHUB_STATE_OWNER=mjonateca
GITHUB_STATE_REPO=MVOG-LAB
GITHUB_STATE_PATH=data/state.json
GITHUB_STATE_BRANCH=main
```

El token necesita permiso de lectura y escritura sobre Contents del repositorio.

## Funcionamiento

1. La página carga el estado inicial desde `data/state.json`.
2. Cada cambio en ideas o calendario se guarda por `PUT /api/state`.
3. El cliente consulta `GET /api/state` periódicamente para traer cambios hechos desde otro dispositivo.
4. La UI muestra una burbuja de sincronización: guardando, guardado o error.

Si falta el token o es inválido, `/api/state` responde con error y la UI lo muestra en pantalla.

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

En `.env.local`, define `GITHUB_STATE_TOKEN` para probar persistencia real. Sin token, la app puede cargar datos demo como fallback visual, pero no guardará cambios.

## Estructura principal

```text
src/
  app/
    api/state/route.ts
    globals.css
    sync.css
    layout.tsx
    page.tsx
  components/
    ControlRoomApp.tsx
    DirectControlRoom.tsx
  lib/
    github-state.ts
    demo-data.ts
    types.ts
data/state.json
```

## Notas

Quedan algunos archivos legacy de la versión Supabase para referencia histórica, pero el cliente Supabase está deshabilitado y la app principal usa GitHub JSON.
