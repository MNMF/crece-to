-- SCHEMA INICIAL — ejecutar primero en SQL Editor de Supabase
create table if not exists disponibilidad (
  id uuid primary key default gen_random_uuid(),
  dia_semana int not null check (dia_semana between 0 and 6),
  hora_inicio time not null,
  hora_fin time not null,
  activo boolean not null default true,
  profesional_id uuid
);
create table if not exists citas (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  fecha date not null,
  hora time not null,
  servicio_slug text not null,
  profesional_id uuid,
  nombre_paciente text not null,
  rut_paciente text,
  telefono text not null,
  email text,
  notas text,
  estado text not null default 'pendiente' check (estado in ('pendiente','confirmada','cancelada','realizada'))
);
create index if not exists citas_fecha_idx on citas (fecha);
alter table citas enable row level security;
alter table disponibilidad enable row level security;
create policy "sin acceso publico directo" on citas for all using (false);
create policy "sin acceso publico directo disp" on disponibilidad for all using (false);
