
import { User } from "@/types/user";
import UserAvatar from "./UserAvatar";
import UserInfoField from "./UserInfoField";
import { AtSign, Briefcase, Home, Key, Mail, Phone, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface UserCardProps {
  user: User;
  className?: string;
  style?: React.CSSProperties;
}

const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  ({ user, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "glass p-6 rounded-2xl shadow-lg max-w-md w-full mx-auto",
          "border border-white/20 backdrop-blur-lg",
          "transition-all duration-500 ease-out",
          className
        )} 
        {...props}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar and name section */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <div 
              className="relative p-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/40"
              style={{ 
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)"
              }}
            >
              <UserAvatar 
                src={user.avatar} 
                name={`${user.first_name} ${user.last_name}`} 
                size="lg"
              />
            </div>
            
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* User details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <UserInfoField 
              label="Email" 
              value={user.email} 
              icon={<Mail size={16} />}
              className="animate-delayed"
              style={{ "--delay": "100ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="Phone" 
              value={user.phone_number} 
              icon={<Phone size={16} />}
              className="animate-delayed"
              style={{ "--delay": "150ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="ID" 
              value={user.id.toString()} 
              icon={<UserIcon size={16} />}
              className="animate-delayed"
              style={{ "--delay": "200ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="UID" 
              value={user.uid} 
              icon={<AtSign size={16} />}
              className="animate-delayed"
              style={{ "--delay": "250ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="Password" 
              value={user.password} 
              icon={<Key size={16} />}
              className="animate-delayed"
              style={{ "--delay": "300ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="Job" 
              value={user.employment.title} 
              icon={<Briefcase size={16} />}
              className="animate-delayed"
              style={{ "--delay": "350ms" } as React.CSSProperties}
            />
            
            <UserInfoField 
              label="Location" 
              value={`${user.address.city}, ${user.address.country}`} 
              icon={<Home size={16} />}
              className="col-span-1 md:col-span-2 animate-delayed"
              style={{ "--delay": "400ms" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    );
  }
);

UserCard.displayName = "UserCard";

export default UserCard;
