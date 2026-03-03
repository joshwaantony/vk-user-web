// "use client";

// import { useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { HiArrowRight } from "react-icons/hi";
// import { usePaymentStore } from "@/store/payment.store";
// import { useAuthStore } from "@/store/auth.store";
// import useCourseStore from "@/store/CourseStore";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// const PENDING_PAYMENT_KEY = "vk_pending_payment";
// const getErrorMessage = (error, fallback) =>
//   error?.message || fallback;

// const generateIdempotencyKey = () => {
//   if (typeof crypto !== "undefined" && crypto.randomUUID) {
//     return crypto.randomUUID();
//   }

//   return `idem_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
// };

// const setPendingPayment = (orderId, courseId) => {
//   if (typeof window === "undefined") return;

//   localStorage.setItem(
//     PENDING_PAYMENT_KEY,
//     JSON.stringify({
//       orderId,
//       courseId,
//       createdAt: Date.now(),
//     })
//   );
// };

// const getPendingPayment = () => {
//   if (typeof window === "undefined") return null;

//   try {
//     const raw = localStorage.getItem(PENDING_PAYMENT_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch (error) {
//     console.error("Pending payment parse error:", error);
//     return null;
//   }
// };

// const clearPendingPayment = () => {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem(PENDING_PAYMENT_KEY);
// };

// export default function CouponPopup({ onClose, courseId }) {
//   const [coupon, setCoupon] = useState("");
//   const [processingEnrollment, setProcessingEnrollment] = useState(false);
//   const [razorLoading, setRazorLoading] = useState(false);

//   const router = useRouter();

//   const { createOrder, verifyClient, verifyOrder, loading } = usePaymentStore();
//   const { token, user } = useAuthStore();
//   const { courses } = useCourseStore();

//   const selectedCourse = courses.find(
//     (c) =>
//       String(c?.id || c?._id || "") ===
//       String(courseId || "")
//   );

//   /* ================= DISABLE BODY SCROLL ================= */
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   /* ================= VERIFY FALLBACK ================= */
//   useEffect(() => {
//     let cancelled = false;

//     const verifyPendingOrder = async () => {
//       if (!token || !courseId) return;

//       const pending = getPendingPayment();
//       if (!pending || pending.courseId !== courseId || !pending.orderId) return;

//       try {
//         setProcessingEnrollment(true);

//         const response = await verifyOrder(pending.orderId, token);
//         if (cancelled) return;

//         if (
//           response?.success &&
//           response?.data?.status === "COMPLETED" &&
//           response?.data?.enrolled === true
//         ) {
//           clearPendingPayment();
//           toast.success("Payment already verified. Redirecting...");
//           onClose();
//           router.push(`/course/${courseId}?enrolled=true`);
//           return;
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Verify pending order error:", error);
//         }
//       } finally {
//         if (!cancelled) {
//           setProcessingEnrollment(false);
//         }
//       }
//     };

//     verifyPendingOrder();

//     return () => {
//       cancelled = true;
//     };
//   }, [courseId, onClose, router, token, verifyOrder]);

//   /* ================= PAYMENT HANDLER ================= */
//   const handleSkip = async () => {
//     if (razorLoading) return; // prevent double click
//     if (!courseId) {
//       toast.error("Course not found. Please refresh and try again.");
//       return;
//     }
//     if (!token) {
//       toast.error("Please login first.");
//       return;
//     }

//     try {
//       setRazorLoading(true);

//       const createOrderKey = generateIdempotencyKey();
//       const createOrderResponse = await createOrder(
//         courseId,
//         token,
//         createOrderKey
//       );
//       const order =
//         createOrderResponse?.order ||
//         createOrderResponse?.data?.order ||
//         createOrderResponse;
//       const orderId = order?.id || order?.orderId;

//       if (!orderId) {
//         throw new Error("Order ID missing in create-order response.");
//       }

//       setPendingPayment(orderId, courseId);

