// import { create } from "zustand";
// import { loginApi } from "@/services/auth.service";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   loading: false,
//   error: null,

//   login: async (phone, password) => {
//     try {
//       set({ loading: true, error: null });

//       const data = await loginApi({ phone, password });

//       // assuming backend response like:
//       // { token: "...", user: {...} }

//       localStorage.setItem("token", data.token);

//       set({
//         user: data.user,
//         token: data.token,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Login failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, token: null });
//   },
// }));


// import { create } from "zustand";
// import { loginApi, sendOtpApi, verifyOtpApi } from "@/services/auth.service";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   phone: null,
//   loading: false,
//   error: null,
  

//   // 🔹 SEND OTP
//   sendOtp: async (phone) => {
//     try {
//       set({ loading: true, error: null });

//       await sendOtpApi({
//         phone,
//         purpose: "LOGIN",
//       });

//       set({
//         phone,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Failed to send OTP",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   // 🔹 PASSWORD LOGIN (if needed later)
//   login: async (phone, password) => {
//     try {
//       set({ loading: true, error: null });

//       const data = await loginApi({ phone, password });

//       localStorage.setItem("token", data.token);

//       set({
//         user: data.user,
//         token: data.token,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Login failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, token: null, phone: null });
//   },

//    // STEP 2: VERIFY OTP
//   verifyOtp: async (otp) => {
//     try {
//       const phone = get().phone; // phone saved during sendOtp

//       if (!phone) {
//         throw new Error("Phone number missing");
//       }

//       set({ loading: true, error: null });

//       const data = await verifyOtpApi({
//         phone,
//         otp,
//         purpose: "REGISTER", // or LOGIN based on flow
//       });

//       // assuming backend response:
//       // { token, user }

//       localStorage.setItem("token", data.token);

//       set({
//         user: data.user,
//         token: data.token,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Invalid OTP",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, token: null, phone: null });
//   },
// }));



import { create } from "zustand";
import { loginApi, sendOtpApi, verifyOtpApi } from "@/services/auth.service";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  phone: null,
  loading: false,
  error: null,

  // 🔹 SEND OTP
  sendOtp: async (phone) => {
    try {
      set({ loading: true, error: null });

      await sendOtpApi({
        phone,
        purpose: "LOGIN",
      });

      set({
        phone, // ✅ STORE PHONE
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to send OTP",
        loading: false,
      });
      return false;
    }
  },

  // 🔹 VERIFY OTP (FIXED)
  verifyOtp: async (otp) => {
    try {
      const phone = get().phone; // ✅ NOW WORKS

      console.log("PHONE FROM STORE:", phone);

      if (!phone) {
        throw new Error("Phone number missing");
      }

      set({ loading: true, error: null });

      const data = await verifyOtpApi({
        phone,
        otp,
        purpose: "LOGIN", // or LOGIN
      });

      console.log("VERIFY OTP RESPONSE:", data);

      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      console.error("VERIFY OTP ERROR:", err);

      set({
        error: err.response?.data?.message || "Invalid OTP",
        loading: false,
      });
      return false;
    }
  },

  // 🔹 LOGOUT (ONLY ONCE)
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, phone: null });
  },
}));
