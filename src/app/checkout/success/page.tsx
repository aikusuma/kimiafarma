"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Package, MapPin, Clock, User, CreditCard, FileText } from "lucide-react";

const TRANSACTION_DETAILS = {
  orderId: "KF-2025-001234",
  date: "29 September 2025, 14:30",
  total: 67500,
  paymentMethod: "OVO",
  deliveryAddress: "SCBD, Jakarta Selatan",
  estimatedDelivery: "15:30 - 16:00 WIB",
};

const TRACKING_STEPS = [
  { id: 1, title: "Pesanan Diterima", time: "14:30", completed: true },
  { id: 2, title: "Diproses Apoteker", time: "14:45", completed: true },
  { id: 3, title: "Dikemas", time: "15:00", completed: true },
  { id: 4, title: "Driver Menuju Apotek", time: "15:15", completed: true },
  { id: 5, title: "Dalam Perjalanan", time: "15:25", completed: false, active: true },
  { id: 6, title: "Tiba di Tujuan", time: "Est. 15:45", completed: false },
];

export default function CheckoutSuccessPage() {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const duration = 1200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.2, x: 0.5 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      {/* Success Header */}
      <div className="flex flex-col items-center gap-4 text-center mt-8">
        <div className="flex h-16 w-16 items-center justify-center">
          <span className="absolute h-16 w-16 rounded-full bg-brand/30 animate-ping" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl text-white shadow-lg">
            ✓
          </span>
        </div>
        <h1 className="text-2xl font-semibold">Pembayaran berhasil!</h1>
        <p className="text-sm text-muted-foreground">
          Terima kasih sudah belanja di Kimia Farma. Driver sedang dalam perjalanan mengantar pesanan Anda.
        </p>
      </div>

      {/* Order Summary */}
      <div className="border border-border/70 bg-card rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Pesanan #{TRANSACTION_DETAILS.orderId}</h2>
          <span className="text-sm text-green-600 font-medium">Sedang Dikirim</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Pembayaran</span>
            <span className="font-semibold">Rp{TRANSACTION_DETAILS.total.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimasi Tiba</span>
            <span className="font-semibold text-brand">{TRANSACTION_DETAILS.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Tracking */}
      <div className="border border-border/70 bg-card rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Lacak Pesanan
        </h3>
        <div className="space-y-4">
          {TRACKING_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                step.completed ? 'bg-green-500' : 
                step.active ? 'bg-brand animate-pulse' : 'bg-muted'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium ${
                    step.completed ? 'text-green-600' : 
                    step.active ? 'text-brand' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <span className="text-xs text-muted-foreground">{step.time}</span>
                </div>
                {step.active && (
                  <p className="text-xs text-brand mt-1">Driver: Ahmad (B 1234 XYZ)</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center gap-2 border border-border/60 bg-card py-3 rounded-lg font-semibold transition hover:bg-muted"
        >
          <FileText className="h-4 w-4" />
          Detail Transaksi
        </button>
        
        <Link
          href="/"
          className="block w-full text-center bg-brand text-white py-3 rounded-lg font-semibold transition hover:bg-brand/90"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {/* Transaction Details Modal/Expandable */}
      {showDetails && (
        <div className="border border-border/70 bg-card rounded-lg p-4 shadow-sm space-y-4">
          <h3 className="font-semibold">Detail Transaksi</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">ID Pesanan</p>
                <p className="text-muted-foreground">{TRANSACTION_DETAILS.orderId}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Tanggal & Waktu</p>
                <p className="text-muted-foreground">{TRANSACTION_DETAILS.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Metode Pembayaran</p>
                <p className="text-muted-foreground">{TRANSACTION_DETAILS.paymentMethod}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Alamat Pengiriman</p>
                <p className="text-muted-foreground">{TRANSACTION_DETAILS.deliveryAddress}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total Pembayaran</span>
              <span>Rp{TRANSACTION_DETAILS.total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
