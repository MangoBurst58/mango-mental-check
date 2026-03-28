"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, ArrowLeft, XCircle } from "lucide-react";
import Link from "next/link";

export default function SignoutPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
              <LogOut className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-3">
            Sign Out
          </h1>
          
          {/* Description */}
          <p className="text-gray-400 text-center mb-8">
            Are you sure you want to sign out? You'll need to sign in again to access your account.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/25"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            
            <Link
              href="/dashboard"
              className="w-full bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}