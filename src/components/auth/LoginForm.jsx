// "use client";


// export default function LoginPage() {
//   return (
//     <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
//       <div className="w-full max-w-[420px] text-center">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className=" flex items-center justify-center">
//             <img src="/logo.svg" alt="" />{" "}
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl font-extrabold text-[#0F172A]">Welcome Back</h1>
//         <p className="text-[#64748B] mt-2">Sign in to your account</p>

//         {/* Card */}
//         <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
//           {/* Phone */}
//           <div className="text-left mb-6">
//             <label className="block text-sm font-semibold text-[#0F172A] mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               placeholder="Enter Your Phone Number"
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2457E6]"
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
//               className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2457E6]"
//             />
//           </div>

//           {/* Links */}
//           <div className="flex justify-between text-sm mb-6">
//             <a href="#" className="text-[#2457E6] font-medium">
//               OTP Login
//             </a>
//             <a href="#" className="text-[#2457E6] font-medium">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Sign In Button */}
//           <button className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg shadow-[0_10px_20px_rgba(36,87,230,0.35)] hover:bg-[#1E4ED8] transition">
//             Sign In
//           </button>

//           {/* OR */}
//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//           </div>

//           {/* Google */}
//           <button className="w-full h-14 rounded-xl border border-[#CBD5E1] flex items-center justify-center gap-3 font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition">
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Sign in with Google
//           </button>
//         </div>

//         {/* Footer */}
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



"use client";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          Welcome Back
        </h1>
        <p className="text-[#64748B] mt-2">
          Sign in to your account
        </p>

        {/* Card */}
        <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          
          {/* Phone Number */}
          <div className="text-left mb-6">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
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
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
                         border border-[#94A3B8]
                         text-[#0F172A] placeholder:text-[#94A3B8]
                         outline-none
                         focus:ring-2 focus:ring-[#2457E6]
                         focus:border-[#2457E6]"
            />
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm mb-6">
            <a href="#" className="text-[#2457E6] font-medium">
              OTP Login
            </a>
            <a href="#" className="text-[#2457E6] font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
                             shadow-[0_10px_20px_rgba(36,87,230,0.35)]
                             hover:bg-[#1E4ED8] transition">
            Sign In
          </button>

          {/* OR */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="mx-4 text-sm text-[#94A3B8]">OR</span>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Google Sign In */}
          <button className="w-full h-14 rounded-xl border border-[#CBD5E1]
                             flex items-center justify-center gap-3
                             font-semibold text-[#0F172A]
                             hover:bg-[#F8FAFC] transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[#64748B]">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-[#2457E6] font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
