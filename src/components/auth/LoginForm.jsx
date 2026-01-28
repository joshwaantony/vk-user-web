


// "use client";

// import { useState } from "react";
// import { loginApi } from "@/services/auth.service";
// import Link from "next/link";

// export default function LoginPage() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await loginApi({
//         phone,
//         password,
//       });

//       // assuming response: { token, user }
//       localStorage.setItem("token", res.data.token);

//       console.log("Login Success", res.data);

//       // optional redirect
//       // router.push("/dashboard");

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
//       <div className="w-full max-w-[420px] text-center">

//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center justify-center">
//             <img src="/logo.svg" alt="Logo" />
//           </div>
//         </div>

//         <h1 className="text-3xl font-extrabold text-[#0F172A]">
//           Welcome Back
//         </h1>
//         <p className="text-[#64748B] mt-2">
//           Sign in to your account
//         </p>

//         <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

//           {/* Phone Number */}
//           <div className="text-left mb-6">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter Your Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                          border border-[#94A3B8]
//                          text-[#0F172A] placeholder:text-[#94A3B8]
//                          outline-none
//                          focus:ring-2 focus:ring-[#2457E6]
//                          focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Password */}
//           <div className="text-left mb-4">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Your Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                          border border-[#94A3B8]
//                          text-[#0F172A] placeholder:text-[#94A3B8]
//                          outline-none
//                          focus:ring-2 focus:ring-[#2457E6]
//                          focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Error (small, no layout change) */}
//           {error && (
//             <p className="text-red-500 text-sm mb-4">{error}</p>
//           )}

//           {/* Links */}
//           <div className="flex justify-between text-sm mb-6">
//             <Link href={"/phone/enter"} className="text-[#2457E6] font-medium">
//               OTP Login
//             </Link>
//             <a href="/forgot-password/phone-verify" className="text-[#2457E6] font-medium">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Sign In Button */}
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
//                        shadow-[0_10px_20px_rgba(36,87,230,0.35)]
//                        hover:bg-[#1E4ED8] transition"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           {/* OR */}
//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//           </div>

//           {/* Google */}
//           <button className="w-full h-14 rounded-xl border border-[#CBD5E1]
//                              flex items-center justify-center gap-3
//                              font-semibold text-[#0F172A]
//                              hover:bg-[#F8FAFC] transition">
//             Sign in with Google
//           </button>
//         </div>

//         <p className="mt-8 text-[#64748B]">
//           Don&apos;t have an account?{" "}
//           <a href="#" className="text-[#2457E6] font-semibold">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </main>
//   );
// }








// "use client";

// import { useState } from "react";
// import { loginApi } from "@/services/auth.service";
// import Link from "next/link";

// export default function LoginPage() {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await loginApi({
//         phone,
//         password,
//       });

//       // assuming response: { token, user }
//       localStorage.setItem("token", res.data.token);

//       console.log("Login Success", res.data);

//       // optional redirect
//       // router.push("/dashboard");

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
//       <div className="w-full max-w-[420px] text-center">

//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center justify-center">
//             <img src="/logo.svg" alt="Logo" />
//           </div>
//         </div>

//         <h1 className="text-3xl font-extrabold text-[#0F172A]">
//           Welcome Back
//         </h1>
//         <p className="text-[#64748B] mt-2">
//           Sign in to your account
//         </p>

//         <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

//           {/* Phone Number */}
//           <div className="text-left mb-6">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter Your Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                          border border-[#94A3B8]
//                          text-[#0F172A] placeholder:text-[#94A3B8]
//                          outline-none
//                          focus:ring-2 focus:ring-[#2457E6]
//                          focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Password */}
//           <div className="text-left mb-4">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Your Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                          border border-[#94A3B8]
//                          text-[#0F172A] placeholder:text-[#94A3B8]
//                          outline-none
//                          focus:ring-2 focus:ring-[#2457E6]
//                          focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Error (small, no layout change) */}
//           {error && (
//             <p className="text-red-500 text-sm mb-4">{error}</p>
//           )}

//           {/* Links */}
//           <div className="flex justify-between text-sm mb-6">
//             <Link href={"/phone/enter"} className="text-[#2457E6] font-medium">
//               OTP Login
//             </Link>
//             <a href="/forgot-password/phone-verify" className="text-[#2457E6] font-medium">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Sign In Button */}
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
//                        shadow-[0_10px_20px_rgba(36,87,230,0.35)]
//                        hover:bg-[#1E4ED8] transition"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           {/* OR */}
//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//           </div>

//           {/* Google */}
//           <button className="w-full h-14 rounded-xl border border-[#CBD5E1]
//                              flex items-center justify-center gap-3
//                              font-semibold text-[#0F172A]
//                              hover:bg-[#F8FAFC] transition">
//             Sign in with Google
//           </button>
//         </div>

