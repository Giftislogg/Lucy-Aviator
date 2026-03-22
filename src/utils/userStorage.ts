// Utility functions for managing user data in localStorage

export interface SignalRecord {
  id: string;
  platform: string;
  time: string;
  signal1: string;
  signal2: string;
  timestamp: number;
  isFavorite?: boolean;
}

// Get or create anonymous user ID
export const getUserId = (): string => {
  let userId = localStorage.getItem('anonymous_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymous_user_id', userId);
  }
  return userId;
};

// Save signal to history
export const saveSignalToHistory = (signal: SignalRecord): void => {
  const history = getSignalHistory();
  history.unshift(signal);
  // Keep only last 100 signals
  if (history.length > 100) {
    history.pop();
  }
  localStorage.setItem('signal_history', JSON.stringify(history));
};

// Get signal history
export const getSignalHistory = (): SignalRecord[] => {
  const history = localStorage.getItem('signal_history');
  return history ? JSON.parse(history) : [];
};

// Clear signal history
export const clearSignalHistory = (): void => {
  localStorage.removeItem('signal_history');
};

// Add signal to favorites
export const addToFavorites = (signalId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(signalId)) {
    favorites.push(signalId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update favorite count globally
    updateFavoriteCount(signalId, 1);
  }
};

// Remove signal from favorites
export const removeFromFavorites = (signalId: string): void => {
  const favorites = getFavorites();
  const index = favorites.indexOf(signalId);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update favorite count globally
    updateFavoriteCount(signalId, -1);
  }
};

// Get user's favorite signal IDs
export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

// Get favorite signals with full details
export const getFavoriteSignals = (): SignalRecord[] => {
  const favorites = getFavorites();
  const history = getSignalHistory();
  return history.filter(signal => favorites.includes(signal.id));
};

// Check if signal is favorited
export const isFavorite = (signalId: string): boolean => {
  return getFavorites().includes(signalId);
};

// Global favorite counts (shared across all users)
const updateFavoriteCount = (signalId: string, delta: number): void => {
  const counts = getGlobalFavoriteCounts();
  counts[signalId] = (counts[signalId] || 0) + delta;
  if (counts[signalId] <= 0) {
    delete counts[signalId];
  }
  localStorage.setItem('global_favorite_counts', JSON.stringify(counts));
};

export const getGlobalFavoriteCounts = (): Record<string, number> => {
  const counts = localStorage.getItem('global_favorite_counts');
  return counts ? JSON.parse(counts) : {};
};

// Get most favorited signal
export const getMostFavoritedSignal = (): SignalRecord | null => {
  const counts = getGlobalFavoriteCounts();
  const history = getSignalHistory();

  if (Object.keys(counts).length === 0 || history.length === 0) {
    return null;
  }

  // Find signal with highest count
  const topSignalId = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return history.find(s => s.id === topSignalId) || null;
};
