import { useState, useEffect } from "react";
import { TimeGrid } from "@/components/TimeGrid";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Crown, Star, Zap, ShieldCheck, Gem, BarChart2, Bell, Lock, Trophy } from "lucide-react";
import { saveSignalToHistory, addToFavorites, isFavorite, SignalRecord, getMostFavoritedSignal } from "@/utils/userStorage";
import { sendSignalNotification } from "@/utils/notifications";
import { generateSignal } from "@/lib/signal-generator";

const VIPDashboard = () => {
  const [generatedTimes, setGeneratedTimes] = useState<string[]>([]);
  const [signal1, setSignal1] = useState("0.00");
  const [signal2, setSignal2] = useState("0.00");
  const [currentSignalId, setCurrentSignalId] = useState<string | null>(null);
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

  useEffect(() => {
    // Generate initial random times
    const times = Array.from({ length: 24 }, () => {
      const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
      const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const second = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      return `${hour}:${minute}:${second}`;
    });
    setGeneratedTimes(times);
  }, []);

  useEffect(() => {
    if (currentSignalId) {
      setIsCurrentFavorite(isFavorite(currentSignalId));
    }
  }, [currentSignalId]);

  const handleGenerateSignals = () => {
    // Generate new times using same logic as free version
    const times = Array.from({ length: 24 }, () => {
      const generatedSignal = generateSignal();
      return generatedSignal.time;
    });
    setGeneratedTimes(times);

    // Generate signals using same logic
    const mainSignal = generateSignal();
    setSignal1(mainSignal.signal1);
    setSignal2(mainSignal.signal2);

    // Save to history
    const signalId = `vip_signal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const signalRecord: SignalRecord = {
      id: signalId,
      platform: "VIP Dashboard",
      time: times[0], // Use first generated time
      signal1: mainSignal.signal1,
      signal2: mainSignal.signal2,
      timestamp: Date.now(),
    };
    saveSignalToHistory(signalRecord);
    setCurrentSignalId(signalId);

    // Send notification
    sendSignalNotification("VIP Dashboard", times[0], mainSignal.signal1, mainSignal.signal2);

    toast.success(`VIP Signals generated!`);
  };

  const handleToggleFavorite = () => {
    if (!currentSignalId) return;

    if (isCurrentFavorite) {
      toast.info("Signal already in favorites");
    } else {
      addToFavorites(currentSignalId);
      setIsCurrentFavorite(true);
      toast.success("Added to favorites!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="px-4 pt-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur-lg opacity-75"></div>
          <Button
            onClick={handleGenerateSignals}
            className="relative w-full bg-red-700 text-gold font-bold text-2xl py-8 rounded-full border-2 border-gold header-glow"
          >
            GENERATE SIGNALS
          </Button>
        </div>

        {/* Section 1 — Latest Signals */}
        <section className="mb-8">
          <h2 className="text-gold text-2xl font-bold mb-4">LATEST SIGNALS</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {generatedTimes.slice(0, 5).map((time, index) => (
              <div key={index} className="bg-dark-red p-4 rounded-lg w-40 flex-shrink-0">
                <p className="text-sm text-gray-400">Signal Time</p>
                <p className="text-2xl font-bold text-white">{time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — VIP Exclusive Predictions */}
        <section className="mb-8">
          <h2 className="text-gold text-2xl font-bold mb-4">VIP EXCLUSIVE PREDICTIONS</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <div className="bg-gradient-to-br from-red-800 to-red-600 p-4 rounded-lg w-48 flex-shrink-0">
              <p className="text-sm">Crash Target Forecast</p>
              <p className="text-3xl font-bold">3.33x</p>
            </div>
            <div className="bg-gradient-to-br from-red-800 to-red-600 p-4 rounded-lg w-48 flex-shrink-0">
              <p className="text-sm">Crash Target Forecast</p>
              <p className="text-3xl font-bold">4.19x</p>
            </div>
            <div className="bg-gradient-to-br from-red-800 to-red-600 p-4 rounded-lg w-48 flex-shrink-0">
              <p className="text-sm">Crash Target Forecast</p>
              <p className="text-3xl font-bold">2.75x</p>
            </div>
          </div>
        </section>

        {/* Section 3 — Hot Multipliers */}
        <section className="mb-8">
          <h2 className="text-gold text-2xl font-bold mb-4">HOT MULTIPLIERS</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-800 to-purple-600 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold text-white">3.33x</p>
            </div>
            <div className="bg-gradient-to-br from-red-800 to-red-600 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold text-white">4.19x</p>
            </div>
          </div>
        </section>

        {/* Section 4 — VIP Features Grid */}
        <section>
          <h2 className="text-gold text-2xl font-bold mb-4">VIP FEATURES</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-2">
              <Zap className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">Auto-Predict Mode</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <ShieldCheck className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">High Accuracy Mode</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Gem className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">VIP Early Signal Access</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <BarChart2 className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">Advanced History Analytics</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Bell className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">Priority Server</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Lock className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">Lifetime VIP Badge</p>
            </div>
            <div className="flex flex-col items-center p-2">
              <Trophy className="w-8 h-8 text-gold mb-2" />
              <p className="text-center text-sm">Favorites</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VIPDashboard;
