import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Code2, Sparkles, CheckCircle2, ShieldAlert, CheckCircle, Video, Palette, PenTool, Globe } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "About Deepak Kumar & REDOR Story",
  description:
    "Meet Deepak Kumar, 22-year-old solo founder and web developer at REDOR, helping local businesses in Greater Noida and NCR get real customers online.",
};

const skillItems = [
  {
    icon: <Globe className="w-5 h-5 text-brand-500" />,
    title: "Website Development",
    desc: "Next.js 14, Tailwind CSS, TypeScript, and sub-second load times engineered for Indian mobile networks.",
  },
  {
    icon: <Video className="w-5 h-5 text-brand-500" />,
    title: "Video Editing & Reels",
    desc: "Dynamic captions, retention pacing, viral hooks, and sound design for Instagram and YouTube.",
  },
  {
    icon: <Palette className="w-5 h-5 text-brand-500" />,
    title: "Graphic Design & Branding",
    desc: "Clean origami vector logos, social media templates, business cards, and marketing collateral.",
  },
  {
    icon: <PenTool className="w-5 h-5 text-brand-500" />,
    title: "Content & Copywriting",
    desc: "Simple, honest, conversion-driven copy without buzzword stuffing or generic templates.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
            Founder & Story
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight mb-6">
            Pehle Samajhna, Phir Banana.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            REDOR is built on direct execution and radical honesty. No account managers, no inflated retainers.
            Just a passionate 22-year-old developer helping local Greater Noida businesses stand out.
          </p>
        </div>

        {/* Founder Story Card with 3D depth */}
        <TiltCard maxTilt={4}>
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50/70 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-xl mb-16 relative overflow-hidden">
            {/* Origami Accent corner */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-brand-500/15 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
                  Meet the Founder
                </span>

                <h2 className="font-heading font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white">
                  {REDOR_CONFIG.founderName} — Web Developer & Content Creator
                </h2>

                <p className="text-base font-semibold text-neutral-900 dark:text-white border-l-2 border-brand-500 pl-3">
                  &ldquo;Local businesses ke paas achha kaam to hota hai, par online unki presence kamzor hoti hai.
                  Main website, Google profile aur reels se wo gap bharna chahta hoon.&rdquo;
                </p>

                <p>
                  As a solo developer living and working in Greater Noida, I saw firsthand how gym owners,
                  aesthetic clinics, real estate brokers, and cafes were being overcharged by traditional
                  marketing agencies. Most were handed generic WordPress templates that took 6 seconds to load
                  on a mobile phone, or received low-effort Canva posts that nobody engaged with.
                </p>

                <p>
                  I created <strong>REDOR</strong> to offer a real engineering alternative. Every website is hand-coded
                  with Next.js 14 and Tailwind for instant speed. Every reel is scripted and edited with retention hooks.
                  When you work with REDOR, you deal directly with me — the person writing your code.
                </p>
              </div>

              {/* Founder Profile Badge */}
              <div className="lg:col-span-4 bg-white dark:bg-charcoal p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-400 text-white flex items-center justify-center font-heading font-black text-3xl shadow-lg shadow-brand-500/25 mb-4">
                  DK
                </div>
                <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
                  {REDOR_CONFIG.founderName}
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  {REDOR_CONFIG.city}
                </p>
                <div className="w-full pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Role:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Solo Developer & Creator</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct:</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{REDOR_CONFIG.displayWhatsapp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reply:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">&lt; 24 ghante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* 3 Working Principles */}
        <div className="mb-16">
          <div className="text-left mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-1">
              Guiding Ethos
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-white tracking-tight">
              Our 3 Working Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-charcoal shadow-sm">
              <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-heading font-bold text-sm mb-4">
                01
              </span>
              <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Pehle samajhna, phir banana
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Har kaam se pehle aapke business, audience aur local competition ke baare mein baat hoti hai. Zero blind execution.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-charcoal shadow-sm">
              <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-heading font-bold text-sm mb-4">
                02
              </span>
              <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Jo likha hai wo deliver hoga, time par
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Deliverables aur timelines clear hongi. No endless revisions cycle ya project delay. Direct accountability.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-charcoal shadow-sm">
              <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-heading font-bold text-sm mb-4">
                03
              </span>
              <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Koi fake promise nahi
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Leads ki jhuti guarantee nahi, deliverables ki guarantee. Hum genuine engineering aur ranking foundation banate hain.
              </p>
            </div>
          </div>
        </div>

        {/* Core Skills Grid */}
        <div className="mb-16">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-white tracking-tight mb-8">
            Core Skill Sets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillItems.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Strict Integrity Policy */}
        <div className="p-6 sm:p-8 rounded-3xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800/40 mb-16">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white">
                Our Zero-Fake Policy
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You will never see fake team member stock photos, fabricated client logos, or false
                &ldquo;500+ satisfied clients&rdquo; numbers on this website. As a young studio founded by
                Deepak Kumar in Greater Noida, we earn our reputation through genuine, hard-crafted work.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="font-heading font-bold text-2xl text-neutral-900 dark:text-white mb-3">
            Ready to upgrade your online presence?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Book a free 15-minute phone or WhatsApp consultation with Deepak Kumar. No pushy sales pitch.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
