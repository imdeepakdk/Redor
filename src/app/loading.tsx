import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 relative animate-spin">
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
      <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase animate-pulse">
        Loading REDOR...
      </p>
    </div>
  );
}
