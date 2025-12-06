import { Home, Crown, Settings, Bell, Lock, Video, ShoppingBag, User, Star } from "lucide-react";
import { NavLink } from "./NavLink";
import { useLayout } from "./hooks/useLayout";

// Original side nav items (shown when layout is 'bottom', meaning side nav shows these)
const sideNavItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/vip", icon: Crown, label: "VIP" },
  { to: "/announcements", icon: Bell, label: "Announcements" },
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/control-panel", icon: Lock, label: "Control Panel" },
];

// Original bottom nav items (shown when layout is 'side', meaning they swap to side nav)
const bottomNavItems = [
  { to: "/videos", icon: Video, label: "Videos" },
  { to: "/purchase", icon: ShoppingBag, label: "Purchase" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/favorites", icon: Star, label: "Favorites" },
];

export const SideNav = () => {
  const { layout } = useLayout();

  // When layout is 'side', show the original bottom nav items in the side nav
  const navItems = layout === "side" ? bottomNavItems : sideNavItems;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-background border-r border-primary/20 flex-col hidden md:flex">
      <div className="flex items-center justify-center h-16 border-b border-primary/20">
        <h1 className="text-2xl font-bold text-foreground">AvibyLucy</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="text-foreground/80 hover:bg-primary/20 px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-3 transition-all"
            activeClassName="bg-primary/30 text-foreground"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
