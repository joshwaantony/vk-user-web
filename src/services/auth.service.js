import api from "@/api/axios";

export const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};


// Send OTP for login
export const sendOtpApi = async (payload) => {
  const response = await api.post("/auth/otp/send", payload);
  return response.data;
};



// VERIFY OTP (Login / Register)
export const verifyOtpApi = async (payload) => {
    console.log(".........enter......");
    
  const response = await api.post("/auth/otp/verify", payload);
  return response.data;
};
