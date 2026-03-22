import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Star, Trash2 } from "lucide-react";
import { getFavoriteSignals, removeFromFavorites, SignalRecord } from "@/utils/userStorage";
import { toast } from "sonner";

const Favorites = () => {
  const [favorites, setFavorites] = useState<SignalRecord[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavoriteSignals());
  };

  const handleRemoveFavorite = (signalId: string) => {
    removeFromFavorites(signalId);
    loadFavorites();
    toast.success("Removed from favorites");
  };

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Favorites</h2>
            <p className="text-sm text-muted-foreground">{favorites.length} saved signals</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="card-darker p-8 text-center">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No favorites yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Save signals by tapping the star icon
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((signal) => (
              <div key={signal.id} className="card-dark p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {signal.platform}
                    </span>
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="font-mono font-bold text-foreground">{signal.time}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm font-semibold text-primary">{signal.signal1}x</span>
                    <span className="text-sm font-semibold text-success">{signal.signal2}x</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(signal.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(signal.id)}
                  className="p-2 rounded-full hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;