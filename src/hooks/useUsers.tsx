
import { useState, useEffect } from "react";
import { User } from "../types/user";
import { fetchUsers } from "../services/userService";
import { toast } from "sonner";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        
        if (data.length === 0) {
          setError("No users found. Please try again later.");
          toast.error("No users found.");
        } else {
          setUsers(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const currentUser = users[currentIndex];

  const goToNextUser = () => {
    if (currentIndex < users.length - 1) {
      setDirection('next');
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      toast.info("You've reached the last user.");
    }
  };

  const goToPrevUser = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else {
      toast.info("You're at the first user.");
    }
  };

  return {
    users,
    currentUser,
    currentIndex,
    loading,
    error,
    direction,
    goToNextUser,
    goToPrevUser,
    totalUsers: users.length,
  };
}
