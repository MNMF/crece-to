-- MIGRACIÓN v2 — ejecutar DESPUÉS del schema.sql
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
alter table citas add column if not exists profesional_id uuid references profesionales(id);
alter table citas add column if not exists rut_paciente text;
alter table disponibilidad add column if not exists profesional_id uuid references profesionales(id);
create index if not exists disponibilidad_profesional_idx on disponibilidad (profesional_id, dia_semana);
create index if not exists citas_profesional_idx on citas (profesional_id, fecha);
