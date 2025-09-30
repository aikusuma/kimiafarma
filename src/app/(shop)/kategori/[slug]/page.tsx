"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  type LucideIcon,
  Apple,
  Baby,
  HeartPulse,
  Package as PackageIcon,
  Pill,
  Sparkles,
  Syringe,
  TestTube,
} from "lucide-react";

const CATEGORY_CONTENT: Record<
  string,
  {
    title: string;
    description: string;
    tips: string;
    icon: LucideIcon;
    products: {
      id: string;
      name: string;
      price: number;
      originalPrice?: number;
      description: string;
      image: string;
      rating: number;
      reviews: number;
      inStock: boolean;
    }[];
  }
> = {
  vitamin: {
    title: "Vitamin & Suplemen",
    description: "Jaga daya tahan tubuh dengan multivitamin terkurasi Kimia Farma.",
    tips: "Konsultasikan kebutuhan suplemen dengan apoteker kami sebelum checkout.",
    icon: Pill,
    products: [
      {
        id: "vitamin-c-1000mg",
        name: "Vitamin C 1000mg Strip 10 Tablet",
        price: 35000,
        originalPrice: 42000,
        description: "Vitamin C dosis tinggi untuk meningkatkan daya tahan tubuh dan menjaga kesehatan kulit",
        image: "/logo.png",
        rating: 4.8,
        reviews: 245,
        inStock: true
      },
      {
        id: "vitamin-d3-1000",
        name: "Vitamin D3 1000IU Softgel 30 Kapsul",
        price: 58000,
        description: "Vitamin D3 untuk kesehatan tulang dan sistem imun tubuh",
        image: "/logo.png",
        rating: 4.7,
        reviews: 189,
        inStock: true
      },
      {
        id: "multivitamin-keluarga",
        name: "Multivitamin Keluarga 60 Tablet",
        price: 85000,
        originalPrice: 98000,
        description: "Multivitamin lengkap untuk semua anggota keluarga",
        image: "/logo.png",
        rating: 4.6,
        reviews: 156,
        inStock: true
      }
    ],
  },
  "ibu-anak": {
    title: "Ibu & Anak",
    description: "Mulai dari susu ibu hamil hingga perlengkapan bayi tersedia lengkap.",
    tips: "Tambah alamat rumah sakit atau bidan di profil untuk pengiriman cepat.",
    icon: Baby,
    products: [
      {
        id: "susu-ibu-hamil",
        name: "Susu Ibu Hamil Vanilla 400gr",
        price: 120000,
        description: "Susu khusus ibu hamil dengan nutrisi lengkap untuk perkembangan janin",
        image: "/logo.png",
        rating: 4.9,
        reviews: 298,
        inStock: true
      },
      {
        id: "diapers-tape-nb",
        name: "Diapers Tape Newborn 84 Pcs",
        price: 89000,
        description: "Popok bayi yang lembut dan menyerap dengan teknologi quick dry",
        image: "/logo.png",
        rating: 4.7,
        reviews: 412,
        inStock: true
      },
      {
        id: "baby-lotion",
        name: "Baby Lotion Hypoallergenic 200ml",
        price: 45000,
        originalPrice: 52000,
        description: "Lotion bayi hypoallergenic untuk kulit sensitif bayi",
        image: "/logo.png",
        rating: 4.8,
        reviews: 156,
        inStock: true
      }
    ],
  },
  kecantikan: {
    title: "Kecantikan",
    description: "Skincare klinik terpercaya, dijamin original dan tersertifikasi BPOM.",
    tips: "Aktifkan reminder pembelian ulang untuk perawatan rutinmu.",
    icon: Sparkles,
    products: [
      {
        id: "serum-bright",
        name: "Serum Brightening Vitamin C 30ml",
        price: 185000,
        description: "Serum pencerah wajah dengan vitamin C untuk kulit lebih cerah dan sehat",
        image: "/logo.png",
        rating: 4.9,
        reviews: 342,
        inStock: true
      },
      {
        id: "sunscreen-spf50",
        name: "Sunscreen SPF 50 PA+++ 50ml",
        price: 95000,
        originalPrice: 110000,
        description: "Tabir surya dengan perlindungan tinggi untuk aktivitas outdoor",
        image: "/logo.png",
        rating: 4.8,
        reviews: 278,
        inStock: true
      }
    ],
  },
  "alat-kesehatan": {
    title: "Alat Kesehatan",
    description: "Monitoring kesehatan keluarga dengan alat diagnostik yang akurat.",
    tips: "Simak video cara pakai di halaman produk sebelum mulai memakai.",
    icon: HeartPulse,
    products: [
      {
        id: "tensimeter-digital",
        name: "Tensimeter Digital Omron HEM-7120",
        price: 320000,
        description: "Tensimeter digital otomatis dengan akurasi tinggi untuk monitoring tekanan darah",
        image: "/logo.png",
        rating: 4.7,
        reviews: 89,
        inStock: true
      },
      {
        id: "pulse-oximeter",
        name: "Pulse Oximeter Digital LED",
        price: 210000,
        originalPrice: 245000,
        description: "Alat ukur saturasi oksigen dan detak jantung dengan tampilan LED",
        image: "/logo.png",
        rating: 4.6,
        reviews: 67,
        inStock: true
      }
    ],
  },
  "resep-dokter": {
    title: "Resep Dokter",
    description: "Upload resep, apoteker kami validasi & kirim dalam hitungan jam.",
    tips: "Siapkan kartu identitas pasien untuk mempercepat verifikasi.",
    icon: Syringe,
    products: [
      {
        id: "amlodipine-5mg",
        name: "Amlodipine 5mg Strip 10 Tablet",
        price: 25000,
        description: "Obat hipertensi untuk mengontrol tekanan darah tinggi (perlu resep dokter)",
        image: "/logo.png",
        rating: 4.5,
        reviews: 23,
        inStock: true
      }
    ],
  },
  nutrisi: {
    title: "Nutrisi & Diet",
    description: "Pilihan makanan sehat dan produk pengganti nutrisi harian.",
    tips: "Atur pengingat pembelian ulang untuk stok nutrisi bulanan.",
    icon: Apple,
    products: [
      {
        id: "meal-replacement",
        name: "Meal Replacement Shake Vanilla 500gr",
        price: 85000,
        description: "Pengganti makanan dengan nutrisi lengkap untuk program diet sehat",
        image: "/logo.png",
        rating: 4.4,
        reviews: 112,
        inStock: true
      },
      {
        id: "susu-low-lactose",
        name: "Susu Rendah Laktosa 1L",
        price: 95000,
        description: "Susu rendah laktosa untuk yang memiliki intoleransi laktosa",
        image: "/logo.png",
        rating: 4.6,
        reviews: 78,
        inStock: true
      }
    ],
  },
  lab: {
    title: "Layanan Laboratorium",
    description: "Tes diagnostik cepat dengan hasil terintegrasi aplikasi.",
    tips: "Booking slot pagi hari untuk mendapatkan hasil di hari yang sama.",
    icon: TestTube,
    products: [
      {
        id: "mcu-basic",
        name: "Paket Medical Check Up Basic",
        price: 550000,
        description: "Pemeriksaan kesehatan dasar lengkap dengan konsultasi dokter",
        image: "/logo.png",
        rating: 4.8,
        reviews: 45,
        inStock: true
      },
      {
        id: "tes-vitamin-d",
        name: "Tes Vitamin D (25-OH)",
        price: 280000,
        description: "Tes kadar vitamin D dalam darah untuk mengetahui kecukupan vitamin D",
        image: "/logo.png",
        rating: 4.7,
        reviews: 34,
        inStock: true
      }
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function CategoryPage({ params }: PageProps) {
  const [slug, setSlug] = useState<string>("");
  const [category, setCategory] = useState<typeof CATEGORY_CONTENT[string] | null>(null);

  useEffect(() => {
    params.then(resolvedParams => {
      setSlug(resolvedParams.slug);
      setCategory(CATEGORY_CONTENT[resolvedParams.slug] || null);
    });
  }, [params]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p>Memuat kategori...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col gap-3 pb-24 px-5">
        <p className="text-sm text-muted-foreground">Kategori tidak ditemukan.</p>
        <Link href="/kategori" className="text-sm font-semibold text-brand">
          Kembali ke semua kategori
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="space-y-2 px-5 py-4 bg-white border-b">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Kategori</p>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-brand/15 text-brand">
            <category.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold">{category.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </header>

      <section className="border-b border-border/70 bg-amber-50 px-5 py-4">
        <h2 className="text-sm font-semibold text-amber-800">Tips Belanja</h2>
        <p className="mt-1 text-sm text-amber-700">{category.tips}</p>
      </section>

      <section className="flex-1 overflow-y-auto px-5 py-4">
        <h2 className="text-sm font-semibold mb-4">Produk unggulan</h2>
        <div className="grid gap-4 pb-4">
          {category.products.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-4 border border-border/70 bg-card rounded-lg p-4 shadow-sm"
            >
              <div className="flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover bg-muted"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews} ulasan)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-brand">
                      Rp{product.price.toLocaleString('id-ID')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        Rp{product.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/produk/${product.id}`}>Lihat</Link>
                  </Button>
                </div>
                
                {!product.inStock && (
                  <p className="text-xs text-red-500">Stok habis</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          <Button asChild fullWidth size="lg">
            <Link href="/cart">Tambah ke keranjang</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
