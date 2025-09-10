"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput, loginUser, getMe } from "@/lib/auth";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import axios from "axios"; // Import axios to check for axios-specific errors

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, setUser } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setErrorMessage(null);
    try {
      const { access, refresh } = await loginUser(data);
      setTokens(access, refresh);
      const userData = await getMe();
      setUser(userData);
      const nextUrl = searchParams.get("next") || "/";
      router.push(nextUrl);
    } catch (error: unknown) {
      // Changed from 'any' to 'unknown'
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage("ایمیل یا رمز عبور اشتباه است.");
      } else {
        setErrorMessage(
          "یک خطای پیش‌بینی نشده رخ داد. لطفاً دوباره تلاش کنید."
        );
      }
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-[color:var(--color-brand)]">
        ورود به حساب کاربری
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium opacity-80 mb-1"
          >
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-[color:var(--color-accent)]/40 rounded-md bg-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium opacity-80 mb-1"
          >
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-[color:var(--color-accent)]/40 rounded-md bg-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-medium hover:underline">
          ثبت نام کنید
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
