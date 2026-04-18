-- Applies the 2026-04-18 MVOG brain run to the Supabase-backed board.
-- It advances:
--   1. Bot de trading: IDEA -> Concepto explicado
--   2. Ibarber: Concepto explicado -> Investigacion realizada
--
-- Run in Supabase SQL Editor or with a service-role connection.

with concept_status as (
  select id, name from public.statuses where name = 'Concepto explicado' limit 1
), bot as (
  select id from public.ideas where name = 'Bot de trading' limit 1
), bot_note as (
  insert into public.idea_phase_notes (idea_id, status_id, status_name, summary, details, link)
  select
    bot.id,
    concept_status.id,
    concept_status.name,
    'Concepto explicado: research workspace de trading con backtesting, paper trading, alertas y controles de riesgo.',
    'Prompt/script de investigacion: Evalua un MVP de bot de trading para traders independientes y equipos internos. Cubre segmentos, competidores, restricciones regulatorias, datos necesarios, broker APIs, costos, arquitectura sin custodia, riesgos de fraude/percepcion, pricing viable y criterios go/no-go. La investigacion debe entregar matriz retorno/riesgo de 0 a 10 y recomendacion de alcance.',
    'https://www.finra.org/rules-guidance/key-topics/algorithmic-trading'
  from bot, concept_status
  where not exists (
    select 1
    from public.idea_phase_notes note
    where note.idea_id = bot.id
      and note.status_name = concept_status.name
      and note.summary ilike 'Concepto explicado: research workspace de trading%'
  )
)
update public.ideas idea
set
  status_id = concept_status.id,
  notes = 'Workspace de investigación para diseñar, comparar y auditar estrategias de trading antes de ejecutar capital real.',
  prompt = 'Investiga un MVP de bot de trading sin custodia ni ejecución real: segmentos, competidores, regulación, datos, broker APIs, backtesting, paper trading, alertas, bitácora, límites de riesgo, pricing y criterios go/no-go.',
  development_progress = 20,
  return_score = null,
  difficulty_score = null,
  updated_at = now()
from bot, concept_status
where idea.id = bot.id;

with research_status as (
  select id, name from public.statuses where name = 'Investigación realizada' limit 1
), ibarber as (
  select id from public.ideas where name = 'Ibarber' limit 1
), ibarber_note as (
  insert into public.idea_phase_notes (idea_id, status_id, status_name, summary, details, link)
  select
    ibarber.id,
    research_status.id,
    research_status.name,
    'Investigación realizada: oportunidad viable si se enfoca en barberías pequeñas, WhatsApp y reducción de no-shows.',
    'Resultado: hay competencia abundante en agenda para salones, pero el nicho de barberías pequeñas sigue respondiendo a soluciones simples, mobile-first y sin fricción de descarga. Competidores como Barbería Club, Barberos, CitaFlow, SalonWop y Appointy validan demanda por reservas 24/7, WhatsApp, recordatorios, pagos/depósitos y CRM básico. En República Dominicana existe Barber Shop RD, aunque con poca señal pública de tracción. Diferenciación recomendada: no vender como suite pesada, sino como agenda WhatsApp-first para 1-5 sillas con onboarding de 10 minutos, link único, depósitos opcionales y métricas de no-show. Viabilidad: 8/10. Retorno: 8/10. Dificultad: 4/10. Decisión: avanzar a prototipo vendible con 3 barberías piloto.',
    'https://barberiaclub.com/en/'
  from ibarber, research_status
  where not exists (
    select 1
    from public.idea_phase_notes note
    where note.idea_id = ibarber.id
      and note.status_name = research_status.name
      and note.summary ilike 'Investigación realizada: oportunidad viable%'
  )
)
update public.ideas idea
set
  status_id = research_status.id,
  notes = 'App mobile-first para barberías pequeñas: reservas por link, WhatsApp, recordatorios, depósitos, clientes recurrentes y métricas simples.',
  prompt = 'Construye un MVP para barberías de 1-5 sillas: link público de reservas, servicios/duración/precio, agenda por barbero, recordatorios WhatsApp/SMS, depósitos opcionales, clientes frecuentes y tablero de no-shows/ingresos.',
  development_progress = 35,
  return_score = 8,
  difficulty_score = 4,
  updated_at = now()
from ibarber, research_status
where idea.id = ibarber.id;

insert into public.activity (idea_id, message)
select id, 'Bot de trading avanzó de IDEA a Concepto explicado con prompt de investigación.'
from public.ideas
where name = 'Bot de trading';

insert into public.activity (idea_id, message)
select id, 'Ibarber avanzó a Investigación realizada con evaluación de viabilidad y retorno.'
from public.ideas
where name = 'Ibarber';
