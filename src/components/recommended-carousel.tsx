"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export type RecommendedProduct = {
  sku: string;
  name: string;
  price: number;
  href: string;
};

export function RecommendedCarousel({
  products,
}: {
  products: RecommendedProduct[];
}) {
  const { addItem } = useCart();
  const [recentSku, setRecentSku] = useState<string | null>(null);

  const handleAdd = useCallback(
    (product: RecommendedProduct) => {
      addItem({ sku: product.sku, name: product.name, price: product.price });
      setRecentSku(product.sku);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.85 },
      });
      setTimeout(() => setRecentSku(null), 1500);
    },
    [addItem]
  );

  return (
    <div className="-mx-5 px-5">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product, index) => {
          const isHighlighted = recentSku === product.sku;
          return (
            <div
              key={product.sku}
              className={`flex min-w-[240px] max-w-[240px] flex-col justify-between rounded-lg border border-border/70 bg-card p-4 shadow-sm transition animate-scale-in snap-start ${
                isHighlighted ? "ring-2 ring-brand" : ""
              }`}
              style={{ animationDelay: `${260 + index * 60}ms` }}
            >
              <div className="space-y-3">
                <div className="space-y-2">
                  <Link href={product.href} className="text-sm font-semibold hover:text-brand transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-lg font-bold text-brand">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <Button size="sm" onClick={() => handleAdd(product)} className="w-full">
                  Tambah ke Keranjang
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
