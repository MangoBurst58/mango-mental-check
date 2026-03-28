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
      <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
        <Globe className="w-4 h-4" />
        <span>ID</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setLanguage(language === "id" ? "en" : "id")}
      className="flex items-center gap-1 px-2 py-1 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
    >
      <Globe className="w-4 h-4" />
      <span>{language === "id" ? "ID" : "EN"}</span>
    </button>
  );
}