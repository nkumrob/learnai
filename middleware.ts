import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants/session";

// Assigns an anonymous learner session id via cookie so progress + certificates
// persist without any login. No personal data is collected.

export function middleware(req: NextRequest) {
  const existing = req.cookies.get(SESSION_COOKIE)?.value;
  if (existing) return NextResponse.next();

  const sid = crypto.randomUUID();
  // Set the cookie on the request FIRST so this render (server components reading
  // cookies()) sees it, then forward those updated headers and persist it for the
  // browser. Without this, a first-ever deep link renders before the cookie exists.
  req.cookies.set(SESSION_COOKIE, sid);
  const res = NextResponse.next({ request: { headers: req.headers } });
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
