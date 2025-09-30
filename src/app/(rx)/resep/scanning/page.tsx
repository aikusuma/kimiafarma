"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, CheckCircle } from "lucide-react";

const SCANNING_STEPS = [
  { id: 1, text: "Menganalisis foto resep...", icon: FileText },
  { id: 2, text: "Memverifikasi keaslian dokumen...", icon: Sparkles },
  { id: 3, text: "Mencocokkan dengan database obat...", icon: Sparkles },
  { id: 4, text: "Menyiapkan daftar produk...", icon: CheckCircle },
];

const DETECTED_PRODUCTS = [
  { 
    sku: "RX-001", 
    name: "Paracetamol 500mg", 
    price: 12500, 
    qty: 2,
    description: "Tablet untuk demam dan nyeri"
  },
  { 
    sku: "RX-002", 
    name: "Amoxicillin 250mg", 
    price: 25000, 
    qty: 1,
    description: "Antibiotik kapsul"
  },
  { 
    sku: "RX-003", 
    name: "Vitamin B Complex", 
    price: 18000, 
    qty: 1,
    description: "Suplemen vitamin B"
  },
];

export default function KimiAIScanningPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < SCANNING_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsComplete(true);
      }, 1500);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep]);

  const handleCheckout = () => {
    // Add products to cart (you might want to implement this properly)
    router.push("/checkout");
  };

  if (isComplete) {
    return (
      <div className="flex flex-col gap-6 px-5 pb-28 md:px-8">
        <header className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-green-600">Resep Berhasil Dianalisis!</h1>
          <p className="text-sm text-muted-foreground">
            KimiAI telah berhasil mengidentifikasi obat dari resep Anda
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Produk yang Terdeteksi</h2>
          {DETECTED_PRODUCTS.map((product) => (
            <div key={product.sku} className="border border-border/70 bg-card rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-sm text-muted-foreground">Qty: {product.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp{product.price.toLocaleString("id-ID")}</p>
                  <p className="text-sm text-muted-foreground">per unit</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total Estimasi:</span>
            <span className="text-lg font-bold text-brand">
              Rp{DETECTED_PRODUCTS.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+64px)] z-50 flex justify-center px-4">
          <div className="w-full max-w-[500px] space-y-2">
            <button
              onClick={handleCheckout}
              className="w-full bg-brand text-white py-3 font-semibold transition hover:bg-brand/90"
            >
              Lanjutkan ke Checkout
            </button>
            <button
              onClick={() => router.push("/resep/upload/form")}
              className="w-full border border-border/60 bg-card py-3 font-semibold transition hover:bg-muted"
            >
              Upload Resep Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
      <div className="text-center space-y-6 max-w-md">
        {/* KimiAI Logo/Animation */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand to-orange-400 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-brand/30 rounded-full animate-spin" 
               style={{ animationDuration: '3s' }} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-brand">KimiAI Farma</h1>
          <p className="text-lg font-semibold">Sedang Menganalisis Resep Anda...</p>
          <p className="text-sm text-muted-foreground">
            AI kami sedang membaca dan memverifikasi resep dokter Anda
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 text-left">
          {SCANNING_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className={`flex items-center gap-3 transition-all duration-500 ${
                isActive ? 'text-brand' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-brand/20 animate-pulse' : 
                  isCompleted ? 'bg-green-100' : 'bg-muted'
                }`}>
                  <StepIcon className="h-4 w-4" />
                </div>
                <span className={`text-sm font-medium ${isActive ? 'animate-pulse' : ''}`}>
                  {step.text}
                </span>
                {isActive && (
                  <div className="flex-1 flex justify-end">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                )}
                {isCompleted && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>💡 <strong>Tahukah Anda?</strong> KimiAI dapat mengenali lebih dari 10,000 jenis obat dan suplemen dengan akurasi 99.5%</p>
        </div>
      </div>
    </div>
  );
}