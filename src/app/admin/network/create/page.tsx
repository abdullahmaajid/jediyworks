"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminForm, FormField, FormInput, FormTextarea } from "../../../../components/admin/AdminForm";

export default function CreateCollaboratorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    alias: "",
    brandingName: "",
    slug: "",
    defaultRole: "",
    photoUrl: "",
    bannerUrl: "",
    logoUrl: "",
    bio: "",
    positionLine: "",
    socialIg: "",
    socialLinkedin: "",
    socialYoutube: "",
    location: "",
    personalWebsite: "",
    status: "ACTIVE",
    profileVisible: true,
    sortOrder: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/collaborators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create collaborator");
      }
      router.push("/admin/network");
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
        title="Add Collaborator"
        description="Add a new member to The Circle."
        backLink="/admin/network"
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error}
        submitLabel="Create Collaborator"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Full Name" required>
            <FormInput name="fullName" value={formData.fullName} onChange={handleChange} required />
          </FormField>
          <FormField label="Alias">
            <FormInput name="alias" value={formData.alias} onChange={handleChange} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Branding Name" required>
            <FormInput name="brandingName" value={formData.brandingName} onChange={handleChange} required placeholder="e.g. FERRYBUILDS" />
          </FormField>
          <FormField label="Slug" description="URL-friendly identifier" required>
            <FormInput name="slug" value={formData.slug} onChange={handleChange} required placeholder="e.g. ferrybuilds" />
          </FormField>
        </div>

        <FormField label="Default Role" required>
          <FormInput name="defaultRole" value={formData.defaultRole} onChange={handleChange} required placeholder="e.g. UI/UX Designer" />
        </FormField>

        <FormField label="Bio">
          <FormTextarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
        </FormField>

        <FormField label="Position Line" description="One-liner describing their role in the circle.">
          <FormInput name="positionLine" value={formData.positionLine} onChange={handleChange} />
        </FormField>

        <div className="border-t border-[var(--warm-gray)] pt-8 mt-8">
          <h3 className="text-xl font-serif text-[var(--near-black)] mb-6">Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField label="Photo URL">
              <FormInput name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://..." />
            </FormField>
            <FormField label="Banner URL">
              <FormInput name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} placeholder="https://..." />
            </FormField>
            <FormField label="Logo URL">
              <FormInput name="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="https://..." />
            </FormField>
          </div>
        </div>

        <div className="border-t border-[var(--warm-gray)] pt-8 mt-8">
          <h3 className="text-xl font-serif text-[var(--near-black)] mb-6">Socials & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField label="Instagram">
              <FormInput name="socialIg" value={formData.socialIg} onChange={handleChange} placeholder="@username" />
            </FormField>
            <FormField label="LinkedIn">
              <FormInput name="socialLinkedin" value={formData.socialLinkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
            </FormField>
            <FormField label="YouTube">
              <FormInput name="socialYoutube" value={formData.socialYoutube} onChange={handleChange} placeholder="https://youtube.com/..." />
            </FormField>
            <FormField label="Personal Website">
              <FormInput name="personalWebsite" value={formData.personalWebsite} onChange={handleChange} placeholder="https://..." />
            </FormField>
          </div>
          <div className="mt-6">
            <FormField label="Location">
              <FormInput name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Yogyakarta, Indonesia" />
            </FormField>
          </div>
        </div>

        <div className="border-t border-[var(--warm-gray)] pt-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormField label="Status">
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#F8F6F3] border border-[var(--warm-gray)] p-3 text-[var(--near-black)] focus:outline-none focus:border-[var(--crimson)]">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </FormField>
          <FormField label="Sort Order">
            <FormInput name="sortOrder" type="number" value={formData.sortOrder} onChange={handleChange} />
          </FormField>
          <div className="flex items-center gap-3 mt-6">
            <input type="checkbox" id="profileVisible" name="profileVisible" checked={formData.profileVisible} onChange={handleChange} className="w-5 h-5 accent-[var(--crimson)]" />
            <label htmlFor="profileVisible" className="text-sm uppercase tracking-wider text-[var(--near-black)] cursor-pointer">
              Profile Visible on Website
            </label>
          </div>
        </div>
      </AdminForm>
    </div>
  );
}
