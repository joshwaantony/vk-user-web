"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import GoogleLinkAccountCard from "@/components/auth/GoogleLinkAccountCard";

export default function GoogleLinkModal({ open, onClose }) {
  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/35 px-4 py-5 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          aria-label="Close"
        >
          <FiX size={18} />
        </button>

        <GoogleLinkAccountCard onClose={onClose} onSuccess={onClose} />
      </div>
    </div>
  );
}
