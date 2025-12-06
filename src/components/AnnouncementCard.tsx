import { useState, useEffect } from "react";
import { Bell, User, ChevronRight } from "lucide-react";
import { supabase } from "./integrations/supabase/client";
import { AnnouncementDialog } from "./AnnouncementDialog";

export const AnnouncementCard = () => {
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchAnnouncement();

    const channel = supabase
      .channel("home-announcements")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "app_settings",
          filter: "key=eq.announcement",
        },
        (payload) => {
          if (payload.new && typeof payload.new === "object" && "value" in payload.new) {
            setAnnouncement(payload.new.value as string);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const { data } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "announcement")
        .single();
      setAnnouncement(data?.value || null);
    } catch (error) {
      console.error("Failed to fetch announcement:", error);
    }
  };

  const truncatedAnnouncement = announcement && announcement.length > 100
    ? announcement.substring(0, 100) + "..."
    : announcement;

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="w-full text-left card-darker p-4 hover:scale-[1.01] transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">Announcements</h3>
          <div className="relative">
            <Bell className="w-5 h-5 text-foreground" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Owner</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {truncatedAnnouncement || "Free betway and Hollywoodbets Signals for today"}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2" />
        </div>
      </button>

      <AnnouncementDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        announcement={announcement}
        title="Latest Announcement"
      />
    </>
  );
};
