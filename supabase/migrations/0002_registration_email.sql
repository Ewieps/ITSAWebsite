-- Add email column to registrations
-- Paste this in Supabase Dashboard > SQL Editor and run it.

alter table public.registrations
  add column if not exists email text;
