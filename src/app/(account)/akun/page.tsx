"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import {
  BadgeCheck,
  LogIn,
  LogOut,
  MapPin,
  Medal,
  Package,
  Pill,
  Truck,
} from "lucide-react";

export default function AkunPage() {
  const { data: session } = useSession();
  const { items, totals, shipping } = useCart();

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Akun Saya</h1>
        <p className="text-sm text-muted-foreground">
          Kelola pesanan, resep, loyalty, dan alamat pengiriman.
        </p>
      </header>

      <section className="flex items-start gap-3 border border-border/70 bg-card rounded-none p-5 text-sm shadow-sm">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">{session?.user?.name ?? "Tamu"}</p>
          <p className="text-xs text-muted-foreground">
            {session?.user?.email ?? "Belum masuk"}
          </p>
        </div>
      </section>

      <section className="space-y-3 border border-border/70 bg-card rounded-none p-5 shadow-sm text-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Pesanan aktif</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>{items.length} item akan dikirim lewat {shipping.provider} ({shipping.service})</p>
              <p>
                {shipping.pickup} → {shipping.destination}
              </p>
              <p>Tracking: {shipping.trackingId}</p>
              <p>Total bayar: Rp{totals.grandTotal.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>
        <Link href="/checkout" className="text-xs font-semibold text-brand">
          Lihat detail pesanan
        </Link>
      </section>

      <ul className="grid gap-3 text-sm">
        <li>
          <Link
            href="/orders"
            className="flex items-center gap-3 border border-border/70 bg-card rounded-none p-5 shadow-sm transition hover:border-brand"
          >
            <Package className="h-5 w-5 text-brand" aria-hidden="true" />
            Riwayat Pesanan
          </Link>
        </li>
        <li>
          <Link
            href="/resep/status/draft-123"
            className="flex items-center gap-3 border border-border/70 bg-card rounded-none p-5 shadow-sm transition hover:border-brand"
          >
            <Pill className="h-5 w-5 text-brand" aria-hidden="true" />
            Resep Saya
          </Link>
        </li>
        <li>
          <Link
            href="/loyalty"
            className="flex items-center gap-3 border border-border/70 bg-card rounded-none p-5 shadow-sm transition hover:border-brand"
          >
            <Medal className="h-5 w-5 text-brand" aria-hidden="true" />
            Poin &amp; Loyalty
          </Link>
        </li>
        <li>
          <Link
            href="/alamat"
            className="flex items-center gap-3 border border-border/70 bg-card rounded-none p-5 shadow-sm transition hover:border-brand"
          >
            <MapPin className="h-5 w-5 text-brand" aria-hidden="true" />
            Alamat Tersimpan
          </Link>
        </li>
      </ul>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          {session ? (
            <Button asChild variant="outline" fullWidth size="lg">
              <Link href="/api/auth/signout?callbackUrl=/auth/signin" prefetch={false}>
                <span className="flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
                </span>
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" fullWidth size="lg">
              <Link href="/auth/signin" prefetch={false}>
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" aria-hidden="true" /> Masuk
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
