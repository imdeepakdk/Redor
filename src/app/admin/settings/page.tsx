"use client";

import React, { useEffect, useState } from "react";
import { Save, CheckCircle2, AlertCircle, Settings, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function SiteSettingsPage() {
  const [agencyName, setAgencyName] = useState("REDOR");
  const [tagline, setTagline] = useState(
    "Digital Growth & Web Engineering for Greater Noida & NCR Businesses"
  );
  const [phone, setPhone] = useState("+91 98765 43210");
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");
  const [email, setEmail] = useState("contact@redor.in");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/redor.in");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/company/redor");
  const [city, setCity] = useState("Greater Noida");
  const [heroHeadline, setHeroHeadline] = useState(
    "Help your business get more real customers online in Greater Noida."
  );
  const [heroSubheadline, setHeroSubheadline] = useState(
    "We build high-converting custom websites, rank your Google Business Profile in the top 3, and create punchy short-form reels."
  );
  const [gaId, setGaId] = useState("");
  const [metaPixelId, setMetaPixelId] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "default")
          .single();

        if (!error && data) {
          if (data.agency_name) setAgencyName(data.agency_name);
          if (data.tagline) setTagline(data.tagline);
          if (data.phone) setPhone(data.phone);
          if (data.whatsapp_number) setWhatsappNumber(data.whatsapp_number);
          if (data.email) setEmail(data.email);
          if (data.instagram_url) setInstagramUrl(data.instagram_url);
          if (data.linkedin_url) setLinkedinUrl(data.linkedin_url);
          if (data.city) setCity(data.city);
          if (data.hero_headline) setHeroHeadline(data.hero_headline);
          if (data.hero_subheadline) setHeroSubheadline(data.hero_subheadline);
          if (data.ga_tracking_id) setGaId(data.ga_tracking_id);
          if (data.meta_pixel_id) setMetaPixelId(data.meta_pixel_id);
        }
      } catch (err) {
        console.warn("Using default local settings");
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setErrorMsg(null);

    try {
      const payload = {
        id: "default",
        agency_name: agencyName,
        tagline,
        phone,
        whatsapp_number: whatsappNumber,
        email,
        instagram_url: instagramUrl,
        linkedin_url: linkedinUrl,
        city,
        hero_headline: heroHeadline,
        hero_subheadline: heroSubheadline,
        ga_tracking_id: gaId,
        meta_pixel_id: metaPixelId,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("site_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
          Site Settings & Agency Profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Manage contact numbers, WhatsApp triggers, location tags, and analytics IDs.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Contact Numbers & Channels */}
        <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">
            1. Direct Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                WhatsApp Number (Digits only, include 91 for India)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="919876543210"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white font-mono focus:outline-none"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                Powers all instant wa.me click-to-chat links across the site.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Public Inquiries Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@redor.in"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Primary City / Base
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Greater Noida, Uttar Pradesh"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">
            2. Social Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Instagram Profile Link
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/redor.in"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                LinkedIn Company Link
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/company/redor"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Tracking */}
        <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">
            3. Analytics & Ad Pixels
          </h3>
          <p className="text-xs text-neutral-500">
            Loaded only after visitor consents via the DPDP-compliant cookie banner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Meta Pixel ID (Facebook / Instagram Ads)
              </label>
              <input
                type="text"
                value={metaPixelId}
                onChange={(e) => setMetaPixelId(e.target.value)}
                placeholder="123456789012345"
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-400 text-white font-bold text-xs shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
