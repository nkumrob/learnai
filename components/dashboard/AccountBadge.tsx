"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AccountBadgeProps {
  email: string | null;
  signedIn: boolean;
}

export function AccountBadge({ email, signedIn }: AccountBadgeProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function signOut() {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      /* swallow */
    }
    router.push("/");
    router.refresh();
  }

  if (!signedIn) {
    // Sign-in invite for anonymous learners — quiet, opt-in.
    return (
      <a
        href="/signin"
        className="text-sm font-medium text-ink-2 transition-colors hover:text-accent"
      >
        Sign in
      </a>
    );
  }

  const initials = email
    ? email
        .split(/[@.]/)
        .filter(Boolean)
        .slice(0, 1)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2 py-1 transition-colors hover:border-line-strong"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-ink">
          {initials}
        </span>
        <span className="pr-2 text-xs text-ink-3 hidden sm:inline">Signed in</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-[var(--r-md)] border border-line bg-surface shadow-lg"
        >
          <div className="border-b border-line px-4 py-3">
            <div className="eyebrow text-ink-3">Signed in as</div>
            <div className="mt-0.5 truncate text-sm font-medium text-ink">
              {email ?? "Anonymous"}
            </div>
          </div>
          <button
            onClick={signOut}
            role="menuitem"
            className="block w-full px-4 py-2.5 text-left text-sm text-ink-2 transition-colors hover:bg-surface-2"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
