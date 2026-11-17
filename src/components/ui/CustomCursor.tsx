"use client";

import React, { useEffect, useState } from "react";
import { FEATURE_FLAGS } from "@/config/features";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!FEATURE_FLAGS.ENABLE_CUSTOM_CURSOR) return;

    // Only enable for desktop mice, not touchscreens
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || reducedMotion) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth trailing loop
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Center sharp red pinpoint */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-500 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* Trailing soft aura circle */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-brand-500/40 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-150 ${
          isPointer
            ? "w-10 h-10 bg-brand-500/10 border-brand-500/80 scale-110"
            : "w-7 h-7 bg-transparent"
        }`}
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};
