-- =============================================================================
-- REDOR DIGITAL MARKETING AGENCY - SUPABASE DATABASE MIGRATION & RLS POLICIES
-- Target: Greater Noida, Uttar Pradesh, India
-- =============================================================================

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. SERVICES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Globe',
    deliverables JSONB DEFAULT '[]'::jsonb,
    target_audience TEXT,
    timeline TEXT,
    starting_price NUMERIC,
    is_price_visible BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. PROJECTS (PORTFOLIO) TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Website', 'Reels/Video', 'Design', 'Social Media', 'Ads')),
    client_name TEXT,
    client_industry TEXT,
    services_used TEXT[] DEFAULT '{}',
    short_description TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    cover_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    video_url TEXT,
    live_url TEXT,
    results JSONB DEFAULT '[]'::jsonb, -- e.g. [{"label": "Organic Leads", "value": "+120%"}]
    is_concept_demo BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    display_order INT DEFAULT 0,
    completion_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. TESTIMONIALS TABLE (Real Verified Client Feedback Only)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    client_photo TEXT,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    permission_verified BOOLEAN DEFAULT true, -- Reminder: Written consent required
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. BOOKINGS / LEADS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    city_area TEXT NOT NULL,
    services_needed TEXT[] NOT NULL DEFAULT '{}',
    budget_range TEXT,
    contact_method TEXT DEFAULT 'WhatsApp',
    preferred_time TEXT,
    message TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT false,
    consent_timestamp TIMESTAMPTZ DEFAULT NOW(),
    ip_hash TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Meeting scheduled', 'Proposal sent', 'Won', 'Lost')),
    admin_notes TEXT,
    follow_up_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. SITE SETTINGS TABLE (Single row config)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    agency_name TEXT DEFAULT 'REDOR',
    tagline TEXT DEFAULT 'Digital Growth & Web Engineering for Greater Noida & NCR Businesses',
    phone TEXT DEFAULT '+91 98765 43210',
    whatsapp_number TEXT DEFAULT '919876543210',
    email TEXT DEFAULT 'contact@redor.in',
    instagram_url TEXT DEFAULT 'https://instagram.com/redor.in',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/company/redor',
    city TEXT DEFAULT 'Greater Noida',
    state TEXT DEFAULT 'Uttar Pradesh',
    country TEXT DEFAULT 'India',
    hero_headline TEXT DEFAULT 'Helping Greater Noida Businesses Win Customers Online',
    hero_subheadline TEXT DEFAULT 'We build high-converting websites, craft viral reels, and dominate local Google search for gyms, clinics, salons, cafes & real estate.',
    ga_tracking_id TEXT DEFAULT '',
    meta_pixel_id TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings if not existing
INSERT INTO public.site_settings (id)
VALUES ('default')
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 7. RLS POLICIES FOR PUBLIC ACCESS (ANON & AUTHENTICATED READ)
-- -----------------------------------------------------------------------------

-- Public can read active services
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (is_active = true);

-- Public can read published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
USING (status = 'published');

-- Public can read published testimonials
DROP POLICY IF EXISTS "Public can view published testimonials" ON public.testimonials;
CREATE POLICY "Public can view published testimonials"
ON public.testimonials FOR SELECT
USING (is_published = true);

-- Public can read site settings
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
ON public.site_settings FOR SELECT
USING (true);

-- Public can submit booking inquiries (consent must be given)
DROP POLICY IF EXISTS "Public can insert bookings" ON public.bookings;
CREATE POLICY "Public can insert bookings"
ON public.bookings FOR INSERT
WITH CHECK (consent_given = true);

-- -----------------------------------------------------------------------------
-- 8. RLS POLICIES FOR AUTHENTICATED ADMIN (FULL ACCESS)
-- -----------------------------------------------------------------------------

-- Services Admin CRUD
DROP POLICY IF EXISTS "Admin full access to services" ON public.services;
CREATE POLICY "Admin full access to services"
ON public.services FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Projects Admin CRUD
DROP POLICY IF EXISTS "Admin full access to projects" ON public.projects;
CREATE POLICY "Admin full access to projects"
ON public.projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Testimonials Admin CRUD
DROP POLICY IF EXISTS "Admin full access to testimonials" ON public.testimonials;
CREATE POLICY "Admin full access to testimonials"
ON public.testimonials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Bookings Admin Full CRUD
DROP POLICY IF EXISTS "Admin full access to bookings" ON public.bookings;
CREATE POLICY "Admin full access to bookings"
ON public.bookings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Site Settings Admin Update
DROP POLICY IF EXISTS "Admin full access to site_settings" ON public.site_settings;
CREATE POLICY "Admin full access to site_settings"
ON public.site_settings FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 9. SUPABASE STORAGE SETUP (portfolio bucket)
-- -----------------------------------------------------------------------------
-- Run this in Supabase SQL editor to create the public portfolio storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images
DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
CREATE POLICY "Public can view portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Storage RLS: Authenticated admin can upload/update/delete portfolio assets
DROP POLICY IF EXISTS "Admin can upload portfolio assets" ON storage.objects;
CREATE POLICY "Admin can upload portfolio assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin can update portfolio assets" ON storage.objects;
CREATE POLICY "Admin can update portfolio assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin can delete portfolio assets" ON storage.objects;
CREATE POLICY "Admin can delete portfolio assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio');

