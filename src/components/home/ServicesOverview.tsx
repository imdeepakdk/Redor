"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  MapPin,
  Instagram,
  Video,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { initialServices } from "@/lib/data/initialData";
import { TiltCard } from "@/components/ui/TiltCard";
import { REDOR_CONFIG } from "@/config/features";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Instagram: <Instagram className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
};

export const ServicesOverview: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-50/70 dark:bg-neutral-900/50 border-y border-neutral-200/80 dark:border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
              Capabilities & Offerings
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
              What We Build For You
            </h2>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              High-impact digital services designed to turn local searchers and social scrollers into real walk-ins and inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 group"
            >
              <span>View detailed deliverables & timelines</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {initialServices.map((service) => {
            const isAds = service.slug === "meta-ads-lead-generation";
            return (
              <TiltCard key={service.id} maxTilt={6}>
                <div className="origami-facet-card group relative flex flex-col justify-between h-full p-6 sm:p-7 bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all duration-300">
                  <div>
                    {/* Service Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-neutral-900 text-brand-600 dark:text-brand-400 border border-brand-200/50 dark:border-brand-900/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      {iconMap[service.icon] || <Globe className="w-6 h-6" />}
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {isAds && (
                      <span className="inline-block mb-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        Coming Soon / On Request
                      </span>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                      {service.short_description}
                    </p>

                    {/* Deliverables snippet */}
                    <ul className="space-y-2 mb-6">
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Footers */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                    <Link
                      href={`/services#${service.slug}`}
                      className="font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4"
                    >
                      Full Details
                    </Link>
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
