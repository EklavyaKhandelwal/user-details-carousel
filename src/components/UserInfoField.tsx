
import { cn } from "@/lib/utils";

interface UserInfoFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

const UserInfoField = ({
  label,
  value,
  icon,
  className,
}: UserInfoFieldProps) => {
  return (
    <div className={cn(
      "flex flex-col space-y-1 animate-slide-up",
      className
    )}>
      <div className="flex items-center space-x-2">
        {icon && <span className="text-primary/70">{icon}</span>}
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="text-sm font-medium text-foreground truncate">{value}</p>
    </div>
  );
};

export default UserInfoField;
