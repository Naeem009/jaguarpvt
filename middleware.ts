import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { HR_SESSION_COOKIE, readHrSessionToken } from "./lib/hr/session";

const intlMiddleware = createMiddleware(routing);
const LOCALE_PREFIX = /^\/(ar|zh|es|fr|de)(?=\/)/;

function splitLocalePath(pathname: string) {
  const match = pathname.match(LOCALE_PREFIX);
  const locale = match?.[1];
  return {
    locale,
    rest: locale ? pathname.slice(locale.length + 1) : pathname,
  };
}

function isHrProtectedPath(rest: string) {
  return rest === "/hr" || (rest.startsWith("/hr/") && rest !== "/hr/login");
}

export default async function middleware(request: NextRequest) {
  const { locale, rest } = splitLocalePath(request.nextUrl.pathname);

  if (isHrProtectedPath(rest)) {
    const signedIn = await readHrSessionToken(request.cookies.get(HR_SESSION_COOKIE)?.value);
    if (!signedIn) {
      const login = request.nextUrl.clone();
      login.pathname = locale ? `/${locale}/hr/login` : "/hr/login";
      login.search = "";
      return NextResponse.redirect(login);
    }
  }

  const response = intlMiddleware(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  if (rest === "/hr" || rest.startsWith("/hr/")) {
    response.headers.set("cache-control", "private, no-store");
  }
  return response;
}

export const config = {
  matcher: ["/", "/(ar|zh|es|fr|de)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
