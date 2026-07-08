
DO $$ BEGIN
  CREATE TYPE public.service_mode AS ENUM ('walk_in', 'mobile', 'both');
EXCEPTION WHEN duplicate_object THEN null; END $$;

ALTER TABLE public.therapists
  ADD COLUMN IF NOT EXISTS service_mode public.service_mode NOT NULL DEFAULT 'both',
  ADD COLUMN IF NOT EXISTS photo_urls text[] NOT NULL DEFAULT '{}'::text[];
