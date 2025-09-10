"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { getMe } from "@/lib/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        // Log the error for debugging, which resolves the 'no-unused-vars' warning
        console.error("No valid session found on initial load:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    checkUserSession();
  }, [setUser, logout]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
