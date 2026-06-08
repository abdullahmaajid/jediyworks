"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminForm, FormField, FormInput, FormTextarea } from "../../../../components/admin/AdminForm";

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    thumbnailUrl: "",
    thumbnailAlt: "",
    category: "",
    pillar: "",
    clientName: "",
    year: new Date().getFullYear().toString(),
    duration: "",
    liveLink: "",
    problem: "",
    strategy: "",
    execution: "",
    impact: "",
    status: "DRAFT",
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <AdminForm
        title="Create New Project"
        description="Add a new portfolio piece to the website."
        backLink="/admin/projects"
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error}
        submitLabel="Create Project"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Title" required>
            <FormInput name="title" value={formData.title} onChange={handleChange} required />
          </FormField>
          <FormField label="Slug" description="URL-friendly string (e.g. neon-echoes)" required>
            <FormInput name="slug" value={formData.slug} onChange={handleChange} required />
          </FormField>
        </div>

        <FormField label="Summary" required>
          <FormTextarea name="summary" value={formData.summary} onChange={handleChange} required rows={3} />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Thumbnail URL" required>
            <FormInput name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} required placeholder="https://..." />
          </FormField>
          <FormField label="Thumbnail Alt Text">
            <FormInput name="thumbnailAlt" value={formData.thumbnailAlt} onChange={handleChange} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormField label="Category">
            <FormInput name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Web Development" />
          </FormField>
          <FormField label="Pillar">
            <FormInput name="pillar" value={formData.pillar} onChange={handleChange} placeholder="e.g. Experiences" />
          </FormField>
          <FormField label="Client Name">
            <FormInput name="clientName" value={formData.clientName} onChange={handleChange} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormField label="Year">
            <FormInput name="year" type="number" value={formData.year} onChange={handleChange} />
          </FormField>
          <FormField label="Duration">
            <FormInput name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3 Months" />
          </FormField>
          <FormField label="Live Link URL">
            <FormInput name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="https://..." />
          </FormField>
        </div>

        <div className="border-t border-[var(--warm-gray)] pt-8 mt-8">
          <h3 className="text-xl font-serif text-[var(--near-black)] mb-6">Case Study Content</h3>
          <div className="space-y-6">
            <FormField label="The Problem" description="Supports basic HTML formatting for now.">
              <FormTextarea name="problem" value={formData.problem} onChange={handleChange} />
            </FormField>
            <FormField label="The Strategy">
              <FormTextarea name="strategy" value={formData.strategy} onChange={handleChange} />
            </FormField>
            <FormField label="The Execution">
              <FormTextarea name="execution" value={formData.execution} onChange={handleChange} />
            </FormField>
            <FormField label="The Impact">
              <FormTextarea name="impact" value={formData.impact} onChange={handleChange} />
            </FormField>
          </div>
        </div>

        <div className="border-t border-[var(--warm-gray)] pt-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Status">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#F8F6F3] border border-[var(--warm-gray)] p-3 text-[var(--near-black)] focus:outline-none focus:border-[var(--crimson)]"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </FormField>

          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 accent-[var(--crimson)]"
            />
            <label htmlFor="featured" className="text-sm uppercase tracking-wider text-[var(--near-black)] cursor-pointer">
              Featured Project (Shows on Homepage)
            </label>
          </div>
        </div>
      </AdminForm>
    </div>
  );
}
