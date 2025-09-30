"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function FloatingHeader() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="w-full px-4 pt-[calc(env(safe-area-inset-top)+16px)] pb-4">
      <div className="flex h-12 w-full items-center justify-between bg-card">
        <Image src="/logo.png" alt="Kimia Farma" width={88} height={20} priority />
        
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link 
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded border border-border/60 bg-muted transition hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Notifications Link */}
          <Link 
            href="/notifikasi"
            className="flex h-9 w-9 items-center justify-center rounded border border-border/60 bg-muted transition hover:border-brand hover:text-brand"
            aria-label="Notifikasi dan Pencarian"
          >
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
