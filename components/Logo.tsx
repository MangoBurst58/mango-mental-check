"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "navbar" | "large" | "small";
  showText?: boolean;
}

export default function Logo({ variant = "navbar", showText = true }: LogoProps) {
  const sizeClasses = {
    navbar: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
    large: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
    small: "w-5 h-5 sm:w-6 sm:h-6",
  };

  const iconSizes = {
    navbar: "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5",
    large: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
    small: "w-3 h-3 sm:w-3.5 sm:h-3.5",
  };

  const textSizes = {
    navbar: "text-xs sm:text-sm md:text-base lg:text-lg",
    large: "text-base sm:text-lg md:text-xl lg:text-2xl",
    small: "text-[10px] sm:text-xs",
  };

  return (
    <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 group">
      <div className={`relative ${sizeClasses[variant]} group`}>
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className={`${iconSizes[variant]} text-white`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            <circle cx="12" cy="10" r="1.2" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`${textSizes[variant]} font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent`}>
          Mango Mental Check
        </span>
      )}
    </Link>
  );
}