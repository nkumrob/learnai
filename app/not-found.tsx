import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-28 text-center">
      <div className="font-display text-5xl font-medium text-ink-3">404</div>
      <h1 className="mt-4 font-display text-2xl font-medium">Page not found</h1>
      <p className="mt-2 text-ink-2">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-7 inline-block rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
      >
        Back to Tuttorr
      </Link>
    </div>
  );
}
