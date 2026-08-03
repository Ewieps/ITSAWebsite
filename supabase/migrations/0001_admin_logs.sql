-- Admin audit log table
-- Paste this in Supabase Dashboard > SQL Editor and run it.
-- Do NOT enable RLS (matching the rest of the schema — auth is enforced at the API layer).

create table if not exists public.admin_logs (
  id bigint generated always as identity primary key,
  actor text not null,
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists admin_logs_created_at_idx on public.admin_logs (created_at desc);
create index if not exists admin_logs_actor_idx on public.admin_logs (actor);
