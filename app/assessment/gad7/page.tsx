"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle, AlertCircle, Info } from "lucide-react";
import { getGad7Level } from "@/lib/assessment/gad7";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Gad7Page() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const questions = [
    t("assessment.gad7.questions.0"),
    t("assessment.gad7.questions.1"),
    t("assessment.gad7.questions.2"),
    t("assessment.gad7.questions.3"),
    t("assessment.gad7.questions.4"),
    t("assessment.gad7.questions.5"),
    t("assessment.gad7.questions.6"),
  ];

  const options = [
    { value: 0, label: t("assessment.options.0") },
    { value: 1, label: t("assessment.options.1") },
    { value: 2, label: t("assessment.options.2") },
    { value: 3, label: t("assessment.options.3") },
  ];

  const totalQuestions = questions.length;
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
    const { level, description, recommendation } = getGad7Level(totalScore);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "GAD7",
          score: totalScore,
          level,
          responses: answers,
        }),
      });

      if (res.ok) {
        localStorage.setItem("lastAssessment", JSON.stringify({
          type: "GAD7",
          score: totalScore,
          level,
          description,
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

  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen w-full bg-black">
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
            <div className="flex items-center gap-4">
              <Logo variant="navbar" showText={false} />
              <LanguageSwitcher />
            </div>
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-20 pb-12">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-5">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-blue-400 font-medium mb-1">{t("assessment.instruction")}</p>
              <p className="text-xs text-gray-300">{t("assessment.instructionPeriod")}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t("common.progress")}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-5">
          <div className="mb-4">
            <span className="text-xs text-blue-500 font-medium">
              {t("assessment.question")} {currentQuestion + 1} / {totalQuestions}
            </span>
            <p className="text-base font-medium text-white mt-1 leading-relaxed">
              {questions[currentQuestion]}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all ${
                  currentAnswer === option.value
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    currentAnswer === option.value
                      ? "border-blue-500 bg-blue-500"
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
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-sm text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50"
            >
              {isSubmitting ? t("common.loading") : t("assessment.viewResult")}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentAnswer === -1}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-sm text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {t("common.next")}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-600">
            {t("assessment.source")} Spitzer RL, Kroenke K, Williams JBW, Löwe B. A brief measure for assessing generalized anxiety disorder: The GAD-7. Arch Intern Med. 2006;166(10):1092-1097.
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