
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
      <div className="flex items-center space-x-6 bg-white/30 backdrop-blur-md p-4 rounded-full shadow-lg border border-white/20">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={cn(
            "button-shine h-14 w-14 rounded-full flex items-center justify-center",
            "transition-all duration-300 ease-out",
            hasPrevious 
              ? "bg-primary text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Previous user"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Navigation counter */}
        <div className="text-sm font-medium px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm">
          {totalUsers > 0 ? (
            <span>
              {currentIndex + 1} / {totalUsers}
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
              ? "bg-primary text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95" 
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
