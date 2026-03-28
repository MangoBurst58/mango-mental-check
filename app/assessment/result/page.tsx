"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, ArrowLeft, TrendingUp, AlertCircle, Shield, Brain, Heart, 
  Info, BookOpen, Users, Phone, Calendar, ChevronRight 
} from "lucide-react";

interface AssessmentResult {
  type: string;
  score: number;
  level: string;
  description: string;
  recommendation: string;
  responses: number[];
  date: string;
}

export default function ResultPage() {
  const router = useRouter();
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
        <div className="text-sm text-gray-500">Memuat hasil...</div>
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
    if (type === "PHQ9") {
      switch (level) {
        case "minimal":
          return {
            symptoms: "Tidak ada atau sangat sedikit gejala depresi yang mengganggu aktivitas sehari-hari.",
            impact: "Fungsi sehari-hari masih normal, tidak ada gangguan signifikan.",
            action: "Pertahankan pola hidup sehat, olahraga teratur, dan jaga koneksi sosial.",
          };
        case "ringan":
          return {
            symptoms: "Beberapa gejala depresi muncul, namun masih dapat diatasi dengan usaha sendiri.",
            impact: "Mungkin ada sedikit gangguan pada aktivitas atau produktivitas.",
            action: "Coba teknik self-help seperti mindfulness, journaling, atau olahraga ringan. Konseling singkat dapat membantu.",
          };
        case "sedang":
          return {
            symptoms: "Gejala depresi cukup sering muncul dan mulai mengganggu fungsi sehari-hari.",
            impact: "Produktivitas menurun, kesulitan menikmati aktivitas yang biasanya disukai.",
            action: "Sangat disarankan konsultasi dengan psikolog. Terapi perilaku kognitif (CBT) efektif untuk tingkat ini.",
          };
        case "sedang-berat":
          return {
            symptoms: "Gejala depresi muncul hampir setiap hari dan sangat mengganggu.",
            impact: "Kesulitan menjalankan aktivitas rutin, hubungan sosial terganggu.",
            action: "Segera konsultasi dengan psikolog atau psikiater. Terapi kombinasi (psikoterapi + obat) mungkin diperlukan.",
          };
        case "berat":
          return {
            symptoms: "Gejala depresi berat muncul hampir setiap hari, termasuk mungkin ada pikiran menyakiti diri.",
            impact: "Fungsi sehari-hari sangat terganggu, mungkin tidak bisa bekerja atau bersekolah.",
            action: "WAJIB konsultasi dengan psikiater segera. Jangan menunda mencari bantuan profesional.",
          };
        default:
          return { symptoms: "", impact: "", action: "" };
      }
    } else {
      // GAD-7
      switch (level) {
        case "minimal":
          return {
            symptoms: "Tidak ada atau sangat sedikit gejala kecemasan yang mengganggu.",
            impact: "Fungsi sehari-hari normal, tidak ada gangguan berarti.",
            action: "Pertahankan pola hidup sehat, praktikkan teknik relaksasi seperti pernapasan dalam.",
          };
        case "ringan":
          return {
            symptoms: "Beberapa gejala kecemasan muncul, seperti gelisah atau mudah lelah.",
            impact: "Mungkin ada sedikit gangguan pada konsentrasi atau tidur.",
            action: "Coba teknik relaksasi, kurangi kafein, olahraga teratur, dan praktik mindfulness.",
          };
        case "sedang":
          return {
            symptoms: "Gejala kecemasan cukup sering muncul dan mulai mengganggu aktivitas.",
            impact: "Kesulitan berkonsentrasi, gangguan tidur, mudah marah.",
            action: "Konsultasi dengan psikolog sangat disarankan. Terapi perilaku kognitif (CBT) efektif untuk mengelola kecemasan.",
          };
        case "berat":
          return {
            symptoms: "Gejala kecemasan berat muncul hampir setiap hari, mungkin disertai serangan panik.",
            impact: "Fungsi sehari-hari sangat terganggu, sulit melakukan aktivitas rutin.",
            action: "SEGERA konsultasi dengan psikolog atau psikiater. Penanganan profesional sangat diperlukan.",
          };
        default:
          return { symptoms: "", impact: "", action: "" };
      }
    }
  };

  const levelInfo = getLevelInfo(result.level, result.type);

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
              <span>Dashboard</span>
            </button>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-white">Hasil Screening</span>
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
            <p className="text-sm text-gray-400 mb-3">dari {result.type === "PHQ9" ? "27" : "21"}</p>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(result.level)}`}>
              {result.description}
            </div>
          </div>
        </div>

        {/* Informasi Tingkatan */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-white">Tentang {result.description}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Gejala yang Mungkin Muncul</p>
              <p className="text-sm text-gray-300">{levelInfo.symptoms}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Dampak pada Aktivitas</p>
              <p className="text-sm text-gray-300">{levelInfo.impact}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Yang Perlu Dilakukan</p>
              <p className="text-sm text-gray-300">{levelInfo.action}</p>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-white">Rekomendasi</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {result.recommendation}
          </p>
        </div>

        {/* Sumber Daya Pendukung */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-white">Sumber Daya Pendukung</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Users className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Konsultasi Profesional</p>
                <p className="text-xs text-gray-500">Cari psikolog atau psikiater terdekat untuk konsultasi lebih lanjut</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Hotline Kesehatan Mental</p>
                <p className="text-xs text-gray-500">119 (ext 8) • Yayasan Pulih: 021-500-454 • Into The Light: 021-725-7777</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Pantau Perkembangan</p>
                <p className="text-xs text-gray-500">Lakukan screening rutin setiap 2-4 minggu untuk melihat perubahan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Tentang Alat Screening */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-3 mb-5">
          <div className="flex items-center gap-2 justify-center">
            <Info className="w-3 h-3 text-gray-500" />
            <p className="text-xs text-gray-500 text-center">
              {result.type === "PHQ9" 
                ? "PHQ-9 adalah kuesioner standar yang digunakan secara global untuk screening depresi."
                : "GAD-7 adalah kuesioner standar yang digunakan secara global untuk screening kecemasan."}
              Hasil ini bersifat indikatif dan bukan diagnosis medis.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-3 mb-5">
          <p className="text-xs text-gray-500 text-center">
            ⚠️ Hasil screening ini BUKAN diagnosis medis. Jika Anda mengalami gejala yang mengganggu,
            segera konsultasikan dengan psikolog atau psikiater profesional.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 font-medium hover:bg-gray-700 transition"
          >
            Kembali ke Dashboard
          </button>
          <button
            onClick={() => {
              const type = result.type === "PHQ9" ? "phq9" : "gad7";
              router.push(`/assessment/${type}`);
            }}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center gap-1"
          >
            Screening Lagi
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}