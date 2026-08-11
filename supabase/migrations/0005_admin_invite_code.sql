-- Admin invite code table (sensitive, DB-managed like admin_logs).
-- Run in Supabase Dashboard > SQL Editor.
--
-- This table is intentionally NOT readable by anon or authenticated roles via RLS:
-- RLS is enabled with no policies, so every role is denied. Only the server-side
-- service-role API (app/api/admin/signup) and the Supabase Dashboard (direct DB)
-- can access it. This matches how admin_logs is treated — no UI, DB only.

create table if not exists public.admin_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.admin_config enable row level security;

-- No policies on purpose. Example seed (run this after the table is created):
--   insert into public.admin_config (key, value, updated_at)
--   values ('admin_invite_code', '{"code": "YOUR-SECURE-CODE"}', now())
--   on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at;
--
-- To disable signup entirely, set value to '{"code": ""}' (or delete the row).
