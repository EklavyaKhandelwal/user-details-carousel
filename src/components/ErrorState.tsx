
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState = ({ message, onRetry, className }: ErrorStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8",
      "bg-gradient-to-br from-white/80 to-white/70 backdrop-blur-lg",
      "rounded-2xl border border-destructive/20 shadow-lg",
      "max-w-md w-full mx-auto",
      className
    )}>
      <div className="bg-red-50 p-3 rounded-full mb-4">
        <AlertCircle 
          className="h-12 w-12 text-destructive animate-fade-in" 
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Something went wrong
      </h2>
      
      <p className="text-muted-foreground mb-6">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "button-shine flex items-center space-x-2 px-5 py-2.5 rounded-full",
            "bg-gradient-to-r from-destructive/90 to-red-500/90 text-white shadow-md",
            "hover:shadow-lg transition-all duration-300",
            "hover:scale-105 active:scale-95"
          )}
        >
          <RefreshCcw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
