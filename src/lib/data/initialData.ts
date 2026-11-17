import { Service } from "@/types";
import { REDOR_CONFIG } from "@/config/features";

export const initialServices: Service[] = [
  {
    id: "serv-1",
    title: "Website Development",
    slug: "website-development",
    short_description:
      "Lightning-fast, mobile-first websites built with Next.js & Tailwind CSS. Engineered to convert visitors into paying clients.",
    full_description:
      "A slow, bloated WordPress site costs you real customers in Greater Noida and Noida every day. We build hand-coded, responsive web apps with instant load times, clean typography, click-to-WhatsApp triggers, and structured SEO schema.",
    icon: "Globe",
    deliverables: [
      "Custom responsive design (360px mobile to 4K desktop)",
      "Built with Next.js 14 & Tailwind CSS for sub-second speeds",
      "Local SEO & Schema Markup (LocalBusiness & Service)",
      "Instant WhatsApp click-to-chat & lead capture forms",
      "Free 1-year hosting setup & deployment guidance",
      "SSL Certificate, fast CDN, and automated daily backups",
    ],
    target_audience:
      "Gyms, Salons, Real Estate Agencies, Clinics, Cafes & Local Service Businesses wanting a modern digital storefront.",
    timeline: "7 – 14 business days",
    starting_price: 500,
    is_price_visible: false, // Default OFF as requested by user
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "serv-2",
    title: "Google Business Profile Setup & Optimization",
    slug: "google-business-profile",
    short_description:
      "Rank in the Google 3-Pack when nearby customers search for your services in Greater Noida, Noida & Ghaziabad.",
    full_description:
      "When someone searches 'physiotherapist near Pari Chowk' or 'gym in Alpha 1', do they find you or your competitor? We optimize your Google Business Profile from scratch with high-intent categories, geo-tagged photos, service menus, review-generation playbooks, and localized Q&A.",
    icon: "MapPin",
    deliverables: [
      "Complete profile verification & category audit",
      "Targeted local keyword optimization in title & description",
      "Localized service & product catalog setup",
      "Geo-tagged high-resolution business photos",
      "Review-generation strategy & custom QR code templates",
      "Local citation consistency check across NCR directories",
    ],
    target_audience:
      "Local retail stores, clinics, fitness centers, educational institutes, and service businesses relying on walk-ins and phone calls.",
    timeline: "3 – 5 business days",
    starting_price: 500,
    is_price_visible: false, // Default OFF
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "serv-3",
    title: "Social Media Content & Reels",
    slug: "social-media-content-reels",
    short_description:
      "Engaging short-form videos and carousel posts crafted to stop the scroll and build an authentic local following.",
    full_description:
      "Generic Canva quotes get zero reach. We script, design, and direct high-impact Instagram Reels and social content tailored to Indian audiences, focusing on real behind-the-scenes, transformation showcases, educational hooks, and community trust.",
    icon: "Instagram",
    deliverables: [
      "Monthly content calendar (12 – 16 high-impact posts/reels)",
      "Viral hook scripting and storyboard outlines",
      "Trending audio curation tailored to local audience reach",
      "Custom branded carousel graphics & typography",
      "Hashtag clusters and local geo-tag strategy",
      "Monthly inquiry growth & engagement analytics report",
    ],
    target_audience:
      "Brands, creators, cafes, fitness studios, and aesthetic clinics wanting active community engagement.",
    timeline: "Monthly retainer (Kickoff in 3 days)",
    starting_price: 500,
    is_price_visible: false, // Default OFF
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "serv-4",
    title: "Video Editing",
    slug: "video-editing",
    short_description:
      "Punchy, high-retention video editing for YouTube, Instagram Reels, and digital advertisements.",
    full_description:
      "Turn raw phone footage into dynamic, attention-grabbing videos with sound design, dynamic captions, zooms, motion graphics, and pacing designed for maximum watch time.",
    icon: "Video",
    deliverables: [
      "Dynamic animated subtitles & motion text",
      "Sound FX balancing and clean background music mixing",
      "Color correction & aesthetic visual polish",
      "Retention hooks & fast-paced cutting",
      "Vertical 9:16 (Reels/Shorts) & Horizontal 16:9 formats",
      "Rapid turnaround with revision rounds included",
    ],
    target_audience:
      "Coaches, founders, podcasters, real estate agents, and marketing teams with raw video assets.",
    timeline: "24 – 48 hours per video",
    starting_price: 500,
    is_price_visible: false, // Default OFF
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "serv-5",
    title: "Graphic Design & Branding",
    slug: "graphic-design-branding",
    short_description:
      "Distinctive visual identities, logo marks, social media templates, print collateral, and marketing graphics.",
    full_description:
      "Your visual identity is your first impression. We design clean, memorable logos, brand stylebooks, business stationery, menus, banners, and digital creatives that separate you from commodity competitors.",
    icon: "Palette",
    deliverables: [
      "Primary & secondary logo marks with vector source files",
      "Complete color palette and font typography system",
      "Social media Figma & Canva editable templates",
      "Visiting card & official stationery design",
      "Promotional banners, standees, or cafe menu cards",
      "Brand identity style guide PDF",
    ],
    target_audience:
      "New businesses launching in Greater Noida/NCR or existing brands needing a clean, professional facelift.",
    timeline: "5 – 10 business days",
    starting_price: 500,
    is_price_visible: false, // Default OFF
    is_active: true,
    display_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "serv-6",
    title: "Meta Ads / Lead Generation",
    slug: "meta-ads-lead-generation",
    short_description:
      "Targeted Facebook & Instagram advertising campaigns delivering genuine local phone calls, WhatsApp chats, and leads.",
    full_description:
      "Stop burning budget on generic 'Boost Post' buttons. We set up targeted Meta advertising campaigns with localized audience radius, compelling video creatives, lead forms, and direct WhatsApp click-to-message campaigns. Currently available on request for select clients.",
    icon: "TrendingUp",
    deliverables: [
      "Localized audience & radius targeting (5-15km around your store)",
      "Ad creative design & high-converting copywriting",
      "Direct-to-WhatsApp and Instant Lead Form campaign architecture",
      "Meta Pixel & Event tracking verification",
      "Weekly budget management & cost-per-lead optimization",
      "Tag: Available On Request / Coming Soon",
    ],
    target_audience:
      "High-ticket services, real estate developers, educational institutes, and clinics.",
    timeline: "Setup in 5 days (On Request)",
    starting_price: null,
    is_price_visible: false,
    is_active: true,
    display_order: 6,
    created_at: new Date().toISOString(),
  },
];

