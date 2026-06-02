import { markdownToHtml } from "@/lib/core/markdown";

// Renders first-party lesson markdown. Parsing lives in lib/core/markdown so the
// audio/focus reader can share it. Content is first-party, not user input.
export function Markdown({ children }: { children: string }) {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(children) }}
    />
  );
}
