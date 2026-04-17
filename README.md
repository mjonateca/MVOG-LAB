# MVOG Control Room

Webapp interna para planificar ideas, moverlas por un kanban operativo, revisar KPIs y gestionar usuarios/roles con verificación.

La carpeta conserva `ideas-pyme-lab.html` como versión HTML legacy. La app preparada para GitHub + Vercel + Supabase vive en `src/`.

## Stack preparado

- Next.js App Router
- React client components para drag and drop y detalle de tareas
- Supabase Postgres para roles, usuarios, estados, ideas, etiquetas y actividad
- API routes server-side para usar `SUPABASE_SERVICE_ROLE_KEY` sin exponerla al navegador
- Vercel como plataforma de deploy
- GitHub Actions para typecheck y build

## Estructura

```text
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bootstrap/route.ts
│   │   │   ├── ideas/route.ts
│   │   │   ├── ideas/[id]/route.ts
│   │   │   ├── users/route.ts
│   │   │   └── users/[id]/verify/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/ControlRoomApp.tsx
│   └── lib/
│       ├── demo-data.ts
│       ├── server-repository.ts
│       ├── types.ts
│       └── supabase/
├── supabase/
│   ├── config.toml
│   ├── migrations/0001_initial_schema.sql
│   └── seed.sql
├── .github/workflows/ci.yml
├── .env.example
├── next.config.ts
├── package.json
└── vercel.json
```

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Si no hay variables de Supabase, la app carga datos demo para poder diseñar y revisar la UI. Las mutaciones se aplican optimistamente en pantalla, pero la persistencia real requiere Supabase.

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/migrations/0001_initial_schema.sql` en SQL Editor o con Supabase CLI.
3. Ejecuta `supabase/seed.sql` para cargar datos iniciales.
4. Copia las claves del proyecto a `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

La service role key solo debe existir en local y en variables privadas de Vercel. No la expongas en cliente ni la subas a GitHub.

## GitHub

Desde esta carpeta:

```bash
git init
git add .
git commit -m "Initial MVOG Control Room app"
git branch -M main
git remote add origin <tu-repo>
git push -u origin main
```

## Vercel

1. Importa el repositorio desde GitHub.
2. Framework: Next.js.
3. Root Directory: esta carpeta si el repo contiene más proyectos.
4. Añade las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy.

## Notas de seguridad

La migración activa RLS y deja acceso `anon` solo de lectura. Las escrituras pasan por API routes con service role. Para producción completa, el siguiente paso recomendado es añadir Supabase Auth o un proveedor de auth gestionado y endurecer las policies por usuario/rol.
