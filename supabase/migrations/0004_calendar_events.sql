create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  owner_name text not null,
  owner_email text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists calendar_events_starts_at_idx on public.calendar_events (starts_at);
create index if not exists calendar_events_owner_email_idx on public.calendar_events (owner_email);

drop trigger if exists touch_calendar_events_updated_at on public.calendar_events;
create trigger touch_calendar_events_updated_at
before update on public.calendar_events
for each row execute function public.touch_updated_at();

alter table public.calendar_events enable row level security;

drop policy if exists "authenticated can read calendar events" on public.calendar_events;
create policy "authenticated can read calendar events"
on public.calendar_events for select
to authenticated
using (true);

drop policy if exists "authenticated can insert calendar events" on public.calendar_events;
create policy "authenticated can insert calendar events"
on public.calendar_events for insert
to authenticated
with check (true);

drop policy if exists "authenticated can delete calendar events" on public.calendar_events;
create policy "authenticated can delete calendar events"
on public.calendar_events for delete
to authenticated
using (true);
