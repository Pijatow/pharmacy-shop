"use client";

import { create } from "zustand";

export type CartLineItem = {
  id: string;
  product: Record<string, unknown>;
  quantity: number;
  unitPrice: number | null;
};

type CartState = {
  items: Record<string, CartLineItem>;
  add: (product: Record<string, unknown>, unitPrice?: number | null, qty?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: {},
  add: (product, unitPrice = null, qty = 1) =>
    set((state) => {
      let safeId: string;
      if (product && typeof product === "object" && "id" in product) {
        const maybeId = (product as { id: unknown }).id;
        safeId = typeof maybeId === "string" || typeof maybeId === "number" ? String(maybeId) : JSON.stringify(product);
      } else {
        safeId = JSON.stringify(product);
      }
      const existing = state.items[safeId];
      const nextQty = (existing?.quantity ?? 0) + qty;
      return {
        items: {
          ...state.items,
          [safeId]: {
            id: safeId,
            product,
            unitPrice:
              unitPrice ??
              (product && typeof product === "object" && "price" in product
                ? (typeof (product as { price: unknown }).price === "number"
                    ? ((product as { price: number }).price)
                    : null)
                : null),
            quantity: nextQty,
          },
        },
      };
    }),
  remove: (id) =>
    set((state) => {
      const next = { ...state.items };
      delete next[id];
      return { items: next };
    }),
  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const next = { ...state.items };
        delete next[id];
        return { items: next };
      }
      const existing = state.items[id];
      if (!existing) return state;
      return {
        items: {
          ...state.items,
          [id]: { ...existing, quantity },
        },
      };
    }),
  clear: () => set({ items: {} }),
}));

export function calculateTotals(items: Record<string, CartLineItem>): {
  subtotal: number;
  itemCount: number;
} {
  let subtotal = 0;
  let itemCount = 0;
  for (const item of Object.values(items)) {
    itemCount += item.quantity;
    if (typeof item.unitPrice === "number") {
      subtotal += item.unitPrice * item.quantity;
    }
  }
  return { subtotal, itemCount };
}


