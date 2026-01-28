




// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   const navLink = (path) =>
//     pathname === path
//       ? "text-[#1C4ED8]"
//       : "text-[#475569] hover:text-[#1C4ED8] transition";

//   return (
//     <>
//       {/* HEADER */}
//       <header className="sticky top-0 z-50 w-full border-b bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

//           {/* LOGO */}
//           <Link href="/">
//             <img
//               src="/logo.svg"
//               alt="Logo"
//               className="h-12 sm:h-14 cursor-pointer"
//             />
//           </Link>

//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex gap-8 text-sm font-semibold">
//             <Link href="/home" className={navLink("/home")}>
//               Home
//             </Link>
//             <Link href="/course" className={navLink("/course")}>
//               Courses
//             </Link>
       
       
//             <Link href="/contact" className={navLink("/contact")}>
//               Contact
//             </Link>
//           </nav>

//           {/* DESKTOP CTA */}
//           <Link href="/register">
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

//       {/* BACKDROP */}
//       <div
//         className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
//           open ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setOpen(false)}
//       />

//       {/* APP DRAWER */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* DRAWER HEADER */}
//         <div className="flex justify-end px-5 py-7 border-b">
//           <button
//             onClick={() => setOpen(false)}
//             className="text-2xl text-gray-600"
//           >
//             <FiX />
//           </button>
//         </div>

//         {/* DRAWER NAV */}
//         <nav className="flex flex-col gap-5 px-6 py-6 text-sm font-semibold">
//           <Link href="/home" onClick={() => setOpen(false)} className={navLink("/home")}>
//             Home
//           </Link>
//           <Link href="/course" onClick={() => setOpen(false)} className={navLink("/course")}>
//             Courses
//           </Link>
         
       
//           <Link href="/contact" onClick={() => setOpen(false)} className={navLink("/contact")}>
//             Contact
//           </Link>
//         </nav>

//         {/* DRAWER CTA */}
//         <div className="px-6 mt-auto pb-6">
//           <Link href="/register" onClick={() => setOpen(false)}>
//             <button className="w-full bg-[#1C4ED8] font-semibold text-white py-3 rounded-lg hover:bg-[#163EB8] transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </aside>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (path) =>
    pathname === path
      ? "text-[#1C4ED8]"
      : "text-[#475569] hover:text-[#1C4ED8] transition";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* LEFT: LOGO + NAV */}
          <div className="flex items-center gap-16">
            {/* LOGO */}
            <Link href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-12 sm:h-14 cursor-pointer"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-8 text-sm font-semibold">
              <Link href="/home" className={navLink("/home")}>
                Home
              </Link>
              <Link href="/course" className={navLink("/course")}>
                Courses
              </Link>
              <Link href="/contact" className={navLink("/contact")}>
                Contact
              </Link>
            </nav>
          </div>

          {/* RIGHT: CTA */}
          <Link href="/register">
            <button className="hidden md:block bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
              Get Started
            </button>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-[#1C4ED8]"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* ================= BACKDROP ================= */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex justify-end px-5 py-7 border-b">
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-600"
          >
            <FiX />
          </button>
        </div>

        {/* DRAWER NAV */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-sm font-semibold">
          <Link
            href="/home"
            onClick={() => setOpen(false)}
            className={navLink("/home")}
          >
            Home
          </Link>

          <Link
            href="/course"
            onClick={() => setOpen(false)}
            className={navLink("/course")}
          >
            Courses
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={navLink("/contact")}
          >
            Contact
          </Link>
        </nav>

        {/* DRAWER CTA */}
        <div className="px-6 mt-auto pb-6">
          <Link href="/register" onClick={() => setOpen(false)}>
            <button className="w-full bg-[#1C4ED8] font-semibold text-white py-3 rounded-lg hover:bg-[#163EB8] transition">
              Get Started
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
