"use client";

import React, { useEffect, useState } from "react";
import { FEATURE_FLAGS } from "@/config/features";

export const BrandIntro: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!FEATURE_FLAGS.ENABLE_INTRO_ANIMATION) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const seen = sessionStorage.getItem("redor_intro_seen");
    if (!seen) {
      setShow(true);
      sessionStorage.setItem("redor_intro_seen", "true");

      const timer = setTimeout(() => {
        setShow(false);
      }, 1100); // 1.1s total intro

      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => setShow(false);

  if (!show) return null;

  return (
    <div
      onClick={dismiss}
      role="dialog"
      aria-label="Welcome to REDOR"
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal text-white transition-opacity duration-300 animate-out fade-out cursor-pointer select-none"
    >
      <div className="flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
        {/* Animated Origami R Fold */}
        <div className="w-20 h-20 relative animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
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

        <div className="flex items-center gap-1.5 font-heading font-black text-2xl tracking-widest uppercase">
          <span>RED</span>
          <span className="text-brand-500">OR</span>
        </div>

        <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
          Greater Noida &bull; Web & Growth
        </span>
      </div>
    </div>
  );
};
