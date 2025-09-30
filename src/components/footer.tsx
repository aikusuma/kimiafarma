import Link from "next/link";
import { Instagram, Facebook, Twitter, Smartphone, Play } from "lucide-react";

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 pb-[calc(env(safe-area-inset-bottom)+60px)]">
      <div className="max-w-[500px] mx-auto px-5 py-6 space-y-6">
        
        {/* Social Media & Apps Combined Section */}
        <div className="space-y-4">
          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">IKUTI KAMI</h3>
            <div className="flex justify-center gap-3">
              <Link 
                href="https://tiktok.com/@kimiafarma" 
                className="flex h-10 w-10 items-center justify-center bg-gray-100 text-gray-600 rounded-lg transition-all hover:bg-gray-200 hover:text-gray-800"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </Link>
              <Link 
                href="https://instagram.com/kimiafarma" 
                className="flex h-10 w-10 items-center justify-center bg-pink-50 text-pink-500 rounded-lg transition-all hover:bg-pink-100 hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://twitter.com/kimiafarma" 
                className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-500 rounded-lg transition-all hover:bg-blue-100 hover:text-blue-600"
                aria-label="Twitter/X"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://facebook.com/kimiafarma" 
                className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600 rounded-lg transition-all hover:bg-blue-100 hover:text-blue-700"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Download App Section */}
          <div className="text-center">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Download K24Klik</h3>
            <div className="flex justify-center gap-2">
              <Link 
                href="https://apps.apple.com/app/k24klik"
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-all hover:bg-gray-200 text-xs"
              >
                <Smartphone className="h-4 w-4" />
                <span className="font-medium">App Store</span>
              </Link>
              <Link 
                href="https://play.google.com/store/apps/details?id=com.kimiafarma.k24klik"
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg transition-all hover:bg-green-100 text-xs"
              >
                <Play className="h-4 w-4" />
                <span className="font-medium">Google Play</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">Layanan</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/produk" className="hover:text-brand transition">Produk</Link></li>
              <li><Link href="/resep" className="hover:text-brand transition">Upload Resep</Link></li>
              <li><Link href="/konsul" className="hover:text-brand transition">Konsultasi</Link></li>
              <li><Link href="/promo" className="hover:text-brand transition">Promo</Link></li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">Bantuan</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/faq" className="hover:text-brand transition">FAQ</Link></li>
              <li><Link href="/syarat" className="hover:text-brand transition">Syarat & Ketentuan</Link></li>
              <li><Link href="/privasi" className="hover:text-brand transition">Kebijakan Privasi</Link></li>
              <li><Link href="/kontak" className="hover:text-brand transition">Hubungi Kami</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground leading-tight">
            © 2025 Kimiafarma.com - Apotek Online Paling Komplit All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}