"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  ShieldCheck,
  AlertTriangle,
  X,
  MessageSquareQuote,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Testimonial } from "@/types";

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial[] | null>(null);

  // Form State
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [clientPhoto, setClientPhoto] = useState("");
  const [permissionVerified, setPermissionVerified] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTestimonials(data as Testimonial[]);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  }

  const openNewModal = () => {
    setCurrentId(null);
    setClientName("");
    setBusinessName("");
    setQuote("");
    setRating(5);
    setClientPhoto("");
    setPermissionVerified(false);
    setIsPublished(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setCurrentId(t.id);
    setClientName(t.client_name);
    setBusinessName(t.business_name);
    setQuote(t.quote);
    setRating(t.rating);
    setClientPhoto(t.client_photo || "");
    setPermissionVerified(t.permission_verified);
    setIsPublished(t.is_published);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!permissionVerified) {
      setFormError("You must verify that you have obtained written client consent before saving.");
      return;
    }

    try {
      const payload = {
        client_name: clientName,
        business_name: businessName,
        quote,
        rating,
        client_photo: clientPhoto || null,
        permission_verified: permissionVerified,
        is_published: isPublished,
      };

      if (currentId) {
        const { error } = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", currentId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
        if (error) throw error;
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setFormError(err.message || "Failed to save testimonial.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    try {
      await supabase.from("testimonials").delete().eq("id", id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  const togglePublished = async (id: string, current: boolean) => {
    try {
      await supabase
        .from("testimonials")
        .update({ is_published: !current })
        .eq("id", id);

      setTestimonials(
        testimonials.map((t) => (t.id === id ? { ...t, is_published: !current } : t))
      );
    } catch (err) {
      console.error("Failed to toggle:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Warning */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="block font-bold mb-0.5">Strict Authenticity Rule:</strong>
          Only add real client quotes where you have received explicit written permission (via WhatsApp or email).
          Never fabricate client names, stock photos, or ratings.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
            Client Testimonials Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Publish verified reviews to build credibility with Greater Noida & NCR businesses.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-neutral-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-sm space-y-3">
            <MessageSquareQuote className="w-10 h-10 mx-auto text-neutral-400" />
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">No testimonials yet.</p>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Once your first client projects in Greater Noida complete, ask for a quick 2-sentence WhatsApp review and add it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Client & Business</th>
                  <th className="py-3.5 px-4 font-semibold">Rating</th>
                  <th className="py-3.5 px-4 font-semibold">Quote</th>
                  <th className="py-3.5 px-4 font-semibold">Consent Verified</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                    <td className="py-4 px-4">
                      <div className="font-bold text-sm text-neutral-900 dark:text-white">
                        {t.client_name}
                      </div>
                      <div className="text-neutral-500 text-[11px]">{t.business_name}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-neutral-700 dark:text-neutral-300 max-w-sm italic truncate">
                      &ldquo;{t.quote}&rdquo;
                    </td>

                    <td className="py-4 px-4">
                      {t.permission_verified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Written Consent</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 text-[11px]">Unverified</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => togglePublished(t.id, t.is_published)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          t.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-600 border border-neutral-300"
                        }`}
                      >
                        {t.is_published ? "Published" : "Hidden"}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(t)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-brand-600 hover:bg-neutral-100"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.client_name)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
              <h2 className="font-heading font-black text-xl text-neutral-900 dark:text-white">
                {currentId ? "Edit Review" : "Add Client Review"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 text-red-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Dr. Amit Verma"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Business / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Care Dental Clinic, Alpha 1"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Client Quote / Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="What did the client say about the results or working with you?"
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={clientPhoto}
                    onChange={(e) => setClientPhoto(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Written Permission Checkbox */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissionVerified}
                    onChange={(e) => setPermissionVerified(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <strong>I confirm I have written consent</strong> from this client to publish this quote and their business name on the REDOR website.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <span>Publish immediately to live website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
