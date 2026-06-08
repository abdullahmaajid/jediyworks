"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--near-black)] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[rgba(242,239,233,0.03)] border border-[rgba(242,239,233,0.1)] p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--crimson)] to-transparent opacity-50" />
        
        <div className="mb-8 text-center">
          <h1 className="font-serif text-[32px] text-[var(--bone)] mb-2">JEDIYWORKS</h1>
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--aged-gold)]">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 bg-[rgba(164,40,40,0.1)] border border-[var(--crimson)] text-[var(--crimson)] text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-[0.1em] text-[rgba(242,239,233,0.5)]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border-b border-[rgba(242,239,233,0.2)] pb-2 text-[var(--bone)] placeholder-[rgba(242,239,233,0.2)] focus:outline-none focus:border-[var(--aged-gold)] transition-colors rounded-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-[0.1em] text-[rgba(242,239,233,0.5)]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-[rgba(242,239,233,0.2)] pb-2 text-[var(--bone)] placeholder-[rgba(242,239,233,0.2)] focus:outline-none focus:border-[var(--aged-gold)] transition-colors rounded-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-[var(--bone)] text-[var(--near-black)] py-4 font-sans text-[13px] uppercase tracking-[0.1em] hover:bg-[var(--aged-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Enter Protocol"}
          </button>
        </form>
      </div>
    </div>
  );
}
