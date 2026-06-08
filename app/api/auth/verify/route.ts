import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAndSignIn } from "@/lib/server/auth";
import { SESSION_COOKIE } from "@/lib/constants/session";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  if (!token) {
    return NextResponse.redirect(new URL("/signin?error=missing", url));
  }

  const result = await verifyAndSignIn(token);
  if (!result) {
    return NextResponse.redirect(new URL("/signin?error=expired", url));
  }

  // Swap the cookie to the account's primary session id.
  const store = await cookies();
  store.set(SESSION_COOKIE, result.activeSessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // 1 year — accounts are durable.
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.redirect(new URL("/home?signed_in=1", url));
}
