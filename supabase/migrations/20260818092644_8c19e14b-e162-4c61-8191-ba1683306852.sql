DO $$ BEGIN
  CREATE TYPE public.service_zone AS ENUM ('mainland','island','both');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.therapists ADD COLUMN IF NOT EXISTS zone public.service_zone NOT NULL DEFAULT 'both';
NOTIFY pgrst, 'reload schema';