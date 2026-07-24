-- MIGRACIÓN v2 — ejecutar en SQL Editor de Supabase DESPUÉS del schema.sql inicial --------

-- Tabla de profesionales del centro
create table if not exists profesionales (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  especialidad text not null,
  bio text,
  diplomados text[] default '{}',
  activo boolean not null default true,
  user_id uuid references auth.users(id) on delete set null,
  orden int not null default 0
);

alter table profesionales enable row level security;
create policy "sin acceso publico profesionales" on profesionales for all using (false);

-- Vincular citas y disponibilidad a un profesional
alter table citas add column if not exists profesional_id uuid references profesionales(id);
alter table disponibilidad add column if not exists profesional_id uuid references profesionales(id);

-- Agregar campo rut al paciente
alter table citas add column if not exists rut_paciente text;

-- Índice para buscar disponibilidad por profesional
create index if not exists disponibilidad_profesional_idx on disponibilidad (profesional_id, dia_semana);

-- Índice para buscar citas por profesional
create index if not exists citas_profesional_idx on citas (profesional_id, fecha);

-- NOTA: después de correr esto, entra al panel /admin/profesionales
-- y agrega los profesionales del centro desde ahí.
-- La disponibilidad vieja (global) ya no aplica — se reemplaza por disponibilidad por profesional.
-- Puedes borrar los registros anteriores con: DELETE FROM disponibilidad WHERE profesional_id IS NULL;
