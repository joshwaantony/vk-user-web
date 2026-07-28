




"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { getAuthRedirectFromLocation } from "@/lib/authRedirect";
import { AUTH_PAGES } from "@/constants/routes";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const initAuth = useAuthStore((state) => state.initAuth);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    const initializeSession = async () => {
      if (typeof window !== "undefined") {
        const currentUrl = new URL(window.location.href);
        const accessToken = currentUrl.searchParams.get("accessToken");

        if (accessToken) {
          setToken(accessToken);
          currentUrl.searchParams.delete("accessToken");

          const nextSearch = currentUrl.searchParams.toString();
          const nextUrl = `${currentUrl.pathname}${nextSearch ? `?${nextSearch}` : ""}${currentUrl.hash}`;
          window.history.replaceState({}, document.title, nextUrl);
        }
      }

      initAuth();
      const sessionState = await restoreSession();

      if (sessionState?.shouldLogout) {
        router.replace("/home");
        router.refresh();
      }
    };

    initializeSession();
  }, [initAuth, restoreSession, router, setToken]);

  useEffect(() => {
    const isLoggedIn = !!user;
    const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

    if (!isLoggedIn) return;

    if (pathname === "/" || pathname === "/home") {
      router.replace("/course");
      return;
    }

    if (isAuthPage) {
      router.replace(getAuthRedirectFromLocation("/course"));
    }
  }, [user, pathname, router]);

  return children;
}
