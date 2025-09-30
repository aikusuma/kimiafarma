import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const examples = [
  {
    src: "/slider1.png",
    alt: "Contoh resep dengan identitas pasien",
  },
  {
    src: "/logo.png",
    alt: "Contoh resep dengan tanda tangan dokter",
  },
];

const STEPS = [
  "Foto jelas seluruh bagian resep, termasuk identitas pasien",
  "Pastikan ada tanda tangan dokter dan tanggal",
  "Cantumkan nomor kontak pasien yang aktif",
];

export default function ResepIntroPage() {
  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Sebelum mengunggah resep</h1>
        <p className="text-sm text-muted-foreground">
          Pastikan resep Kakak memiliki informasi berikut untuk mempermudah verifikasi oleh Apoteker Kimia Farma.
        </p>
      </header>

      <section className="space-y-3 border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <h2 className="text-sm font-semibold">Contoh resep yang valid</h2>
        <div className="grid grid-cols-2 gap-3">
          {examples.map((example) => (
            <div key={example.alt} className="space-y-1">
              <div className="relative h-40 w-full border border-border/60 bg-muted">
                <Image
                  src={example.src}
                  alt={example.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground">{example.alt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2 border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <h2 className="text-sm font-semibold">Checklist sebelum kirim</h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          <Button asChild fullWidth size="lg">
            <Link href="/resep/upload/form">Lanjutkan Unggah Resep</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
