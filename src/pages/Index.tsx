
import { useState, useRef, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";
import Navigation from "@/components/Navigation";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    currentUser,
    currentIndex,
    loading,
    error,
    direction,
    goToNextUser,
    goToPrevUser,
    totalUsers,
  } = useUsers();

  const [prevUser, setPrevUser] = useState(currentUser);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentUser && currentUser !== prevUser) {
      setIsAnimating(true);
      setPrevUser(currentUser);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this with your animation duration
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentUser, prevUser]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col py-12 px-4 sm:px-6 md:px-8">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10" />
        <div className="absolute top-0 right-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl opacity-70" />
      </div>
      
      {/* App header */}
      <header className="text-center mb-8 animate-fade-in">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-2">
          User Database
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          User Details Explorer
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Browse through our database of users with seamless navigation
        </p>
      </header>
      
      <main className="flex-1 flex flex-col items-center">
        {/* User card container with animation state */}
        <div className="relative w-full max-w-md mb-8 h-[460px] flex items-center justify-center">
          {loading ? (
            <LoadingState className="animate-fade-in" />
          ) : error ? (
            <ErrorState 
              message={error} 
              onRetry={handleRetry} 
              className="animate-fade-in" 
            />
          ) : currentUser ? (
            <div className="relative w-full">
              <UserCard
                user={currentUser}
                className={cn(
                  "absolute inset-0",
                  isAnimating && direction === 'next' ? "animate-slide-in-right" : "",
                  isAnimating && direction === 'prev' ? "animate-slide-in-left" : "",
                )}
              />
            </div>
          ) : null}
        </div>
        
        {/* Navigation controls */}
        {!loading && !error && (
          <Navigation
            onPrevious={goToPrevUser}
            onNext={goToNextUser}
            hasPrevious={currentIndex > 0}
            hasNext={currentIndex < totalUsers - 1}
            currentIndex={currentIndex}
            totalUsers={totalUsers}
            className="animate-fade-in"
          />
        )}
      </main>
      
      {/* App footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
        <p>
          Designed with minimalist principles inspired by Apple
        </p>
      </footer>
    </div>
  );
};

export default Index;
