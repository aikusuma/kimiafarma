import { Button } from "@/components/ui/button";
import { CalendarHeart, FlaskConical, Sparkles } from "lucide-react";

const SERVICES = [
  {
    name: "Klinik Kimia Farma",
    detail: "Pemeriksaan umum + lab basic",
    nextSlot: "Hari ini, 16.00",
    icon: CalendarHeart,
  },
  {
    name: "Laboratorium",
    detail: "Paket MCU Corporate",
    nextSlot: "Besok, 08.00",
    icon: FlaskConical,
  },
  {
    name: "Kecantikan",
    detail: "Facial brightening + konsultasi dokter",
    nextSlot: "Sabtu, 10.00",
    icon: Sparkles,
  },
];

export default function ReservasiPage() {
  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Reservasi Layanan</h1>
        <p className="text-sm text-muted-foreground">
          Booking jadwal klinik, laboratorium, atau perawatan kecantikan.
        </p>
      </header>

      <ul className="grid gap-3">
        {SERVICES.map((service) => (
          <li key={service.name} className="flex items-start gap-3 border border-border/70 bg-card rounded-none p-5 shadow-sm">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
              <service.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{service.name}</p>
              <p className="text-xs text-muted-foreground">{service.detail}</p>
              <p className="text-xs font-semibold text-brand">
                Slot terdekat: {service.nextSlot}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-none p-4 shadow-xl backdrop-blur">
          <Button fullWidth size="lg">
            Buat Reservasi
          </Button>
        </div>
      </div>
    </div>
  );
}
