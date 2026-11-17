"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

export const CookieConsent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const saved = localStorage.getItem("redor-cookie-consent");
    if (saved === "accepted") {
      setConsentGiven(true);
    } else if (saved === "declined") {
      setConsentGiven(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("redor-cookie-consent", "accepted");
    setConsentGiven(true);
  };

  const handleDecline = () => {
    localStorage.setItem("redor-cookie-consent", "declined");
    setConsentGiven(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      {consentGiven === null && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shadow-xl animate-in slide-in-from-bottom duration-300">
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
            We use minimal cookies and analytics to evaluate traffic and improve our site performance,
            in accordance with the Indian DPDP Act 2023. No spam, no cross-site selling.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              type="button"
              className="px-3.5 py-1.5 text-xs font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded-lg hover:bg-brand-600 dark:hover:bg-brand-600 dark:hover:text-white transition-colors"
            >
              Accept Cookies
            </button>
            <button
              onClick={handleDecline}
              type="button"
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      )}

      {/* Conditionally loaded scripts only when consent is accepted */}
      {consentGiven === true && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {consentGiven === true && metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
};
