"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Markdown } from "./Markdown";
import { lessonSentences, markdownToSegments } from "@/lib/core/markdown";

export function LessonReader({ markdown }: { markdown: string }) {
  const segments = useMemo(() => markdownToSegments(markdown), [markdown]);
  const spoken = useMemo(() => lessonSentences(markdown), [markdown]);

  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(-1);
  const [focus, setFocus] = useState(false);
  const stoppedRef = useRef(false);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
    // Some browsers populate voices asynchronously; nudge them to load.
    try {
      window.speechSynthesis?.getVoices();
    } catch {
      /* ignore */
    }
    return () => {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
    };
  }, []);

  // Lock background scroll while the focus overlay is open.
  useEffect(() => {
    if (!focus) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [focus]);

  // Keep the active sentence in view inside the focus reader.
  useEffect(() => {
    if (focus && active >= 0) {
      document
        .querySelector(".focus-reading .read-active")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active, focus]);

  function pickVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    return (
      voices.find((v) => /en[-_]US/i.test(v.lang) && v.localService) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      voices[0]
    );
  }

  function play(from = 0) {
    if (!supported || spoken.length === 0) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    stoppedRef.current = false;
    setPlaying(true);
    setPaused(false);

    const voice = pickVoice();
    const last = spoken.length - 1;
    // Queue every sentence up front. Chaining via onend is unreliable in
    // Chrome (queued speak() calls get dropped); queuing is robust and we
    // highlight via each utterance's onstart.
    for (let i = Math.max(0, from); i < spoken.length; i++) {
      const u = new SpeechSynthesisUtterance(spoken[i]);
      u.lang = "en-US";
      if (voice) u.voice = voice;
      u.rate = 1;
      u.onstart = () => setActive(i);
      if (i === last) {
        u.onend = () => {
          if (!stoppedRef.current) stop();
        };
      }
      synth.speak(u);
    }

    // Defeat Chrome's ~15s auto-pause by nudging resume periodically.
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    keepAliveRef.current = setInterval(() => {
      if (stoppedRef.current) return;
      if (synth.speaking && !synth.paused) synth.resume();
    }, 10000);
  }
  function pause() {
    window.speechSynthesis.pause();
    setPaused(true);
  }
  function resume() {
    window.speechSynthesis.resume();
    setPaused(false);
  }
  function stop() {
    stoppedRef.current = true;
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
    setPlaying(false);
    setPaused(false);
    setActive(-1);
  }

  function onListen() {
    if (!playing) play(0);
    else if (paused) resume();
    else pause();
  }

  const listenLabel = !playing ? "Listen" : paused ? "Resume" : "Pause";

  return (
    <div>
      {/* Toolbar */}
      <div className="rise rise-4 -mt-2 mb-4 flex items-center gap-2">
        {supported && (
          <>
            <button
              onClick={onListen}
              className="flex items-center gap-2 rounded-[var(--r-md)] border border-line-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              {!playing || paused ? <PlayIcon /> : <PauseIcon />}
              {listenLabel}
            </button>
            {playing && (
              <button
                onClick={stop}
                aria-label="Stop"
                className="grid h-8 w-8 place-items-center rounded-[var(--r-md)] border border-line-strong bg-surface text-ink-2 transition-colors hover:border-danger hover:text-danger"
              >
                <StopIcon />
              </button>
            )}
          </>
        )}
        <button
          onClick={() => setFocus(true)}
          className="flex items-center gap-2 rounded-[var(--r-md)] border border-line-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          <FocusIcon />
          Focus
        </button>
      </div>

      {/* Normal lesson */}
      <Markdown>{markdown}</Markdown>

      {/* Focus overlay */}
      {focus && (
        <div className="focus-view no-print" role="dialog" aria-modal="true">
          <div className="sticky top-0 z-10 border-b border-line/70 bg-paper/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
              <span className="eyebrow text-ink-3">Focus reading</span>
              <div className="flex items-center gap-2">
                {supported && (
                  <button
                    onClick={onListen}
                    className="flex items-center gap-2 rounded-[var(--r-md)] border border-line-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    {!playing || paused ? <PlayIcon /> : <PauseIcon />}
                    {listenLabel}
                  </button>
                )}
                <button
                  onClick={() => setFocus(false)}
                  className="flex items-center gap-2 rounded-[var(--r-md)] bg-foreground px-3 py-1.5 text-sm font-medium text-background"
                  style={{ background: "var(--ink)", color: "var(--paper)" }}
                >
                  <CloseIcon />
                  Exit
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-5 py-12">
            <div className="focus-reading">
              <FocusBody segments={segments} active={active} />
            </div>
            <div className="h-24" />
          </div>
        </div>
      )}
    </div>
  );
}

function FocusBody({
  segments,
  active,
}: {
  segments: ReturnType<typeof markdownToSegments>;
  active: number;
}) {
  let gi = -1;
  const sentenceSpans = (sentences: string[]) =>
    sentences.map((s) => {
      gi += 1;
      const idx = gi;
      return (
        <span
          key={idx}
          className={`read-sentence ${active === idx ? "read-active" : ""}`}
        >
          {s + " "}
        </span>
      );
    });

  return (
    <>
      {segments.map((seg, si) => {
        if (seg.kind === "code") {
          return (
            <pre key={si}>
              <code>{seg.raw}</code>
            </pre>
          );
        }
        const inner = sentenceSpans(seg.sentences);
        if (seg.kind === "h2") return <h2 key={si}>{inner}</h2>;
        if (seg.kind === "h3") return <h3 key={si}>{inner}</h3>;
        if (seg.kind === "li")
          return (
            <li key={si} className="ml-5 list-disc">
              {inner}
            </li>
          );
        if (seg.kind === "quote")
          return (
            <p key={si} className="quote">
              {inner}
            </p>
          );
        return <p key={si}>{inner}</p>;
      })}
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function StopIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}
function FocusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
