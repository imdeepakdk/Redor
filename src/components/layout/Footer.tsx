import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight, Linkedin } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 text-neutral-300 border-t border-neutral-800 pt-16 pb-12 transition-colors relative overflow-hidden">
      {/* Background Subtle Red Accents */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-neutral-900/90 p-2.5 rounded-2xl border border-neutral-800 shadow-sm">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              REDOR is a digital marketing & web engineering studio based in Greater Noida, UP,
              founded by solo developer & creator Deepak Kumar. We engineer high-converting websites,
              local Google Maps ranking, and high-retention video reels.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
              <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{REDOR_CONFIG.city}, India (Serving NCR)</span>
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{REDOR_CONFIG.replyGuarantee}</span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link
                  href="/services#website-development"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services#google-business-profile"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Google Business Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/services#social-media-content-reels"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Social Media & Reels
                </Link>
              </li>
              <li>
                <Link
                  href="/services#video-editing"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/services#graphic-design-branding"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Branding & Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services#meta-ads-lead-generation"
                  className="hover:text-white hover:underline transition-colors text-neutral-500"
                >
                  Meta Ads (On Request)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/work" className="hover:text-white hover:underline transition-colors">
                  Our Work / Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#how-we-work" className="hover:text-white hover:underline transition-colors">
                  How We Work (4 Steps)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About Deepak Kumar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact & Map
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1 text-brand-400 font-bold hover:text-brand-300"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <a
                  href={`https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    "Hi Deepak! I want to discuss a project with REDOR."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp: {REDOR_CONFIG.displayWhatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${REDOR_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>Call: {REDOR_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${REDOR_CONFIG.email}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>{REDOR_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={REDOR_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn Official</span>
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <span className="inline-block text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1">
                Working: {REDOR_CONFIG.workingHours} IST
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {currentYear} REDOR (Proprietor: {REDOR_CONFIG.founderName}). All rights reserved. Crafted in Greater Noida, UP, India.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-neutral-300 underline transition-colors"
            >
              Privacy Policy (DPDP 2023)
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-neutral-300 underline transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-neutral-300 transition-colors opacity-60 hover:opacity-100"
              title="Founder Portal"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
