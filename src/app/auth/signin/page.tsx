"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("demo@kimiafarma.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau kata sandi tidak valid");
      } else if (result?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Terjadi kesalahan. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm">Kembali</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="Kimia Farma" 
                width={120} 
                height={28} 
                className="mx-auto"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang Kembali</h1>
            <p className="text-muted-foreground text-sm">
              Masuk ke akun Anda untuk melanjutkan belanja obat dan kesehatan
            </p>
          </div>

          {/* Demo Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-sm mb-1">Akun Demo</h3>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Gunakan kredensial di bawah untuk mencoba semua fitur aplikasi:
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-blue-600"><strong>Email:</strong> demo@kimiafarma.com</p>
                  <p className="text-xs text-blue-600"><strong>Password:</strong> demo123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="Masukkan kata sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-brand border-border rounded focus:ring-brand" />
                <span className="text-sm text-muted-foreground">Ingat saya</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-brand hover:text-brand/80 font-medium">
                Lupa kata sandi?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              disabled={loading}
              className="bg-brand text-white font-semibold py-3 mt-6"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Masuk...
                </div>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">atau</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Lanjutkan dengan Google</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/auth/signup" className="text-brand hover:text-brand/80 font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dengan masuk, Anda menyetujui{" "}
              <Link href="/syarat" className="text-brand hover:underline">
                Syarat & Ketentuan
              </Link>
              {" "}dan{" "}
              <Link href="/privasi" className="text-brand hover:underline">
                Kebijakan Privasi
              </Link>
              {" "}Kimia Farma
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
