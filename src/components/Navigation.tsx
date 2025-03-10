
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
    <div className={cn("flex flex-col space-y-4 items-center", className)}>
      {/* Navigation counter */}
      <div className="text-sm text-muted-foreground font-medium">
        {totalUsers > 0 ? (
          <span>
            User {currentIndex + 1} of {totalUsers}
          </span>
        ) : (
          <span>Loading users...</span>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={cn(
            "button-shine h-12 w-12 rounded-full flex items-center justify-center",
            "transition-all duration-300 ease-out",
            hasPrevious 
              ? "bg-primary text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          aria-label="Previous user"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "button-shine h-12 w-12 rounded-full flex items-center justify-center",
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
