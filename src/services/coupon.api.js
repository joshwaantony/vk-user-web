import api from "@/api/axios";

/* ===============================
   VALIDATE COUPON
================================= */
export const validateCouponApi = async ({ code, courseId }) => {
  const response = await api.post("/coupons/validate", {
    code,
    courseId,
  });

  return response.data;
};