export const howWeWorkSteps = [
  {
    step: "01",
    title: "Pehle Samajhna (Discover)",
    headline: "Har kaam se pehle aapke business ke baare mein deep conversation.",
    description:
      "Hum aapke business model, offerings, aur Greater Noida/NCR ke local competitors ko audit karte hain. Koi guesswork ya generic strategy nahi.",
  },
  {
    step: "02",
    title: "Plan & Scope",
    headline: "A clear roadmap with zero vanity bloat.",
    description:
      "Deliverables aur realistic timeline finalize hoti hai. Chahe 7-day high-speed website ho ya monthly reels calendar, har cheez transparent hogi.",
  },
  {
    step: "03",
    title: "Create & Engineer",
    headline: "Jo likha hai wo deliver hoga, time par.",
    description:
      "Direct founder execution by Deepak Kumar. Modern Next.js code, dynamic reel editing, aur sharp branding bina kisi middleman ke delay ke.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    headline: "Koi fake promise nahi. Deliverables ki guarantee.",
    description:
      "Hum jhoote lead numbers nahi bechte — hum aapki digital presence ko itna solid banate hain ki local customer search kare to pehle aap milo.",
  },
];

export const faqList = [
  {
    q: "Why should I work with REDOR instead of a traditional agency?",
    a: "Traditional agencies have layers of account managers and sales reps who pass messages like a telephone game. At REDOR, you work directly with founder Deepak Kumar. Every website, reel, and graphic is crafted with personal accountability and modern web engineering.",
  },
  {
    q: "How does the special Launch Offer work?",
    a: "Greater Noida ke initial clients ke liye we have an exclusive launch rate to build our local flagship case studies. Fill the booking form or chat with us on WhatsApp to discuss your project scope and claim the offer.",
  },
  {
    q: "How fast do you respond to inquiries?",
    a: "Hum 24 ghante ke andar guaranteed reply karte hain. Most WhatsApp messages during working hours (Mon-Sat, 11am-7pm) receive a response within 1-2 hours.",
  },
  {
    q: "Do you only work with businesses in Greater Noida?",
    a: "While our primary hub is Greater Noida (covering Alpha, Beta, Gamma, Pari Chowk, Knowledge Park, Gaur City, and Noida Extension), we also serve businesses across Noida, Ghaziabad, Delhi NCR, and remote clients across India.",
  },
  {
    q: "Will my website load fast on mobile 4G/5G connections?",
    a: "Yes. Over 85% of traffic in India is mobile. Every REDOR website is built with Next.js 14 and Tailwind CSS, tested down to 360px screen width with sub-second loading speeds and zero bulky plugins.",
  },
  {
    q: "What is your working guarantee?",
    a: "Jo likha hai wo deliver hoga, time par. We do not make fake promises or sell vanity metrics. We guarantee high-quality code, high-retention video edits, and verified local Google Business optimization.",
  },
];

export const defaultSiteSettings = {
  agencyName: REDOR_CONFIG.agencyName,
  founderName: REDOR_CONFIG.founderName,
  founderRole: REDOR_CONFIG.founderRole,
  location: REDOR_CONFIG.city,
  phone: REDOR_CONFIG.phone,
  whatsappNumber: REDOR_CONFIG.whatsappNumber,
  email: REDOR_CONFIG.email,
  linkedin: REDOR_CONFIG.linkedin,
  workingHours: REDOR_CONFIG.workingHours,
  replyGuarantee: REDOR_CONFIG.replyGuarantee,
};
