"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    "Hi Deepak! I am looking for digital marketing/website services for my business in Greater Noida."
  );
  const waUrl = `https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2 pointer-events-none">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-white px-3.5 py-2 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with Deepak ({REDOR_CONFIG.displayWhatsapp})</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating 3D Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-emerald-400 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900"
        aria-label="Chat on WhatsApp with REDOR founder Deepak Kumar"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:scale-105 transition-transform" />
        {/* Pulsing ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white dark:border-neutral-900" />
        </span>
      </a>
    </div>
  );
};
