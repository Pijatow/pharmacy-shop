"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/types"; // Import the new User type

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null; // Use the User type here
    setTokens: (access: string, refresh: string) => void;
    setUser: (user: User | null) => void; // And here
    logout: () => void;
};

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            setTokens: (access, refresh) =>
                set({ accessToken: access, refreshToken: refresh }),
            setUser: (user) => set({ user }),
            logout: () => set({ accessToken: null, refreshToken: null, user: null }),
        }),
        {
            name: "shiraz-daru-auth",
        }
    )
);