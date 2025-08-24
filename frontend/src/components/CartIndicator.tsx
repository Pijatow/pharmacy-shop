"use client";

import { useCartStore, calculateTotals } from "@/store/cart";
import Link from "next/link";

export function CartIndicator() {
  const items = useCartStore((s) => s.items);
  const { itemCount } = calculateTotals(items);

  return (
    <Link
      href="/cart"
      className="hover:text-[color:var(--color-brand)] transition-colors"
    >
      سبد خرید{itemCount > 0 ? ` (${itemCount})` : ""}
    </Link>
  );
}
