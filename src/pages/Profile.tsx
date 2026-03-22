import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Clock, TrendingUp, Trash2, User } from "lucide-react";
import { getUserId, getSignalHistory, clearSignalHistory, SignalRecord } from "@/utils/userStorage";
import { toast } from "sonner";

const Profile = () => {
  const [userId] = useState(getUserId());
  const [signalHistory, setSignalHistory] = useState<SignalRecord[]>([]);

  useEffect(() => {
    setSignalHistory(getSignalHistory());
  }, []);

  const handleClearHistory = () => {
    clearSignalHistory();
    setSignalHistory([]);
    toast.success("History cleared");
  };

  const totalSignals = signalHistory.length;
  const platformCounts = signalHistory.reduce((acc, signal) => {
    acc[signal.platform] = (acc[signal.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostUsedPlatform = Object.keys(platformCounts).length > 0
    ? Object.keys(platformCounts).reduce((a, b) =>
        platformCounts[a] > platformCounts[b] ? a : b
      )
    : "None";

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        {/* User Card */}
        <div className="card-darker p-5 mb-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Anonymous User</h3>
          <p className="text-xs text-muted-foreground font-mono">{userId.slice(0, 20)}...</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card-dark p-4 text-center">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalSignals}</p>
            <p className="text-xs text-muted-foreground">Total Signals</p>
          </div>
          <div className="card-dark p-4 text-center">
            <Clock className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-lg font-bold text-foreground">{mostUsedPlatform}</p>
            <p className="text-xs text-muted-foreground">Top Platform</p>
          </div>
        </div>

        {/* History Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Signal History</h3>
          {signalHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-full hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          )}
        </div>

        {/* History List */}
        {signalHistory.length === 0 ? (
          <div className="card-darker p-8 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No history yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Generate signals to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {signalHistory.map((signal) => (
              <div key={signal.id} className="card-dark p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                    {signal.platform}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(signal.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="font-mono font-bold text-foreground">{signal.time}</p>
                <div className="flex gap-3 mt-2">
                  <span className="text-sm font-semibold text-primary">{signal.signal1}x</span>
                  <span className="text-sm font-semibold text-success">{signal.signal2}x</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;