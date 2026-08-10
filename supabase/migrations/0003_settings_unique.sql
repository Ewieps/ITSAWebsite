-- Fix settings table: dedupe rows and enforce unique key.
-- Run this in Supabase Dashboard > SQL Editor.
-- Background: if the settings table was created via the dashboard UI, the `key`
-- column has no unique constraint, so saves were inserting new rows instead of
-- updating the existing one.

-- 1) Delete duplicate rows, keeping the one with the latest updated_at
--    (ctid ties get broken deterministically).
DELETE FROM settings s
USING settings s2
WHERE s.key = s2.key
  AND (
    COALESCE(s.updated_at, '-infinity'::timestamptz) < COALESCE(s2.updated_at, '-infinity'::timestamptz)
    OR (
      COALESCE(s.updated_at, '-infinity'::timestamptz) = COALESCE(s2.updated_at, '-infinity'::timestamptz)
      AND s.ctid < s2.ctid
    )
  );

-- 2) Enforce uniqueness on key so future upserts/updates work.
CREATE UNIQUE INDEX IF NOT EXISTS settings_key_unique_idx ON settings (key);
