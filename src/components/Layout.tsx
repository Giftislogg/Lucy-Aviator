import { useLayout } from "./hooks/useLayout";
import { Navbar } from "./components/Navbar";
import { BottomNav } from "./components/BottomNav";
import { SideNav } from "./components/SideNav";
import { TourOverlay } from "./components/TourOverlay";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { layout } = useLayout();

  if (layout === "side") {
    return (
      <div className="min-h-screen bg-background">
        <TourOverlay />
        <SideNav />
        <div className="md:hidden">
          <Navbar />
        </div>
        <main className="md:ml-64">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TourOverlay />
      <main className="pb-16">{children}</main>
      <BottomNav />
    </div>
  );
};
