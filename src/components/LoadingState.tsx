
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
}

const LoadingState = ({ className }: LoadingStateProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-8",
      "p-6 max-w-md w-full mx-auto",
      "bg-gradient-to-br from-white/80 to-white/70 backdrop-blur-lg",
      "rounded-2xl border border-white/30 shadow-lg",
      className
    )}>
      {/* Avatar skeleton */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse" />
        <div className="w-48 h-6 rounded-md bg-gradient-to-r from-primary/10 to-primary/5 animate-pulse" />
        <div className="w-24 h-4 rounded-md bg-gradient-to-r from-primary/10 to-primary/5 animate-pulse" />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      {/* Fields skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={cn(
            "flex flex-col space-y-2 p-3.5 rounded-xl",
            "bg-gradient-to-br from-white/50 to-white/30",
            "border border-white/40 shadow-sm",
            i === 7 && "col-span-1 md:col-span-2",
            "animate-delayed"
          )}
          style={{ "--delay": `${i * 50}ms` } as React.CSSProperties}>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-primary/10 animate-pulse" />
              <div className="w-24 h-4 rounded bg-primary/10 animate-pulse" />
            </div>
            <div className="w-full h-5 rounded bg-primary/10 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
