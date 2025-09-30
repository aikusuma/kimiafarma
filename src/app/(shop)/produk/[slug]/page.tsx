"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound, useRouter, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { 
  Star, 
  Shield, 
  Truck, 
  RotateCcw, 
  Heart,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft
} from "lucide-react";

const PRODUCTS = {
  "betadine-antiseptic": {
    name: "Betadine Antiseptic Solution 60ml",
    price: 35000,
    originalPrice: 42000,
    description: "Antiseptik untuk membersihkan luka dan mencegah infeksi",
    rating: 4.8,
    reviewCount: 1250,
    images: ["/logo.png"]
  },
  "paracetamol-500mg": {
    name: "Paracetamol 500mg Strip 10 Tablet",
    price: 8500,
    originalPrice: undefined,
    description: "Obat pereda nyeri dan penurun demam",
    rating: 4.6,
    reviewCount: 890,
    images: ["/logo.png"]
  },
  "vitamin-c-1000mg": {
    name: "Vitamin C 1000mg Strip 10 Tablet",
    price: 35000,
    originalPrice: 42000,
    description: "Vitamin C dosis tinggi untuk meningkatkan daya tahan tubuh dan menjaga kesehatan kulit",
    rating: 4.7,
    reviewCount: 320,
    images: ["/logo.png"]
  },
  "vitamin-d3-400iu": {
    name: "Vitamin D3 400IU Strip 30 Tablet",
    price: 28000,
    originalPrice: 35000,
    description: "Vitamin D3 untuk kesehatan tulang dan meningkatkan penyerapan kalsium",
    rating: 4.5,
    reviewCount: 185,
    images: ["/logo.png"]
  },
  "multivitamin-dewasa": {
    name: "Multivitamin Dewasa Strip 30 Tablet",
    price: 45000,
    originalPrice: undefined,
    description: "Kombinasi lengkap vitamin dan mineral untuk kesehatan optimal",
    rating: 4.6,
    reviewCount: 410,
    images: ["/logo.png"]
  },
  "susu-formula-bayi": {
    name: "Susu Formula Bayi 0-6 Bulan 400g",
    price: 85000,
    originalPrice: 95000,
    description: "Susu formula bergizi lengkap untuk pertumbuhan optimal bayi 0-6 bulan",
    rating: 4.8,
    reviewCount: 650,
    images: ["/logo.png"]
  },
  "vitamin-anak-gummy": {
    name: "Vitamin Anak Gummy Mixed Fruit 60 Gummies",
    price: 125000,
    originalPrice: 140000,
    description: "Vitamin anak dalam bentuk gummy dengan rasa buah yang disukai anak-anak",
    rating: 4.7,
    reviewCount: 480,
    images: ["/logo.png"]
  },
  "popok-bayi-m": {
    name: "Popok Bayi Size M Isi 44 Pcs",
    price: 65000,
    originalPrice: undefined,
    description: "Popok bayi dengan daya serap tinggi dan perlindungan anti bocor 12 jam",
    rating: 4.6,
    reviewCount: 920,
    images: ["/logo.png"]
  },
  "serum-wajah-vitamin-c": {
    name: "Serum Wajah Vitamin C 20ml",
    price: 89000,
    originalPrice: 120000,
    description: "Serum wajah dengan vitamin C untuk mencerahkan dan melindungi kulit dari radikal bebas",
    rating: 4.4,
    reviewCount: 275,
    images: ["/logo.png"]
  },
  "moisturizer-daily": {
    name: "Daily Moisturizer SPF 15 50ml",
    price: 67000,
    originalPrice: 78000,
    description: "Pelembab harian dengan SPF 15 untuk perlindungan dan hidrasi kulit sepanjang hari",
    rating: 4.3,
    reviewCount: 156,
    images: ["/logo.png"]
  },
  "sunscreen-spf50": {
    name: "Sunscreen SPF 50 PA+++ 30ml",
    price: 95000,
    originalPrice: undefined,
    description: "Tabir surya dengan perlindungan maksimal SPF 50 untuk aktivitas outdoor",
    rating: 4.5,
    reviewCount: 203,
    images: ["/logo.png"]
  },
  "termometer-digital": {
    name: "Termometer Digital Infrared",
    price: 245000,
    originalPrice: 280000,
    description: "Termometer digital infrared tanpa sentuh dengan akurasi tinggi dan pembacaan cepat",
    rating: 4.6,
    reviewCount: 387,
    images: ["/logo.png"]
  },
  "tensimeter-digital": {
    name: "Tensimeter Digital Lengan Atas",
    price: 350000,
    originalPrice: 420000,
    description: "Tensimeter digital otomatis untuk monitoring tekanan darah di rumah",
    rating: 4.7,
    reviewCount: 298,
    images: ["/logo.png"]
  },
  "masker-medis-3ply": {
    name: "Masker Medis 3 Ply Isi 50 Pcs",
    price: 45000,
    originalPrice: undefined,
    description: "Masker medis 3 lapis dengan efisiensi filtrasi bakterial tinggi",
    rating: 4.4,
    reviewCount: 756,
    images: ["/logo.png"]
  },
  "amoxicillin-500mg": {
    name: "Amoxicillin 500mg Strip 10 Kapsul",
    price: 25000,
    originalPrice: undefined,
    description: "Antibiotik untuk mengatasi infeksi bakteri (perlu resep dokter)",
    rating: 4.5,
    reviewCount: 145,
    images: ["/logo.png"]
  },
  "protein-powder-vanilla": {
    name: "Protein Powder Vanilla 1kg",
    price: 450000,
    originalPrice: 520000,
    description: "Protein powder berkualitas tinggi dengan rasa vanilla untuk mendukung pembentukan otot",
    rating: 4.6,
    reviewCount: 234,
    images: ["/logo.png"]
  },
  "omega-3-1000mg": {
    name: "Omega 3 1000mg Strip 30 Softgel",
    price: 185000,
    originalPrice: 210000,
    description: "Omega 3 dengan kandungan EPA dan DHA tinggi untuk kesehatan jantung dan otak",
    rating: 4.7,
    reviewCount: 167,
    images: ["/logo.png"]
  },
  "rapid-test-covid": {
    name: "Rapid Test Antigen COVID-19",
    price: 25000,
    originalPrice: undefined,
    description: "Rapid test antigen untuk deteksi cepat COVID-19 dengan akurasi tinggi",
    rating: 4.3,
    reviewCount: 892,
    images: ["/logo.png"]
  },
  "strip-gula-darah": {
    name: "Strip Gula Darah Isi 25 Pcs",
    price: 85000,
    originalPrice: 95000,
    description: "Strip test gula darah untuk monitoring kadar glukosa harian",
    rating: 4.5,
    reviewCount: 324,
    images: ["/logo.png"]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [slug, setSlug] = useState<string>("");
  
  useEffect(() => {
    params.then(resolvedParams => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  const product = slug ? PRODUCTS[slug as keyof typeof PRODUCTS] : null;

  if (slug && !product) {
    redirect("/produk/vitamin-c-1000mg");
  }

  if (!product) {
    return <div className="h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    addItem({
      sku: slug,
      name: product.name,
      price: product.price,
      qty: quantity
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg">Detail Produk</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="sm"><Heart className="h-5 w-5" /></Button>
          </div>
        </div>
      </header>

      <section className="aspect-square bg-white relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Hemat {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </section>

      <section className="p-4 bg-card space-y-3">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviewCount} ulasan)</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-brand">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rp{product.originalPrice.toLocaleString('id-ID')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <Shield className="h-4 w-4" />
            <span>Original</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600">
            <Truck className="h-4 w-4" />
            <span>Gratis Ongkir</span>
          </div>
          <div className="flex items-center gap-1 text-orange-600">
            <RotateCcw className="h-4 w-4" />
            <span>Bisa Retur</span>
          </div>
        </div>
      </section>

      <section className="p-4 bg-card border-t">
        <div className="flex items-center justify-between">
          <span className="font-medium">Jumlah</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="sticky bottom-0 bg-background border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleAddToCart}
            className="flex-1 h-12 text-brand border-brand hover:bg-brand hover:text-white"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Keranjang
          </Button>
          <Button
            onClick={() => {
              handleAddToCart();
              router.push("/cart");
            }}
            className="flex-1 h-12 bg-brand hover:bg-brand/90 text-white"
          >
            Beli Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
}
