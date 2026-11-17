export type ProjectCategory =
  | "Website"
  | "Reels/Video"
  | "Design"
  | "Social Media"
  | "Ads";

export type ProjectStatus = "draft" | "published";

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  client_name?: string | null;
  client_industry?: string | null;
  services_used: string[];
  short_description: string;
  challenge?: string | null;
  solution?: string | null;
  cover_image: string;
  gallery_images: string[];
  video_url?: string | null;
  live_url?: string | null;
  results?: ProjectResult[] | null;
  is_concept_demo: boolean;
  is_featured: boolean;
  status: ProjectStatus;
  display_order: number;
  completion_date?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  deliverables: string[];
  target_audience?: string | null;
  timeline?: string | null;
  starting_price?: number | null;
  is_price_visible: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  business_name: string;
  quote: string;
  rating: number;
  client_photo?: string | null;
  project_id?: string | null;
  permission_verified: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export type BookingStatus =
  | "New"
  | "Contacted"
  | "Meeting scheduled"
  | "Proposal sent"
  | "Won"
  | "Lost";

export interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  business_name: string;
  business_type: string;
  city_area: string;
  services_needed: string[];
  budget_range?: string | null;
  contact_method: "WhatsApp" | "Call" | "Email";
  preferred_time?: string | null;
  message?: string | null;
  consent_given: boolean;
  consent_timestamp: string;
  ip_hash?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  status: BookingStatus;
  admin_notes?: string | null;
  follow_up_date?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  agency_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  city: string;
  state: string;
  country: string;
  hero_headline: string;
  hero_subheadline: string;
  ga_tracking_id?: string | null;
  meta_pixel_id?: string | null;
  updated_at: string;
}
