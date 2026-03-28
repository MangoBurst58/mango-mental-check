"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Shield, Brain, Heart, FileText, Clock, LogOut, 
  History, TrendingUp, AlertCircle, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

interface DashboardContentProps {
  userName: string;
  userEmail: string;
}

interface Assessment {
  id: string;
  type: string;
  score: number;
  level: string;
  createdAt: string;
}

export default function DashboardContent({ userName, userEmail }: DashboardContentProps) {
  const { t } = useLanguage();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await fetch("/api/assessment");
        if (res.ok) {
          const data = await res.json();
          setAssessments(data);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "minimal":
        return "text-green-500 bg-green-500/10";
      case "ringan":
        return "text-yellow-500 bg-yellow-500/10";
      case "sedang":
        return "text-orange-500 bg-orange-500/10";
      case "sedang-berat":
        return "text-red-500 bg-red-500/10";
      case "berat":
        return "text-red-600 bg-red-600/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "minimal":
        return t("result.levelMinimal");
      case "ringan":
        return t("result.levelMild");
      case "sedang":
        return t("result.levelModerate");
      case "sedang-berat":
        return t("result.levelModerateSevere");
      case "berat":
        return t("result.levelSevere");
      default:
        return level;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(t("locale") === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-black">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo variant="navbar" showText={true} />
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <span className="text-sm text-gray-300 hidden sm:block">
                {t("dashboard.welcome").replace("{{name}}", userName)}
              </span>
              <Link
                href="/signout"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t("common.logout")}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t("dashboard.welcome").replace("{{name}}", userName)} 👋
          </h1>
          <p className="text-gray-400">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Quick Actions - Screening Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* PHQ-9 Card */}
          <Link href="/assessment/phq9" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">PHQ-9</h2>
                <p className="text-gray-400 text-sm mb-3">
                  {t("screening.phq9.fullName")} • {t("screening.phq9.questions")} • {t("screening.phq9.duration")}
                </p>
                <p className="text-gray-500 text-xs">
                  {t("screening.phq9.description")}
                </p>
                <div className="mt-4 flex items-center text-orange-500 text-sm font-medium group-hover:gap-2 transition-all gap-1">
                  {t("screening.phq9.start")}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* GAD-7 Card */}
          <Link href="/assessment/gad7" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">GAD-7</h2>
                <p className="text-gray-400 text-sm mb-3">
                  {t("screening.gad7.fullName")} • {t("screening.gad7.questions")} • {t("screening.gad7.duration")}
                </p>
                <p className="text-gray-500 text-xs">
                  {t("screening.gad7.description")}
                </p>
                <div className="mt-4 flex items-center text-blue-500 text-sm font-medium group-hover:gap-2 transition-all gap-1">
                  {t("screening.gad7.start")}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-800 pt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t("dashboard.whyChoose")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
              <Shield className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{t("dashboard.private")}</p>
                <p className="text-gray-500 text-xs">{t("dashboard.privateDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
              <Brain className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{t("dashboard.scientific")}</p>
                <p className="text-gray-500 text-xs">{t("dashboard.scientificDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
              <Heart className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{t("dashboard.free")}</p>
                <p className="text-gray-500 text-xs">{t("dashboard.freeDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-white">
              {t("dashboard.recentScreenings")}
            </h3>
          </div>

          {loading ? (
            <div className="text-center py-8 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="animate-pulse text-gray-500">{t("common.loading")}</div>
            </div>
          ) : assessments.length === 0 ? (
            <div className="text-center py-8 bg-gray-900/30 rounded-xl border border-gray-800">
              <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                {t("dashboard.noHistory")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getLevelColor(item.level)}`}>
                      {item.type === "PHQ9" ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {item.type === "PHQ9" ? "PHQ-9" : "GAD-7"} - {item.score} {t("result.points")}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                    {getLevelText(item.level)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}