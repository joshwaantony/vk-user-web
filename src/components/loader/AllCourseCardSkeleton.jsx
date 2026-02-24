"use client";

export default function AllCourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-full h-48 bg-gray-300" />

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-10 bg-gray-300 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-1">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>

        <hr />

        {/* Duration & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>

          <div className="h-5 w-16 bg-gray-300 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-4 h-12 w-full bg-gray-400 rounded-xl" />
      </div>
    </div>
  );
}
