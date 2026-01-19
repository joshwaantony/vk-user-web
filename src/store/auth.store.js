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



// import { create } from "zustand";
// import { loginApi, sendOtpApi, verifyOtpApi,sendForgotPasswordOtpApi } from "@/services/auth.service";

// export const useAuthStore = create((set, get) => ({
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
//         phone, // ✅ STORE PHONE
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

//   // 🔹 VERIFY OTP (FIXED)
//   verifyOtp: async (otp) => {
//     try {
//       const phone = get().phone; // ✅ NOW WORKS

//       console.log("PHONE FROM STORE:", phone);

//       if (!phone) {
//         throw new Error("Phone number missing");
//       }

//       set({ loading: true, error: null });

//       const data = await verifyOtpApi({
//         phone,
//         otp,
//         purpose: "LOGIN", // or LOGIN
//       });

//       console.log("VERIFY OTP RESPONSE:", data);

//       localStorage.setItem("token", data.token);

//       set({
//         user: data.user,
//         token: data.token,
//         loading: false,
//       });

//       return true;
//     } catch (err) {
//       console.error("VERIFY OTP ERROR:", err);

//       set({
//         error: err.response?.data?.message || "Invalid OTP",
//         loading: false,
//       });
//       return false;
//     }
//   },
// sendForgotPasswordOtp: async (phone) => {
//     try {
//       set({ loading: true, error: null });

//       await sendForgotPasswordOtpApi({
//         phone,
//         purpose: "FORGOT_PASSWORD",
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
//   // 🔹 LOGOUT (ONLY ONCE)
//   logout: () => {
//     localStorage.removeItem("token");
//     set({ user: null, token: null, phone: null });
//   },
// }));






// import { create } from "zustand";
// import {
//   loginApi,
//   sendOtpApi,
//   verifyOtpApi,
//   sendForgotPasswordOtpApi,
// } from "@/services/auth.service";

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   token: null,
//   phone: null,
//   purpose: null, // ✅ store purpose
//   loading: false,
//   error: null,

//   // 🔹 SEND OTP (GENERIC)
//   sendOtp: async ({ phone, purpose }) => {
//     try {
//       set({ loading: true, error: null });

//       // choose API based on purpose
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

//   // 🔹 VERIFY OTP (GENERIC)
//   verifyOtp: async (otp) => {
//     try {
//       const { phone, purpose } = get();

//       if (!phone || !purpose) {
//         throw new Error("Phone or purpose missing");
//       }

//       set({ loading: true, error: null });

//       const data = await verifyOtpApi({
//         phone,
//         otp,
//         purpose, // ✅ dynamic purpose
//       });

