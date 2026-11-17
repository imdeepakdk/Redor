"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Upload,
  CheckCircle,
  X,
  Sparkles,
  AlertCircle,
  FolderGit2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Project, ProjectCategory, ProjectStatus, ProjectResult } from "@/types";
import { Badge } from "@/components/ui/Badge";

const categories: ProjectCategory[] = [
  "Website",
  "Reels/Video",
  "Design",
  "Social Media",
  "Ads",
];

const availableServiceTags = [
  "Next.js Development",
  "Tailwind CSS",
  "Google Business Profile",
  "Local SEO",
  "Video Editing",
  "Reels Scripting",
  "Brand Identity",
  "Logo Design",
  "Meta Ads",
];

export default function PortfolioManagerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("Website");
  const [clientName, setClientName] = useState("");
  const [clientIndustry, setClientIndustry] = useState("");
  const [servicesUsed, setServicesUsed] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [results, setResults] = useState<ProjectResult[]>([]);
  const [isConceptDemo, setIsConceptDemo] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<ProjectStatus>("published");
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        setProjects(data as Project[]);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      setSlug(generateSlug(val));
    }
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setCategory("Website");
    setClientName("");
    setClientIndustry("");
    setServicesUsed(["Next.js Development", "Tailwind CSS"]);
    setShortDescription("");
    setChallenge("");
    setSolution("");
    setCoverImage("");
    setGalleryImages([]);
    setVideoUrl("");
    setLiveUrl("");
    setResults([]);
    setIsConceptDemo(false);
    setIsFeatured(false);
    setStatus("published");
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setTitle(p.title);
    setSlug(p.slug);
    setCategory(p.category);
    setClientName(p.client_name || "");
    setClientIndustry(p.client_industry || "");
    setServicesUsed(p.services_used || []);
    setShortDescription(p.short_description || "");
    setChallenge(p.challenge || "");
    setSolution(p.solution || "");
    setCoverImage(p.cover_image || "");
    setGalleryImages(p.gallery_images || []);
    setVideoUrl(p.video_url || "");
    setLiveUrl(p.live_url || "");
    setResults(p.results || []);
    setIsConceptDemo(p.is_concept_demo);
    setIsFeatured(p.is_featured);
    setStatus(p.status);
    setFormError(null);
    setModalOpen(true);
  };

  // Image upload to Supabase Storage bucket 'portfolio'
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(filePath);

        if (isGallery) {
          setGalleryImages((prev) => [...prev, publicData.publicUrl]);
        } else {
          setCoverImage(publicData.publicUrl);
        }
      }
    } catch (err: any) {
      console.warn("Storage upload note:", err);
      // If bucket is not yet initialized, alert the user
      alert("Storage note: " + (err.message || "Ensure 'portfolio' bucket is created in Supabase"));
    } finally {
      setUploading(false);
    }
  };

  const addResultRow = () => {
    setResults([...results, { label: "", value: "" }]);
  };

  const updateResultRow = (index: number, field: "label" | "value", text: string) => {
    const updated = [...results];
    updated[index][field] = text;
    setResults(updated);
  };

  const removeResultRow = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const toggleServiceTag = (tag: string) => {
    if (servicesUsed.includes(tag)) {
      setServicesUsed(servicesUsed.filter((t) => t !== tag));
    } else {
      setServicesUsed([...servicesUsed, tag]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title || !slug || !shortDescription) {
      setFormError("Title, slug, and short description are required.");
      return;
    }

    try {
      const payload = {
        title,
        slug,
        category,
        client_name: clientName || null,
        client_industry: clientIndustry || null,
        services_used: servicesUsed,
        short_description: shortDescription,
        challenge: challenge || null,
        solution: solution || null,
        cover_image: coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
        gallery_images: galleryImages,
        video_url: videoUrl || null,
        live_url: liveUrl || null,
        results: results.filter((r) => r.label && r.value),
        is_concept_demo: isConceptDemo,
        is_featured: isFeatured,
        status,
        updated_at: new Date().toISOString(),
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.message || "Failed to save project.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: ProjectStatus) => {
    const nextStatus: ProjectStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await supabase.from("projects").update({ status: nextStatus }).eq("id", id);
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-neutral-900 dark:text-white">
            Portfolio & Case Studies Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Publish client websites, reels, and branding projects with live previews.
          </p>
        </div>

        <button
          onClick={openNewProjectModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-neutral-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-sm space-y-3">
            <FolderGit2 className="w-10 h-10 mx-auto text-neutral-400" />
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">No projects added yet.</p>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Click &quot;Add New Project&quot; above to create your first case study or concept demo.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Project</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Client</th>
                  <th className="py-3.5 px-4 font-semibold">Badges</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                        {p.cover_image ? (
                          <img src={p.cover_image} alt="" className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-neutral-900 dark:text-white">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">/{p.slug}</div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium text-neutral-800 dark:text-neutral-200">
                      {p.category}
                    </td>

                    <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300">
                      {p.client_name || "—"}
                    </td>

                    <td className="py-4 px-4 space-x-1">
                      {p.is_concept_demo && <Badge variant="concept" size="sm">Concept</Badge>}
                      {p.is_featured && <Badge variant="brand" size="sm">Featured</Badge>}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => togglePublishStatus(p.id, p.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          p.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-neutral-100 text-neutral-600 border border-neutral-300 dark:bg-neutral-800 dark:text-neutral-400"
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <a
                        href={`/work/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-brand-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT PROJECT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
              <h2 className="font-heading font-black text-xl text-neutral-900 dark:text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 text-red-700 dark:text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Iron Pulse Gym Website"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="e.g. iron-pulse-gym"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Row 2: Category, Client, Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="dark:bg-neutral-900">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Client Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Pulse Fitness LLP"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Client Industry
                  </label>
                  <input
                    type="text"
                    value={clientIndustry}
                    onChange={(e) => setClientIndustry(e.target.value)}
                    placeholder="e.g. Fitness & Health"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Services Used Multi-select Tags */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                  Services Provided
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableServiceTags.map((tag) => {
                    const isSelected = servicesUsed.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleServiceTag(tag)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          isSelected
                            ? "bg-brand-50 text-brand-700 border-brand-300 dark:bg-brand-950 dark:text-brand-300 font-semibold"
                            : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Short Description * (appears on card preview)
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One or two punchy sentences describing the project and outcome..."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    The Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="What problem was the client facing?"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Our Solution
                  </label>
                  <textarea
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How did REDOR engineer the fix?"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Cover Image URL / Storage Upload
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://... or upload below"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-charcoal text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, false)}
                    />
                  </label>
                </div>
              </div>

              {/* Links: Video URL & Live URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Video URL (YouTube or Reel link)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Live Project / Website Link
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://ironpulse.in"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Repeatable Results Metric Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Measurable Results (Optional, Real only)
                  </label>
                  <button
                    type="button"
                    onClick={addResultRow}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    + Add Metric Pair
                  </button>
                </div>
                {results.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. +140%"
                      value={r.value}
                      onChange={(e) => updateResultRow(idx, "value", e.target.value)}
                      className="w-32 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="e.g. Local Google Map Inquiries"
                      value={r.label}
                      onChange={(e) => updateResultRow(idx, "label", e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeResultRow(idx)}
                      className="p-1.5 text-neutral-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Toggles & Badges */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isConceptDemo}
                    onChange={(e) => setIsConceptDemo(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      Mark as &quot;Concept Demo&quot;
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Shows a prominent &quot;Concept Demo&quot; badge so visitors know it is an unofficial prototype rather than a signed commercial client.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white block">
                      Feature on Homepage
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Displays in the top 3 featured work grid on the front page.
                    </span>
                  </div>
                </label>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                    Publish Status
                  </span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-charcoal text-neutral-900 dark:text-white"
                  >
                    <option value="published">Published (Live to public)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
