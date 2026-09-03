-- MIGRACIÓN v4 — ejecutar en el SQL Editor de Supabase
-- 1) Agrega el "área de atención" de cada profesional, usada para filtrar
--    en el paso 1 del formulario de agenda (Fonoaudiología, Terapia Ocupacional,
--    Psicología, Psicopedagogía). Es independiente del campo "especialidad"
--    (que sigue siendo texto libre para mostrar en "Quiénes somos").
alter table profesionales add column if not exists area text
  check (area in ('fonoaudiologia','terapia-ocupacional','psicologia','psicopedagogia'));

-- 2) Agrega la edad del paciente a las citas (nuevo campo del formulario).
alter table citas add column if not exists edad int;

-- IMPORTANTE: los profesionales que ya tenías creados van a quedar con area = NULL
-- hasta que se lo asignes manualmente. Mientras un profesional no tenga area,
-- NO va a aparecer en ningún paso del formulario de agenda nuevo.
--
-- 1. Primero mira qué profesionales tienes y sus IDs:
--    select id, nombre, especialidad, area from profesionales order by orden;
--
-- 2. Luego asigna el área a cada uno (repite por cada profesional), por ejemplo:
--    update profesionales set area = 'terapia-ocupacional' where id = 'PEGA-AQUI-EL-ID';
--
--    Valores válidos para area:
--      'fonoaudiologia'
--      'terapia-ocupacional'
--      'psicologia'
--      'psicopedagogia'
