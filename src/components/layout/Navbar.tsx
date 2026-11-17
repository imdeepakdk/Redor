"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { REDOR_CONFIG } from "@/config/features";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-charcoal/85 backdrop-blur-md shadow-sm border-b border-neutral-200/80 dark:border-neutral-800"
          : "bg-white/60 dark:bg-charcoal/60 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : !link.href.includes("#") && pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? "text-brand-600 dark:text-brand-400 font-bold bg-brand-50/50 dark:bg-brand-950/40"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />

          <MagneticButton
            href="/book"
            variant="primary"
            className="px-4 py-2.5 text-xs font-bold flex items-center gap-1.5"
          >
            <span>Book Free Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-charcoal/95 backdrop-blur-md px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 rounded-xl text-base font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-md transition-colors"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${REDOR_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Deepak! I am looking for digital marketing/website services in Greater Noida."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp ({REDOR_CONFIG.displayWhatsapp})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
