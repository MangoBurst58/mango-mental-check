"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles, XCircle } from "lucide-react";

export default function ResetPasswordPage() {
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

  // Password strength validation
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const checkPasswordStrength = (pass: string) => {
    setPasswordStrength({
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const isPasswordStrong = () => {
    return (
      passwordStrength.length &&
      passwordStrength.uppercase &&
      passwordStrength.lowercase &&
      passwordStrength.number &&
      passwordStrength.special
    );
  };

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

    // Validasi kekuatan password
    if (!isPasswordStrong()) {
      setError("Password harus memenuhi semua kriteria keamanan (minimal 8 karakter, huruf besar, huruf kecil, angka, dan simbol)");
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
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-500">Memuat...</div>
      </div>
    );
  }

  if (error && !token) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Token Tidak Valid</h1>
            <p className="text-gray-400 mb-6">
              Link reset password tidak valid atau sudah kadaluarsa.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Lupa Password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg transform -rotate-3"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            Masukkan password baru Anda
          </p>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
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
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-400 mb-1">Kriteria Password:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        {passwordStrength.length ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className={`text-xs ${passwordStrength.length ? "text-green-400" : "text-gray-500"}`}>
                          Minimal 8 karakter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordStrength.uppercase ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className={`text-xs ${passwordStrength.uppercase ? "text-green-400" : "text-gray-500"}`}>
                          Huruf besar (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordStrength.lowercase ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className={`text-xs ${passwordStrength.lowercase ? "text-green-400" : "text-gray-500"}`}>
                          Huruf kecil (a-z)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordStrength.number ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className={`text-xs ${passwordStrength.number ? "text-green-400" : "text-gray-500"}`}>
                          Angka (0-9)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        {passwordStrength.special ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                        )}
                        <span className={`text-xs ${passwordStrength.special ? "text-green-400" : "text-gray-500"}`}>
                          Karakter khusus (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Konfirmasi Password
                </label>
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
                disabled={loading || !isPasswordStrong()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25 mt-6"
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
              <p className="text-gray-500 text-sm">
                Anda akan dialihkan ke halaman login dalam 3 detik...
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Langsung ke Login
              </Link>
            </div>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}