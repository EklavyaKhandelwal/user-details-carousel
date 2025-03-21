
import { useState, useRef, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "@/components/UserCard";
import Navigation from "@/components/Navigation";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Input } from "@/components/ui/input";
import { Search, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    currentUser,
    currentIndex,
    loading,
    error,
    direction,
    searchTerm,
    handleSearch,
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
    <div className="min-h-screen flex flex-col py-8 px-4 sm:px-6 md:px-8 relative bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/40" />
        <div className="absolute top-1/4 right-1/3 h-64 w-64 rounded-full bg-pink-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute top-3/4 right-1/5 h-40 w-40 rounded-full bg-purple-200/20 blur-3xl" />
      </div>
      
      {/* App logo and search - removed gap */}
      <header className="mb-2 flex flex-col items-center animate-fade-in">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <UserRound className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">UserFinder</h1>
        </div>
        
        {/* Search bar */}
        <div className="max-w-md mx-auto w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-primary/70" />
            </div>
            <Input
              type="search"
              placeholder="Search users by name, username or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-white/50 backdrop-blur-md border-primary/10 shadow-sm focus-visible:ring-primary"
            />
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading users...' : `Showing ${totalUsers} user${totalUsers !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center mb-24">
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
          ) : totalUsers === 0 ? (
            <div className="text-center p-8 glass rounded-2xl border border-primary/20 shadow-xl max-w-md w-full mx-auto">
              <p className="text-lg font-medium mb-2">No matching users found</p>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : null}
        </div>
      </main>
      
      {/* Fixed navigation at bottom */}
      {!loading && !error && totalUsers > 0 && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-10 animate-fade-in">
          <Navigation
            onPrevious={goToPrevUser}
            onNext={goToNextUser}
            hasPrevious={currentIndex > 0}
            hasNext={currentIndex < totalUsers - 1}
            currentIndex={currentIndex}
            totalUsers={totalUsers}
          />
        </div>
      )}
      
      {/* App footer */}
      <footer className="mt-auto pb-4 text-center text-sm text-muted-foreground animate-fade-in">
        <p className="bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
          Designed with ❤️ for a polished user experience
        </p>
      </footer>
    </div>
  );
};

export default Index;
