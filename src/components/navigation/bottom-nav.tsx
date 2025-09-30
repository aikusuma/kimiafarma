"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3x3, Home, Pill, Bell, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/kategori", label: "Kategori", icon: Grid3x3 },
  { href: "/resep/upload", label: "Resep", icon: Pill },
  { href: "/notifikasi", label: "Notifikasi", icon: Bell },
  { href: "/akun", label: "Akun", icon: UserRound },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 z-40 flex flex-col flex-shrink-0 bg-card pb-[env(safe-area-inset-bottom)]">
      <nav
        className="flex h-16 w-full items-center border-t border-border/60 bg-card/95 shadow-[0_-12px_28px_rgba(15,23,42,0.12)] backdrop-blur"
        aria-label="Navigasi bawah Kimia Farma"
      >
        <ul className="grid w-full grid-cols-5 text-[11px] font-medium text-muted-foreground">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 px-2 transition-colors",
                    isActive ? "bg-brand/15 text-brand" : "hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
