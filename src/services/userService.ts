
import { User } from "../types/user";
import { toast } from "sonner";

const API_URL = "https://random-data-api.com/api/users/random_user?size=80";

/**
 * Fetches users from the Random Data API
 * @returns Promise with an array of users
 */
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users. Please try again later.");
    return [];
  }
};
