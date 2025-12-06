import { Button } from "./components/ui/button";
interface PlatformCardProps {
  name: string;
  logo: string;
  onGetSignal: () => void;
  time: string;
}
export const PlatformCard = ({
  name,
  logo,
  onGetSignal,
  time
}: PlatformCardProps) => {
  return <div className="flex items-center border-4 border-border rounded-3xl overflow-hidden mb-4">
      {/* Logo section */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-600 p-6 flex items-center justify-center min-w-[140px]">
        <div className="text-foreground font-bold text-lg text-center">{logo}</div>
      </div>

      {/* Time section */}
      <div className="bg-primary flex-1 py-6 flex-col flex items-center justify-center border-0">
        <div className="text-foreground text-sm font-semibold mb-1">Time</div>
        <div className="text-foreground text-2xl font-bold">
          {time}
        </div>
      </div>

      {/* Button section */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 px-8 py-6 flex items-center justify-center">
        <Button onClick={onGetSignal} variant="ghost" className="text-foreground font-bold text-lg hover:bg-transparent hover:scale-105 transition-transform">
          GET SIGNAL
        </Button>
      </div>
    </div>;
};