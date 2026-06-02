// Minimal, dependency-free markdown renderer for first-party lesson content.
// Supports: # headings, **bold**, _italic_, `code`, lists, > callouts, and
// ``` fenced code blocks. Soft-wrapped lines inside a paragraph are joined, so
// authored content can wrap at any width without breaking layout.

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

type Block =
  | { kind: "p"; lines: string[] }
  | { kind: "quote"; lines: string[] }
  | { kind: "ol" | "ul"; items: string[] }
  | { kind: "h2" | "h3"; text: string }
  | { kind: "code"; lines: string[] };

function parse(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const last = () => blocks[blocks.length - 1];

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Fenced code block
    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ kind: "code", lines: code });
      continue;
    }

    if (!trimmed) {
      blocks.push({ kind: "p", lines: [] }); // paragraph boundary marker
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ kind: "h2", text: trimmed.slice(3) });
    } else if (trimmed.startsWith("### ")) {
      blocks.push({ kind: "h3", text: trimmed.slice(4) });
    } else if (trimmed.startsWith("> ")) {
      const text = trimmed.slice(2);
      const l = last();
      if (l && l.kind === "quote") l.lines.push(text);
      else blocks.push({ kind: "quote", lines: [text] });
    } else if (/^\d+\.\s/.test(trimmed)) {
      const item = trimmed.replace(/^\d+\.\s/, "");
      const l = last();
      if (l && l.kind === "ol") l.items.push(item);
      else blocks.push({ kind: "ol", items: [item] });
    } else if (/^[-*]\s/.test(trimmed)) {
      const item = trimmed.replace(/^[-*]\s/, "");
      const l = last();
      if (l && l.kind === "ul") l.items.push(item);
      else blocks.push({ kind: "ul", items: [item] });
    } else {
      const l = last();
      if (l && l.kind === "p" && l.lines.length > 0) l.lines.push(trimmed);
      else blocks.push({ kind: "p", lines: [trimmed] });
    }
    i++;
  }
  return blocks;
}

function render(blocks: Block[]): string {
  const out: string[] = [];
  for (const b of blocks) {
    switch (b.kind) {
      case "h2":
        out.push(`<h2>${inline(b.text)}</h2>`);
        break;
      case "h3":
        out.push(`<h3>${inline(b.text)}</h3>`);
        break;
      case "p":
        if (b.lines.length) out.push(`<p>${inline(b.lines.join(" "))}</p>`);
        break;
      case "quote":
        out.push(`<blockquote>${b.lines.map((l) => inline(l)).join("<br/>")}</blockquote>`);
        break;
      case "ol":
      case "ul": {
        const items = b.items.map((it) => `<li>${inline(it)}</li>`).join("");
        out.push(`<${b.kind}>${items}</${b.kind}>`);
        break;
      }
      case "code":
        out.push(`<pre><code>${escapeHtml(b.lines.join("\n"))}</code></pre>`);
        break;
    }
  }
  return out.join("\n");
}

export function Markdown({ children }: { children: string }) {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: render(parse(children)) }}
    />
  );
}
