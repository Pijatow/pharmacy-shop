"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export function AuthNav() {
  const { accessToken, logout } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const handleLogout = () => {
    // Here we will add the call to the revoke token endpoint later
    logout();
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
