import { cookies } from "next/headers";
import { HR_SESSION_COOKIE, readHrSessionToken } from "@/lib/hr/session";

export {
  HR_SESSION_COOKIE,
  SESSION_TTL_MS,
  createHrSessionToken,
  envCredential,
  isHrCmsConfigured,
  readHrSessionToken,
  sessionCookieOptions,
  verifyHrPassword,
} from "@/lib/hr/session";

export async function getHrSession() {
  const jar = await cookies();
  return readHrSessionToken(jar.get(HR_SESSION_COOKIE)?.value);
}
