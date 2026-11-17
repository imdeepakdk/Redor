import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "light" | "dark" | "auto";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  variant = "auto",
}) => {
  const sizeMap = {
    sm: { symbol: 28, text: "text-lg", gap: "gap-2" },
    md: { symbol: 36, text: "text-xl", gap: "gap-2.5" },
    lg: { symbol: 48, text: "text-2xl", gap: "gap-3" },
    xl: { symbol: 64, text: "text-4xl", gap: "gap-4" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${currentSize.gap} group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg ${className}`}
      aria-label="REDOR Homepage"
    >
      {/* Origami Folded "R" Symbol */}
      <div
        className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: currentSize.symbol, height: currentSize.symbol }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Facet 1: Top horizontal bar upper fold */}
          <polygon points="26,25 58,25 42,41" fill="#E54A46" />
          {/* Facet 2: Left upper spine triangle */}
          <polygon points="26,25 42,41 26,41" fill="#AE3033" />
          {/* Facet 3: Upper loop top-right angle fold */}
          <polygon points="58,25 74,41 58,41" fill="#D65152" />
          {/* Facet 4: Upper loop bottom-right shadow facet */}
          <polygon points="58,41 74,41 58,57" fill="#A13F40" />
          {/* Facet 5: Left middle spine block */}
          <polygon points="26,41 42,41 42,57" fill="#B53237" />
          {/* Facet 6: Left lower spine diagonal fold (points down to left tip) */}
          <polygon points="26,41 42,57 26,75" fill="#E14843" />
          {/* Facet 7: Right leg upper diagonal facet */}
          <polygon points="42,57 58,57 58,75" fill="#A72F38" />
          {/* Facet 8: Right leg lower diagonal fold (points down to right tip) */}
          <polygon points="58,57 74,75 58,75" fill="#DB5353" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-black tracking-wider uppercase ${currentSize.text} text-neutral-950 dark:text-white transition-colors duration-200`}
          >
            RED<span className="text-brand-500">OR</span>
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-neutral-600 dark:text-neutral-400 uppercase -mt-0.5">
            Greater Noida
          </span>
        </div>
      )}
    </Link>
  );
};
