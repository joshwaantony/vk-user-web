



"use client";

import { useState } from "react";
import { FiClock, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function CourseContent() {
  const [openSection1, setOpenSection1] = useState(true);

  return (
    <div className="bg-white rounded-2xl border p-4 sm:p-6">

      {/* HEADER */}
      <h2 className="text-lg sm:text-xl text-black font-semibold mb-1">
        Course Content
      </h2>
      <p className="text-sm text-[#3D3B3B] mb-6">
        6 sections • 24 lessons • 8 weeks
      </p>

      {/* ================= SECTION 1 ================= */}
      <div className="border rounded-xl mb-4 overflow-hidden">

        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">

          {/* LEFT */}
          <div className="flex items-start gap-4">

            {/* THUMB LINE IMAGE */}
            {/* <Image
              src="/thumb-line.avif"
              alt="thumb line"
              width={40}
              height={60}
              className=""
            /> */}

            <div>
              <p className="font-semibold text-black text-sm sm:text-base">
                Section 1: Introduction to Accounting
              </p>
              <p className="text-xs text-[#3D3B3B]">
                4 lesson • 3/4 completed
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* PROGRESS */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeDasharray="75, 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[11px] sm:text-xs font-semibold text-black">
                75%
              </span>
            </div>

            {/* TOGGLE */}
            <button
              onClick={() => setOpenSection1(!openSection1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <FiChevronDown
                className={`transition-transform duration-300 text-[#3D3B3B] ${
                  openSection1 ? "rotate-180" : ""
                }`}
              />
            </button>

          </div>
        </div>

        {/* LESSONS */}
        {openSection1 && (
          <div className="border-t divide-y px-4 sm:px-6">

            <Lesson
              title="What is Financial Accounting?"
              desc="Learn the basics of financial accounting and its importance in business."
              time="12:45"
              completed
            />

            <Lesson
              title="The Accounting Equation"
              desc="Master the fundamental accounting equation: Assets = Liabilities + Equity"
              time="15:30"
              completed
            />

            <Lesson
              title="Financial Statements Overview"
              desc="Introduction to the four main financial statements"
              time="18:20"
              completed
            />

            <Lesson
              title="Accounting Standards and Principles"
              desc="Understanding GAAP and IFRS accounting standards"
              time="18:20"
            />
          </div>
        )}
      </div>

      {/* ================= OTHER SECTIONS ================= */}
      {[
        ["Section 2: Recording Transactions", "5 lesson • 0/5 completed"],
        ["Section 3: Adjusting Entries", "4 lesson • 0/4 completed"],
        ["Section 4: Financial Statement Preparation", "4 lesson • 0/4 completed"],
        ["Section 5: Financial Analysis", "4 lesson • 0/4 completed"],
        ["Section 6: Advanced Topics", "3 lesson • 0/3 completed"],
      ].map(([title, meta], i) => (
        <div
          key={i}
          className="border rounded-xl p-4 flex items-center justify-between mb-3"
        >
          <div className="flex items-start gap-4">

            {/* THUMB LINE IMAGE */}
            {/* <Image
              src="/thumb-line.avif"
              alt="thumb line"
              width={40}
              height={40}
              className="opacity-40"
            /> */}

            <div>
              <p className="font-semibold text-black text-sm">
                {title}
              </p>
              <p className="text-xs text-[#3D3B3B]">
                {meta}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-black">0%</span>
            <FiChevronDown className="text-[#3D3B3B]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= LESSON ROW ================= */

function Lesson({ title, desc, time, completed }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4">

      <div className="flex gap-4">

        {/* THUMB LINE IMAGE */}
        <Image
          src="/thumb-line.avif"
          alt="thumb line"
          width={40}
          height={40}
          className={completed ? "" : "opacity-40"}
        />

        <div>
          <p className="text-sm font-medium text-black">
            {title}
          </p>
          <p className="text-xs text-gray-500">
            {desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:mt-0 mt-1">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <FiClock /> {time}
        </span>

        {completed && (
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            Completed
          </span>
        )}
      </div>
    </div>
  );
}
