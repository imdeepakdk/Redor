import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Globe,
  MapPin,
  Instagram,
  Video,
  Palette,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { initialServices } from "@/lib/data/initialData";
import { createServerClient } from "@/lib/supabase/server";
import { Service } from "@/types";
import { REDOR_CONFIG } from "@/config/features";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore our complete range of digital marketing and web engineering services in Greater Noida: Website Development, Google Business Profile, Reels, Video Editing, and Branding.",
};

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
  MapPin: <MapPin className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
  Instagram: <Instagram className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
  Video: <Video className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
  Palette: <Palette className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-brand-600 dark:text-brand-400" />,
};

async function getServices(): Promise<Service[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Service[];
    }
  } catch (err) {
    // fallback
  }
  return initialServices;
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-16 md:py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
            Capabilities & Deliverables
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight mb-4">
            Services Built to Convert Local Customers
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            Every service is engineered specifically for local businesses in Greater Noida, Noida,
            and NCR. No hidden surprises, no retainers that produce zero results.
          </p>

          {/* Launch Offer Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-amber-50/60 dark:from-brand-950/60 dark:to-neutral-900 border border-brand-200 dark:border-brand-900/60 flex items-start gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              <strong className="text-brand-600 dark:text-brand-400 font-bold">
                Special Launch Rate:
              </strong>{" "}
              {REDOR_CONFIG.launchOfferText}
            </div>
          </div>

          {/* Quick jump pills */}
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950 dark:hover:text-brand-400 transition-colors shadow-xs"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services List Detailed Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {services.map((service) => {
          const isAds = service.slug === "meta-ads-lead-generation";

          return (
            <div
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 p-8 sm:p-10 rounded-3xl bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden"
            >
              {/* Origami corner triangle indicator */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand-500/10 to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Col 1: Overview & Scope */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-center flex-shrink-0">
                      {iconMap[service.icon] || <Globe className="w-8 h-8 text-brand-600" />}
                    </div>
                    <div>
                      <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white">
                        {service.title}
                      </h2>
                      {isAds && (
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          Coming Soon / Available On Request
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {service.full_description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                      What You Get (Deliverables)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 2: Context Card & CTA */}
                <div className="lg:col-span-5 bg-white dark:bg-charcoal p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    {/* Who it's for */}
                    {service.target_audience && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                          <Users className="w-3.5 h-3.5 text-brand-500" />
                          <span>Who This Is For</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {service.target_audience}
                        </p>
                      </div>
                    )}

                    {/* Typical Timeline */}
                    {service.timeline && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                          <Clock className="w-3.5 h-3.5 text-brand-500" />
                          <span>Typical Turnaround</span>
                        </div>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {service.timeline}
                        </p>
                      </div>
                    )}

                    {/* Starting From Price (Optional, Default OFF, toggleable in admin) */}
                    {service.is_price_visible && service.starting_price && (
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <span className="text-xs text-neutral-500 uppercase tracking-wider block">
                          Investment
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-heading font-black text-2xl text-brand-600 dark:text-brand-400">
                            ₹{service.starting_price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-neutral-500">starting from</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Booking CTA button with preselection */}
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-sm hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-md group"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
