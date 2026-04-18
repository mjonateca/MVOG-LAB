alter table public.ideas
  add column if not exists development_progress integer not null default 0 check (development_progress between 0 and 100),
  add column if not exists return_score integer check (return_score between 0 and 10),
  add column if not exists difficulty_score integer check (difficulty_score between 0 and 10);

insert into public.statuses (name, position, wip_limit)
values
  ('IDEA', 10, 99),
  ('Concepto explicado', 20, 99),
  ('Investigación realizada', 30, 99),
  ('En desarrollo', 40, 99),
  ('En test', 50, 99),
  ('En producción', 60, 99),
  ('En venta', 70, 99)
on conflict (name) do update
set position = excluded.position,
    wip_limit = excluded.wip_limit;

with phase_map(old_name, new_name) as (
  values
    ('Inbox', 'IDEA'),
    ('Diseño', 'Concepto explicado'),
    ('Estructura', 'Concepto explicado'),
    ('Test', 'En test'),
    ('En proceso', 'En producción')
)
update public.ideas idea
set status_id = new_status.id
from public.statuses old_status
join phase_map on phase_map.old_name = old_status.name
join public.statuses new_status on new_status.name = phase_map.new_name
where idea.status_id = old_status.id;

delete from public.statuses
where name in ('Inbox', 'Diseño', 'Estructura', 'Test', 'En proceso');

create table if not exists public.idea_phase_notes (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  status_id uuid references public.statuses(id) on delete set null,
  status_name text not null,
  summary text not null default '',
  details text not null default '',
  link text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idea_phase_notes_idea_id_idx on public.idea_phase_notes(idea_id);
create index if not exists idea_phase_notes_status_id_idx on public.idea_phase_notes(status_id);

drop trigger if exists touch_idea_phase_notes_updated_at on public.idea_phase_notes;
create trigger touch_idea_phase_notes_updated_at
before update on public.idea_phase_notes
for each row execute function public.touch_updated_at();

alter table public.idea_phase_notes enable row level security;

drop policy if exists "authenticated can read idea phase notes" on public.idea_phase_notes;
create policy "authenticated can read idea phase notes" on public.idea_phase_notes
  for select to authenticated using (true);

insert into public.idea_phase_notes (idea_id, status_id, status_name, summary, details)
select idea.id, idea.status_id, coalesce(status.name, 'IDEA'), idea.notes, idea.prompt
from public.ideas idea
left join public.statuses status on status.id = idea.status_id
where not exists (
  select 1 from public.idea_phase_notes note where note.idea_id = idea.id
);
