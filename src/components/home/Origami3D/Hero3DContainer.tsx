"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { check3DCapability } from "./capabilities";
import { FEATURE_FLAGS } from "@/config/features";

// Lazy load the 3D canvas with ssr: false so Three.js code is fully code-split from critical initial bundle
const LazyOrigamiCanvas = dynamic(() => import("./OrigamiCanvas"), {
  ssr: false,
  loading: () => null,
});

export const Hero3DContainer: React.FC = () => {
  const [canRender3D, setCanRender3D] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);

  useEffect(() => {
    // Only check and load after main content paints
    const timer = setTimeout(() => {
      const capability = check3DCapability();
      if (capability.capable) {
        setCanRender3D(true);
        // Small delay to allow canvas initialization before fading in
        setTimeout(() => setIs3DReady(true), 300);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] mx-auto flex items-center justify-center">
      <span className="sr-only">
        Interactive 3D origami red letter R representing the REDOR agency brand mark.
      </span>

      {/* Immediate Static Poster Fallback (always rendered initially, never blocks LCP) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
          is3DReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-56 h-56 sm:w-72 sm:h-72 drop-shadow-2xl animate-float-slow">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
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
      </div>

      {/* Interactive 3D WebGL Canvas (Loaded lazily if capable) */}
      {canRender3D && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            is3DReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <LazyOrigamiCanvas />
        </div>
      )}

      {/* Ambient background soft glow circle */}
      <div className="absolute -z-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-500/15 dark:bg-brand-600/20 blur-3xl pointer-events-none" />
    </div>
  );
};
