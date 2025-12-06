-- Create settings table to store VIP password and other app settings
CREATE TABLE IF NOT EXISTS public.app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read settings (needed for VIP password check)
CREATE POLICY "Anyone can read settings"
  ON public.app_settings
  FOR SELECT
  USING (true);

-- Only authenticated users can update settings (for admin panel)
CREATE POLICY "Authenticated users can update settings"
  ON public.app_settings
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Insert default VIP password
INSERT INTO public.app_settings (key, value)
VALUES ('vip_password', 'lucy2024')
ON CONFLICT (key) DO NOTHING;

-- Create signals table to track daily signals
CREATE TABLE IF NOT EXISTS public.signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  signal_time TIMESTAMP WITH TIME ZONE NOT NULL,
  multiplier DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read signals
CREATE POLICY "Anyone can read signals"
  ON public.signals
  FOR SELECT
  USING (true);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_app_settings_updated_at
  BEFORE UPDATE ON public.app_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();