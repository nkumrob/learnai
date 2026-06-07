import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/core/site";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Placement quiz",
  description:
    "Answer 3 quick questions and LearnAI recommends the right level to start - from AI foundations to advanced skills like automation, RAG, and agents.",
  alternates: { canonical: absoluteUrl("/placement") },
};

/**
 * The placement uses a stripped chrome — no full SiteHeader/SiteFooter — so
 * the flow feels like a focused chamber. The root layout's header & footer
 * are hidden via `body:has(.placement-chrome)` rules in globals.css.
 */
export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="placement-chrome relative min-h-screen">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          aria-label="LearnAI home"
          className="inline-flex items-center gap-2 text-ink transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-6 w-6 text-accent" />
          <span className="text-base font-bold tracking-[-0.02em]">
            LearnAI
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-ink-3 transition-colors hover:text-ink"
        >
          Skip for now
        </Link>
      </div>
      {children}
    </div>
  );
}
