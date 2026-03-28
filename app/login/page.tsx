"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Sparkles, Shield, Brain, Heart, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.startsWith("RATE_LIMIT:")) {
          const minutes = result.error.split(":")[1];
          setError(t("auth.rateLimit", { minutes }));
        } else {
          setError(t(result.error) || t("auth.invalidCredentials"));
        }
        setLoading(false);
      } else if (result?.ok) {
        router.push("/dashboard");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
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
        onClick={() => router.push("/")}
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
                {t("auth.welcomeBack")}
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                {t("auth.welcomeMessage")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}
              
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
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">
                    {t("common.password")}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] sm:text-xs text-orange-500 hover:text-orange-400 transition"
                  >
                    {t("common.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-white placeholder-gray-500 text-sm sm:text-base"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/25 text-sm sm:text-base"
              >
                {loading ? t("common.loading") : t("auth.signIn")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-black text-gray-500">{t("common.or")}</span>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full bg-gray-900 border border-gray-800 text-white py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t("auth.signInWithGoogle")}
            </button>

            {/* Sign Up Link */}
            <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
              {t("common.dontHaveAccount")}{" "}
              <a href="/register" className="text-orange-500 font-medium hover:text-orange-400 transition">
                {t("auth.signUp")}
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Hero Section - Responsive (hidden di mobile) */}
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