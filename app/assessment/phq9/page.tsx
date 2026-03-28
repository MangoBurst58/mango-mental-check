"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle, AlertCircle, Info } from "lucide-react";
import { phq9Questions, phq9Options, getPhq9Level } from "@/lib/assessment/phq9";
import Logo from "@/components/Logo";

export default function Phq9Page() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalQuestions = phq9Questions.length;
  const isComplete = answers.every(a => a !== -1);
  const progress = (answers.filter(a => a !== -1).length / totalQuestions) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      setError(t("assessment.errorIncomplete"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    const { level, description, recommendation } = getPhq9Level(totalScore);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PHQ9",
          score: totalScore,
          level,
          responses: answers,
        }),
      });

      if (res.ok) {
        localStorage.setItem("lastAssessment", JSON.stringify({
          type: "PHQ9",
          score: totalScore,
          level,
          description,
          recommendation,
          responses: answers,
          date: new Date().toISOString(),
        }));
        router.push("/assessment/result");
      } else {
        setError(t("assessment.errorSave"));
      }
    } catch (error) {
      setError(t("assessment.errorSave"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = phq9Questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

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
              <span>{t("common.back")}</span>
            </button>
            <Logo variant="navbar" showText={false} />
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-12">
        {/* Instruksi */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-5">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-orange-400 font-medium mb-1">{t("assessment.instruction")}</p>
              <p className="text-xs text-gray-300">{t("assessment.instructionPeriod")}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t("common.progress")}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="mb-4">
            <span className="text-xs text-orange-500 font-medium">
              {t("assessment.question")} {currentQuestion + 1} / {totalQuestions}
            </span>
            <p className="text-base font-medium text-white mt-1 leading-relaxed">
              {currentQ.text}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {phq9Options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
                  currentAnswer === option.value
                    ? "border-orange-500 bg-orange-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    currentAnswer === option.value
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-500"
                  }`}>
                    {currentAnswer === option.value && (
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition"
          >
            {t("common.previous")}
          </button>
          
          {currentQuestion === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50"
            >
              {isSubmitting ? t("common.loading") : t("assessment.viewResult")}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentAnswer === -1}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {t("common.next")}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-600">
            {t("assessment.source")} Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: Validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-2.5 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}