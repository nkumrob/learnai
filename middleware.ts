import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants/session";

// Assigns an anonymous learner session id via cookie so progress + certificates
// persist without any login. No personal data is collected.

export function middleware(req: NextRequest) {
  const existing = req.cookies.get(SESSION_COOKIE)?.value;
  if (existing) return NextResponse.next();

  const sid = crypto.randomUUID();
  // Make the new id visible to the current render and persist it for the browser.
  const requestHeaders = new Headers(req.headers);
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  req.cookies.set(SESSION_COOKIE, sid);
  res.cookies.set(SESSION_COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  // Run on all pages/APIs except static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
