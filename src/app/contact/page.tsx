import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  Linkedin,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Get in touch with REDOR digital agency in Greater Noida. Direct WhatsApp with Deepak Kumar, phone call, email, and localized service radius.",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
            Direct Connection
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight mb-4">
            Get in Touch With REDOR
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            Have a question, need an urgent website fix, or want to discuss a custom campaign in Greater Noida?
            Reach out through any of our channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Col 1: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Hi Deepak! I have an inquiry for REDOR regarding my business in Greater Noida."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between group hover:shadow-xl hover:border-emerald-400 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <MessageCircle className="w-6 h-6 fill-white stroke-none" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-emerald-800 dark:text-emerald-400 tracking-wider block">
                    Fastest Response
                  </span>
                  <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
                    WhatsApp Direct
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-mono">
                    {REDOR_CONFIG.displayWhatsapp}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-medium">
                    {REDOR_CONFIG.replyGuarantee}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Phone & Email Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-brand-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block uppercase tracking-wider">
                    Phone Call
                  </span>
                  <a
                    href={`tel:${REDOR_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="font-semibold text-neutral-900 dark:text-white hover:text-brand-600 font-mono text-sm"
                  >
                    {REDOR_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-brand-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block uppercase tracking-wider">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${REDOR_CONFIG.email}`}
                    className="font-semibold text-neutral-900 dark:text-white hover:text-brand-600 text-sm"
                  >
                    {REDOR_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-brand-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block uppercase tracking-wider">
                    Operating Hours
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
                    {REDOR_CONFIG.workingHours} IST
                  </span>
                </div>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
                Professional Network
              </span>
              <a
                href={REDOR_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 transition-colors shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>Follow REDOR on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Col 2: Service Location & Map Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3 text-brand-600 dark:text-brand-400">
                <MapPin className="w-5 h-5" />
                <span className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
                  Operational Hub & Service Area
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Based in <strong>{REDOR_CONFIG.city}</strong>, India. We operate on a modern remote-first and
                on-site consultation model across Greater Noida (Alpha, Beta, Gamma, Pari Chowk, Knowledge Park,
                Gaur City), Noida, Ghaziabad, and Delhi NCR. We do not expose a private residential address,
                keeping overheads low so we can deliver exceptional quality at sensible rates.
              </p>

              {/* City Level Map Embed */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 shadow-inner">
                <iframe
                  title="REDOR Greater Noida Service Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112261.27218698126!2d77.4249007421875!3d28.474387800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1dd68903c73%3A0xb35a74ef6b94098e!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Consultation CTA */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  Prefer a structured meeting with project notes?
                </span>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Book Consultation Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
