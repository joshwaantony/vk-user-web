



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [shrink, setShrink] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerWidth < 768) {
//         setShrink(window.scrollY > 40);
//       } else {
//         setShrink(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ ACTIVE + HOVER COLOR FIX
//   const navLink = (path) =>
//     pathname === path
//       ? "text-[#1C4ED8] font-semibold"
//       : "text-[#475569] hover:text-[#1C4ED8] transition-colors duration-200";

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <header
//         className={`
//           sticky top-0 z-50 w-full border-b bg-white
//           transition-all duration-300
//           ${shrink ? "py-2" : "py-4"}
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
//           {/* LEFT */}
//           <div className="flex items-center gap-16">
//             {/* LOGO */}
//             <Link href="/">
//               <img
//                 src="/logo.svg"
//                 alt="Logo"
//                 className={`
//                   transition-all duration-300
//                   ${shrink ? "h-9" : "h-12 sm:h-14"}
//                 `}
//               />
//             </Link>

//             {/* DESKTOP NAV */}
//             <nav className="hidden md:flex gap-8 text-sm font-semibold">
//               <Link href="/home" className={navLink("/home")}>
//                 Home
//               </Link>

//               <Link href="/course" className={navLink("/course")}>
//                 Courses
//               </Link>

//               <Link href="/my-course" className={navLink("/my-course")}>
//                 My Courses
//               </Link>

//               <Link href="/contact" className={navLink("/contact")}>
//                 Contact
//               </Link>
//             </nav>
//           </div>

//           {/* RIGHT CTA */}
//           <Link href="/phone/enter-phone">
//             <button className="hidden md:block bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
//               Get Started
//             </button>
//           </Link>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setOpen(true)}
//             className="md:hidden text-2xl text-[#1C4ED8]"
//           >
//             <FiMenu />
//           </button>
//         </div>
//       </header>

//       {/* ================= BACKDROP ================= */}
//       <div
//         className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setOpen(false)}
//       />

//       {/* ================= MOBILE DRAWER ================= */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* CLOSE */}
//         <div className="flex justify-end px-5 py-7 border-b">
//           <button
//             onClick={() => setOpen(false)}
//             className="text-2xl text-gray-600"
//           >
//             <FiX />
//           </button>
//         </div>

//         {/* MOBILE NAV */}
//         <nav className="flex flex-col gap-5 px-6 py-6 text-sm font-semibold">
//           <Link
//             href="/home"
//             onClick={() => setOpen(false)}
//             className={navLink("/home")}
//           >
//             Home
//           </Link>

//           <Link
//             href="/course"
//             onClick={() => setOpen(false)}
//             className={navLink("/course")}
//           >
//             Courses
//           </Link>

//           <Link
//             href="/my-course"
//             onClick={() => setOpen(false)}
//             className={navLink("/my-course")}
//           >
//             My Courses
//           </Link>

//           <Link
//             href="/contact"
//             onClick={() => setOpen(false)}
//             className={navLink("/contact")}
//           >
//             Contact
//           </Link>
//         </nav>

//         {/* MOBILE CTA */}
//         <div className="px-6 mt-auto pb-6">
//           <Link href="/phone/enter-phone" onClick={() => setOpen(false)}>
//             <button className="w-full bg-[#1C4ED8] font-semibold text-white py-3 rounded-lg hover:bg-[#163EB8] transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </aside>
//     </>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { FiMenu } from "react-icons/fi";
// import { useAuthStore } from "@/store/auth.store";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [shrink, setShrink] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();

//   const { token, logout } = useAuthStore();

//   const isLoggedIn = !!token;

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerWidth < 768) {
//         setShrink(window.scrollY > 40);
//       } else {
//         setShrink(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLink = (path) =>
//     pathname === path
//       ? "text-[#1C4ED8] font-semibold"
//       : "text-[#475569] hover:text-[#1C4ED8] transition-colors duration-200";

//   const handleLogout = () => {
//     logout();
//     router.push("/home");
//   };

//   return (
//     <header
//       className={`
//         sticky top-0 z-50 w-full border-b bg-white
//         transition-all duration-300
//         ${shrink ? "py-2" : "py-4"}
//       `}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex items-center gap-16">
//           <Link href="/">
//             <img
//               src="/logo.svg"
//               alt="Logo"
//               className={`transition-all duration-300 ${
//                 shrink ? "h-9" : "h-12 sm:h-14"
//               }`}
//             />
//           </Link>

//           <nav className="hidden md:flex gap-8 text-sm font-semibold">

//             {/* FIXED LINE */}
//             {!isLoggedIn && (
//               <Link href="/home" className={navLink("/home")}>
//                 Home
//               </Link>
//             )}

//             <Link href="/course" className={navLink("/course")}>
//               Courses
//             </Link>

//             {isLoggedIn && (
//               <Link href="/my-course" className={navLink("/my-course")}>
//                 My Courses
//               </Link>
//             )}

//             <Link href="/contact" className={navLink("/contact")}>
//               Contact
//             </Link>
//           </nav>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <Link href="/phone/enter-phone">
//               <button className="bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
//                 Get Started
//               </button>
//             </Link>
//           ) : (
//             <>
//               <Link href="/profile">
//                 <button className="font-semibold text-[#1C4ED8]">
//                   Profile
//                 </button>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         {/* MOBILE MENU */}
//         <button
//           onClick={() => setOpen(true)}
//           className="md:hidden text-2xl text-[#1C4ED8]"
//         >
//           <FiMenu />
//         </button>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { FiMenu } from "react-icons/fi";
// import { useAuthStore } from "@/store/auth.store";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [shrink, setShrink] = useState(false);

//   const pathname = usePathname();
//   const router = useRouter();

//   // ✅ Correct subscription
//   const token = useAuthStore((state) => state.token);
//   const logout = useAuthStore((state) => state.logout);


//   console.log("🧠 Header Token:", token); // Debug log to verify token value

//   const isLoggedIn = !!token;

//   useEffect(() => {
//     console.log("🧠 Header Token:", token);
//   }, [token]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerWidth < 768) {
//         setShrink(window.scrollY > 40);
//       } else {
//         setShrink(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLink = (path) =>
//     pathname === path
//       ? "text-[#1C4ED8] font-semibold"
//       : "text-[#475569] hover:text-[#1C4ED8] transition-colors duration-200";

//   const handleLogout = () => {
//     logout();
//     router.push("/home");
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full border-b border- bg-white transition-all duration-300 ${
//         shrink ? "py-2" : "py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex items-center gap-16">
//           <Link href="/">
//             <img
//               src="/logo.svg"
//               alt="Logo"
//               className={`transition-all duration-300 ${
//                 shrink ? "h-9" : "h-12 sm:h-14"
//               }`}
//             />
//           </Link>

//           <nav className="hidden md:flex gap-8 text-sm font-semibold">
//             {!isLoggedIn && (
//               <Link href="/home" className={navLink("/home")}>
//                 Home
//               </Link>
//             )}

//             <Link href="/course" className={navLink("/course")}>
//               Courses
//             </Link>

//             {isLoggedIn && (
//               <Link href="/my-course" className={navLink("/my-course")}>
//                 My Courses
//               </Link>
//             )}

//             <Link href="/contact" className={navLink("/contact")}>
//               Contact
//             </Link>
//           </nav>
//         </div>

//         {/* RIGHT */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <Link href="/phone/enter-phone">
//               <button className="bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
//                 Get Started
//               </button>
//             </Link>
//           ) : (
//             <>
//               <Link href="/profile">
//                 <button className="font-semibold text-[#1C4ED8]">
//                   Profile
//                 </button>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         {/* MOBILE */}
//         <button
//           onClick={() => setOpen(true)}
//           className="md:hidden text-2xl text-[#1C4ED8]"
//         >
//           <FiMenu />
//         </button>
//       </div>
//     </header>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiUser } from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ✅ Zustand Subscription
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const isLoggedIn = !!token;

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setShrink(window.scrollY > 40);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLink = (path) =>
    pathname === path
      ? "text-[#1C4ED8] font-semibold"
      : "text-[#475569] hover:text-[#1C4ED8] transition-colors duration-200";

  const handleLogout = () => {
    logout();
    router.push("/home");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white transition-all duration-300 ${
        shrink ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-16">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="Logo"
              className={`transition-all duration-300 ${
                shrink ? "h-9" : "h-12 sm:h-14"
              }`}
            />
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            {!isLoggedIn && (
              <Link href="/home" className={navLink("/home")}>
                Home
              </Link>
            )}

            <Link href="/course" className={navLink("/course")}>
              Courses
            </Link>

            {isLoggedIn && (
              <Link href="/my-course" className={navLink("/my-course")}>
                My Courses
              </Link>
            )}

            <Link href="/contact" className={navLink("/contact")}>
              Contact
            </Link>
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/phone/enter-phone">
              <button className="bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
                Get Started
              </button>
            </Link>
          ) : (
            <>
              {/* ✅ Profile Icon */}
              <Link href="/profile">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EEF2FF] text-[#1C4ED8] hover:bg-[#1C4ED8] hover:text-white transition-all duration-300 shadow-sm">
                  <FiUser size={18} />
                </button>
              </Link>

              {/* ✅ Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl text-[#1C4ED8]"
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
}