//       // token only for LOGIN / REGISTER
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       set({
//         user: data.user || null,
//         token: data.token || null,
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

//   // 🔹 PASSWORD LOGIN (UNCHANGED)
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const data = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

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

//   // 🔹 LOGOUT
//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
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
//   user: null,
//   token: null,
//   phone: null,
//   purpose: null,
//   verificationToken: null, // ✅ needed for REGISTER
//   loading: false,
//   error: null,

//   /* ----------------------------------
//      SEND OTP
//   ---------------------------------- */
//   sendOtp: async ({ phone, purpose }) => {

//     console.log("sendOtp called with:", phone, purpose);
//     try {
//       set({ loading: true, error: null });

//       console.log("Sending OTP to:", phone, "for purpose:", purpose);

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

//   /* ----------------------------------
//      VERIFY OTP
//   ---------------------------------- */
//   // verifyOtp: async (otp) => {
//   //   try {
//   //     const { phone, purpose } = get();

//   //     if (!phone || !purpose) {
//   //       throw new Error("Phone or purpose missing");
//   //     }

//   //     set({ loading: true, error: null });

//   //     const data = await verifyOtpApi({
//   //       phone,
//   //       otp,
//   //       purpose,
//   //     });

//   //     // 🔹 REGISTER flow → store verification token
//   //     if (purpose === "REGISTER") {
//   //       set({
//   //         verificationToken: data.verificationToken,
//   //         loading: false,
//   //       });
//   //       return true;
//   //     }

//   //     // 🔹 LOGIN flow
//   //     if (data.token) {
//   //       localStorage.setItem("token", data.token);
//   //     }

//   //     set({
//   //       user: data.user || null,
//   //       token: data.token || null,
//   //       loading: false,
//   //     });

//   //     return true;
//   //   } catch (err) {
//   //     set({
//   //       error: err.response?.data?.message || "Invalid OTP",
//   //       loading: false,
//   //     });
//   //     return false;
//   //   }
//   // },



//   verifyOtp: async (otp) => {
//   try {
//     const { phone, purpose } = get();

//     if (!phone || !purpose) {
//       throw new Error("Phone or purpose missing");
//     }

//     set({ loading: true, error: null });

//     const res = await verifyOtpApi({
//       phone,
//       otp,
//       purpose,
//     });

//     /* ----------------------------------
//        REGISTER FLOW (IMPORTANT FIX)
//     ---------------------------------- */
//     if (purpose === "REGISTER") {
//       set({
//         verificationToken: res.data.verificationToken, // ✅ FIXED
//         loading: false,
//       });

//       return true;
//     }

//     /* ----------------------------------
//        LOGIN FLOW
//     ---------------------------------- */
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//     }

//     set({
//       user: res.data.user || null,
//       token: res.data.token || null,
//       loading: false,
//     });

//     return true;
//   } catch (err) {
//     set({
//       error: err.response?.data?.message || "Invalid OTP",
//       loading: false,
//     });
//     return false;
//   }
// },

//   /* ----------------------------------
//      REGISTER USER
//   ---------------------------------- */
//   register: async ({ name, email, address, password }) => {
//     try {
//       const { phone, verificationToken } = get();

//       if (!phone || !verificationToken) {
//         throw new Error("Missing verification data");
//       }

//       set({ loading: true, error: null });

//       const data = await registerApi({
//         verificationToken,
//         phone,
//         password,
//         name,
//         email,
//         address,
//       });

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       set({
//         user: data.user || null,
//         token: data.token || null,
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

//   /* ----------------------------------
//      PASSWORD LOGIN
//   ---------------------------------- */
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const data = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

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

//   /* ----------------------------------
//      LOGOUT
//   ---------------------------------- */
//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
//       verificationToken: null,
//     });
//   },



//   // 🔹 RESET PASSWORD
// resetPassword: async ({ newPassword }) => {
//   console.log("resetPassword called with:", newPassword);
//   try {
//     const { verificationToken } = get();

//     // 🔐 token must already be present from verifyOtp
//     if (!verificationToken) {
//       throw new Error("Verification token missing");
//     }

//     set({ loading: true, error: null });

//     await resetPasswordApi({
//       verificationToken, // ✅ token stored by verifyOtp
//       newPassword,
//     });

//     // ✅ clear sensitive data after success
//     set({
//       verificationToken: null,
//       loading: false,
//     });

//     return true;
//   } catch (err) {
//     const res = err.response?.data;

//     set({
//       error: res?.errors || res?.message || "Reset password failed",
//       loading: false,
//     });

//     return false;
//   }
// },



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
  /* ==============================
     STATE
  ============================== */
  user: null,
  token: null,
  phone: null,
  purpose: null,

  verificationToken: null,     // ✅ REGISTER ONLY
  passwordResetToken: null,    // ✅ FORGOT PASSWORD ONLY

  loading: false,
  error: null,

  /* ==============================
     SEND OTP
  ============================== */
  sendOtp: async ({ phone, purpose }) => {
    try {
      set({ loading: true, error: null });

      if (purpose === "FORGOT_PASSWORD") {
        await sendForgotPasswordOtpApi({ phone, purpose });
      } else {
        await sendOtpApi({ phone, purpose }); // LOGIN / REGISTER
      }

      set({
        phone,
        purpose,
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

  /* ==============================
     VERIFY OTP
  ============================== */
  verifyOtp: async (otp) => {
    try {
      const { phone, purpose } = get();

      if (!phone || !purpose) {
        throw new Error("Phone or purpose missing");
      }

      set({ loading: true, error: null });

      const res = await verifyOtpApi({
        phone,
        otp,
        purpose,
      });

      /* ---------- FORGOT PASSWORD ---------- */
      if (purpose === "FORGOT_PASSWORD") {
        set({
          passwordResetToken: res.data.verificationToken, // ✅ CORRECT TOKEN
          loading: false,
        });
        return true;
      }

      /* ---------- REGISTER ---------- */
      if (purpose === "REGISTER") {
        set({
          verificationToken: res.data.verificationToken,
          loading: false,
        });
        return true;
      }

      /* ---------- LOGIN ---------- */
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      set({
        user: res.data.user || null,
        token: res.data.token || null,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Invalid OTP",
        loading: false,
      });
      return false;
    }
  },

  /* ==============================
     REGISTER USER
  ============================== */
  register: async ({ name, email, address, password }) => {
    try {
      const { phone, verificationToken } = get();

      if (!phone || !verificationToken) {
        throw new Error("Missing verification data");
      }

      set({ loading: true, error: null });

      const res = await registerApi({
        phone,
        verificationToken,
        name,
        email,
        address,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      set({
        user: res.data.user || null,
        token: res.data.token || null,
        verificationToken: null,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }
  },

  /* ==============================
     PASSWORD LOGIN
  ============================== */
  login: async ({ phone, password }) => {
    try {
      set({ loading: true, error: null });

      const res = await loginApi({
        phone,
        password,
        purpose: "LOGIN",
      });

      localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  /* ==============================
     RESET PASSWORD (🔥 FIXED)
  ============================== */
  resetPassword: async ({ newPassword }) => {
    try {
      const { passwordResetToken } = get();

      if (!passwordResetToken) {
        throw new Error("Password reset token missing");
      }

      set({ loading: true, error: null });

      await resetPasswordApi({
        verificationToken: passwordResetToken, // ✅ BACKEND EXPECTS THIS
        newPassword,
      });

      set({
        passwordResetToken: null,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Reset password failed",
        loading: false,
      });
      return false;
    }
  },

  /* ==============================
     LOGOUT
  ============================== */
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      phone: null,
      purpose: null,
      verificationToken: null,
      passwordResetToken: null,
    });
  },
}));
