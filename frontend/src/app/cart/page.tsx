"use client";

import Link from "next/link";
import { useCartStore, calculateTotals } from "@/store/cart";
import { inferProductFields } from "@/lib/infer";
import { formatTomans } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const { subtotal, itemCount } = calculateTotals(items);

  const entries = Object.values(items);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[color:var(--color-brand)]">
        سبد خرید
      </h1>
      {entries.length === 0 ? (
        <div className="text-sm">
          سبد خرید شما خالی است.{" "}
          <Link href="/products" className="underline">
            مشاهده محصولات
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="border rounded-lg">
            {entries.map((entry, index) => {
              const p = inferProductFields(entry.product);
              const isLastItem = index === entries.length - 1;
              return (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 ${
                    isLastItem ? "" : "border-b"
                  }`}
                >
                  <div className="flex-grow">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm opacity-80">
                      {typeof entry.unitPrice === "number"
                        ? formatTomans(entry.unitPrice)
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => setQuantity(entry.id, entry.quantity + 1)}
                    >
                      +
                    </button>
                    <div className="w-8 text-center text-sm">
                      {entry.quantity}
                    </div>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() =>
                        setQuantity(entry.id, Math.max(0, entry.quantity - 1))
                      }
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => remove(entry.id)}
                  >
                    حذف
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Summary & Actions */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-80">
                تعداد کالاها: {itemCount}
              </span>
              <span className="font-semibold text-[color:var(--color-brand)]">
                جمع کل: {formatTomans(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/checkout"
                className="px-6 py-2 rounded text-white font-semibold bg-[color:var(--color-brand)]"
              >
                ادامه فرآیند خرید
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
