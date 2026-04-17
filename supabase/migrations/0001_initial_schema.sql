create extension if not exists pgcrypto;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.statuses (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  position integer not null default 0,
  wip_limit integer not null default 3,
  created_at timestamptz not null default now()
);

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role_id uuid references public.roles(id) on delete set null,
  verified boolean not null default false,
  verification_code text not null default lpad(floor(random() * 1000000)::text, 6, '0'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  market text not null,
  owner_id uuid references public.app_users(id) on delete set null,
  status_id uuid references public.statuses(id) on delete set null,
  value text not null default 'Medio' check (value in ('Alto', 'Medio', 'Bajo')),
  effort text not null default 'Media' check (effort in ('Alta', 'Media', 'Baja')),
  notes text not null default '',
  prompt text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.idea_tags (
  idea_id uuid not null references public.ideas(id) on delete cascade,
  tag text not null,
  primary key (idea_id, tag)
);

create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid references public.ideas(id) on delete set null,
  actor_id uuid references public.app_users(id) on delete set null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists ideas_status_id_idx on public.ideas(status_id);
create index if not exists ideas_owner_id_idx on public.ideas(owner_id);
create index if not exists statuses_position_idx on public.statuses(position);
create index if not exists activity_created_at_idx on public.activity(created_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_app_users_updated_at on public.app_users;
create trigger touch_app_users_updated_at
before update on public.app_users
for each row execute function public.touch_updated_at();

drop trigger if exists touch_ideas_updated_at on public.ideas;
create trigger touch_ideas_updated_at
before update on public.ideas
for each row execute function public.touch_updated_at();

alter table public.roles enable row level security;
alter table public.statuses enable row level security;
alter table public.app_users enable row level security;
alter table public.ideas enable row level security;
alter table public.idea_tags enable row level security;
alter table public.activity enable row level security;

-- The Next.js API uses SUPABASE_SERVICE_ROLE_KEY server-side.
-- Keep client-side anon access read-only until real Supabase Auth is added.
drop policy if exists "anon can read roles" on public.roles;
create policy "anon can read roles" on public.roles for select using (true);

drop policy if exists "anon can read statuses" on public.statuses;
create policy "anon can read statuses" on public.statuses for select using (true);

drop policy if exists "anon can read app users" on public.app_users;
create policy "anon can read app users" on public.app_users for select using (true);

drop policy if exists "anon can read ideas" on public.ideas;
create policy "anon can read ideas" on public.ideas for select using (true);

drop policy if exists "anon can read idea tags" on public.idea_tags;
create policy "anon can read idea tags" on public.idea_tags for select using (true);

drop policy if exists "anon can read activity" on public.activity;
create policy "anon can read activity" on public.activity for select using (true);
