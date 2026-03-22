import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="text-foreground hover:bg-muted"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      <div className="text-center flex-1">
        <h1 className="text-xl font-bold text-foreground">Aviator</h1>
        <p className="text-xs text-muted-foreground">By lucy lucy empire</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/guide")}
        className="text-foreground hover:bg-muted"
      >
        <BookOpen className="w-5 h-5" />
      </Button>
    </div>
  );
};