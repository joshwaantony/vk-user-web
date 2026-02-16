




// "use client";

// import { useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { FaShieldAlt } from "react-icons/fa";
// import { HiArrowRight } from "react-icons/hi";
// import { AiFillInfoCircle } from "react-icons/ai";

// export default function CouponPopup({ onClose }) {
//   const [coupon, setCoupon] = useState("");

//   const popularCodes = ["SAVE20", "FIRST50", "WELCOME"];

//   // ✅ Prevent background scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">

//       {/* ================= POPUP CARD ================= */}
//       <div
//         className="
//           w-full
//           max-w-md
//           bg-white
//           rounded-2xl
//           shadow-2xl
//           overflow-hidden
//           relative
//           max-h-[95vh]
//           overflow-y-auto
//         "
//       >

//         {/* ================= HEADER ================= */}
//         <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 sm:p-6 text-center relative">
          
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/80 hover:text-white"
//           >
//             <IoClose size={22} />
//           </button>

//           <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl font-bold">
//             VK
//           </div>

//           <h2 className="text-lg sm:text-xl font-semibold">
//             Have a Coupon Code?
//           </h2>

//           <p className="text-xs sm:text-sm text-white/90 mt-1">
//             Enter your code to get an exclusive discount
//           </p>
//         </div>

//         {/* ================= BODY ================= */}
//         <div className="p-5 sm:p-6 space-y-5">

//           {/* Course Price */}
//           <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
//             <span className="text-sm sm:text-base text-gray-600 font-medium">
//               Course Price:
//             </span>
//             <span className="text-lg sm:text-xl font-bold text-gray-900">
//               $299
//             </span>
//           </div>

//           {/* Coupon Input */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Coupon Code
//             </label>

//             <input
//               type="text"
//               placeholder="ENTER YOUR COUPON CODE"
//               value={coupon}
//               onChange={(e) => setCoupon(e.target.value)}
//               className="
//                 text-black
//                 mt-2
//                 w-full
//                 border
//                 border-gray-300
//                 rounded-lg
//                 px-4
//                 py-3
//                 text-sm
//                 focus:outline-none
//                 focus:ring-2
//                 focus:ring-green-500
//               "
//             />
//           </div>

//           {/* Apply Button */}
//           <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition active:scale-[0.98]">
//             ✓ Apply Coupon
//           </button>

//           {/* Skip */}
//           <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2">
//             Skip & Continue
//             <HiArrowRight size={18} />
//           </button>

//           {/* Footer */}
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500 pt-3 border-t">
//             <div className="flex items-center gap-1">
//               <FaShieldAlt size={14} />
//               Secure Payment
//             </div>
//             <div className="flex items-center gap-1">
//               <FaShieldAlt size={14} />
//               30-Day Refund
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { usePaymentStore } from "@/store/payment.store";
import { useAuthStore } from "@/store/auth.store"; // assuming token is here
import { useRouter } from "next/navigation";

export default function CouponPopup({ onClose, courseId }) {
  const [coupon, setCoupon] = useState("");
  const router = useRouter();

  const { createCourseOrder, loading } = usePaymentStore();
  const { token } = useAuthStore(); // get token

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSkip = async () => {
    try {
      const res = await createCourseOrder(courseId, token);

      console.log("Order Created:", res);

      // 👉 You can redirect to payment page here
      router.push("/checkout");

    } catch (error) {
      console.error("Order failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 sm:p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <IoClose size={22} />
          </button>

          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl font-bold">
            VK
          </div>

          <h2 className="text-lg sm:text-xl font-semibold">
            Have a Coupon Code?
          </h2>

          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Enter your code to get an exclusive discount
          </p>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-6 space-y-5">

          <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-600 font-medium">
              Course Price:
            </span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              $299
            </span>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Coupon Code
            </label>

            <input
              type="text"
              placeholder="ENTER YOUR COUPON CODE"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="text-black mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition active:scale-[0.98]">
            ✓ Apply Coupon
          </button>

          {/* ✅ CONNECTED BUTTON */}
          <button
            onClick={handleSkip}
            disabled={loading}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "Skip & Continue"}
            <HiArrowRight size={18} />
          </button>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500 pt-3 border-t">
            <div className="flex items-center gap-1">
              <FaShieldAlt size={14} />
              Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <FaShieldAlt size={14} />
              30-Day Refund
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}