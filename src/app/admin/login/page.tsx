"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle origami background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
            <Logo size="md" />
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl tracking-tight">
            Founder & Admin Portal
          </h2>
          <p className="text-xs text-neutral-400">
            Protected area for managing REDOR leads, portfolio case studies, and settings.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@redor.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800/80 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800/80 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-neutral-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Setup Hint for the Founder */}
          <div className="mt-6 pt-6 border-t border-neutral-800/80">
            <div className="flex items-start gap-2.5 text-xs text-neutral-400">
              <Info className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>First time logging in?</strong> Create your single admin user in your{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-400 underline"
                >
                  Supabase Dashboard
                </a>{" "}
                under <em>Authentication &gt; Users &gt; Add User</em>. Public registrations are closed.
              </span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-300 underline underline-offset-4"
          >
            &larr; Back to REDOR Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
