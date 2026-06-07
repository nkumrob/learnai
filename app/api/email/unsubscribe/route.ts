import { NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/server/email/client";
import { setMarketingOptOut } from "@/lib/server/db/sessions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const sessionId = verifyUnsubscribeToken(token);
  if (!sessionId) {
    return new NextResponse(
      htmlPage({
        title: "Link expired",
        body: "This unsubscribe link is invalid or expired. If you keep getting unwanted emails, reply to one and we'll remove you manually.",
      }),
      { status: 400, headers: { "Content-Type": "text/html" } },
    );
  }
  await setMarketingOptOut(sessionId);
  return new NextResponse(
    htmlPage({
      title: "Unsubscribed.",
      body: "You won't get any more reminders or streak nudges. Transactional emails (like a certificate) may still arrive when relevant.",
    }),
    { status: 200, headers: { "Content-Type": "text/html" } },
  );
}

function htmlPage({ title, body }: { title: string; body: string }) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title} · LearnAI</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 80px auto; padding: 24px; color: #1a1813; background: #fbfaf7; }
    h1 { font-family: Georgia, serif; font-size: 32px; letter-spacing: -0.02em; margin-bottom: 12px; }
    p { color: #696558; line-height: 1.55; }
    a { color: #1e5c45; }
  </style></head>
  <body><h1>${title}</h1><p>${body}</p><p><a href="/">← Back to LearnAI</a></p></body></html>`;
}
