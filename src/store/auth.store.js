



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
//   token: typeof window !== "undefined"
//     ? localStorage.getItem("token")
//     : null,
//   phone: null,
//   purpose: null,
//   expiresIn: null,
//   loading: false,
//   error: null,
//   verificationToken: null,
//   passwordResetToken: null,
//   setPhone: (phone) => set({ phone }),
//   setPurpose: (purpose) => set({ purpose }),
//   /* ================= INIT AUTH ================= */
//   initAuth: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       set({ token });
//     }
//   },

//   /* ================= MANUAL SETTERS ================= */
//   setToken: (token) => {
//     localStorage.setItem("token", token);
//     set({ token });
//   },

//   setUser: (user) => set({ user }),

//   /* ================= SEND OTP ================= */
//   // sendOtp: async ({ phone, purpose }) => {
//   //   try {
//   //     set({ loading: true, error: null });

//   //     let res;

//   //     if (purpose === "FORGOT_PASSWORD") {
//   //       res = await sendForgotPasswordOtpApi({ phone, purpose });
//   //     } else {
//   //       res = await sendOtpApi({ phone, purpose });
//   //     }

//   //     set({
//   //       phone,
//   //       purpose,
//   //       expiresIn: res?.expiresIn || 600,
//   //       loading: false,
//   //     });

//   //     return true;
//   //   } catch (err) {
//   //     set({
//   //       error: err?.response?.data?.message || "Failed to send OTP",
//   //       loading: false,
//   //     });
//   //     return false;
//   //   }
//   // },

//   sendOtp: async ({ phone, purpose }) => {
//   try {
//     set({ loading: true, error: null });

//     let res;

//     if (purpose === "FORGOT_PASSWORD") {
//       res = await sendForgotPasswordOtpApi({ phone, purpose });
//     } else {
//       res = await sendOtpApi({ phone, purpose });
//     }

//     set({
//       phone,
//       purpose,
//       expiresIn: res?.expiresIn || 600,
//       loading: false,
//     });

//     return {
//       success: true,
//     };

//   } catch (err) {
//     const status = err?.response?.status;
//     const message =
//       err?.response?.data?.message || "Failed to send OTP";

//     set({
//       error: message,
//       loading: false,
//     });

//     return {
//       success: false,
//       status,
//       message,
//     };
//   }
// },

  
//   /* ================= VERIFY OTP ================= */
 
// verifyOtp: async (otp) => {
//   try {
//     const { phone, purpose } = get();

//     if (!phone || !purpose)
//       throw new Error("Phone or purpose missing");

//     set({ loading: true, error: null });

//     const res = await verifyOtpApi({
//       phone,
//       otp,
//       purpose,
//     });

//     // ✅ CORRECT EXTRACTION
//     const verificationToken = res?.data?.verificationToken;

//     /* ===== FORGOT PASSWORD FLOW ===== */
//     if (purpose === "FORGOT_PASSWORD") {
//       set({
//         passwordResetToken: verificationToken, // ✅ store here
//         expiresIn: null,
//         loading: false,
//       });
//       return true;
//     }

//     /* ===== REGISTER FLOW ===== */
//     if (purpose === "REGISTER") {
//       set({
//         verificationToken: verificationToken, // ✅ store here
//         expiresIn: null,
//         loading: false,
//       });
//       return true;
//     }

//     set({ loading: false });
//     return true;

//   } catch (err) {
//     set({
//       error: err?.response?.data?.message || "Invalid OTP",
//       loading: false,
//     });
//     return false;
//   }
// },
//   /* ================= PASSWORD LOGIN ================= */
//   login: async ({ phone, password }) => {
//     try {
//       set({ loading: true, error: null });

//       const res = await loginApi({
//         phone,
//         password,
//         purpose: "LOGIN",
//       });

//       const accessToken =
//         res?.accessToken ||
//         res?.token;

//       const user = res?.user;

//       if (!accessToken) {
//         set({ loading: false });
//         return false;
//       }

//       localStorage.setItem("token", accessToken);

//       set({
//         token: accessToken,
//         user: user || null,
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






//   /* ================= REGISTER ================= */
// // register: async (payload) => {
// //   try {
// //     console.log("REGISTER CALLED");
// //     console.log("Payload:", payload);

// //     const { phone, verificationToken } = get();
// //     console.log("Phone:", phone);
// //     console.log("VerificationToken:", verificationToken);

// //     set({ loading: true, error: null });

// //     const res = await registerApi({
// //       phone,
// //       verificationToken,
// //       ...payload,
// //     });

// //     console.log("API RESPONSE:", res);

// //     set({ loading: false });
// //  localStorage.setItem("token", accessToken);
// //     return true;
// //   } catch (err) {
// //     console.log("REGISTER ERROR:", err);
// //     set({ loading: false });
// //     return false;
// //   }
// // },
  
// register: async (payload) => {
//   try {
//     console.log("REGISTER CALLED");

//     const { phone, verificationToken } = get();

