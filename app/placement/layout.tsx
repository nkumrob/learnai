import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/core/site";

export const metadata: Metadata = {
  title: "Placement quiz",
  description:
    "Answer 3 quick questions and LearnAI recommends the right level to start - from AI foundations to advanced skills like automation, RAG, and agents.",
  alternates: { canonical: absoluteUrl("/placement") },
};

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
