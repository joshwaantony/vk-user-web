


// import { create } from "zustand";
// import {
//   loginApi,
//   sendOtpApi,
//   verifyOtpApi,
//   sendForgotPasswordOtpApi,
//   registerApi,
//   resetPasswordApi,
// } from "@/services/auth.service";

// export const useAuthStore = create((set, get) => ({
//   /* ==============================
//      STATE
//   ============================== */
//   user: null,
//   token: null,
//   phone: null,
//   purpose: null,

//   verificationToken: null,     // ✅ REGISTER ONLY
//   passwordResetToken: null,    // ✅ FORGOT PASSWORD ONLY

//   loading: false,
//   error: null,

//   /* ==============================
//      SEND OTP
//   ============================== */
//   sendOtp: async ({ phone, purpose }) => {
//     try {
//       set({ loading: true, error: null });

//       if (purpose === "FORGOT_PASSWORD") {
//         await sendForgotPasswordOtpApi({ phone, purpose });
//       } else {
//         await sendOtpApi({ phone, purpose }); // LOGIN / REGISTER
//       }

//       set({
//         phone,
//         purpose,
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

//   /* ==============================
//      VERIFY OTP
//   ============================== */
//   verifyOtp: async (otp) => {
//     try {
//       const { phone, purpose } = get();

//       if (!phone || !purpose) {
//         throw new Error("Phone or purpose missing");
//       }

//       set({ loading: true, error: null });

//       const res = await verifyOtpApi({
//         phone,
//         otp,
//         purpose,
//       });

//       /* ---------- FORGOT PASSWORD ---------- */
//       if (purpose === "FORGOT_PASSWORD") {
//         set({
//           passwordResetToken: res.data.verificationToken, // ✅ CORRECT TOKEN
//           loading: false,
//         });
//         return true;
//       }

//       /* ---------- REGISTER ---------- */
//       if (purpose === "REGISTER") {
//         set({
//           verificationToken: res.data.verificationToken,
//           loading: false,
//         });
//         return true;
//       }

//       /* ---------- LOGIN ---------- */
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//       }

//       set({
//         user: res.data.user || null,
//         token: res.data.token || null,
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

//   /* ==============================
//      REGISTER USER
//   ============================== */
//   register: async ({ name, email, address, password }) => {
//     try {
//       const { phone, verificationToken } = get();

//       if (!phone || !verificationToken) {
//         throw new Error("Missing verification data");
//       }

//       set({ loading: true, error: null });

//       const res = await registerApi({
//         phone,
//         verificationToken,
//         name,
//         email,
//         address,
//         password,
//       });

//       if (res.data?.token) {
//         localStorage.setItem("token", res.data.token);
//       }

//       set({
//         user: res.data.user || null,
//         token: res.data.token || null,
//         verificationToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Registration failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ==============================
//      PASSWORD LOGIN
//   ============================== */
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

//       localStorage.setItem("token", res.data.token);

//       set({
//         user: res.data.user,
//         token: res.data.token,
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

//   /* ==============================
//      RESET PASSWORD (🔥 FIXED)
//   ============================== */
//   resetPassword: async ({ newPassword }) => {
//     try {
//       const { passwordResetToken } = get();

//       if (!passwordResetToken) {
//         throw new Error("Password reset token missing");
//       }

//       set({ loading: true, error: null });

//       await resetPasswordApi({
//         verificationToken: passwordResetToken, // ✅ BACKEND EXPECTS THIS
//         newPassword,
//       });

//       set({
//         passwordResetToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Reset password failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ==============================
//      LOGOUT
//   ============================== */
//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
//       verificationToken: null,
//       passwordResetToken: null,
//     });
//   },
// }));





// import { create } from "zustand";
// import {
//   loginApi,
//   sendOtpApi,
//   verifyOtpApi,
//   sendForgotPasswordOtpApi,
//   registerApi,
//   resetPasswordApi,
// } from "@/services/auth.service";

// export const useAuthStore = create((set, get) => ({
//   /* ==============================
//      STATE
//   ============================== */
//   user: null,
//   token: null,
//   phone: null,
//   purpose: null,

//   verificationToken: null,     // REGISTER
//   passwordResetToken: null,    // FORGOT PASSWORD

//   expiresIn: null,             // ✅ OTP EXPIRY (seconds)

//   loading: false,
//   error: null,

//   /* ==============================
//      SEND OTP
//   ============================== */
//   sendOtp: async ({ phone, purpose }) => {
//     try {
//       set({ loading: true, error: null });

//       let res;

