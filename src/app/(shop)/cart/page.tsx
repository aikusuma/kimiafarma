"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, totals, shipping } = useCart();

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Keranjang</h1>
        <p className="text-sm text-muted-foreground">
          Periksa kembali produk sebelum checkout.
        </p>
      </header>

      {items.length === 0 ? (
        <section className="border border-border/70 bg-card rounded-none p-5 text-sm text-muted-foreground shadow-sm">
          Keranjangmu masih kosong. Tambah produk dari halaman beranda untuk mulai belanja.
        </section>
      ) : (
        <>
          <ul className="grid gap-3">
            {items.map((item) => (
              <li key={item.sku} className="border border-border/70 bg-card rounded-none p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-muted">
                      <span className="text-sm font-semibold">{item.qty}x</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Rp{item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    Rp{(item.price * item.qty).toLocaleString("id-ID")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <section className="space-y-2 border border-border/70 bg-card rounded-none p-5 shadow-sm text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal produk</span>
              <span className="font-semibold">
                Rp{totals.itemsTotal.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>
                Pengiriman ({shipping.provider} · {shipping.service})
              </span>
              <span>Rp{shipping.cost.toLocaleString("id-ID")}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Kurir {shipping.provider} akan menjemput di {shipping.pickup} dan mengantar ke {shipping.destination} (ETA {shipping.eta}).
            </p>
          </section>
        </>
      )}

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="flex w-full max-w-[500px] flex-col gap-3 border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <span>Total bayar</span>
            <span className="text-lg font-semibold">
              Rp{totals.grandTotal.toLocaleString("id-ID")}
            </span>
          </div>
          <Button asChild fullWidth size="lg" disabled={items.length === 0}>
            <Link href="/checkout">Lanjut ke Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
