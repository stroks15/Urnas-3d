create table if not exists public.urn_designs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Diseño NEXTLI',
  design jsonb not null,
  preview_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.urn_designs enable row level security;
drop policy if exists "Users can read their urn designs" on public.urn_designs;
create policy "Users can read their urn designs" on public.urn_designs for select to authenticated using (auth.uid() = owner_id);
drop policy if exists "Users can create their urn designs" on public.urn_designs;
create policy "Users can create their urn designs" on public.urn_designs for insert to authenticated with check (auth.uid() = owner_id);
drop policy if exists "Users can update their urn designs" on public.urn_designs;
create policy "Users can update their urn designs" on public.urn_designs for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists "Users can delete their urn designs" on public.urn_designs;
create policy "Users can delete their urn designs" on public.urn_designs for delete to authenticated using (auth.uid() = owner_id);
grant select, insert, update, delete on public.urn_designs to authenticated;
