

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBookOpen,
  FiEdit,
} from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function ProfilePage() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  useEffect(() => {
    if (!token) {
      router.replace("/login?redirect=/profile");
      return;
    }
    fetchMe();
  }, [token, router, fetchMe]);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#f3f5f7] px-4 sm:px-6 lg:px-26 py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
          Manage your personal information and view your learning progress
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {/* Green Top */}
            <div className="h-32 sm:h-36 lg:h-40 bg-gradient-to-r from-emerald-500 to-green-600 relative flex justify-center">
              <div className="absolute -bottom-14 sm:-bottom-16">
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-white overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="profile"
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-4xl sm:text-5xl" />
                  )}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-16 sm:pt-20 pb-8 text-center px-4 sm:px-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                {loading && !user ? "Loading..." : user?.name || "-"}
              </h2>
              <p className="text-gray-500 mt-1 capitalize text-sm">
                {user?.role || "-"}
              </p>

              <div className="border-t my-5"></div>

              <div className="flex justify-center gap-10 sm:gap-16">
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">
                    {user?.enrolledCount || 0}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Enrolled
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600">
                    {user?.completedCount || 0}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-5 sm:p-8 lg:p-10">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-6 lg:mb-8">
            Personal Information
          </h3>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InfoField
              icon={<FiUser />}
              label="Full Name"
              value={user?.name || "-"}
            />
            <InfoField
              icon={<FiCalendar />}
              label="Joined Date"
              value={formatDate(user?.createdAt)}
            />
            <InfoField
              icon={<FiPhone />}
              label="Phone Number"
              value={user?.phone || "-"}
            />
            <InfoField
              icon={<FiMail />}
              label="Email Address"
              value={user?.email || "-"}
            />
          </div>

          {/* Address */}
          <div className="mt-6">
            <p className="flex items-center gap-2 text-gray-600 mb-2 text-sm font-medium">
              <span className="text-emerald-600 text-lg">
                <FiMapPin />
              </span>
              Address
            </p>
            <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-4 text-gray-700 break-words text-sm sm:text-base">
              {user?.address || "-"}
            </div>
          </div>

          <div className="border-t my-8"></div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={() => router.push("/my-course")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <FiBookOpen />
              My Courses
            </button>

            <button
              onClick={() => router.push("/profile/edit")}
              className="w-full border border-gray-300 text-black hover:text-[#009966] hover:border-emerald-600  py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <FiEdit />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-gray-600 mb-2 text-xs sm:text-sm font-medium">
        <span className="text-emerald-600 text-base">{icon}</span>
        {label}
      </p>
      <div className="bg-gray-100 border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-gray-700 break-words text-sm sm:text-base">
        {value}
      </div>
    </div>
  );
}