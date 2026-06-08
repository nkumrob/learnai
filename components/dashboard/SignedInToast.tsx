"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SignedInToast({ email }: { email: string | null }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          role="status"
          className="mb-6 flex items-center gap-3 rounded-[var(--r-md)] border border-accent/30 bg-accent-faint px-4 py-3"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="m3 8 3.5 3.5L13 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="flex-1 text-sm">
            <span className="font-medium text-accent">Signed in.</span>{" "}
            <span className="text-ink-2">
              {email
                ? `Your progress is now permanent and tied to ${email}.`
                : "Your progress is now permanent and works on any device."}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className="grid h-6 w-6 place-items-center rounded-full text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
