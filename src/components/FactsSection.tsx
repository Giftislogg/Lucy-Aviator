import { useState, useEffect } from "react";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

const facts = [
  "Aviator uses a Methemethical stratedy, making each round unique!",
  "The average multiplier in Aviator is between 1.5x and 2x.",
  "Setting a cashout strategy can improve your consistency.",
  "Our signals are generated using advanced pattern analysis.",
  "VIP users have access to up to 6 signals daily with 80% accuracy.",
  "VVIP members enjoy unlimited signals with 95% accuracy rate.",
  "The best time to play is when the app shows fresh signals.",
  "Always start with small bets when testing new strategies.",
  "Signal timing is crucial - act fast when you see a signal!",
  "Our algorithm analyzes thousands of rounds to predict patterns.",
];

export const FactsSection = () => {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };

  return (
    <div className="card-dark p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold text-primary">Did You Know?</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={prevFact}
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>

        <p className="text-sm text-muted-foreground flex-1 text-center min-h-[40px] flex items-center justify-center">
          {facts[currentFact]}
        </p>

        <button
          onClick={nextFact}
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {facts.slice(0, 5).map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentFact % 5 ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};