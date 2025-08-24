"use client";

import { inferProductFields } from "@/lib/infer";
import { useCartStore } from "@/store/cart";

export function ProductCartControls({ product }: { product: Record<string, unknown> }) {
  const p = inferProductFields(product);
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  const productId = p.id !== null ? String(p.id) : null;
  const currentQty = productId ? items[productId]?.quantity ?? 0 : 0;

  if (!productId) {
    return null;
  }

  if (currentQty <= 0) {
    return (
      <button
        className="px-3 py-2 rounded-md text-white font-medium hover:opacity-90 active:opacity-80 bg-[color:var(--color-brand)]"
        onClick={() => add(product, p.price ?? null, 1)}
      >
        افزودن به سبد
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => setQuantity(productId, Math.max(0, currentQty - 1))}>-</button>
      <div className="w-8 text-center text-sm">{currentQty}</div>
      <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => setQuantity(productId, currentQty + 1)}>+</button>
      <button className="px-2 py-1 border rounded border-[color:var(--color-accent)]/40" onClick={() => remove(productId)}>حذف</button>
    </div>
  );
}


