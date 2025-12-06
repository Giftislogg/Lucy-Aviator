import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  animationsEnabled?: boolean;
}

export const IconButton = ({ icon: Icon, label, onClick, animationsEnabled = true }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 ${animationsEnabled ? 'icon-btn-hover' : ''}`}
    >
      <div className={`icon-container w-16 h-16 flex items-center justify-center shadow-lg ${animationsEnabled ? 'transition-transform hover:scale-105' : ''}`}>
        <Icon className="w-7 h-7 text-gray-800" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </button>
  );
};