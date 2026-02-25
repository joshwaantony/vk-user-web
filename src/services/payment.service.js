

import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

/* =====================================================
   CREATE ORDER API
===================================================== */
export const createOrderAPI = async (courseId, token, idempotencyKey) => {
  try {
    const res = await axios.post(
      `${baseURL}/payments/create-order`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
      }
    );

    return res.data.data; // return only order object
  } catch (error) {
    console.error("Create Order Error:", error?.response?.data || error);
    throw error?.response?.data || error;
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
    throw error?.response?.data || error;
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
    throw error?.response?.data || error;
  }
};
