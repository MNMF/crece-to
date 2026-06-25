-- Ejecutar esto en el SQL Editor de Supabase (proyecto nuevo) ------------

-- Bloques de disponibilidad semanal (lo que ella configura como horario base)
create table if not exists disponibilidad (
  id uuid primary key default gen_random_uuid(),
  dia_semana int not null check (dia_semana between 0 and 6), -- 0=domingo
  hora_inicio time not null,
  hora_fin time not null,
  activo boolean not null default true
);

-- Citas agendadas
create table if not exists citas (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  fecha date not null,
  hora time not null,
  servicio_slug text not null,
  nombre_paciente text not null,
  telefono text not null,
  email text,
  notas text,
  estado text not null default 'pendiente' check (estado in ('pendiente','confirmada','cancelada','realizada')),
  unique (fecha, hora)
);

create index if not exists citas_fecha_idx on citas (fecha);

-- Seguridad de fila: por ahora, lectura/escritura solo vía API del servidor
-- (la API usa la service_role key, nunca expuesta al navegador)
alter table citas enable row level security;
alter table disponibilidad enable row level security;

-- Política mínima: nadie puede leer/escribir directo desde el navegador.
-- Todo pasa por /api/agendar con la service_role key del servidor.
create policy "sin acceso publico directo" on citas for all using (false);
create policy "sin acceso publico directo disp" on disponibilidad for all using (false);

-- Disponibilidad base de ejemplo: lunes a viernes, 9:00 a 13:00 y 15:00 a 18:00
insert into disponibilidad (dia_semana, hora_inicio, hora_fin) values
  (1, '09:00', '13:00'), (1, '15:00', '18:00'),
  (2, '09:00', '13:00'), (2, '15:00', '18:00'),
  (3, '09:00', '13:00'), (3, '15:00', '18:00'),
  (4, '09:00', '13:00'), (4, '15:00', '18:00'),
  (5, '09:00', '13:00'), (5, '15:00', '18:00');
