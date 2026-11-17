"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, MapPin, Sparkles, Clock } from "lucide-react";
import { Hero3DContainer } from "./Origami3D/Hero3DContainer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { REDOR_CONFIG } from "@/config/features";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Background Soft Glows & Depth Gradients */}
      <div className="absolute top-10 right-10 -z-10 w-[450px] h-[450px] bg-brand-500/10 dark:bg-brand-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-brand-700/10 dark:bg-brand-900/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Launch Offer Callout Pill */}
        <div className="mb-6 flex justify-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-50 to-brand-100/80 dark:from-brand-950/80 dark:to-brand-900/40 border border-brand-300 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 shadow-xs animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-brand-600 dark:text-brand-400">
              Launch Special:
            </span>
            <span className="hidden sm:inline font-medium">
              {REDOR_CONFIG.launchOfferText}
            </span>
            <span className="sm:hidden font-medium">
              Special rate for Greater Noida clients!
            </span>
          </div>
        </div>

        {/* 2-Column Hero: Left Typography & Actions, Right 3D Origami Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Col 1: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Founder Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{REDOR_CONFIG.city}</span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">
                Deepak Kumar (Solo Founder)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-neutral-950 dark:text-white tracking-tight leading-[1.12]">
              Help your business get more{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 dark:from-brand-400 dark:to-brand-600">
                real customers
                <svg
                  className="absolute left-0 -bottom-2 w-full h-2.5 text-brand-500/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>{" "}
              online in Greater Noida.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Custom Next.js websites that load instantly, top 3 Google Business Profile rankings,
              and punchy short-form reels for gyms, salons, clinics, cafes, and local businesses.
              No agency middlemen.
            </p>

            {/* CTAs with 3D Magnetic Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <MagneticButton
                href="/book"
                variant="primary"
                className="px-7 py-3.5 text-base flex items-center justify-center gap-2 group"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                href="/work"
                variant="outline"
                className="px-6 py-3.5 text-base flex items-center justify-center gap-2"
              >
                <span>View Our Work</span>
              </MagneticButton>

              <a
                href={`https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Deepak! I want to know more about REDOR services for my business in Greater Noida."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

            {/* Reply Guarantee & Value Props */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span>{REDOR_CONFIG.replyGuarantee}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Next.js Speed (0.7s)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    100% Mobile First
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    Direct WhatsApp Leads
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Interactive 3D Origami Canvas */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Hero3DContainer />
          </div>
        </div>
      </div>
    </section>
  );
};
