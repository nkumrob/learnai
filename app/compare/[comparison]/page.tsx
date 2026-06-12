import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISON_SLUGS, COMPARISONS, findComparison } from "@/lib/core/comparisons";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return COMPARISON_SLUGS.map((comparison) => ({ comparison }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ comparison: string }>;
}): Promise<Metadata> {
  const { comparison } = await params;
  const c = findComparison(comparison);
  if (!c) return {};
  const url = absoluteUrl(`/compare/${comparison}`);
  return {
    title: c.headline,
    description: c.intro.split(".")[0] + ".",
    alternates: { canonical: url },
    openGraph: {
      title: `${c.headline} - ${SITE_NAME}`,
      description: c.intro.split(".")[0] + ".",
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.headline} - ${SITE_NAME}`,
      description: c.intro.split(".")[0] + ".",
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ comparison: string }>;
}) {
  const { comparison } = await params;
  const c = findComparison(comparison);
  if (!c) notFound();

  const url = absoluteUrl(`/compare/${comparison}`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: c.headline,
    description: c.intro.split(".")[0] + ".",
    url,
    inLanguage: "en",
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", "@id": `${SITE_URL}/#curriculum-team`, name: `${SITE_NAME} Curriculum Team` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    about: [
      { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL },
      { "@type": "Organization", name: c.competitor, url: c.competitorUrl },
    ],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: `${SITE_NAME} vs ${c.competitor}`, item: url },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <p className="eyebrow text-ink-3">Comparison</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">{c.headline}</h1>
      <p className="mt-3 text-lg text-ink-2">{c.intro}</p>

      <section className="mt-6 rounded-[var(--r-md)] border border-line bg-surface-2 p-4 text-sm text-ink-2">
        <span className="font-medium">About {c.competitor}:</span> {c.competitorBlurb}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Feature-by-feature comparison
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-3 pr-4 font-medium">Feature</th>
                <th className="py-3 pr-4 font-medium text-accent">{SITE_NAME}</th>
                <th className="py-3 font-medium text-ink-2">{c.competitor}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={i} className="border-b border-line/60 align-top">
                  <td className="py-3 pr-4 font-medium">{r.feature}</td>
                  <td className="py-3 pr-4 text-ink-2">{r.learnai}</td>
                  <td className="py-3 text-ink-2">{r.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-5">
          <h3 className="font-display text-lg font-medium tracking-tight text-accent">
            Choose {SITE_NAME} when
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {c.whenLearnai.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-accent">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--r-lg)] border border-line bg-surface p-5">
          <h3 className="font-display text-lg font-medium tracking-tight">
            Choose {c.competitor} when
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {c.whenCompetitor.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-ink-3">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Frequently asked
        </h2>
        <div className="mt-4 space-y-5">
          {c.faqs.map((f, i) => (
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
          Start LearnAI free →
        </Link>
        <a
          href={c.competitorUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-3 font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          Visit {c.competitor} ↗
        </a>
      </section>

      <section className="mt-12 border-t border-line pt-8 text-sm text-ink-3">
        Other comparisons:{" "}
        {COMPARISONS.filter((other) => other.slug !== c.slug).map((other, i, arr) => (
          <span key={other.slug}>
            <Link href={`/compare/${other.slug}`} className="text-accent underline">
              {SITE_NAME} vs {other.competitor}
            </Link>
            {i < arr.length - 1 ? " · " : ""}
          </span>
        ))}
      </section>
    </div>
  );
}
