"use client";

import Link from "next/link";
import { useCartStore, calculateTotals } from "@/store/cart";

export function Header() {
  const items = useCartStore((s) => s.items);
  const { itemCount } = calculateTotals(items);

  return (
    <header className="w-full sticky top-0 z-10 border-b border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-[color:var(--color-brand)]">
          شیراز دارو
        </Link>
        <nav className="flex items-center gap-5 text-[15px] font-medium text-[color:var(--color-accent)]">
          <Link href="/collections" className="hover:text-[color:var(--color-brand)] transition-colors">
            مجموعه‌ها
          </Link>
          <Link href="/products" className="hover:text-[color:var(--color-brand)] transition-colors">
            محصولات
          </Link>
          <Link href="/cart" className="hover:text-[color:var(--color-brand)] transition-colors">
            سبد خرید{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