//       if (!window.Razorpay) {
//         toast.error("Payment gateway not loaded.");
//         clearPendingPayment();
//         setRazorLoading(false);
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: orderId,
//         name: "VK Academy",
//         description: "Course Purchase",

//         handler: async function (response) {
//           try {
//             setRazorLoading(false);
//             setProcessingEnrollment(true);

//             const verifyClientKey = generateIdempotencyKey();
//             await verifyClient(
//               {
//                 razorpayOrderId: response?.razorpay_order_id || orderId,
//                 razorpayPaymentId: response?.razorpay_payment_id,
//                 razorpaySignature: response?.razorpay_signature,
//               },
//               token,
//               verifyClientKey
//             );

//             clearPendingPayment();
//             toast.success("Enrollment successful 🎉");
//             onClose();
//             router.push(`/course/${courseId}?enrolled=true`);
//           } catch (error) {
//             console.error(error);
//             toast.error(
//               "Payment succeeded, but verification is pending. Reopen this course to continue."
//             );
//             setProcessingEnrollment(false);
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
//         toast.error("Payment failed. Please try again.");
//         clearPendingPayment();
//         setRazorLoading(false);
//       });

//       razorpay.open();

//       razorpay.on("modal.closed", function () {
//         setRazorLoading(false);
//       });

//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(
//         getErrorMessage(error, "Failed to initiate payment.")
//       );
//       clearPendingPayment();
//       setRazorLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">

//         {/* HEADER */}
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

//         {/* BODY */}
//         <div className="p-6 space-y-5">

//           {processingEnrollment ? (
//             <div className="flex flex-col items-center justify-center py-10 space-y-4">
//               <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
//               <p className="text-gray-700 font-medium">
//                 Confirming enrollment...
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* PRICE */}
//               <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
//                 <span className="text-gray-600 font-medium">
//                   Course Price:
//                 </span>
//                 <span className="text-lg font-bold text-gray-900">
//                   {selectedCourse ? `₹${selectedCourse.price}` : "Loading..."}
//                 </span>
//               </div>

//               {/* COUPON */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Coupon Code
//                 </label>

//                 <input
//                   type="text"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   className="text-black mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               {/* BUTTON */}
//               <button
//                 onClick={handleSkip}
//                 disabled={loading || razorLoading}
//                 className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
//               >
//                 {loading || razorLoading ? "Processing..." : "Buy Now"}
//                 <HiArrowRight size={18} />
//               </button>
//             </>
//           )}
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
import { useCouponStore } from "@/store/coupon.store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PENDING_PAYMENT_KEY = "vk_pending_payment";

const getErrorMessage = (error, fallback) =>
  error?.message || fallback;

