"use client";

import { useState } from "react";

interface ShareRowProps {
  verifyUrl: string;
  shareText: string;
}

export function CertificateShareRow({ verifyUrl, shareText }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  function shareLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=720,height=620");
  }

  function shareX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(verifyUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=720,height=620");
  }

  function downloadPNG() {
    // Triggers the browser print dialog with the certificate-only print
    // stylesheet. Users get a clean PNG or PDF via their OS print sheet —
    // no extra deps needed for a high-fidelity capture.
    window.print();
  }

  return (
    <div className="no-print mt-6">
      <div className="eyebrow mb-3 text-ink-3">Share or save</div>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={shareLinkedIn} className="btn-ghost btn-sm border border-line">
          <LinkedInIcon />
          LinkedIn
        </button>
        <button onClick={shareX} className="btn-ghost btn-sm border border-line">
          <XIcon />
          Post on X
        </button>
        <button onClick={copy} className="btn-ghost btn-sm border border-line">
          <LinkIcon />
          {copied ? "Copied ✓" : "Copy link"}
        </button>
        <button onClick={downloadPNG} className="btn-ghost btn-sm border border-line">
          <DownloadIcon />
          Save as PDF
        </button>
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0H13v1.7c.56-.95 1.93-2 4-2 4.27 0 5 2.81 5 6.46V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.96V21H9.5V9Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 3h3.25l-7.1 8.13L22 21h-6.55l-5.13-6.71L4.43 21H1.18l7.6-8.71L1 3h6.72l4.63 6.13L17.5 3Zm-1.14 16.16h1.8L7.74 4.74H5.82L16.36 19.16Z" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66L11.5 6.5M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v12m0 0-4-4m4 4 4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
