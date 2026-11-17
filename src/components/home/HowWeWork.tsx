"use client";

import React from "react";
import { howWeWorkSteps } from "@/lib/data/initialData";
import { Search, Compass, Hammer, Rocket, ShieldCheck, HeartHandshake, CheckCircle } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

const stepIcons = [
  <Search key="1" className="w-5 h-5 text-brand-500" />,
  <Compass key="2" className="w-5 h-5 text-brand-500" />,
  <Hammer key="3" className="w-5 h-5 text-brand-500" />,
  <Rocket key="4" className="w-5 h-5 text-brand-500" />,
];

export const HowWeWork: React.FC = () => {
  return (
    <section id="how-we-work" className="py-24 relative overflow-hidden">
      {/* Background Subtle Origami Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
            Working Philosophy
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
            How We Work With You
          </h2>
          <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
            A 4-step framework built for transparency, speed, and real-world local business growth.
            Direct WhatsApp communication from day one.
          </p>
        </div>

        {/* 3 Core Rules Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs uppercase font-bold text-brand-400 tracking-wider block mb-4">
              Founder Deepak Kumar&apos;s Working Rules
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REDOR_CONFIG.founderPhilosophy.map((p, idx) => (
                <div key={idx} className="space-y-1.5 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    <span>{p.title}</span>
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-6">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Steps: 3D Layered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {howWeWorkSteps.map((step, idx) => (
            <div
              key={step.step}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Isometric 3D Step Number */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-heading font-black text-xl flex items-center justify-center shadow-md shadow-brand-500/20 transform group-hover:rotate-6 transition-transform">
                    {step.step}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <h4 className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-3">
                  {step.headline}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                <span>Phase {idx + 1} of 4</span>
                <span className="w-2 h-2 rounded-full bg-brand-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
