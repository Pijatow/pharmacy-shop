"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput, registerUser } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setErrorMessage(null);
    try {
      await registerUser(data);
      // On successful registration, redirect to the login page
      router.push("/login");
    } catch (error: any) {
      // Handle potential errors from the server
      if (error.response?.data) {
        // You can make this more specific based on your DRF error format
        const serverErrors = error.response.data;
        const messages = Object.values(serverErrors).flat();
        setErrorMessage(messages.join(" "));
      } else {
        setErrorMessage(
          "یک خطای پیش‌بینی نشده رخ داد. لطفاً دوباره تلاش کنید."
        );
      }
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-[color:var(--color-brand)]">
        ساخت حساب کاربری
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium opacity-80 mb-1"
          >
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="w-full px-3 py-2 border border-[color:var(--color-accent)]/40 rounded-md bg-transparent"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
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
        <div>
          <label
            htmlFor="password2"
            className="block text-sm font-medium opacity-80 mb-1"
          >
            تکرار رمز عبور
          </label>
          <input
            id="password2"
            type="password"
            {...register("password2")}
            className="w-full px-3 py-2 border border-[color:var(--color-accent)]/40 rounded-md bg-transparent"
          />
          {errors.password2 && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password2.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        حساب کاربری دارید؟{" "}
        <Link href="/login" className="font-medium hover:underline">
          وارد شوید
        </Link>
      </p>
    </div>
  );
}
