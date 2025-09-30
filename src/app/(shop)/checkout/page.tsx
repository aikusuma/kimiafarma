"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, totals, shipping } = useCart();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      router.push("/checkout/success");
    }, 1800);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          Lengkapi alamat, metode bayar, dan pengiriman untuk menyelesaikan pesanan.
        </p>
      </header>

      <section className="space-y-2 border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Alamat Pengiriman</p>
            <p className="text-xs text-muted-foreground">
              {shipping.pickup} → {shipping.destination}
            </p>
          </div>
          <button type="button" className="text-xs font-semibold text-brand">
            Ubah
          </button>
        </div>
        <div className="rounded bg-muted p-3 text-xs text-muted-foreground">
          Kurir {shipping.provider} akan menjemput pesanan dan mengantar dalam {shipping.eta}.
        </div>
      </section>

      <section className="border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <p className="text-sm font-semibold">Metode Pembayaran</p>
        <ul className="mt-3 space-y-3 text-sm">
          {["GoPay", "Kartu Kredit", "Transfer VA"].map((method) => (
            <li key={method} className="flex items-center justify-between">
              <span>{method}</span>
              <input
                type="radio"
                name="payment"
                defaultChecked={method === "GoPay"}
                className="h-4 w-4 accent-brand"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 border border-border/70 bg-card rounded-none p-5 shadow-sm text-sm">
        <div className="flex items-center justify-between">
          <span>Subtotal produk ({items.length} item)</span>
          <span>Rp{totals.itemsTotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Pengiriman ({shipping.provider})</span>
          <span>Rp{shipping.cost.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-brand">
          <span>Total bayar</span>
          <span>Rp{totals.grandTotal.toLocaleString("id-ID")}</span>
        </div>
      </section>

      <section className="space-y-2 border border-border/70 bg-card rounded-none p-5 text-sm shadow-sm">
        <p className="font-semibold">Pelacakan kurir</p>
        <p className="text-xs text-muted-foreground">
          Driver {shipping.provider}: {shipping.driver.name} ({shipping.driver.contact})
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>ID tracking</span>
          <span className="font-semibold text-brand">{shipping.trackingId}</span>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur">
          <p className="text-xs text-muted-foreground">
            Dengan menekan tombol ini kamu menyetujui syarat & ketentuan Kimia Farma.
          </p>
          <Button fullWidth size="lg" disabled={processing || items.length === 0} onClick={handlePayment}>
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Memproses pembayaran...
              </span>
            ) : (
              "Bayar Sekarang"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
