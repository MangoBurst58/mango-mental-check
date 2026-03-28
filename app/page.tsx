"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sparkles, Shield, Brain, Heart, FileText, Clock, ArrowRight, ChevronRight, Zap 
} from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Shield,
      title: t("dashboard.private"),
      description: t("dashboard.privateDesc"),
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Brain,
      title: t("dashboard.scientific"),
      description: t("dashboard.scientificDesc"),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Heart,
      title: t("dashboard.free"),
      description: t("dashboard.freeDesc"),
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden">
      {/* Animated Background - hanya di desktop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div 
          className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
          style={{ 
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Logo variant="navbar" showText={true} />
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/login" className="text-xs sm:text-sm text-gray-400 hover:text-white transition px-2 sm:px-3 py-1.5 rounded-lg hover:bg-gray-800/50">
                {t("common.login")}
              </Link>
              <Link
                href="/register"
                className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                {t("common.register")}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center pt-16 sm:pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              {/* Logo besar di hero - menggunakan komponen Logo */}
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                <Logo variant="large" showText={false} />
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-6 leading-tight"
              >
                {t("app.name")}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {t("home.heroDescription")}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/register")}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-sm sm:text-base md:text-lg overflow-hidden shadow-xl shadow-orange-500/25"
                >
                  <span className="relative z-10">{t("home.startNow")}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 bg-gray-900/50 border border-gray-700 text-white rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-800/50 transition-all backdrop-blur-sm"
                >
                  {t("home.learnMore")}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 lg:mt-0"
            >
              {[
                { icon: FileText, title: "PHQ-9", desc: t("screening.phq9.fullName"), time: t("screening.phq9.questions") + " • " + t("screening.phq9.duration"), color: "orange" },
                { icon: Clock, title: "GAD-7", desc: t("screening.gad7.fullName"), time: t("screening.gad7.questions") + " • " + t("screening.gad7.duration"), color: "blue" }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative overflow-hidden p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 hover:border-${item.color}-500/50 transition-all cursor-pointer`}
                  onClick={() => router.push("/register")}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/0 to-${item.color}-500/5 group-hover:opacity-100 opacity-0 transition-opacity`} />
                  <item.icon className={`w-8 h-8 sm:w-10 sm:h-10 text-${item.color}-500 mb-2 sm:mb-3`} />
                  <p className="text-xl sm:text-2xl font-bold text-white">{item.title}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">{item.time}</p>
                  <div className="mt-2 sm:mt-3 flex items-center text-[10px] sm:text-xs text-gray-500 group-hover:text-white transition-colors">
                    {item.title === "PHQ-9" ? t("screening.phq9.start") : t("screening.gad7.start")}
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-gray-600 flex justify-center">
            <div className="w-1 h-1.5 sm:h-2 bg-gray-600 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {t("home.whyTitle")} <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">{t("app.name")}</span>?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
              {t("home.whyDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 group-hover:border-orange-500/30 transition-all">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 sm:p-3 mb-3 sm:mb-4 shadow-lg`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 px-4">
              {t("home.ctaDescription")}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/register")}
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-sm sm:text-base md:text-lg shadow-xl shadow-orange-500/25"
            >
              {t("home.ctaButton")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <Logo variant="small" showText={false} />
            <p className="text-[10px] sm:text-xs text-gray-600">
              {t("footer.developedBy")} <span className="text-orange-500/70">{t("footer.developer")}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}