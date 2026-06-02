import { describe, expect, it } from "vitest";
import {
  inlineToHtml,
  lessonSentences,
  markdownToHtml,
  stripInline,
} from "./markdown";

describe("inlineToHtml", () => {
  it("renders bold, both italic styles, and code", () => {
    expect(inlineToHtml("a **b** c *d* e _f_ `g`")).toBe(
      "a <strong>b</strong> c <em>d</em> e <em>f</em> <code>g</code>",
    );
  });
  it("escapes HTML", () => {
    expect(inlineToHtml("a < b")).toBe("a &lt; b");
  });
});

describe("stripInline", () => {
  it("removes all inline markers", () => {
    expect(stripInline("**b** *i* _e_ `c`")).toBe("b i e c");
  });
});

describe("lessonSentences", () => {
  it("does not split inside markers like **Example.**", () => {
    const s = lessonSentences("**Example.** It works.");
    expect(s).toEqual(["Example.", "It works."]);
  });

  it("keeps a closing quote with its sentence (?\" case)", () => {
    const s = lessonSentences('He asked "Why?" and left.');
    expect(s).toEqual(['He asked "Why?"', "and left."]);
  });

  it("flattens list items into sentences", () => {
    const s = lessonSentences("## H\n- one thing.\n- two things.");
    expect(s).toContain("one thing.");
    expect(s).toContain("two things.");
  });
});

describe("markdownToHtml", () => {
  it("joins soft-wrapped lines into one paragraph", () => {
    expect(markdownToHtml("line one\nline two")).toBe("<p>line one line two</p>");
  });
  it("renders fenced code blocks", () => {
    expect(markdownToHtml("```\nx=1\n```")).toBe("<pre><code>x=1</code></pre>");
  });
});
