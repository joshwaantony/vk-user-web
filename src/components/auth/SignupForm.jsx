


"use client";

import { FiEye } from "react-icons/fi";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.svg" alt="Logo" className="h-10 mx-auto" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-[#0F172A]">
        Welcome Back
      </h1>
      <p className="text-sm text-[#64748B] mt-2">
        Join us today and get started
      </p>

      {/* Card */}
      <div className="mt-10 w-full max-w-[760px] bg-white rounded-[28px]
                      px-10 py-10
                      shadow-[0_30px_80px_rgba(36,87,230,0.18)]">

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]
                         text-[#0F172A] placeholder:text-[#94A3B8]
                         outline-none
                         focus:border-[#2457E6]
                         focus:ring-2 focus:ring-[#2457E6]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]
                         text-[#0F172A] placeholder:text-[#94A3B8]
                         outline-none
                         focus:border-[#2457E6]
                         focus:ring-2 focus:ring-[#2457E6]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Your Address"
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]
                         text-[#0F172A] placeholder:text-[#94A3B8]
                         outline-none
                         focus:border-[#2457E6]
                         focus:ring-2 focus:ring-[#2457E6]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Create Password"
                className="w-full h-12 px-4 pr-11 rounded-xl bg-[#F8FAFC]
                           border border-[#CBD5E1]
                           text-[#0F172A] placeholder:text-[#94A3B8]
                           outline-none
                           focus:border-[#2457E6]
                           focus:ring-2 focus:ring-[#2457E6]"
              />
              <FiEye
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-[#94A3B8] cursor-pointer"
                size={18}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Your Password"
                className="w-full h-12 px-4 pr-11 rounded-xl bg-[#F8FAFC]
                           border border-[#CBD5E1]
                           text-[#0F172A] placeholder:text-[#94A3B8]
                           outline-none
                           focus:border-[#2457E6]
                           focus:ring-2 focus:ring-[#2457E6]"
              />
              <FiEye
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-[#94A3B8] cursor-pointer"
                size={18}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#2457E6]"
            />
            <p className="text-sm text-[#475569]">
              I agree to the{" "}
              <span className="text-[#2457E6] font-medium cursor-pointer">
                Terms of service
              </span>{" "}
              and{" "}
              <span className="text-[#2457E6] font-medium cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="w-full mt-8 h-12 rounded-xl bg-[#1E40D8]
                           text-white font-semibold text-base
                           hover:bg-[#1E3A8A]
                           transition">
          Sign In
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-[#64748B] mt-6">
          Already have an account?{" "}
          <span className="text-[#2457E6] font-semibold cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </main>
  );
}
