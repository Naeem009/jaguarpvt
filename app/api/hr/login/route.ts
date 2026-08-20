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
  if (!verifyHrPassword(body.password ?? "")) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(HR_SESSION_COOKIE, createHrSessionToken(), sessionCookieOptions());
  return response;
}
