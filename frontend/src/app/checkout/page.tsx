"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, createOrder, type CheckoutInput } from "@/lib/orders";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear: clearCart } = useCartStore();
  const { user, accessToken } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // Our new flag

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: (user?.email as string) ?? "",
    },
  });

  async function onSubmit(data: CheckoutInput) {
    setErrorMessage(null);
    try {
      const newOrder = await createOrder(data, items);
      setOrderPlaced(true); // Set the flag right after successful order
      clearCart();
      router.push(`/order-success?orderId=${newOrder.id}`);
    } catch (error) {
      setErrorMessage("خطایی در ثبت سفارش رخ داد. لطفاً دوباره تلاش کنید.");
      console.error("Order creation failed:", error);
    }
  }

  if (!isClient) {
    return <div className="text-center p-10">در حال بارگذاری...</div>;
  }

  if (!accessToken) {
    router.replace("/login?next=/checkout");
    return (
      <div className="text-center p-10">در حال انتقال به صفحه ورود...</div>
    );
  }

  // The crucial change: also check if an order has been placed
  if (Object.keys(items).length === 0 && !isSubmitting && !orderPlaced) {
    router.replace("/cart");
    return (
      <div className="text-center p-10">
        سبد خرید شما خالی است. در حال انتقال...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-[color:var(--color-brand)]">
        تکمیل اطلاعات و پرداخت
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium mb-1"
            >
              نام
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className="w-full p-2 border rounded-md"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium mb-1"
            >
              نام خانوادگی
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className="w-full p-2 border rounded-md"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium mb-1"
          >
            شماره تماس
          </label>
          <input
            id="phone_number"
            {...register("phone_number")}
            className="w-full p-2 border rounded-md"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            آدرس
          </label>
          <textarea
            id="address"
            {...register("address")}
            className="w-full p-2 border rounded-md"
            rows={3}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="post_code" className="block text-sm font-medium mb-1">
            کد پستی
          </label>
          <input
            id="post_code"
            {...register("post_code")}
            className="w-full p-2 border rounded-md"
          />
          {errors.post_code && (
            <p className="text-red-500 text-xs mt-1">
              {errors.post_code.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت سفارش..." : "ثبت سفارش"}
        </button>
      </form>
    </div>
  );
}
