
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
      "glass rounded-2xl border border-destructive/20",
      "max-w-md w-full mx-auto",
      className
    )}>
      <AlertCircle 
        className="h-12 w-12 text-destructive mb-4 animate-fade-in" 
      />
      
      <h2 className="text-xl font-semibold mb-2">
        Something went wrong
      </h2>
      
      <p className="text-muted-foreground mb-6">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "button-shine flex items-center space-x-2 px-4 py-2 rounded-full",
            "bg-primary text-white shadow-md",
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
