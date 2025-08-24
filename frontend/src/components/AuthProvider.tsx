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
        // If getMe fails (e.g., 401 error), it means no valid session
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    checkUserSession();
  }, [setUser, logout]);

  // Optional: You can show a loading spinner for the whole app
  // while the session is being checked. For now, we'll just show nothing.
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
