
-- Create admin role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create therapists table
CREATE TABLE public.therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  photo_url TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

-- Public can read therapists
CREATE POLICY "Anyone can view therapists"
  ON public.therapists FOR SELECT
  USING (true);

-- Only admins can insert/update/delete therapists
CREATE POLICY "Admins can insert therapists"
  ON public.therapists FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update therapists"
  ON public.therapists FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete therapists"
  ON public.therapists FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create availability_slots table
CREATE TABLE public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

-- Public can read availability
CREATE POLICY "Anyone can view availability"
  ON public.availability_slots FOR SELECT
  USING (true);

-- Only admins can manage availability
CREATE POLICY "Admins can insert availability"
  ON public.availability_slots FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update availability"
  ON public.availability_slots FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete availability"
  ON public.availability_slots FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS for user_roles (only admins can read, no one can self-assign)
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for therapist photos
INSERT INTO storage.buckets (id, name, public) VALUES ('therapist-photos', 'therapist-photos', true);

CREATE POLICY "Anyone can view therapist photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'therapist-photos');

CREATE POLICY "Admins can upload therapist photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'therapist-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update therapist photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'therapist-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete therapist photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'therapist-photos' AND public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_therapists_updated_at
  BEFORE UPDATE ON public.therapists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
