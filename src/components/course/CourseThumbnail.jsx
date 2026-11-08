"use client";

import { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";

const isUsableUrl = (value) =>
  typeof value === "string" && value.trim() !== "" && value.trim() !== "null";

/**
 * Course card image using the backend `thumbnail` field.
 * Falls back to a neutral placeholder when the URL is missing or fails to load.
 * `className` controls size so each card keeps its existing dimensions.
 */
export default function CourseThumbnail({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!isUsableUrl(src) || failed) {
    return (
      <div
        role="img"
        aria-label={alt ? `${alt} thumbnail unavailable` : "Course thumbnail unavailable"}
        className={`${className} flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#E0EBFF] to-[#F1F5F9] text-[#1C3FD1]`}
      >
        <FiBookOpen size={36} aria-hidden="true" />
        <span className="px-4 text-center text-xs font-medium text-[#475569] line-clamp-1">
          {alt || "Course"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Course thumbnail"}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
}
