-- Revert: allow anon writes again so mobile/desktop sync works
DROP POLICY IF EXISTS "Authenticated insert molds" ON public.molds;
DROP POLICY IF EXISTS "Authenticated update molds" ON public.molds;
DROP POLICY IF EXISTS "Authenticated delete molds" ON public.molds;
DROP POLICY IF EXISTS "Authenticated insert occurrences" ON public.occurrences;
DROP POLICY IF EXISTS "Authenticated update occurrences" ON public.occurrences;
DROP POLICY IF EXISTS "Authenticated delete occurrences" ON public.occurrences;

CREATE POLICY "Public insert molds" ON public.molds
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update molds" ON public.molds
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete molds" ON public.molds
  FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Public insert occurrences" ON public.occurrences
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update occurrences" ON public.occurrences
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete occurrences" ON public.occurrences
  FOR DELETE TO anon, authenticated USING (true);

GRANT INSERT, UPDATE, DELETE ON public.molds TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.occurrences TO anon, authenticated;