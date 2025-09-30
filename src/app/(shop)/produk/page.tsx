import Link from "next/link";

import { Package } from "lucide-react";

const LIST_PRODUCTS = [
  { name: "Paracetamol 500mg", href: "/produk/paracetamol-500mg", price: "Rp12.500" },
  { name: "Vitamin C 1000mg", href: "/produk/vitamin-c-1000mg", price: "Rp35.000" },
  { name: "Hand Sanitizer 60ml", href: "/produk/hand-sanitizer-60ml", price: "Rp18.000" },
];

export default function ProdukList() {
  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Semua produk</h1>
        <p className="text-sm text-muted-foreground">
          Jelajahi rekomendasi terbaik hari ini.
        </p>
      </header>
      <ul className="grid gap-3">
        {LIST_PRODUCTS.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-4 border border-border/70 bg-card rounded-none p-5 text-sm font-semibold shadow-sm transition hover:border-brand"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-muted">
                  <Package className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <span>{item.name}</span>
              </div>
              <span className="text-brand">{item.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
