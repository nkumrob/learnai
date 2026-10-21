import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo, LogoMark } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import { RetirementGuideCard } from "@/components/RetirementGuideCard";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/core/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Certificate",
        name: `${SITE_NAME} level certificates`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#curriculum-team`,
      name: `${SITE_NAME} Curriculum Team`,
      url: `${SITE_URL}/about`,
      description: `${SITE_NAME}'s in-house curriculum team. Authors, reviews, and updates every lesson.`,
      parentOrganization: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* Apply the saved theme before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="relative flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <JsonLd data={orgJsonLd} />
        <div className="relative z-[1] flex min-h-full flex-col">
          <RetirementGuideCard />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-THE0NJMJVV" />
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-20 border-b border-line bg-paper/90 shadow-[0_1px_12px_rgba(26,24,19,0.04)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link href="/" aria-label="LearnAI home" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/signin"
            className="hidden text-sm font-medium text-ink-2 transition-colors hover:text-accent sm:inline-block"
          >
            Sign in
          </Link>
          <Link href="/placement" className="btn-primary btn-sm">
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-line/70 bg-surface-2/30">
      <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        {/* Closing line — sets a tone */}
        <div className="mb-12 max-w-2xl">
          <p className="font-display text-2xl italic leading-tight text-ink sm:text-3xl">
            Stop watching. Start{" "}
            <span className="text-accent">using.</span>
          </p>
          <p className="mt-3 text-ink-2">
            Free, forever. No signup needed.
          </p>
          <Link href="/placement" className="btn-primary mt-6">
            Find where to start
            <FooterArrow />
          </Link>
        </div>

        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-6 w-6 text-accent" />
              <span className="text-lg font-bold tracking-[-0.02em] text-ink">
                LearnAI
              </span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-2">
              A guided journey from AI literacy to mastery. Five levels, fifty
              lessons.
            </p>
          </div>
          <FooterCol
            title="Learn"
            items={[
              { label: "Find your level", href: "/placement" },
              { label: "AI Foundations", href: "/track/fundamentals" },
              { label: "Prompt Engineering", href: "/track/prompting" },
              { label: "Productivity", href: "/track/productivity" },
            ]}
          />
          <FooterCol
            title="Build"
            items={[
              { label: "AI Automation", href: "/track/automation" },
              { label: "Advanced AI", href: "/track/building" },
            ]}
          />
          <FooterCol
            title="About"
            items={[
              { label: "The journey", href: "/#journey" },
              { label: "How it works", href: "/#sample-lesson" },
            ]}
          />
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <span>© {new Date().getFullYear()} LearnAI. Free and open to everyone.</span>
          <span className="font-mono tabular-nums">
            v2 · built with patience
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="eyebrow mb-3 text-ink-3">{title}</div>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-ink-2 transition-colors hover:text-accent"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
