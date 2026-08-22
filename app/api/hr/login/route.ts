import { NextResponse } from "next/server";
import {
  createHrSessionToken,
  HR_SESSION_COOKIE,
  isHrCmsConfigured,
  sessionCookieOptions,
  verifyHrPassword,
} from "@/lib/hr/auth";

export async function POST(request: Request) {
  if (!isHrCmsConfigured()) {
    return NextResponse.json(
      { error: "Set HR_CMS_PASSWORD and HR_CMS_SECRET before using the HR portal." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!verifyHrPassword(String(body.password ?? ""))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.headers.set("cache-control", "private, no-store");
  response.cookies.set(HR_SESSION_COOKIE, await createHrSessionToken(), sessionCookieOptions());
  return response;
}
