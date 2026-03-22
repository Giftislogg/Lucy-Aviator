import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  platform: string;
}

export const ConfirmDialog = ({ open, onOpenChange, onConfirm, platform }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-red-900/95 to-red-700/95 border-4 border-primary max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground text-center">
            Generate Signal
          </DialogTitle>
          <DialogDescription className="text-foreground/90 text-center text-base pt-4">
            Are you sure you want to generate a signal for {platform}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-primary text-foreground hover:bg-primary/20"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 bg-primary text-foreground hover:bg-primary/90"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
