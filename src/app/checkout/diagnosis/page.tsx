"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { 
  ShoppingCart, 
  User, 
  FileText, 
  Clock,
  CheckCircle,
  Pill,
  Plus,
  Minus
} from "lucide-react";

const DUMMY_MEDICATIONS = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    dosage: "3x1 tablet sehari sesudah makan",
    duration: "5 hari",
    price: 12500,
    quantity: 15,
    image: "/pill.png"
  },
  {
    id: 2,
    name: "OBH Combi Sirup",
    dosage: "3x1 sendok teh sehari",
    duration: "5 hari", 
    price: 28000,
    quantity: 1,
    image: "/syrup.png"
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    dosage: "1x1 tablet sehari sesudah makan",
    duration: "7 hari",
    price: 35000,
    quantity: 7,
    image: "/vitamin.png"
  }
];

function DiagnosisCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const doctor = searchParams.get("doctor") || "";
  const diagnosis = searchParams.get("diagnosis") || "";
  const consultationFee = 45000;
  
  const [medications, setMedications] = useState(DUMMY_MEDICATIONS);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setMedications(prev => prev.map(med => 
      med.id === id 
        ? { ...med, quantity: Math.max(1, med.quantity + change) }
        : med
    ));
  };

  const totalMedicationPrice = medications.reduce((sum, med) => sum + (med.price * med.quantity), 0);
  const totalPrice = totalMedicationPrice + consultationFee;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Trigger confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.2 }
    });
    
    // Redirect to success page
    router.push("/checkout/success");
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      {/* Header */}
      <header className="space-y-1.5 mt-4">
        <h1 className="text-2xl font-semibold">Resep Dokter</h1>
        <p className="text-sm text-muted-foreground">
          Lengkapi pembelian obat berdasarkan diagnosis dokter
        </p>
      </header>

      {/* Doctor Info & Diagnosis */}
      <section className="bg-card border border-border/60 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="font-semibold text-sm">{doctor}</p>
            <p className="text-xs text-muted-foreground">Konsultasi Online</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-semibold text-brand">Rp{consultationFee.toLocaleString("id-ID")}</p>
            <p className="text-xs text-muted-foreground">Biaya Konsultasi</p>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-3">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-brand mt-0.5" />
            <div>
              <p className="text-sm font-medium">Diagnosis</p>
              <p className="text-sm text-muted-foreground">{diagnosis}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medications List */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-semibold">Obat yang Diresepkan</h2>
        </div>
        
        <div className="space-y-3">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-card border border-border/60 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Pill className="h-6 w-6 text-brand" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{medication.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{medication.dosage}</p>
                  <p className="text-xs text-muted-foreground">Durasi: {medication.duration}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-brand">
                        Rp{medication.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-xs text-muted-foreground">/item</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(medication.id, -1)}
                        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center hover:bg-gray-50"
                        disabled={medication.quantity <= 1}
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{medication.quantity}</span>
                      <button
                        onClick={() => updateQuantity(medication.id, 1)}
                        className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center hover:bg-gray-50"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right mt-2">
                    <span className="text-sm font-semibold">
                      Subtotal: Rp{(medication.price * medication.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Summary */}
      <section className="bg-card border border-border/60 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">Ringkasan Pesanan</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Biaya Konsultasi</span>
            <span>Rp{consultationFee.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Obat ({medications.reduce((sum, med) => sum + med.quantity, 0)} item)</span>
            <span>Rp{totalMedicationPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span>Ongkos Kirim</span>
            <span className="text-green-600">GRATIS</span>
          </div>
          <div className="border-t border-border/50 pt-2 flex justify-between font-semibold">
            <span>Total Pembayaran</span>
            <span className="text-brand">Rp{totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-orange-800">Catatan Penting:</p>
            <ul className="mt-1 text-orange-700 space-y-1">
              <li>• Minum obat sesuai dosis yang diresepkan</li>
              <li>• Jangan menghentikan pengobatan tanpa konsultasi</li>
              <li>• Hubungi dokter jika gejala memburuk</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Checkout Button */}
      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
        <div className="w-full max-w-[500px] border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur">
          <Button 
            fullWidth 
            size="lg"
            onClick={handleCheckout}
            disabled={isProcessing}
            className="relative"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses Pesanan...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Bayar Sekarang - Rp{totalPrice.toLocaleString("id-ID")}
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function DiagnosisCheckoutLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
        <p>Memuat halaman checkout...</p>
      </div>
    </div>
  );
}

// Main export with Suspense wrapper
export default function DiagnosisCheckoutPage() {
  return (
    <Suspense fallback={<DiagnosisCheckoutLoading />}>
      <DiagnosisCheckoutContent />
    </Suspense>
  );
}