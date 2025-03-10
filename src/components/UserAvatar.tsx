
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const UserAvatar = ({ 
  src, 
  name, 
  size = "md",
  className 
}: UserAvatarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-24 h-24 text-xl",
    lg: "w-32 h-32 text-3xl"
  };

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden flex items-center justify-center bg-primary/10 border-2 border-primary/20",
      sizeClasses[size],
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5 animate-pulse">
          <span className="text-primary/40 font-medium">{initials}</span>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <span className="text-primary/80 font-medium">{initials}</span>
        </div>
      )}
      
      <img
        src={src}
        alt={`${name}'s avatar`}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          isLoading || hasError ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default UserAvatar;
