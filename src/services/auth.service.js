

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

/* ================= CURRENT USER ================= */
export const getMeApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

/* ================= UPDATE CURRENT USER ================= */
export const updateMeApi = async (payload) => {
  const response = await api.patch("/auth/me", payload);
  return response.data;
};

/* ================= REFRESH ACCESS TOKEN ================= */
export const refreshSessionApi = async () => {
  const response = await api.post("/auth/refresh", {});
  return response.data;
};

/* ================= LOGOUT ================= */
export const logoutApi = async () => {
  const response = await api.post("/auth/logout", {});
  return response.data;
};
