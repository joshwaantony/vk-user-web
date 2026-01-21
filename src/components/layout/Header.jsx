// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white ">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         {/* Logo */}
//         <img src="/logo.svg" alt="Logo" className="size-16" />

//         {/* Navigation */}
//         <nav className="hidden md:flex gap-8 text-sm text-[#475569] font-semibold">
//           <a href="#" className="hover:text-[#1C4ED8] transition">Home</a>
//           <a href="#" className="text-[#1C4ED8]">Courses</a>
//           <a href="#" className="hover:text-[#1C4ED8] transition">Tax Planning</a>
//           <a href="#" className="hover:text-[#1C4ED8] transition">Features</a>
//           <a href="#" className="hover:text-[#1C4ED8] transition">Contact</a>
//         </nav>

//         {/* CTA */}
//         <button className="bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
//           Get Started
//         </button>
//       </div>
//     </header>
//   );
// }



"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <img src="/logo.svg" alt="Logo" className="h-10 sm:h-12" />

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8 text-sm text-[#475569] font-semibold">
            <a href="#" className="hover:text-[#1C4ED8] transition">Home</a>
            <a href="#" className="text-[#1C4ED8]">Courses</a>
            <a href="#" className="hover:text-[#1C4ED8] transition">Tax Planning</a>
            <a href="#" className="hover:text-[#1C4ED8] transition">Features</a>
            <a href="#" className="hover:text-[#1C4ED8] transition">Contact</a>
          </nav>

          {/* DESKTOP CTA */}
          <button className="hidden md:block bg-[#1C4ED8] font-semibold text-white px-5 py-2 rounded-lg hover:bg-[#163EB8] transition">
            Get Started
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-[#1C4ED8]"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* APP DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex  justify-end px-5 py-6 border-b">
          
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-600"
          >
            <FiX />
          </button>
        </div>

        {/* DRAWER NAV */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-sm font-semibold text-[#475569]">
          <a href="#" className="hover:text-[#1C4ED8]">Home</a>
          <a href="#" className="text-[#1C4ED8]">Courses</a>
          <a href="#" className="hover:text-[#1C4ED8]">Tax Planning</a>
          <a href="#" className="hover:text-[#1C4ED8]">Features</a>
          <a href="#" className="hover:text-[#1C4ED8]">Contact</a>
        </nav>

        {/* DRAWER CTA */}
        <div className="px-6 mt-auto pb-6">
          <button className="w-full bg-[#1C4ED8] font-semibold text-white py-3 rounded-lg hover:bg-[#163EB8] transition">
            Get Started
          </button>
        </div>
      </aside>
    </>
  );
}
