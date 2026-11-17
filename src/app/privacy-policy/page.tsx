import React from "react";
import { Metadata } from "next";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { REDOR_CONFIG } from "@/config/features";

export const metadata: Metadata = {
  title: "Privacy Policy (DPDP Act 2023 Draft)",
  description:
    "Privacy Policy for REDOR (Proprietor: Deepak Kumar), outlining digital data processing practices under India's Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MANDATORY LEGAL NOTICE BANNER */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 mb-10 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="block font-bold mb-1">
              NOTICE: DRAFT TEMPLATE FOR INFORMATIONAL PURPOSES
            </strong>
            This Privacy Policy is a draft prepared for <strong>REDOR</strong> (Proprietor: <strong>Deepak Kumar</strong>)
            operating in Greater Noida, Uttar Pradesh, India, aligned with the principles of the{" "}
            <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>. It does not
            constitute formal legal advice and must be reviewed and customized by a licensed Indian advocate
            prior to formal commercial deployment.
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500">
            Last Updated: November 2026 | Effective for REDOR Operations (Proprietor: Deepak Kumar) in Greater Noida, UP, India
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-neutral-700 dark:text-neutral-300 space-y-8 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              1. Introduction & Data Fiduciary Details
            </h2>
            <p>
              REDOR (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a sole proprietorship owned by
              <strong> Deepak Kumar</strong>, operates as a digital marketing and web engineering studio based in
              Greater Noida, Uttar Pradesh, India. Under the Digital Personal Data Protection Act, 2023, REDOR
              acts as the Data Fiduciary regarding the personal data collected through this website (redor.in)
              and associated direct communication channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              2. Personal Data We Collect
            </h2>
            <p>
              We collect only the minimum digital personal data necessary to provide consultations, project
              deliverables, and customer support:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>
                <strong>Identity & Contact Details:</strong> Full name, phone/WhatsApp number, and email address.
              </li>
              <li>
                <strong>Business Context:</strong> Business name, industry category, city/locality, and scope of services requested.
              </li>
              <li>
                <strong>Technical & Traffic Data:</strong> Anonymized IP hash, device type, browser, and standard UTM tracking parameters (e.g. utm_source).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              3. Purpose & Legal Basis for Processing
            </h2>
            <p>
              In accordance with Section 6 of the DPDP Act 2023, your personal data is collected and processed
              solely on the basis of your explicit consent (granted via our consultation booking form) for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Reviewing your business inquiry and scheduling phone or WhatsApp consultations.</li>
              <li>Preparing service proposals, contracts, invoices, and project deliverables.</li>
              <li>Preventing automated spam, brute-force abuse, and malicious traffic.</li>
            </ul>
            <p>
              We <strong>NEVER</strong> sell, rent, monetize, or trade your personal data with third-party data brokers or marketing lists.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              4. Data Retention Period
            </h2>
            <p>
              Inquiries that do not convert into active commercial projects are retained for a maximum of 180 days
              for administrative follow-up, after which they are permanently purged. Client project data is retained
              for the duration of the engagement plus statutory periods required under Indian tax and commercial laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              5. Your Rights as a Data Principal
            </h2>
            <p>Under the DPDP Act 2023, you hold the following statutory rights:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>Right to Access:</strong> Request a summary of personal data held about you.</li>
              <li><strong>Right to Correction & Erasure:</strong> Request the correction of inaccurate data or deletion of your contact details.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent to be contacted at any time without penalty.</li>
              <li><strong>Right of Grievance Redressal:</strong> Submit any concern directly to our Grievance Officer.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-neutral-950 dark:text-white">
              6. Grievance Officer Contact
            </h2>
            <p>
              For any questions, data access requests, or deletion notices, please contact the Data Protection
              & Grievance Officer directly:
            </p>
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm">
              <p><strong>Designation:</strong> Deepak Kumar (Grievance Officer & Proprietor)</p>
              <p><strong>Email:</strong> {REDOR_CONFIG.email}</p>
              <p><strong>WhatsApp:</strong> +91 {REDOR_CONFIG.displayWhatsapp}</p>
              <p><strong>Location:</strong> {REDOR_CONFIG.city}, 201310, India</p>
              <p><strong>Response Timeline:</strong> Within 7 business days</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
