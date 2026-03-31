
import axios from "axios";
import { forceSessionLogout } from "@/lib/session";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* -------------------------------------------------
   AXIOS INSTANCE
------------------------------------------------- */
const api = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
});

const REFRESH_ENDPOINT = "/auth/refresh";
const REFRESH_BYPASS_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/otp/send",
  "/auth/otp/verify",
  "/auth/password/reset",
];

const normalizeToken = (token) =>
  typeof token === "string" ? token.trim() : "";

const getStoredAccessToken = () => {
  if (typeof window === "undefined") return "";
  return normalizeToken(localStorage.getItem("token"));
};

const getStoredRefreshToken = () => {
  if (typeof window === "undefined") return "";
  return normalizeToken(localStorage.getItem("refreshToken"));
};

const setStoredToken = (token) => {
  if (typeof window === "undefined") return;
  const cleanToken = normalizeToken(token);
  if (!cleanToken) return;

  localStorage.setItem("token", cleanToken);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `token=${cleanToken}; path=/; max-age=604800; SameSite=Lax${secure}`;
};

const clearStoredToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `token=; path=/; max-age=0; SameSite=Lax${secure}`;
};

const extractTokens = (payload) => {
  const data = payload?.data ?? payload ?? {};
  return {
    accessToken: normalizeToken(data?.accessToken || data?.token),
    refreshToken: normalizeToken(data?.refreshToken),
  };
};

const hasAnySessionToken = () =>
  Boolean(getStoredAccessToken() || getStoredRefreshToken());

const persistRefreshedTokens = ({ accessToken, refreshToken }) => {
  if (typeof window === "undefined") return;
  if (accessToken) setStoredToken(accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

const extractAccessToken = (payload) =>
  normalizeToken(
    payload?.accessToken || payload?.token || payload?.data?.accessToken
  );

const getResponseMessage = (error) =>
  normalizeToken(error?.response?.data?.message).toLowerCase();

const isExplicitSessionExpiry = (error) =>
  error?.response?.status === 401 &&
  getResponseMessage(error).includes("session expired");

const shouldSkipRefresh = (url = "") =>
  url.includes(REFRESH_ENDPOINT) ||
  REFRESH_BYPASS_ROUTES.some((route) => url.includes(route));

/* -------------------------------------------------
   REQUEST INTERCEPTOR
------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getStoredAccessToken();
      if (token && !config.url?.includes(REFRESH_ENDPOINT)) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------
   RESPONSE INTERCEPTOR (TOKEN REFRESH HANDLER)
------------------------------------------------- */

let isRefreshing = false;
let failedQueue = [];

/* Process queued requests */
const processQueue = (error, token = "") => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";
    if (!originalRequest) return Promise.reject(error);

    if (isExplicitSessionExpiry(error)) {
      processQueue(error, null);
      clearStoredToken();
      forceSessionLogout();
      return Promise.reject(error);
    }

    /* ---------------------------------------------
       TOKEN EXPIRED → TRY REFRESH
    --------------------------------------------- */
    if (
      status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh(url) &&
      hasAnySessionToken()
    ) {
      originalRequest._retry = true;

      // ⏳ If refresh already in progress → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = getStoredRefreshToken();
        const headers = { "X-Skip-Auth-Refresh": "true" };
        if (refreshToken) {
          headers.Authorization = `Refresh ${refreshToken}`;
        }

        const res = await api.post(REFRESH_ENDPOINT, {}, { headers });
        const tokens = extractTokens(res?.data);
        const cleanToken = tokens.accessToken || extractAccessToken(res?.data);
        if (!cleanToken) {
          throw new Error("No token returned from refresh");
        }

        persistRefreshedTokens({
          accessToken: cleanToken,
          refreshToken: tokens.refreshToken,
        });
        processQueue(null, cleanToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${cleanToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearStoredToken();
        forceSessionLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
