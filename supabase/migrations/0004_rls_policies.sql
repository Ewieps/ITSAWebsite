-- Enable Row Level Security on all tables with scoped policies.
-- Run in Supabase Dashboard > SQL Editor.
--
-- Model:
--   anon          = public visitors (website readers, registration form)
--   authenticated = signed-in admin users (any logged-in user is a full admin)
--
-- anon:        SELECT on public-facing tables, INSERT on registrations only.
-- authenticated: full SELECT/INSERT/UPDATE/DELETE on every table.

-- ============ members ============
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read members" ON public.members;
CREATE POLICY "anon read members" ON public.members FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all members" ON public.members;
CREATE POLICY "auth all members" ON public.members FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.members TO anon;
GRANT ALL ON public.members TO authenticated;

-- ============ achievements ============
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read achievements" ON public.achievements;
CREATE POLICY "anon read achievements" ON public.achievements FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all achievements" ON public.achievements;
CREATE POLICY "auth all achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.achievements TO anon;
GRANT ALL ON public.achievements TO authenticated;

-- ============ events ============
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read events" ON public.events;
CREATE POLICY "anon read events" ON public.events FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all events" ON public.events;
CREATE POLICY "auth all events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.events TO anon;
GRANT ALL ON public.events TO authenticated;

-- ============ gallery ============
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read gallery" ON public.gallery;
CREATE POLICY "anon read gallery" ON public.gallery FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all gallery" ON public.gallery;
CREATE POLICY "auth all gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.gallery TO anon;
GRANT ALL ON public.gallery TO authenticated;

-- ============ blog_posts ============
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read blog_posts" ON public.blog_posts;
CREATE POLICY "anon read blog_posts" ON public.blog_posts FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all blog_posts" ON public.blog_posts;
CREATE POLICY "auth all blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO authenticated;

-- ============ registrations ============
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon insert registrations" ON public.registrations;
CREATE POLICY "anon insert registrations" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "auth all registrations" ON public.registrations;
CREATE POLICY "auth all registrations" ON public.registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT INSERT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO authenticated;

-- ============ settings ============
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read settings" ON public.settings;
CREATE POLICY "anon read settings" ON public.settings FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all settings" ON public.settings;
CREATE POLICY "auth all settings" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.settings TO anon;
GRANT ALL ON public.settings TO authenticated;

-- ============ cabinets ============
ALTER TABLE public.cabinets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read cabinets" ON public.cabinets;
CREATE POLICY "anon read cabinets" ON public.cabinets FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all cabinets" ON public.cabinets;
CREATE POLICY "auth all cabinets" ON public.cabinets FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.cabinets TO anon;
GRANT ALL ON public.cabinets TO authenticated;

-- ============ cabinet_members ============
ALTER TABLE public.cabinet_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read cabinet_members" ON public.cabinet_members;
CREATE POLICY "anon read cabinet_members" ON public.cabinet_members FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all cabinet_members" ON public.cabinet_members;
CREATE POLICY "auth all cabinet_members" ON public.cabinet_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.cabinet_members TO anon;
GRANT ALL ON public.cabinet_members TO authenticated;

-- ============ hero_slides ============
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon read hero_slides" ON public.hero_slides;
CREATE POLICY "anon read hero_slides" ON public.hero_slides FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "auth all hero_slides" ON public.hero_slides;
CREATE POLICY "auth all hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT SELECT ON public.hero_slides TO anon;
GRANT ALL ON public.hero_slides TO authenticated;

-- ============ admin_logs ============
-- Audit log: authenticated admins may read/write; no anon access.
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth all admin_logs" ON public.admin_logs;
CREATE POLICY "auth all admin_logs" ON public.admin_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT ALL ON public.admin_logs TO authenticated;
