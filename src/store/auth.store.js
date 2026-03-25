





import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginApi,
  sendOtpApi,
  verifyOtpApi,
  sendForgotPasswordOtpApi,
  registerApi,
  resetPasswordApi,
  getMeApi,
  refreshSessionApi,
} from "@/services/auth.service";

const getAuthPayload = (res) => res?.data ?? res ?? {};
const normalizeToken = (token) =>
  typeof token === "string" ? token.trim() : "";
const getApiErrorMessage = (err, fallback) =>
  err?.response?.data?.errors?.[0]?.message ||
  err?.response?.data?.message ||
  fallback;

const getStoredRefreshToken = () => {
  if (typeof window === "undefined") return "";
  return normalizeToken(localStorage.getItem("refreshToken"));
};

const persistTokens = ({ accessToken, refreshToken }) => {
  if (typeof window === "undefined") return;
  const cleanAccessToken = normalizeToken(accessToken);
  const cleanRefreshToken = normalizeToken(refreshToken);

  if (cleanAccessToken) {
    localStorage.setItem("token", cleanAccessToken);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `token=${cleanAccessToken}; path=/; max-age=604800; SameSite=Lax${secure}`;
  }

  if (cleanRefreshToken) {
    localStorage.setItem("refreshToken", cleanRefreshToken);
  }
};

const clearPersistedToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `token=; path=/; max-age=0; SameSite=Lax${secure}`;
};

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
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        if (token) {
          set({ token: normalizeToken(token) });
        }
      },

      /* ================= MANUAL SETTERS ================= */
      setToken: (token) => {
        const cleanToken = normalizeToken(token);
        if (!cleanToken) {
          clearPersistedToken();
          set({ token: null });
          return;
        }

        persistTokens({ accessToken: cleanToken });
        set({ token: cleanToken });
      },

      setUser: (user) => set({ user }),

      fetchMe: async () => {
        try {
          const { token } = get();
          if (!token) return null;

          set({ loading: true, error: null });

          const res = await getMeApi();
          const user = res?.data ?? null;

          set({
            user,
            loading: false,
            error: null,
          });

          return user;
        } catch (err) {
          set({
            error: err?.response?.data?.message || "Failed to fetch user",
            loading: false,
          });
          return null;
        }
      },

      restoreSession: async () => {
        try {
          const { token } = get();
          const refreshToken = getStoredRefreshToken();
          if (!token && !refreshToken) {
            return false;
          }

          set({ loading: true, error: null });

          if (token) {
            try {
              const meRes = await getMeApi();
              const mePayload = getAuthPayload(meRes);
              const user = mePayload?.user || mePayload || null;

              set({
                token: normalizeToken(token),
                user,
                loading: false,
                error: null,
              });
              return true;
            } catch (meError) {
              const status = meError?.response?.status;
              if (status && status !== 401) {
                throw meError;
              }
            }
          }

          const refreshRes = await refreshSessionApi(
            refreshToken ? { refreshToken } : undefined
          );
          const refreshPayload = getAuthPayload(refreshRes);
          const refreshedToken = normalizeToken(
            refreshPayload?.accessToken || refreshPayload?.token
          );
          const rotatedRefreshToken = normalizeToken(refreshPayload?.refreshToken);

          if (!refreshedToken) {
            throw new Error("Access token missing in refresh response");
          }

          persistTokens({
            accessToken: refreshedToken,
            refreshToken: rotatedRefreshToken || refreshToken,
          });

          const meRes = await getMeApi();
          const mePayload = getAuthPayload(meRes);
          const user = mePayload?.user || mePayload || null;

          set({
            token: refreshedToken,
            user,
            loading: false,
            error: null,
          });

          return true;
        } catch (err) {
          clearPersistedToken();
          set({
            user: null,
            token: null,
            loading: false,
            error: null,
          });
          return false;
        }
      },

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
          const payload = getAuthPayload(res);
          const otpExpiry = Number(payload?.expiresIn);

          set({
            phone,
            purpose,
            expiresIn: Number.isFinite(otpExpiry) && otpExpiry > 0
              ? otpExpiry
              : 180,
            loading: false,
          });

          const nextExpiresIn =
            Number.isFinite(otpExpiry) && otpExpiry > 0
              ? otpExpiry
              : 180;

          return {
            success: true,
            expiresIn: nextExpiresIn,
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

          const payload = getAuthPayload(res);
          const verificationToken = payload?.verificationToken;

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
          if (purpose === "LOGIN") {
            const accessToken =
              payload?.accessToken ||
              payload?.token;
            const user = payload?.user || null;

            if (!accessToken) {
              set({
                error: "Token missing in OTP login response",
                loading: false,
              });
              return false;
            }

            persistTokens({
              accessToken,
              refreshToken: payload?.refreshToken,
            });

            set({
              token: normalizeToken(accessToken),
              user,
              verificationToken: null,
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

          const payload = getAuthPayload(res);
          const accessToken =
            payload?.accessToken ||
            payload?.token;

          const user = payload?.user || null;

          if (!accessToken) {
            set({ loading: false });
            return false;
          }

          persistTokens({
            accessToken,
            refreshToken: payload?.refreshToken,
          });

          set({
            token: normalizeToken(accessToken),
            user,
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
          const refreshToken = res?.data?.refreshToken;
          const user = res?.data?.user;

          if (accessToken) {
            persistTokens({ accessToken, refreshToken });
            set({
              token: normalizeToken(accessToken),
              user: user,
              isAuthenticated: true,
              loading: false,
            });

            return { success: true };
          }

          set({ loading: false });
          return { success: false, message: "Registration failed" };

        } catch (err) {
          console.log("REGISTER ERROR:", err);
          const message = getApiErrorMessage(err, "Registration failed");

          set({
            error: message,
            loading: false,
          });

          return { success: false, message };
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
        clearPersistedToken();

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
