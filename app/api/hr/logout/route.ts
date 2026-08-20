import { NextResponse } from "next/server";
import { HR_SESSION_COOKIE } from "@/lib/hr/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(HR_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
