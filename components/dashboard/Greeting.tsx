"use client";
import { useEffect, useState } from "react";

interface GreetingProps {
  isFirstVisit: boolean;
  daysSinceLastSeen: number;
  resumeMinutes: number | null;
}

export function Greeting({
  isFirstVisit,
  daysSinceLastSeen,
  resumeMinutes,
}: GreetingProps) {
  // Client-only so the greeting reflects the learner's actual local hour.
  // Render a neutral placeholder on the server to avoid hydration mismatch.
  const [hour, setHour] = useState<number | null>(null);
  useEffect(() => setHour(new Date().getHours()), []);

  const partOfDay = (() => {
    if (hour == null) return null;
    if (hour < 5 || hour >= 22) return "Up late";
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  const heading = (() => {
    if (isFirstVisit) return "Welcome.";
    if (daysSinceLastSeen >= 7) return "Good to see you again.";
    return partOfDay ? `${partOfDay}.` : "Welcome back.";
  })();

  const subline = (() => {
    if (isFirstVisit)
      return "Take the 30-second placement quiz and start your first lesson.";
    if (daysSinceLastSeen >= 7)
      return "Pick up right where you left off. Level still remembers you.";
    if (resumeMinutes != null)
      return `You're about ${resumeMinutes} minutes from your next quiz pass.`;
    return "Keep going. Today's lesson is one tap away.";
  })();

  return (
    <header className="mb-8 sm:mb-10">
      <h1 className="display-lg text-ink">{heading}</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-2">{subline}</p>
    </header>
  );
}
