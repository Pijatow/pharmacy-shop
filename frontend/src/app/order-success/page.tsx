"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-[color:var(--color-brand)]">
        از خرید شما متشکریم!
      </h1>
      <p className="mt-3 text-lg opacity-90">سفارش شما با موفقیت ثبت شد.</p>
      {orderId && (
        <p className="mt-2 text-sm opacity-70">
          شماره سفارش شما:{" "}
          <span className="font-mono font-semibold">
            {orderId.substring(0, 8)}
          </span>
        </p>
      )}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/products"
          className="px-5 py-2 border rounded-md hover:bg-black/5"
        >
          ادامه خرید
        </Link>
        <Link
          href="/profile"
          className="px-5 py-2 bg-[color:var(--color-brand)] text-white font-semibold rounded-md hover:opacity-90"
        >
          مشاهده سفارش‌ها
        </Link>
      </div>
    </div>
  );
}

// We wrap the component in a Suspense boundary as a best practice when using useSearchParams
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
