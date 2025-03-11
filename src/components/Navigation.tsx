
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalUsers: number;
  className?: string;
}

const Navigation = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  currentIndex,
  totalUsers,
  className,
}: NavigationProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Navigation buttons */}
      <div className="flex items-center space-x-6 bg-gradient-to-r from-white/70 via-white/80 to-white/70 backdrop-blur-md p-4 rounded-full shadow-lg border border-white/30">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={cn(
            "button-shine h-14 w-14 rounded-full flex items-center justify-center",
            "transition-all duration-300 ease-out",
            hasPrevious 
              ? "bg-gradient-to-br from-primary to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Previous user"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Navigation counter */}
        <div className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-br from-white/80 to-white/60 shadow-inner border border-white/50">
          {totalUsers > 0 ? (
            <span className="text-primary font-semibold">
              {currentIndex + 1} <span className="text-gray-400">/</span> {totalUsers}
            </span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "button-shine h-14 w-14 rounded-full flex items-center justify-center",
            "transition-all duration-300 ease-out",
            hasNext 
              ? "bg-gradient-to-br from-primary to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Next user"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
