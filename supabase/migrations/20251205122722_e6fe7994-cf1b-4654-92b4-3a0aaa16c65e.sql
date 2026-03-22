-- Create VIP passwords table for managing multiple VIP/VVIP passwords
CREATE TABLE public.vip_passwords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  password TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('VIP', 'VVIP')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vip_passwords ENABLE ROW LEVEL SECURITY;

-- Create policy for reading passwords (for validation)
CREATE POLICY "Anyone can read vip_passwords"
ON public.vip_passwords
FOR SELECT
USING (true);

-- Create policy for insert (control panel use)
CREATE POLICY "Anyone can insert vip_passwords"
ON public.vip_passwords
FOR INSERT
WITH CHECK (true);

-- Create policy for update (control panel use)
CREATE POLICY "Anyone can update vip_passwords"
ON public.vip_passwords
FOR UPDATE
USING (true);

-- Create policy for delete (control panel use)
CREATE POLICY "Anyone can delete vip_passwords"
ON public.vip_passwords
FOR DELETE
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vip_passwords_updated_at
BEFORE UPDATE ON public.vip_passwords
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();