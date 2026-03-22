-- Add INSERT policy for app_settings
CREATE POLICY "Authenticated users can insert settings"
ON public.app_settings
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Also allow public insert for settings (since control panel doesn't use auth)
CREATE POLICY "Anyone can insert settings"
ON public.app_settings
FOR INSERT
WITH CHECK (true);