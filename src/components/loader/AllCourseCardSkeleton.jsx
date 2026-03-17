"use client";

export default function AllCourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />

      <div className="p-5 flex flex-col gap-4">
        <div className="h-[56px] flex flex-col justify-center gap-2">
          <div className="h-5 bg-gray-300 rounded w-5/6" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-10 bg-gray-300 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded-full" />
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-300" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 bg-gray-300 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>

          <div className="h-5 w-16 bg-gray-300 rounded" />
        </div>

        <div className="mt-4 h-12 w-full bg-gray-400 rounded-xl" />
      </div>
    </div>
  );
}
