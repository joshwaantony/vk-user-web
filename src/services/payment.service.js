



import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

// ✅ CREATE ORDER API
export const createOrderAPI = async (courseId, token) => {
  const res = await axios.post(
    `${baseURL}/payments/create-order`,
    { courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data; // returning only order object
};

// ✅ VERIFY PAYMENT API
export const verifyPaymentAPI = async (payload, token) => {
  const res = await axios.post(
    `${baseURL}/payments/verify-payment`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

// ✅ VERIFY ORDER API
export const verifyOrderAPI = async (orderId, token) => {
  const res = await axios.get(
    `${baseURL}/payments/verify-order?orderId=${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};