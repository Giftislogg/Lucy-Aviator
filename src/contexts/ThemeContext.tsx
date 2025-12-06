import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "black-red" | "black-gold" | "dark-blue-neon" | "white-red" | "pure-black";

interface AppSettings {
  animationsEnabled: boolean;
  hapticFeedback: boolean;
  compactMode: boolean;
  autoRefreshSignals: boolean;
}

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: { id: ThemeType; name: string; preview: string[] }[];
  settings: AppSettings;
  updateSettings: (key: keyof AppSettings, value: boolean) => void;
}

const themes = [
  { id: "black-red" as ThemeType, name: "Black + Red", preview: ["#121212", "#dc2626"] },
  { id: "black-gold" as ThemeType, name: "Black + Gold", preview: ["#121212", "#ffd700"] },
  { id: "dark-blue-neon" as ThemeType, name: "Dark Blue + Neon", preview: ["#0a1628", "#00ff88"] },
  { id: "white-red" as ThemeType, name: "White + Red", preview: ["#f5f5f5", "#dc2626"] },
  { id: "pure-black" as ThemeType, name: "Pure Black", preview: ["#000000", "#333333"] },
];

const defaultSettings: AppSettings = {
  animationsEnabled: true,
  hapticFeedback: true,
  compactMode: false,
  autoRefreshSignals: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("app-theme");
    return (saved as ThemeType) || "black-red";
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("app-settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("app-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const updateSettings = (key: keyof AppSettings, value: boolean) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem("app-settings", JSON.stringify(newSettings));
      return newSettings;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-animations", settings.animationsEnabled ? "true" : "false");
  }, [settings.animationsEnabled]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
