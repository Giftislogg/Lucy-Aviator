import { useEffect, useState } from "react";
import airplaneIcon from "@/assets/airplane-icon.png";

interface SignalCircleProps {
  multiplier: number;
}

export const SignalCircle = ({ multiplier }: SignalCircleProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-80 h-80 mx-auto my-12">
      {/* Outer rotating circle */}
      <div
        className="absolute inset-0 rounded-full border-4 border-primary"
        style={{
          clipPath: `polygon(0% 0%, 100% 0%, 100% ${rotation / 3.6}%, 0% ${rotation / 3.6}%)`,
          transform: `rotate(${rotation}deg)`,
        }}
      />

      {/* Inner circle border */}
      <div className="absolute inset-4 rounded-full border-4 border-primary/50" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={airplaneIcon}
          alt="Airplane"
          className="w-24 h-24 mb-4 animate-pulse"
        />
        <div className="text-5xl font-bold text-foreground">
          {multiplier.toFixed(2)}x
        </div>
      </div>
    </div>
  );
};
