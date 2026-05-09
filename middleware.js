import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/my-course", "/profile", "/lessons"];

export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(refreshToken);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (!isAuthenticated && isProtected) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", `${pathname}${search || ""}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-course/:path*",
    "/profile/:path*",
    "/lessons/:path*",
  ],
};
