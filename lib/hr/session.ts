export const HR_SESSION_COOKIE = "hr_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function envCredential(name: "HR_CMS_PASSWORD" | "HR_CMS_SECRET") {
  let value = process.env[name]?.replace(/^\uFEFF/, "").trim() ?? "";
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }
  return value || undefined;
}

function secret() {
  return envCredential("HR_CMS_SECRET") || envCredential("HR_CMS_PASSWORD") || "";
}

export function isHrCmsConfigured() {
  return Boolean(envCredential("HR_CMS_PASSWORD") && secret());
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToHex(signature);
}

export function verifyHrPassword(password: string) {
  const expected = envCredential("HR_CMS_PASSWORD");
  if (!expected) {
    return false;
  }
  return safeEqual(password, expected);
}

export async function createHrSessionToken() {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${await sign(payload)}`;
}

export async function readHrSessionToken(token: string | undefined) {
  if (!token || !secret()) {
    return false;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = await sign(payload);
  if (!safeEqual(signature, expected)) {
    return false;
  }

  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
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
