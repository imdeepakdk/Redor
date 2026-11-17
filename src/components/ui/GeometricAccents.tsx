import React from "react";

export const FloatingOrigamiDecor: React.FC<{
  position?: "top-right" | "bottom-left" | "center-right";
  className?: string;
}> = ({ position = "top-right", className = "" }) => {
  const posClasses = {
    "top-right": "top-10 -right-10 md:right-10",
    "bottom-left": "bottom-10 -left-10 md:left-10",
    "center-right": "top-1/2 -right-8 -translate-y-1/2",
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute -z-10 pointer-events-none opacity-20 dark:opacity-30 ${posClasses[position]} ${className}`}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        fill="none"
        className="animate-float-slow"
      >
        <polygon points="30,20 80,40 50,85" fill="#D93A3A" opacity="0.6" />
        <polygon points="30,20 50,85 15,60" fill="#B71C1C" opacity="0.8" />
        <polygon points="80,40 50,85 90,75" fill="#E54A46" opacity="0.5" />
      </svg>
    </div>
  );
};

export const AngledSectionDivider: React.FC<{
  flip?: boolean;
  className?: string;
}> = ({ flip = false, className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={`w-full h-8 sm:h-12 text-neutral-50/70 dark:text-neutral-900/50 fill-current ${
          flip ? "rotate-180" : ""
        }`}
      >
        <polygon points="0,0 1200,60 0,60" />
      </svg>
    </div>
  );
};
