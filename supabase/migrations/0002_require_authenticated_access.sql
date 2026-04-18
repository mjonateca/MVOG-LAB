drop policy if exists "anon can read roles" on public.roles;
drop policy if exists "anon can read statuses" on public.statuses;
drop policy if exists "anon can read app users" on public.app_users;
drop policy if exists "anon can read ideas" on public.ideas;
drop policy if exists "anon can read idea tags" on public.idea_tags;
drop policy if exists "anon can read activity" on public.activity;

drop policy if exists "authenticated can read roles" on public.roles;
create policy "authenticated can read roles" on public.roles
  for select to authenticated using (true);

drop policy if exists "authenticated can read statuses" on public.statuses;
create policy "authenticated can read statuses" on public.statuses
  for select to authenticated using (true);

drop policy if exists "authenticated can read app users" on public.app_users;
create policy "authenticated can read app users" on public.app_users
  for select to authenticated using (true);

drop policy if exists "authenticated can read ideas" on public.ideas;
create policy "authenticated can read ideas" on public.ideas
  for select to authenticated using (true);

drop policy if exists "authenticated can read idea tags" on public.idea_tags;
create policy "authenticated can read idea tags" on public.idea_tags
  for select to authenticated using (true);

drop policy if exists "authenticated can read activity" on public.activity;
create policy "authenticated can read activity" on public.activity
  for select to authenticated using (true);
