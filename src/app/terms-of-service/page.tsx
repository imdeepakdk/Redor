import React from "react";
import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  description:
    "Standard terms of service and engagement agreements for REDOR (Proprietor: Deepak Kumar) in Greater Noida, UP, India.",
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MANDATORY LEGAL NOTICE BANNER */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 mb-10 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="block font-bold mb-1">
              NOTICE: DRAFT TERMS FOR INFORMATIONAL PURPOSES
            </strong>
            These Terms of Service are a draft template suited for <strong>REDOR</strong> (Proprietor: <strong>Deepak Kumar</strong>)
            operating under the jurisdiction of the competent courts of Gautam Buddha Nagar / Greater Noida,
            Uttar Pradesh. Prior to formal commercial contracts and receiving client funds, these terms
            should be reviewed by a qualified Indian legal practitioner.
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-neutral-500">
            Last Updated: November 2026 | Governing Jurisdiction: Greater Noida / Gautam Buddha Nagar, UP, India
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-neutral-700 dark:text-neutral-300 space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              1. Engagement & Scope of Work
            </h2>
            <p>
              REDOR (sole proprietorship of Deepak Kumar) provides website engineering, Google Business Profile
              optimization, social media content, video editing, and graphic design services. Every engagement is
              governed by a mutually agreed written proposal detailing milestones, timelines, and deliverables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              2. Payments, Milestones & Deliverables
            </h2>
            <p>
              In accordance with our working rule (&ldquo;Jo likha hai wo deliver hoga, time par&rdquo;):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Fixed-scope projects (such as website development) require an advance milestone payment prior to project kickoff, with the balance due upon staging approval.</li>
              <li>Monthly retainers (reels, social content, local SEO) are billed in advance on a calendar month cycle.</li>
              <li>All payments are accepted in Indian Rupees (INR) via bank transfer, UPI, or sanctioned payment gateways.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              3. Intellectual Property Rights
            </h2>
            <p>
              Upon receipt of full and final payment, full intellectual property and ownership of all custom-coded
              deliverables, final graphic files, and edited videos transfer unconditionally to the Client.
              REDOR reserves the right to display the completed work, live site URL, or case study metrics
              within its portfolio for promotional purposes, unless a formal Non-Disclosure Agreement (NDA) is executed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              4. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms and any individual project contracts are governed exclusively by the laws of India.
              Any dispute arising out of or related to our services shall be subject to the exclusive
              jurisdiction of the competent courts in <strong>Gautam Buddha Nagar (Noida / Greater Noida), Uttar Pradesh</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              5. Contact for Legal Notices
            </h2>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm">
              <p><strong>Entity:</strong> REDOR (Proprietor: Deepak Kumar)</p>
              <p><strong>Email:</strong> {REDOR_CONFIG.email}</p>
              <p><strong>Location:</strong> {REDOR_CONFIG.city}, UP, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
