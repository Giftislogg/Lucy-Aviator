import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Store, Star, Clock } from "lucide-react";
import { toast } from "sonner";
import { generateSignal } from "@/lib/signal-generator";
import { saveSignalToHistory, addToFavorites, isFavorite, SignalRecord } from "@/utils/userStorage";
import { requestNotificationPermission, sendSignalNotification } from "@/utils/notifications";
import { showInterstitial } from "@/lib/admob";
import { BannerCarousel } from "@/components/BannerCarousel";
import { IconButton } from "@/components/IconButton";
import { SignalCard } from "@/components/SignalCard";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { VIPCard } from "@/components/VIPCard";
import { PasswordDialog } from "@/components/PasswordDialog";
import { FactsSection } from "@/components/FactsSection";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const navigate = useNavigate();
  const { settings } = useTheme();
  const [signalsLeft, setSignalsLeft] = useState(() => {
    const savedSignals = localStorage.getItem("signalsLeft");
    return savedSignals ? parseInt(savedSignals, 10) : 2;
  });
  const [signal, setSignal] = useState({ time: "00:00:00", signal1: "0.00", signal2: "0.00" });
  const [currentSignalId, setCurrentSignalId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform] = useState<"Hollywoodbets" | "Betway">("Hollywoodbets");
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastResetDate = localStorage.getItem("lastResetDate");
    if (lastResetDate !== today) {
      localStorage.setItem("signalsLeft", "2");
      setSignalsLeft(2);
      localStorage.setItem("lastResetDate", today);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("signalsLeft", signalsLeft.toString());
  }, [signalsLeft]);

  const performSignalGeneration = () => {
    setIsGenerating(true);

    // Simulate loading
    setTimeout(() => {
      const newSignal = generateSignal();
      const signalId = `signal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const signalRecord: SignalRecord = {
        id: signalId,
        platform: selectedPlatform,
        time: newSignal.time,
        signal1: newSignal.signal1,
        signal2: newSignal.signal2,
        timestamp: Date.now(),
      };
      saveSignalToHistory(signalRecord);

      setSignal(newSignal);
      setCurrentSignalId(signalId);
      setSignalsLeft(prev => Math.max(0, prev - 1));

      sendSignalNotification(selectedPlatform, newSignal.time, newSignal.signal1, newSignal.signal2);
      toast.success("Signal generated successfully!");

      setIsGenerating(false);
    }, 1500);
  };

  const handleGenerateSignal = () => {
    // Show password dialog instead of directly generating
    setShowPasswordDialog(true);
  };

  const handlePasswordSuccess = async () => {
    await showInterstitial();
    performSignalGeneration();
  };

  const handleToggleFavorite = () => {
    if (!currentSignalId) return;

    if (isFavorite(currentSignalId)) {
      toast.info("Signal already in favorites");
    } else {
      addToFavorites(currentSignalId);
      toast.success("Added to favorites!");
    }
  };

  const iconButtons = [
    { icon: Video, label: "Videos", onClick: () => navigate("/videos") },
    { icon: Store, label: "Purchase", onClick: () => navigate("/purchase") },
    { icon: Star, label: "Favorites", onClick: () => navigate("/favorites") },
    { icon: Clock, label: "History", onClick: () => navigate("/profile") },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-4 pt-8 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Aviator</h1>
          <p className="text-sm text-muted-foreground">By lucy lucy empire</p>
        </div>

        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Icon Row */}
        <div className="flex justify-between px-2 mb-6" data-tour="nav-icons">
          {iconButtons.map((btn, index) => (
            <div
              key={btn.label}
              className={settings.animationsEnabled ? "animate-fade-in-scale" : ""}
              style={settings.animationsEnabled ? { animationDelay: `${index * 0.1}s` } : {}}
            >
              <IconButton {...btn} animationsEnabled={settings.animationsEnabled} />
            </div>
          ))}
        </div>

        {/* Did You Know Facts */}
        <div className="mb-6">
          <FactsSection />
        </div>

        {/* Aviator Predator Section */}
        <div className={`mb-6 ${settings.animationsEnabled ? "animate-fade-in stagger-2" : ""}`} data-tour="signal-display">
          <h2 className="text-xl font-bold text-foreground italic mb-4">Aviator predator</h2>

          <SignalCard
            value={signal.signal1}
            time={signal.time}
            isGenerating={isGenerating}
          />

          {/* Generate Signal Button */}
          <button
            onClick={handleGenerateSignal}
            disabled={isGenerating}
            className="w-full mt-4 py-4 btn-gradient-red rounded-xl text-foreground font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate signal"}
          </button>

          {/* Signals left indicator */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            {signalsLeft} daily signals remaining
          </p>
        </div>

        {/* Favorite button when signal exists */}
        {currentSignalId && signal.time !== "00:00:00" && (
          <div className="flex justify-center mb-4 animate-fade-in">
            <button
              onClick={handleToggleFavorite}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              <Star className={`w-4 h-4 ${isFavorite(currentSignalId) ? "fill-yellow-500 text-yellow-500" : ""}`} />
              {isFavorite(currentSignalId) ? "Favorited" : "Add to Favorites"}
            </button>
          </div>
        )}

        {/* Announcements */}
        <div className="mb-4 animate-fade-in stagger-3">
          <AnnouncementCard />
        </div>

        {/* VIP Section */}
        <div className="mb-6 animate-fade-in stagger-4">
          <VIPCard />
        </div>
      </div>

      {/* Password Dialog */}
      <PasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
};

export default Index;
