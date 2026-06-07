"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { Certificate, TrackSlug } from "@/types/shared";
import { CertificateCard } from "./CertificateCard";
import { CertificateShareRow } from "./CertificateShareRow";
import { CertificateNextStep } from "./CertificateNextStep";
import { TRACK_LEVEL } from "@/lib/core/track-meta";

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
  const [justIssued, setJustIssued] = useState(false);
  const goldFired = useRef(false);

  // On a fresh issue, fire the gold confetti once after the reveal animation.
  useEffect(() => {
    if (!cert || !justIssued || goldFired.current) return;
    goldFired.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const gold = ["#9a7b3f", "#c9a45c", "#e3c280", "#fbfaf7", "#1e5c45"];
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.35 },
        colors: gold,
        gravity: 1.15,
        scalar: 0.95,
        ticks: 240,
      });
    }, 380);
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
        colors: gold,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
        colors: gold,
      });
    }, 700);
  }, [cert, justIssued]);

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
      setJustIssued(true);
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

    const shareText = `I just earned the LearnAI ${cert.trackTitle} certificate.`;

    return (
      <div>
        <AnimatePresence>
          {justIssued && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
                className="display-md text-ink"
              >
                Congratulations,{" "}
                <span className="font-display italic text-accent">
                  {cert.learnerName.split(/\s+/)[0]}
                </span>
                .
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-2 text-ink-2"
              >
                You finished {cert.trackTitle}.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={justIssued ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <CertificateCard cert={cert} />
        </motion.div>

        <motion.div
          initial={justIssued ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.4 }}
        >
          <CertificateShareRow verifyUrl={verifyUrl} shareText={shareText} />
          <CertificateNextStep currentLevel={TRACK_LEVEL[trackSlug]} />
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={claim} className="card p-7 sm:p-8">
      <span className="font-display text-base italic text-ink-3">
        ~ one last thing
      </span>
      <label className="mt-1 block font-display text-2xl font-semibold tracking-tight text-ink" htmlFor="name">
        Name to print on the certificate
      </label>
      <p className="mt-2 text-ink-2">
        Use the name a recruiter or hiring manager would recognize. This is the
        only personal detail we ever store on a certificate.
      </p>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your full name"
        maxLength={80}
        autoComplete="name"
        className="mt-5 w-full rounded-[var(--r-md)] border border-line bg-paper px-4 py-3 text-lg outline-none transition-colors focus:border-accent"
      />
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading || name.trim().length === 0}
        className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Issuing…" : "Issue my certificate"} →
      </button>
    </form>
  );
}
