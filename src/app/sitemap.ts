import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://redor-imdeepakdks-projects.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically include published projects
  try {
    const supabase = createServerClient();
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("status", "published");

    if (projects) {
      const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${siteUrl}/work/${p.slug}`,
        lastModified: new Date(p.updated_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.8,
      }));
      return [...staticRoutes, ...projectRoutes];
    }
  } catch (err) {
    // Return static routes if DB unavailable
  }

  return staticRoutes;
}
