import type { Metadata } from "next";
import { SignInForm } from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to LearnAI with your email. No password.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-5 py-16 sm:py-24">
      <div className="mb-8">
        <span className="font-display text-base italic text-ink-3">
          ~ welcome back
        </span>
        <h1 className="display-md mt-1 text-ink">Sign in.</h1>
        <p className="mt-3 text-ink-2">
          Enter your email. We&apos;ll send you a one-tap sign-in link. No
          password, no signup form. We already have you.
        </p>
      </div>
      <SignInForm initialError={errorCopy(error)} />
      <p className="mt-8 text-xs text-ink-3">
        First time? You can{" "}
        <a href="/placement" className="text-accent hover:underline">
          start without an account
        </a>{" "}
        and add one later.
      </p>
    </div>
  );
}

function errorCopy(code?: string): string | null {
  if (!code) return null;
  if (code === "expired")
    return "That sign-in link expired or was already used. Request a new one.";
  if (code === "missing") return "The sign-in link was incomplete.";
  return "Something went wrong. Try again.";
}
