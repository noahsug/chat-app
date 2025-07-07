"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getUserData, setUserData as saveUserData } from "@/utils/username";

interface UserData {
  username: string;
  color: string;
}

interface UserContextType {
  userData: UserData;
  updateUsername: (newUsername: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

/**
 * User context provider that manages username and color globally
 * Handles localStorage persistence and provides shared state across components
 */
export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>({ username: "", color: "" });
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    setIsLoading(false);
  }, []);

  // Update username and persist to localStorage
  const updateUsername = (newUsername: string) => {
    const newData = { ...userData, username: newUsername };
    setUserData(newData);
    saveUserData(newData.username, newData.color);
  };

  return (
    <UserContext.Provider value={{ userData, updateUsername, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook to access user context
 * Throws error if used outside UserProvider
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}