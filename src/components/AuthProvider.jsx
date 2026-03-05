




"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const initAuth = useAuthStore((state) => state.initAuth);

  const [mounted, setMounted] = useState(false);

  // Wait until client mounts
  useEffect(() => {
    setMounted(true);
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!mounted) return;

    const isLoggedIn = !!token;

    // ✅ If logged in and trying to access public home pages
    if (isLoggedIn && (pathname === "/" || pathname === "/home")) {
      router.replace("/course");
    }

  }, [token, pathname, mounted, router]);

  if (!mounted) return null;

  return children;
}
