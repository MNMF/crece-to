# Crece TO

Sitio web + sistema de agendamiento para un centro de terapia ocupacional.
Construido con Next.js + Supabase, pensado para desplegarse en Vercel sin
costo (salvo el dominio).

## Estructura

- `app/` — páginas (inicio, servicios, sobre mí, agenda) y rutas de API
- `components/` — UI reutilizable (Header, Footer, formulario de agenda)
- `lib/servicios.ts` — lista de servicios (única fuente de verdad; en una
  fase 2 esto se puede mover a una tabla de Supabase para que se edite desde
  un panel admin sin tocar código)
- `supabase/schema.sql` — esquema de base de datos (disponibilidad + citas)

## Paso 1 — Crear el proyecto en Supabase

1. Crea una cuenta gratis en https://supabase.com
2. Crea un nuevo proyecto (elige región más cercana, ej. South America)
3. Ve a **SQL Editor** y pega el contenido completo de `supabase/schema.sql`,
   luego ejecútalo
4. Ve a **Project Settings → API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (¡secreta!)

## Paso 2 — Probar localmente

```bash
npm install
cp .env.example .env.local
# pega tus 3 valores de Supabase en .env.local
npm run dev
```

Abre http://localhost:3000

## Paso 3 — Subir a GitHub

```bash
git init
git add .
git commit -m "Crece TO - versión inicial"
# crea un repo vacío en GitHub y luego:
git remote add origin <url-de-tu-repo>
git push -u origin main
```

## Paso 4 — Desplegar en Vercel

1. Entra a https://vercel.com con tu cuenta de GitHub
2. **Add New → Project** → elige el repo
3. En **Environment Variables**, agrega las 3 variables de `.env.example`
   con los valores reales de Supabase
4. Deploy. Vercel te da una URL `.vercel.app` funcionando de inmediato

## Paso 5 — Dominio propio (opcional, ~10-15 USD/año)

1. Compra el dominio (NIC Chile para `.cl`, o Namecheap/Google Domains para
   `.com`)
2. En Vercel: **Project → Settings → Domains** → agrega el dominio
3. Sigue las instrucciones de Vercel para apuntar los DNS desde donde
   compraste el dominio

## Fase 2 — Avisos por email al confirmar hora

Cuando quieran activar confirmaciones automáticas por email:

1. Crear cuenta gratis en https://resend.com
2. Agregar `RESEND_API_KEY` a las variables de entorno
3. Completar el `TODO` en `app/api/agendar/route.ts`

## Fase 3 — Panel admin (CMS)

La arquitectura ya está lista para esto sin reescribir nada:

- Mover `lib/servicios.ts` a una tabla `servicios` en Supabase
- Agregar autenticación con Supabase Auth (`/admin`, solo para ella)
- Pantalla para: ver/confirmar/cancelar citas, editar servicios y horarios
  de disponibilidad sin tocar código

Avísenme cuando quieran este paso y lo construimos sobre esta misma base.
