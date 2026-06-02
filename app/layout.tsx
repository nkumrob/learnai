import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Tuttorr - Learn useful AI skills. Then prove it.",
  description:
    "A calm, free way to learn practical AI skills and prove them. Take a short placement, follow one focused track, pass each module, and earn a certificate you can verify.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${geistMono.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col">
        <div className="relative z-[1] flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-20 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-tight">
            Tuttorr
          </span>
          <span className="hidden text-xs text-ink-3 sm:inline">
            learn AI, prove it
          </span>
        </Link>
        <Link
          href="/placement"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Find where to start
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="no-print border-t border-line/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base text-ink-2">Tuttorr</span>
        <span>Free and open to everyone. Learn AI, prove it, get certified.</span>
      </div>
    </footer>
  );
}