//       if (purpose === "FORGOT_PASSWORD") {
//         res = await sendForgotPasswordOtpApi({ phone, purpose });
//       } else {
//         res = await sendOtpApi({ phone, purpose }); // LOGIN / REGISTER
//       }

//       set({
//         phone,
//         purpose,
//         expiresIn: res.data?.expiresIn || 600, // ✅ STORE EXPIRY
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

//   /* ==============================
//      VERIFY OTP
//   ============================== */
//   verifyOtp: async (otp) => {
//     try {
//       const { phone, purpose } = get();

//       if (!phone || !purpose) {
//         throw new Error("Phone or purpose missing");
//       }

//       set({ loading: true, error: null });

//       const res = await verifyOtpApi({
//         phone,
//         otp,
//         purpose,
//       });

//       /* ---------- FORGOT PASSWORD ---------- */
//       if (purpose === "FORGOT_PASSWORD") {
//         set({
//           passwordResetToken: res.data.verificationToken,
//           expiresIn: null, // ✅ clear timer
//           loading: false,
//         });
//         return true;
//       }

//       /* ---------- REGISTER ---------- */
//       if (purpose === "REGISTER") {
//         set({
//           verificationToken: res.data.verificationToken,
//           expiresIn: null,
//           loading: false,
//         });
//         return true;
//       }

//       /* ---------- LOGIN ---------- */
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//       }

//       set({
//         user: res.data.user || null,
//         token: res.data.token || null,
//         expiresIn: null,
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

//   /* ==============================
//      REGISTER USER
//   ============================== */
//   register: async ({ name, email, address, password }) => {
//     try {
//       const { phone, verificationToken } = get();

//       if (!phone || !verificationToken) {
//         throw new Error("Missing verification data");
//       }

//       set({ loading: true, error: null });

//       const res = await registerApi({
//         phone,
//         verificationToken,
//         name,
//         email,
//         address,
//         password,
//       });

//       if (res.data?.token) {
//         localStorage.setItem("token", res.data.token);
//       }

//       set({
//         user: res.data.user || null,
//         token: res.data.token || null,
//         verificationToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Registration failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ==============================
//      PASSWORD LOGIN
//   ============================== */
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

//       localStorage.setItem("token", res.data.token);

//       set({
//         user: res.data.user,
//         token: res.data.accessToken,
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

//   /* ==============================
//      RESET PASSWORD
//   ============================== */
//   resetPassword: async ({ newPassword }) => {
//     try {
//       const { passwordResetToken } = get();

//       if (!passwordResetToken) {
//         throw new Error("Password reset token missing");
//       }

//       set({ loading: true, error: null });

//       await resetPasswordApi({
//         verificationToken: passwordResetToken,
//         newPassword,
//       });

//       set({
//         passwordResetToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err.response?.data?.message || "Reset password failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ==============================
//      LOGOUT
//   ============================== */
//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
//       verificationToken: null,
//       passwordResetToken: null,
//       expiresIn: null,
//     });
//   },
// }));






// import { create } from "zustand";
// import {
//   loginApi,
//   sendOtpApi,
//   verifyOtpApi,
//   sendForgotPasswordOtpApi,
//   registerApi,
//   resetPasswordApi,
// } from "@/services/auth.service";

// export const useAuthStore = create((set, get) => ({
//   /* ================= STATE ================= */
//   user: null,
//   token:
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null,

//   phone: null,
//   purpose: null,

//   verificationToken: null,
//   passwordResetToken: null,
//   expiresIn: null,

//   loading: false,
//   error: null,

//   /* ================= SEND OTP ================= */
//   sendOtp: async ({ phone, purpose }) => {
//     try {
//       set({ loading: true, error: null });

//       let res;

//       if (purpose === "FORGOT_PASSWORD") {
//         res = await sendForgotPasswordOtpApi({ phone, purpose });
//       } else {
//         res = await sendOtpApi({ phone, purpose });
//       }

//       set({
//         phone,
//         purpose,
//         expiresIn: res?.data?.expiresIn || 600,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Failed to send OTP",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ================= VERIFY OTP ================= */
//   verifyOtp: async (otp) => {
//     try {
//       const { phone, purpose } = get();
//       if (!phone || !purpose)
//         throw new Error("Phone or purpose missing");

//       set({ loading: true, error: null });

//       const res = await verifyOtpApi({
//         phone,
//         otp,
//         purpose,
//       });

//       /* FORGOT PASSWORD */
//       if (purpose === "FORGOT_PASSWORD") {
//         set({
//           passwordResetToken: res?.data?.verificationToken,
//           expiresIn: null,
//           loading: false,
//         });
//         return true;
//       }

