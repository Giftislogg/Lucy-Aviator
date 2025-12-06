import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Lock, ShoppingCart } from "lucide-react";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const PasswordDialog = ({ open, onOpenChange, onSuccess }: PasswordDialogProps) => {
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    setIsVerifying(true);

    try {
      // First check the new vip_passwords table
      const { data: vipPassword, error: vipError } = await supabase
        .from("vip_passwords")
        .select("*")
        .eq("password", password)
        .eq("is_active", true)
        .single();

      if (vipPassword) {
        // Check if password is expired
        const now = new Date();
        const expiryDate = new Date(vipPassword.expiry_date);

        if (expiryDate < now) {
          toast.error("This password has expired. Please purchase a new one.");
          setPassword("");
          setIsVerifying(false);
          return;
        }

        toast.success(`${vipPassword.type} access granted!`);
        onOpenChange(false);
        setPassword("");
        onSuccess();
        return;
      }

      // Fallback to legacy vip_password in app_settings
      const { data: legacyPassword } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "vip_password")
        .single();

      if (legacyPassword && legacyPassword.value === password) {
        toast.success("VIP access granted!");
        onOpenChange(false);
        setPassword("");
        onSuccess();
        return;
      }

      toast.error("Invalid password. Please try again or purchase access.");
    } catch (error) {
      toast.error("Invalid password. Please try again or purchase access.");
    } finally {
      setPassword("");
      setIsVerifying(false);
    }
  };

  const handlePurchase = () => {
    onOpenChange(false);
    navigate("/purchase");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-card to-muted border-2 border-primary max-w-sm mx-4">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Enter Password
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please enter the password you purchased to generate signals.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your VIP/VVIP password"
            className="bg-background border-border text-foreground py-6 text-lg"
            disabled={isVerifying}
          />

          <Button
            type="submit"
            disabled={isVerifying || !password}
            className="w-full btn-gradient-red py-6 text-lg font-bold"
          >
            {isVerifying ? "Verifying..." : "Submit"}
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Don't have a password?
          </p>
          <Button
            variant="outline"
            onClick={handlePurchase}
            className="w-full border-primary text-foreground hover:bg-primary/20 gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Purchase here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
