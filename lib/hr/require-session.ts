import { NextResponse } from "next/server";
import { getHrSession, isHrCmsConfigured } from "@/lib/hr/auth";

export async function requireHrSession() {
  if (!isHrCmsConfigured()) {
    return NextResponse.json({ error: "HR CMS is not configured." }, { status: 503 });
  }

  if (!(await getHrSession())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  return null;
}
