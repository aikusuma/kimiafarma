import Link from "next/link";

import { RecommendedCarousel } from "@/components/recommended-carousel";
import { AutoSlider } from "@/components/auto-slider";
import { Footer } from "@/components/footer";
import { auth } from "@/lib/auth";
import {
  Apple,
  Baby,
  CreditCard,
  Gift,
  HeartPulse,
  Pill as PillIcon,
  Sparkles,
  TestTube,
  Tag,
} from "lucide-react";

const CATEGORIES = [
  { name: "Konsul Dokter", href: "/konsul", icon: HeartPulse },
  { name: "Vitamin", href: "/kategori/vitamin", icon: PillIcon },
  { name: "Ibu & Anak", href: "/kategori/ibu-anak", icon: Baby },
  { name: "Kecantikan", href: "/kategori/kecantikan", icon: Sparkles },
  { name: "Alat Kesehatan", href: "/kategori/alat-kesehatan", icon: HeartPulse },
  { name: "Nutrisi", href: "/kategori/nutrisi", icon: Apple },
];

const RECOMMENDED_PRODUCTS = [
  { sku: "SKU-A", name: "Paracetamol 500mg", price: 12500, href: "/produk/paracetamol-500mg" },
  { sku: "SKU-B", name: "Vitamin C 1000mg", price: 35000, href: "/produk/vitamin-c-1000mg" },
  { sku: "SKU-D", name: "Omega 3 Fish Oil", price: 92000, href: "/produk/omega-3" },
  { sku: "SKU-E", name: "Obat Batuk Herbal", price: 46000, href: "/produk/obat-batuk-herbal" },
  { sku: "SKU-F", name: "Masker KF94 (10 pcs)", price: 55000, href: "/produk/masker-kf94" },
  { sku: "SKU-G", name: "Electrolyte Drink", price: 28000, href: "/produk/electrolyte-drink" },
];

const PROMOS = [
  {
    title: "Diskon Flu Season",
    description: "Hemat 20% untuk paket imun booster",
    href: "/promo",
    icon: Tag,
  },
  {
    title: "Gratis Ongkir",
    description: "Belanja minimal Rp150rb, khusus app",
    href: "/promo",
    icon: Gift,
  },
  {
    title: "Cashback Kartu Kredit",
    description: "Diskon 10% hingga Rp30rb untuk BIN pilihan",
    href: "/promo",
    icon: CreditCard,
  },
];

const NEWS = [
  {
    title: "Gerai baru buka di Bandung",
    summary: "Nikmati layanan konsultasi klinik & apotek terintegrasi.",
    accent: "from-brand/20 via-brand/10 to-transparent",
  },
  {
    title: "Vaksin influenza diskon 15%",
    summary: "Program berlangsung sepanjang Oktober di 50 cabang.",
    accent: "from-brand/25 via-orange-200/40 to-transparent",
  },
  {
    title: "Promo cek kesehatan lengkap",
    summary: "Paket hemat kimia farma lab untuk keluarga.",
    accent: "from-brand/18 via-blue-200/40 to-transparent",
  },
];

const SLIDER_IMAGES = [
  "/slider1.png",
  "/slider2.png", 
  "/slider3.png"
];

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-6 px-5 md:px-8">
      <header className="space-y-1.5 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
        <h1 className="text-2xl font-semibold tracking-tight">
          Belanja sehat lebih mudah
        </h1>
      </header>

      <section
        className="relative h-44 overflow-hidden rounded border border-border/60 bg-card shadow-sm animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <AutoSlider 
          images={SLIDER_IMAGES}
          interval={5000}
          className="h-full"
        >
          <h2 className="text-lg font-semibold">Koleksi Terbaru Kimia Farma</h2>
          <p className="text-xs opacity-80">
            Tebus resep dokter, konsultasi, hingga promo vitamin dalam satu aplikasi.
          </p>
        </AutoSlider>
      </section>

      <section
        className="grid grid-cols-3 gap-3 animate-fade-in-up"
        style={{ animationDelay: "180ms" }}
      >
        {CATEGORIES.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center gap-1 rounded border border-border/70 bg-card p-3 text-center text-xs font-semibold shadow-sm transition hover:border-brand"
            style={{ animationDelay: `${200 + index * 40}ms` }}
          >
            <category.icon className="h-5 w-5 text-brand" aria-hidden="true" />
            {category.name}
          </Link>
        ))}
      </section>

      <section
        className="space-y-4 animate-fade-in-up"
        style={{ animationDelay: "220ms" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Rekomendasi untukmu</h2>
          <Link href="/produk" className="text-sm font-semibold text-brand">
            Lihat semua
          </Link>
        </div>
        <RecommendedCarousel products={RECOMMENDED_PRODUCTS} />
      </section>

      <section
        className="space-y-4 animate-fade-in-up"
        style={{ animationDelay: "320ms" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Promo hari ini</h2>
          <Link href="/promo" className="text-sm font-semibold text-brand">
            Lihat semua
          </Link>
        </div>
        <div className="grid gap-3">
          {PROMOS.map((promo, index) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="flex items-start gap-3 rounded border border-border/70 bg-card p-4 shadow-sm transition hover:border-brand animate-scale-in"
              style={{ animationDelay: `${360 + index * 50}ms` }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
                <promo.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-brand">{promo.title}</p>
                <p className="text-xs text-muted-foreground">{promo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="space-y-3 animate-fade-in-up"
        style={{ animationDelay: "420ms" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Berita Kimia Farma</h2>
          <span className="text-xs font-semibold text-brand">Selengkapnya</span>
        </div>
        <div className="overflow-hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {NEWS.map((news, index) => (
              <article
                key={news.title}
                className="min-w-[75%] snap-center rounded border border-border/70 bg-card shadow-sm animate-scale-in"
                style={{ animationDelay: `${460 + index * 60}ms` }}
              >
                <div className={`h-32 w-full rounded-t bg-gradient-to-r ${news.accent}`} />
                <div className="space-y-1 p-4">
                  <p className="text-sm font-semibold">{news.title}</p>
                  <p className="text-xs text-muted-foreground">{news.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
