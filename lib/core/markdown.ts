// Shared, dependency-free markdown utilities for first-party lesson content.
// Supports # headings, **bold**, _italic_, `code`, lists, > callouts, and
// ``` fenced code blocks. Used to render HTML (Markdown component) and to derive
// readable segments + sentences for the audio/focus reader.

export type Block =
  | { kind: "p" | "quote"; text: string }
  | { kind: "ol" | "ul"; items: string[] }
  | { kind: "h2" | "h3"; text: string }
  | { kind: "code"; text: string };

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function inlineToHtml(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

/** Strip inline markdown markers to plain text (for speech + focus reading). */
export function stripInline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1");
}

export function parseBlocks(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  const last = () => blocks[blocks.length - 1];
  let paraOpen = false;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ kind: "code", text: code.join("\n") });
      paraOpen = false;
      continue;
    }

    if (!trimmed) {
      paraOpen = false;
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ kind: "h2", text: trimmed.slice(3) });
      paraOpen = false;
    } else if (trimmed.startsWith("### ")) {
      blocks.push({ kind: "h3", text: trimmed.slice(4) });
      paraOpen = false;
    } else if (trimmed.startsWith("> ")) {
      blocks.push({ kind: "quote", text: trimmed.slice(2) });
      paraOpen = false;
    } else if (/^\d+\.\s/.test(trimmed)) {
      const item = trimmed.replace(/^\d+\.\s/, "");
      const l = last();
      if (l && l.kind === "ol") l.items.push(item);
      else blocks.push({ kind: "ol", items: [item] });
      paraOpen = false;
    } else if (/^[-*]\s/.test(trimmed)) {
      const item = trimmed.replace(/^[-*]\s/, "");
      const l = last();
      if (l && l.kind === "ul") l.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
      paraOpen = false;
    } else {
      const l = last();
      if (paraOpen && l && l.kind === "p") l.text += " " + trimmed;
      else {
        blocks.push({ kind: "p", text: trimmed });
        paraOpen = true;
      }
    }
    i++;
  }
  return blocks;
}

export function markdownToHtml(md: string): string {
  const out: string[] = [];
  for (const b of parseBlocks(md)) {
    switch (b.kind) {
      case "h2":
        out.push(`<h2>${inlineToHtml(b.text)}</h2>`);
        break;
      case "h3":
        out.push(`<h3>${inlineToHtml(b.text)}</h3>`);
        break;
      case "p":
        out.push(`<p>${inlineToHtml(b.text)}</p>`);
        break;
      case "quote":
        out.push(`<blockquote>${inlineToHtml(b.text)}</blockquote>`);
        break;
      case "ol":
      case "ul":
        out.push(
          `<${b.kind}>${b.items.map((it) => `<li>${inlineToHtml(it)}</li>`).join("")}</${b.kind}>`,
        );
        break;
      case "code":
        out.push(`<pre><code>${escapeHtml(b.text)}</code></pre>`);
        break;
    }
  }
  return out.join("\n");
}

/** A readable segment for the focus view. Code is shown but not spoken. */
export interface ReadSegment {
  kind: "h2" | "h3" | "p" | "li" | "quote" | "code";
  /** Sentences to read aloud (empty for code). */
  sentences: string[];
  /** Raw text for code blocks. */
  raw?: string;
}

function splitSentences(text: string): string[] {
  // Strip inline markers first so a period inside **Example.** can't break a
  // sentence mid-marker. The focus reader and speech both use clean plain text.
  const cleaned = stripInline(text).trim();
  if (!cleaned) return [];
  // Allow trailing closing quotes/brackets after the sentence ender so that
  // `?"` or `.)` don't split a sentence in the wrong place.
  const parts = cleaned.match(/[^.!?]+[.!?]+["')\]]*(\s|$)|[^.!?]+$/g);
  return (parts ?? [cleaned]).map((s) => s.trim()).filter(Boolean);
}

export function markdownToSegments(md: string): ReadSegment[] {
  const segs: ReadSegment[] = [];
  for (const b of parseBlocks(md)) {
    switch (b.kind) {
      case "code":
        segs.push({ kind: "code", sentences: [], raw: b.text });
        break;
      case "ol":
      case "ul":
        for (const it of b.items) {
          segs.push({ kind: "li", sentences: splitSentences(it) });
        }
        break;
      case "h2":
      case "h3":
      case "p":
      case "quote":
        segs.push({ kind: b.kind, sentences: splitSentences(b.text) });
        break;
    }
  }
  return segs;
}

/** Flat ordered list of all spoken sentences (for whole-lesson narration). */
export function lessonSentences(md: string): string[] {
  return markdownToSegments(md).flatMap((s) => s.sentences);
}
