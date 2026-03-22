import { useState } from "react";
import { Menu, X, Home, Crown, Settings, Bell, Lock } from "lucide-react";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/vip", icon: Crown, label: "VIP1" },
    { to: "/announcements", icon: Bell, label: "Announcements" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/control-panel", icon: Lock, label: "Control Panel" },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-900 to-red-700 border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">AvibyLucy</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="text-foreground/80 hover:bg-primary/20 px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all"
                  activeClassName="bg-primary/30 text-foreground"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-foreground hover:bg-primary/20 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-primary/30 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="text-foreground/80 hover:bg-primary/20 block px-3 py-2 rounded-xl text-base font-medium flex items-center gap-3 transition-all"
                activeClassName="bg-primary/30 text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
