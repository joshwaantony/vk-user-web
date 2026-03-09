




"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const initAuth = useAuthStore((state) => state.initAuth);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  const [mounted, setMounted] = useState(false);
  const [isInitializingSession, setIsInitializingSession] = useState(true);

  // Wait until client mounts
  useEffect(() => {
    const initializeSession = async () => {
      setMounted(true);
      initAuth();
      await restoreSession();
      setIsInitializingSession(false);
    };

    initializeSession();
  }, [initAuth, restoreSession]);

  useEffect(() => {
    if (!mounted || isInitializingSession) return;

    const isLoggedIn = !!token;

    // ✅ If logged in and trying to access public home pages
    if (isLoggedIn && (pathname === "/" || pathname === "/home")) {
      router.replace("/course");
    }

  }, [token, pathname, mounted, isInitializingSession, router]);

  if (!mounted || isInitializingSession) return null;

  return children;
}