//         <p className="mt-8 text-[#64748B]">
//           Don&apos;t have an account?{" "}
//           <a href="#" className="text-[#2457E6] font-semibold">
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginApi } from "@/services/auth.service";
// import { useAuthFlowStore } from "@/store/authFlow.store";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const setFlow = useAuthFlowStore((state) => state.setFlow);

//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

//       localStorage.setItem("token", res.data.token);
//       console.log("Login Success", res.data);

//       // router.push("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // OTP Login flow
//   const handleOtpLogin = () => {
//     setFlow({
//       purpose: "REGISTER",
//       title: "What’s your phone number?",
//       subtitle: "We’ll send you a one-time verification code to confirm your number.",
//     });

//     router.push("/phone/enter-phone");
//   };

//   // Forgot Password flow
//   const handleForgotPassword = () => {
//     setFlow({
//       purpose: "FORGOT_PASSWORD",
//       title: "Verification",
//       subtitle: "We’ll send you a one-time verification code to confirm your number.",
//     });

//     router.push("/phone/enter-phone");
//   };

//   return (
//     <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
//       <div className="w-full max-w-[420px] text-center">

//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img src="/logo.svg" alt="Logo" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-3xl font-extrabold text-[#0F172A]">
//           Welcome Back
//         </h1>
//         <p className="text-[#64748B] mt-2">
//           Sign in to your account
//         </p>

//         <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

//           {/* Phone Number */}
//           <div className="text-left mb-6">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter Your Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                           border border-[#94A3B8]
//                           text-[#0F172A] placeholder:text-[#94A3B8]
//                           outline-none
//                           focus:ring-2 focus:ring-[#2457E6]
//                           focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Password */}
//           <div className="text-left mb-4">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Your Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                           border border-[#94A3B8]
//                           text-[#0F172A] placeholder:text-[#94A3B8]
//                           outline-none
//                           focus:ring-2 focus:ring-[#2457E6]
//                           focus:border-[#2457E6]"
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-red-500 text-sm mb-4">{error}</p>
//           )}

//           {/* Links */}
//           <div className="flex justify-between text-sm mb-6">
//             <button
//               onClick={handleOtpLogin}
//               className="text-[#2457E6] font-medium"
//             >
//               OTP Login
//             </button>

//             <button
//               onClick={handleForgotPassword}
//               className="text-[#2457E6] font-medium"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Sign In Button */}
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
//                        shadow-[0_10px_20px_rgba(36,87,230,0.35)]
//                        hover:bg-[#1E4ED8] transition"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           {/* OR */}
//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//           </div>

//           {/* Google */}
//           <button
//             className="w-full h-14 rounded-xl border border-[#CBD5E1]
//                        flex items-center justify-center gap-3
//                        font-semibold text-[#0F172A]
//                        hover:bg-[#F8FAFC] transition"
//           >
//             Sign in with Google
//           </button>
//         </div>

//         <p className="mt-8 text-[#64748B]">
//           Don&apos;t have an account?{" "}
//           <Link href={"/phone/enter-phone"} className="text-[#2457E6] font-semibold cursor-pointer">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginApi } from "@/services/auth.service";
// import { useAuthFlowStore } from "@/store/authFlow.store";
// import Link from "next/link";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export default function LoginPage() {
//   const router = useRouter();
//   const setFlow = useAuthFlowStore((state) => state.setFlow);

//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔐 VALIDATION
//   const validate = () => {
//     if (!/^\d{10}$/.test(phone)) {
//       setError("Enter a valid 10-digit phone number");
//       return false;
//     }
//     if (!password || password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   // 🔹 LOGIN
//   const handleLogin = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       setError("");

//       const res = await loginApi({
//         phone: `+91${phone}`,
//         password,
//         purpose: "LOGIN",
//       });

//       localStorage.setItem("token", res.data.token);

//       // ✅ success route
//       router.replace("/course");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 OTP LOGIN
//   const handleOtpLogin = () => {
//     setFlow({
//       purpose: "REGISTER",
//       title: "What’s your phone number?",
//       subtitle:
//         "We’ll send you a one-time verification code to confirm your number.",
//     });

//     router.push("/phone/enter-phone");
//   };

//   // 🔹 FORGOT PASSWORD
//   const handleForgotPassword = () => {
//     setFlow({
//       purpose: "FORGOT_PASSWORD",
//       title: "Verification",
//       subtitle:
//         "We’ll send you a one-time verification code to confirm your number.",
//     });

//     router.push("/phone/enter-phone");
//   };

//   return (
//     <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
//       <div className="w-full max-w-[420px] text-center">

//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img src="/logo.svg" alt="Logo" />
//         </div>

