import { Button } from "@/components/ui/button";
import {
  type LucideIcon,
  CheckCircle2,
  Clock3,
  Link2,
  PackageCheck,
  Smartphone,
} from "lucide-react";

type PageProps = {
  params: { id: string };
};

const TIMELINE: Array<{
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    time: "08.10",
    title: "Resep diterima",
    description: "Tim kami menerima foto resep kamu",
    icon: CheckCircle2,
  },
  {
    time: "08.15",
    title: "Sedang diverifikasi",
    description: "Apoteker memastikan dosis & keaslian",
    icon: Clock3,
  },
  {
    time: "08.22",
    title: "Invoice dikirim",
    description: "Rincian biaya sudah terkirim ke WhatsApp",
    icon: Smartphone,
  },
];

export default function ResepStatus({ params }: PageProps) {
  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-brand/15 text-brand">
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold">Status resep #{params.id}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Kami update setiap proses dan kirim tautan pembayaran langsung ke WhatsApp kamu.
        </p>
      </header>

      <section className="space-y-3">
        {TIMELINE.map((item) => (
          <article
            key={item.title}
            className="flex items-start gap-3 border border-border/70 bg-card rounded-none p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex flex-1 justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <span className="text-xs font-semibold text-brand">{item.time}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3 border border-border/70 bg-card rounded-none p-5 text-sm shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-brand/15 text-brand">
            <Link2 className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="font-semibold">Tautan pembayaran terbaru</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Bayar sebelum 12.00 untuk pengantaran hari ini. Jika kamu perlu penyesuaian obat, balas pesan WhatsApp kami.
        </p>
        <div className="flex items-center justify-between text-sm">
          <span>Total estimasi</span>
          <span className="text-base font-semibold text-brand">Rp210.000</span>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          <Button fullWidth>Hubungi Apoteker</Button>
        </div>
      </div>
    </div>
  );
}
