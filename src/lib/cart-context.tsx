"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { calculateTotals, demoOrder, type CartItem } from "@/lib/demo-order";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  clear: () => void;
  shipping: typeof demoOrder.shipping;
  totals: ReturnType<typeof calculateTotals>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(demoOrder.items);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const qty = item.qty ?? 1;
      const existing = prev.find((p) => p.sku === item.sku);
      if (existing) {
        return prev.map((p) =>
          p.sku === item.sku ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const clear = () => setItems([]);

  const totals = useMemo(
    () => calculateTotals({ items, shippingCost: demoOrder.shipping.cost }),
    [items]
  );

  const value: CartContextValue = useMemo(
    () => ({ items, addItem, clear, shipping: demoOrder.shipping, totals }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
