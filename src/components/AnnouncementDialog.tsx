import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, User, X } from "lucide-react";

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: string | null;
  title?: string;
  image?: string | null;
}

export const AnnouncementDialog = ({
  open,
  onOpenChange,
  announcement,
  title = "Announcement",
  image
}: AnnouncementDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-card to-muted border-2 border-primary max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {image && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={image}
              alt="Announcement"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-2">Owner</p>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {announcement || "No announcement available."}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full mt-4 btn-gradient-red py-4 font-bold"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
