import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants/session";

/** Sign-out clears the account-linked session cookie. The next request will
 *  be assigned a fresh anonymous session by middleware, so the learner can
 *  keep using LearnAI as a new visitor. We don't delete any data. */
export async function POST() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
