import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VIPCard = () => {
  const navigate = useNavigate();

  return (
    <div className="card-dark p-4 flex items-center gap-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
        <Crown className="w-6 h-6 text-white" />
      </div>

      <div className="flex-1">
        <p className="text-sm text-foreground font-medium leading-tight">
          Get vip password access for<br />7 Days without doubt
        </p>
      </div>

      <button
        onClick={() => navigate("/vip")}
        className="px-4 py-2 bg-muted rounded-full text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors"
      >
        Get Now
      </button>
    </div>
  );
};