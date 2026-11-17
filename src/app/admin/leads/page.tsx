"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Save,
  CheckCircle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Booking, BookingStatus } from "@/types";

const pipelineStatuses: BookingStatus[] = [
  "New",
  "Contacted",
  "Meeting scheduled",
  "Proposal sent",
  "Won",
  "Lost",
];

export default function LeadsManagerPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBookings(data as Booking[]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setSavingId(id);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (!error) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setSavingId(null);
    }
  };

  const handleNotesChange = async (id: string, notes: string) => {
    try {
      await supabase
        .from("bookings")
        .update({ admin_notes: notes, updated_at: new Date().toISOString() })
        .eq("id", id);

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, admin_notes: notes } : b))
      );
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  const handleFollowUpDateChange = async (id: string, date: string) => {
    try {
      await supabase
        .from("bookings")
        .update({ follow_up_date: date || null, updated_at: new Date().toISOString() })
        .eq("id", id);

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, follow_up_date: date } : b))
      );
    } catch (err) {
      console.error("Failed to save follow-up date:", err);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (bookings.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "Business Name",
      "Business Type",
      "City Area",
      "Services Needed",
      "Budget Range",
      "Contact Method",
      "Preferred Time",
      "Message",
      "Status",
      "Admin Notes",
      "Follow-up Date",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Created At",
    ];

    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${b.full_name || ""}"`,
      `"${b.phone || ""}"`,
      `"${b.email || ""}"`,
      `"${b.business_name || ""}"`,
      `"${b.business_type || ""}"`,
      `"${b.city_area || ""}"`,
      `"${b.services_needed?.join(", ") || ""}"`,
      `"${b.budget_range || ""}"`,
      `"${b.contact_method || ""}"`,
      `"${b.preferred_time || ""}"`,
      `"${(b.message || "").replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${(b.admin_notes || "").replace(/"/g, '""')}"`,
      `"${b.follow_up_date || ""}"`,
      `"${b.utm_source || ""}"`,
      `"${b.utm_medium || ""}"`,
      `"${b.utm_campaign || ""}"`,
      `"${b.created_at}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `REDOR_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.city_area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
            Leads & Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Pipeline tracking from inquiry to closed client in Greater Noida & NCR.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={bookings.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-charcoal text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, business, phone or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Status Pipeline Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === "All"
                ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            All ({bookings.length})
          </button>
          {pipelineStatuses.map((st) => {
            const count = bookings.filter((b) => b.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? "bg-brand-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-neutral-400">Loading pipeline leads...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-sm">
            No booking leads matching your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Lead / Business</th>
                  <th className="py-3.5 px-4 font-semibold">City & Type</th>
                  <th className="py-3.5 px-4 font-semibold">Services & Budget</th>
                  <th className="py-3.5 px-4 font-semibold">Pipeline Status</th>
                  <th className="py-3.5 px-4 font-semibold">Follow-Up Date</th>
                  <th className="py-3.5 px-4 font-semibold">Internal Notes</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredBookings.map((b) => {
                  const cleanPhone = b.phone.replace(/\D/g, "");
                  const waNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                    >
                      {/* Name & Phone */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-bold text-sm text-neutral-900 dark:text-white">
                          {b.full_name}
                        </div>
                        <div className="text-neutral-500 font-medium">{b.business_name}</div>
                        <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          {b.phone}
                        </div>
                        {b.email && (
                          <div className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                            {b.email}
                          </div>
                        )}
                        <div className="text-[10px] text-neutral-400 mt-1">
                          {new Date(b.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* City & Type */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {b.city_area}
                        </div>
                        <div className="text-neutral-500 text-[11px] mt-0.5">{b.business_type}</div>
                      </td>

                      {/* Services & Budget */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {b.services_needed?.join(", ")}
                        </div>
                        <div className="text-brand-600 dark:text-brand-400 font-medium text-[11px] mt-0.5">
                          {b.budget_range}
                        </div>
                        {b.message && (
                          <div className="text-[11px] text-neutral-500 mt-1 italic line-clamp-2">
                            &ldquo;{b.message}&rdquo;
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 align-top">
                        <select
                          value={b.status}
                          disabled={savingId === b.id}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value as BookingStatus)
                          }
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${
                            b.status === "New"
                              ? "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950 dark:text-brand-300"
                              : b.status === "Won"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                              : b.status === "Lost"
                              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300"
                              : "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
                          }`}
                        >
                          {pipelineStatuses.map((st) => (
                            <option key={st} value={st} className="dark:bg-neutral-900">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Follow-up Date */}
                      <td className="py-4 px-4 align-top">
                        <input
                          type="date"
                          defaultValue={b.follow_up_date || ""}
                          onBlur={(e) => handleFollowUpDateChange(b.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs focus:outline-none"
                        />
                      </td>

                      {/* Admin Notes */}
                      <td className="py-4 px-4 align-top">
                        <textarea
                          rows={2}
                          placeholder="Add internal notes..."
                          defaultValue={b.admin_notes || ""}
                          onBlur={(e) => handleNotesChange(b.id, e.target.value)}
                          className="w-48 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                      </td>

                      {/* Quick Actions */}
                      <td className="py-4 px-4 align-top text-right space-y-1.5 whitespace-nowrap">
                        <div>
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                              `Hi ${b.full_name}! This is the founder from REDOR regarding your inquiry for ${b.business_name}. When is a good time for a quick 5-min call?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                        <div>
                          <a
                            href={`tel:${b.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call Phone</span>
                          </a>
                        </div>
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
