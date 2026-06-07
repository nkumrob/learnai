import "server-only";
import { sendEmail } from "./client";
import {
  welcomeTemplate,
  day2Template,
  streakSaveTemplate,
  certIssuedTemplate,
} from "./templates";
import {
  logEmailSent,
  countRecent,
  wasSentRecently,
  type EmailType,
} from "./events";
import type { Session } from "@/lib/server/db/sessions";

const WEEKLY_CAP = 4;

interface DispatchResult {
  sent: boolean;
  reason?:
    | "no_email"
    | "opted_out"
    | "cap_reached"
    | "duplicate"
    | "send_failed"
    | "no_api_key";
}

async function gateAndSend(
  session: Session,
  type: EmailType,
  build: () => { subject: string; html: string; text: string },
  dedupeHours = 24,
): Promise<DispatchResult> {
  if (!session.email) return { sent: false, reason: "no_email" };
  if (!session.emailMarketingOk) return { sent: false, reason: "opted_out" };

  const recent = await countRecent(session.id, 7);
  if (recent >= WEEKLY_CAP) return { sent: false, reason: "cap_reached" };

  if (await wasSentRecently(session.id, type, dedupeHours)) {
    return { sent: false, reason: "duplicate" };
  }

  const tpl = build();
  const res = await sendEmail({
    to: session.email,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
  });
  if (!res.ok) {
    return {
      sent: false,
      reason: res.reason === "no_api_key" ? "no_api_key" : "send_failed",
    };
  }
  await logEmailSent(session.id, type);
  return { sent: true };
}

export function dispatchWelcome(
  session: Session,
  trackTitle: string,
): Promise<DispatchResult> {
  return gateAndSend(
    session,
    "welcome",
    () => welcomeTemplate({ sessionId: session.id, trackTitle }),
    24 * 30, // Welcome is once-per-month at most
  );
}

export function dispatchDay2(
  session: Session,
  args: {
    trackTitle: string;
    nextLessonTitle: string;
    nextHref: string;
    estMinutes: number;
  },
): Promise<DispatchResult> {
  return gateAndSend(
    session,
    "day_2",
    () =>
      day2Template({
        sessionId: session.id,
        ...args,
      }),
    24,
  );
}

export function dispatchStreakSave(
  session: Session,
  args: {
    streakCount: number;
    trackTitle: string;
    nextLessonTitle: string;
    nextHref: string;
  },
): Promise<DispatchResult> {
  return gateAndSend(
    session,
    "streak_save",
    () =>
      streakSaveTemplate({
        sessionId: session.id,
        ...args,
      }),
    24,
  );
}

export function dispatchCertIssued(
  session: Session,
  args: {
    trackTitle: string;
    level: number;
    verifyHref: string;
    learnerName: string;
  },
): Promise<DispatchResult> {
  return gateAndSend(
    session,
    "cert_issued",
    () =>
      certIssuedTemplate({
        sessionId: session.id,
        ...args,
      }),
    24 * 365, // Once per certificate
  );
}
