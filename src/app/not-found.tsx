import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Origami Symbol */}
        <div className="w-20 h-20 mx-auto">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
            <polygon points="26,25 58,25 42,41" fill="#E54A46" />
            <polygon points="26,25 42,41 26,41" fill="#AE3033" />
            <polygon points="58,25 74,41 58,41" fill="#D65152" />
            <polygon points="58,41 74,41 58,57" fill="#A13F40" />
            <polygon points="26,41 42,41 42,57" fill="#B53237" />
            <polygon points="26,41 42,57 26,75" fill="#E14843" />
            <polygon points="42,57 58,57 58,75" fill="#A72F38" />
            <polygon points="58,57 74,75 58,75" fill="#DB5353" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="font-heading font-black text-6xl text-brand-600 tracking-tight">
            404
          </span>
          <h1 className="font-heading font-bold text-2xl text-neutral-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs hover:bg-brand-600 dark:hover:bg-brand-600 dark:hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
