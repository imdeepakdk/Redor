"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // Only enable magnetic effect on devices with a fine pointer (mouse) and no reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanAnimate(hasFinePointer && !reducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Subtle magnetic strength (18%)
    setPosition({ x: x * 0.18, y: y * 0.18 });
  };

  const handleMouseEnter = () => {
    if (!canAnimate) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-bold text-sm tracking-wide rounded-xl select-none transition-all duration-200 active:translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/40 border border-brand-400/30",
    secondary:
      "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-sm",
    outline:
      "bg-white/80 dark:bg-charcoal/80 backdrop-blur-xs border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  };

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: canAnimate
          ? `translate3d(${position.x}px, ${position.y}px, 0)`
          : undefined,
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.4s cubic-bezier(0.2, 1, 0.3, 1)",
      }}
      className="inline-block"
    >
      <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl">
      {content}
    </button>
  );
};
