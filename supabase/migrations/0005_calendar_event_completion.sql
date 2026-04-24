alter table public.calendar_events
add column if not exists completed_at timestamptz;

create index if not exists calendar_events_completed_at_idx on public.calendar_events (completed_at);

drop policy if exists "authenticated can update calendar events" on public.calendar_events;
create policy "authenticated can update calendar events"
on public.calendar_events for update
to authenticated
using (true)
with check (true);
