import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findToolHub, TOOL_HUBS, TOOL_SLUGS } from "@/lib/core/tool-hubs";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return TOOL_SLUGS.map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const hub = findToolHub(tool);
  if (!hub) return {};
  const title = `Learn ${hub.name} free — 2026 guide`;
  const description = `${hub.tagline} ${hub.intro.split(". ")[0]}.`;
  const url = absoluteUrl(`/tools/${tool}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} - ${SITE_NAME}`, description, url, type: "article" },
  };
}

export default async function ToolHubPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const hub = findToolHub(tool);
  if (!hub) notFound();

  const url = absoluteUrl(`/tools/${tool}`);
  const title = `Learn ${hub.name} free — 2026 guide`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: hub.tagline,
    url,
    inLanguage: "en",
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", "@id": `${SITE_URL}/#curriculum-team`, name: `${SITE_NAME} Curriculum Team` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    about: { "@type": "Thing", name: hub.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "LearnAI", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
      { "@type": "ListItem", position: 3, name: hub.name, item: url },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <p className="eyebrow text-ink-3">Tool · {hub.category}</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
        Learn {hub.name} free
      </h1>
      <p className="mt-3 text-lg text-ink-2">{hub.tagline}</p>

      <section className="mt-8">
        <p className="leading-relaxed text-ink-2">{hub.intro}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Why learn {hub.name} in 2026
        </h2>
        <ul className="mt-4 space-y-2 text-ink-2">
          {hub.why.map((w, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-accent">•</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-[var(--r-lg)] border border-line bg-surface-2 p-5">
        <h2 className="font-display text-xl font-medium tracking-tight">
          How to learn {hub.name} (free)
        </h2>
        <p className="mt-2 text-ink-2">{hub.howToLearn}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          {hub.name} in the LearnAI curriculum
        </h2>
        <ol className="mt-4 space-y-3">
          {hub.lessons.map((l) => (
            <li
              key={`${l.trackSlug}-${l.order}`}
              className="rounded-[var(--r-md)] border border-line bg-surface p-4 transition-colors hover:border-accent"
            >
              <Link href={`/track/${l.trackSlug}/${l.order}`}>
                <div className="font-medium tracking-tight">{l.title}</div>
                <div className="mt-1 text-sm text-ink-2">
                  Free lesson · {l.trackSlug} track, module {l.order}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-5">
          {hub.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-medium tracking-tight">{f.question}</h3>
              <p className="mt-1 text-ink-2">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/placement"
          className="rounded-[var(--r-md)] bg-accent px-5 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
        >
          Find where to start →
        </Link>
        <a
          href={hub.externalDocs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-3 font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          {hub.externalDocs.label} ↗
        </a>
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <p className="text-sm text-ink-3">
          Looking at other tools?{" "}
          {TOOL_HUBS.filter((t) => t.slug !== hub.slug)
            .slice(0, 4)
            .map((t, i, arr) => (
              <span key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="text-accent underline">
                  {t.name}
                </Link>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
        </p>
      </section>
    </div>
  );
}
