"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Project, ProjectCategory } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

const categories: (ProjectCategory | "All")[] = [
  "All",
  "Website",
  "Reels/Video",
  "Design",
  "Social Media",
  "Ads",
];

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true });

        if (!error && data) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.warn("Unable to load projects from DB");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-4">
            Selected Work
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight mb-4">
            Our Work & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            Real websites, dynamic short-form reels, and distinctive brand identities.
            Every project has a purpose: driving local visibility and customer conversions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <Filter className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Honest Empty State */
          <EmptyState
            title={
              selectedCategory === "All"
                ? "New projects landing soon"
                : `No ${selectedCategory} projects published yet`
            }
            description="We strictly avoid publishing fake stock templates or fabricated metrics. We are currently finalizing live client deployments in Greater Noida, which will appear here upon completion."
            actionText="Discuss Your Project"
            actionHref="/book"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  {project.cover_image ? (
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                      No cover image
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <Badge variant="brand">{project.category}</Badge>
                    {project.is_concept_demo && (
                      <Badge variant="concept">Concept Demo</Badge>
                    )}
                  </div>
                </div>

                {/* Details */}
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
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-xs font-semibold text-neutral-900 dark:text-white hover:text-brand-600 inline-flex items-center gap-1"
                    >
                      <span>View Case Study</span>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
