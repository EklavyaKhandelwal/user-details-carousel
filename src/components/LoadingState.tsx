
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
}

const LoadingState = ({ className }: LoadingStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-8",
      "p-6 max-w-md w-full mx-auto",
      className
    )}>
      {/* Avatar skeleton */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse" />
        <div className="w-48 h-6 rounded-md bg-primary/10 animate-pulse" />
        <div className="w-24 h-4 rounded-md bg-primary/10 animate-pulse" />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-primary/10" />
      
      {/* Fields skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={cn(
            "flex flex-col space-y-2",
            i === 7 && "col-span-1 md:col-span-2"
          )}>
            <div className="w-24 h-4 rounded bg-primary/10 animate-pulse" />
            <div className="w-full h-5 rounded bg-primary/10 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