//     set({ loading: true, error: null });

//     const res = await registerApi({
//       phone,
//       verificationToken,
//       ...payload,
//     });

//     console.log("API RESPONSE:", res);

//     // 🔥 Extract from response properly
//     const accessToken = res?.data?.accessToken;
//     const user = res?.data?.user;

//     if (accessToken) {
//       // ✅ Save to store
//       set({
//         token: accessToken,
//         user: user,
//         isAuthenticated: true,
//         loading: false,
//       });

//       // ✅ Persist token
//       localStorage.setItem("token", accessToken);

//       return true;
//     }

//     set({ loading: false });
//     return false;

//   } catch (err) {
//     console.log("REGISTER ERROR:", err);

//     set({
//       error: err?.response?.data?.message || "Registration failed",
//       loading: false,
//     });

//     return false;
//   }
// },


// /* ================= RESET PASSWORD ================= */
  
// resetPassword: async ({ newPassword }) => {
//   try {
//     const { passwordResetToken } = get();

//     if (!passwordResetToken) {
//       throw new Error("Password reset token missing");
//     }

//     set({ loading: true, error: null });

//     await resetPasswordApi({
//       verificationToken: passwordResetToken, // ✅ correct key
//       newPassword,
//     });

//     set({
//       passwordResetToken: null,
//       loading: false,
//     });

//     return true;

//   } catch (err) {
//     set({
//       error: err?.response?.data?.message || "Reset password failed",
//       loading: false,
//     });
//     return false;
//   }
// },
//   /* ================= LOGOUT ================= */
//   logout: () => {
//     localStorage.removeItem("token");

//     set({
//       user: null,
//       token: null,
//       phone: null,
//       purpose: null,
//       expiresIn: null,
//       error: null,
//     });
//   },
// }));





import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginApi,
  sendOtpApi,
  verifyOtpApi,
  sendForgotPasswordOtpApi,
  registerApi,
  resetPasswordApi,
} from "@/services/auth.service";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      /* ================= STATE ================= */
      user: null,
      token: typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null,
      phone: null,
      purpose: null,
      expiresIn: null,
      loading: false,
      error: null,
      verificationToken: null,
      passwordResetToken: null,

      setPhone: (phone) => set({ phone }),
      setPurpose: (purpose) => set({ purpose }),

      /* ================= INIT AUTH ================= */
      initAuth: () => {
        const token = localStorage.getItem("token");
        if (token) {
          set({ token });
        }
      },

      /* ================= MANUAL SETTERS ================= */
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
            expiresIn: res?.expiresIn || 600,
            loading: false,
          });

          return {
            success: true,
          };

        } catch (err) {
          const status = err?.response?.status;
          const message =
            err?.response?.data?.message || "Failed to send OTP";

          set({
            error: message,
            loading: false,
          });

          return {
            success: false,
            status,
            message,
          };
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

          const verificationToken = res?.data?.verificationToken;

          if (purpose === "FORGOT_PASSWORD") {
            set({
              passwordResetToken: verificationToken,
              expiresIn: null,
              loading: false,
            });
            return true;
          }

          if (purpose === "REGISTER") {
            set({
              verificationToken: verificationToken,
              expiresIn: null,
              loading: false,
            });
            return true;
          }

          set({ loading: false });
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

          const accessToken =
            res?.accessToken ||
            res?.token;

          const user = res?.user;

          if (!accessToken) {
            set({ loading: false });
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

      /* ================= REGISTER ================= */
      register: async (payload) => {
        try {
          console.log("REGISTER CALLED");

          const { phone, verificationToken } = get();

          set({ loading: true, error: null });

          const res = await registerApi({
            phone,
            verificationToken,
            ...payload,
          });

          console.log("API RESPONSE:", res);

          const accessToken = res?.data?.accessToken;
          const user = res?.data?.user;

          if (accessToken) {
            set({
              token: accessToken,
              user: user,
              isAuthenticated: true,
              loading: false,
            });

            localStorage.setItem("token", accessToken);

            return true;
          }

          set({ loading: false });
          return false;

        } catch (err) {
          console.log("REGISTER ERROR:", err);

          set({
            error: err?.response?.data?.message || "Registration failed",
            loading: false,
          });

          return false;
        }
      },

      /* ================= RESET PASSWORD ================= */
      resetPassword: async ({ newPassword }) => {
        try {
          const { passwordResetToken } = get();

          if (!passwordResetToken) {
            throw new Error("Password reset token missing");
          }

          set({ loading: true, error: null });

          await resetPasswordApi({
            verificationToken: passwordResetToken,
            newPassword,
          });

          set({
            passwordResetToken: null,
            loading: false,
          });

          return true;

        } catch (err) {
          set({
            error: err?.response?.data?.message || "Reset password failed",
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
          expiresIn: null,
          error: null,
          verificationToken: null,
          passwordResetToken: null,
        });
      },
    }),
    {
      name: "auth-storage", // 🔥 Everything stored in localStorage
    }
  )
);
