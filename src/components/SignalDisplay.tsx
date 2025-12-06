interface SignalDisplayProps {
  time: string;
  signal1: string;
  signal2: string;
}

export const SignalDisplay = ({ time, signal1, signal2 }: SignalDisplayProps) => {
  return (
    <div className="text-center my-8">
      <div className="text-2xl font-bold text-foreground mb-4 animate-fade-in">
        {time}
      </div>
      <div className="flex justify-center gap-8">
        <div className="text-4xl font-bold text-primary animate-scale-in">{signal1}x</div>
        <div className="text-4xl font-bold text-success animate-scale-in" style={{ animationDelay: '0.1s' }}>{signal2}x</div>
      </div>
    </div>
  );
};
