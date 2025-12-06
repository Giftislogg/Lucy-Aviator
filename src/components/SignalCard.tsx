import { Clock } from "lucide-react";

interface SignalCardProps {
  value: string;
  time?: string;
  isGenerating?: boolean;
}

export const SignalCard = ({ value, time, isGenerating }: SignalCardProps) => {
  // Parse time to show hours, minutes, seconds
  const formatTime = (timeStr: string) => {
    if (!timeStr || timeStr === "00:00:00") return null;
    const [hours, minutes, seconds] = timeStr.split(":");
    return { hours, minutes, seconds };
  };

  const parsedTime = time ? formatTime(time) : null;

  return (
    <div className={`card-dark p-8 relative ${isGenerating ? 'animate-pulse-glow' : ''}`}>
      {/* Decorative dots */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
        ))}
      </div>

      {/* Time display */}
      {parsedTime && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-primary" />
          <div className="flex items-center gap-1 text-sm">
            <div className="bg-muted px-2 py-1 rounded">
              <span className="font-mono font-bold text-foreground">{parsedTime.hours}</span>
              <span className="text-muted-foreground text-xs ml-1">hr</span>
            </div>
            <span className="text-muted-foreground">:</span>
            <div className="bg-muted px-2 py-1 rounded">
              <span className="font-mono font-bold text-foreground">{parsedTime.minutes}</span>
              <span className="text-muted-foreground text-xs ml-1">min</span>
            </div>
            <span className="text-muted-foreground">:</span>
            <div className="bg-muted px-2 py-1 rounded">
              <span className="font-mono font-bold text-foreground">{parsedTime.seconds}</span>
              <span className="text-muted-foreground text-xs ml-1">sec</span>
            </div>
          </div>
        </div>
      )}

      {/* Main value display */}
      <div className="text-center">
        <span className="text-5xl font-bold text-foreground tracking-tight">
          {value}X
        </span>
      </div>

      {/* Bottom decorative dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
        ))}
      </div>
    </div>
  );
};