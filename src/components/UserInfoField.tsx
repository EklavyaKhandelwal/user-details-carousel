
import { cn } from "@/lib/utils";
import React from "react";

interface UserInfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UserInfoField = ({
  label,
  value,
  icon,
  className,
  style,
}: UserInfoFieldProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col space-y-1.5 animate-slide-up",
        "bg-gradient-to-br from-white/70 to-white/50",
        "backdrop-blur-sm p-3.5 rounded-xl",
        "border border-white/40 shadow-sm",
        "hover:shadow-md hover:border-primary/30 transition-all duration-300",
        className
      )}
      style={style}
    >
      <div className="flex items-center space-x-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  );
};

export default UserInfoField;
