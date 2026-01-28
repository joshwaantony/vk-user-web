// "use client";
// import { useState } from "react";
// import {
//   FiChevronDown,
//   FiCheckCircle,
//   FiClock,
// } from "react-icons/fi";

// export default function LessonSidebar() {
//   const [openSection1, setOpenSection1] = useState(true);

//   return (
//     <div className="
//       w-full
//       lg:w-[360px]
//       bg-white
//       text-black
//       border-l
//       min-h-screen
//     ">

//       {/* ================= PROGRESS ================= */}
//       <div className="p-4 sm:p-6 border-b">
//         <h3 className="font-semibold text-lg mb-2">Your Progress</h3>

//         <div className="flex justify-between text-sm mb-2">
//           <span>Course Completion</span>
//           <span className="font-semibold">13%</span>
//         </div>

//         <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
//           <div className="h-2 w-[13%] bg-blue-600 rounded-full" />
//         </div>

//         <p className="text-xs text-gray-500">
//           3 of 24 lessons completed
//         </p>
//       </div>

//       {/* ================= SECTION 1 ================= */}
//       <div className="p-4 sm:p-6 border-b">

//         {/* HEADER */}
//         <button
//           onClick={() => setOpenSection1(!openSection1)}
//           className="w-full flex justify-between items-center mb-4"
//         >
//           <h4 className="font-semibold text-left">
//             Section 1: Introduction to Accounting
//           </h4>

//           <FiChevronDown
//             className={`transition-transform ${
//               openSection1 ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {/* LESSON LIST */}
//         {openSection1 && (
//           <div>
//             {[
//               { title: "What is Financial Accounting?", time: "12:45", done: true },
//               { title: "The Accounting Equation", time: "15:30", done: true },
//               { title: "Financial Statements Overview", time: "18:20", done: true },
//               { title: "Accounting Standards and Principles", time: "14:15", done: false },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center py-3 border-t text-sm"
//               >
//                 <div className="flex items-center gap-2">
//                   {item.done ? (
//                     <FiCheckCircle className="text-green-500" />
//                   ) : (
//                     <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-xs">
//                       {index + 1}
//                     </span>
//                   )}
//                   <span>{item.title}</span>
//                 </div>

//                 <div className="flex items-center gap-1 text-gray-500 text-xs">
//                   <FiClock />
//                   {item.time}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ================= OTHER SECTIONS ================= */}
//       {[
//         "Section 2: Recording Transactions",
//         "Section 3: Adjusting Entries",
//         "Section 4: Financial Statement Preparation",
//       ].map((section, i) => (
//         <div
//           key={i}
//           className="p-4 sm:p-6 border-b flex justify-between items-center text-sm font-semibold"
//         >
//           {section}
//           <FiChevronDown />
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiClock } from "react-icons/fi";

export default function LessonSidebar() {
  const [openSection1, setOpenSection1] = useState(true);

  return (
    <div className="w-full lg:w-[360px] bg-white text-black border-l min-h-screen ">

      {/* ================= PROGRESS ================= */}
      <div className="p-4 sm:p-6 border-b">
        <h3 className="font-semibold text-lg mb-2">Your Progress</h3>

        <div className="flex justify-between text-sm mb-2">
          <span>Course Completion</span>
          <span className="font-semibold">13%</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
          <div className="h-2 w-[13%] bg-blue-600 rounded-full" />
        </div>

        <p className="text-xs text-gray-500">
          3 of 24 lessons completed
        </p>
      </div>

      {/* ================= SECTION 1 ================= */}
      <div className="p-4 sm:p-6 border-b">

        {/* HEADER */}
        <button
          onClick={() => setOpenSection1(!openSection1)}
          className="w-full flex justify-between items-center mb-4"
        >
          <h4 className="font-semibold text-left text-sm">
            Section 1: Introduction to Accounting
          </h4>

          <FiChevronDown
            className={`transition-transform ${
              openSection1 ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* LESSON LIST */}
        {openSection1 && (
          <div className="space-y-3">
            {[
              { title: "What is Financial Accounting?", time: "12:45", done: true },
              { title: "The Accounting Equation", time: "15:30", done: true },
              { title: "Financial Statements Overview", time: "18:20", done: true },
              { title: "Accounting Standards and Principles", time: "14:15", done: false },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-3 py-3 border-t"
              >
                {/* LEFT */}
                <div className="flex gap-3">
                  {/* THUMB IMAGE */}
                  <Image
                    src="/thumb-line.avif"
                    alt="lesson thumb"
                    width={36}
                    height={36}
                    className={item.done ? "" : "opacity-40"}
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    {item.done && (
                      <span className="inline-block mt-1 text-[11px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <FiClock />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= OTHER SECTIONS ================= */}
      {[
        "Section 2: Recording Transactions",
        "Section 3: Adjusting Entries",
        "Section 4: Financial Statement Preparation",
      ].map((section, i) => (
        <div
          key={i}
          className="p-4 sm:p-6 border-b flex justify-between items-center text-sm font-semibold"
        >
          {section}
          <FiChevronDown />
        </div>
      ))}
    </div>
  );
}
