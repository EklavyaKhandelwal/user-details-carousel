
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
        "flex flex-col space-y-1.5 animate-slide-up bg-white/30 backdrop-blur-sm p-3 rounded-lg border border-white/20",
        className
      )}
      style={style}
    >
      <div className="flex items-center space-x-2">
        {icon && <span className="text-primary">{icon}</span>}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  );
};

export default UserInfoField;
