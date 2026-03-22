import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Bell, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Announcements = () => {
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncement();

    const channel = supabase
      .channel("announcements-channel")
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
      const { data, error } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "announcement")
        .single();

      if (error) throw error;
      setAnnouncement(data?.value || null);
    } catch (error) {
      console.error("Failed to fetch announcement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Announcements</h2>
            <p className="text-sm text-muted-foreground">Latest updates</p>
          </div>
        </div>

        {loading ? (
          <div className="card-darker p-8 text-center animate-pulse">
            <p className="text-muted-foreground">Loading announcements...</p>
          </div>
        ) : announcement ? (
          <div className="card-darker p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-foreground">Owner</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {announcement}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-darker p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No announcements at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;