-- -----------------------------------------------------------------------------
-- 10. SEED DATA FOR SERVICES ONLY (NO FAKE PROJECTS OR TESTIMONIALS)
-- -----------------------------------------------------------------------------
INSERT INTO public.services (
    title, slug, short_description, full_description, icon, deliverables, 
    target_audience, timeline, starting_price, is_price_visible, is_active, display_order
) VALUES
(
    'Website Development',
    'website-development',
    'Modern, lightning-fast, mobile-first websites built with Next.js & Tailwind CSS. Designed to turn local visitors into paying customers.',
    'A slow, clunky WordPress template costs you real customers in Greater Noida and Noida every single day. We engineer custom, responsive web experiences with zero bloat, instant mobile loading, clean typography, conversion-focused contact triggers, and structured SEO markup.',
    'Globe',
    '["Mobile-First Responsive Design", "Next.js & Tailwind Speed", "Local SEO & Schema Markup", "WhatsApp Click-to-Chat Integration", "Contact & Lead Form with Instant Alerts", "1 Year Basic Hosting & Maintenance Guidance"]'::jsonb,
    'Gyms, Salons, Real Estate Agencies, Clinics, Cafes & Local Service Businesses wanting a modern digital storefront.',
    '7 – 14 business days',
    14999,
    false,
    true,
    1
),
(
    'Google Business Profile Setup & Optimization',
    'google-business-profile',
    'Dominate the Google 3-Pack in Greater Noida, Noida & Ghaziabad when nearby customers search for your services.',
    'When someone searches "physiotherapist in Greater Noida" or "gym near Pari Chowk", do they find you or your competitor? We optimize your Google Business Profile from scratch: exact categories, geo-tagged photos, service menus, review-generation playbooks, and localized Q&A.',
    'MapPin',
    '["Complete Profile Verification Support", "Targeted Keyword Category Selection", "Localized Service & Product Menus", "Geo-tagged High Resolution Photos", "Review Generation Strategy & QR Templates", "Competitor Local Citation Analysis"]'::jsonb,
    'Local retail, healthcare, hospitality, educational centers and service contractors looking for nearby walk-ins.',
    '3 – 5 business days',
    4999,
    false,
    true,
    2
),
(
    'Social Media Content & Reels',
    'social-media-content-reels',
    'Engaging short-form videos and carousel posts crafted to stop the scroll and build an authentic local following.',
    'Generic stock graphics get zero reach. We script, design, and direct high-impact Reels and Instagram content tailored to Indian audiences, focusing on real behind-the-scenes, transformation showcases, educational hooks, and community trust.',
    'Instagram',
    '["Monthly Content Calendar (12-16 posts)", "Viral Reel Scripting & Hook Formulation", "Trending Audio Research for Local Reach", "Carousel Graphic Design", "Hashtag & Local Geotag Optimization", "Engagement & Inquiry Growth Reporting"]'::jsonb,
    'Brands, creators, cafes, fitness studios, and aesthetic clinics wanting active community engagement.',
    'Monthly Retainer (Kickoff in 3 days)',
    9999,
    false,
    true,
    3
),
(
    'Video Editing',
    'video-editing',
    'Punchy, high-retention video editing for YouTube, Instagram Reels, and digital advertisements.',
    'Transform raw footage into dynamic, attention-grabbing videos with sound design, dynamic captions, zooms, motion graphics, and pacing designed for maximum watch time.',
    'Video',
    '["Dynamic Subtitles & Motion Captions", "Sound FX & Audio Balancing", "Color Grading & Visual Polish", "Pacing & Retention Hooks", "Vertical 9:16 & Horizontal 16:9 Formats", "Fast Turnaround Revisions"]'::jsonb,
    'Coaches, founders, podcasters, real estate agents, and marketing teams with raw video assets.',
    '24 – 48 hours per video',
    1499,
    false,
    true,
    4
),
(
    'Graphic Design & Branding',
    'graphic-design-branding',
    'Distinctive visual identities, logo marks, social media templates, print collateral, and marketing graphics.',
    'Your visual identity is the first filter of credibility. We design clean, memorable logos, brand stylebooks, business stationery, menus, banners, and digital creatives that separate you from commodity competitors.',
    'Palette',
    '["Primary & Secondary Logo Marks", "Custom Color Palette & Typography Hierarchy", "Social Media Canva/Figma Templates", "Business Card & Stationery Design", "Flyers, Standees & Menu Designs", "Vector & High-Resolution Asset Files"]'::jsonb,
    'New businesses launching in Greater Noida/NCR or existing brands needing a modern facelift.',
    '5 – 10 business days',
    7999,
    false,
    true,
    5
),
(
    'Meta Ads / Lead Generation',
    'meta-ads-lead-generation',
    'Targeted Facebook & Instagram advertising campaigns delivering genuine local phone calls, WhatsApp chats, and leads.',
    'Stop burning budget on generic "Boost Post" buttons. We set up targeted Meta advertising campaigns with localized audience radius, compelling video creatives, lead forms, and direct WhatsApp click-to-message campaigns.',
    'TrendingUp',
    '["Localized Audience & Radius Targeting", "Ad Creative & Copywriting", "Lead Form & WhatsApp Campaign Setup", "Pixel & Event Tracking Configuration", "Weekly Budget & Performance Optimization", "Coming Soon / Available On Request"]'::jsonb,
    'High-ticket services, real estate developers, educational institutes, and clinics.',
    'Setup in 5 days (Coming soon / On request)',
    null,
    false,
    true,
    6
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    deliverables = EXCLUDED.deliverables,
    target_audience = EXCLUDED.target_audience,
    timeline = EXCLUDED.timeline,
    updated_at = NOW();
