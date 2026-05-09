




"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { getAuthRedirectFromLocation } from "@/lib/authRedirect";

const AUTH_PAGES = ["/login", "/signup", "/phone/enter-phone", "/phone/verify"];

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const initAuth = useAuthStore((state) => state.initAuth);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    const initializeSession = async () => {
      initAuth();
      const sessionState = await restoreSession();

      if (sessionState?.shouldLogout) {
        router.replace("/home");
        router.refresh();
      }
    };

    initializeSession();
  }, [initAuth, restoreSession, router]);

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