const generateIdempotencyKey = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `idem_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

const setPendingPayment = (orderId, courseId) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    PENDING_PAYMENT_KEY,
    JSON.stringify({
      orderId,
      courseId,
      createdAt: Date.now(),
    })
  );
};

const getPendingPayment = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PENDING_PAYMENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const clearPendingPayment = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_PAYMENT_KEY);
};

export default function CouponPopup({ onClose, courseId }) {
  const [coupon, setCoupon] = useState("");
  const [processingEnrollment, setProcessingEnrollment] = useState(false);
  const [razorLoading, setRazorLoading] = useState(false);

  const router = useRouter();

  const { createOrder, verifyClient, verifyOrder, loading } =
    usePaymentStore();
  const { token, user } = useAuthStore();
  const { courses } = useCourseStore();

  const {
    validateCoupon,
    couponData,
    loading: couponLoading,
    clearCoupon,
  } = useCouponStore();

  const selectedCourse = courses.find(
    (c) =>
      String(c?.id || c?._id || "") ===
      String(courseId || "")
  );

  /* Disable scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* Verify fallback */
  useEffect(() => {
    let cancelled = false;

    const verifyPendingOrder = async () => {
      if (!token || !courseId) return;

      const pending = getPendingPayment();
      if (!pending || pending.courseId !== courseId) return;

      try {
        setProcessingEnrollment(true);

        const response = await verifyOrder(pending.orderId, token);
        if (cancelled) return;

        if (
          response?.success &&
          response?.data?.status === "COMPLETED" &&
          response?.data?.enrolled === true
        ) {
          clearPendingPayment();
          clearCoupon();
          setCoupon("");
          setRazorLoading(false);
          setProcessingEnrollment(false);
          toast.success("Payment already verified.");
          onClose();
          router.push(`/course/${courseId}?enrolled=true`);
        }
      } catch {}
      finally {
        if (!cancelled) setProcessingEnrollment(false);
      }
    };

    verifyPendingOrder();
    return () => (cancelled = true);
  }, [courseId, onClose, router, token, verifyOrder]);

  /* Apply Coupon */
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      await validateCoupon({
        code: coupon.trim(),
        courseId,
      });

      toast.success("Coupon applied 🎉");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid coupon"
      );
    }
  };

  /* PAYMENT */
  const handleSkip = async () => {
    if (razorLoading) return;
    if (!courseId) return toast.error("Course not found");
    if (!token) return toast.error("Please login first");

    try {
      setRazorLoading(true);

      const createOrderKey = generateIdempotencyKey();

      const createOrderResponse = await createOrder(
        courseId,
        token,
        createOrderKey,
        couponData?.code
      );

      const order =
        createOrderResponse?.order ||
        createOrderResponse?.data?.order ||
        createOrderResponse;

      const orderId = order?.id || order?.orderId;

      if (!orderId) throw new Error("Order ID missing");

      setPendingPayment(orderId, courseId);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: orderId,
        name: "VK Academy",
        description: "Course Purchase",

        handler: async function (response) {
          try {
            setProcessingEnrollment(true);

            const verifyClientKey = generateIdempotencyKey();

            await verifyClient(
              {
                razorpayOrderId:
                  response?.razorpay_order_id || orderId,
                razorpayPaymentId:
                  response?.razorpay_payment_id,
                razorpaySignature:
                  response?.razorpay_signature,
              },
              token,
              verifyClientKey
            );

            clearPendingPayment();
            clearCoupon();
            setCoupon("");
            setRazorLoading(false);
            setProcessingEnrollment(false);
            toast.success("Enrollment successful 🎉");
            onClose();
            router.push(`/course/${courseId}?enrolled=true`);
          } catch {
            toast.error("Verification pending.");
            setProcessingEnrollment(false);
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: { color: "#16a34a" },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", () => {
        toast.error("Payment failed");
        clearPendingPayment();
        setRazorLoading(false);
      });

      razorpay.open();
      razorpay.on("modal.closed", () => setRazorLoading(false));

    } catch (error) {
      toast.error(
        getErrorMessage(error, "Payment failed")
      );
      clearPendingPayment();
      setRazorLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">

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
            Enter your code to get discount
          </p>
        </div>

        <div className="p-6 space-y-5">
          {processingEnrollment ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
              <p className="text-gray-700 font-medium">
                Confirming enrollment...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Course Price:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {selectedCourse
                    ? couponData
                      ? `₹${couponData.finalAmount ?? couponData.finalPrice}`
                      : `₹${selectedCourse.price}`
                    : "Loading..."}
                </span>
              </div>

              {couponData && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium text-gray-900">
                      ₹{couponData.basePrice ?? selectedCourse?.price ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Coupon Discount</span>
                    <span className="font-medium text-green-700">
                      -₹{couponData.couponDiscount ?? 0}
                    </span>
                  </div>

                  <div className="h-px bg-green-200" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-semibold">Final Amount</span>
                    <span className="font-bold text-gray-900">
                      ₹{couponData.finalAmount ?? couponData.finalPrice ?? 0}
                    </span>
                  </div>
                </div>
              )}

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

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm"
                  >
                    {couponLoading
                      ? "Applying..."
                      : "Apply"}
                  </button>

                  {couponData && (
                    <button
                      onClick={clearCoupon}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleSkip}
                disabled={loading || razorLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading || razorLoading
                  ? "Processing..."
                  : "Buy Now"}
                <HiArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
