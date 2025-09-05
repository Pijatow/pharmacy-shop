"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { logoutUser } from "@/lib/auth";

export function AuthNav() {
  const { user, refreshToken, logout } = useAuthStore();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    if (refreshToken) {
      await logoutUser(refreshToken);
    }
    logout();
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/profile" className="text-sm font-medium hover:underline">
          حساب کاربری
        </Link>
        <button
          onClick={handleLogout}
          className="hover:text-[color:var(--color-brand)] transition-colors text-sm"
        >
          خروج
        </button>
      </div>
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
