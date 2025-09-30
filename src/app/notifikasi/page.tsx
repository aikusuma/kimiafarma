"use client";

import { useState } from "react";
import { 
  Search, 
  Bell, 
  Package, 
  Clock, 
  MessageCircle, 
  CheckCircle, 
  Truck
} from "lucide-react";

const SEARCH_CATEGORIES = [
  { name: "Demam", icon: "🌡️", count: 45, searchTerms: ["paracetamol", "ibuprofen", "aspirin"] },
  { name: "Batuk", icon: "🤧", count: 67, searchTerms: ["obh", "woods", "sirup batuk"] },
  { name: "Sakit Kepala", icon: "😣", count: 34, searchTerms: ["panadol", "bodrex", "paramex"] },
  { name: "Maag", icon: "🔥", count: 28, searchTerms: ["antasida", "mylanta", "promag"] },
  { name: "Alergi", icon: "🤧", count: 56, searchTerms: ["cetirizine", "loratadine", "antihistamin"] },
  { name: "Vitamin", icon: "💊", count: 120, searchTerms: ["vitamin c", "multivitamin", "vitamin d"] },
  { name: "Flu", icon: "🤒", count: 78, searchTerms: ["decolgen", "neozep", "panadol flu"] },
  { name: "Diare", icon: "💩", count: 23, searchTerms: ["entrostop", "norit", "diapet"] }
];

const TRENDING_SEARCHES = [
  "Paracetamol", "Vitamin C", "Obat Batuk", "Antasida", 
  "Cetirizine", "Multivitamin", "Hand Sanitizer", "Masker"
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "Pesanan Sedang Dikirim",
    message: "Driver Ahmad (B 1234 XYZ) sedang menuju alamat Anda",
    time: "5 menit yang lalu",
    icon: Truck,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    status: "active"
  },
  {
    id: 2,
    type: "order",
    title: "Pesanan Dikonfirmasi",
    message: "Pesanan KF-2025-001234 telah dikonfirmasi apoteker",
    time: "2 jam yang lalu",
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    status: "completed"
  },
  {
    id: 3,
    type: "consultation",
    title: "Konsultasi Selesai",
    message: "Dr. Sarah telah memberikan resep digital",
    time: "1 hari yang lalu",
    icon: MessageCircle,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    status: "completed"
  },
  {
    id: 4,
    type: "order",
    title: "Menunggu Pembayaran",
    message: "Selesaikan pembayaran dalam 23:45:12",
    time: "3 jam yang lalu",
    icon: Clock,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    status: "pending"
  },
  {
    id: 5,
    type: "order",
    title: "Pesanan Tiba",
    message: "Terima kasih telah berbelanja di Kimia Farma",
    time: "2 hari yang lalu",
    icon: Package,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    status: "completed"
  }
];

const FILTER_OPTIONS = [
  { id: "all", label: "Semua", count: NOTIFICATIONS.length },
  { id: "active", label: "Aktif", count: NOTIFICATIONS.filter(n => n.status === "active").length },
  { id: "pending", label: "Menunggu", count: NOTIFICATIONS.filter(n => n.status === "pending").length },
  { id: "completed", label: "Selesai", count: NOTIFICATIONS.filter(n => n.status === "completed").length }
];

type SearchResult = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState<"notifications" | "search">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const filteredNotifications = NOTIFICATIONS.filter(notification => {
    if (selectedFilter === "all") return true;
    return notification.status === selectedFilter;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Simulate search results based on categories
    if (query.trim()) {
      const matchingCategories = SEARCH_CATEGORIES.filter(cat => 
        cat.name.toLowerCase().includes(query.toLowerCase()) ||
        cat.searchTerms.some(term => term.toLowerCase().includes(query.toLowerCase()))
      );
      
      // Simulate product results with deterministic pricing
      const results = matchingCategories.flatMap(cat => 
        cat.searchTerms.slice(0, 2).map((term, index) => {
          // Use a simple hash function for consistent pricing
          const hash = term.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) & 0xffffff, 0);
          const price = (hash % 40000) + 10000; // Price between 10k-50k
          const stock = (hash % 90) + 10; // Stock between 10-100
          
          return {
            id: `${cat.name}-${index}`,
            name: term.charAt(0).toUpperCase() + term.slice(1),
            category: cat.name,
            price: price,
            stock: stock
          };
        })
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      {/* Header with Tabs */}
      <header className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold">Notifikasi & Pencarian</h1>
          <p className="text-sm text-muted-foreground">
            Update pesanan dan cari produk berdasarkan penyakit
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border border-border/60 bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex-1 py-2 px-4 text-sm font-semibold transition-all ${
              activeTab === "notifications" 
                ? "bg-brand text-white shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔔 Notifikasi
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-2 px-4 text-sm font-semibold transition-all ${
              activeTab === "search" 
                ? "bg-brand text-white shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔍 Cari Obat
          </button>
        </div>
      </header>

      {activeTab === "notifications" ? (
        /* Notifications Tab */
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

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`border border-border/70 bg-card p-4 shadow-sm hover:shadow-md transition-shadow ${notification.bgColor}/50`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${notification.bgColor} p-2 rounded-lg`}>
                        <IconComponent className={`h-5 w-5 ${notification.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        
                        {notification.status === "active" && (
                          <div className="flex gap-2 mt-2">
                            <button className="bg-brand text-white px-3 py-1 text-xs font-semibold transition hover:bg-brand/90">
                              Lacak
                            </button>
                            <button className="border border-border/60 bg-card px-3 py-1 text-xs font-semibold transition hover:bg-muted">
                              Detail
                            </button>
                          </div>
                        )}
                        
                        {notification.status === "pending" && (
                          <button className="bg-red-600 text-white px-3 py-1 text-xs font-semibold transition hover:bg-red-700 mt-2">
                            Bayar Sekarang
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Tidak ada notifikasi</p>
                <p className="text-sm">Notifikasi akan muncul di sini</p>
              </div>
            )}
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
                placeholder="Cari obat berdasarkan penyakit (misal: demam, batuk, sakit kepala)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
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
                    Tidak perlu ingat nama obat! Cukup ketik penyakit atau gejala seperti &quot;demam&quot;, &quot;batuk berdahak&quot;, atau &quot;sakit perut&quot;.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔍</span> Hasil untuk &quot;{searchQuery}&quot; ({searchResults.length} produk)
              </h3>
              <div className="space-y-3">
                {searchResults.map((product) => (
                  <div key={product.id} className="border border-border/70 bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">Untuk {product.category}</p>
                        <p className="text-sm text-green-600">Stok: {product.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand">Rp{product.price.toLocaleString("id-ID")}</p>
                        <button className="bg-brand text-white px-3 py-1 text-xs font-semibold transition hover:bg-brand/90 mt-1">
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Search Categories */}
          {!searchQuery && (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>🏥</span> Cari Berdasarkan Penyakit
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SEARCH_CATEGORIES.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleQuickSearch(category.name)}
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
                  <span>🔥</span> Pencarian Populer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="bg-muted/50 hover:bg-brand/10 hover:text-brand px-3 py-2 text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* No Results */}
          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">Tidak ditemukan produk untuk &quot;{searchQuery}&quot;</p>
              <p className="text-sm">Coba kata kunci lain atau pilih kategori di atas</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}