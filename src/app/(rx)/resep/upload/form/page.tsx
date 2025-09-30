"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

const COMPACT_STEPS = [
  {
    title: "Foto & unggah resep",
    description:
      "Foto resep dari dokter dengan jelas. Pastikan identitas pasien, nama dokter, serta tanggal resep terlihat.",
  },
  {
    title: "Verifikasi apoteker",
    description:
      "Apoteker Kimia Farma memeriksa keaslian resep dan menghubungi kamu jika dibutuhkan klarifikasi tambahan.",
  },
  {
    title: "Siap antar",
    description:
      "Setelah resep disetujui, obat disiapkan dan dikirim langsung ke alamatmu tanpa perlu antre.",
  },
];

export default function UploadResepFormPage() {
  const router = useRouter();
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = () => {
    if (files?.length) {
      router.push("/resep/scanning");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Unggah resep Anda di sini</h1>
        <p className="text-sm text-muted-foreground">
          Foto langsung resep dari dokter dan unggah untuk kami verifikasi.
        </p>
      </header>

      <section className="space-y-3 border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <label className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-brand/60 bg-brand/5 text-sm font-semibold text-brand">
          <UploadCloud className="h-6 w-6" aria-hidden="true" />
          <span>Tarik atau pilih foto resep</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => setFiles(event.target.files)}
          />
        </label>
        <p className="text-xs text-muted-foreground">
          {files?.length ? `${files.length} file siap dikirim.` : "Unggah maksimal 5 foto, format JPG atau PNG."}
        </p>
        <p className="text-xs text-muted-foreground">
          Kimia Farma akan menolak dan tidak bertanggung jawab atas setiap kerugian dan risiko yang dapat timbul dari pemakaian obat tertentu yang dibeli melalui penebusan ulang resep.
        </p>
      </section>

      <section className="space-y-3 border border-border/70 bg-card rounded-none p-5 shadow-sm text-sm">
        <h2 className="text-sm font-semibold">Tebus Resep Dokter, Online dan Tanpa Antre!</h2>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            Kimia Farma memberikan kemudahan bagi kamu untuk tebus obat resep tanpa antre secara online dengan layanan upload resep dokter. Cukup foto resep obat menggunakan smartphone dan unggah melalui menu kirim resep.
          </p>
          <p>
            Resep akan diperiksa keaslian dan keabsahan oleh tim farmasis kami. Jika valid, obat disiapkan dan dikirim ke alamatmu. Kami tidak melayani obat psikotropika maupun narkotika.
          </p>
          <p>
            Kimia Farma menjamin 100% obat asli, lengkap, dan cepat. Layanan 24 jam tanpa antre dan tanpa minimal pembelian.
          </p>
        </div>
        <div className="space-y-2 border border-border/60 bg-muted/30 rounded-none p-4">
          {COMPACT_STEPS.map((step) => (
            <div key={step.title}>
              <p className="text-sm font-semibold text-brand">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 text-center shadow-xl backdrop-blur">
          <Button fullWidth size="lg" disabled={!files?.length} onClick={handleSubmit}>
            Kirim ke Apotek
          </Button>
        </div>
      </div>
    </div>
  );
}
