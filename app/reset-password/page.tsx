"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles } from "lucide-react";

// Komponen yang menggunakan useSearchParams dipisah
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token tidak valid");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage(data.message);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!token && !error) {
    return <div className="animate-pulse text-gray-500">Memuat...</div>;
  }

  if (error && !token) {
    return (
      <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Token Tidak Valid</h1>
          <p className="text-gray-400 mb-6">
            Link reset password tidak valid atau sudah kadaluarsa.
          </p>
          <Link href="/forgot-password" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Lupa Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg transform -rotate-3"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">Reset Password</h1>
        <p className="text-gray-400 text-center text-sm mb-6">Masukkan password baru Anda</p>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password Baru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Password tidak cocok</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/25 mt-6"
            >
              {loading ? "Memproses..." : "Reset Password"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-green-400">{message}</p>
            <p className="text-gray-500 text-sm">Anda akan dialihkan ke halaman login dalam 3 detik...</p>
            <Link href="/login" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition">
              <ArrowLeft className="w-4 h-4" />
              Langsung ke Login
            </Link>
          </div>
        )}

        {!success && (
          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Halaman utama dengan Suspense
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-500">Memuat...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}