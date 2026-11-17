/**
 * Device Capability & Performance Checker for 3D WebGL Hero
 * Ensures 100% adherence to strict mobile performance rules.
 */

import { FEATURE_FLAGS } from "@/config/features";

export function check3DCapability(): { capable: boolean; reason?: string } {
  if (typeof window === "undefined") {
    return { capable: false, reason: "SSR" };
  }

  // 1. Master Config Flag
  if (!FEATURE_FLAGS.ENABLE_3D_HERO) {
    return { capable: false, reason: "Disabled by config flag" };
  }

  // 2. Reduced Motion Accessibility Preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { capable: false, reason: "prefers-reduced-motion enabled" };
  }

  // 3. WebGL Support Check
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      return { capable: false, reason: "WebGL unsupported" };
    }
  } catch (e) {
    return { capable: false, reason: "WebGL error" };
  }

  // 4. Save-Data / Lite Mode Check
  const nav = navigator as any;
  if (nav.connection?.saveData === true) {
    return { capable: false, reason: "Save-Data mode enabled" };
  }

  // 5. Low-End Hardware Detection (Cores & RAM)
  const hardwareConcurrency = nav.hardwareConcurrency || 4;
  const deviceMemory = nav.deviceMemory || 4; // in GB

  if (hardwareConcurrency <= 4 && deviceMemory <= 2) {
    return { capable: false, reason: "Low-end device (cores <= 4, RAM <= 2GB)" };
  }

  return { capable: true };
}
