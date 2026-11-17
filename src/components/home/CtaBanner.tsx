import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { REDOR_CONFIG } from "@/config/features";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Origami Polygon Accent */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 border border-brand-800 text-xs font-bold uppercase tracking-wider text-brand-300 mb-6">
            Ready to upgrade your digital presence?
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight leading-tight mb-6">
            Let&apos;s build something that brings you{" "}
            <span className="text-brand-500">actual business</span>.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you need a lightning-fast new website, want to dominate Google Maps in Greater Noida,
            or need high-converting reels, book a 15-minute consultation with founder Deepak Kumar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="/book"
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-2 group"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <a
              href={`https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Hi Deepak! I want to discuss a project for my business in Greater Noida."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-neutral-700 bg-neutral-900 text-white font-semibold text-base hover:bg-neutral-800 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <p className="text-xs text-neutral-500 mt-6">
            {REDOR_CONFIG.replyGuarantee}. Zero commitment, 100% honest advice for Greater Noida & NCR businesses.
          </p>
        </div>
      </div>
    </section>
  );
};
