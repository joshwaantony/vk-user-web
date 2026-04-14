
import api from "@/api/axios";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.message ||
  fallback;

const extractPendingOrderPayload = (payload) => {
  const data = payload?.data ?? payload ?? {};
  const order =
    data?.order ||
    payload?.order ||
    (data?.id || data?.orderId ? data : null);
  const alreadyPending =
    payload?.alreadyPending === true ||
    data?.alreadyPending === true;

  if (!alreadyPending || !order) return null;

  return {
    alreadyPending: true,
    message:
      payload?.message ||
      "Your payment session is already in progress. Continuing checkout...",
    order,
    data,
  };
};

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
    const pendingOrderPayload = extractPendingOrderPayload(
      error?.response?.data
    );
    if (pendingOrderPayload) {
      return pendingOrderPayload;
    }

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
