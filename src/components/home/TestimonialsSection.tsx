"use client";

import React, { useEffect, useState } from "react";
import { Star, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Testimonial } from "@/types";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_published", true)
          .order("display_order", { ascending: true });

        if (!error && data) {
          setTestimonials(data as Testimonial[]);
        }
      } catch (err) {
        console.warn("No testimonials in DB yet");
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-neutral-50/60 dark:bg-neutral-900/40 border-t border-neutral-200/80 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
            Client Words
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
            Client Feedback & Trust
          </h2>
          <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
            Real feedback from business owners. We never display fake ratings or unverified quotes.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-44 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            <div className="h-44 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </div>
        ) : testimonials.length === 0 ? (
          /* Honest Empty State for Testimonials */
          <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-charcoal text-center max-w-xl mx-auto">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-brand-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-2">
              Authentic Feedback Policy
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We strictly publish only verified, written-permission feedback from active business owners.
              As a young agency launched in Greater Noida, our initial client case study reviews will be
              published here as each delivery milestone completes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 italic mb-6 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  {t.client_photo ? (
                    <img
                      src={t.client_photo}
                      alt={t.client_name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center text-sm">
                      {t.client_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-neutral-900 dark:text-white">
                      {t.client_name}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {t.business_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
