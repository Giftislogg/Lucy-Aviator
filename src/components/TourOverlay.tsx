import { useEffect, useState } from "react";
import { useTour } from "@/hooks/useTour";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const TourOverlay = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, endTour } = useTour();
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!isActive) return;

    const step = steps[currentStep];
    const element = document.querySelector(step.target);

    if (element) {
      const rect = element.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive, currentStep, steps]);

  if (!isActive) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-[100]" onClick={endTour} />

      {/* Highlight */}
      <div
        className="fixed z-[101] ring-4 ring-primary rounded-xl pointer-events-none animate-pulse"
        style={{
          top: position.top - 8,
          left: position.left - 8,
          width: position.width + 16,
          height: position.height + 16,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.7)",
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-[102] bg-background border-2 border-primary rounded-2xl p-4 max-w-xs animate-scale-in"
        style={{
          top: position.top + position.height + 20,
          left: Math.max(16, Math.min(position.left, window.innerWidth - 300)),
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
          <Button variant="ghost" size="icon" onClick={endTour} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-foreground/80 mb-4">{step.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground/60">
            {currentStep + 1} / {steps.length}
          </span>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <Button size="sm" onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
