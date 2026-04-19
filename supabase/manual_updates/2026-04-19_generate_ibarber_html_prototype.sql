-- Fallback idempotente para registrar el prototipo HTML de IBARBER en Supabase.
-- Motivo: el entorno de automatizacion no pudo resolver DNS externo el 2026-04-19.
-- Ejecutar en Supabase SQL Editor o con una conexion service-role.

with target_idea as (
  select id, return_score, difficulty_score
  from public.ideas
  where lower(trim(name)) = 'ibarber'
  limit 1
), dev_status as (
  select id, name
  from public.statuses
  where name = 'En desarrollo'
  limit 1
), inserted_note as (
  insert into public.idea_phase_notes (idea_id, status_id, status_name, summary, details, link)
  select
    target_idea.id,
    dev_status.id,
    dev_status.name,
    'Prototipo HTML generado para IBARBER',
    'Ruta del producto generado: generated-products/ibarber/index.html
Prompt ultraoptimizado: generated-products/ibarber/PROMPT.md
MVP construido: consola operativa para barberias pequenas con agenda diaria, filtros por barbero, confirmacion de citas, no-show, waitlist, nueva reserva, politica de deposito y mensaje listo para WhatsApp.
Flujo principal implementado: revisar agenda, confirmar citas en riesgo, liberar o recuperar cupos, llenar desde lista de espera y crear una reserva demo.
Limitaciones: no usa backend, pagos reales, WhatsApp API, autenticacion ni persistencia.
Proximos pasos: validar con tres barberias piloto, medir no-shows y definir integraciones Stripe/WhatsApp/Supabase.',
    'generated-products/ibarber/index.html'
  from target_idea, dev_status
  where not exists (
    select 1
    from public.idea_phase_notes note
    where note.idea_id = target_idea.id
      and note.status_name = dev_status.name
      and note.summary = 'Prototipo HTML generado para IBARBER'
  )
)
update public.ideas idea
set
  status_id = dev_status.id,
  development_progress = 50,
  notes = 'Prototipo HTML funcional de agenda WhatsApp-first para barberias pequenas: confirma citas, recupera cupos con waitlist y simula deposito.',
  prompt = 'Mejorar el prototipo IBARBER: conectar persistencia Supabase, configurar WhatsApp Cloud API para confirmaciones 24h/4h, simular deposito con Stripe y preparar piloto con 3 barberias.',
  return_score = coalesce(idea.return_score, target_idea.return_score, 8),
  difficulty_score = coalesce(idea.difficulty_score, target_idea.difficulty_score, 4),
  updated_at = now()
from target_idea, dev_status
where idea.id = target_idea.id;

insert into public.activity (idea_id, message)
select target_idea.id, 'IBARBER avanzó a En desarrollo con prototipo HTML generado.'
from target_idea
where not exists (
  select 1
  from public.activity activity
  where activity.idea_id = target_idea.id
    and activity.message = 'IBARBER avanzó a En desarrollo con prototipo HTML generado.'
    and activity.created_at > now() - interval '24 hours'
);

select
  idea.name,
  status.name as status,
  idea.development_progress,
  idea.return_score,
  idea.difficulty_score,
  exists (
    select 1
    from public.idea_phase_notes note
    where note.idea_id = idea.id
      and note.status_name = 'En desarrollo'
      and note.summary = 'Prototipo HTML generado para IBARBER'
  ) as phase_note_exists
from public.ideas idea
left join public.statuses status on status.id = idea.status_id
where lower(trim(idea.name)) = 'ibarber';
