import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const HR_SESSION_COOKIE = "hr_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.HR_CMS_SECRET || process.env.HR_CMS_PASSWORD || "";
}

export function isHrCmsConfigured() {
  return Boolean(process.env.HR_CMS_PASSWORD && secret());
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export function verifyHrPassword(password: string) {
  const expected = process.env.HR_CMS_PASSWORD;
  if (!expected) {
    return false;
  }
  return safeEqual(password, expected);
}

export function createHrSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function readHrSessionToken(token: string | undefined) {
  if (!token || !secret()) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  if (!safeEqual(signature, expected)) {
    return false;
  }

  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function getHrSession() {
  const jar = await cookies();
  return readHrSessionToken(jar.get(HR_SESSION_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
