import React, { Suspense } from "react";
import { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { Shield, Clock, Zap, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Service / Free Consultation",
  description:
    "Schedule a free digital audit or book web development, Google Business ranking, or video reels services for your business in Greater Noida.",
};

export default function BookPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
            Direct Founder Consultation
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight mb-4">
            Book a Free Consultation
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Fill in your business details below. We will review your current online presence and
            prepare a custom roadmap for Greater Noida, Noida, or NCR before we hop on a call.
          </p>

          {/* Quick guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-500" />
              <span>Response in &lt; 2 hours</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-500" />
              <span>No spam, DPDP compliant</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-500" />
              <span>Zero obligation quote</span>
            </span>
          </div>
        </div>

        {/* Form Container with Suspense boundary */}
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto p-12 text-center text-neutral-400">
              Loading form...
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
