"use client";

import { useState } from "react";
import { CreditCard, Gift, Tag, Search, Filter, Heart, Star, Clock, Zap } from "lucide-react";

const PROMOS = [
  {
    id: 1,
    title: "PWP Vitamin C + Probiotik",
    detail: "Beli Vitamin C 1000mg, probiotik diskon 50%",
    periode: "1-30 September",
    discount: "50%",
    icon: Tag,
    category: "vitamin",
    trending: true
  },
  {
    id: 2,
    title: "GWP Belanja 250K",
    detail: "Gratis hand sanitizer 60ml",
    periode: "Selama persediaan",
    discount: "Gratis",
    icon: Gift,
    category: "umum",
    trending: false
  },
  {
    id: 3,
    title: "Bank Promo BCA",
    detail: "Diskon 10% (maks Rp30.000) untuk BIN 601101",
    periode: "Setiap Jumat",
    discount: "10%",
    icon: CreditCard,
    category: "pembayaran",
    trending: true
  },
  {
    id: 4,
    title: "Flash Sale Obat Batuk",
    detail: "Diskon hingga 40% untuk semua obat batuk dan pilek",
    periode: "24 jam",
    discount: "40%",
    icon: Zap,
    category: "obat",
    trending: true
  },
  {
    id: 5,
    title: "Buy 2 Get 1 Masker",
    detail: "Khusus masker KF94 dan masker medis",
    periode: "15-30 September",
    discount: "33%",
    icon: Gift,
    category: "alkes",
    trending: false
  }
];

const SEARCH_CATEGORIES = [
  { name: "Vitamin", icon: "💊", count: 150 },
  { name: "Obat Batuk", icon: "🤧", count: 89 },
  { name: "Demam", icon: "🌡️", count: 67 },
  { name: "Sakit Kepala", icon: "😣", count: 45 },
  { name: "Maag", icon: "🔥", count: 34 },
  { name: "Alergi", icon: "🤧", count: 78 }
];

const TRENDING_SEARCHES = [
  "Paracetamol", "Vitamin C", "Masker KF94", "Hand Sanitizer", 
  "Obat Flu", "Multivitamin", "Probiotik", "Antasida"
];

const FILTER_OPTIONS = [
  { id: "all", label: "Semua Promo", count: PROMOS.length },
  { id: "trending", label: "Trending", count: PROMOS.filter(p => p.trending).length },
  { id: "vitamin", label: "Vitamin", count: PROMOS.filter(p => p.category === "vitamin").length },
  { id: "obat", label: "Obat", count: PROMOS.filter(p => p.category === "obat").length },
  { id: "pembayaran", label: "Pembayaran", count: PROMOS.filter(p => p.category === "pembayaran").length }
];

export default function PromoPage() {
  const [activeTab, setActiveTab] = useState<"promo" | "search">("promo");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredPromos = PROMOS.filter(promo => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "trending") return promo.trending;
    return promo.category === selectedFilter;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you would implement actual search functionality
    console.log("Searching for:", query);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      {/* Header with Tabs */}
      <header className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold">Promo & Pencarian</h1>
          <p className="text-sm text-muted-foreground">
            Temukan promo terbaik dan cari produk yang Anda butuhkan
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border border-border/60 bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab("promo")}
            className={`flex-1 py-2 px-4 text-sm font-semibold transition-all ${
              activeTab === "promo" 
                ? "bg-brand text-white shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🎁 Semua Promo
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-2 px-4 text-sm font-semibold transition-all ${
              activeTab === "search" 
                ? "bg-brand text-white shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔍 Cari Produk
          </button>
        </div>
      </header>

      {activeTab === "promo" ? (
        /* Promo Tab */
        <>
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 text-xs font-medium transition-all ${
                  selectedFilter === filter.id
                    ? "bg-brand text-white"
                    : "bg-muted text-muted-foreground hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {filter.label}
                <span className={`text-xs ${
                  selectedFilter === filter.id ? "text-white/80" : "text-muted-foreground"
                }`}>
                  ({filter.count})
                </span>
              </button>
            ))}
          </div>

          {/* Promo Grid */}
          <div className="grid gap-4">
            {filteredPromos.map((promo) => (
              <div
                key={promo.id}
                className="relative border border-border/70 bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {promo.trending && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                    🔥 TRENDING
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-brand/15 text-brand">
                    <promo.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm">{promo.title}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold">
                        {promo.discount}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{promo.detail}</p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-brand flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {promo.periode}
                      </p>
                      <button className="bg-brand text-white px-3 py-1 text-xs font-semibold transition hover:bg-brand/90">
                        Gunakan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Search Tab */
        <>
          {/* Search Bar */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari obat berdasarkan penyakit/gejala..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-3 border border-border/60 bg-card focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
            
            {/* Search Tips */}
            <div className="bg-brand/5 border border-brand/20 p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div className="text-sm">
                  <p className="font-semibold text-brand mb-1">Tips Pencarian Cerdas</p>
                  <p className="text-muted-foreground">
                    Tidak perlu ingat nama obat! Cukup ketik gejala seperti &quot;demam tinggi&quot;, &quot;batuk berdahak&quot;, atau &quot;sakit perut&quot;.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search Categories */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span>🏥</span> Kategori Populer
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SEARCH_CATEGORIES.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleSearch(category.name)}
                  className="flex items-center gap-3 bg-card border border-border/60 p-3 text-left hover:bg-brand/5 hover:border-brand/50 transition-colors"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.count} produk</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span>🔥</span> Pencarian Trending
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="bg-muted/50 hover:bg-brand/10 hover:text-brand px-3 py-2 text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches (if any) */}
          {searchQuery && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔍</span> Hasil untuk &quot;{searchQuery}&quot;
              </h3>
              <div className="bg-muted/30 border border-dashed border-border p-8 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium mb-1">Mencari produk...</p>
                <p className="text-sm text-muted-foreground">
                  Hasil pencarian akan muncul di sini
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
