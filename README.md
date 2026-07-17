
CREATE OR REPLACE FUNCTION public.molds_lite()
RETURNS TABLE(id text, name text, image_name text, tags jsonb, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    m.id,
    COALESCE(m.data->>'name','Sem nome') AS name,
    COALESCE(m.data->>'imageName','') AS image_name,
    COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'text',  t->>'text',
          'color', t->>'color',
          'pdf',   CASE
                     WHEN (t->'pdf') IS NULL OR (t->'pdf') = 'null'::jsonb THEN NULL
                     WHEN (t->'pdf'->>'data') IS NULL THEN NULL
                     ELSE jsonb_build_object('name', t->'pdf'->>'name', 'data', '__lite__')
                   END
        )
      )
      FROM jsonb_array_elements(COALESCE(m.data->'tags','[]'::jsonb)) AS t
    ), '[]'::jsonb) AS tags,
    m.created_at
  FROM public.molds m
  ORDER BY m.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.molds_lite() TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.occurrences_lite()
RETURNS TABLE(
  id text,
  mold_id text,
  machine text,
  occ_date text,
  description text,
  defect_type text,
  updated_at_iso text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    o.id,
    o.mold_id,
    COALESCE(o.data->>'machine','') AS machine,
    COALESCE(o.data->>'date','')    AS occ_date,
    COALESCE(o.data->>'description','') AS description,
    COALESCE(o.data->>'defectType','') AS defect_type,
    COALESCE(o.data->>'updatedAt','') AS updated_at_iso,
    o.created_at
  FROM public.occurrences o
  ORDER BY o.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.occurrences_lite() TO anon, authenticated;