//         <h1 className="text-3xl font-extrabold text-[#0F172A]">
//           Welcome Back
//         </h1>
//         <p className="text-[#64748B] mt-2">
//           Sign in to your account
//         </p>

//         <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

//           {/* Phone */}
//           <div className="text-left mb-6">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Phone Number
//             </label>

//             <div className="flex">
             
//               <input
//                 type="tel"
//                 maxLength={10}
//                 placeholder="Enter phone number"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(e.target.value.replace(/\D/g, ""))
//                 }
//                className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                           border border-[#94A3B8]
//                            text-[#0F172A] placeholder:text-[#94A3B8]
//                            outline-none
//                            focus:ring-2 focus:ring-[#2457E6]
//                            focus:border-[#2457E6]"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="text-left mb-4">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                  className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
//                           border border-[#94A3B8]
//                            text-[#0F172A] placeholder:text-[#94A3B8]
//                            outline-none
//                            focus:ring-2 focus:ring-[#2457E6]
//                            focus:border-[#2457E6]"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
//               >
//                 {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-red-500 text-sm mb-4">{error}</p>
//           )}

//           {/* Links */}
//           <div className="flex justify-between text-sm mb-6">
//             <button
//               onClick={handleOtpLogin}
//               className="text-[#2457E6] font-medium"
//             >
//               OTP Login
//             </button>

//             <button
//               onClick={handleForgotPassword}
//               className="text-[#2457E6] font-medium"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
//                        shadow-[0_10px_20px_rgba(36,87,230,0.35)]
//                        hover:bg-[#1E4ED8] transition"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//           </div>

//           <button
//             className="w-full h-14 rounded-xl border border-[#CBD5E1]
//                        flex items-center justify-center gap-3
//                        font-semibold hover:bg-[#F8FAFC]"
//           >
//             Sign in with Google
//           </button>
//         </div>

//         <p className="mt-8 text-[#64748B] mb-10">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/phone/enter-phone"
//             className="text-[#2457E6] font-semibold"
//           >
//             Sign Up
//           </Link>
//         </p >
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/services/auth.service";
import { useAuthFlowStore } from "@/store/authFlow.store";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const setFlow = useAuthFlowStore((state) => state.setFlow);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 VALIDATION
  const validate = () => {
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // 🔹 LOGIN
  const handleLogin = async () => {
    if (!validate()) return;

    const toastId = toast.loading("Signing in...");

    try {
      setLoading(true);

      const res = await loginApi({
        phone: `+91${phone}`,
        password,
        purpose: "LOGIN",
      });

      localStorage.setItem("token", res.data.token);

      toast.dismiss(toastId);
      toast.success("Login successful");

      router.replace("/course");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP LOGIN
  const handleOtpLogin = () => {
    setFlow({
      purpose: "REGISTER",
      title: "What’s your phone number?",
      subtitle:
        "We’ll send you a one-time verification code to confirm your number.",
    });

    router.push("/phone/enter-phone");
  };

  // 🔹 FORGOT PASSWORD
  const handleForgotPassword = () => {
    setFlow({
      purpose: "FORGOT_PASSWORD",
      title: "Verification",
      subtitle:
        "We’ll send you a one-time verification code to confirm your number.",
    });

    router.push("/phone/enter-phone");
  };

  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          Welcome Back
        </h1>
        <p className="text-[#64748B] mt-2">
          Sign in to your account
        </p>

        <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

          {/* Phone */}
          <div className="text-left mb-6">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              maxLength={10}
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
                           border border-[#94A3B8]
                            text-[#0F172A] placeholder:text-[#94A3B8]
                            outline-none
                            focus:ring-2 focus:ring-[#2457E6]
                            focus:border-[#2457E6]"
            />
          </div>

          {/* Password */}
          <div className="text-left mb-4">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
                           border border-[#94A3B8]
                            text-[#0F172A] placeholder:text-[#94A3B8]
                            outline-none
                            focus:ring-2 focus:ring-[#2457E6]
                            focus:border-[#2457E6]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm mb-6">
            <button
              onClick={handleOtpLogin}
              className="text-[#2457E6] font-medium"
            >
              OTP Login
            </button>

            <button
              onClick={handleForgotPassword}
              className="text-[#2457E6] font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
                       shadow-[0_10px_20px_rgba(36,87,230,0.35)]
                       hover:bg-[#1E4ED8] transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          <button
            className="w-full h-14 rounded-xl border border-[#CBD5E1]
                       flex items-center justify-center gap-3
                       font-semibold hover:bg-[#F8FAFC]"
          >
            Sign in with Google
          </button>
        </div>

        <p className="mt-8 text-[#64748B] mb-10">
          Don&apos;t have an account?{" "}
          <Link
            href="/phone/enter-phone"
            className="text-[#2457E6] font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
