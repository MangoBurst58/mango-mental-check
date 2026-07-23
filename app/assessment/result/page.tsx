"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sparkles, ArrowLeft, TrendingUp, AlertCircle, Shield, Brain, Heart, 
  Info, BookOpen, Users, Phone, Calendar, ChevronRight 
} from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface AssessmentResult {
  type: string;
  score: number;
  level: string;
  description: string;
  // Hapus recommendation dari interface
  responses: number[];
  date: string;
}

export default function ResultPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastAssessment");
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-xs sm:text-sm text-gray-500">{t("common.loading")}</div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "minimal": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "ringan": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "sedang": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "sedang-berat": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "berat": return "text-red-600 bg-red-600/10 border-red-600/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getLevelInfo = (level: string, type: string) => {
    const levelMap: Record<string, string> = {
      "minimal": "minimal",
      "ringan": "mild",
      "sedang": "moderate",
      "sedang-berat": "moderateSevere",
      "berat": "severe"
    };
    const levelKey = levelMap[level] || "minimal";
    const prefix = type === "PHQ9" ? "phq9" : "gad7";
    
    return {
      symptoms: t(`result.${prefix}.${levelKey}.symptoms`),
      impact: t(`result.${prefix}.${levelKey}.impact`),
      action: t(`result.${prefix}.${levelKey}.action`),
    };
  };

  const levelInfo = getLevelInfo(result.level, result.type);

  const getLevelText = (level: string) => {
    switch (level) {
      case "minimal": return t("result.levelMinimal");
      case "ringan": return t("result.levelMild");
      case "sedang": return t("result.levelModerate");
      case "sedang-berat": return t("result.levelModerateSevere");
      case "berat": return t("result.levelSevere");
      default: return level;
    }
  };

  const getRecommendation = () => {
    const type = result.type === "PHQ9" ? "phq9" : "gad7";
    const levelMap: Record<string, string> = {
      "minimal": "minimal",
      "ringan": "ringan",
      "sedang": "sedang",
      "sedang-berat": "sedang-berat",
      "berat": "berat"
    };
    const levelKey = levelMap[result.level] || "minimal";
    return t(`assessment.recommendations.${type}.${levelKey}`);
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("result.backToDashboard")}</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-white">{t("result.title")}</span>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pt-20 pb-12">
        {/* Score Card */}
        <div className={`rounded-xl border p-5 mb-5 ${getLevelColor(result.level)}`}>
          <div className="text-center">
            <div className={`inline-flex p-2 rounded-lg ${getLevelColor(result.level)} mb-3`}>
              {result.level === "minimal" && <Shield className="w-5 h-5" />}
              {(result.level === "ringan" || result.level === "sedang") && <Brain className="w-5 h-5" />}
              {(result.level === "sedang-berat" || result.level === "berat") && <AlertCircle className="w-5 h-5" />}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {result.type === "PHQ9" ? "PHQ-9" : "GAD-7"}
            </h2>
            <p className="text-3xl font-bold text-white mb-1">{result.score}</p>
            <p className="text-sm text-gray-400 mb-3">
              {t("result.outOf")} {result.type === "PHQ9" ? "27" : "21"}
            </p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(result.level)}`}>
              {getLevelText(result.level)}
            </div>
          </div>
        </div>

        {/* Informasi Tingkatan */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-white">{t("result.about")} {getLevelText(result.level)}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">{t("result.symptoms")}</p>
              <p className="text-sm text-gray-300">{levelInfo.symptoms}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{t("result.impact")}</p>
              <p className="text-sm text-gray-300">{levelInfo.impact}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{t("result.action")}</p>
              <p className="text-sm text-gray-300">{levelInfo.action}</p>
            </div>
          </div>
        </div>

        {/* Rekomendasi - Menggunakan recommendation dari terjemahan */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-white">{t("result.recommendation")}</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {recommendation}
          </p>
        </div>

        {/* Informasi Tentang Alat Screening */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-3 mb-5">
          <div className="flex items-center gap-2 justify-center">
            <Info className="w-3 h-3 text-gray-500" />
            <p className="text-xs text-gray-500 text-center">
              {result.type === "PHQ9" 
                ? t("result.infoPhq9")
                : t("result.infoGad7")}
              {t("result.infoDisclaimer")}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-3 mb-5">
          <p className="text-xs text-gray-500 text-center">
            {t("result.disclaimer")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 font-medium hover:bg-gray-700 transition"
          >
            {t("result.backToDashboard")}
          </button>
          <button
            onClick={() => {
              const type = result.type === "PHQ9" ? "phq9" : "gad7";
              router.push(`/assessment/${type}`);
            }}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center gap-1"
          >
            {t("result.screeningAgain")}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}