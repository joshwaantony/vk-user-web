
import api from "@/api/axios";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.message ||
  fallback;

/* =====================================================
   CREATE ORDER API
===================================================== */
export const createOrderAPI = async (
  courseId,
  token,
  idempotencyKey,
  couponCode
) => {
  try {
    const payload = couponCode
      ? { courseId, couponCode }
      : { courseId };

    const headers = {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.post("/payments/create-order", payload, { headers });

    // Support both: { data: { order, pricing } } and { data: { ...orderFields } }
    return res.data?.data;
  } catch (error) {
    console.error("Create Order Error:", error?.response?.data || error);
    throw new Error(getErrorMessage(error, "Unable to create order"));
  }
};

/* =====================================================
   VERIFY CLIENT API
===================================================== */
export const verifyClientAPI = async (
  payload,
  token,
  idempotencyKey
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.post("/payments/verify-client", payload, { headers });

    return res.data;
  } catch (error) {
    console.error("Verify Client Error:", error?.response?.data || error);
    throw new Error(getErrorMessage(error, "Unable to verify payment"));
  }
};

/* =====================================================
   VERIFY ORDER API
===================================================== */
export const verifyOrderAPI = async (orderId, token) => {
  try {
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await api.get("/payments/verify-order", {
      params: { orderId },
      headers,
    });

    return res.data;
  } catch (error) {
    console.error("Verify Order Error:", error?.response?.data || error);
    throw new Error(getErrorMessage(error, "Unable to verify order"));
  }
};
