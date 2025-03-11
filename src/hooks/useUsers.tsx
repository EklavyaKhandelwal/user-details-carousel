
import { useState, useEffect } from "react";
import { User } from "../types/user";
import { fetchUsers } from "../services/userService";
import { toast } from "sonner";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
          setFilteredUsers(data);
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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      setCurrentIndex(0);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
    setCurrentIndex(0);
    
    if (filtered.length === 0) {
      toast.info("No users match your search criteria.");
    }
  }, [searchTerm, users]);

  const currentUser = filteredUsers[currentIndex];

  const goToNextUser = () => {
    if (currentIndex < filteredUsers.length - 1) {
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    users,
    filteredUsers,
    currentUser,
    currentIndex,
    loading,
    error,
    direction,
    searchTerm,
    handleSearch,
    goToNextUser,
    goToPrevUser,
    totalUsers: filteredUsers.length,
  };
}
