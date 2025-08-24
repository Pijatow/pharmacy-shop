"use client";

import { useCartStore } from "@/store/cart";
import { inferProductFields } from "@/lib/infer";

export function AddToCartButton({
  product,
}: {
  product: Record<string, unknown>;
}) {
  const add = useCartStore((s) => s.add);
  const p = inferProductFields(product);
  return (
    <button
      className="px-3 py-2 rounded-md text-white font-medium hover:opacity-90 active:opacity-80 bg-[color:var(--color-brand)]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(product, p.price ?? null, 1);
      }}
    >
      Add to cart
    </button>
  );
}


