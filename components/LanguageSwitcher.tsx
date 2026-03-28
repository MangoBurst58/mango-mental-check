"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400">
        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>ID</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setLanguage(language === "id" ? "en" : "id")}
      className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
    >
      <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      <span>{language === "id" ? "ID" : "EN"}</span>
    </button>
  );
}