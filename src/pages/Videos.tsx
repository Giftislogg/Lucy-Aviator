import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Loader2, Play, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

const VIDEO_TAGS = ["All", "Aviator", "Tips", "Signals", "Strategy"];

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTag, setActiveTag] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const searchQueries: Record<string, string> = {
        "All": "aviator game strategy",
        "Aviator": "aviator game tips",
        "Tips": "aviator betting tips",
        "Signals": "aviator signal prediction",
        "Strategy": "aviator game strategy win",
      };

      const { data, error } = await supabase.functions.invoke('fetch-youtube-videos', {
        body: {
          searchQuery: searchQueries[activeTag] || 'aviator game strategy',
          maxResults: 12
        }
      });

      if (error) throw error;

      if (data && data.videos) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    fetchVideos(true);
  };

  const handleRefresh = () => {
    fetchVideos(true);
    toast.success("Videos refreshed!");
  };

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Play className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Videos</h2>
              <p className="text-sm text-muted-foreground">Tutorials & guides</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-border hover:bg-muted"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2 animate-fade-in stagger-1">
          {VIDEO_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all filter-tag ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : videos.length === 0 ? (
          <div className="card-darker p-8 text-center animate-fade-in">
            <Play className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No videos available</p>
            <Button
              onClick={handleRefresh}
              className="mt-4 btn-gradient-red"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="card-dark overflow-hidden hover:scale-[1.02] transition-all cursor-pointer animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-40">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-foreground fill-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            {selectedVideo && (
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
          {selectedVideo && (
            <div className="p-4 bg-card">
              <h3 className="font-bold text-foreground mb-1">{selectedVideo.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedVideo.channelTitle}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;
