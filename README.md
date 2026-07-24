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

## Panel admin (CMS) — ya está construido

Disponible en `/admin`. Permite:
- Ver todas las citas agendadas, confirmarlas o cancelarlas
- Gestionar los bloques de horario disponible (agregar, activar/desactivar, eliminar)

### Activarlo (un solo paso manual en Supabase)

El panel usa autenticación de Supabase, así que hay que crear el usuario de
acceso manualmente (no hay registro público, por seguridad):

1. En Supabase: **Authentication** (menú izquierdo) → **Users** → **Add user** → **Create new user**
2. Completa email y contraseña (las que ella va a usar para entrar)
3. Importante: marca **"Auto Confirm User"** al crearlo, para que no tenga que confirmar por correo
4. Listo — ya puede entrar en `tudominio.com/admin/login` con ese email y contraseña

No hay ningún link público al panel admin en el sitio (a propósito, por seguridad).
Hay que entrar directo a la URL `/admin/login` y guardarla como marcador.

## Fase 3 — completada

~~La arquitectura ya está lista para esto sin reescribir nada~~ — el panel
admin básico (citas + horarios) ya está implementado. Lo que queda como
posible mejora futura, si lo necesitan:

- Mover `lib/servicios.ts` a una tabla en Supabase para editar servicios
  desde el panel sin tocar código
- Notificaciones por email al confirmar/cancelar una cita (ver sección de
  Fase 2 más abajo)

