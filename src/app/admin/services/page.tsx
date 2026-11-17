"use client";

import React, { useEffect, useState } from "react";
import { Edit2, Check, X, Sliders, ToggleLeft, ToggleRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { initialServices } from "@/lib/data/initialData";
import { Service } from "@/types";

export default function ServicesManagerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [editShortDesc, setEditShortDesc] = useState("");
  const [editFullDesc, setEditFullDesc] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editPriceVisible, setEditPriceVisible] = useState(false);
  const [editTimeline, setEditTimeline] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        setServices(data as Service[]);
      } else {
        setServices(initialServices);
      }
    } catch (err) {
      setServices(initialServices);
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (s: Service) => {
    setEditingId(s.id);
    setEditShortDesc(s.short_description);
    setEditFullDesc(s.full_description);
    setEditPrice(s.starting_price || "");
    setEditPriceVisible(s.is_price_visible);
    setEditTimeline(s.timeline || "");
  };

  const handleSave = async (id: string) => {
    setSaving(true);
    try {
      const payload = {
        short_description: editShortDesc,
        full_description: editFullDesc,
        starting_price: editPrice ? Number(editPrice) : null,
        is_price_visible: editPriceVisible,
        timeline: editTimeline || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("services").update(payload).eq("id", id);

      if (!error) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...payload } : s))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error("Save service error:", err);
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    try {
      await supabase.from("services").update({ is_active: !current }).eq("id", id);
      setServices(
        services.map((s) => (s.id === id ? { ...s, is_active: !current } : s))
      );
    } catch (err) {
      console.error("Toggle visibility error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
          Services & Pricing Manager
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Control descriptions, optional &ldquo;Starting from ₹X&rdquo; price tags, and visibility for each service.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((s) => {
          const isEditing = editingId === s.id;

          return (
            <div
              key={s.id}
              className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading font-black text-lg text-neutral-900 dark:text-white">
                      {s.title}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">/{s.slug}</span>
                  </div>
                  <span className="text-xs text-neutral-500">Timeline: {s.timeline || "N/A"}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleVisibility(s.id, s.is_active)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      s.is_active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800"
                    }`}
                  >
                    {s.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{s.is_active ? "Active" : "Hidden"}</span>
                  </button>

                  {!isEditing && (
                    <button
                      onClick={() => startEdit(s)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Service</span>
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                /* Edit Mode */
                <div className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                      Short Description (Card snippet)
                    </label>
                    <textarea
                      rows={2}
                      value={editShortDesc}
                      onChange={(e) => setEditShortDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                      Full Description (Detail section)
                    </label>
                    <textarea
                      rows={3}
                      value={editFullDesc}
                      onChange={(e) => setEditFullDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                        Starting Price (₹ INR)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 14999"
                        value={editPrice}
                        onChange={(e) =>
                          setEditPrice(e.target.value ? Number(e.target.value) : "")
                        }
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                        Timeline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 7 – 14 business days"
                        value={editTimeline}
                        onChange={(e) => setEditTimeline(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        <input
                          type="checkbox"
                          checked={editPriceVisible}
                          onChange={(e) => setEditPriceVisible(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>Show &quot;Starting from ₹&quot; publicly</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave(s.id)}
                      disabled={saving}
                      className="px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  <div className="md:col-span-8 space-y-1">
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {s.short_description}
                    </p>
                  </div>
                  <div className="md:col-span-4 bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-neutral-500 mb-1">
                      <span>Public Pricing:</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {s.is_price_visible ? "Visible" : "Hidden (Default)"}
                      </span>
                    </div>
                    {s.starting_price && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Starting Price:</span>
                        <span className="font-bold text-brand-600 dark:text-brand-400">
                          ₹{s.starting_price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
