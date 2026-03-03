

import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
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

    const res = await axios.post(
      `${baseURL}/payments/create-order`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
      }
    );

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
    const res = await axios.post(
      `${baseURL}/payments/verify-client`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
      }
    );

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
    const res = await axios.get(
      `${baseURL}/payments/verify-order`,
      {
        params: { orderId }, // cleaner way
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Verify Order Error:", error?.response?.data || error);
    throw new Error(getErrorMessage(error, "Unable to verify order"));
  }
};
