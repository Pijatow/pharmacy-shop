"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { logoutUser } from "@/lib/auth";

export function AuthNav() {
  const { accessToken, refreshToken, logout } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const handleLogout = async () => {
    if (refreshToken) {
      await logoutUser(refreshToken);
    }
    logout(); // This clears the state on the frontend
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="hover:text-[color:var(--color-brand)] transition-colors"
      >
        خروج
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="hover:text-[color:var(--color-brand)] transition-colors"
      >
        ورود
      </Link>
      <Link
        href="/register"
        className="px-3 py-1.5 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
      >
        ثبت‌نام
      </Link>
    </div>
  );
}