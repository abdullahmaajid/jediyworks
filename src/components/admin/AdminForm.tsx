import React from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface AdminFormProps {
  title: string;
  description?: string;
  backLink: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  error?: string | null;
  submitLabel?: string;
  children: React.ReactNode;
}

export function AdminForm({
  title,
  description,
  backLink,
  onSubmit,
  isLoading = false,
  error,
  submitLabel = "Save Changes",
  children,
}: AdminFormProps) {
  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[rgba(13,13,13,0.5)] hover:text-[var(--near-black)] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <h2 className="text-3xl font-serif text-[var(--near-black)]">{title}</h2>
        {description && (
          <p className="text-[rgba(13,13,13,0.5)] mt-2 text-sm">{description}</p>
        )}
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[var(--warm-gray)] p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {children}
          </div>

          <div className="pt-8 border-t border-[var(--warm-gray)] flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-[var(--near-black)] text-white px-8 py-3 font-sans text-xs uppercase tracking-wider hover:bg-[var(--crimson)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {submitLabel}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Form Field Wrapper
export function FormField({
  label,
  description,
  required = false,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-wider text-[var(--near-black)] font-medium flex items-center gap-2">
        {label}
        {required && <span className="text-[var(--crimson)]">*</span>}
      </label>
      {description && (
        <p className="text-[13px] text-[rgba(13,13,13,0.5)] mb-1">{description}</p>
      )}
      {children}
    </div>
  );
}

// Reusable Input
export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full bg-transparent border-b border-[var(--warm-gray)] pb-2 pt-1 text-[var(--near-black)] placeholder-[rgba(13,13,13,0.3)] focus:outline-none focus:border-[var(--crimson)] transition-colors rounded-none text-sm"
      {...props}
    />
  );
});
FormInput.displayName = "FormInput";

// Reusable Textarea
export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className="w-full bg-[#F8F6F3] border border-[var(--warm-gray)] p-4 text-[var(--near-black)] placeholder-[rgba(13,13,13,0.3)] focus:outline-none focus:border-[var(--crimson)] transition-colors rounded-none text-sm min-h-[120px]"
      {...props}
    />
  );
});
FormTextarea.displayName = "FormTextarea";
