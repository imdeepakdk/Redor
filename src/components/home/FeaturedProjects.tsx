"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { TiltCard } from "@/components/ui/TiltCard";

export const FeaturedProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true })
          .limit(3);

        if (!error && data) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.warn("No projects found in DB or DB not initialized yet");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-3">
              Portfolio
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-950 dark:text-white tracking-tight">
              Featured Work
            </h2>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Real code, clean aesthetics, and results-focused builds. No borrowed templates.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 group"
          >
            <span>Explore all case studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-3xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* Honest Empty State */
          <EmptyState
            title="New projects landing soon"
            description="We are currently deploying and documenting client websites & reel campaigns for Greater Noida businesses. We never publish fake placeholders or stock mockups."
            actionText="Discuss Your Project"
            actionHref="/book"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <TiltCard key={project.id} maxTilt={6}>
                <div className="group relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                  {/* Image / Thumbnail Container with 3D floating badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    {project.cover_image ? (
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <span>No preview image</span>
                      </div>
                    )}

                    {/* Floating 3D Badges Overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
                      <Badge variant="brand">{project.category}</Badge>
                      {project.is_concept_demo && (
                        <div className="transform translate-z-10 shadow-lg">
                          <Badge variant="concept">Concept Demo</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {project.client_industry && (
                        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1">
                          {project.client_industry}
                        </span>
                      )}
                      <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        <Link href={`/work/${project.slug}`}>{project.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                        {project.short_description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                      <Link
                        href={`/work/${project.slug}`}
                        className="text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-600 inline-flex items-center gap-1"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-neutral-500 hover:text-brand-600 inline-flex items-center gap-1"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
