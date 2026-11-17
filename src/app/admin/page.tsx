"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderGit2,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Plus,
  MessageCircle,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Booking, Project } from "@/types";

export default function AdminDashboardPage() {
  const [leadStats, setLeadStats] = useState({ total: 0, new: 0, won: 0 });
  const [projectStats, setProjectStats] = useState({ total: 0, published: 0 });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Fetch Bookings Count & Recent Leads
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (bookingsData) {
          const total = bookingsData.length;
          const newLeads = bookingsData.filter((b) => b.status === "New").length;
          const won = bookingsData.filter((b) => b.status === "Won").length;
          setLeadStats({ total, new: newLeads, won });
          setRecentBookings(bookingsData.slice(0, 5) as Booking[]);
        }

        // 2. Fetch Projects Count
        const { data: projectsData } = await supabase
          .from("projects")
          .select("id, status");

        if (projectsData) {
          const total = projectsData.length;
          const published = projectsData.filter((p) => p.status === "published").length;
          setProjectStats({ total, published });
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
            Agency Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Welcome to the REDOR command center. Greater Noida, UP, India.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-charcoal text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              New Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-neutral-900 dark:text-white">
              {leadStats.new}
            </span>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
              awaiting contact
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
            Total Leads: {leadStats.total}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Won Clients
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-neutral-900 dark:text-white">
              {leadStats.won}
            </span>
            <span className="text-xs text-emerald-600 font-medium">converted</span>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
            Conversion Rate:{" "}
            {leadStats.total > 0 ? Math.round((leadStats.won / leadStats.total) * 100) : 0}%
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Portfolio Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-neutral-900 dark:text-white">
              {projectStats.published}
            </span>
            <span className="text-xs text-neutral-500">live</span>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
            Total recorded: {projectStats.total}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Active Services
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-neutral-900 dark:text-white">
              6
            </span>
            <span className="text-xs text-purple-600 font-medium">offerings</span>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400">
            Greater Noida & NCR targeted
          </div>
        </div>
      </div>

      {/* Recent Leads Feed */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white">
              Recent Inquiries & Leads
            </h3>
            <p className="text-xs text-neutral-500">
              Latest booking submissions received through website forms.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Open Pipeline CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-neutral-400">Loading leads...</div>
        ) : recentBookings.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 text-sm">
            No booking requests yet. Once visitors submit the `/book` form, they will appear here instantly.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Client / Business</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Services</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                {recentBookings.map((b) => {
                  const cleanPhone = b.phone.replace(/\D/g, "");
                  const waNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
                  return (
                    <tr key={b.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {b.full_name}
                        </div>
                        <div className="text-[11px] text-neutral-500">{b.business_name}</div>
                      </td>
                      <td className="py-3.5 pr-4 text-neutral-600 dark:text-neutral-300">
                        {b.city_area}
                      </td>
                      <td className="py-3.5 pr-4 text-neutral-600 dark:text-neutral-300 max-w-xs truncate">
                        {b.services_needed.join(", ")}
                      </td>
                      <td className="py-3.5 pr-4 text-neutral-600 dark:text-neutral-300">
                        {b.budget_range}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            b.status === "New"
                              ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200"
                              : b.status === "Won"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                            `Hi ${b.full_name}! This is the founder from REDOR regarding your inquiry for ${b.business_name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold hover:bg-emerald-100"
                          title="Open WhatsApp Chat"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${b.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 text-[11px] font-semibold hover:bg-neutral-200"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
