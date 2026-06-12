import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findRole, ROLE_SLUGS, ROLES } from "@/lib/core/roles";
import { moduleSlugByOrder } from "@/lib/server/content/tracks-definition";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return ROLE_SLUGS.map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const r = findRole(role);
  if (!r) return {};
  const url = absoluteUrl(`/for/${role}`);
  const description = r.intro.split(".")[0] + ".";
  return {
    title: r.headline,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${r.headline} - ${SITE_NAME}`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${r.headline} - ${SITE_NAME}`, description },
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const r = findRole(role);
  if (!r) notFound();

  const url = absoluteUrl(`/for/${role}`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: r.headline,
    description: r.intro.split(".")[0] + ".",
    url,
    inLanguage: "en",
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", "@id": `${SITE_URL}/#curriculum-team`, name: `${SITE_NAME} Curriculum Team` },
    publisher: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    audience: { "@type": "Audience", audienceType: r.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: r.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "For", item: absoluteUrl("/for") },
      { "@type": "ListItem", position: 3, name: r.name, item: url },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <p className="eyebrow text-ink-3">For {r.plural}</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">{r.headline}</h1>
      <p className="mt-3 text-lg text-ink-2">{r.intro}</p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          What {r.plural} are doing with AI in 2026
        </h2>
        <ol className="mt-4 space-y-4">
          {r.useCases.map((u, i) => (
            <li
              key={i}
              className="rounded-[var(--r-lg)] border border-line bg-surface p-5"
            >
              <h3 className="font-medium tracking-tight">{u.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{u.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          The lessons that matter most for {r.plural}
        </h2>
        <ol className="mt-4 space-y-3">
          {r.recommendedLessons.map((l) => (
            <li
              key={`${l.trackSlug}-${l.order}`}
              className="rounded-[var(--r-md)] border border-line bg-surface p-4 transition-colors hover:border-accent"
            >
              <Link href={`/track/${l.trackSlug}/${moduleSlugByOrder(l.trackSlug, l.order)}`}>
                <div className="font-medium tracking-tight">{l.title}</div>
                <div className="mt-1 text-sm text-ink-2">{l.why}</div>
                <div className="mt-1 text-xs text-ink-3">
                  {l.trackSlug} track · module {l.order}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Frequently asked
        </h2>
        <div className="mt-4 space-y-5">
          {r.faqs.map((f, i) => (
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
        <Link
          href="/"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-3 font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          See the full journey
        </Link>
      </section>

      <section className="mt-12 border-t border-line pt-8 text-sm text-ink-3">
        Also for:{" "}
        {ROLES.filter((other) => other.slug !== r.slug).map((other, i, arr) => (
          <span key={other.slug}>
            <Link href={`/for/${other.slug}`} className="text-accent underline">
              {other.plural}
            </Link>
            {i < arr.length - 1 ? " · " : ""}
          </span>
        ))}
      </section>
    </div>
  );
}
