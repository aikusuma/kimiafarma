"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  MessageSquareHeart,
  Stethoscope,
  UserRoundCheck,
  Clock,
  Star,
  Video,
  MessageCircle,
} from "lucide-react";

const SESSIONS = [
  {
    title: "Apoteker On Demand",
    desc: "Chat 24/7 untuk tanya obat & interaksi",
    price: "Gratis",
    icon: MessageSquareHeart,
  },
  {
    title: "Dokter Umum",
    desc: "Reservasi 15 menit, resep digital instan",
    price: "Rp45.000",
    icon: Stethoscope,
  },
];

const AVAILABLE_DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya, Sp.PD",
    specialty: "Dokter Penyakit Dalam",
    experience: "8 tahun",
    rating: 4.9,
    reviews: 127,
    price: 45000,
    nextAvailable: "15:30",
    avatar: "SW"
  },
  {
    id: 2,
    name: "Dr. Michael Chen, Sp.A",
    specialty: "Dokter Anak",
    experience: "12 tahun",
    rating: 4.8,
    reviews: 89,
    price: 50000,
    nextAvailable: "16:00",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Dr. Ayu Putri, Sp.OG",
    specialty: "Dokter Kandungan",
    experience: "6 tahun",
    rating: 4.9,
    reviews: 156,
    price: 55000,
    nextAvailable: "16:30",
    avatar: "AP"
  }
];

export default function KonsulPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const handleStartConsultation = () => {
    if (selectedService === "apoteker") {
      // Start chat with pharmacist
      alert("Memulai chat dengan apoteker...");
    } else if (selectedDoctor) {
      // Start video consultation with selected doctor
      router.push(`/konsul/video/${selectedDoctor}`);
    }
  };

  if (selectedService === "dokter") {
    return (
      <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
        <header className="space-y-1.5">
          <button 
            onClick={() => setSelectedService(null)}
            className="text-sm text-brand font-medium mb-2"
          >
            ← Kembali ke Pilihan Layanan
          </button>
          <h1 className="text-2xl font-semibold">Pilih Dokter</h1>
          <p className="text-sm text-muted-foreground">
            Pilih dokter yang sesuai dengan keluhan Anda
          </p>
        </header>

        <div className="space-y-4">
          {AVAILABLE_DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedDoctor === doctor.id 
                  ? 'border-brand bg-brand/5' 
                  : 'border-border/70 bg-card hover:border-brand/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center font-semibold text-brand">
                  {doctor.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground">Pengalaman {doctor.experience}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{doctor.rating}</span>
                      <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Tersedia {doctor.nextAvailable}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-brand">Rp{doctor.price.toLocaleString("id-ID")}</span>
                    <div className="flex gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
          <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-lg p-4 shadow-xl backdrop-blur">
            <Button 
              fullWidth 
              size="lg" 
              disabled={!selectedDoctor}
              onClick={handleStartConsultation}
            >
              {selectedDoctor 
                ? `Book Konsultasi - Rp${AVAILABLE_DOCTORS.find(d => d.id === selectedDoctor)?.price.toLocaleString("id-ID")}` 
                : "Pilih Dokter Terlebih Dahulu"
              }
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Konsultasi Kesehatan</h1>
        <p className="text-sm text-muted-foreground">
          Pilih layanan yang sesuai, mulai chat atau jadwalkan kunjungan.
        </p>
      </header>

      <section className="border border-border/70 bg-brand/10 rounded-none p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-brand text-white">
            <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Tim medis Kimia Farma siap bantu</p>
            <p className="text-xs text-muted-foreground">
              Terhubung langsung dengan apoteker dan dokter berlisensi untuk konsultasi obat, resep digital, dan rujukan klinik.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        {SESSIONS.map((session) => (
          <article
            key={session.title}
            onClick={() => setSelectedService(session.title === "Apoteker On Demand" ? "apoteker" : "dokter")}
            className="flex items-start gap-3 border border-border/70 bg-card rounded-lg p-5 shadow-sm cursor-pointer transition hover:border-brand hover:bg-brand/5"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
              <session.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold">{session.title}</p>
              <p className="text-xs text-muted-foreground">{session.desc}</p>
              <p className="text-sm font-semibold text-brand">{session.price}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="border border-border/70 bg-card rounded-none p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-brand/15 text-brand">
            <CalendarClock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">Riwayat Konsul</p>
            <p>Konsultasi terakhir: 12 Sep 2024, Dokter Umum</p>
            <p>Resep digital dapat dilihat di menu akun & riwayat resep.</p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 rounded-lg p-4 shadow-xl backdrop-blur">
          <Button 
            fullWidth 
            size="lg"
            disabled={!selectedService}
            onClick={handleStartConsultation}
          >
            {selectedService === "apoteker" ? "Chat dengan Apoteker (Gratis)" : "Pilih Layanan Terlebih Dahulu"}
          </Button>
        </div>
      </div>
    </div>
  );
}
