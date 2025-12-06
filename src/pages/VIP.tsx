import { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "./integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Crown, Sparkles, Check } from "lucide-react";

const VIP = () => {
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { data, error } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "vip_password")
        .single();

      if (error) throw error;

      if (data.value === password) {
        toast.success("Access granted! Welcome to VIP section.");
        navigate("/vip-dashboard");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to verify password. Please try again.");
    } finally {
      setIsVerifying(false);
      setPassword("");
    }
  };

  const features = [
    "Unlimited daily signals",
    "Priority signal generation",
    "Access to VIP dashboard",
    "24/7 Premium support",
  ];

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        {/* VIP Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">VVIP Access</h2>
          <p className="text-muted-foreground">Enter password to unlock</p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="card-darker p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">VIP Password</span>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter VIP password"
              className="bg-muted border-border text-foreground mb-4"
              disabled={isVerifying}
            />
            <button
              type="submit"
              disabled={isVerifying || !password}
              className="w-full py-4 btn-gradient-red rounded-xl text-foreground font-bold disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Access VIP"}
            </button>
          </div>
        </form>

        {/* Features */}
        <div className="card-dark p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-foreground">VIP Benefits</h3>
          </div>
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Link */}
        <button
          onClick={() => navigate("/purchase")}
          className="w-full card-dark p-4 flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
        >
          <span className="text-foreground font-medium">Don't have a password?</span>
          <span className="text-primary font-bold">Get VIP Now</span>
        </button>
      </div>
    </div>
  );
};

export default VIP;