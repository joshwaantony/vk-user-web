




"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
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
    const isLoggedIn = !!token;

    if (isLoggedIn && (pathname === "/" || pathname === "/home")) {
      router.replace("/course");
    }
  }, [token, pathname, router]);

  return children;
}
