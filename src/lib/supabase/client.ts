import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxehoxjdrdqhletdjbbx.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8a1tDXDkSM3N8573uddFqg_wGpPanvT";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
