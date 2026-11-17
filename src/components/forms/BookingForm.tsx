"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import { bookingFormSchema, BookingFormData } from "@/lib/validations/booking";
import Link from "next/link";
import { REDOR_CONFIG } from "@/config/features";

const availableServices = [
  { id: "website-development", label: "Website Development" },
  { id: "google-business-profile", label: "Google Business Profile" },
  { id: "social-media-content-reels", label: "Social Media & Reels" },
  { id: "video-editing", label: "Video Editing" },
  { id: "graphic-design-branding", label: "Graphic Design & Branding" },
  { id: "meta-ads-lead-generation", label: "Meta Ads (On Request)" },
];

const budgetOptions = [
  "Under ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹60,000",
  "₹60,000+",
  "Ask about Greater Noida Launch Offer",
  "Not sure / Let's discuss scope",
];

const businessTypeOptions = [
  "Gym / Fitness Studio",
  "Salon / Beauty / Spa",
  "Coaching / Education / Institute",
  "Restaurant / Cafe / Food",
  "Clinic / Doctor / Healthcare",
  "Real Estate / Property Consultant",
  "E-commerce / Retail Brand",
  "Professional Services / Consultancy",
  "Other",
] as const;

export const BookingForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const preselectedService = searchParams.get("service");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      business_name: "",
      business_type: "Gym / Fitness Studio",
      city_area: "Greater Noida",
      services_needed: preselectedService ? [preselectedService] : ["website-development"],
      budget_range: "Ask about Greater Noida Launch Offer",
      contact_method: "WhatsApp",
      preferred_time: "Anytime (11 AM - 7 PM)",
      message: "",
      consent_given: false,
      fax_number: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    },
  });

  const selectedServices = watch("services_needed") || [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue("utm_source", searchParams.get("utm_source") || "");
      setValue("utm_medium", searchParams.get("utm_medium") || "");
      setValue("utm_campaign", searchParams.get("utm_campaign") || "");
      setValue("utm_term", searchParams.get("utm_term") || "");
      setValue("utm_content", searchParams.get("utm_content") || "");

      if (preselectedService && !selectedServices.includes(preselectedService)) {
        setValue("services_needed", [preselectedService]);
      }
    }
  }, [searchParams, preselectedService, setValue]);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setValue(
        "services_needed",
        selectedServices.filter((s) => s !== serviceId),
        { shouldValidate: true }
      );
    } else {
      setValue("services_needed", [...selectedServices, serviceId], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please chat with us on WhatsApp directly.");
    }
  };

  // SUCCESS SCREEN
  if (isSubmitted && submittedData) {
    const serviceLabels = submittedData.services_needed
      .map((id) => availableServices.find((s) => s.id === id)?.label || id)
      .join(", ");

    const prefilledText = encodeURIComponent(
      `Hi Deepak! I just submitted an inquiry on the REDOR website.\n\n` +
        `👤 Name: ${submittedData.full_name}\n` +
        `🏢 Business: ${submittedData.business_name} (${submittedData.business_type})\n` +
        `📍 Location: ${submittedData.city_area}\n` +
        `🛠️ Services: ${serviceLabels}\n` +
        `💰 Budget/Plan: ${submittedData.budget_range}\n\n` +
        `Looking forward to discussing the project with you!`
    );

    const whatsappLink = `https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${prefilledText}`;

    return (
      <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xl text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-3">
          Booking Request Received!
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 max-w-lg mx-auto">
          Thank you, <strong className="text-neutral-900 dark:text-white">{submittedData.full_name}</strong>.
          We have received your details for{" "}
          <strong className="text-neutral-900 dark:text-white">{submittedData.business_name}</strong>.
          Deepak will review your requirements and reply within 24 hours.
        </p>

        {/* Immediate WhatsApp Action Trigger */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h4 className="font-heading font-bold text-sm text-emerald-900 dark:text-emerald-300">
              Want a faster response?
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300/90 mb-4 leading-relaxed">
            Click the button below to send this summary straight to founder Deepak Kumar on WhatsApp for an immediate consultation.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
          >
            <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            <span>Open & Send on WhatsApp ({REDOR_CONFIG.displayWhatsapp})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4"
          >
            Return to Homepage
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <Link
            href="/work"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4"
          >
            Browse Our Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-md space-y-8"
      noValidate
    >
      {/* Honeypot hidden input */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="fax_number">Do not fill this</label>
        <input type="text" id="fax_number" tabIndex={-1} autoComplete="off" {...register("fax_number")} />
      </div>

      {/* Launch Offer Callout Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-brand-100/60 dark:from-brand-950/60 dark:to-neutral-900 border border-brand-200 dark:border-brand-900 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
          <strong className="text-brand-600 dark:text-brand-400 font-bold">Launch Special:</strong>{" "}
          {REDOR_CONFIG.launchOfferText}
        </div>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Section 1: Contact Details */}
      <div className="space-y-4">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            1. Your Contact Information
          </h3>
          <p className="text-xs text-neutral-500">So Deepak knows who to address when contacting you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register("full_name")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.full_name && (
              <p className="text-xs text-brand-600 mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              WhatsApp / Mobile Number <span className="text-brand-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-neutral-500 font-semibold">
                +91
              </span>
              <input
                type="tel"
                placeholder="6200132385"
                {...register("phone")}
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-brand-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-neutral-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="rahul@example.com"
              {...register("email")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.email && (
              <p className="text-xs text-brand-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Business Information */}
      <div className="space-y-4">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            2. Your Business & Location
          </h3>
          <p className="text-xs text-neutral-500">Helping us understand your industry context in NCR.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Business / Brand Name <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Iron Pulse Gym"
              {...register("business_name")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.business_name && (
              <p className="text-xs text-brand-600 mt-1">{errors.business_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Business Type / Industry <span className="text-brand-500">*</span>
            </label>
            <select
              {...register("business_type")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {businessTypeOptions.map((type) => (
                <option key={type} value={type} className="dark:bg-neutral-900">
                  {type}
                </option>
              ))}
            </select>
            {errors.business_type && (
              <p className="text-xs text-brand-600 mt-1">{errors.business_type.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              City / Locality <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Greater Noida (Pari Chowk, Alpha 1, Gaur City, etc.)"
              {...register("city_area")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {errors.city_area && (
              <p className="text-xs text-brand-600 mt-1">{errors.city_area.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Services & Scope */}
      <div className="space-y-4">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            3. Services Needed <span className="text-brand-500">*</span>
          </h3>
          <p className="text-xs text-neutral-500">Select all services you are interested in.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {availableServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <button
                type="button"
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? "bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-700 dark:text-brand-300 font-semibold"
                    : "bg-neutral-50/50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300"
                }`}
              >
                <span>{service.label}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border ${
                    isSelected
                      ? "bg-brand-600 border-brand-600 text-white"
                      : "border-neutral-400 dark:border-neutral-600"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
        {errors.services_needed && (
          <p className="text-xs text-brand-600">{errors.services_needed.message}</p>
        )}
      </div>

      {/* Section 4: Budget & Contact Preference */}
      <div className="space-y-4">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
            4. Preferences & Budget
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Estimated Budget Range
            </label>
            <select
              {...register("budget_range")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt} className="dark:bg-neutral-900">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Preferred Contact Channel
            </label>
            <select
              {...register("contact_method")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="WhatsApp">WhatsApp (Fastest response)</option>
              <option value="Call">Phone Call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Preferred Time Slot for a Call
            </label>
            <input
              type="text"
              placeholder="e.g. Weekdays 11 AM - 7 PM, or Anytime"
              {...register("preferred_time")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Tell us about your project <span className="text-neutral-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="What are your main goals? Existing website or social link?"
              {...register("message")}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Consent Checkbox (DPDP Act 2023) */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consent_given")}
            className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I agree to be contacted via WhatsApp/Phone/Email regarding this inquiry and acknowledge the{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="underline text-brand-600 dark:text-brand-400 hover:text-brand-700 font-medium"
            >
              Privacy Policy (DPDP Act 2023)
            </Link>
            . We never sell your data or send spam. <span className="text-brand-500">*</span>
          </span>
        </label>
        {errors.consent_given && (
          <p className="text-xs text-brand-600 mt-2">{errors.consent_given.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-400 text-white font-bold text-base shadow-lg hover:shadow-brand-500/25 transition-all duration-200 active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Your Request...</span>
            </>
          ) : (
            <>
              <span>Submit & Open WhatsApp ({REDOR_CONFIG.displayWhatsapp})</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-3">
          100% free consultation. {REDOR_CONFIG.replyGuarantee}.
        </p>
      </div>
    </form>
  );
};
