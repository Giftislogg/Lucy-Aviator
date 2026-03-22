import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import VIP from "./pages/VIP";
import VIPDashboard from "./pages/VIPDashboard";
import Settings from "./pages/Settings";
import ControlPanel from "./pages/ControlPanel";
import Announcements from "./pages/Announcements";
import Videos from "./pages/Videos";
import Purchase from "./pages/Purchase";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Guide from "./pages/Guide";
import NotFound from "./pages/NotFound";
import { initAdMob } from "@/lib/admob";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initAdMob();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/vip" element={<Layout><VIP /></Layout>} />
            <Route path="/vip-dashboard" element={<Layout><VIPDashboard /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/control-panel" element={<Layout><ControlPanel /></Layout>} />
            <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
            <Route path="/videos" element={<Layout><Videos /></Layout>} />
            <Route path="/purchase" element={<Layout><Purchase /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
            <Route path="/guide" element={<Layout><Guide /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
};

export default App;