//       /* REGISTER */
//       if (purpose === "REGISTER") {
//         set({
//           verificationToken: res?.data?.verificationToken,
//           expiresIn: null,
//           loading: false,
//         });
//         return true;
//       }

//       /* LOGIN */
//       const accessToken = res?.data?.accessToken;
//       const user = res?.data?.user;

//       if (accessToken) {
//         localStorage.setItem("token", accessToken);
//       }

//       set({
//         user: user || null,
//         token: accessToken || null,
//         expiresIn: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Invalid OTP",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ================= REGISTER ================= */
//   register: async ({ name, email, address, password }) => {
//     try {
//       const { phone, verificationToken } = get();
//       if (!phone || !verificationToken)
//         throw new Error("Missing verification data");

//       set({ loading: true, error: null });

//       const res = await registerApi({
//         phone,
//         verificationToken,
//         name,
//         email,
//         address,
//         password,
//       });

//       const accessToken = res?.data?.accessToken;
//       const user = res?.data?.user;

//       if (accessToken) {
//         localStorage.setItem("token", accessToken);
//       }

//       set({
//         user: user || null,
//         token: accessToken || null,
//         verificationToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Registration failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ================= PASSWORD LOGIN ================= */
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

//       const accessToken = res?.data?.accessToken;
//       const user = res?.data?.user;

//       if (accessToken) {
//         localStorage.setItem("token", accessToken);
//       }

//       set({
//         user: user || null,
//         token: accessToken || null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Login failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ================= RESET PASSWORD ================= */
//   resetPassword: async ({ newPassword }) => {
//     try {
//       const { passwordResetToken } = get();
//       if (!passwordResetToken)
//         throw new Error("Password reset token missing");

//       set({ loading: true, error: null });

//       await resetPasswordApi({
//         verificationToken: passwordResetToken,
//         newPassword,
//       });

//       set({
//         passwordResetToken: null,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       set({
//         error: err?.response?.data?.message || "Reset password failed",
//         loading: false,
//       });
//       return false;
//     }
//   },

//   /* ================= LOGOUT ================= */
//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
//       verificationToken: null,
//       passwordResetToken: null,
//       expiresIn: null,
//     });
//   },
// }));

import { create } from "zustand";
import {
  loginApi,
  sendOtpApi,
  verifyOtpApi,
  sendForgotPasswordOtpApi,
  registerApi,
  resetPasswordApi,
} from "@/services/auth.service";

export const useAuthStore = create((set, get) => ({
  /* ================= STATE ================= */
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  phone: null,
  purpose: null,
  verificationToken: null,
  passwordResetToken: null,
  expiresIn: null,
  loading: false,
  error: null,

  /* ================= INIT AUTH ================= */
  initAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
    }
  },

  /* ================= MANUAL STATE SETTERS ================= */
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user) => set({ user }),

  /* ================= SEND OTP ================= */
  sendOtp: async ({ phone, purpose }) => {
    try {
      set({ loading: true, error: null });

      let res;

      if (purpose === "FORGOT_PASSWORD") {
        res = await sendForgotPasswordOtpApi({ phone, purpose });
      } else {
        res = await sendOtpApi({ phone, purpose });
      }

      set({
        phone,
        purpose,
        expiresIn: res?.data?.expiresIn || 600,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to send OTP",
        loading: false,
      });
      return false;
    }
  },

  /* ================= VERIFY OTP ================= */
  verifyOtp: async (otp) => {
    try {
      const { phone, purpose } = get();
      if (!phone || !purpose)
        throw new Error("Phone or purpose missing");

      set({ loading: true, error: null });

      const res = await verifyOtpApi({
        phone,
        otp,
        purpose,
      });

      /* LOGIN */
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;

      if (accessToken) {
        localStorage.setItem("token", accessToken);

        set({
          user: user || null,
          token: accessToken,
          expiresIn: null,
          loading: false,
        });
      }

      return true;
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Invalid OTP",
        loading: false,
      });
      return false;
    }
  },

  /* ================= PASSWORD LOGIN ================= */
  login: async ({ phone, password }) => {
    try {
      set({ loading: true, error: null });

      const res = await loginApi({
        phone,
        password,
        purpose: "LOGIN",
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Handle both possible backend formats
      const accessToken =
        res?.data?.accessToken ||
        res?.data?.token;

      const user =
        res?.data?.user;

      if (!accessToken) {
        console.error("❌ No token found in login response");
        return false;
      }

      localStorage.setItem("token", accessToken);

      set({
        token: accessToken,
        user: user || null,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  /* ================= LOGOUT ================= */
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      phone: null,
      purpose: null,
      verificationToken: null,
      passwordResetToken: null,
      expiresIn: null,
    });
  },
}));