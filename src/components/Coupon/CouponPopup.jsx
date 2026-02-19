
// "use client";

// import { useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { HiArrowRight } from "react-icons/hi";
// import { usePaymentStore } from "@/store/payment.store";
// import { useAuthStore } from "@/store/auth.store";
// import useCourseStore from "@/store/CourseStore";
// import { useRouter } from "next/navigation";

// export default function CouponPopup({ onClose, courseId }) {
//   const [coupon, setCoupon] = useState("");
//   const router = useRouter();

//   const { createOrder, verifyOrder, loading } = usePaymentStore();
//   const { token, user } = useAuthStore();
//   const { courses } = useCourseStore();

//   const selectedCourse = courses.find((c) => c.id === courseId);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleSkip = async () => {
//     try {
//       const order = await createOrder(courseId, token);

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         name: "VK Academy",
//         description: "Course Purchase",

//         handler: async function () {
//           try {
//             const verifyResponse = await verifyOrder(order.id, token);

//             console.log("Verify Response:", verifyResponse);

//             const isPaymentSuccessful =
//               verifyResponse?.success === true &&
//               verifyResponse?.data?.enrolled === true &&
//               verifyResponse?.data?.status === "COMPLETED";

//             if (isPaymentSuccessful) {
//               // ✅ Route using COURSE ID (card id)
//               router.push(`/course/${courseId}`);
//               return;
//             }

//             // ❌ Not completed
//       toast.error("Failed to initiate payment. Please try again.");

//           } catch (error) {
//             console.error("Verification error:", error);
//       toast.error("Failed to initiate payment. Please try again.");
//           }
//         },

//         prefill: {
//           name: user?.name || "",
//           email: user?.email || "",
//         },

//         theme: {
//           color: "#16a34a",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", function () {
//       toast.error("Failed to initiate payment. Please try again.");
//       });

//       razorpay.open();

//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Failed to initiate payment. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto">

//         <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 text-center relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/80 hover:text-white"
//           >
//             <IoClose size={22} />
//           </button>

//           <h2 className="text-lg font-semibold">
//             Have a Coupon Code?
//           </h2>

//           <p className="text-sm text-white/90 mt-1">
//             Enter your code to get an exclusive discount
//           </p>
//         </div>

//         <div className="p-6 space-y-5">

//           <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
//             <span className="text-gray-600 font-medium">
//               Course Price:
//             </span>
//             <span className="text-lg font-bold text-gray-900">
//               {selectedCourse
//                 ? `₹${selectedCourse.price}`
//                 : "Loading..."}
//             </span>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Coupon Code
//             </label>

//             <input
//               type="text"
//               value={coupon}
//               onChange={(e) => setCoupon(e.target.value)}
//               className="text-black mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <button
//             onClick={handleSkip}
//             disabled={loading}
//             className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
//           >
//             {loading ? "Processing..." : "Skip & Continue"}
//             <HiArrowRight size={18} />
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";
import { usePaymentStore } from "@/store/payment.store";
import { useAuthStore } from "@/store/auth.store";
import useCourseStore from "@/store/CourseStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CouponPopup({ onClose, courseId }) {
  const [coupon, setCoupon] = useState("");
  const [processingEnrollment, setProcessingEnrollment] = useState(false);

  const router = useRouter();

  const { createOrder, verifyOrder, loading } = usePaymentStore();
  const { token, user } = useAuthStore();
  const { courses } = useCourseStore();

  const selectedCourse = courses.find((c) => c.id === courseId);

  // Prevent body scroll when popup open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSkip = async () => {
    try {
      const order = await createOrder(courseId, token);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "VK Academy",
        description: "Course Purchase",

        handler: async function () {
          try {
            const verifyResponse = await verifyOrder(order.id, token);

            const isPaymentSuccessful =
              verifyResponse?.success === true &&
              verifyResponse?.data?.enrolled === true &&
              verifyResponse?.data?.status === "COMPLETED";

            if (isPaymentSuccessful) {
              setProcessingEnrollment(true);

              setTimeout(() => {
                onClose(); // close popup
                router.push(`/course/${courseId}?enrolled=true`);
              }, 1500);

              return;
            }

            toast.error("Payment verification failed.");
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed.");
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <IoClose size={22} />
          </button>

          <h2 className="text-lg font-semibold">
            Have a Coupon Code?
          </h2>

          <p className="text-sm text-white/90 mt-1">
            Enter your code to get an exclusive discount
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {processingEnrollment ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
              <p className="text-gray-700 font-medium">
                Processing enrollment...
              </p>
            </div>
          ) : (
            <>
              {/* Course Price */}
              <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Course Price:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {selectedCourse
                    ? `₹${selectedCourse.price}`
                    : "Loading..."}
                </span>
              </div>

              {/* Coupon Input */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Coupon Code
                </label>

                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="text-black mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Skip Button */}
              <button
                onClick={handleSkip}
                disabled={loading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : "Skip & Continue"}
                <HiArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
