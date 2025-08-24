"use client";

import Link from "next/link";
import { useCartStore, calculateTotals } from "@/store/cart";
import { inferProductFields } from "@/lib/infer";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const setQuantity = useCartStore((s) => s.setQuantity);
  // const clear = useCartStore((s) => s.clear);
  const { subtotal, itemCount } = calculateTotals(items);

  const entries = Object.values(items);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[color:var(--color-brand)]">سبد خرید</h1>
      {entries.length === 0 ? (
        <div className="text-sm">
          سبد خرید خالی است. <Link href="/products" className="underline">مشاهده محصولات</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {entries.map((entry) => {
            const p = inferProductFields(entry.product);
            return (
              <div key={entry.id} className="flex items-center justify-between border rounded-md p-3 border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40">
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs opacity-80">{typeof entry.unitPrice === "number" ? entry.unitPrice.toFixed(2) : ""}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => setQuantity(entry.id, Math.max(0, entry.quantity - 1))}>-</button>
                  <div className="w-8 text-center text-sm">{entry.quantity}</div>
                  <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => setQuantity(entry.id, entry.quantity + 1)}>+</button>
                  <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => remove(entry.id)}>Remove</button>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between border-t pt-4 mt-2">
            <div className="text-sm">Items: {itemCount}</div>
            <div className="font-semibold text-[color:var(--color-brand)]">Subtotal: {subtotal.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="px-3 py-2 border rounded border-[color:var(--color-accent)]/40">Save for later</button>
            <button className="px-3 py-2 rounded text-white font-semibold bg-[color:var(--color-brand)]">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}


