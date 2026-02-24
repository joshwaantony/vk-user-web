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
  const [razorLoading, setRazorLoading] = useState(false);

  const router = useRouter();

  const { createOrder, verifyOrder, loading } = usePaymentStore();
  const { token, user } = useAuthStore();
  const { courses } = useCourseStore();

  const selectedCourse = courses.find((c) => c.id === courseId);

  /* ================= DISABLE BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ================= VERIFY WITH RETRY ================= */
  const verifyWithRetry = async (orderId, retries = 6) => {
    for (let i = 0; i < retries; i++) {
      const response = await verifyOrder(orderId, token);

      if (
        response?.success &&
        response?.data?.status === "COMPLETED" &&
        response?.data?.enrolled === true
      ) {
        return true;
      }

      // wait 2 seconds before retry
      await new Promise((res) => setTimeout(res, 2000));
    }

    return false;
  };

  /* ================= PAYMENT HANDLER ================= */
  const handleSkip = async () => {
    if (razorLoading) return; // prevent double click

    try {
      setRazorLoading(true);

      const order = await createOrder(courseId, token);

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded.");
        setRazorLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "VK Academy",
        description: "Course Purchase",

        handler: async function () {
          try {
            setProcessingEnrollment(true);

            const success = await verifyWithRetry(order.id);

            if (success) {
              toast.success("Enrollment successful 🎉");

              onClose();
              router.push(`/course/${courseId}`);

              return;
            }

            toast.error("Payment verification failed.");
            setProcessingEnrollment(false);
          } catch (error) {
            console.error(error);
            toast.error("Verification failed.");
            setProcessingEnrollment(false);
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
        setRazorLoading(false);
      });

      razorpay.open();

      razorpay.on("modal.closed", function () {
        setRazorLoading(false);
      });

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment.");
      setRazorLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">

        {/* HEADER */}
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

        {/* BODY */}
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
              {/* PRICE */}
              <div className="bg-gray-100 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Course Price:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {selectedCourse ? `₹${selectedCourse.price}` : "Loading..."}
                </span>
              </div>

              {/* COUPON */}
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

              {/* BUTTON */}
              <button
                onClick={handleSkip}
                disabled={loading || razorLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading || razorLoading ? "Processing..." : "Skip & Continue"}
                <HiArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}