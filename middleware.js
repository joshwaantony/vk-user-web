import { NextResponse } from "next/server";
import { PROTECTED_PREFIXES } from "./src/constants/routes";

export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const isAuthenticated = Boolean(refreshToken);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
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
