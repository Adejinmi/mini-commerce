"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/components/ProductCard";

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  hydrated: boolean;
  setHydrated: () => void;
  add: (item: Product) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      add: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      remove: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),

      updateQty: (id, qty) =>
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          ),
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.();
      },
    }
  )
);
