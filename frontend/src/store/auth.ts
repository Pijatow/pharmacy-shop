"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: Record<string, unknown> | null;
    setTokens: (access: string, refresh: string) => void;
    setUser: (user: Record<string, unknown> | null) => void;
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
            name: "shiraz-daru-auth", // unique name for localStorage key
        }
    )
);