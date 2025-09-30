import Link from "next/link";

import {
  Baby,
  HeartPulse,
  Pill,
  Search,
  Sparkles,
  Syringe,
  TestTube,
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Vitamin & Suplemen",
    slug: "vitamin",
    description: "Imunitas, multivitamin, herbal",
    icon: Pill,
  },
  {
    name: "Resep Dokter",
    slug: "resep-dokter",
    description: "Tebus cepat obat resep",
    icon: Syringe,
  },
  {
    name: "Ibu & Anak",
    slug: "ibu-anak",
    description: "Kehamilan, nutrisi, perawatan",
    icon: Baby,
  },
  {
    name: "Kecantikan",
    slug: "kecantikan",
    description: "Skincare, kosmetik, perawatan diri",
    icon: Sparkles,
  },
  {
    name: "Alat Kesehatan",
    slug: "alat-kesehatan",
    description: "Tensimeter, oksimeter, kursi roda",
    icon: HeartPulse,
  },
  {
    name: "Laboratorium",
    slug: "lab",
    description: "Layanan cek kesehatan & diagnostik",
    icon: TestTube,
  },
];

export default function KategoriLanding() {
  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      <section className="animate-fade-in-up space-y-4 rounded border border-border/60 bg-brand/10 p-5 shadow-sm" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-brand text-white">
            <Search className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Telusuri kategori</h1>
            <p className="text-xs text-brand-foreground/70">
              Pilih layanan sesuai kebutuhan kesehatanmu hari ini.
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Cari vitamin, obat resep, hingga layanan laboratorium dalam satu tampilan. Semua kategori dikurasi langsung oleh Apotek Kimia Farma.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((category, index) => (
          <Link
            key={category.slug}
            href={`/kategori/${category.slug}`}
            className="flex flex-col gap-2 border border-border/70 bg-card rounded-none p-4 shadow-sm transition hover:border-brand animate-scale-in"
            style={{ animationDelay: `${120 + index * 40}ms` }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded bg-brand/15 text-brand">
              <category.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{category.name}</p>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
            <span className="text-xs font-semibold text-brand">Jelajahi</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
