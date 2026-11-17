/**
 * REDOR Global Feature Flags & Agency Configuration
 * Modify flags here to toggle 3D WebGL hero or other features instantly.
 */

export const FEATURE_FLAGS = {
  // Toggle 3D WebGL Origami Hero (set to false to fall back to static vector/poster immediately)
  ENABLE_3D_HERO: process.env.NEXT_PUBLIC_ENABLE_3D_HERO !== "false", // default: true
  // Custom interactive cursor on desktop
  ENABLE_CUSTOM_CURSOR: true,
  // Initial visit 1.2s origami brand intro
  ENABLE_INTRO_ANIMATION: true,
  // Show special launch offer banner
  ENABLE_LAUNCH_OFFER: true,
};

export const REDOR_CONFIG = {
  agencyName: "REDOR",
  founderName: "Deepak Kumar",
  founderRole: "Web Developer & Content Creator",
  founderTagline: "Solo 22yo developer & creator helping Greater Noida businesses grow online.",
  
  // Exact user-provided contact credentials
  whatsappNumber: "916200132385", // formatted for wa.me
  displayWhatsapp: "6200132385",
  phone: "+91 6200132385",
  email: "redoragency3@gmail.com",
  linkedin: "https://www.linkedin.com/company/redorofficial/",
  city: "Greater Noida, Uttar Pradesh",
  workingHours: "Mon-Sat, 11am-7pm",
  replyGuarantee: "Hum 24 ghante ke andar reply karte hain",
  
  // Launch Special
  launchOfferText: "Launch Offer: Greater Noida ke pehle kuch clients ke liye special rate. Booking form mein poochho.",
  
  // Founder philosophy
  founderPhilosophy: [
    {
      title: "1. Pehle samajhna, phir banana",
      desc: "Har kaam se pehle aapke business model aur local competition ke baare mein baat hogi.",
    },
    {
      title: "2. Jo likha hai wo deliver hoga, time par",
      desc: "No excuses. Pre-agreed scope aur realistic timelines with direct WhatsApp updates.",
    },
    {
      title: "3. Koi fake promise nahi",
      desc: "Leads ki jhuti guarantee nahi, rock-solid Next.js deliverables aur verified rankings ki guarantee.",
    },
  ],
};
