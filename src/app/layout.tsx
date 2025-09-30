import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingHeader } from "@/components/floating-header";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Kimia Farma",
  description: "Kimia Farma web application with NextAuth and SQLite",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#EB6001",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "bg-muted font-sans text-foreground antialiased",
          inter.className
        )}
      >
        <Providers>
          <div className="flex min-h-screen min-h-[100dvh] w-full justify-center bg-muted">
            <div className="relative flex w-full max-w-[500px] flex-1 flex-col bg-card shadow-none">
              <FloatingHeader />
              <main className="flex flex-1 flex-col overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+112px)]">
                {children}
              </main>
              <BottomNav />
            </div>
          </div>
        </Providers>
        <script async src="/sw-register.js" />
      </body>
    </html>
  );
}
