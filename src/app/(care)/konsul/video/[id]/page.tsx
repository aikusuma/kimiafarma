"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff
} from "lucide-react";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya, Sp.PD",
    specialty: "Dokter Penyakit Dalam"
  },
  {
    id: 2,
    name: "Dr. Michael Chen, Sp.A", 
    specialty: "Dokter Anak"
  },
  {
    id: 3,
    name: "Dr. Ayu Putri, Sp.OG",
    specialty: "Dokter Kandungan"
  }
];

const DUMMY_DIAGNOSIS = {
  diagnosis: "Flu Ringan dengan Gejala Batuk",
  symptoms: ["Batuk kering", "Hidung tersumbat", "Sakit tenggorokan ringan"],
  recommendations: [
    "Istirahat yang cukup",
    "Minum air putih minimal 8 gelas sehari",
    "Hindari makanan pedas dan asam",
    "Gunakan masker saat beraktivitas"
  ],
  medications: [
    {
      name: "Paracetamol 500mg",
      dosage: "3x1 tablet sehari sesudah makan",
      duration: "5 hari",
      price: 12500,
      quantity: 15
    },
    {
      name: "OBH Combi Sirup",
      dosage: "3x1 sendok teh sehari",
      duration: "5 hari", 
      price: 28000,
      quantity: 1
    },
    {
      name: "Vitamin C 1000mg",
      dosage: "1x1 tablet sehari sesudah makan",
      duration: "7 hari",
      price: 35000,
      quantity: 7
    }
  ]
};

export default function VideoConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = parseInt(params.id as string);
  const doctor = DOCTORS.find(d => d.id === doctorId);
  
  const [phase, setPhase] = useState<"connecting" | "video" | "completed">("connecting");
  const [countdown, setCountdown] = useState(5);
  const [sessionTime, setSessionTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    if (phase === "connecting" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "connecting" && countdown === 0) {
      setPhase("video");
      setSessionTime(0);
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === "video") {
      const timer = setInterval(() => {
        setSessionTime(prev => {
          if (prev >= 10) {
            setPhase("completed");
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    const totalPrice = DUMMY_DIAGNOSIS.medications.reduce((sum, med) => sum + (med.price * med.quantity), 0);
    const consultationFee = 45000;
    
    router.push(`/checkout/diagnosis?doctor=${encodeURIComponent(doctor?.name || '')}&total=${totalPrice + consultationFee}&diagnosis=${encodeURIComponent(DUMMY_DIAGNOSIS.diagnosis)}`);
  };

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Video Section - Doctor */}
      <div className="flex-1 relative bg-gray-800">
        {phase === "connecting" ? (
          <div className="h-full flex items-center justify-center flex-col text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Memanggil Dokter</h2>
            <p className="text-gray-300">{doctor.name}</p>
            <p className="text-gray-400 text-sm">{doctor.specialty}</p>
            <div className="mt-6 text-3xl font-bold">{countdown}</div>
          </div>
        ) : phase === "video" ? (
          <div className="h-full relative">
            <iframe
              title="Video consultation with doctor"
              src="https://www.youtube.com/embed/PZs8bVfWYVE?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
              <span className="text-sm">{doctor.name}</span>
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
              <span className="text-sm font-mono">{formatTime(sessionTime)}</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col text-white bg-green-600">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-2">Sesi Selesai</h2>
            <p className="text-green-100">Terima kasih telah berkonsultasi</p>
          </div>
        )}
      </div>

      {/* Bottom User Section - Camera */}
      <div className="h-48 bg-gray-700 relative">
        <div className="h-full flex items-center justify-center">
          {isVideoOff ? (
            <div className="text-white text-center">
              <VideoOff className="h-12 w-12 mx-auto mb-2" />
              <span className="text-sm">Video Off</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="h-8 w-8 mx-auto mb-2" />
                <span className="text-xs">Camera Anda</span>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            size="sm"
            variant="ghost"
            className={`rounded-full p-3 ${isMuted ? 'bg-red-500' : 'bg-gray-600'} text-white hover:bg-gray-500`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className={`rounded-full p-3 ${isVideoOff ? 'bg-red-500' : 'bg-gray-600'} text-white hover:bg-gray-500`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          {phase === "video" && sessionTime >= 10 ? (
            <Button
              size="sm"
              className="rounded-full p-3 bg-green-500 text-white hover:bg-green-600"
              onClick={handleEndSession}
            >
              Selesaikan Sesi
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full p-3 bg-red-500 text-white hover:bg-red-600"
              onClick={() => router.back()}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {phase === "completed" && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Diagnosis Dokter</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Diagnosis:</strong> {DUMMY_DIAGNOSIS.diagnosis}
              </div>
              <div>
                <strong>Gejala:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  {DUMMY_DIAGNOSIS.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Rekomendasi:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  {DUMMY_DIAGNOSIS.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button 
              fullWidth 
              size="lg" 
              className="mt-6"
              onClick={handleEndSession}
            >
              Beli Obat Resep (Rp{(DUMMY_DIAGNOSIS.medications.reduce((sum, med) => sum + (med.price * med.quantity), 0) + 45000).toLocaleString("id-ID")})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}