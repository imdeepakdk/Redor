import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BrandIntro } from "@/components/ui/BrandIntro";
import { REDOR_CONFIG } from "@/config/features";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://redor.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REDOR | Digital Marketing & Web Engineering Studio in Greater Noida",
    template: "%s | REDOR Greater Noida",
  },
  description:
    "REDOR helps ambitious local businesses in Greater Noida, Noida & Ghaziabad get more customers online with high-speed Next.js websites, Google Business Profile ranking, video reels & branding.",
  keywords: [
    "Digital Marketing Agency Greater Noida",
    "Website Development Greater Noida",
    "Google Business Profile Optimization Noida",
    "Video Editing for Reels Greater Noida",
    "Local SEO Pari Chowk",
    "Deepak Kumar Web Developer",
    "REDOR digital agency",
  ],
  authors: [{ name: "Deepak Kumar" }],
  creator: "Deepak Kumar",
  publisher: "REDOR",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "REDOR",
    title: "REDOR | Digital Marketing & Web Engineering Studio in Greater Noida",
    description:
      "High-converting Next.js websites, Google Map ranking, and high-retention video reels for Greater Noida & NCR businesses.",
    images: [
      {
        url: "/images/redor-logo.jpg",
        width: 800,
        height: 800,
        alt: "REDOR Digital Marketing Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REDOR | Digital Marketing & Web Engineering",
    description:
      "Modern web engineering and digital marketing for local businesses in Greater Noida and NCR.",
    images: ["/images/redor-logo.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#organization`,
        name: "REDOR",
        founder: {
          "@type": "Person",
          name: "Deepak Kumar",
          jobTitle: "Founder & Web Developer",
        },
        url: siteUrl,
        logo: `${siteUrl}/images/redor-logo.jpg`,
        image: `${siteUrl}/images/redor-logo.jpg`,
        description:
          "Digital marketing agency and web engineering studio helping local businesses in Greater Noida get more customers online.",
        telephone: REDOR_CONFIG.phone,
        email: REDOR_CONFIG.email,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Greater Noida",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
          postalCode: "201310",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "28.4744",
          longitude: "77.5040",
        },
        areaServed: [
          { "@type": "City", name: "Greater Noida" },
          { "@type": "City", name: "Noida" },
          { "@type": "City", name: "Ghaziabad" },
          { "@type": "AdministrativeArea", name: "Delhi NCR" },
        ],
        sameAs: [
          REDOR_CONFIG.linkedin,
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body min-h-screen flex flex-col bg-white dark:bg-charcoal text-neutral-900 dark:text-neutral-100">
        <BrandIntro />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
