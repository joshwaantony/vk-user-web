

import api from "@/api/axios";

/* ================= LOGIN ================= */
export const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

/* ================= SEND OTP ================= */
export const sendOtpApi = async (payload) => {
  const response = await api.post("/auth/otp/send", payload);
  return response.data;
};

/* ================= VERIFY OTP ================= */
export const verifyOtpApi = async (payload) => {
  const response = await api.post("/auth/otp/verify", payload);
  return response.data;
};

/* ================= FORGOT PASSWORD OTP ================= */
export const sendForgotPasswordOtpApi = async (payload) => {
  const response = await api.post("/auth/otp/send", payload);
  return response.data;
};

/* ================= REGISTER ================= */
export const registerApi = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

/* ================= RESET PASSWORD ================= */
export const resetPasswordApi = async (payload) => {
  const response = await api.post("/auth/password/reset", payload);
  return response.data;
};