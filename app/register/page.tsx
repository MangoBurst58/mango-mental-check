"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Sparkles, Shield, Brain, Heart, User, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      setLoading(false);
      return;
    }

    if (!isPasswordStrong()) {
      setError("Password harus memenuhi semua kriteria keamanan (minimal 8 karakter, huruf besar, huruf kecil, angka, dan simbol)");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t("auth.registerSuccess"));
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.error || t("auth.emailExists"));
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Header - Fixed Top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <Logo variant="navbar" showText={true} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/login")}
        className="absolute top-16 sm:top-20 left-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>{t("common.back")}</span>
      </button>

      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* LEFT SIDE - FORM */}
        <div className="flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:px-12">
          <div className="w-full max-w-md">
            {/* Header Form */}
            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {t("auth.createAccount")}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                {t("auth.createAccountMessage")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm">
                  {message}
                </div>
              )}
              
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  {t("auth.fullName")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Nama lengkap"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  {t("auth.emailAddress")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  {t("common.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
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
                  <div className="mt-2 space-y-1.5">
                    <p className="text-[10px] sm:text-xs text-gray-400">Kriteria Password:</p>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5">
                        {passwordStrength.length ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={`text-[10px] sm:text-xs ${passwordStrength.length ? "text-green-400" : "text-gray-500"}`}>
                          Minimal 8 karakter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordStrength.uppercase ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={`text-[10px] sm:text-xs ${passwordStrength.uppercase ? "text-green-400" : "text-gray-500"}`}>
                          Huruf besar (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordStrength.lowercase ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={`text-[10px] sm:text-xs ${passwordStrength.lowercase ? "text-green-400" : "text-gray-500"}`}>
                          Huruf kecil (a-z)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordStrength.number ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={`text-[10px] sm:text-xs ${passwordStrength.number ? "text-green-400" : "text-gray-500"}`}>
                          Angka (0-9)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        {passwordStrength.special ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className={`text-[10px] sm:text-xs ${passwordStrength.special ? "text-green-400" : "text-gray-500"}`}>
                          Karakter khusus (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  {t("common.confirmPassword")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
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
                  <p className="text-[10px] sm:text-xs text-red-400 mt-1">Password tidak cocok</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isPasswordStrong()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25 mt-4 sm:mt-6 text-sm sm:text-base"
              >
                {loading ? t("common.loading") : t("auth.signUp")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
              {t("common.alreadyHaveAccount")}{" "}
              <a href="/login" className="text-orange-500 font-medium hover:text-orange-400 transition">
                {t("auth.signIn")}
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Hidden di mobile */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col justify-center p-12 w-full">
            <div className="mb-8">
              <div className="mb-6">
                <Logo variant="large" showText={false} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                {t("app.name")}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                {t("screening.description")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Shield className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-400">{t("dashboard.private")}</p>
              </div>
              <div className="text-center">
                <Brain className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-400">{t("dashboard.scientific")}</p>
              </div>
              <div className="text-center">
                <Heart className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-400">{t("dashboard.free")}</p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <p className="text-xs text-gray-600 text-center">
                {t("footer.developedBy")} <span className="text-orange-500/70">{t("footer.developer")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}