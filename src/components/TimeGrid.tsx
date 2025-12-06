interface TimeGridProps {
  times: string[];
}

export const TimeGrid = ({ times }: TimeGridProps) => {
  return (
    <div className="space-y-2 mb-8">
      {times.map((time, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gradient-to-r from-red-900/50 to-red-700/50 px-6 py-4 rounded-full border-2 border-primary/30 animate-fade-in hover:border-primary/60 transition-all"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span className="text-foreground/70 text-sm font-medium">Signal Time</span>
          <span className="text-foreground font-bold text-lg tracking-wider">{time}</span>
        </div>
      ))}
    </div>
  );
};
