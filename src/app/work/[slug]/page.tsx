import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Building,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!error && data) {
      return data as Project;
    }
  } catch (err) {
    // fallback
  }
  return null;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | REDOR Case Study`,
      description: project.short_description,
      images: project.cover_image ? [{ url: project.cover_image }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="brand">{project.category}</Badge>
            {project.is_concept_demo && (
              <Badge variant="concept">Concept Demo / Unofficial Prototype</Badge>
            )}
            {project.client_industry && (
              <Badge variant="outline">{project.client_industry}</Badge>
            )}
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-neutral-950 dark:text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            {project.short_description}
          </p>
        </div>

        {/* Project Meta Bar */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-xs sm:text-sm">
          {project.client_name && (
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">
                Client
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {project.client_name}
              </span>
            </div>
          )}

          <div>
            <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">
              Category
            </span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {project.category}
            </span>
          </div>

          {project.completion_date && (
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">
                Completed
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {new Date(project.completion_date).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {project.live_url && (
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider mb-1">
                Live URL
              </span>
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Main Cover Image */}
        {project.cover_image && (
          <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-14 bg-neutral-100 dark:bg-neutral-800">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-full max-h-[550px] object-cover"
            />
          </div>
        )}

        {/* Video Embed if available */}
        {project.video_url && (
          <div className="mb-14">
            <h3 className="font-heading font-bold text-lg text-neutral-900 dark:text-white mb-4">
              Project Video / Reel
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
              {project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be") ? (
                <iframe
                  src={
                    project.video_url.includes("watch?v=")
                      ? project.video_url.replace("watch?v=", "embed/")
                      : project.video_url
                  }
                  title="Project Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <a
                  href={project.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex flex-col items-center justify-center text-white hover:text-brand-400"
                >
                  <ExternalLink className="w-8 h-8 mb-2" />
                  <span>Open Video in New Tab</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Challenge & Solution Grid */}
        {(project.challenge || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {project.challenge && (
              <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
                  The Problem
                </span>
                <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-3">
                  Challenge
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
                  The Execution
                </span>
                <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white mb-3">
                  Our Solution
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Verifiable Results Metrics (Only if real ones were entered) */}
        {project.results && project.results.length > 0 && (
          <div className="mb-14 p-8 rounded-3xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-heading font-bold text-lg text-neutral-950 dark:text-white">
                Measurable Impact & Results
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {project.results.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-brand-600 dark:text-brand-400 block mb-1">
                    {r.value}
                  </span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Images if multiple */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <div className="mb-14 space-y-4">
            <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery_images.map((imgUrl, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                  <img src={imgUrl} alt={`${project.title} screenshot ${i + 1}`} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-neutral-900 dark:text-white">
              Need something similar for your business?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Let&apos;s build a custom high-performance digital asset for you.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
