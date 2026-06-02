"use client";

import { useState } from "react";
import type { Certificate, TrackSlug } from "@/types/shared";
import { CertificateCard } from "./CertificateCard";

export function CertificateClaim({
  trackSlug,
  initialCert,
}: {
  trackSlug: TrackSlug;
  initialCert: Certificate | null;
}) {
  const [cert, setCert] = useState<Certificate | null>(initialCert);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function claim(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/certify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackSlug, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setCert(data);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (cert) {
    const verifyPath = `/verify/${cert.verifyToken}`;
    const verifyUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${verifyPath}`
        : verifyPath;

    async function copy() {
      try {
        await navigator.clipboard.writeText(verifyUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* clipboard unavailable */
      }
    }

    return (
      <div>
        <CertificateCard cert={cert} />
        <div className="no-print mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Download / Print
          </button>
          <a
            href={verifyPath}
            className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
          >
            View verification page
          </a>
          <button
            onClick={copy}
            className="rounded-[var(--r-md)] px-4 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
          >
            {copied ? "Link copied ✓" : "Copy verify link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={claim} className="rounded-[var(--r-lg)] border border-line bg-surface p-6">
      <label className="block font-medium" htmlFor="name">
        Name to print on the certificate
      </label>
      <p className="mt-1 text-sm text-ink-2">
        This is the only personal detail we store - and only on your certificate.
      </p>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Robert Appiah"
        maxLength={80}
        autoComplete="name"
        className="mt-4 w-full rounded-[var(--r-md)] border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-accent"
      />
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading || name.trim().length === 0}
        className="mt-5 rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Issuing…" : "Issue my certificate"}
      </button>
    </form>
  );
}
