import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/my-course", "/profile", "/lessons"];
const AUTH_PAGES = ["/login", "/signup", "/phone/enter-phone", "/phone/verify"];

export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  if (!token && isProtected) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", `${pathname}${search || ""}`);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPage) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/course";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (token && (pathname === "/" || pathname === "/home")) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/course";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/my-course/:path*",
    "/profile/:path*",
    "/lessons/:path*",
    "/login",
    "/signup",
    "/phone/:path*",
  ],
};
