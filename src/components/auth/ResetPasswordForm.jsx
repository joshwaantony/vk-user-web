// "use client";

// export default function ResetPasswordPage() {
//   return (
//     <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">
//       {/* Logo */}
//       <div className="mb-6">
//         <img src="/logo.svg" alt="Logo" className="h-10 mx-auto" />
//       </div>

//       {/* Heading */}
//       <h1 className="text-3xl font-extrabold text-[#0F172A]">
//         Reset Password
//       </h1>
//       <p className="text-sm text-[#64748B] mt-2">
//         Set Your New Password
//       </p>

//       {/* Card */}
//       <div
//         className="mt-10 w-full max-w-[380px] bg-white rounded-[28px]
//                    px-8 py-10
//                    shadow-[0_30px_80px_rgba(36,87,230,0.18)]"
//       >
//         {/* New Password */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//             New Password
//           </label>
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
//                        border border-[#CBD5E1]
//                        text-[#0F172A] placeholder:text-[#94A3B8]
//                        outline-none
//                        focus:border-[#2457E6]
//                        focus:ring-2 focus:ring-[#2457E6]"
//           />
//         </div>

//         {/* Confirm Password */}
//         <div className="mb-8">
//           <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
//                        border border-[#CBD5E1]
//                        text-[#0F172A] placeholder:text-[#94A3B8]
//                        outline-none
//                        focus:border-[#2457E6]
//                        focus:ring-2 focus:ring-[#2457E6]"
//           />
//         </div>

//         {/* Save Button */}
//         <button
//           className="w-full h-12 rounded-xl bg-[#1E40D8]
//                      text-white font-semibold text-base
//                      shadow-[0_10px_20px_rgba(30,64,216,0.35)]
//                      hover:bg-[#1E3A8A]
//                      transition"
//         >
//           Save
//         </button>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword, loading } = useAuthStore();
  

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSave = async () => {
    if (!password || !confirm) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await resetPassword({ newPassword: password });

    if (success) {
      toast.success("Password reset successfully");

      // clear sensitive data
      setPassword("");
      setConfirm("");

      router.replace("/login");
    } else {
      toast.error("Reset password failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.svg" alt="Logo" className="h-10 mx-auto" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Reset Password</h1>
      <p className="text-sm text-[#64748B] mt-2">Set your new password</p>

      {/* Card */}
      <div
        className="mt-10 w-full max-w-[380px] bg-white rounded-[28px]
                   px-8 py-10
                   shadow-[0_30px_80px_rgba(36,87,230,0.18)]"
      >
        {/* New Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                       border border-[#CBD5E1]
                       focus:outline-none
                       focus:ring-2 focus:ring-[#2457E6]"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            className="w-full h-12 px-4 rounded-xl bg-[#F8FAFC]
                       border border-[#CBD5E1]
                       focus:outline-none
                       focus:ring-2 focus:ring-[#2457E6]"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading || password !== confirm}
          className="w-full h-12 rounded-xl bg-[#1E40D8]
                     text-white font-semibold
                     hover:bg-[#1E3A8A]
                     disabled:opacity-50
                     disabled:cursor-not-allowed
                     transition"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </main>
  );
}
