





"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store";

export default function SignupPage() {
  const router = useRouter();
  const { register, loading, error } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔐 VALIDATION
  const validate = () => {
    if (!form.name || !form.email || !form.address) {
      toast.error("All fields are required");
      return false;
    }
     if (!emailRegex.test(form.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!form.agree) {
      toast.error("Please accept Terms & Privacy Policy");
      return false;
    }
    return true;
  };

//   const handleSignup = async () => {
//     if (!validate()) return;


//     const success = await register({
//       name: form.name,
//       email: form.email,
//       address: form.address,
//       password: form.password,
//     });


//  if (success) {
//   toast.success("Account created successfully");
//   router.replace("/course");
// } else {
//   // ✅ show backend validation message
//   if (Array.isArray(error)) {
//     error.forEach((e) => toast.error(e.message));
//   } else {
//     toast.error(error || "Registration failed");
//   }
// }

//   };



const handleSignup = async () => {
  console.log("Signup clicked");   // 👈 add this

  if (!validate()) return;

  console.log("Validation passed");

  const success = await register({
    name: form.name,
    email: form.email,
    address: form.address,
    password: form.password,
  });

  console.log("Register result:", success);
  if (success) {
  toast.success("Account created successfully");

  setTimeout(() => {
    router.push("/course");
  }, 500);
}
};
  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.svg" alt="Logo" className="h-16 mx-auto" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Full Name"
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1] text-black placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]  text-black placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter Your Address"
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]  text-black placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                onChange={handleChange}
                className="w-full h-12 px-4 pr-11 rounded-xl bg-[#F8FAFC]
                           border border-[#CBD5E1]  text-black placeholder:text-[#9CA3AF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff className="text-[#9CA3AF]" /> : <FiEye className="text-[#9CA3AF]" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Your Password"
                onChange={handleChange}
                className="w-full h-12 px-4 pr-11 rounded-xl bg-[#F8FAFC]
                           border border-[#CBD5E1]  text-black placeholder:text-[#9CA3AF]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <FiEyeOff className="text-[#9CA3AF]" /> : <FiEye className="text-[#9CA3AF]" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="agree"
              onChange={handleChange}
              className="w-4 h-4 accent-[#2457E6]"
            />
            <p className="text-sm text-black">
              I agree to the{" "}
              <span className="text-[#2457E6] font-medium">Terms of service</span>{" "}
              and{" "}
              <span className="text-[#2457E6] font-medium">Privacy Policy</span>
            </p>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-8 h-12 rounded-xl bg-[#1E40D8]
                     text-white font-semibold"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center text-black mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2457E6] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}


