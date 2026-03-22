import { Home, Crown, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/vip", icon: Crown, label: "VVIP" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bottom-nav pt-4 pb-6 px-4 shadow-2xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
              isActive(item.to)
                ? "bg-muted"
                : "hover:bg-muted/50"
            }`}
          >
            <item.icon className={`w-6 h-6 ${isActive(item.to) ? 'text-foreground' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium ${isActive(item.to) ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};