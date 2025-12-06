import { Header } from "./components/Header";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";
import {
  Settings as SettingsIcon,
  Video,
  Store,
  Star,
  Clock,
  Bell,
  Lock,
  ChevronRight,
  Palette,
  Check,
  BookOpen,
  Sparkles,
  Smartphone,
  LayoutGrid,
  RefreshCw
} from "lucide-react";
import { Switch } from "./components/ui/switch";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme, themes, settings, updateSettings } = useTheme();

  const menuItems = [
    { icon: Video, label: "Videos", path: "/videos", description: "Watch tutorials" },
    { icon: Store, label: "Purchase", path: "/purchase", description: "Buy VIP access" },
    { icon: Star, label: "Favorites", path: "/favorites", description: "Your saved signals" },
    { icon: Clock, label: "History", path: "/profile", description: "Signal history" },
    { icon: Bell, label: "Announcements", path: "/announcements", description: "Latest updates" },
    { icon: BookOpen, label: "Guide", path: "/guide", description: "How to use the app" },
    { icon: Lock, label: "Control Panel", path: "/control-panel", description: "Admin access" },
  ];

  const customizationOptions = [
    {
      key: "animationsEnabled" as const,
      label: "Card Animations",
      description: "Enable smooth animations on cards",
      icon: Sparkles
    },
    {
      key: "hapticFeedback" as const,
      label: "Haptic Feedback",
      description: "Vibration on interactions",
      icon: Smartphone
    },
    {
      key: "compactMode" as const,
      label: "Compact Mode",
      description: "Reduce spacing for more content",
      icon: LayoutGrid
    },
    {
      key: "autoRefreshSignals" as const,
      label: "Auto Refresh",
      description: "Auto-refresh signal history",
      icon: RefreshCw
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        {/* Settings Header */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your app</p>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mb-6 animate-fade-in stagger-1">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Color Theme</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`card-dark p-4 flex flex-col items-center gap-3 transition-all relative ${
                  theme === t.id
                    ? 'ring-2 ring-primary scale-[1.02]'
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="flex gap-1">
                  {t.preview.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                {theme === t.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Customization Options */}
        <div className="mb-6 animate-fade-in stagger-2">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Customization</h3>
          </div>

          <div className="space-y-2">
            {customizationOptions.map((option) => (
              <div
                key={option.key}
                className="card-dark p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[option.key]}
                  onCheckedChange={(checked) => updateSettings(option.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full card-dark p-4 flex items-center gap-4 hover:bg-muted/80 transition-all hover:scale-[1.01] animate-fade-in`}
              style={{ animationDelay: `${(index + 3) * 0.05}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 card-darker p-4 animate-fade-in">
          <h3 className="text-foreground font-semibold mb-3">App Information</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Version: Lucy Avia v2.0</p>
            <p>Free signals: 2 per day</p>
            <p>VIP signals: Up to 6 per day</p>
            <p>VVIP signals: Unlimited</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;