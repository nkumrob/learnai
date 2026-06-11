import "server-only";
import { unsubscribeUrl } from "./client";

/** Shared HTML wrapper — paper-toned, restrained, mobile-friendly. */
function wrap({
  preview,
  body,
  sessionId,
}: {
  preview: string;
  body: string;
  sessionId: string;
}): string {
  const unsub = unsubscribeUrl(sessionId);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LearnAI</title>
<style>
  body { margin:0; padding:0; background:#fbfaf7; color:#1a1813; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .card { background: #ffffff; border: 1px solid #e8e3d7; border-radius: 14px; padding: 32px 28px; }
  h1 { font-family: Georgia, "Times New Roman", serif; font-size: 28px; line-height: 1.15; margin: 0 0 8px; letter-spacing: -0.02em; }
  p { font-size: 16px; line-height: 1.55; color: #696558; margin: 12px 0; }
  .accent { color: #1e5c45; font-style: italic; font-family: Georgia, serif; }
  .btn { display: inline-block; background: #1e5c45; color: #fbfaf7; text-decoration: none; padding: 12px 22px; border-radius: 999px; font-weight: 600; font-size: 15px; margin-top: 16px; }
  .meta { color: #918c7e; font-size: 12px; }
  .logo { display: inline-flex; align-items: center; gap: 8px; color: #1a1813; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: -0.02em; }
  .logo span.mark { display: inline-block; width: 14px; height: 14px; border: 2px solid #1e5c45; transform: rotate(45deg); }
  .footer { margin-top: 24px; font-size: 12px; color: #918c7e; line-height: 1.55; }
  .footer a { color: #696558; }
</style>
</head>
<body>
  <span style="display:none!important;visibility:hidden;mso-hide:all;max-height:0;overflow:hidden;">${preview}</span>
  <div class="container">
    <a href="https://learnai.to" class="logo">
      <span class="mark"></span>
      LearnAI
    </a>
    <div class="card" style="margin-top: 24px;">
      ${body}
    </div>
    <div class="footer">
      You're getting this because you saved your progress on LearnAI.
      <br>
      <a href="${unsub}">Stop getting these emails</a>.
    </div>
  </div>
</body>
</html>`;
}

function appUrl(path = "/"): string {
  const base = process.env.APP_URL ?? "https://learnai.to";
  return `${base}${path}`;
}

export function welcomeTemplate({
  sessionId,
  trackTitle,
}: {
  sessionId: string;
  trackTitle: string;
}): { subject: string; html: string; text: string } {
  const subject = "Your LearnAI progress is saved.";
  const body = `
    <h1>Saved.</h1>
    <p>If cookies clear or you switch browsers, we'll send you a link to pick up exactly where you left off.</p>
    <p>You're currently in <strong>${trackTitle}</strong>. The next lesson is one tap away.</p>
    <a class="btn" href="${appUrl("/home")}">Go to my dashboard →</a>
    <p class="meta" style="margin-top:24px;">No more emails until your next lesson. We send at most four a week, and most learners get one.</p>
  `;
  const text = `Saved. We'll send you a resume link if cookies clear. Continue your journey: ${appUrl("/home")}`;
  return {
    subject,
    html: wrap({ preview: "Your progress is safe.", body, sessionId }),
    text,
  };
}

export function day2Template({
  sessionId,
  trackTitle,
  nextLessonTitle,
  nextHref,
  estMinutes,
}: {
  sessionId: string;
  trackTitle: string;
  nextLessonTitle: string;
  nextHref: string;
  estMinutes: number;
}): { subject: string; html: string; text: string } {
  const subject = `Day 2. ${estMinutes} minutes to keep going.`;
  const body = `
    <h1>One lesson today?</h1>
    <p>Yesterday you started <strong>${trackTitle}</strong>. Today's lesson is <span class="accent">${nextLessonTitle}</span>, about ${estMinutes} minutes start to finish.</p>
    <a class="btn" href="${nextHref}">Pick up where I left off →</a>
    <p class="meta">Tiny daily habits beat marathon sessions. Even one lesson keeps your streak alive.</p>
  `;
  const text = `One lesson today? "${nextLessonTitle}" (about ${estMinutes} min). ${nextHref}`;
  return {
    subject,
    html: wrap({ preview: `Today's lesson: ${nextLessonTitle}`, body, sessionId }),
    text,
  };
}

export function streakSaveTemplate({
  sessionId,
  streakCount,
  trackTitle,
  nextLessonTitle,
  nextHref,
}: {
  sessionId: string;
  streakCount: number;
  trackTitle: string;
  nextLessonTitle: string;
  nextHref: string;
}): { subject: string; html: string; text: string } {
  const subject = `Your ${streakCount}-day streak. One lesson before midnight.`;
  const body = `
    <h1>Your <span class="accent">${streakCount}-day</span> streak.</h1>
    <p>One lesson before midnight keeps it alive. <strong>${nextLessonTitle}</strong> in ${trackTitle} is about 5 minutes.</p>
    <a class="btn" href="${nextHref}">Do today's lesson →</a>
    <p class="meta">If you can't fit it in today, no guilt. Your progress and certificates stay exactly where they are.</p>
  `;
  const text = `Your ${streakCount}-day streak. One lesson before midnight keeps it alive. ${nextHref}`;
  return {
    subject,
    html: wrap({ preview: `Keep your ${streakCount}-day streak`, body, sessionId }),
    text,
  };
}

/** Magic-link sign-in. Differs from the other templates in two ways:
 *  it has no unsubscribe footer (transactional, not marketing), and the
 *  primary CTA opens the verify URL with the embedded token. */
export function magicLinkTemplate({
  verifyUrl,
  expiresInMinutes,
}: {
  verifyUrl: string;
  expiresInMinutes: number;
}): { subject: string; html: string; text: string } {
  const subject = `Sign in to LearnAI`;
  const body = `
    <h1>Sign in.</h1>
    <p>Click the link below to sign in to LearnAI. The link expires in ${expiresInMinutes} minutes and only works once.</p>
    <a class="btn" href="${verifyUrl}">Sign me in →</a>
    <p style="margin-top:18px;font-size:13px;color:#918c7e;">If you didn't request this, you can safely ignore the email. No account was created.</p>
    <p class="meta" style="margin-top:18px;word-break:break-all;font-size:12px;">If the button doesn't work, paste this URL into your browser:<br><span style="color:#1e5c45;">${verifyUrl}</span></p>
  `;
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sign in to LearnAI</title>
<style>
  body { margin:0; padding:0; background:#fbfaf7; color:#1a1813; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .card { background: #ffffff; border: 1px solid #e8e3d7; border-radius: 14px; padding: 32px 28px; }
  h1 { font-family: Georgia, "Times New Roman", serif; font-size: 28px; line-height: 1.15; margin: 0 0 8px; letter-spacing: -0.02em; }
  p { font-size: 16px; line-height: 1.55; color: #696558; margin: 12px 0; }
  .btn { display: inline-block; background: #1e5c45; color: #fbfaf7; text-decoration: none; padding: 12px 22px; border-radius: 999px; font-weight: 600; font-size: 15px; margin-top: 16px; }
  .logo { display: inline-flex; align-items: center; gap: 8px; color: #1a1813; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: -0.02em; }
  .logo span.mark { display: inline-block; width: 14px; height: 14px; border: 2px solid #1e5c45; transform: rotate(45deg); }
</style></head>
<body>
  <div class="container">
    <a href="https://learnai.to" class="logo"><span class="mark"></span> LearnAI</a>
    <div class="card" style="margin-top: 24px;">${body}</div>
  </div>
</body></html>`;
  const text = `Sign in to LearnAI: ${verifyUrl}\nThis link expires in ${expiresInMinutes} minutes.`;
  return { subject, html, text };
}

export function certIssuedTemplate({
  sessionId,
  trackTitle,
  level,
  verifyHref,
  learnerName,
}: {
  sessionId: string;
  trackTitle: string;
  level: number;
  verifyHref: string;
  learnerName: string;
}): { subject: string; html: string; text: string } {
  const subject = `${learnerName}, your Level ${level} certificate.`;
  const body = `
    <h1>You did it.</h1>
    <p>You finished <strong>${trackTitle}</strong>. Your Level ${level} certificate has been issued, with a public verification link.</p>
    <a class="btn" href="${verifyHref}">View certificate →</a>
    <p class="meta">Add it to LinkedIn. Send it to a recruiter. The link is permanent.</p>
  `;
  const text = `You finished ${trackTitle}. Certificate: ${verifyHref}`;
  return {
    subject,
    html: wrap({ preview: `Level ${level}: ${trackTitle} certified.`, body, sessionId }),
    text,
  };
}
